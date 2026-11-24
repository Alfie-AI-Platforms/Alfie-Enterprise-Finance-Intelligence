import type { Bill, BillAuditEvent, BillCurrency, BillStatus } from "@/lib/worlds/enterprise/payables-data";

export type { Bill, BillAuditEvent, BillCurrency, BillPriority, BillStatus, MatchStatus } from "@/lib/worlds/enterprise/payables-data";

export const billStatuses: readonly BillStatus[] = ["New", "Matching", "Needs Review", "Awaiting Approval", "Approved", "Scheduled", "Paid", "On Hold"];

export const bills: Bill[] = [
  { id: "BILL-3307", vendor: "Lakefront Steel Inc.", entity: "Northline Precision Inc.", category: "Raw materials", invoiceNumber: "STL-2284", status: "Needs Review", priority: "High", owner: "Kevin Doyle", received: "2h ago", receivedDays: 0, due: "Dec 4, 2026", dueMonth: "Dec 2026", dueDays: 18, amount: 214_600, currency: "CAD", match: "Variance", poNumber: "PO-7712", issues: 1 },
  { id: "BILL-3311", vendor: "Northgate Industrial Supply", entity: "Northline Precision Inc.", category: "Tooling and MRO", invoiceNumber: "STL-2291", status: "On Hold", priority: "High", owner: "Kevin Doyle", received: "5h ago", receivedDays: 0, due: "Nov 30, 2026", dueMonth: "Nov 2026", dueDays: 14, amount: 18_940, currency: "CAD", match: "Duplicate held", poNumber: "PO-7740", issues: 1 },
  { id: "BILL-3310", vendor: "Huron Machine Works", entity: "Northline Precision Inc.", category: "Equipment", invoiceNumber: "HMW-1187", status: "Awaiting Approval", priority: "High", owner: "Anita Roy", received: "1h ago", receivedDays: 0, due: "Dec 2, 2026", dueMonth: "Dec 2026", dueDays: 16, amount: 486_000, currency: "CAD", match: "Matched", poNumber: "PO-7690", issues: 0 },
  { id: "BILL-3309", vendor: "Alectra Utilities", entity: "Northline Precision Inc.", category: "Utilities", invoiceNumber: "INV-2026-3411", status: "Scheduled", priority: "Low", owner: "Lucas Meyer", received: "Yesterday", receivedDays: 1, due: "Nov 19, 2026", dueMonth: "Nov 2026", dueDays: 3, amount: 38_640, currency: "CAD", match: "Matched", issues: 0 },
  { id: "BILL-3308", vendor: "Old Dominion Freight Line", entity: "Northline Assembly Inc.", category: "Freight", invoiceNumber: "INV-61042", status: "Awaiting Approval", priority: "Medium", owner: "Kevin Doyle", received: "Yesterday", receivedDays: 1, due: "Nov 24, 2026", dueMonth: "Nov 2026", dueDays: 8, amount: 64_200, currency: "USD", match: "Matched", poNumber: "PO-3355", issues: 0 },
  { id: "BILL-3306", vendor: "Hydro-Québec", entity: "Northline Fabrication Ltée", category: "Utilities", invoiceNumber: "INV-88410", status: "New", priority: "Low", owner: "Lucas Meyer", received: "Yesterday", receivedDays: 1, due: "Dec 6, 2026", dueMonth: "Dec 2026", dueDays: 20, amount: 27_480, currency: "CAD", match: "Matched", issues: 0 },
  { id: "BILL-3305", vendor: "Air Liquide Canada", entity: "Northline Fabrication Ltée", category: "Welding gases", invoiceNumber: "INV-55218", status: "Matching", priority: "Medium", owner: "Kevin Doyle", received: "2d ago", receivedDays: 2, due: "Dec 1, 2026", dueMonth: "Dec 2026", dueDays: 15, amount: 16_820, currency: "CAD", match: "No PO", issues: 1 },
  { id: "BILL-3304", vendor: "Lakefront Steel Inc.", entity: "Northline Precision Inc.", category: "Raw materials", invoiceNumber: "STL-2261", status: "Scheduled", priority: "Medium", owner: "Kevin Doyle", received: "3d ago", receivedDays: 3, due: "Nov 21, 2026", dueMonth: "Nov 2026", dueDays: 5, amount: 168_300, currency: "CAD", match: "Matched", poNumber: "PO-7688", issues: 0 },
  { id: "BILL-3303", vendor: "Bearing Specialists Inc.", entity: "Northline Precision Inc.", category: "Components", invoiceNumber: "INV-90214", status: "Needs Review", priority: "Medium", owner: "Anita Roy", received: "3d ago", receivedDays: 3, due: "Nov 27, 2026", dueMonth: "Nov 2026", dueDays: 11, amount: 42_150, currency: "CAD", match: "No PO", issues: 1 },
  { id: "BILL-3302", vendor: "Indiana Michigan Power", entity: "Northline Assembly Inc.", category: "Utilities", invoiceNumber: "INV-77120", status: "Approved", priority: "Low", owner: "Lucas Meyer", received: "4d ago", receivedDays: 4, due: "Nov 26, 2026", dueMonth: "Nov 2026", dueDays: 10, amount: 19_640, currency: "USD", match: "Matched", issues: 0 },
  { id: "BILL-3301", vendor: "Grant Thornton LLP", entity: "Northline Precision Inc.", category: "Professional services", invoiceNumber: "INV-118", status: "Approved", priority: "Low", owner: "Kevin Doyle", received: "5d ago", receivedDays: 5, due: "Nov 28, 2026", dueMonth: "Nov 2026", dueDays: 12, amount: 28_900, currency: "CAD", match: "Matched", poNumber: "PO-7701", issues: 0 },
  { id: "BILL-3299", vendor: "Fastenal Canada", entity: "Northline Precision Inc.", category: "Tooling and MRO", invoiceNumber: "INV-66231", status: "Paid", priority: "Low", owner: "Anita Roy", received: "6d ago", receivedDays: 6, due: "Nov 13, 2026", dueMonth: "Nov 2026", dueDays: -3, amount: 11_275, currency: "CAD", match: "Matched", poNumber: "PO-7677", issues: 0 },
  { id: "BILL-3298", vendor: "Northgate Industrial Supply", entity: "Northline Precision Inc.", category: "Tooling and MRO", invoiceNumber: "STL-2291", status: "Scheduled", priority: "Low", owner: "Kevin Doyle", received: "Oct 30", receivedDays: 17, due: "Nov 30, 2026", dueMonth: "Nov 2026", dueDays: 14, amount: 18_940, currency: "CAD", match: "Matched", poNumber: "PO-7740", issues: 0 },
];

export const getBill = (id: string) => bills.find((b) => b.id === id);
export const cad = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
export const usd = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
export const fmt = (v: number, c: BillCurrency) => (c === "USD" ? usd(v) : cad(v));
export const compactFmt = (v: number, c: BillCurrency) => (v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1).replace(/\.0$/, "")}M` : fmt(v, c));

/** Approval thresholds under the AP approval policy. Amounts are compared in CAD terms. */
export const approverFor = (amount: number) => (amount > 50_000 ? "VP Finance" : amount >= 10_000 ? "Controller" : "AP Manager");

export const seedBillAudit: BillAuditEvent[] = [
  { time: "Nov 16, 11:20", actor: "Kevin Doyle", actorType: "User", action: "Exception reviewed", source: "AP work queue", result: "Price variance confirmed with Plant 1; routed to VP Finance" },
  { time: "Nov 16, 10:58", actor: "Alfie", actorType: "Alfie", action: "Three-way match run", source: "PO-7712 · GR-5518", result: "Price variance: billed $1,212 per tonne against the PO price of $1,186" },
  { time: "Nov 16, 10:58", actor: "Alfie", actorType: "Alfie", action: "Duplicate check completed", source: "Vendor invoice history", result: "No duplicate found for STL-2284" },
  { time: "Nov 16, 10:57", actor: "Alfie", actorType: "Alfie", action: "Invoice captured", source: "Vendor portal upload", result: "STL-2284 · $214,600 extracted to bill file" },
  { time: "Nov 16, 09:14", actor: "System", actorType: "System", action: "Bill received", source: "Vendor portal", result: "BILL-3307 created" },
];

export const entities: readonly string[] = ["Northline Precision Inc.", "Northline Fabrication Ltée", "Northline Assembly Inc."];

export const entityShortNames: Record<string, string> = {
  "Northline Precision Inc.": "Precision",
  "Northline Fabrication Ltée": "Fabrication",
  "Northline Assembly Inc.": "Assembly",
};

export const erpName = "Epicor Kinetic";

export const treasurerName = "Mark Feldman";

export const flagshipBillId = "BILL-3307";
export const duplicateBillId = "BILL-3311";

export const newBillDefaults = { owner: "Kevin Doyle", firstNumber: 3312, usdEntity: "Northline Assembly Inc." };

export const payablesMetrics: readonly (readonly [string, string, string, boolean])[] = [["Due This Week", "$1.87M", "16 bills · 3 plants", true], ["Awaiting Approval", "5", "2 need VP Finance", true], ["Needs Review", "7", "Match exceptions open", true], ["Held by Alfie", "1", "Duplicate BILL-3311", false], ["DPO", "37 days", "Group payables", true]];

export const payablesExamples: readonly string[] = ["Which bills need my approval?", "What is due this week?", "Show me bills with match exceptions.", "What did Alfie hold?", "Summarize payables by entity.", "Show me the Lakefront Steel bills."];

export type PayablesAnswer = { intro: string; note: string };

export const payablesAnswers: { approval: PayablesAnswer; due: PayablesAnswer; exception: PayablesAnswer; hold: PayablesAnswer; vendor: PayablesAnswer; fallback: PayablesAnswer } = {
  approval: { intro: "2 bills are waiting on a decision. BILL-3310 and BILL-3307 are above the $50,000 threshold, so they need you as VP Finance.", note: "Approval policy: AP Manager up to $10,000, Controller to $50,000, VP Finance above $50,000. BILL-3308 is matched and waiting on the Controller queue review before it routes upward." },
  due: { intro: "2 bills in this queue fall due by November 22.", note: "Across all three plants, $1.87M falls due this week. Payments run on Fridays from the TD operating account once bills are approved." },
  exception: { intro: "4 bills have match exceptions that block payment.", note: "BILL-3307: price variance, billed at $1,212 per tonne against the PO price of $1,186. BILL-3311: duplicate held. BILL-3303 and BILL-3305: no purchase order on file, so they need a reviewer decision before approval." },
  hold: { intro: "Alfie held 1 bill before it could be paid twice.", note: "BILL-3311 carries the same vendor invoice number (STL-2291), amount ($18,940) and purchase order as BILL-3298, which is already scheduled for payment on November 30. The held bill stays out of the payment run until a person confirms it is a duplicate." },
  vendor: { intro: "2 open bills from Lakefront Steel Inc., Northline Precision's largest steel supplier.", note: "Combined open balance $382,900. BILL-3304 is matched and scheduled for the November 21 payment run. BILL-3307 is held at a price variance of $4,420." },
  fallback: { intro: "You have 3 bills that need your attention, based on due date, amount, and open exceptions.", note: "BILL-3307 needs your approval as VP Finance once the price variance is decided. BILL-3311 stays held until the duplicate is confirmed." },
};

export const payablesVendorKeywords: readonly string[] = ["lakefront", "steel"];
export const payablesVendorName = "Lakefront Steel Inc.";

export const billPrompts: readonly string[] = ["Summarize this bill.", "Explain the price variance.", "Show me the three-way match.", "What approvals are required?", "Is this bill a duplicate?", "What happens if we pay the matched amount only?", "Draft a message to the vendor.", "When should this bill be paid?"];

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
      { id: "d1", name: "invoice_STL-2284.pdf", label: "Vendor Invoice", size: "212 KB", summary: "Lakefront Steel Inc. invoice STL-2284 dated November 4, 2026, for Northline Precision Inc. Two lines: hot-rolled steel coil $206,040 and freight $8,560. Total $214,600, terms Net 30, purchase order PO-7712 referenced." },
      { id: "d2", name: "purchase_order_PO-7712.pdf", label: "Purchase Order", size: "96 KB", summary: "Purchase order PO-7712 issued October 27, 2026: 170 tonnes of hot-rolled steel coil at the PO price of $1,186 per tonne ($201,620) plus freight of $8,560. Total authorized $210,180." },
      { id: "d3", name: "goods_receipt_GR-5518.pdf", label: "Goods Receipt", size: "88 KB", summary: "Goods receipt GR-5518 signed at Plant 1 in Guelph on November 13, 2026: 170 tonnes of hot-rolled coil received in good condition. No further deliveries outstanding against PO-7712." },
      { id: "d4", name: "vendor_email_thread.pdf", label: "Vendor Email Thread", size: "41 KB", summary: "Email thread with Lakefront Steel Inc. The vendor says the $1,212 rate applies a November surcharge. Northline's purchasing team has no record of accepting a surcharge, and the PO price of $1,186 stands until a written revision is agreed." },
    ],
    docSections: {
      d1: [
        { heading: "Invoice lines", body: "Line 1: hot-rolled steel coil, 170 tonnes at $1,212 per tonne, $206,040. Line 2: freight, $8,560. Subtotal $214,600. HST is recorded separately in the ledger posting." },
        { heading: "Terms", body: "Terms Net 30 from the invoice date, due December 4, 2026. The invoice references purchase order PO-7712 and delivery to Plant 1 in Guelph." },
      ],
      d2: [
        { heading: "Ordered quantities", body: "170 tonnes of hot-rolled steel coil at $1,186 per tonne ($201,620) and freight of $8,560. Total authorized on this order: $210,180." },
        { heading: "Price note", body: "The PO price of $1,186 per tonne is the average price Northline has paid for hot-rolled coil since July, and it is the price Lakefront accepted when the order was placed. Any surcharge requires a written purchase order revision." },
      ],
      d3: [
        { heading: "Received goods", body: "Received November 13, 2026 at Plant 1: 170 tonnes of hot-rolled steel coil, inspected and accepted. Receiver: plant stores, signature on file." },
        { heading: "Outstanding", body: "Nothing further is outstanding against PO-7712. Quantities on this order are complete; only the price is in dispute." },
      ],
      d4: [
        { heading: "Price discussion", body: "On November 14 the vendor's sales office said the invoice applies a November surcharge that took the rate from $1,186 to $1,212 per tonne. Purchasing replied that no surcharge notice was accepted and asked the vendor to credit the difference or provide the accepted notice." },
      ],
    },
    matchRows: [
      { label: "Line 1 · Hot-rolled steel coil", invoiced: "170 t · $206,040", ordered: "170 t · $1,186/t", received: "170 t", state: "warn" },
      { label: "Line 2 · Freight", invoiced: "$8,560", ordered: "$8,560", received: "Delivered", state: "ok" },
    ],
    matchedAmount: 210_180,
    heldAmount: 4_420,
    policyRows: [
      ["Bill amount", "warn", "VP Finance approval required", "$214,600 exceeds the $50,000 threshold, AP Approval Policy §3.2"],
      ["Three-way match", "warn", "Price variance on line 1", "Billed at $1,212 per tonne against the PO price of $1,186, a variance of $4,420, §2.1"],
      ["Vendor status", "ok", "Approved vendor", "Lakefront Steel Inc., vendor master VM-118, banking verified October 2026"],
      ["Duplicate check", "ok", "No duplicate found", "Invoice STL-2284 has not been recorded before"],
      ["Tax treatment", "ok", "HST recorded separately", "Ontario place of supply, Northline Precision Inc."],
    ],
    analysis: {
      intro: "I captured invoice STL-2284 from Lakefront Steel Inc. and ran the three-way match against purchase order PO-7712 and goods receipt GR-5518. Quantities are clean:",
      items: ["All 170 tonnes were ordered, received and invoiced; the goods receipt at Plant 1 is complete, and freight matches the order.", "The duplicate check is clear and the vendor's banking details on file are verified.", "Line 1 is priced at $1,212 per tonne against the PO price of $1,186, a price variance of $4,420. The vendor calls it a November surcharge; purchasing has no record of accepting it."],
      verdict: "Ready for approval at the matched amount of $210,180, with the $4,420 variance held.",
      next: "Approve the matched amount and hold the variance pending the vendor's surcharge evidence, or request a corrected invoice from the vendor.",
      confidence: "High",
      sources: ["Vendor Invoice STL-2284", "Purchase Order PO-7712", "Goods Receipt GR-5518", "AP Approval Policy v3.1"],
    },
    current: 4,
    review: { status: "VP Finance approval · Exception open", title: "Price variance of $4,420 on line 1", detail: "Alfie matched $210,180 of this $214,600 bill in full. The vendor billed hot-rolled coil at $1,212 per tonne against the PO price of $1,186, applying a surcharge purchasing never accepted. The bill is above $50,000, so the decision sits with you as VP Finance." },
  };
}

function duplicateDetail(bill: Bill): BillDetail {
  return {
    docs: [
      { id: "d1", name: "invoice_STL-2291.pdf", label: "Vendor Invoice", size: "64 KB", summary: "Northgate Industrial Supply invoice STL-2291 dated November 14, 2026, for Northline Precision Inc. Tooling and MRO restock, total $18,940, purchase order PO-7740 referenced." },
      { id: "d2", name: "original_bill_BILL-3298.pdf", label: "Original Bill BILL-3298", size: "58 KB", summary: "The same invoice STL-2291 was captured on October 30 as BILL-3298 and is scheduled for payment on November 30. Vendor, amount, invoice number and purchase order are identical." },
    ],
    docSections: {
      d1: [
        { heading: "Invoice detail", body: "Tooling and MRO restock for Plant 1: inserts, abrasives and coolant lines totalling $18,940. Invoice date November 14, 2026, terms Net 30." },
        { heading: "Capture note", body: "This copy arrived through the vendor portal resend on November 16. The invoice number, amount and purchase order match a bill already in the payment queue." },
      ],
      d2: [
        { heading: "Original capture", body: "BILL-3298 was created on October 30 from the first copy of STL-2291. It passed the three-way match against PO-7740 and is scheduled in the November 30 payment run." },
      ],
    },
    matchRows: [{ label: "Whole invoice", invoiced: "$18,940", ordered: "PO-7740", received: "Matched on BILL-3298", state: "warn" }],
    matchedAmount: 0,
    heldAmount: 18_940,
    policyRows: [
      ["Duplicate check", "warn", "Exact duplicate of BILL-3298", "Same vendor, invoice number, amount and purchase order, AP Approval Policy §2.4"],
      ["Bill amount", "ok", "AP Manager level", "$18,940 is within the Controller band, but the duplicate hold overrides approval routing"],
      ["Vendor status", "ok", "Approved vendor", "Northgate Industrial Supply, vendor master VM-204, banking verified"],
    ],
    analysis: {
      intro: "I held this bill before it entered the payment queue. It is an exact duplicate of BILL-3298:",
      fields: [["This bill", "BILL-3311 · captured Nov 16 from a vendor portal resend"], ["Original bill", "BILL-3298 · captured Oct 30 · scheduled for Nov 30"], ["Invoice", "STL-2291 · Northgate Industrial Supply"], ["Amount", "$18,940 on both bills"], ["Purchase order", "PO-7740 on both bills"]],
      verdict: "Duplicate. BILL-3298 will be paid once, on November 30.",
      next: "Confirm the duplicate so this bill is rejected from the queue, or release the hold if you believe it is a separate charge.",
      confidence: "High",
      sources: ["Vendor Invoice STL-2291", "Bill BILL-3298", "AP Approval Policy §2.4"],
    },
    current: 3,
    review: { status: "Held by Alfie · Duplicate", title: "This bill duplicates BILL-3298", detail: "Same vendor, invoice number STL-2291, amount $18,940 and purchase order PO-7740. The original is already scheduled for payment on November 30, so paying this copy would pay the vendor twice." },
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

export const duplicateOutcome = (bill: Bill) => "Duplicate confirmed. BILL-3311 is rejected from the payment queue and BILL-3298 remains the only payable copy of invoice STL-2291, scheduled for November 30.";

export function billReplyFor(q: string, fileNames: readonly string[], bill: Bill, detail: BillDetail): { reply: BillReply; actions: string[] } {
  const p = q.toLowerCase();
  if (fileNames.length) return { reply: { intro: `I reviewed the ${fileNames.length === 1 ? "uploaded file" : `${fileNames.length} uploaded files`} against this bill.`, items: ["The document agrees with the vendor and entity on the bill.", "No new exception was raised; the open items on the bill are unchanged."], note: "Uploaded files are used in this conversation only and have not been added to the bill file.", confidence: "Medium", sources: [...fileNames] }, actions: ["Ask Follow-up"] };
  if (bill.id === flagshipBillId && p.includes("variance")) return { reply: { intro: "The variance is on line 1 of invoice STL-2284:", fields: [["Invoiced", "170 t · $1,212 per tonne · $206,040"], ["Ordered on PO-7712", "170 t · $1,186 per tonne · $201,620"], ["Received on GR-5518", "170 t · November 13"], ["Variance", "$26 per tonne · $4,420"]], note: "The vendor applied a November surcharge that purchasing never accepted, and the PO price stands until a written revision is agreed. Until the vendor credits the difference or produces the accepted surcharge notice, the $4,420 is not payable under the three-way match rule.", verdict: "Hold the $4,420; the rest of the bill is payable.", confidence: "High", sources: ["Vendor Invoice STL-2284", "Purchase Order PO-7712", "Goods Receipt GR-5518", "Vendor Email Thread"] }, actions: ["Approve Matched Amount", "Request Corrected Invoice", "Ask Follow-up"] };
  if (bill.id === flagshipBillId && (p.includes("goods receipt") || p.includes("receipt"))) return { reply: { intro: "Goods receipt GR-5518, signed at Plant 1 in Guelph on November 13:", fields: [["Hot-rolled coil", "170 tonnes received"], ["Condition", "Accepted, no damage noted"], ["Outstanding on PO-7712", "Nothing further"]], note: "Quantities are not the issue on this bill: everything ordered was received. The open item is price only.", confidence: "High", sources: ["Goods Receipt GR-5518"] }, actions: ["Explain the price variance.", "Ask Follow-up"] };
  if (bill.id === flagshipBillId && p.includes("purchase order")) return { reply: { intro: "Purchase order PO-7712 authorizes $210,180:", fields: [["Hot-rolled coil", "170 t · $1,186 per tonne · $201,620"], ["Freight", "$8,560"], ["Surcharge", "None authorized on this order"]], note: "The invoice exceeds the authorized order by exactly the unaccepted surcharge amount.", confidence: "High", sources: ["Purchase Order PO-7712"] }, actions: ["Explain the price variance.", "Ask Follow-up"] };
  if (bill.id === flagshipBillId && p.includes("vendor invoice")) return { reply: detail.analysis, actions: ["Explain the price variance.", "Show me the three-way match.", "Ask Follow-up"] };
  if (p.includes("match")) return { reply: { intro: "Three-way match, invoice against purchase order against goods receipt:", fields: detail.matchRows.map((r) => [r.label, `Invoiced ${r.invoiced} · Ordered ${r.ordered} · Received ${r.received}`] as [string, string]), verdict: detail.heldAmount ? `${fmt(detail.matchedAmount, bill.currency)} matched in full; ${fmt(detail.heldAmount, bill.currency)} held.` : "Matched in full.", confidence: "High", sources: detail.analysis.sources }, actions: ["Ask Follow-up"] };
  if (p.includes("approval") || p.includes("approve")) return { reply: { intro: "Approvals for this bill under the AP approval policy:", fields: [["AP review", `${bill.owner} · complete`], ["Controller check", bill.amount > 50_000 ? "Priya Nair · exception confirmed" : "Within band, not required"], ["Final approval", `${approverFor(bill.amount)}${bill.amount > 50_000 ? " · pending" : ""}`], ["Payment release", "Treasurer (Mark Feldman) · after approval"]], note: "Thresholds: AP Manager to $10,000, Controller to $50,000, VP Finance above $50,000. Alfie cannot approve or release payments.", confidence: "High", sources: ["AP Approval Policy v3.1"] }, actions: bill.amount > 50_000 ? ["Approve Bill", "Ask Follow-up"] : ["Ask Follow-up"] };
  if (p.includes("duplicate")) return { reply: bill.id === duplicateBillId ? { intro: "Yes. This bill is an exact duplicate of BILL-3298:", fields: detail.analysis.fields ?? [], verdict: "Held by Alfie before it could be paid twice.", confidence: "High", sources: detail.analysis.sources } : { intro: `No. Invoice ${bill.invoiceNumber} from ${bill.vendor} appears once in the bill queue. Alfie checks vendor, invoice number, amount and purchase order on every capture.`, fields: [["Vendor", bill.vendor], ["Invoice number", bill.invoiceNumber], ["Amount", fmt(bill.amount, bill.currency)], ["Result", "No matching bill found"]], confidence: "High", sources: ["Vendor invoice history"] }, actions: ["Ask Follow-up"] };
  if (p.includes("matched amount")) return { reply: { intro: "Paying the matched amount only:", fields: [["Paid in the next run", fmt(detail.matchedAmount, bill.currency)], ["Held back", fmt(detail.heldAmount, bill.currency)], ["Effect on the bill", "The bill closes at the matched value; the held amount stays open against the purchase order"]], note: "If the held amount is later agreed with the vendor, it can be released as a follow-up payment without re-approval under $10,000.", confidence: "High", sources: detail.analysis.sources }, actions: ["Approve Matched Amount", "Ask Follow-up"] };
  if (p.includes("vendor") && (p.includes("message") || p.includes("draft") || p.includes("email"))) return { reply: { intro: "Draft message to the vendor, for your review before sending:", draft: `Hello ${bill.vendor} team, We are processing invoice ${bill.invoiceNumber} for ${fmt(bill.amount, bill.currency)}.${bill.id === flagshipBillId ? " Line 1 is billed at $1,212 per tonne against the PO price of $1,186 on purchase order PO-7712, so we will pay the matched $210,180 now and hold $4,420 until the surcharge is resolved. Could you credit the difference, or provide the surcharge notice our purchasing team accepted?" : " We will confirm our payment timing shortly."} Thank you, Kevin Doyle, AP Manager, Northline Manufacturing Group Inc.`, note: "Nothing has been sent. Use Message Vendor to send after review.", sources: ["Bill file"] }, actions: ["Message Vendor", "Ask Follow-up"] };
  if (p.includes("when") || p.includes("paid") || p.includes("pay")) return { reply: { intro: "Payment timing for this bill:", fields: [["Due date", bill.due], ["Payment runs", "Fridays, from the entity operating account"], ["Status", "Pays in the first run after approval"], ["DPO context", "Group DPO is 37 days"]], note: "Paying on the due date keeps DPO on target. There is no early payment discount on this invoice.", confidence: "High", sources: ["Bill file", "Treasury payment calendar"] }, actions: ["Ask Follow-up"] };
  return { reply: detail.analysis, actions: bill.id === duplicateBillId ? ["Confirm Duplicate", "Release Hold", "Ask Follow-up"] : ["Show me the three-way match.", "What approvals are required?", "Ask Follow-up"] };
}
