import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AlertTriangle, ArrowLeft, Bot, Check, ChevronDown, Circle, Download, FileText, HelpCircle, Lock, MoreHorizontal, Paperclip, Share2, ShieldAlert, Sparkle, Upload } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AlfieChip, AlfieMark, AlfiePanelHeader, ReviewBar } from "@/components/alfie-ui";
import { DocumentSheet, type DocSection } from "@/components/document-view";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlfieComposer, AttachmentChip, FileGlyph, fileExt, type Attachment } from "@/components/alfie-composer";
import { BillStatusBadge, MatchBadge } from "@/components/payables-badges";
import { approverFor, bills, fmt, getBill, seedBillAudit, type Bill, type BillAuditEvent, type BillStatus } from "@/lib/payables-data";

export const Route = createFileRoute("/payables/$billId")({
  head: ({ params }) => ({ meta: [{ title: `Bill ${params.billId} | Alfie Enterprise Finance` }, { name: "description", content: `Review bill ${params.billId} with Alfie: invoice, three-way match, approval policy, and audit trail.` }, { property: "og:title", content: `Bill ${params.billId} | Alfie Enterprise Finance` }, { property: "og:description", content: "AI-assisted payables workspace with three-way matching and human approval gates." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: BillWorkspace,
});

type Doc = { id: string; name: string; label: string; size: string; summary: string };
type Reply = { intro: string; items?: string[]; fields?: [string, string][]; next?: string; verdict?: string; confidence?: string; sources?: string[] | undefined; note?: string; draft?: string };
type Msg = { id: string; role: "user" | "alfie"; text?: string; files?: Attachment[]; reply?: Reply; actions?: string[]; attached?: boolean };
type Tab = "file" | "payment" | "activity";
type PolicyRow = readonly [string, "ok" | "warn" | "unknown", string, string];
type MatchRow = { label: string; invoiced: string; ordered: string; received: string; state: "ok" | "warn" };

type BillDetail = {
  docs: Doc[];
  docSections: Record<string, DocSection[]>;
  matchRows: MatchRow[];
  matchedAmount: number;
  heldAmount: number;
  policyRows: readonly PolicyRow[];
  analysis: Reply;
  current: number;
  review: { status: string; title: string; detail: string };
};

const workflow = ["Bill Received", "Invoice Captured", "Three-Way Match", "Exception Review", "Approval", "Payment Scheduled", "Paid"];
const currentFor = (s: BillStatus) => (s === "New" ? 1 : s === "Matching" ? 2 : s === "Needs Review" || s === "On Hold" ? 3 : s === "Awaiting Approval" ? 4 : s === "Approved" || s === "Scheduled" ? 5 : 6);
const prompts = ["Summarize this bill.", "Explain the quantity variance.", "Show me the three-way match.", "What approvals are required?", "Is this bill a duplicate?", "What happens if we pay the matched amount only?", "Draft a message to the vendor.", "When should this bill be paid?"];
const standardActions = ["Request Corrected Invoice", "Message Vendor", "Place Bill On Hold", "Reassign Approver", "Add AP Note", "Escalate Bill"];

function flagshipDetail(bill: Bill): BillDetail {
  return {
    docs: [
      { id: "d1", name: "invoice_INV-4471.pdf", label: "Vendor Invoice", size: "212 KB", summary: "Great Lakes Steel Co. invoice INV-4471 dated November 12, 2026, for Meridian Manufacturing Inc. Two lines: hot-rolled steel coil $68,400 and cold-rolled steel sheet $18,000. Total $86,400, terms Net 15, purchase order PO-8812 referenced." },
      { id: "d2", name: "purchase_order_PO-8812.pdf", label: "Purchase Order", size: "96 KB", summary: "Purchase order PO-8812 issued October 28, 2026: 24 tonnes of hot-rolled steel coil at $2,850 per tonne and 6 tonnes of cold-rolled steel sheet at $2,250 per tonne. Total authorized $81,900." },
      { id: "d3", name: "goods_receipt_GR-3391.pdf", label: "Goods Receipt", size: "88 KB", summary: "Goods receipt GR-3391 signed at the Toronto plant on November 13, 2026: 24 tonnes of coil and 6 tonnes of sheet received in good condition. No further deliveries outstanding against PO-8812." },
      { id: "d4", name: "vendor_email_thread.pdf", label: "Vendor Email Thread", size: "41 KB", summary: "Email thread with Great Lakes Steel Co. The vendor confirms the additional 2 tonnes of cold-rolled sheet were invoiced early and ship on the next truck, expected the week of November 23." },
    ],
    docSections: {
      d1: [
        { heading: "Invoice lines", body: "Line 1: hot-rolled steel coil, 24 tonnes at $2,850 per tonne, $68,400. Line 2: cold-rolled steel sheet, 8 tonnes at $2,250 per tonne, $18,000. Subtotal $86,400. HST is recorded separately in the ledger posting." },
        { heading: "Terms", body: "Terms Net 15 from the invoice date, due November 27, 2026. The invoice references purchase order PO-8812 and delivery to the Toronto plant." },
      ],
      d2: [
        { heading: "Ordered quantities", body: "24 tonnes of hot-rolled steel coil at $2,850 per tonne ($68,400) and 6 tonnes of cold-rolled steel sheet at $2,250 per tonne ($13,500). Total authorized on this order: $81,900." },
        { heading: "Amendment note", body: "The plant requested an amendment for 2 additional tonnes of cold-rolled sheet on November 10. The amendment is awaiting vendor confirmation and is not part of this purchase order, so the ordered quantity for line 2 remains 6 tonnes." },
      ],
      d3: [
        { heading: "Received goods", body: "Received November 13, 2026 at the Toronto plant: 24 tonnes of hot-rolled steel coil and 6 tonnes of cold-rolled steel sheet, inspected and accepted. Receiver: plant stores, signature on file." },
        { heading: "Outstanding", body: "Nothing further is outstanding against PO-8812. Any additional tonnage would arrive under a new goods receipt once the purchase order amendment is confirmed." },
      ],
      d4: [
        { heading: "Quantity discussion", body: "On November 14 the vendor's sales office confirmed the extra 2 tonnes of sheet were invoiced with the main shipment in error and will physically ship the week of November 23. They offered either a corrected invoice now or a credit against the next order." },
      ],
    },
    matchRows: [
      { label: "Line 1 · Hot-rolled steel coil", invoiced: "24 t · $68,400", ordered: "24 t", received: "24 t", state: "ok" },
      { label: "Line 2 · Cold-rolled steel sheet", invoiced: "8 t · $18,000", ordered: "6 t", received: "6 t", state: "warn" },
    ],
    matchedAmount: 81_900,
    heldAmount: 4_500,
    policyRows: [
      ["Bill amount", "warn", "VP Finance approval required", "$86,400 exceeds the $50,000 threshold, AP Approval Policy §3.2"],
      ["Three-way match", "warn", "Variance on one line", "Line 2 invoiced quantity exceeds the goods receipt by 2 tonnes, §2.1"],
      ["Vendor status", "ok", "Approved vendor", "Great Lakes Steel Co., vendor master VM-104, banking verified October 2026"],
      ["Duplicate check", "ok", "No duplicate found", "Invoice INV-4471 has not been recorded before"],
      ["Tax treatment", "ok", "HST recorded separately", "Ontario place of supply, Meridian Manufacturing Inc."],
    ],
    analysis: {
      intro: "I captured invoice INV-4471 from Great Lakes Steel Co. and ran the three-way match against purchase order PO-8812 and goods receipt GR-3391. Most of the bill is clean:",
      items: ["Line 1 matches in full: 24 tonnes of hot-rolled coil at $2,850 per tonne, ordered, received and invoiced identically.", "The duplicate check is clear and the vendor's banking details on file are verified.", "Line 2 is invoiced at 8 tonnes against 6 tonnes ordered and received, a quantity variance of $4,500."],
      verdict: "Ready for approval at the matched amount of $81,900, with the $4,500 variance held.",
      next: "Approve the matched amount and hold the variance pending the goods receipt, or request a corrected invoice from the vendor.",
      confidence: "High",
      sources: ["Vendor Invoice INV-4471", "Purchase Order PO-8812", "Goods Receipt GR-3391", "AP Approval Policy v3.1"],
    },
    current: 4,
    review: { status: "VP Finance approval · Exception open", title: "Quantity variance of $4,500 on line 2", detail: "Alfie matched $81,900 of this $86,400 bill in full. The vendor invoiced 2 tonnes of cold-rolled sheet that have not been received yet. The bill is above $50,000, so the decision sits with you as VP Finance." },
  };
}

function duplicateDetail(bill: Bill): BillDetail {
  return {
    docs: [
      { id: "d1", name: "invoice_INV-88312.pdf", label: "Vendor Invoice", size: "64 KB", summary: "Northgate Office Supply invoice INV-88312 dated November 14, 2026, for Meridian Retail Group Inc. Office supplies restock, total $12,750, purchase order PO-5520 referenced." },
      { id: "d2", name: "original_bill_BILL-2207.pdf", label: "Original Bill BILL-2207", size: "58 KB", summary: "The same invoice INV-88312 was captured on October 30 as BILL-2207 and is scheduled for payment on November 30. Vendor, amount, invoice number and purchase order are identical." },
    ],
    docSections: {
      d1: [
        { heading: "Invoice detail", body: "Office supplies restock for the Vancouver head office: paper, toner and stationery lines totalling $12,750. Invoice date November 14, 2026, terms Net 30." },
        { heading: "Capture note", body: "This copy arrived through the vendor portal resend on November 16. The invoice number, amount and purchase order match a bill already in the payment queue." },
      ],
      d2: [
        { heading: "Original capture", body: "BILL-2207 was created on October 30 from the first copy of INV-88312. It passed the three-way match against PO-5520 and is scheduled in the November 30 payment run." },
      ],
    },
    matchRows: [{ label: "Whole invoice", invoiced: "$12,750", ordered: "PO-5520", received: "Matched on BILL-2207", state: "warn" }],
    matchedAmount: 0,
    heldAmount: 12_750,
    policyRows: [
      ["Duplicate check", "warn", "Exact duplicate of BILL-2207", "Same vendor, invoice number, amount and purchase order, AP Approval Policy §2.4"],
      ["Bill amount", "ok", "AP Manager level", "$12,750 is within the Controller band, but the duplicate hold overrides approval routing"],
      ["Vendor status", "ok", "Approved vendor", "Northgate Office Supply, vendor master VM-231, banking verified"],
    ],
    analysis: {
      intro: "I held this bill before it entered the payment queue. It is an exact duplicate of BILL-2207:",
      fields: [["This bill", "BILL-2219 · captured Nov 16 from a vendor portal resend"], ["Original bill", "BILL-2207 · captured Oct 30 · scheduled for Nov 30"], ["Invoice", "INV-88312 · Northgate Office Supply"], ["Amount", "$12,750 on both bills"], ["Purchase order", "PO-5520 on both bills"]],
      verdict: "Duplicate. BILL-2207 will be paid once, on November 30.",
      next: "Confirm the duplicate so this bill is rejected from the queue, or release the hold if you believe it is a separate charge.",
      confidence: "High",
      sources: ["Vendor Invoice INV-88312", "Bill BILL-2207", "AP Approval Policy §2.4"],
    },
    current: 3,
    review: { status: "Held by Alfie · Duplicate", title: "This bill duplicates BILL-2207", detail: "Same vendor, invoice number INV-88312, amount $12,750 and purchase order PO-5520. The original is already scheduled for payment on November 30, so paying this copy would pay the vendor twice." },
  };
}

function genericDetail(bill: Bill): BillDetail {
  const matched = bill.match === "Matched";
  return {
    docs: [
      { id: "d1", name: `invoice_${bill.invoiceNumber}.pdf`, label: "Vendor Invoice", size: "74 KB", summary: `${bill.vendor} invoice ${bill.invoiceNumber} for ${bill.entity}. Category: ${bill.category}. Total ${fmt(bill.amount, bill.currency)}, due ${bill.due}.` },
      ...(bill.poNumber ? [{ id: "d2", name: `purchase_order_${bill.poNumber}.pdf`, label: "Purchase Order", size: "52 KB", summary: `Purchase order ${bill.poNumber} issued to ${bill.vendor} for ${bill.entity}, covering this ${bill.category.toLowerCase()} charge.` }] : []),
    ],
    docSections: {
      d1: [{ heading: "Invoice detail", body: `Invoice ${bill.invoiceNumber} from ${bill.vendor}, category ${bill.category}, total ${fmt(bill.amount, bill.currency)}, due ${bill.due}. Captured by Alfie from the vendor feed and checked against the vendor master.` }],
      ...(bill.poNumber ? { d2: [{ heading: "Order detail", body: `Purchase order ${bill.poNumber} authorizes this charge for ${bill.entity}. Quantities and prices on the invoice were compared line by line during the three-way match.` }] } : {}),
    },
    matchRows: [{ label: bill.category, invoiced: fmt(bill.amount, bill.currency), ordered: bill.poNumber ?? "No PO on file", received: matched ? "Received in full" : bill.match === "No PO" ? "Receipt not linked" : "See exceptions", state: matched ? "ok" : "warn" }],
    matchedAmount: matched ? bill.amount : 0,
    heldAmount: matched ? 0 : bill.amount,
    policyRows: [
      ["Bill amount", bill.amount > 50_000 ? "warn" : "ok", `${approverFor(bill.amount)} approval`, `${fmt(bill.amount, bill.currency)} against the approval thresholds, AP Approval Policy §3.2`],
      ["Three-way match", matched ? "ok" : "warn", matched ? "Matched in full" : bill.match, matched ? "Invoice, purchase order and goods receipt agree" : "An exception is open on this bill"],
      ["Vendor status", "ok", "Approved vendor", `${bill.vendor}, banking verified on the vendor master`],
      ["Duplicate check", "ok", "No duplicate found", `Invoice ${bill.invoiceNumber} has not been recorded before`],
    ],
    analysis: {
      intro: matched
        ? `I captured invoice ${bill.invoiceNumber} from ${bill.vendor} and matched it in full against ${bill.poNumber ? `purchase order ${bill.poNumber} and its goods receipt` : "the recurring charge schedule"}. The duplicate check is clear and vendor banking is verified.`
        : `I captured invoice ${bill.invoiceNumber} from ${bill.vendor}. The match is not complete: ${bill.match === "No PO" ? "there is no purchase order on file for this charge, so a reviewer needs to confirm it is expected before approval." : "an exception is open on this bill."}`,
      verdict: matched ? `Ready for ${approverFor(bill.amount)} approval.` : "Not ready for approval until the exception is resolved.",
      next: matched ? "Route for approval so the bill joins the next payment run before its due date." : "Confirm the charge with the budget owner, or return the bill to the vendor.",
      confidence: "High",
      sources: [`Vendor Invoice ${bill.invoiceNumber}`, ...(bill.poNumber ? [`Purchase Order ${bill.poNumber}`] : []), "AP Approval Policy v3.1"],
    },
    current: currentFor(bill.status),
    review: matched
      ? { status: `${approverFor(bill.amount)} approval`, title: `Matched in full at ${fmt(bill.amount, bill.currency)}`, detail: `Invoice, purchase order and receipt agree for this ${bill.vendor} bill. Approval routes to the ${approverFor(bill.amount)} under the AP approval policy.` }
      : { status: "Exception open", title: bill.match === "No PO" ? "No purchase order on file" : "Match exception open", detail: `This ${bill.vendor} bill cannot be approved until the exception is resolved. Alfie has prepared the comparison for review.` },
  };
}

function detailFor(bill: Bill): BillDetail {
  if (bill.id === "BILL-2214") return flagshipDetail(bill);
  if (bill.id === "BILL-2219") return duplicateDetail(bill);
  return genericDetail(bill);
}

function replyFor(q: string, files: Attachment[], bill: Bill, detail: BillDetail): { reply: Reply; actions: string[] } {
  const p = q.toLowerCase();
  if (files.length) return { reply: { intro: `I reviewed the ${files.length === 1 ? "uploaded file" : `${files.length} uploaded files`} against this bill.`, items: ["The document agrees with the vendor and entity on the bill.", "No new exception was raised; the open items on the bill are unchanged."], note: "Uploaded files are used in this conversation only and have not been added to the bill file.", confidence: "Medium", sources: files.map((f) => f.name) }, actions: ["Ask Follow-up"] };
  if (bill.id === "BILL-2214" && p.includes("variance")) return { reply: { intro: "The variance is on line 2 of invoice INV-4471:", fields: [["Invoiced", "8 tonnes · $18,000"], ["Ordered on PO-8812", "6 tonnes · $13,500"], ["Received on GR-3391", "6 tonnes · November 13"], ["Variance", "2 tonnes · $4,500"]], note: "The plant requested a PO amendment for the extra 2 tonnes on November 10, but it was never confirmed, and the vendor's email thread says the tonnage ships the week of November 23. Until a goods receipt exists, the $4,500 is not payable under the three-way match rule.", verdict: "Hold the $4,500; the rest of the bill is payable.", confidence: "High", sources: ["Vendor Invoice INV-4471", "Purchase Order PO-8812", "Goods Receipt GR-3391", "Vendor Email Thread"] }, actions: ["Approve Matched Amount", "Request Corrected Invoice", "Ask Follow-up"] };
  if (bill.id === "BILL-2214" && (p.includes("goods receipt") || p.includes("receipt"))) return { reply: { intro: "Goods receipt GR-3391, signed at the Toronto plant on November 13:", fields: [["Hot-rolled coil", "24 tonnes received"], ["Cold-rolled sheet", "6 tonnes received"], ["Condition", "Accepted, no damage noted"], ["Outstanding on PO-8812", "Nothing further"]], note: "The receipt is the reason the extra 2 invoiced tonnes cannot be paid yet: there is no receipt for them.", confidence: "High", sources: ["Goods Receipt GR-3391"] }, actions: ["Explain the quantity variance.", "Ask Follow-up"] };
  if (bill.id === "BILL-2214" && p.includes("purchase order")) return { reply: { intro: "Purchase order PO-8812 authorizes $81,900:", fields: [["Hot-rolled coil", "24 tonnes · $68,400"], ["Cold-rolled sheet", "6 tonnes · $13,500"], ["Amendment", "2 extra tonnes requested Nov 10, not confirmed"]], note: "The invoice exceeds the authorized order by exactly the unconfirmed amendment quantity.", confidence: "High", sources: ["Purchase Order PO-8812"] }, actions: ["Explain the quantity variance.", "Ask Follow-up"] };
  if (bill.id === "BILL-2214" && p.includes("vendor invoice")) return { reply: detail.analysis, actions: ["Explain the quantity variance.", "Show me the three-way match.", "Ask Follow-up"] };
  if (p.includes("match")) return { reply: { intro: "Three-way match, invoice against purchase order against goods receipt:", fields: detail.matchRows.map((r) => [r.label, `Invoiced ${r.invoiced} · Ordered ${r.ordered} · Received ${r.received}`]), verdict: detail.heldAmount ? `${fmt(detail.matchedAmount, bill.currency)} matched in full; ${fmt(detail.heldAmount, bill.currency)} held.` : "Matched in full.", confidence: "High", sources: detail.analysis.sources }, actions: ["Ask Follow-up"] };
  if (p.includes("approval") || p.includes("approve")) return { reply: { intro: "Approvals for this bill under the AP approval policy:", fields: [["AP review", `${bill.owner} · complete`], ["Controller check", bill.amount > 50_000 ? "Marcus Webb · exception confirmed" : "Within band, not required"], ["Final approval", `${approverFor(bill.amount)}${bill.amount > 50_000 ? " · pending" : ""}`], ["Payment release", "Treasurer (Tom Alvarez) · after approval"]], note: "Thresholds: AP Manager to $10,000, Controller to $50,000, VP Finance above $50,000. Alfie cannot approve or release payments.", confidence: "High", sources: ["AP Approval Policy v3.1"] }, actions: bill.amount > 50_000 ? ["Approve Bill", "Ask Follow-up"] : ["Ask Follow-up"] };
  if (p.includes("duplicate")) return { reply: bill.id === "BILL-2219" ? { intro: "Yes. This bill is an exact duplicate of BILL-2207:", fields: detail.analysis.fields ?? [], verdict: "Held by Alfie before it could be paid twice.", confidence: "High", sources: detail.analysis.sources } : { intro: `No. Invoice ${bill.invoiceNumber} from ${bill.vendor} appears once in the bill queue. Alfie checks vendor, invoice number, amount and purchase order on every capture.`, fields: [["Vendor", bill.vendor], ["Invoice number", bill.invoiceNumber], ["Amount", fmt(bill.amount, bill.currency)], ["Result", "No matching bill found"]], confidence: "High", sources: ["Vendor invoice history"] }, actions: ["Ask Follow-up"] };
  if (p.includes("matched amount")) return { reply: { intro: "Paying the matched amount only:", fields: [["Paid in the next run", fmt(detail.matchedAmount, bill.currency)], ["Held back", fmt(detail.heldAmount, bill.currency)], ["Effect on the bill", "The bill closes at the matched value; the held amount stays open against the purchase order"]], note: "If the held goods arrive and a goods receipt is recorded, the held amount can be released as a follow-up payment without re-approval under $10,000.", confidence: "High", sources: detail.analysis.sources }, actions: ["Approve Matched Amount", "Ask Follow-up"] };
  if (p.includes("vendor") && (p.includes("message") || p.includes("draft") || p.includes("email"))) return { reply: { intro: "Draft message to the vendor, for your review before sending:", draft: `Hello ${bill.vendor} team, We are processing invoice ${bill.invoiceNumber} for ${fmt(bill.amount, bill.currency)}.${bill.id === "BILL-2214" ? " Line 2 is invoiced at 8 tonnes against 6 tonnes received on goods receipt GR-3391, so we will pay the matched $81,900 now and hold $4,500 until the remaining tonnage is received. Could you confirm the shipment date for the balance, or issue a corrected invoice?" : " We will confirm our payment timing shortly."} Thank you, Rachel Kim, AP Manager, Meridian Group Inc.`, note: "Nothing has been sent. Use Message Vendor to send after review.", sources: ["Bill file"] }, actions: ["Message Vendor", "Ask Follow-up"] };
  if (p.includes("when") || p.includes("paid") || p.includes("pay")) return { reply: { intro: "Payment timing for this bill:", fields: [["Due date", bill.due], ["Payment runs", "Fridays, from the entity operating account"], ["Status", "Pays in the first run after approval"], ["DPO context", "Group DPO is 44 days against a 45 day target"]], note: "Paying on the due date keeps DPO on target. There is no early payment discount on this invoice.", confidence: "High", sources: ["Bill file", "Treasury payment calendar"] }, actions: ["Ask Follow-up"] };
  return { reply: detail.analysis, actions: bill.id === "BILL-2219" ? ["Confirm Duplicate", "Release Hold", "Ask Follow-up"] : ["Show me the three-way match.", "What approvals are required?", "Ask Follow-up"] };
}

function BillWorkspace() {
  const { billId } = Route.useParams();
  const bill = getBill(billId) ?? { ...bills[0]!, id: billId };
  const detail = detailFor(bill);
  const [tab, setTab] = useState<Tab>("file");
  const [status, setStatus] = useState<BillStatus>(bill.status);
  const [messages, setMessages] = useState<Msg[]>([{ id: "m0", role: "alfie", reply: { intro: "I've captured this bill and run the duplicate check and three-way match. I can explain any exception, show the approval route, and prepare vendor messages or approval summaries." } }]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [pending, setPending] = useState<Attachment[]>([]);
  const [docs, setDocs] = useState(detail.docs);
  const [preview, setPreview] = useState<Doc | null>(null);
  const [confirm, setConfirm] = useState<Msg | null>(null);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [audit, setAudit] = useState<BillAuditEvent[]>(bill.id === "BILL-2214" ? seedBillAudit : [
    { time: "Nov 16, 10:41", actor: "Alfie", actorType: "Alfie", action: "Three-way match run", source: bill.poNumber ?? "Charge schedule", result: bill.match === "Matched" ? "Matched in full" : `Exception: ${bill.match}` },
    { time: "Nov 16, 10:41", actor: "Alfie", actorType: "Alfie", action: "Duplicate check completed", source: "Vendor invoice history", result: bill.id === "BILL-2219" ? "Duplicate of BILL-2207 found; bill held" : "No duplicate found" },
    { time: "Nov 16, 09:02", actor: "System", actorType: "System", action: "Bill received", source: "Vendor feed", result: `${bill.id} created` },
  ]);
  const [notice, setNotice] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [messages, thinking]);

  const now = () => new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false });
  const log = (e: Omit<BillAuditEvent, "time">) => setAudit((a) => [{ time: now(), ...e }, ...a]);
  const flash = (t: string) => { setNotice(t); setTimeout(() => setNotice(""), 3500); };
  const say = (reply: Reply, actions?: string[]) => setMessages((m) => [...m, { id: crypto.randomUUID(), role: "alfie", reply, ...(actions ? { actions } : {}) }]);

  const send = (text: string, files: Attachment[] = []) => {
    const q = text || (files.length ? "Analyze these attachments." : "");
    if (!q) return;
    setInput(""); setPending([]);
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", text: q, files }]);
    if (files.length) log({ actor: "Elena Brooks", actorType: "User", action: "Documents uploaded to conversation", source: files.map((f) => f.name).join(", "), result: "Conversation only, not in bill file" });
    setThinking(true);
    setTimeout(() => {
      const { reply, actions } = replyFor(q, files, bill, detail);
      say(reply, actions);
      log({ actor: "Alfie", actorType: "Alfie", action: "Alfie analysis performed", source: reply.sources?.join(", ") ?? "Bill file", result: reply.verdict ?? reply.next ?? "Response provided" });
      setThinking(false);
    }, 900);
  };

  const approveBill = (matchedOnly: boolean) => {
    const amount = matchedOnly ? detail.matchedAmount : bill.amount;
    setStatus("Approved");
    log({ actor: "Elena Brooks", actorType: "User", action: matchedOnly ? "Bill approved at matched amount" : "Bill approved", source: "AP Approval Policy §3.2", result: `${fmt(amount, bill.currency)} approved${matchedOnly && detail.heldAmount ? `; ${fmt(detail.heldAmount, bill.currency)} held` : ""}` });
    const fields: [string, string][] = [["Approved", fmt(amount, bill.currency)]];
    if (matchedOnly && detail.heldAmount) fields.push(["Held", `${fmt(detail.heldAmount, bill.currency)} pending goods receipt`]);
    fields.push(["Next step", "Joins the next Friday payment run; release stays with the Treasurer"]);
    say({ intro: `Bill approved${matchedOnly ? " at the matched amount" : ""}.`, fields, note: "The approval and amounts are recorded in the bill's audit trail." });
    flash(`Bill approved${matchedOnly ? " at the matched amount" : ""}.`);
  };

  const runAction = (a: string) => {
    if (a === "Approve Bill") { approveBill(false); return; }
    if (a === "Approve Matched Amount") { approveBill(true); return; }
    if (a === "Ask Follow-up") { document.querySelector<HTMLTextAreaElement>("textarea")?.focus(); return; }
    if (a === "Show me the three-way match." || a === "What approvals are required?" || a === "Explain the quantity variance.") { send(a); return; }
    if (a === "Confirm Duplicate") {
      log({ actor: "Elena Brooks", actorType: "User", action: "Duplicate confirmed", source: "BILL-2207 comparison", result: "Bill rejected from the payment queue" });
      say({ intro: "Duplicate confirmed. BILL-2219 is rejected from the payment queue and BILL-2207 remains the only payable copy of invoice INV-88312, scheduled for November 30." });
      flash("Duplicate confirmed. This bill will not be paid.");
      return;
    }
    if (a === "Release Hold") {
      setStatus("Needs Review");
      log({ actor: "Elena Brooks", actorType: "User", action: "Hold released", source: "Bill workspace", result: "Bill returned to the review queue" });
      flash("Hold released. The bill is back in the review queue.");
      return;
    }
    if (a === "Place Bill On Hold") {
      setStatus("On Hold");
      log({ actor: "Elena Brooks", actorType: "User", action: "Bill placed on hold", source: "Bill workspace", result: "Removed from payment runs until released" });
      flash("Bill placed on hold.");
      return;
    }
    log({ actor: "Elena Brooks", actorType: "User", action: a, source: "Payables actions", result: a.startsWith("Request") || a.startsWith("Message") ? "Draft prepared for review before sending" : "Logged to the audit trail" });
    say({ intro: `${a}: done. ${a.startsWith("Request") || a.startsWith("Message") ? `A draft to ${bill.vendor} is ready for your review before anything is sent.` : "Logged to the audit trail."}` });
  };

  const attachToFile = (msg: Msg) => {
    const files = msg.files ?? [];
    setDocs((d) => [...d, ...files.map((f) => ({ id: f.id, name: f.name, label: f.isImage ? "Uploaded photo" : fileExt(f.name), size: `${Math.round(f.size / 1000)} KB`, summary: "Added from conversation by Elena Brooks." }))]);
    setMessages((m) => m.map((x) => (x.id === msg.id ? { ...x, attached: true } : x)));
    log({ actor: "Elena Brooks", actorType: "User", action: "Documents added to bill file", source: files.map((f) => f.name).join(", "), result: "Confirmed by user" });
    setConfirm(null); flash(`${files.length} file${files.length > 1 ? "s" : ""} added to bill documents.`);
  };
  const download = (d: Doc) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([`${d.label}\n\n${d.summary}`], { type: "text/plain" }));
    a.download = `${d.name}.txt`; a.click();
  };
  const toAttachment = (d: Doc): Attachment => ({ id: d.id, name: d.name, size: 120000, type: "", isImage: false });

  const panel = <aside className="scrollbar-thin hidden w-[360px] shrink-0 flex-col border-l border-border bg-panel xl:flex">
    <div className="border-b border-border p-4"><AlfiePanelHeader context={`Bill ${bill.id} · ${bill.vendor}`} /></div>
    <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-4">
      {messages.map((m) => m.role === "user" ? <div key={m.id} className="flex flex-col items-end gap-2">
          {m.files?.length ? <><div className="flex flex-wrap justify-end gap-2">{m.files.map((f) => <AttachmentChip key={f.id} file={f} />)}</div><div className="flex items-center gap-2 text-[12px] text-muted-foreground"><Paperclip className="size-3" />{m.files.length} attachment{m.files.length > 1 ? "s" : ""} ready for analysis · Use in this conversation{m.attached ? <span className="text-positive">· Added to bill</span> : <Button size="sm" variant="ghost" className="h-6 px-2 text-[12px]" onClick={() => setConfirm(m)}><Upload className="size-3" />Add to Bill</Button>}</div></> : null}
          <div className="max-w-[80%] rounded-2xl bg-ink px-4 py-2.5 text-sm text-ink-foreground">{m.text}</div>
        </div> : <div key={m.id} className="flex gap-3"><AlfieMark /><div className="min-w-0 flex-1 text-sm leading-6">
          {m.reply ? <ReplyView reply={m.reply} /> : null}
          {m.actions?.length ? <div className="mt-3 flex flex-wrap gap-2">{m.actions.map((a) => <Button key={a} size="sm" variant="secondary" onClick={() => runAction(a)}>{a}</Button>)}</div> : null}
          {m.id === "m0" ? <div className="mt-4 flex flex-wrap gap-2">{prompts.map((p) => <Button key={p} size="sm" variant="secondary" className="max-w-full font-normal" onClick={() => send(p)}><Sparkle className="size-3 shrink-0 text-primary" /><span className="truncate">{p}</span></Button>)}</div> : null}
        </div></div>)}
        {thinking ? <div className="flex items-center gap-3 text-xs text-muted-foreground"><AlfieMark /><span className="animate-pulse">Checking the invoice, purchase order and receipt…</span></div> : null}
        <div ref={endRef} />
    </div>
    <div className="border-t border-border p-4"><AlfieComposer value={input} onChange={setInput} onSend={send} pending={pending} placeholder="Ask Alfie about this bill…" /><p className="mt-2 text-[12px] leading-4 text-muted-foreground">Alfie captures, matches and prepares bills. Approvals follow the AP approval policy, and payment release stays with the Treasurer.</p></div>
  </aside>;

  return <AppShell rightPanel={panel}><div className="flex h-full flex-col">
    <div className="border-b border-border px-5 py-4 lg:px-8">
      <Link to="/payables" className="mb-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3" />Payables</Link>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h1 className="text-xl font-semibold">Bill {bill.id}</h1><p className="mt-1 text-sm text-muted-foreground">{bill.vendor} · {bill.entity}</p><div className="mt-2 flex items-center gap-3 text-[13px] text-muted-foreground"><span className="flex items-center gap-1.5">Status <BillStatusBadge status={status} /></span><span className="flex items-center gap-1.5">Match <MatchBadge match={bill.match} /></span></div></div>
        <div className="flex items-center gap-1">
          <DropdownMenu><DropdownMenuTrigger asChild><Button variant="secondary" size="sm">Actions<ChevronDown className="size-3.5" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel className="text-[12px] uppercase tracking-wider text-muted-foreground">Payables actions</DropdownMenuLabel>
              {standardActions.map((a) => <DropdownMenuItem key={a} onSelect={() => runAction(a)}>{a}</DropdownMenuItem>)}
              <DropdownMenuSeparator /><DropdownMenuLabel className="text-[12px] uppercase tracking-wider text-muted-foreground">Governed actions</DropdownMenuLabel>
              <DropdownMenuItem onSelect={() => runAction("Approve Bill")} className="flex-col items-start gap-0.5" disabled={["Paid", "Approved", "Scheduled", "On Hold"].includes(status)}><span>Approve Bill</span><span className="flex items-center gap-1 text-[12px] text-warning"><ShieldAlert className="size-3" />{approverFor(bill.amount)} approval · recorded in audit</span></DropdownMenuItem>
              <DropdownMenuItem disabled className="flex-col items-start gap-0.5"><span>Release Payment</span><span className="flex items-center gap-1 text-[12px]"><Lock className="size-3" />Permission required · Treasurer (Tom Alvarez)</span></DropdownMenuItem>
            </DropdownMenuContent></DropdownMenu>
          <Button variant="ghost" size="sm" onClick={() => { void navigator.clipboard?.writeText(window.location.href); flash("Link copied to clipboard."); }}><Share2 className="size-3.5" />Share</Button>
          <Button variant="ghost" size="sm" onClick={() => { download({ id: "x", name: `${bill.id}-summary`, label: `Bill ${bill.id}`, size: "", summary: `${bill.vendor} · ${bill.entity}\nInvoice ${bill.invoiceNumber}\nAmount ${fmt(bill.amount, bill.currency)}\nMatch: ${bill.match}` }); log({ actor: "Elena Brooks", actorType: "User", action: "Exported bill", source: "Bill workspace", result: "Summary downloaded" }); }}><Download className="size-3.5" />Export</Button>
          <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="size-8" aria-label="More"><MoreHorizontal className="size-4" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end"><DropdownMenuItem onSelect={() => setTab("activity")}>View activity</DropdownMenuItem><DropdownMenuItem onSelect={() => setTab("payment")}>Open payment</DropdownMenuItem><DropdownMenuItem onSelect={() => runAction("Add AP Note")}>Add note</DropdownMenuItem><DropdownMenuItem asChild><Link to="/payables">Back to queue</Link></DropdownMenuItem></DropdownMenuContent></DropdownMenu>
        </div>
      </div>
      <div className="mt-4 flex gap-1">{(["file", "payment", "activity"] as const).map((t) => <Button key={t} size="sm" variant={tab === t ? "soft" : "ghost"} className={tab === t ? "text-foreground" : ""} onClick={() => setTab(t)}>{t === "file" ? "Bill file" : t === "payment" ? "Payment" : `Activity · ${audit.length}`}</Button>)}</div>
    </div>
    {notice ? <div className="mx-5 mt-3 rounded-lg border border-border bg-secondary px-3 py-2 text-xs lg:mx-8">{notice}</div> : null}

    {tab === "activity" ? <div className="flex-1 px-5 py-5 lg:px-8"><p className="mb-3 text-xs text-muted-foreground">Complete audit trail of user, Alfie, and system activity on this bill.</p><div className="overflow-x-auto rounded-xl border border-border bg-card"><table className="w-full min-w-[680px] text-left text-xs"><thead><tr className="border-b border-border text-[12px] uppercase tracking-wider text-muted-foreground">{["Timestamp", "Actor", "Action", "Source", "Result"].map((h) => <th key={h} className="px-3 py-2.5 font-medium">{h}</th>)}</tr></thead><tbody>{audit.map((e, i) => <tr key={i} className="border-b border-border last:border-0"><td className="whitespace-nowrap px-3 py-2.5 text-muted-foreground">{e.time}</td><td className="px-3 py-2.5"><span className="flex items-center gap-1.5 font-medium">{e.actorType === "Alfie" ? <Bot className="size-3.5 text-primary" /> : null}{e.actor}</span></td><td className="px-3 py-2.5">{e.action}</td><td className="px-3 py-2.5 text-muted-foreground">{e.source}</td><td className="px-3 py-2.5">{e.result}</td></tr>)}</tbody></table></div></div>

    : tab === "payment" ? <div className="flex-1 px-5 py-6 lg:px-8"><div className="mx-auto max-w-3xl">
      <div className="grid gap-3 sm:grid-cols-3"><div className="rounded-xl border border-border bg-card p-4"><p className="text-[13px] text-muted-foreground">Bill Total</p><p className="mt-1 text-2xl font-semibold">{fmt(bill.amount, bill.currency)}</p></div><div className="rounded-xl border border-border bg-card p-4"><p className="text-[13px] text-muted-foreground">Matched Amount</p><p className="mt-1 text-2xl font-semibold">{fmt(detail.matchedAmount, bill.currency)}</p>{detail.heldAmount ? <p className="mt-1 text-[13px] text-warning">{fmt(detail.heldAmount, bill.currency)} held</p> : null}</div><div className="rounded-xl border border-border bg-card p-4"><p className="text-[13px] text-muted-foreground">Payment Status</p><p className="mt-1 text-2xl font-semibold">{status === "Approved" || status === "Scheduled" ? "In payment run" : status === "Paid" ? "Paid" : status === "On Hold" ? "On hold" : "Awaiting approval"}</p></div></div>
      <h3 className="mb-2 mt-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Payment detail</h3>
      <div className="divide-y divide-border rounded-xl border border-border bg-card">{([["Method", "EFT to verified vendor banking"], ["Due date", bill.due], ["Payment runs", "Fridays · entity operating account"], ["Approver required", approverFor(bill.amount)], ["Release", "Treasurer (Tom Alvarez), after approval"]] as const).map(([k, v]) => <div key={k} className="flex items-center gap-3 px-4 py-3 text-sm"><span className="w-36 font-medium">{k}</span><span className="flex-1 text-xs text-muted-foreground">{v}</span></div>)}</div>
      <div className="mt-4 flex flex-wrap gap-2"><Button onClick={() => runAction(detail.heldAmount ? "Approve Matched Amount" : "Approve Bill")} disabled={["Paid", "Approved", "Scheduled", "On Hold"].includes(status)}><Sparkle className="size-3.5" />{detail.heldAmount ? "Approve Matched Amount" : "Approve Bill"}</Button><Button variant="secondary" onClick={() => send("Draft a message to the vendor.")}>Message Vendor</Button></div>
      <p className="mt-4 text-[13px] leading-5 text-muted-foreground">Approving a bill records who approved it and for how much. Releasing the payment is a separate step held by the Treasurer, so no single person can approve and pay the same bill.</p>
    </div></div>

    : <div className="px-5 py-5 lg:px-8"><div className="mx-auto max-w-3xl">
      <ReviewBar status={detail.review.status} title={detail.review.title} detail={detail.review.detail}>
        {bill.id === "BILL-2219" ? <><Button size="sm" variant="secondary" onClick={() => runAction("Release Hold")}>Release hold</Button><Button size="sm" onClick={() => runAction("Confirm Duplicate")}>Confirm duplicate</Button></>
        : detail.heldAmount && bill.match === "Variance" ? <><Button size="sm" variant="secondary" onClick={() => runAction("Request Corrected Invoice")}>Request corrected invoice</Button><Button size="sm" onClick={() => runAction("Approve Matched Amount")}>Approve matched amount</Button></>
        : <><Button size="sm" variant="secondary" onClick={() => runAction("Message Vendor")}>Message vendor</Button><Button size="sm" onClick={() => runAction("Approve Bill")} disabled={["Paid", "Approved", "Scheduled"].includes(status)}>Approve bill</Button></>}
      </ReviewBar>
      <section className="mt-8">
        <div className="mb-3 flex flex-wrap items-center gap-2"><AlfieChip label="Alfie analysis" /><span className="text-xs text-muted-foreground">Capture, duplicate check and three-way match for reviewer decision. Not an approval or a payment.</span></div>
        <div className="rounded-xl border border-border bg-card p-5"><ReplyView reply={detail.analysis} />
          <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">{["Show me the three-way match.", "What approvals are required?"].map((a) => <Button key={a} size="sm" variant="secondary" onClick={() => send(a)}>{a.replace(/\.$/, "")}</Button>)}</div>
        </div>
      </section>
      <Section title="Bill details">
        <dl className="grid grid-cols-2 gap-x-3 gap-y-3 text-xs md:grid-cols-4">
          {([["Bill", bill.id], ["Vendor", bill.vendor], ["Entity", bill.entity], ["Invoice Number", bill.invoiceNumber], ["Category", bill.category], ["Amount", fmt(bill.amount, bill.currency)], ["Due Date", bill.due], ["Purchase Order", bill.poNumber ?? "None"]] as const).map(([k, v]) => <div key={k}><dt className="text-[12px] text-muted-foreground">{k}</dt><dd className="mt-0.5 font-medium">{v}</dd></div>)}
          <div><dt className="text-[12px] text-muted-foreground">Status</dt><dd className="mt-1"><BillStatusBadge status={status} /></dd></div>
          <div><dt className="text-[12px] text-muted-foreground">Owner</dt><dd className="mt-0.5 font-medium">{bill.owner}</dd></div>
        </dl>
      </Section>
      <Section title="Three-way match">
        <div className="overflow-hidden rounded-xl border border-border bg-card"><table className="w-full text-left text-xs"><thead><tr className="border-b border-border bg-secondary/50 text-[12px] uppercase tracking-wider text-muted-foreground">{["Line", "Invoiced", "Ordered (PO)", "Received (GR)", "Result"].map((h) => <th key={h} className="px-3 py-2.5 font-medium">{h}</th>)}</tr></thead><tbody>{detail.matchRows.map((r) => <tr key={r.label} className="border-b border-border last:border-0"><td className="px-3 py-2.5 font-medium">{r.label}</td><td className="px-3 py-2.5 tabular-nums">{r.invoiced}</td><td className="px-3 py-2.5">{r.ordered}</td><td className="px-3 py-2.5">{r.received}</td><td className="px-3 py-2.5">{r.state === "ok" ? <span className="flex items-center gap-1 text-positive"><Check className="size-3.5" />Matched</span> : <span className="flex items-center gap-1 text-warning"><AlertTriangle className="size-3.5" />Variance</span>}</td></tr>)}</tbody></table></div>
        <p className="mt-2 text-[12px] leading-4 text-muted-foreground">Matched {fmt(detail.matchedAmount, bill.currency)} of {fmt(bill.amount, bill.currency)}{detail.heldAmount ? `; ${fmt(detail.heldAmount, bill.currency)} held` : ""}.</p>
      </Section>
      <Section title={`Documents · ${docs.length}`}>
        <div className="space-y-1.5">{docs.map((d) => <button key={d.id} onClick={() => setPreview(d)} className="flex w-full items-center gap-2.5 rounded-lg border border-border bg-card p-2 text-left hover:bg-secondary"><div className="flex size-8 items-center justify-center rounded-md bg-secondary text-muted-foreground"><FileGlyph name={d.name} /></div><div className="min-w-0"><p className="text-xs font-medium">{d.label}</p><p className="truncate text-[12px] text-muted-foreground">{fileExt(d.name)} · {d.name} · {d.size}</p></div></button>)}</div>
      </Section>
      <Section title="Approval policy">
        <div className="space-y-1">{detail.policyRows.map(([k, st, v]) => <div key={k} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs">{st === "ok" ? <Check className="size-3.5 text-positive" /> : st === "warn" ? <AlertTriangle className="size-3.5 text-warning" /> : <HelpCircle className="size-3.5 text-muted-foreground" />}<span className="flex-1">{k}</span><span className={`text-[13px] ${st === "warn" ? "text-warning" : "text-muted-foreground"}`}>{v}</span></div>)}
          <Button size="sm" variant="ghost" className="mt-1 w-full justify-start" onClick={() => setPolicyOpen(true)}><FileText className="size-3.5" />View AP Approval Policy</Button></div>
      </Section>
      <Section title="Assessment">
        {([["Three-Way Match", bill.match === "Matched" ? "Matched" : bill.match, bill.match === "Matched" ? "text-positive" : "text-warning", "Show me the three-way match."], ["Duplicate Check", bill.id === "BILL-2219" ? "Duplicate held" : "Clear", bill.id === "BILL-2219" ? "text-destructive" : "text-positive", "Is this bill a duplicate?"], ["Approval Required", approverFor(bill.amount), "text-warning", "What approvals are required?"], ["Open Exceptions", `${bill.issues} Item${bill.issues === 1 ? "" : "s"}`, bill.issues ? "text-warning" : "text-positive", "Summarize this bill."], ["Payment Timing", `Due ${bill.due}`, "text-primary", "When should this bill be paid?"]] as const).map(([k, v, tone, q]) => <button key={k} onClick={() => send(q)} className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs hover:bg-secondary"><span>{k}</span><span className={`font-medium ${tone}`}>{v}</span></button>)}
        <p className="mt-2 px-2 text-[12px] leading-4 text-muted-foreground">Assessment opens in the Alfie rail. Alfie prepares the bill for a decision. It does not approve or pay it.</p>
      </Section>
      <Section title="Workflow">
        <ol className="space-y-0.5">{workflow.map((step, i) => <li key={step} className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 text-xs ${i === detail.current ? "bg-primary/10 font-semibold text-primary" : i < detail.current ? "text-foreground" : "text-muted-foreground"}`}>{i < detail.current ? <Check className="size-3.5 text-positive" /> : i === detail.current ? <ChevronDown className="size-3.5 -rotate-90" /> : <Circle className="size-3" />}{step}{i === detail.current ? <span className="ml-auto text-[12px] font-medium">Current</span> : null}</li>)}</ol>
        <p className="mt-2 px-2 text-[12px] leading-4 text-muted-foreground">Alfie completed the capture and matching steps. The decision-ready bill is with the approver.</p>
      </Section>
    </div></div>}
    <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}><DialogContent className="max-w-2xl">{preview ? <><DialogHeader><DialogTitle>{preview.label}</DialogTitle><DialogDescription>{fileExt(preview.name)} · {preview.name} · {preview.size}</DialogDescription></DialogHeader>
      <DocumentSheet summary={preview.summary} sections={detail.docSections[preview.id] ?? []} />
      <DialogFooter className="flex-wrap gap-2 sm:justify-start"><Button size="sm" variant="secondary" onClick={() => download(preview)}><Download className="size-3.5" />Download</Button><Button size="sm" variant="secondary" onClick={() => { const d = preview; setPreview(null); send(`Analyze the ${d.label}.`); }}><Sparkle className="size-3.5" />Analyze with Alfie</Button><Button size="sm" variant="secondary" onClick={() => { const d = preview; setPending((p) => (p.some((x) => x.id === d.id) ? p : [...p, toAttachment(d)])); setPreview(null); }}><Paperclip className="size-3.5" />Attach to conversation</Button></DialogFooter></> : null}</DialogContent></Dialog>

    <Dialog open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)}><DialogContent><DialogHeader><DialogTitle>Add to bill file?</DialogTitle><DialogDescription>These files will be added to the permanent document record for {bill.id} and logged in the audit trail.</DialogDescription></DialogHeader>
      <div className="flex flex-wrap gap-2">{confirm?.files?.map((f) => <AttachmentChip key={f.id} file={f} />)}</div>
      <DialogFooter><Button variant="secondary" onClick={() => setConfirm(null)}>Keep in conversation only</Button><Button onClick={() => confirm && attachToFile(confirm)}>Add to Bill</Button></DialogFooter></DialogContent></Dialog>

    <Dialog open={policyOpen} onOpenChange={setPolicyOpen}><DialogContent className="max-w-xl"><DialogHeader><DialogTitle>AP approval policy</DialogTitle><DialogDescription>AP Approval Policy v3.1 · effective January 1, 2026. Rules Alfie applied to this bill.</DialogDescription></DialogHeader>
      <div className="divide-y divide-border rounded-lg border border-border">{detail.policyRows.map(([k, s, , g]) => <div key={k} className="flex items-start gap-2 px-3 py-2.5 text-xs">{s === "ok" ? <Check className="mt-0.5 size-3.5 text-positive" /> : s === "warn" ? <AlertTriangle className="mt-0.5 size-3.5 text-warning" /> : <HelpCircle className="mt-0.5 size-3.5 text-muted-foreground" />}<div><p className="font-medium">{k}</p><p className="text-muted-foreground">{g}</p></div></div>)}</div>
</DialogContent></Dialog>
  </div></AppShell>;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return <section className="mt-6 border-t border-border pt-5"><h3 className="mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{title}</h3>{children}</section>;
}

function ReplyView({ reply }: { reply: Reply }) {
  return <div className="space-y-3 font-display text-[15px] leading-7">
    <p>{reply.intro}</p>
    {reply.items ? <ol className="list-decimal space-y-1.5 pl-5">{reply.items.map((i) => <li key={i}>{i}</li>)}</ol> : null}
    {reply.fields ? <dl className="divide-y divide-border rounded-xl border border-border">{reply.fields.map(([k, v]) => <div key={k} className="grid grid-cols-[150px_1fr] gap-3 px-3 py-2 text-xs"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>)}</dl> : null}
    {reply.draft ? <div className="whitespace-pre-line rounded-xl border border-border bg-card p-4 text-sm leading-6">{reply.draft}</div> : null}
    {reply.note ? <p className="text-xs text-muted-foreground">{reply.note}</p> : null}
    {reply.verdict || reply.next || reply.confidence ? <div className="space-y-1 text-xs">{reply.verdict ? <p><span className="text-muted-foreground">Assessment: </span><span className="font-semibold">{reply.verdict}</span></p> : null}{reply.next ? <p><span className="text-muted-foreground">Recommended next step: </span><span className="font-semibold">{reply.next}</span></p> : null}{reply.confidence ? <p><span className="text-muted-foreground">Confidence: </span><span className="font-semibold">{reply.confidence}</span></p> : null}</div> : null}
    {reply.sources ? <div className="flex flex-wrap items-center gap-1.5"><span className="text-[12px] uppercase tracking-wider text-muted-foreground">Sources</span>{reply.sources.map((s) => <span key={s} className="rounded-full border border-border bg-background px-2 py-0.5 text-[13px]">{s}</span>)}</div> : null}
  </div>;
}
