export type BillStatus = "New" | "Matching" | "Needs Review" | "Awaiting Approval" | "Approved" | "Scheduled" | "Paid" | "On Hold";
export type BillPriority = "High" | "Medium" | "Low";
export type MatchStatus = "Matched" | "Variance" | "No PO" | "Duplicate held";
export type BillCurrency = "CAD" | "USD";

export type Bill = {
  id: string;
  vendor: string;
  entity: string;
  category: string;
  invoiceNumber: string;
  status: BillStatus;
  priority: BillPriority;
  owner: string;
  received: string;
  receivedDays: number;
  due: string;
  dueMonth: string;
  dueDays: number;
  amount: number;
  currency: BillCurrency;
  match: MatchStatus;
  poNumber?: string;
  issues: number;
};

export const billStatuses: readonly BillStatus[] = ["New", "Matching", "Needs Review", "Awaiting Approval", "Approved", "Scheduled", "Paid", "On Hold"];

export const bills: Bill[] = [
  { id: "BILL-2214", vendor: "Great Lakes Steel Co.", entity: "Meridian Manufacturing Inc.", category: "Raw materials", invoiceNumber: "INV-4471", status: "Needs Review", priority: "High", owner: "Rachel Kim", received: "2h ago", receivedDays: 0, due: "Nov 27, 2026", dueMonth: "Nov 2026", dueDays: 11, amount: 86_400, currency: "CAD", match: "Variance", poNumber: "PO-8812", issues: 1 },
  { id: "BILL-2219", vendor: "Northgate Office Supply", entity: "Meridian Retail Group Inc.", category: "Office supplies", invoiceNumber: "INV-88312", status: "On Hold", priority: "High", owner: "Rachel Kim", received: "5h ago", receivedDays: 0, due: "Nov 30, 2026", dueMonth: "Nov 2026", dueDays: 14, amount: 12_750, currency: "CAD", match: "Duplicate held", poNumber: "PO-5520", issues: 1 },
  { id: "BILL-2220", vendor: "Prairie Welding Supply", entity: "Meridian Manufacturing Inc.", category: "Equipment rental", invoiceNumber: "INV-2210", status: "Matching", priority: "Medium", owner: "Daniel Okafor", received: "1h ago", receivedDays: 0, due: "Dec 1, 2026", dueMonth: "Dec 2026", dueDays: 15, amount: 7_420, currency: "CAD", match: "No PO", issues: 1 },
  { id: "BILL-2218", vendor: "Toronto Hydro", entity: "Meridian Manufacturing Inc.", category: "Utilities", invoiceNumber: "INV-2026-1187", status: "Scheduled", priority: "Low", owner: "Daniel Okafor", received: "Yesterday", receivedDays: 1, due: "Nov 19, 2026", dueMonth: "Nov 2026", dueDays: 3, amount: 48_200, currency: "CAD", match: "Matched", issues: 0 },
  { id: "BILL-2217", vendor: "Day & Ross Freight", entity: "Meridian Logistics LLC", category: "Freight", invoiceNumber: "INV-88410", status: "Awaiting Approval", priority: "Medium", owner: "Rachel Kim", received: "Yesterday", receivedDays: 1, due: "Nov 21, 2026", dueMonth: "Nov 2026", dueDays: 5, amount: 96_300, currency: "USD", match: "Matched", poNumber: "PO-3345", issues: 0 },
  { id: "BILL-2216", vendor: "AEP Ohio", entity: "Meridian Logistics LLC", category: "Utilities", invoiceNumber: "INV-77120", status: "New", priority: "Low", owner: "Daniel Okafor", received: "Yesterday", receivedDays: 1, due: "Dec 5, 2026", dueMonth: "Dec 2026", dueDays: 19, amount: 21_480, currency: "USD", match: "Matched", issues: 0 },
  { id: "BILL-2215", vendor: "Westcoast Store Fixtures", entity: "Meridian Retail Group Inc.", category: "Equipment", invoiceNumber: "INV-3092", status: "Awaiting Approval", priority: "High", owner: "Rachel Kim", received: "2d ago", receivedDays: 2, due: "Nov 22, 2026", dueMonth: "Nov 2026", dueDays: 6, amount: 154_000, currency: "CAD", match: "Matched", poNumber: "PO-5591", issues: 0 },
  { id: "BILL-2213", vendor: "Sterling Tax Advisors", entity: "Meridian Manufacturing Inc.", category: "Professional services", invoiceNumber: "INV-118", status: "Approved", priority: "Low", owner: "Rachel Kim", received: "2d ago", receivedDays: 2, due: "Nov 25, 2026", dueMonth: "Nov 2026", dueDays: 9, amount: 32_500, currency: "CAD", match: "Matched", poNumber: "PO-8770", issues: 0 },
  { id: "BILL-2212", vendor: "Niagara Fasteners Inc.", entity: "Meridian Manufacturing Inc.", category: "Raw materials", invoiceNumber: "INV-66231", status: "Needs Review", priority: "Medium", owner: "Daniel Okafor", received: "3d ago", receivedDays: 3, due: "Nov 26, 2026", dueMonth: "Nov 2026", dueDays: 10, amount: 18_340, currency: "CAD", match: "No PO", issues: 1 },
  { id: "BILL-2211", vendor: "Cascade Janitorial Services", entity: "Meridian Retail Group Inc.", category: "Facilities", invoiceNumber: "INV-447", status: "Paid", priority: "Low", owner: "Rachel Kim", received: "4d ago", receivedDays: 4, due: "Nov 14, 2026", dueMonth: "Nov 2026", dueDays: -2, amount: 9_860, currency: "CAD", match: "Matched", poNumber: "PO-5488", issues: 0 },
  { id: "BILL-2210", vendor: "BC Hydro", entity: "Meridian Retail Group Inc.", category: "Utilities", invoiceNumber: "INV-99120", status: "Paid", priority: "Low", owner: "Daniel Okafor", received: "5d ago", receivedDays: 5, due: "Nov 12, 2026", dueMonth: "Nov 2026", dueDays: -4, amount: 14_275, currency: "CAD", match: "Matched", issues: 0 },
  { id: "BILL-2209", vendor: "Great Lakes Steel Co.", entity: "Meridian Manufacturing Inc.", category: "Raw materials", invoiceNumber: "INV-4455", status: "Scheduled", priority: "Medium", owner: "Rachel Kim", received: "6d ago", receivedDays: 6, due: "Nov 20, 2026", dueMonth: "Nov 2026", dueDays: 4, amount: 212_600, currency: "CAD", match: "Matched", poNumber: "PO-8790", issues: 0 },
  { id: "BILL-2207", vendor: "Northgate Office Supply", entity: "Meridian Retail Group Inc.", category: "Office supplies", invoiceNumber: "INV-88312", status: "Scheduled", priority: "Low", owner: "Rachel Kim", received: "Oct 30", receivedDays: 17, due: "Nov 30, 2026", dueMonth: "Nov 2026", dueDays: 14, amount: 12_750, currency: "CAD", match: "Matched", poNumber: "PO-5520", issues: 0 },
];

export const getBill = (id: string) => bills.find((b) => b.id === id);
export const cad = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
export const usd = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
export const fmt = (v: number, c: BillCurrency) => (c === "USD" ? usd(v) : cad(v));
export const compactFmt = (v: number, c: BillCurrency) => (v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1).replace(/\.0$/, "")}M` : fmt(v, c));

/** Approval thresholds under the AP approval policy. Amounts are compared in CAD terms. */
export const approverFor = (amount: number) => (amount > 50_000 ? "VP Finance" : amount >= 10_000 ? "Controller" : "AP Manager");

export type BillAuditEvent = { time: string; actor: string; actorType: "User" | "Alfie" | "System"; action: string; source: string; result: string };

export const seedBillAudit: BillAuditEvent[] = [
  { time: "Nov 16, 11:20", actor: "Rachel Kim", actorType: "User", action: "Exception reviewed", source: "AP work queue", result: "Variance confirmed with the plant; routed to VP Finance" },
  { time: "Nov 16, 10:58", actor: "Alfie", actorType: "Alfie", action: "Three-way match run", source: "PO-8812 · GR-3391", result: "Variance on line 2: $4,500" },
  { time: "Nov 16, 10:58", actor: "Alfie", actorType: "Alfie", action: "Duplicate check completed", source: "Vendor invoice history", result: "No duplicate found for INV-4471" },
  { time: "Nov 16, 10:57", actor: "Alfie", actorType: "Alfie", action: "Invoice captured", source: "Vendor portal upload", result: "INV-4471 · $86,400 extracted to bill file" },
  { time: "Nov 16, 09:14", actor: "System", actorType: "System", action: "Bill received", source: "Vendor portal", result: "BILL-2214 created" },
];

export const entities: readonly string[] = ["Meridian Manufacturing Inc.", "Meridian Logistics LLC", "Meridian Retail Group Inc."];

export const entityShortNames: Record<string, string> = {
  "Meridian Manufacturing Inc.": "Manufacturing",
  "Meridian Logistics LLC": "Logistics",
  "Meridian Retail Group Inc.": "Retail Group",
};

export const erpName = "NetSuite";

export const treasurerName = "Tom Alvarez";

export const flagshipBillId = "BILL-2214";
export const duplicateBillId = "BILL-2219";

export const newBillDefaults = { owner: "Rachel Kim", firstNumber: 2221, usdEntity: "Meridian Logistics LLC" };

export const payablesMetrics: readonly (readonly [string, string, string, boolean])[] = [["Due This Week", "$1.26M", "14 bills · 3 entities", true], ["Awaiting Approval", "6", "2 need VP Finance", true], ["Needs Review", "9", "Match exceptions open", true], ["Held by Alfie", "1", "Duplicate BILL-2219", false], ["DPO", "44 days", "Target 45 days", true]];

export const payablesExamples: readonly string[] = ["Which bills need my approval?", "What is due this week?", "Show me bills with match exceptions.", "What did Alfie hold?", "Summarize payables by entity.", "Show me the Great Lakes Steel bills."];

export type PayablesAnswer = { intro: string; note: string };

export const payablesAnswers: { approval: PayablesAnswer; due: PayablesAnswer; exception: PayablesAnswer; hold: PayablesAnswer; vendor: PayablesAnswer; fallback: PayablesAnswer } = {
  approval: { intro: "3 bills are waiting on a decision. BILL-2214 and BILL-2215 are above the $50,000 threshold, so they need you as VP Finance.", note: "Approval policy: AP Manager up to $10,000, Controller to $50,000, VP Finance above $50,000. BILL-2217 is matched and waiting on the Controller queue review before it routes upward." },
  due: { intro: "4 bills in this queue fall due by November 22.", note: "Across all three entities, $1.26M falls due this week. Payments run on Fridays from the TD operating account once bills are approved." },
  exception: { intro: "4 bills have match exceptions that block payment.", note: "BILL-2214: quantity variance of $4,500 on one line. BILL-2219: duplicate held. BILL-2212 and BILL-2220: no purchase order on file, so they need a reviewer decision before approval." },
  hold: { intro: "Alfie held 1 bill before it could be paid twice.", note: "BILL-2219 carries the same vendor invoice number (INV-88312), amount ($12,750) and purchase order as BILL-2207, which is already scheduled for payment on November 30. The held bill stays out of the payment run until a person confirms it is a duplicate." },
  vendor: { intro: "2 open bills from Great Lakes Steel Co., Meridian Manufacturing's largest materials vendor.", note: "Combined open balance $299,000. BILL-2209 is matched and scheduled for the November 20 payment run. BILL-2214 is held at a $4,500 quantity variance." },
  fallback: { intro: "You have 3 bills that need your attention, based on due date, amount, and open exceptions.", note: "BILL-2214 needs your approval as VP Finance once the quantity variance is decided. BILL-2219 stays held until the duplicate is confirmed." },
};

export const payablesVendorKeywords: readonly string[] = ["great lakes", "steel"];
export const payablesVendorName = "Great Lakes Steel Co.";

export const billPrompts: readonly string[] = ["Summarize this bill.", "Explain the quantity variance.", "Show me the three-way match.", "What approvals are required?", "Is this bill a duplicate?", "What happens if we pay the matched amount only?", "Draft a message to the vendor.", "When should this bill be paid?"];

export type DocSection = { heading: string; body: string };
export type BillDoc = { id: string; name: string; label: string; size: string; summary: string };
export type BillReply = { intro: string; items?: string[]; fields?: [string, string][]; next?: string; verdict?: string; confidence?: string; sources?: string[] | undefined; note?: string; draft?: string };
export type BillMatchRow = { label: string; invoiced: string; ordered: string; received: string; state: "ok" | "warn" };
export type BillPolicyRow = readonly [string, "ok" | "warn" | "unknown", string, string];
export type BillDetail = {
  docs: BillDoc[];
  docSections: Record<string, DocSection[]>;
  matchRows: BillMatchRow[];
  matchedAmount: number;
  heldAmount: number;
  policyRows: readonly BillPolicyRow[];
  analysis: BillReply;
  current: number;
  review: { status: string; title: string; detail: string };
};

const currentForStatus = (s: BillStatus) => (s === "New" ? 1 : s === "Matching" ? 2 : s === "Needs Review" || s === "On Hold" ? 3 : s === "Awaiting Approval" ? 4 : s === "Approved" || s === "Scheduled" ? 5 : 6);

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
    current: currentForStatus(bill.status),
    review: matched
      ? { status: `${approverFor(bill.amount)} approval`, title: `Matched in full at ${fmt(bill.amount, bill.currency)}`, detail: `Invoice, purchase order and receipt agree for this ${bill.vendor} bill. Approval routes to the ${approverFor(bill.amount)} under the AP approval policy.` }
      : { status: "Exception open", title: bill.match === "No PO" ? "No purchase order on file" : "Match exception open", detail: `This ${bill.vendor} bill cannot be approved until the exception is resolved. Alfie has prepared the comparison for review.` },
  };
}

export function detailForBill(bill: Bill): BillDetail {
  if (bill.id === flagshipBillId) return flagshipDetail(bill);
  if (bill.id === duplicateBillId) return duplicateDetail(bill);
  return genericDetail(bill);
}

export function billAuditFor(bill: Bill): BillAuditEvent[] {
  if (bill.id === flagshipBillId) return seedBillAudit;
  const original = bills.find((b) => b.id !== bill.id && b.invoiceNumber === bill.invoiceNumber);
  return [
    { time: "Nov 16, 10:41", actor: "Alfie", actorType: "Alfie", action: "Three-way match run", source: bill.poNumber ?? "Charge schedule", result: bill.match === "Matched" ? "Matched in full" : `Exception: ${bill.match}` },
    { time: "Nov 16, 10:41", actor: "Alfie", actorType: "Alfie", action: "Duplicate check completed", source: "Vendor invoice history", result: bill.id === duplicateBillId && original ? `Duplicate of ${original.id} found; bill held` : "No duplicate found" },
    { time: "Nov 16, 09:02", actor: "System", actorType: "System", action: "Bill received", source: "Vendor feed", result: `${bill.id} created` },
  ];
}

export const duplicateOutcome = (bill: Bill) => "Duplicate confirmed. BILL-2219 is rejected from the payment queue and BILL-2207 remains the only payable copy of invoice INV-88312, scheduled for November 30.";

export function billReplyFor(q: string, fileNames: readonly string[], bill: Bill, detail: BillDetail): { reply: BillReply; actions: string[] } {
  const p = q.toLowerCase();
  if (fileNames.length) return { reply: { intro: `I reviewed the ${fileNames.length === 1 ? "uploaded file" : `${fileNames.length} uploaded files`} against this bill.`, items: ["The document agrees with the vendor and entity on the bill.", "No new exception was raised; the open items on the bill are unchanged."], note: "Uploaded files are used in this conversation only and have not been added to the bill file.", confidence: "Medium", sources: [...fileNames] }, actions: ["Ask Follow-up"] };
  if (bill.id === flagshipBillId && p.includes("variance")) return { reply: { intro: "The variance is on line 2 of invoice INV-4471:", fields: [["Invoiced", "8 tonnes · $18,000"], ["Ordered on PO-8812", "6 tonnes · $13,500"], ["Received on GR-3391", "6 tonnes · November 13"], ["Variance", "2 tonnes · $4,500"]], note: "The plant requested a PO amendment for the extra 2 tonnes on November 10, but it was never confirmed, and the vendor's email thread says the tonnage ships the week of November 23. Until a goods receipt exists, the $4,500 is not payable under the three-way match rule.", verdict: "Hold the $4,500; the rest of the bill is payable.", confidence: "High", sources: ["Vendor Invoice INV-4471", "Purchase Order PO-8812", "Goods Receipt GR-3391", "Vendor Email Thread"] }, actions: ["Approve Matched Amount", "Request Corrected Invoice", "Ask Follow-up"] };
  if (bill.id === flagshipBillId && (p.includes("goods receipt") || p.includes("receipt"))) return { reply: { intro: "Goods receipt GR-3391, signed at the Toronto plant on November 13:", fields: [["Hot-rolled coil", "24 tonnes received"], ["Cold-rolled sheet", "6 tonnes received"], ["Condition", "Accepted, no damage noted"], ["Outstanding on PO-8812", "Nothing further"]], note: "The receipt is the reason the extra 2 invoiced tonnes cannot be paid yet: there is no receipt for them.", confidence: "High", sources: ["Goods Receipt GR-3391"] }, actions: ["Explain the quantity variance.", "Ask Follow-up"] };
  if (bill.id === flagshipBillId && p.includes("purchase order")) return { reply: { intro: "Purchase order PO-8812 authorizes $81,900:", fields: [["Hot-rolled coil", "24 tonnes · $68,400"], ["Cold-rolled sheet", "6 tonnes · $13,500"], ["Amendment", "2 extra tonnes requested Nov 10, not confirmed"]], note: "The invoice exceeds the authorized order by exactly the unconfirmed amendment quantity.", confidence: "High", sources: ["Purchase Order PO-8812"] }, actions: ["Explain the quantity variance.", "Ask Follow-up"] };
  if (bill.id === flagshipBillId && p.includes("vendor invoice")) return { reply: detail.analysis, actions: ["Explain the quantity variance.", "Show me the three-way match.", "Ask Follow-up"] };
  if (p.includes("match")) return { reply: { intro: "Three-way match, invoice against purchase order against goods receipt:", fields: detail.matchRows.map((r) => [r.label, `Invoiced ${r.invoiced} · Ordered ${r.ordered} · Received ${r.received}`] as [string, string]), verdict: detail.heldAmount ? `${fmt(detail.matchedAmount, bill.currency)} matched in full; ${fmt(detail.heldAmount, bill.currency)} held.` : "Matched in full.", confidence: "High", sources: detail.analysis.sources }, actions: ["Ask Follow-up"] };
  if (p.includes("approval") || p.includes("approve")) return { reply: { intro: "Approvals for this bill under the AP approval policy:", fields: [["AP review", `${bill.owner} · complete`], ["Controller check", bill.amount > 50_000 ? "Marcus Webb · exception confirmed" : "Within band, not required"], ["Final approval", `${approverFor(bill.amount)}${bill.amount > 50_000 ? " · pending" : ""}`], ["Payment release", "Treasurer (Tom Alvarez) · after approval"]], note: "Thresholds: AP Manager to $10,000, Controller to $50,000, VP Finance above $50,000. Alfie cannot approve or release payments.", confidence: "High", sources: ["AP Approval Policy v3.1"] }, actions: bill.amount > 50_000 ? ["Approve Bill", "Ask Follow-up"] : ["Ask Follow-up"] };
  if (p.includes("duplicate")) return { reply: bill.id === duplicateBillId ? { intro: "Yes. This bill is an exact duplicate of BILL-2207:", fields: detail.analysis.fields ?? [], verdict: "Held by Alfie before it could be paid twice.", confidence: "High", sources: detail.analysis.sources } : { intro: `No. Invoice ${bill.invoiceNumber} from ${bill.vendor} appears once in the bill queue. Alfie checks vendor, invoice number, amount and purchase order on every capture.`, fields: [["Vendor", bill.vendor], ["Invoice number", bill.invoiceNumber], ["Amount", fmt(bill.amount, bill.currency)], ["Result", "No matching bill found"]], confidence: "High", sources: ["Vendor invoice history"] }, actions: ["Ask Follow-up"] };
  if (p.includes("matched amount")) return { reply: { intro: "Paying the matched amount only:", fields: [["Paid in the next run", fmt(detail.matchedAmount, bill.currency)], ["Held back", fmt(detail.heldAmount, bill.currency)], ["Effect on the bill", "The bill closes at the matched value; the held amount stays open against the purchase order"]], note: "If the held goods arrive and a goods receipt is recorded, the held amount can be released as a follow-up payment without re-approval under $10,000.", confidence: "High", sources: detail.analysis.sources }, actions: ["Approve Matched Amount", "Ask Follow-up"] };
  if (p.includes("vendor") && (p.includes("message") || p.includes("draft") || p.includes("email"))) return { reply: { intro: "Draft message to the vendor, for your review before sending:", draft: `Hello ${bill.vendor} team, We are processing invoice ${bill.invoiceNumber} for ${fmt(bill.amount, bill.currency)}.${bill.id === flagshipBillId ? " Line 2 is invoiced at 8 tonnes against 6 tonnes received on goods receipt GR-3391, so we will pay the matched $81,900 now and hold $4,500 until the remaining tonnage is received. Could you confirm the shipment date for the balance, or issue a corrected invoice?" : " We will confirm our payment timing shortly."} Thank you, Rachel Kim, AP Manager, Meridian Group Inc.`, note: "Nothing has been sent. Use Message Vendor to send after review.", sources: ["Bill file"] }, actions: ["Message Vendor", "Ask Follow-up"] };
  if (p.includes("when") || p.includes("paid") || p.includes("pay")) return { reply: { intro: "Payment timing for this bill:", fields: [["Due date", bill.due], ["Payment runs", "Fridays, from the entity operating account"], ["Status", "Pays in the first run after approval"], ["DPO context", "Group DPO is 44 days against a 45 day target"]], note: "Paying on the due date keeps DPO on target. There is no early payment discount on this invoice.", confidence: "High", sources: ["Bill file", "Treasury payment calendar"] }, actions: ["Ask Follow-up"] };
  return { reply: detail.analysis, actions: bill.id === duplicateBillId ? ["Confirm Duplicate", "Release Hold", "Ask Follow-up"] : ["Show me the three-way match.", "What approvals are required?", "Ask Follow-up"] };
}
