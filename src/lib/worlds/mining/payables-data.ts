import type { Bill, BillAuditEvent, BillCurrency, BillStatus } from "@/lib/worlds/enterprise/payables-data";

export type { Bill, BillAuditEvent, BillCurrency, BillPriority, BillStatus, MatchStatus } from "@/lib/worlds/enterprise/payables-data";

export const billStatuses: readonly BillStatus[] = ["New", "Matching", "Needs Review", "Awaiting Approval", "Approved", "Scheduled", "Paid", "On Hold"];

export const bills: Bill[] = [
  { id: "BILL-5108", vendor: "Summit Drilling Ltd.", entity: "Aurora Ridge Mining Corp.", category: "Drilling services", invoiceNumber: "SD-4471", status: "Needs Review", priority: "High", owner: "Susan Park", received: "2h ago", receivedDays: 0, due: "Dec 3, 2026", dueMonth: "Dec 2026", dueDays: 17, amount: 386_200, currency: "CAD", match: "Variance", poNumber: "PO-6104", issues: 1 },
  { id: "BILL-5113", vendor: "Northern Explosives Ltd.", entity: "Aurora Ridge Mining Corp.", category: "Explosives", invoiceNumber: "NE-8814", status: "On Hold", priority: "High", owner: "Susan Park", received: "4h ago", receivedDays: 0, due: "Nov 29, 2026", dueMonth: "Nov 2026", dueDays: 13, amount: 64_800, currency: "CAD", match: "Duplicate held", poNumber: "PO-6148", issues: 1 },
  { id: "BILL-5112", vendor: "Kestrel Resources Inc.", entity: "Copperline Metals JV", category: "JV cash call", invoiceNumber: "KR-CALL-1042", status: "Awaiting Approval", priority: "High", owner: "Peter Lindqvist", received: "1h ago", receivedDays: 0, due: "Nov 25, 2026", dueMonth: "Nov 2026", dueDays: 9, amount: 1_240_000, currency: "CAD", match: "No PO", issues: 0 },
  { id: "BILL-5111", vendor: "Finning Canada", entity: "Aurora Ridge Mining Corp.", category: "Equipment maintenance", invoiceNumber: "FIN-90231", status: "Awaiting Approval", priority: "Medium", owner: "Peter Lindqvist", received: "Yesterday", receivedDays: 1, due: "Nov 23, 2026", dueMonth: "Nov 2026", dueDays: 7, amount: 212_400, currency: "CAD", match: "Matched", poNumber: "PO-6097", issues: 0 },
  { id: "BILL-5110", vendor: "Northern Fuel Distributors", entity: "Aurora Ridge Mining Corp.", category: "Diesel fuel", invoiceNumber: "NFD-2210", status: "Scheduled", priority: "Medium", owner: "Susan Park", received: "Yesterday", receivedDays: 1, due: "Nov 20, 2026", dueMonth: "Nov 2026", dueDays: 4, amount: 428_600, currency: "CAD", match: "Matched", poNumber: "PO-6088", issues: 0 },
  { id: "BILL-5109", vendor: "NV Energy", entity: "Aurora Ridge USA Inc.", category: "Utilities", invoiceNumber: "INV-77120", status: "New", priority: "Low", owner: "Susan Park", received: "Yesterday", receivedDays: 1, due: "Dec 5, 2026", dueMonth: "Dec 2026", dueDays: 19, amount: 86_300, currency: "USD", match: "Matched", issues: 0 },
  { id: "BILL-5107", vendor: "Keno Ridge Camp Services", entity: "Aurora Ridge Mining Corp.", category: "Camp and catering", invoiceNumber: "KRC-1187", status: "Matching", priority: "Medium", owner: "Peter Lindqvist", received: "2d ago", receivedDays: 2, due: "Dec 1, 2026", dueMonth: "Dec 2026", dueDays: 15, amount: 58_900, currency: "CAD", match: "No PO", issues: 1 },
  { id: "BILL-5106", vendor: "ALS Geochemistry", entity: "Aurora Ridge Mining Corp.", category: "Assay services", invoiceNumber: "ALS-77120", status: "Approved", priority: "Low", owner: "Susan Park", received: "2d ago", receivedDays: 2, due: "Nov 26, 2026", dueMonth: "Nov 2026", dueDays: 10, amount: 24_680, currency: "CAD", match: "Matched", poNumber: "PO-6119", issues: 0 },
  { id: "BILL-5105", vendor: "Austin Powder Company", entity: "Aurora Ridge USA Inc.", category: "Explosives", invoiceNumber: "INV-88410", status: "Needs Review", priority: "Medium", owner: "Susan Park", received: "3d ago", receivedDays: 3, due: "Nov 27, 2026", dueMonth: "Nov 2026", dueDays: 11, amount: 47_300, currency: "USD", match: "Variance", poNumber: "PO-2214", issues: 1 },
  { id: "BILL-5104", vendor: "Brink's Canada", entity: "Aurora Ridge Mining Corp.", category: "Secure transport", invoiceNumber: "BRK-3391", status: "Scheduled", priority: "Low", owner: "Peter Lindqvist", received: "4d ago", receivedDays: 4, due: "Nov 21, 2026", dueMonth: "Nov 2026", dueDays: 5, amount: 18_420, currency: "CAD", match: "Matched", poNumber: "PO-6126", issues: 0 },
  { id: "BILL-5103", vendor: "Hydro One Networks", entity: "Aurora Ridge Mining Corp.", category: "Utilities", invoiceNumber: "INV-99120", status: "Paid", priority: "Low", owner: "Susan Park", received: "5d ago", receivedDays: 5, due: "Nov 13, 2026", dueMonth: "Nov 2026", dueDays: -3, amount: 96_750, currency: "CAD", match: "Matched", issues: 0 },
  { id: "BILL-5102", vendor: "Northern Explosives Ltd.", entity: "Aurora Ridge Mining Corp.", category: "Explosives", invoiceNumber: "NE-8814", status: "Scheduled", priority: "Low", owner: "Susan Park", received: "Oct 29", receivedDays: 18, due: "Nov 29, 2026", dueMonth: "Nov 2026", dueDays: 13, amount: 64_800, currency: "CAD", match: "Matched", poNumber: "PO-6148", issues: 0 },
  { id: "BILL-5101", vendor: "Summit Drilling Ltd.", entity: "Aurora Ridge Mining Corp.", category: "Drilling services", invoiceNumber: "SD-4419", status: "Paid", priority: "Low", owner: "Peter Lindqvist", received: "6d ago", receivedDays: 6, due: "Nov 10, 2026", dueMonth: "Nov 2026", dueDays: -6, amount: 298_400, currency: "CAD", match: "Matched", poNumber: "PO-6071", issues: 0 },
];

export const getBill = (id: string) => bills.find((b) => b.id === id);
export const cad = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
export const usd = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
export const fmt = (v: number, c: BillCurrency) => (c === "USD" ? usd(v) : cad(v));
export const compactFmt = (v: number, c: BillCurrency) => (v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1).replace(/\.0$/, "")}M` : fmt(v, c));

/** Approval thresholds under the AP approval policy. Amounts are compared in CAD terms. */
export const approverFor = (amount: number) => (amount > 50_000 ? "VP Finance" : amount >= 10_000 ? "Controller" : "AP Manager");

export const seedBillAudit: BillAuditEvent[] = [
  { time: "Nov 16, 11:20", actor: "Susan Park", actorType: "User", action: "Exception reviewed", source: "AP work queue", result: "Quantity variance confirmed with the Keno Ridge survey team; $17,900 held and the balance routed to VP Finance" },
  { time: "Nov 16, 10:58", actor: "Alfie", actorType: "Alfie", action: "Three-way match run", source: "PO-6104 · Survey report SR-221", result: "Quantity variance: 4,120 metres billed against 3,940 metres verified by survey" },
  { time: "Nov 16, 10:58", actor: "Alfie", actorType: "Alfie", action: "Duplicate check completed", source: "Vendor invoice history", result: "No duplicate found for SD-4471" },
  { time: "Nov 16, 10:57", actor: "Alfie", actorType: "Alfie", action: "Invoice captured", source: "Vendor portal upload", result: "SD-4471 · $386,200 extracted to bill file" },
  { time: "Nov 16, 09:14", actor: "System", actorType: "System", action: "Bill received", source: "Vendor portal", result: "BILL-5108 created" },
];

export const entities: readonly string[] = ["Aurora Ridge Mining Corp.", "Aurora Ridge USA Inc.", "Copperline Metals JV"];

export const entityShortNames: Record<string, string> = {
  "Aurora Ridge Mining Corp.": "Mining",
  "Aurora Ridge USA Inc.": "USA",
  "Copperline Metals JV": "Copperline Metals JV",
};

export const erpName = "SAP S/4HANA";

export const treasurerName = "Angela Ruiz";

export const flagshipBillId = "BILL-5108";
export const duplicateBillId = "BILL-5113";

export const newBillDefaults = { owner: "Susan Park", firstNumber: 5114, usdEntity: "Aurora Ridge USA Inc." };

export const payablesMetrics: readonly (readonly [string, string, string, boolean])[] = [["Due This Week", "$3.46M", "18 bills · 3 entities", true], ["Awaiting Approval", "5", "2 need VP Finance", true], ["Needs Review", "8", "Match exceptions open", true], ["Held by Alfie", "1", "Duplicate BILL-5113", false], ["DPO", "41 days", "Site and JV payables", true]];

export const payablesExamples: readonly string[] = ["Which bills need my approval?", "What is due this week?", "Show me bills with match exceptions.", "What did Alfie hold?", "Summarize payables by entity.", "Show me the Summit Drilling bills."];

export type PayablesAnswer = { intro: string; note: string };

export const payablesAnswers: { approval: PayablesAnswer; due: PayablesAnswer; exception: PayablesAnswer; hold: PayablesAnswer; vendor: PayablesAnswer; fallback: PayablesAnswer } = {
  approval: { intro: "2 bills are waiting on a decision. BILL-5112 and BILL-5108 are above the $50,000 threshold, so they need you as VP Finance.", note: "Approval policy: AP Manager up to $10,000, Controller to $50,000, VP Finance above $50,000. BILL-5111 is matched and waiting on the Controller queue review before it routes upward." },
  due: { intro: "2 bills in this queue fall due by November 22.", note: "Across the sites and the joint venture, $3.46M falls due this week. Payments run on Fridays from the RBC operating account once bills are approved." },
  exception: { intro: "5 bills have match exceptions that block payment.", note: "BILL-5108: quantity variance of $17,900 on the drilling invoice. BILL-5113: duplicate held. BILL-5105: variance open on the explosives bill. BILL-5107 and BILL-5112: no purchase order on file, so they need a reviewer decision before approval." },
  hold: { intro: "Alfie held 1 bill before it could be paid twice.", note: "BILL-5113 carries the same vendor invoice number (NE-8814), amount ($64,800) and purchase order as BILL-5102, which is already scheduled for payment on November 29. The held bill stays out of the payment run until a person confirms it is a duplicate." },
  vendor: { intro: "1 open bill from Summit Drilling Ltd., the Keno Ridge drilling contractor.", note: "BILL-5108 is held at a quantity variance: 4,120 metres billed against 3,940 metres verified by survey, with $17,900 held. The previous drilling bill, BILL-5101, was matched and paid in full." },
  fallback: { intro: "You have 3 bills that need your attention, based on due date, amount, and open exceptions.", note: "BILL-5108 needs your approval as VP Finance once the quantity variance is decided. BILL-5113 stays held until the duplicate is confirmed." },
};

export const payablesVendorKeywords: readonly string[] = ["summit", "drilling"];
export const payablesVendorName = "Summit Drilling Ltd.";

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
      { id: "d1", name: "invoice_SD-4471.pdf", label: "Vendor Invoice", size: "212 KB", summary: "Summit Drilling Ltd. invoice SD-4471 dated November 3, 2026, for Aurora Ridge Mining Corp. October drilling program at Keno Ridge: 4,120 metres billed, total $386,200, terms Net 30, purchase order PO-6104 referenced." },
      { id: "d2", name: "purchase_order_PO-6104.pdf", label: "Purchase Order", size: "96 KB", summary: "Purchase order PO-6104 under the drilling services contract covers the October program at Keno Ridge. Drilling is billed per metre and payable on metres verified by the Aurora Ridge survey team." },
      { id: "d3", name: "survey_report_SR-221.pdf", label: "Survey Report", size: "88 KB", summary: "Survey report SR-221 from the Keno Ridge survey team: 3,940 metres verified for the October program. The 180 metre difference against the invoice sits in two holes where the contractor measured from the collar and the survey team from the corrected datum." },
      { id: "d4", name: "vendor_email_thread.pdf", label: "Vendor Email Thread", size: "41 KB", summary: "Email thread with Summit Drilling Ltd. The contractor stands by its collar measurements and has asked for a joint review of the two disputed holes before issuing a corrected invoice." },
    ],
    docSections: {
      d1: [
        { heading: "Invoice lines", body: "October drilling program at Keno Ridge: 4,120 metres billed, $386,200. Drilling is charged per metre under contract SD-2026-04 and verified against the site survey before payment." },
        { heading: "Terms", body: "Terms Net 30 from the invoice date, due December 3, 2026. The invoice references purchase order PO-6104." },
      ],
      d2: [
        { heading: "Contract basis", body: "PO-6104 authorizes drilling at the contract rate schedule, payable on metres verified by the Aurora Ridge survey team, not on metres claimed by the contractor." },
        { heading: "Program", body: "The October program covered the Keno Ridge infill grid. Survey verification is the control that caught this variance." },
      ],
      d3: [
        { heading: "Verified metres", body: "Survey report SR-221 verifies 3,940 metres for October. Two holes account for the full 180 metre difference: collar versus corrected datum measurement." },
        { heading: "Value of the difference", body: "The 180 unverified metres are valued at $17,900 under the contract rate schedule. That amount is held pending the joint review with the contractor." },
      ],
      d4: [
        { heading: "Measurement discussion", body: "On November 14 Summit Drilling's operations manager said the crew measured from the collar as drilled and asked for a joint review of the two holes before reissuing. The Keno Ridge survey team has agreed to the review this week." },
      ],
    },
    matchRows: [
      { label: "Drilling · Keno Ridge October program", invoiced: "4,120 m · $386,200", ordered: "PO-6104 program", received: "3,940 m verified", state: "warn" },
    ],
    matchedAmount: 368_300,
    heldAmount: 17_900,
    policyRows: [
      ["Bill amount", "warn", "VP Finance approval required", "$386,200 exceeds the $50,000 threshold, AP Approval Policy §3.2"],
      ["Three-way match", "warn", "Quantity variance", "4,120 metres billed against 3,940 metres verified by survey, $17,900 held, §2.1"],
      ["Vendor status", "ok", "Approved vendor", "Summit Drilling Ltd., vendor master VM-311, banking verified October 2026"],
      ["Duplicate check", "ok", "No duplicate found", "Invoice SD-4471 has not been recorded before"],
      ["Tax treatment", "ok", "HST recorded separately", "Ontario place of supply, Aurora Ridge Mining Corp."],
    ],
    analysis: {
      intro: "I captured invoice SD-4471 from Summit Drilling Ltd. and ran the three-way match against purchase order PO-6104 and survey report SR-221. Most of the bill is clean:",
      items: ["3,940 of the 4,120 billed metres are verified by the Keno Ridge survey team and priced on the contract rate schedule.", "The duplicate check is clear and the vendor's banking details on file are verified.", "180 metres are billed but not verified, a quantity variance of $17,900, concentrated in two holes measured from different datums."],
      verdict: "Ready for approval at the matched amount of $368,300, with the $17,900 variance held.",
      next: "Approve the matched amount and hold the variance pending the joint survey review, or request a corrected invoice from the vendor.",
      confidence: "High",
      sources: ["Vendor Invoice SD-4471", "Purchase Order PO-6104", "Survey Report SR-221", "AP Approval Policy v3.1"],
    },
    current: 4,
    review: { status: "VP Finance approval · Exception open", title: "Quantity variance of $17,900 on unverified metres", detail: "Alfie matched $368,300 of this $386,200 bill in full. The contractor billed 180 metres the survey team has not verified. The bill is above $50,000, so the decision sits with you as VP Finance." },
  };
}

function duplicateDetail(bill: Bill): BillDetail {
  return {
    docs: [
      { id: "d1", name: "invoice_NE-8814.pdf", label: "Vendor Invoice", size: "64 KB", summary: "Northern Explosives Ltd. invoice NE-8814 dated November 13, 2026, for Aurora Ridge Mining Corp. Explosives delivery to Keno Ridge, total $64,800, purchase order PO-6148 referenced." },
      { id: "d2", name: "original_bill_BILL-5102.pdf", label: "Original Bill BILL-5102", size: "58 KB", summary: "The same invoice NE-8814 was captured on October 29 as BILL-5102 and is scheduled for payment on November 29. Vendor, amount, invoice number and purchase order are identical." },
    ],
    docSections: {
      d1: [
        { heading: "Invoice detail", body: "Explosives and blasting agents for Keno Ridge: emulsion and detonator lines totalling $64,800. Invoice date November 13, 2026, terms Net 30." },
        { heading: "Capture note", body: "This copy arrived through the vendor portal resend on November 16. The invoice number, amount and purchase order match a bill already in the payment queue." },
      ],
      d2: [
        { heading: "Original capture", body: "BILL-5102 was created on October 29 from the first copy of NE-8814. It passed the three-way match against PO-6148 and is scheduled in the November 29 payment run." },
      ],
    },
    matchRows: [{ label: "Whole invoice", invoiced: "$64,800", ordered: "PO-6148", received: "Matched on BILL-5102", state: "warn" }],
    matchedAmount: 0,
    heldAmount: 64_800,
    policyRows: [
      ["Duplicate check", "warn", "Exact duplicate of BILL-5102", "Same vendor, invoice number, amount and purchase order, AP Approval Policy §2.4"],
      ["Bill amount", "ok", "AP Manager level", "$64,800 exceeds the VP Finance threshold, but the duplicate hold overrides approval routing"],
      ["Vendor status", "ok", "Approved vendor", "Northern Explosives Ltd., vendor master VM-342, banking verified"],
    ],
    analysis: {
      intro: "I held this bill before it entered the payment queue. It is an exact duplicate of BILL-5102:",
      fields: [["This bill", "BILL-5113 · captured Nov 16 from a vendor portal resend"], ["Original bill", "BILL-5102 · captured Oct 29 · scheduled for Nov 29"], ["Invoice", "NE-8814 · Northern Explosives Ltd."], ["Amount", "$64,800 on both bills"], ["Purchase order", "PO-6148 on both bills"]],
      verdict: "Duplicate. BILL-5102 will be paid once, on November 29.",
      next: "Confirm the duplicate so this bill is rejected from the queue, or release the hold if you believe it is a separate charge.",
      confidence: "High",
      sources: ["Vendor Invoice NE-8814", "Bill BILL-5102", "AP Approval Policy §2.4"],
    },
    current: 3,
    review: { status: "Held by Alfie · Duplicate", title: "This bill duplicates BILL-5102", detail: "Same vendor, invoice number NE-8814, amount $64,800 and purchase order PO-6148. The original is already scheduled for payment on November 29, so paying this copy would pay the vendor twice." },
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

export const duplicateOutcome = (bill: Bill) => "Duplicate confirmed. BILL-5113 is rejected from the payment queue and BILL-5102 remains the only payable copy of invoice NE-8814, scheduled for November 29.";

export function billReplyFor(q: string, fileNames: readonly string[], bill: Bill, detail: BillDetail): { reply: BillReply; actions: string[] } {
  const p = q.toLowerCase();
  if (fileNames.length) return { reply: { intro: `I reviewed the ${fileNames.length === 1 ? "uploaded file" : `${fileNames.length} uploaded files`} against this bill.`, items: ["The document agrees with the vendor and entity on the bill.", "No new exception was raised; the open items on the bill are unchanged."], note: "Uploaded files are used in this conversation only and have not been added to the bill file.", confidence: "Medium", sources: [...fileNames] }, actions: ["Ask Follow-up"] };
  if (bill.id === flagshipBillId && p.includes("variance")) return { reply: { intro: "The variance is on invoice SD-4471:", fields: [["Invoiced", "4,120 metres · $386,200"], ["Verified on SR-221", "3,940 metres"], ["Variance", "180 metres · $17,900"]], note: "The contractor measured two holes from the collar; the survey team measured from the corrected datum. A joint review is scheduled this week. Until the metres are verified, the $17,900 is not payable under the three-way match rule.", verdict: "Hold the $17,900; the rest of the bill is payable.", confidence: "High", sources: ["Vendor Invoice SD-4471", "Purchase Order PO-6104", "Survey Report SR-221", "Vendor Email Thread"] }, actions: ["Approve Matched Amount", "Request Corrected Invoice", "Ask Follow-up"] };
  if (bill.id === flagshipBillId && (p.includes("survey") || p.includes("receipt"))) return { reply: { intro: "Survey report SR-221, from the Keno Ridge survey team:", fields: [["Metres verified", "3,940"], ["Metres billed", "4,120"], ["Difference", "180 metres in two holes"], ["Status", "Joint review scheduled this week"]], note: "The survey is the reason the extra 180 metres cannot be paid yet: there is no verification for them.", confidence: "High", sources: ["Survey Report SR-221"] }, actions: ["Explain the quantity variance.", "Ask Follow-up"] };
  if (bill.id === flagshipBillId && p.includes("purchase order")) return { reply: { intro: "Purchase order PO-6104 covers the October drilling program:", fields: [["Basis", "Per metre, on survey verified metres"], ["Program", "Keno Ridge infill grid, October"], ["Verification", "Aurora Ridge survey team, report SR-221"]], note: "The invoice bills metres the survey has not verified, which is exactly what the verification step exists to catch.", confidence: "High", sources: ["Purchase Order PO-6104"] }, actions: ["Explain the quantity variance.", "Ask Follow-up"] };
  if (bill.id === flagshipBillId && p.includes("vendor invoice")) return { reply: detail.analysis, actions: ["Explain the quantity variance.", "Show me the three-way match.", "Ask Follow-up"] };
  if (p.includes("match")) return { reply: { intro: "Three-way match, invoice against purchase order against goods receipt:", fields: detail.matchRows.map((r) => [r.label, `Invoiced ${r.invoiced} · Ordered ${r.ordered} · Received ${r.received}`] as [string, string]), verdict: detail.heldAmount ? `${fmt(detail.matchedAmount, bill.currency)} matched in full; ${fmt(detail.heldAmount, bill.currency)} held.` : "Matched in full.", confidence: "High", sources: detail.analysis.sources }, actions: ["Ask Follow-up"] };
  if (p.includes("approval") || p.includes("approve")) return { reply: { intro: "Approvals for this bill under the AP approval policy:", fields: [["AP review", `${bill.owner} · complete`], ["Controller check", bill.amount > 50_000 ? "Nadia Hassan · exception confirmed" : "Within band, not required"], ["Final approval", `${approverFor(bill.amount)}${bill.amount > 50_000 ? " · pending" : ""}`], ["Payment release", "Treasurer (Angela Ruiz) · after approval"]], note: "Thresholds: AP Manager to $10,000, Controller to $50,000, VP Finance above $50,000. Alfie cannot approve or release payments.", confidence: "High", sources: ["AP Approval Policy v3.1"] }, actions: bill.amount > 50_000 ? ["Approve Bill", "Ask Follow-up"] : ["Ask Follow-up"] };
  if (p.includes("duplicate")) return { reply: bill.id === duplicateBillId ? { intro: "Yes. This bill is an exact duplicate of BILL-5102:", fields: detail.analysis.fields ?? [], verdict: "Held by Alfie before it could be paid twice.", confidence: "High", sources: detail.analysis.sources } : { intro: `No. Invoice ${bill.invoiceNumber} from ${bill.vendor} appears once in the bill queue. Alfie checks vendor, invoice number, amount and purchase order on every capture.`, fields: [["Vendor", bill.vendor], ["Invoice number", bill.invoiceNumber], ["Amount", fmt(bill.amount, bill.currency)], ["Result", "No matching bill found"]], confidence: "High", sources: ["Vendor invoice history"] }, actions: ["Ask Follow-up"] };
  if (p.includes("matched amount")) return { reply: { intro: "Paying the matched amount only:", fields: [["Paid in the next run", fmt(detail.matchedAmount, bill.currency)], ["Held back", fmt(detail.heldAmount, bill.currency)], ["Effect on the bill", "The bill closes at the matched value; the held amount stays open against the purchase order"]], note: "If the held metres are verified at the joint review, the held amount can be released as a follow-up payment without re-approval under $10,000.", confidence: "High", sources: detail.analysis.sources }, actions: ["Approve Matched Amount", "Ask Follow-up"] };
  if (p.includes("vendor") && (p.includes("message") || p.includes("draft") || p.includes("email"))) return { reply: { intro: "Draft message to the vendor, for your review before sending:", draft: `Hello ${bill.vendor} team, We are processing invoice ${bill.invoiceNumber} for ${fmt(bill.amount, bill.currency)}.${bill.id === flagshipBillId ? " The invoice bills 4,120 metres against 3,940 metres verified by our survey team on report SR-221, so we will pay the matched $368,300 now and hold $17,900 until the joint review confirms the balance. Could you confirm a date for that review, or issue a corrected invoice?" : " We will confirm our payment timing shortly."} Thank you, Susan Park, AP Lead, Aurora Ridge Resources Inc.`, note: "Nothing has been sent. Use Message Vendor to send after review.", sources: ["Bill file"] }, actions: ["Message Vendor", "Ask Follow-up"] };
  if (p.includes("when") || p.includes("paid") || p.includes("pay")) return { reply: { intro: "Payment timing for this bill:", fields: [["Due date", bill.due], ["Payment runs", "Fridays, from the entity operating account"], ["Status", "Pays in the first run after approval"], ["DPO context", "Group DPO is 41 days"]], note: "Paying on the due date keeps DPO on target. There is no early payment discount on this invoice.", confidence: "High", sources: ["Bill file", "Treasury payment calendar"] }, actions: ["Ask Follow-up"] };
  return { reply: detail.analysis, actions: bill.id === duplicateBillId ? ["Confirm Duplicate", "Release Hold", "Ask Follow-up"] : ["Show me the three-way match.", "What approvals are required?", "Ask Follow-up"] };
}
