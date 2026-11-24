export type CustomerStatus = "Current" | "Watch" | "Overdue" | "Credit Hold Recommended" | "On Hold";
export type ArCurrency = "CAD" | "USD";
export type InvoiceStatus = "Current" | "Open" | "Overdue";

export type ArInvoice = {
  id: string;
  issued: string;
  due: string;
  amount: number;
  ageDays: number;
  status: InvoiceStatus;
  description: string;
};

export type ArPayment = {
  date: string;
  amount: number;
  method: string;
  appliedTo: string;
  note: string;
};

export type ArCustomer = {
  id: string;
  name: string;
  entity: string;
  segment: string;
  status: CustomerStatus;
  currency: ArCurrency;
  openBalance: number;
  current: number;
  days1to30: number;
  days31to60: number;
  over60: number;
  creditLimit: number;
  terms: string;
  owner: string;
  contact: string;
  oldestInvoiceDays: number;
  lastPayment: string;
  lastPaymentAmount: number;
  creditNote: string;
  invoices: ArInvoice[];
  payments: ArPayment[];
};

export const customerStatuses: readonly CustomerStatus[] = ["Current", "Watch", "Overdue", "Credit Hold Recommended", "On Hold"];

export const customers: ArCustomer[] = [
  {
    id: "CUS-2201", name: "Northern Build Supplies", entity: "Meridian Manufacturing Inc.", segment: "Wholesale distribution", status: "Overdue", currency: "CAD",
    openBalance: 214_300, current: 38_200, days1to30: 61_400, days31to60: 52_300, over60: 62_400,
    creditLimit: 250_000, terms: "Net 30", owner: "Daniel Okafor", contact: "Danielle Roy, Accounts Payable Lead",
    oldestInvoiceDays: 62, lastPayment: "Oct 20, 2026", lastPaymentAmount: 48_900,
    creditNote: "Within the $250,000 limit at 86% utilization. Payment behaviour has slowed over two quarters, but the account paid in October. Alfie recommends monitoring with a firm reminder, not a credit hold.",
    invoices: [
      { id: "INV-90214", issued: "Sep 15, 2026", due: "Oct 15, 2026", amount: 62_400, ageDays: 62, status: "Overdue", description: "Hot-rolled coil and sheet order, September delivery" },
      { id: "INV-90231", issued: "Oct 2, 2026", due: "Nov 1, 2026", amount: 52_300, ageDays: 45, status: "Overdue", description: "Structural steel restock, Toronto yard" },
      { id: "INV-90255", issued: "Oct 19, 2026", due: "Nov 18, 2026", amount: 61_400, ageDays: 28, status: "Open", description: "Cold-rolled sheet order, October delivery" },
      { id: "INV-90271", issued: "Nov 3, 2026", due: "Dec 3, 2026", amount: 38_200, ageDays: 13, status: "Current", description: "Fasteners and fittings, November delivery" },
    ],
    payments: [
      { date: "Oct 20, 2026", amount: 48_900, method: "EFT", appliedTo: "INV-90188", note: "Paid in full, 36 days after invoice" },
      { date: "Sep 28, 2026", amount: 57_300, method: "EFT", appliedTo: "INV-90152", note: "Paid in full, 33 days after invoice" },
      { date: "Aug 29, 2026", amount: 44_150, method: "EFT", appliedTo: "INV-90107", note: "Paid in full, 31 days after invoice" },
    ],
  },
  {
    id: "CUS-2202", name: "Summit Retail Co.", entity: "Meridian Retail Group Inc.", segment: "Retail chain", status: "Credit Hold Recommended", currency: "CAD",
    openBalance: 96_800, current: 12_000, days1to30: 24_800, days31to60: 31_500, over60: 28_500,
    creditLimit: 75_000, terms: "Net 30", owner: "Daniel Okafor", contact: "Mark Delaney, Controller",
    oldestInvoiceDays: 74, lastPayment: "Oct 5, 2026", lastPaymentAmount: 18_400,
    creditNote: "Balance of $96,800 is 129% of the $75,000 credit limit, and the oldest invoice is 74 days old. Two November payment promises were not kept. Alfie recommends a credit hold until the over 60 day balance is cleared.",
    invoices: [
      { id: "INV-77120", issued: "Sep 3, 2026", due: "Oct 3, 2026", amount: 28_500, ageDays: 74, status: "Overdue", description: "Fall seasonal stock, Vancouver stores" },
      { id: "INV-77198", issued: "Sep 26, 2026", due: "Oct 26, 2026", amount: 31_500, ageDays: 51, status: "Overdue", description: "Home goods restock, 14 stores" },
      { id: "INV-77240", issued: "Oct 24, 2026", due: "Nov 23, 2026", amount: 24_800, ageDays: 23, status: "Open", description: "Seasonal display and fixtures" },
      { id: "INV-77266", issued: "Nov 9, 2026", due: "Dec 9, 2026", amount: 12_000, ageDays: 7, status: "Current", description: "Top-up order, 6 stores" },
    ],
    payments: [
      { date: "Oct 5, 2026", amount: 18_400, method: "EFT", appliedTo: "INV-77150", note: "Partial payment; $9,200 short of the agreed amount" },
      { date: "Sep 2, 2026", amount: 22_750, method: "EFT", appliedTo: "INV-77102", note: "Paid in full, 41 days after invoice" },
    ],
  },
  {
    id: "CUS-2203", name: "Prairie Home Centres", entity: "Meridian Manufacturing Inc.", segment: "Retail chain", status: "Current", currency: "CAD",
    openBalance: 148_600, current: 121_000, days1to30: 27_600, days31to60: 0, over60: 0,
    creditLimit: 200_000, terms: "Net 30", owner: "Daniel Okafor", contact: "Sandra Peters, AP Manager",
    oldestInvoiceDays: 19, lastPayment: "Nov 12, 2026", lastPaymentAmount: 96_000,
    creditNote: "Pays reliably inside terms. Utilization is 74% of a $200,000 limit. No action recommended.",
    invoices: [
      { id: "INV-90310", issued: "Oct 28, 2026", due: "Nov 27, 2026", amount: 27_600, ageDays: 19, status: "Open", description: "Lumber and panel products, Winnipeg DC" },
      { id: "INV-90344", issued: "Nov 10, 2026", due: "Dec 10, 2026", amount: 121_000, ageDays: 6, status: "Current", description: "Winter stock program, 22 stores" },
    ],
    payments: [
      { date: "Nov 12, 2026", amount: 96_000, method: "EFT", appliedTo: "INV-90290", note: "Paid in full, 27 days after invoice" },
      { date: "Oct 14, 2026", amount: 88_400, method: "EFT", appliedTo: "INV-90236", note: "Paid in full, 29 days after invoice" },
    ],
  },
  {
    id: "CUS-2204", name: "Atlantic Marine Works", entity: "Meridian Logistics LLC", segment: "Industrial", status: "Current", currency: "USD",
    openBalance: 58_400, current: 40_100, days1to30: 18_300, days31to60: 0, over60: 0,
    creditLimit: 100_000, terms: "Net 30", owner: "Daniel Okafor", contact: "Chris Novak, Finance Manager",
    oldestInvoiceDays: 17, lastPayment: "Nov 10, 2026", lastPaymentAmount: 22_600,
    creditNote: "Freight customer paying inside terms. Utilization is 58% of a USD 100,000 limit. No action recommended.",
    invoices: [
      { id: "INV-5108", issued: "Oct 30, 2026", due: "Nov 29, 2026", amount: 18_300, ageDays: 17, status: "Open", description: "Dedicated freight, Halifax lane, October" },
      { id: "INV-5144", issued: "Nov 8, 2026", due: "Dec 8, 2026", amount: 40_100, ageDays: 8, status: "Current", description: "Dedicated freight, November contract" },
    ],
    payments: [
      { date: "Nov 10, 2026", amount: 22_600, method: "Wire", appliedTo: "INV-5077", note: "Paid in full, 26 days after invoice" },
      { date: "Oct 9, 2026", amount: 31_900, method: "Wire", appliedTo: "INV-5041", note: "Paid in full, 28 days after invoice" },
    ],
  },
  {
    id: "CUS-2205", name: "Great North Contracting", entity: "Meridian Manufacturing Inc.", segment: "Contractors", status: "Watch", currency: "CAD",
    openBalance: 87_250, current: 22_450, days1to30: 31_800, days31to60: 33_000, over60: 0,
    creditLimit: 120_000, terms: "Net 30", owner: "Daniel Okafor", contact: "Paul Tremblay, Owner",
    oldestInvoiceDays: 58, lastPayment: "Oct 26, 2026", lastPaymentAmount: 39_600,
    creditNote: "Oldest invoice is 58 days old and approaching the 60 day line. The customer pays, but slowly, tied to its own project milestones. Alfie recommends a reminder this week and a watch flag, not a hold.",
    invoices: [
      { id: "INV-90190", issued: "Sep 19, 2026", due: "Oct 19, 2026", amount: 33_000, ageDays: 58, status: "Overdue", description: "Structural steel, Highway 400 project" },
      { id: "INV-90240", issued: "Oct 17, 2026", due: "Nov 16, 2026", amount: 31_800, ageDays: 30, status: "Open", description: "Steel and fittings, Barrie site" },
      { id: "INV-90288", issued: "Nov 5, 2026", due: "Dec 5, 2026", amount: 22_450, ageDays: 11, status: "Current", description: "Fasteners and plate, November delivery" },
    ],
    payments: [
      { date: "Oct 26, 2026", amount: 39_600, method: "EFT", appliedTo: "INV-90160", note: "Paid in full, 44 days after invoice" },
      { date: "Sep 15, 2026", amount: 41_200, method: "EFT", appliedTo: "INV-90118", note: "Paid in full, 39 days after invoice" },
    ],
  },
  {
    id: "CUS-2206", name: "Vancouver Island Resorts", entity: "Meridian Retail Group Inc.", segment: "Hospitality", status: "Current", currency: "CAD",
    openBalance: 41_900, current: 41_900, days1to30: 0, days31to60: 0, over60: 0,
    creditLimit: 60_000, terms: "Net 30", owner: "Daniel Okafor", contact: "Amy Chen, Controller",
    oldestInvoiceDays: 10, lastPayment: "Nov 2, 2026", lastPaymentAmount: 38_750,
    creditNote: "Seasonal customer, current on all invoices. No action recommended.",
    invoices: [
      { id: "INV-77301", issued: "Nov 6, 2026", due: "Dec 6, 2026", amount: 41_900, ageDays: 10, status: "Current", description: "Winter season stock, 4 properties" },
    ],
    payments: [
      { date: "Nov 2, 2026", amount: 38_750, method: "EFT", appliedTo: "INV-77254", note: "Paid in full, 25 days after invoice" },
      { date: "Oct 3, 2026", amount: 36_900, method: "EFT", appliedTo: "INV-77210", note: "Paid in full, 28 days after invoice" },
    ],
  },
  {
    id: "CUS-2207", name: "Keystone Auto Parts", entity: "Meridian Logistics LLC", segment: "Industrial", status: "Overdue", currency: "USD",
    openBalance: 122_700, current: 18_200, days1to30: 36_500, days31to60: 29_800, over60: 38_200,
    creditLimit: 150_000, terms: "Net 30", owner: "Daniel Okafor", contact: "Joe Marino, AP Lead",
    oldestInvoiceDays: 81, lastPayment: "Oct 18, 2026", lastPaymentAmount: 27_450,
    creditNote: "Oldest invoice is 81 days old at USD 38,200. The customer is responsive and paid in October, but the over 60 day bucket is growing. Alfie recommends a firm collection call this week before any hold decision.",
    invoices: [
      { id: "INV-5087", issued: "Aug 27, 2026", due: "Sep 26, 2026", amount: 38_200, ageDays: 81, status: "Overdue", description: "Freight program, August lanes" },
      { id: "INV-5119", issued: "Sep 28, 2026", due: "Oct 28, 2026", amount: 29_800, ageDays: 49, status: "Overdue", description: "Freight program, September lanes" },
      { id: "INV-5130", issued: "Oct 22, 2026", due: "Nov 21, 2026", amount: 36_500, ageDays: 25, status: "Open", description: "Freight program, October lanes" },
      { id: "INV-5151", issued: "Nov 11, 2026", due: "Dec 11, 2026", amount: 18_200, ageDays: 5, status: "Current", description: "Expedited freight, November" },
    ],
    payments: [
      { date: "Oct 18, 2026", amount: 27_450, method: "Wire", appliedTo: "INV-5060", note: "Paid in full, 52 days after invoice" },
      { date: "Aug 30, 2026", amount: 35_800, method: "Wire", appliedTo: "INV-5019", note: "Paid in full, 47 days after invoice" },
    ],
  },
  {
    id: "CUS-2208", name: "Harbourview Developments", entity: "Meridian Manufacturing Inc.", segment: "Contractors", status: "On Hold", currency: "CAD",
    openBalance: 63_500, current: 0, days1to30: 0, days31to60: 0, over60: 63_500,
    creditLimit: 80_000, terms: "Net 30", owner: "Daniel Okafor", contact: "Laura Singh, CFO",
    oldestInvoiceDays: 118, lastPayment: "Jun 30, 2026", lastPaymentAmount: 51_000,
    creditNote: "Credit hold has been in place since October 6. No payment since June 30 and the full balance is over 60 days. Alfie recommends a final demand before the balance is considered for write-off.",
    invoices: [
      { id: "INV-90087", issued: "Jul 21, 2026", due: "Aug 20, 2026", amount: 63_500, ageDays: 118, status: "Overdue", description: "Structural steel, Harbourview Tower project" },
    ],
    payments: [
      { date: "Jun 30, 2026", amount: 51_000, method: "EFT", appliedTo: "INV-90040", note: "Paid in full, 58 days after invoice" },
      { date: "May 28, 2026", amount: 47_300, method: "EFT", appliedTo: "INV-89988", note: "Paid in full, 49 days after invoice" },
    ],
  },
];

export const getCustomer = (id: string) => customers.find((c) => c.id === id);
export const cad = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
export const usd = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
export const fmt = (v: number, c: ArCurrency) => (c === "USD" ? usd(v) : cad(v));

export type ArAuditEvent = { time: string; actor: string; actorType: "User" | "Alfie" | "System"; action: string; prev?: string; next?: string; source: string; approval: "Approved" | "Pending" | "Not required" | "Rejected" };

export const seedCustomerAudit: ArAuditEvent[] = [
  { time: "Nov 16, 09:48", actor: "Alfie", actorType: "Alfie", action: "Collection assessment updated", source: "Aging and payment history", approval: "Not required", next: "Reminder recommended; no credit hold" },
  { time: "Nov 14, 15:02", actor: "Alfie", actorType: "Alfie", action: "Statement of account prepared", source: "Open invoices at Nov 14", approval: "Not required", next: "Ready for review" },
  { time: "Oct 20, 13:26", actor: "System", actorType: "System", action: "Payment received", source: "TD Bank feed", approval: "Not required", next: "INV-90188 paid in full · $48,900" },
  { time: "Oct 16, 10:11", actor: "Daniel Okafor", actorType: "User", action: "Reminder sent", source: "Collections workspace", approval: "Approved", next: "INV-90214 reminder, first notice" },
  { time: "Oct 15, 09:00", actor: "System", actorType: "System", action: "Invoice passed due date", source: "INV-90214", approval: "Not required", next: "Aging bucket: 1 to 30 days" },
];

export const entities: readonly string[] = ["Meridian Manufacturing Inc.", "Meridian Logistics LLC", "Meridian Retail Group Inc."];

export const entityShortNames: Record<string, string> = {
  "Meridian Manufacturing Inc.": "Manufacturing",
  "Meridian Logistics LLC": "Logistics",
  "Meridian Retail Group Inc.": "Retail Group",
};

export const customerSegments: readonly string[] = ["Wholesale distribution", "Retail chain", "Contractors", "Industrial", "Hospitality"];

export const erpName = "NetSuite";

export const flagshipCustomerId = "CUS-2201";

export const newCustomerDefaults = { owner: "Daniel Okafor", firstNumber: 2209, usdEntity: "Meridian Logistics LLC" };

export const receivablesMetrics: readonly (readonly [string, string, string, boolean])[] = [["Over 60 Days", "$842K", "Collection focus", false], ["DSO", "38 days", "Steady vs October", true], ["Customers Overdue", "23", "Of 126 with balances", false], ["Credit Hold Recommended", "1", "Summit Retail Co.", false], ["Oldest Invoice", "118 days", "Harbourview Developments", false]];

export type ReceivablesAnswer = { intro: string; note: string };

export const receivablesAnswers: { over60: ReceivablesAnswer; hold: ReceivablesAnswer; largest: ReceivablesAnswer; slowing: ReceivablesAnswer; fallback: ReceivablesAnswer } = {
  over60: { intro: "4 customers in this view carry balances over 60 days.", note: "Across the full ledger, $842K is over 60 days. Northern Build Supplies is the largest single exposure at $62,400 over 60; Harbourview Developments is the oldest at 118 days and already on credit hold." },
  hold: { intro: "Alfie recommends a credit hold for 1 customer.", note: "Summit Retail Co. is at 129% of its $75,000 credit limit with a 74 day old invoice and two unkept November payment promises. Harbourview Developments is already on hold. Northern Build Supplies is monitored, not held: it paid $48,900 in October and is inside its limit." },
  largest: { intro: "Largest open balances, ranked:", note: "The top 4 accounts are just over half of the open balance in this view. Amounts are in each customer's operating currency; consolidated reporting converts to CAD." },
  slowing: { intro: "2 customers are paying more slowly than they did last quarter.", note: "Northern Build Supplies: days to pay rose from 31 to 36 across the last three payments, and the current oldest invoice is 32 days past due. Keystone Auto Parts: the last two payments landed at 47 and 52 days." },
  fallback: { intro: "Collection priorities for this week, in order:", note: "1. Send the drafted reminder to Northern Build Supplies (INV-90214, $62,400). 2. Decide the Summit Retail credit hold. 3. Call Keystone Auto Parts about the 81 day invoice before it ages further." },
};

export const slowingCustomerIds: readonly string[] = ["CUS-2201", "CUS-2207"];
export const priorityCustomerIds: readonly string[] = ["CUS-2201", "CUS-2202", "CUS-2207"];

export type DocSection = { heading: string; body: string };
export type CustomerDoc = { id: string; name: string; label: string; date: string; summary: string };
export type CustomerReply = { intro: string; items?: string[]; fields?: [string, string][]; next?: string; verdict?: string; confidence?: string; sources?: string[] | undefined; note?: string; draft?: string };

const oldestOverdue = (c: ArCustomer) => c.invoices.filter((i) => i.status === "Overdue").sort((a, b) => b.ageDays - a.ageDays)[0];

export function collectionDraftFor(c: ArCustomer): string {
  const oldest = oldestOverdue(c);
  if (c.id === flagshipCustomerId) return `Subject: Payment timing for invoice INV-90214 and the open balance of $214,300\n\nHello Danielle,\n\nI am writing about invoice INV-90214 for $62,400, issued September 15 and due October 15, which is still open, alongside three further invoices bringing the account to $214,300. Thank you for the payment received on October 20.\n\nSo we can keep deliveries on schedule, could you confirm a payment date for INV-90214 this week, and a plan for the remaining balance? If it helps, we can split the remaining balance across two payments in November.\n\nThank you,\nElena Brooks, VP Finance, Meridian Group Inc.`;
  if (!oldest) return `Subject: Statement of account, ${c.name}\n\nHello ${c.contact.split(",")[0]},\n\nYour account is current at ${fmt(c.openBalance, c.currency)} on ${c.terms} terms. A statement of account is attached for your records. Thank you for keeping the account in good standing.\n\nElena Brooks, VP Finance, Meridian Group Inc.`;
  return `Subject: Payment timing for invoice ${oldest.id} and the open balance of ${fmt(c.openBalance, c.currency)}\n\nHello ${c.contact.split(",")[0]},\n\nInvoice ${oldest.id} for ${fmt(oldest.amount, c.currency)} was due ${oldest.due} and is still open. The total balance on the account is ${fmt(c.openBalance, c.currency)}. Could you confirm when payment will be made, or let me know if anything is holding it up?\n\nThank you,\nElena Brooks, VP Finance, Meridian Group Inc.`;
}

export function assessmentFor(c: ArCustomer): CustomerReply {
  const overdue = c.invoices.filter((i) => i.status === "Overdue");
  if (c.id === flagshipCustomerId) return {
    intro: "Northern Build Supplies owes $214,300 across 4 invoices. The account is not in distress, but it is drifting:",
    items: ["INV-90214 for $62,400 is 32 days past due; it is the largest single invoice and the oldest at 62 days.", "Days to pay has lengthened across the last three payments: 31, then 33, then 36 days.", "The October 20 payment of $48,900 shows the customer is paying, just more slowly."],
    verdict: "Send a firm reminder now; do not place a credit hold yet.",
    next: "Review the drafted collection note to Danielle Roy, then reassess if INV-90214 is unpaid by November 27.",
    confidence: "High",
    sources: ["Open invoices", "Payment history", "Credit file"],
  };
  if (c.status === "Credit Hold Recommended") return {
    intro: `${c.name} owes ${fmt(c.openBalance, c.currency)}, which is above its ${fmt(c.creditLimit, c.currency)} credit limit:`,
    items: [`The oldest invoice is ${c.oldestInvoiceDays} days old, with ${fmt(c.over60, c.currency)} over 60 days.`, "Two payment promises made for November were not kept, and the last payment was partial.", "New orders continue to be placed against an account that is already over its limit."],
    verdict: "Place the account on credit hold until the over 60 day balance is cleared.",
    next: "Approve the hold, then Alfie will draft the customer notification for your review.",
    confidence: "High",
    sources: ["Open invoices", "Credit file", "Payment history"],
  };
  return {
    intro: `${c.name} owes ${fmt(c.openBalance, c.currency)} across ${c.invoices.length} open invoice${c.invoices.length === 1 ? "" : "s"}. ${overdue.length ? `${overdue.length} invoice${overdue.length === 1 ? " is" : "s are"} past due, the oldest at ${c.oldestInvoiceDays} days.` : "Nothing is past due."}`,
    items: c.creditNote ? [c.creditNote] : [],
    verdict: c.status === "On Hold" ? "Credit hold is in place. Escalate with a final demand." : c.status === "Current" ? "No action needed. The account is in good standing." : "Monitor, with a reminder this week.",
    confidence: "High",
    sources: ["Open invoices", "Payment history", "Credit file"],
  };
}

export function reviewForCustomer(c: ArCustomer): { status: string; title: string; detail: string } {
  const oldest = oldestOverdue(c);
  if (c.id === flagshipCustomerId) return { status: "Collection review · 32 days past due", title: "INV-90214 for $62,400 is unpaid past its October 15 due date", detail: "Alfie drafted a collection note to Danielle Roy at Northern Build Supplies. Payment behaviour has slowed over two quarters, but the account is within its $250,000 credit limit and paid $48,900 in October, so Alfie does not recommend a credit hold yet." };
  if (c.status === "Credit Hold Recommended") return { status: "Credit review · Hold recommended", title: `Alfie recommends a credit hold for ${c.name}`, detail: `The balance of ${fmt(c.openBalance, c.currency)} is above the ${fmt(c.creditLimit, c.currency)} credit limit and the oldest invoice is ${c.oldestInvoiceDays} days old. Two November payment promises were not kept.` };
  if (c.status === "On Hold") return { status: "Credit hold in place", title: "This account has been on credit hold since October 6", detail: `No payment has been received since ${c.lastPayment}, and the full balance of ${fmt(c.openBalance, c.currency)} is over 60 days. Alfie recommends a final demand before the balance is considered for write-off.` };
  if (oldest) return { status: "Collection review", title: `${oldest.id} for ${fmt(oldest.amount, c.currency)} is past due`, detail: `The oldest invoice on this account is ${oldest.ageDays} days old. Alfie has a collection draft ready for your review.` };
  return { status: "Account in good standing", title: `Open balance ${fmt(c.openBalance, c.currency)}, nothing past due`, detail: "Alfie is monitoring aging and payment behaviour. No action is needed on this account today." };
}

export function customerDocsFor(c: ArCustomer): { docs: CustomerDoc[]; sections: Record<string, DocSection[]> } {
  const docs: CustomerDoc[] = [
    { id: "s1", name: `statement_${c.id}.pdf`, label: "November Statement of Account", date: "Nov 14, 2026", summary: `Statement of account for ${c.name} at November 14, 2026: open balance ${fmt(c.openBalance, c.currency)} across ${c.invoices.length} invoices, oldest ${c.oldestInvoiceDays} days.` },
    { id: "s2", name: `credit_file_${c.id}.pdf`, label: "Credit Application and Terms", date: "On file", summary: `Credit file for ${c.name}: limit ${fmt(c.creditLimit, c.currency)}, terms ${c.terms}, contact ${c.contact}. Approved by the Controller at account opening and reviewed annually.` },
    { id: "s3", name: `master_agreement_${c.id}.pdf`, label: "Master Supply Agreement", date: "On file", summary: `Master supply agreement between ${c.entity} and ${c.name}, covering pricing, delivery, and payment terms of ${c.terms} from invoice date.` },
    { id: "s4", name: `correspondence_${c.id}.pdf`, label: "Collection Correspondence", date: "Oct 16, 2026", summary: `Correspondence log for ${c.name}: statements and reminders sent, and replies received from ${c.contact}.` },
  ];
  const sections: Record<string, DocSection[]> = {
    s1: [
      { heading: "Open invoices", body: c.invoices.map((i) => `${i.id}: ${fmt(i.amount, c.currency)}, issued ${i.issued}, due ${i.due}`).join(". ") + "." },
      { heading: "Aging", body: `Current ${fmt(c.current, c.currency)}; 1 to 30 days ${fmt(c.days1to30, c.currency)}; 31 to 60 days ${fmt(c.days31to60, c.currency)}; over 60 days ${fmt(c.over60, c.currency)}. Total open ${fmt(c.openBalance, c.currency)}.` },
    ],
    s2: [
      { heading: "Approved terms", body: `Credit limit ${fmt(c.creditLimit, c.currency)} on ${c.terms} terms. Balances above the limit or past 60 days trigger a credit review under the receivables policy.` },
      { heading: "Account contacts", body: `Customer contact: ${c.contact}. Meridian account owner: ${c.owner}.` },
    ],
    s3: [
      { heading: "Payment terms", body: `Invoices are payable ${c.terms.toLowerCase()} from the invoice date. Overdue balances may result in shipments being held until the account is brought current.` },
    ],
    s4: [
      { heading: "Recent correspondence", body: c.id === flagshipCustomerId ? "October 16: first reminder for INV-90214 sent by Daniel Okafor. October 20: payment of $48,900 received against INV-90188 with a note that INV-90214 would follow. It has not yet been paid." : "Statements are issued monthly. Reminders follow the standard sequence at 7, 21 and 35 days past due, each approved by a person before sending." },
    ],
  };
  return { docs, sections };
}

export function customerAuditFor(c: ArCustomer): ArAuditEvent[] {
  if (c.id === flagshipCustomerId) return seedCustomerAudit;
  const events: ArAuditEvent[] = [
    { time: "Nov 16, 09:48", actor: "Alfie", actorType: "Alfie", action: "Collection assessment updated", source: "Aging and payment history", approval: "Not required", next: c.status === "Credit Hold Recommended" ? "Credit hold recommended" : c.status === "On Hold" ? "Final demand recommended" : "Monitoring" },
    { time: "Nov 14, 15:02", actor: "Alfie", actorType: "Alfie", action: "Statement of account prepared", source: "Open invoices at Nov 14", approval: "Not required", next: "Ready for review" },
    ...c.payments.slice(0, 2).map((p): ArAuditEvent => ({ time: p.date, actor: "System", actorType: "System", action: "Payment received", source: "Bank feed", approval: "Not required", next: `${p.appliedTo} paid · ${fmt(p.amount, c.currency)}` })),
  ];
  if (c.status === "On Hold") events.splice(1, 0, { time: "Oct 6, 11:30", actor: "Marcus Webb", actorType: "User", action: "Credit hold placed", source: "Credit review", approval: "Approved", prev: "Watch", next: "On Hold" });
  return events;
}

export function customerReplyFor(q: string, fileNames: readonly string[], c: ArCustomer): { reply: CustomerReply; actions: string[] } {
  const p = q.toLowerCase();
  const overdue = c.invoices.filter((i) => i.status === "Overdue");
  if (fileNames.length) return { reply: { intro: `I reviewed the ${fileNames.length === 1 ? "uploaded file" : `${fileNames.length} uploaded files`} against this customer account. Nothing in it changes the open balance or aging.`, note: "Uploaded files are used in this conversation only and have not been added to the customer record.", sources: [...fileNames] }, actions: ["Ask Follow-up"] };
  if (p.includes("draft") || p.includes("collection note") || p.includes("reminder")) return { reply: { intro: `Draft collection note to ${c.contact}, for your review before sending:`, draft: collectionDraftFor(c), note: "Nothing has been sent. Sending requires your approval, and the sent note is logged to the account history.", sources: ["Open invoices", "Correspondence log"] }, actions: ["Approve and Send Reminder", "Ask Follow-up"] };
  if (p.includes("overdue")) return { reply: { intro: overdue.length ? `${overdue.length} invoice${overdue.length === 1 ? " is" : "s are"} past due on this account:` : "No invoices are past due on this account.", fields: overdue.map((i) => [i.id, `${fmt(i.amount, c.currency)} · due ${i.due} · ${i.ageDays} days old`] as [string, string]), verdict: overdue.length ? `${fmt(overdue.reduce((s, i) => s + i.amount, 0), c.currency)} is past due of the ${fmt(c.openBalance, c.currency)} open balance.` : "The account is current.", confidence: "High", sources: ["Open invoices"] }, actions: ["Draft a collection note.", "Ask Follow-up"] };
  if (p.includes("credit") || p.includes("hold")) return { reply: { intro: "Credit assessment for this account:", fields: [["Open balance", fmt(c.openBalance, c.currency)], ["Credit limit", fmt(c.creditLimit, c.currency)], ["Utilization", `${Math.round((c.openBalance / c.creditLimit) * 100)}%`], ["Over 60 days", fmt(c.over60, c.currency)], ["Oldest invoice", `${c.oldestInvoiceDays} days`]], note: c.creditNote, verdict: c.status === "Credit Hold Recommended" ? "Place the account on credit hold." : c.status === "On Hold" ? "Hold already in place. Escalate with a final demand." : "No credit hold recommended at this time.", confidence: "High", sources: ["Credit file", "Aging"] }, actions: c.status === "Credit Hold Recommended" ? ["Place Credit Hold", "Ask Follow-up"] : ["Ask Follow-up"] };
  if (p.includes("behaviour") || p.includes("behavior") || p.includes("paid") || p.includes("payment")) return { reply: { intro: "Recent payment behaviour:", fields: c.payments.map((pay) => [pay.date, `${fmt(pay.amount, c.currency)} · ${pay.appliedTo} · ${pay.note}`] as [string, string]), note: c.id === flagshipCustomerId ? "The trend is consistent: each payment lands a few days later than the one before, and the oldest open invoice is now 32 days past due." : "Payment timing is drawn from the bank feed matched to invoices.", confidence: "High", sources: ["Payment history", "Bank feed"] }, actions: ["Ask Follow-up"] };
  if (p.includes("statement")) return { reply: { intro: "The November statement of account is ready in Documents.", fields: [["Open balance", fmt(c.openBalance, c.currency)], ["Invoices listed", `${c.invoices.length}`], ["Prepared", "November 14, 2026"]], note: "Review it in the Documents tab. Sending it to the customer is a separate, approved step.", sources: ["Statement of account"] }, actions: ["Review Documents", "Ask Follow-up"] };
  return { reply: assessmentFor(c), actions: ["Draft a collection note.", "Recommend a credit action.", "Ask Follow-up"] };
}
