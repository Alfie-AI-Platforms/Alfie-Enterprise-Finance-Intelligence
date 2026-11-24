import type { ArAuditEvent, ArCustomer, ArCurrency, CustomerStatus } from "@/lib/worlds/enterprise/receivables-data";

export type { ArAuditEvent, ArCustomer, ArCurrency, ArInvoice, ArPayment, CustomerStatus, InvoiceStatus } from "@/lib/worlds/enterprise/receivables-data";

export const customerStatuses: readonly CustomerStatus[] = ["Current", "Watch", "Overdue", "Credit Hold Recommended", "On Hold"];

export const customers: ArCustomer[] = [
  {
    id: "CUS-3301", name: "AgriCore Equipment Ltd.", entity: "Northline Precision Inc.", segment: "Agricultural equipment OEM", status: "Overdue", currency: "CAD",
    openBalance: 486_000, current: 96_000, days1to30: 148_000, days31to60: 242_000, over60: 0,
    creditLimit: 600_000, terms: "Net 30", owner: "Priya Nair", contact: "Greg Halvorsen, Accounts Payable Manager",
    oldestInvoiceDays: 58, lastPayment: "Oct 28, 2026", lastPaymentAmount: 112_400,
    creditNote: "Within the $600,000 limit at 81% utilization. Northline's largest customer pays in full but has slowed by about two weeks over the fall. Alfie recommends a firm reminder and weekly monitoring, not a credit hold.",
    invoices: [
      { id: "INV-41208", issued: "Sep 19, 2026", due: "Oct 19, 2026", amount: 168_500, ageDays: 58, status: "Overdue", description: "Series 400 gear housings, September shipment" },
      { id: "INV-41237", issued: "Oct 3, 2026", due: "Nov 2, 2026", amount: 73_500, ageDays: 44, status: "Overdue", description: "Drivetrain assemblies, PTO line, October shipment" },
      { id: "INV-41261", issued: "Oct 23, 2026", due: "Nov 22, 2026", amount: 148_000, ageDays: 24, status: "Open", description: "Series 400 gear housing kits, late October shipment" },
      { id: "INV-41288", issued: "Nov 7, 2026", due: "Dec 7, 2026", amount: 96_000, ageDays: 9, status: "Current", description: "Gear housings and shafts, November shipment" },
    ],
    payments: [
      { date: "Oct 28, 2026", amount: 112_400, method: "EFT", appliedTo: "INV-41190", note: "Paid in full, 39 days after invoice" },
      { date: "Sep 25, 2026", amount: 128_750, method: "EFT", appliedTo: "INV-41152", note: "Paid in full, 36 days after invoice" },
      { date: "Aug 27, 2026", amount: 104_300, method: "EFT", appliedTo: "INV-41107", note: "Paid in full, 34 days after invoice" },
    ],
  },
  {
    id: "CUS-3302", name: "Prairie Implement Co.", entity: "Northline Precision Inc.", segment: "Agricultural dealer", status: "Credit Hold Recommended", currency: "CAD",
    openBalance: 142_500, current: 18_500, days1to30: 41_000, days31to60: 38_000, over60: 45_000,
    creditLimit: 100_000, terms: "Net 30", owner: "Priya Nair", contact: "Dale Friesen, Owner",
    oldestInvoiceDays: 88, lastPayment: "Sep 30, 2026", lastPaymentAmount: 22_300,
    creditNote: "Balance of $142,500 is 143% of the $100,000 credit limit, and the oldest invoice is 88 days old. Harvest season orders shipped on the strength of earlier payment behaviour. Alfie recommends a credit hold until the over 60 day balance is cleared.",
    invoices: [
      { id: "INV-41301", issued: "Aug 20, 2026", due: "Sep 19, 2026", amount: 45_000, ageDays: 88, status: "Overdue", description: "Gearboxes and PTO shafts, pre-harvest stocking order" },
      { id: "INV-41319", issued: "Sep 25, 2026", due: "Oct 25, 2026", amount: 38_000, ageDays: 52, status: "Overdue", description: "Series 300 housings, September order" },
      { id: "INV-41340", issued: "Oct 21, 2026", due: "Nov 20, 2026", amount: 41_000, ageDays: 26, status: "Open", description: "Replacement drivetrain kits, October order" },
      { id: "INV-41358", issued: "Nov 8, 2026", due: "Dec 8, 2026", amount: 18_500, ageDays: 8, status: "Current", description: "Parts top-up, November order" },
    ],
    payments: [
      { date: "Sep 30, 2026", amount: 22_300, method: "EFT", appliedTo: "INV-41276", note: "Partial payment; $11,700 short of the agreed amount" },
      { date: "Aug 22, 2026", amount: 31_450, method: "EFT", appliedTo: "INV-41240", note: "Paid in full, 47 days after invoice" },
    ],
  },
  {
    id: "CUS-3303", name: "Heartland Truck Group", entity: "Northline Assembly Inc.", segment: "Truck OEM", status: "Current", currency: "USD",
    openBalance: 268_400, current: 201_000, days1to30: 67_400, days31to60: 0, over60: 0,
    creditLimit: 400_000, terms: "Net 30", owner: "Anita Roy", contact: "Tom Becker, Finance Director",
    oldestInvoiceDays: 21, lastPayment: "Nov 10, 2026", lastPaymentAmount: 154_200,
    creditNote: "Pays reliably inside terms. Utilization is 67% of a USD 400,000 limit. No action recommended.",
    invoices: [
      { id: "INV-5140", issued: "Oct 26, 2026", due: "Nov 25, 2026", amount: 67_400, ageDays: 21, status: "Open", description: "Assembled drivetrain units, October program" },
      { id: "INV-5177", issued: "Nov 10, 2026", due: "Dec 10, 2026", amount: 201_000, ageDays: 6, status: "Current", description: "Assembled drivetrain units, November program" },
    ],
    payments: [
      { date: "Nov 10, 2026", amount: 154_200, method: "Wire", appliedTo: "INV-5109", note: "Paid in full, 27 days after invoice" },
      { date: "Oct 12, 2026", amount: 141_800, method: "Wire", appliedTo: "INV-5074", note: "Paid in full, 29 days after invoice" },
    ],
  },
  {
    id: "CUS-3304", name: "CanAm Railcar Works", entity: "Northline Fabrication Ltée", segment: "Rail", status: "Watch", currency: "CAD",
    openBalance: 118_750, current: 24_750, days1to30: 46_000, days31to60: 48_000, over60: 0,
    creditLimit: 150_000, terms: "Net 30", owner: "Priya Nair", contact: "Marie Cloutier, Contrôleuse",
    oldestInvoiceDays: 55, lastPayment: "Oct 22, 2026", lastPaymentAmount: 39_800,
    creditNote: "Oldest invoice is 55 days old and approaching the 60 day line. Payments follow the customer's own railcar delivery milestones. Alfie recommends a reminder this week and a watch flag, not a hold.",
    invoices: [
      { id: "INV-61204", issued: "Sep 22, 2026", due: "Oct 22, 2026", amount: 48_000, ageDays: 55, status: "Overdue", description: "Fabricated bogie frames, September delivery" },
      { id: "INV-61231", issued: "Oct 20, 2026", due: "Nov 19, 2026", amount: 46_000, ageDays: 27, status: "Open", description: "Welded subassemblies, October delivery" },
      { id: "INV-61255", issued: "Nov 6, 2026", due: "Dec 6, 2026", amount: 24_750, ageDays: 10, status: "Current", description: "Frame repair kits, November delivery" },
    ],
    payments: [
      { date: "Oct 22, 2026", amount: 39_800, method: "EFT", appliedTo: "INV-61188", note: "Paid in full, 43 days after invoice" },
      { date: "Sep 18, 2026", amount: 44_600, method: "EFT", appliedTo: "INV-61150", note: "Paid in full, 38 days after invoice" },
    ],
  },
  {
    id: "CUS-3305", name: "Northern Harvest Equipment", entity: "Northline Precision Inc.", segment: "Agricultural dealer", status: "Current", currency: "CAD",
    openBalance: 84_200, current: 54_600, days1to30: 29_600, days31to60: 0, over60: 0,
    creditLimit: 120_000, terms: "Net 30", owner: "Priya Nair", contact: "Karen Wall, Office Manager",
    oldestInvoiceDays: 18, lastPayment: "Nov 5, 2026", lastPaymentAmount: 47_900,
    creditNote: "Seasonal dealer paying inside terms after harvest. Utilization is 70% of a $120,000 limit. No action recommended.",
    invoices: [
      { id: "INV-41402", issued: "Oct 29, 2026", due: "Nov 28, 2026", amount: 29_600, ageDays: 18, status: "Open", description: "Header drive components, October order" },
      { id: "INV-41421", issued: "Nov 11, 2026", due: "Dec 11, 2026", amount: 54_600, ageDays: 5, status: "Current", description: "Series 400 housings, winter stocking order" },
    ],
    payments: [
      { date: "Nov 5, 2026", amount: 47_900, method: "EFT", appliedTo: "INV-41377", note: "Paid in full, 26 days after invoice" },
      { date: "Oct 6, 2026", amount: 52_300, method: "EFT", appliedTo: "INV-41330", note: "Paid in full, 28 days after invoice" },
    ],
  },
  {
    id: "CUS-3306", name: "Bluewater Marine Drives", entity: "Northline Assembly Inc.", segment: "Marine", status: "Current", currency: "USD",
    openBalance: 57_900, current: 57_900, days1to30: 0, days31to60: 0, over60: 0,
    creditLimit: 90_000, terms: "Net 30", owner: "Anita Roy", contact: "Chris Novak, Finance Manager",
    oldestInvoiceDays: 11, lastPayment: "Nov 3, 2026", lastPaymentAmount: 44_250,
    creditNote: "Small account, current on all invoices. No action recommended.",
    invoices: [
      { id: "INV-5190", issued: "Nov 5, 2026", due: "Dec 5, 2026", amount: 57_900, ageDays: 11, status: "Current", description: "Marine gear assemblies, November order" },
    ],
    payments: [
      { date: "Nov 3, 2026", amount: 44_250, method: "Wire", appliedTo: "INV-5158", note: "Paid in full, 25 days after invoice" },
      { date: "Oct 2, 2026", amount: 39_800, method: "Wire", appliedTo: "INV-5122", note: "Paid in full, 27 days after invoice" },
    ],
  },
  {
    id: "CUS-3307", name: "Summit Drivetrain Distributors", entity: "Northline Precision Inc.", segment: "Aftermarket distribution", status: "On Hold", currency: "CAD",
    openBalance: 71_300, current: 0, days1to30: 0, days31to60: 0, over60: 71_300,
    creditLimit: 85_000, terms: "Net 30", owner: "Priya Nair", contact: "Laura Singh, Controller",
    oldestInvoiceDays: 121, lastPayment: "Jun 26, 2026", lastPaymentAmount: 38_400,
    creditNote: "Credit hold has been in place since October 12. No payment since June 26 and the full balance is over 60 days. Alfie recommends a final demand before the balance is considered for write-off.",
    invoices: [
      { id: "INV-40987", issued: "Jul 18, 2026", due: "Aug 17, 2026", amount: 71_300, ageDays: 121, status: "Overdue", description: "Aftermarket gearbox stock, July program" },
    ],
    payments: [
      { date: "Jun 26, 2026", amount: 38_400, method: "EFT", appliedTo: "INV-40940", note: "Paid in full, 55 days after invoice" },
      { date: "May 27, 2026", amount: 41_900, method: "EFT", appliedTo: "INV-40892", note: "Paid in full, 48 days after invoice" },
    ],
  },
  {
    id: "CUS-3308", name: "Great Lakes Transit Commission", entity: "Northline Fabrication Ltée", segment: "Public transit", status: "Current", currency: "CAD",
    openBalance: 132_600, current: 98_000, days1to30: 34_600, days31to60: 0, over60: 0,
    creditLimit: 200_000, terms: "Net 30", owner: "Priya Nair", contact: "Sandra Peters, Procurement Lead",
    oldestInvoiceDays: 16, lastPayment: "Nov 12, 2026", lastPaymentAmount: 88_200,
    creditNote: "Public sector customer on a fixed payment cycle, current on all invoices. No action recommended.",
    invoices: [
      { id: "INV-61301", issued: "Oct 31, 2026", due: "Nov 30, 2026", amount: 34_600, ageDays: 16, status: "Open", description: "Bus frame components, October delivery" },
      { id: "INV-61320", issued: "Nov 9, 2026", due: "Dec 9, 2026", amount: 98_000, ageDays: 7, status: "Current", description: "Drivetrain overhaul kits, November program" },
    ],
    payments: [
      { date: "Nov 12, 2026", amount: 88_200, method: "EFT", appliedTo: "INV-61284", note: "Paid in full, 29 days after invoice" },
      { date: "Oct 14, 2026", amount: 76_500, method: "EFT", appliedTo: "INV-61241", note: "Paid in full, 30 days after invoice" },
    ],
  },
];

export const getCustomer = (id: string) => customers.find((c) => c.id === id);
export const cad = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
export const usd = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
export const fmt = (v: number, c: ArCurrency) => (c === "USD" ? usd(v) : cad(v));

export const seedCustomerAudit: ArAuditEvent[] = [
  { time: "Nov 16, 09:48", actor: "Alfie", actorType: "Alfie", action: "Collection assessment updated", source: "Aging and payment history", approval: "Not required", next: "Reminder recommended; no credit hold" },
  { time: "Nov 14, 15:02", actor: "Alfie", actorType: "Alfie", action: "Statement of account prepared", source: "Open invoices at Nov 14", approval: "Not required", next: "Ready for review" },
  { time: "Oct 28, 13:26", actor: "System", actorType: "System", action: "Payment received", source: "TD Bank feed", approval: "Not required", next: "INV-41190 paid in full · $112,400" },
  { time: "Oct 21, 10:11", actor: "Priya Nair", actorType: "User", action: "Reminder sent", source: "Collections workspace", approval: "Approved", next: "INV-41208 reminder, first notice" },
  { time: "Oct 19, 09:00", actor: "System", actorType: "System", action: "Invoice passed due date", source: "INV-41208", approval: "Not required", next: "Aging bucket: 1 to 30 days" },
];

export const entities: readonly string[] = ["Northline Precision Inc.", "Northline Fabrication Ltée", "Northline Assembly Inc."];

export const entityShortNames: Record<string, string> = {
  "Northline Precision Inc.": "Precision",
  "Northline Fabrication Ltée": "Fabrication",
  "Northline Assembly Inc.": "Assembly",
};

export const customerSegments: readonly string[] = ["Agricultural equipment OEM", "Agricultural dealer", "Truck OEM", "Rail", "Marine", "Aftermarket distribution", "Public transit"];

export const erpName = "Epicor Kinetic";

export const flagshipCustomerId = "CUS-3301";

export const newCustomerDefaults = { owner: "Priya Nair", firstNumber: 3309, usdEntity: "Northline Assembly Inc." };

export const receivablesMetrics: readonly (readonly [string, string, string, boolean])[] = [["Over 60 Days", "$688K", "Collection focus", false], ["DSO", "43 days", "Steady vs October", true], ["Customers Overdue", "19", "Of 98 with balances", false], ["Credit Hold Recommended", "1", "Prairie Implement Co.", false], ["Oldest Invoice", "121 days", "Summit Drivetrain Distributors", false]];

export type ReceivablesAnswer = { intro: string; note: string };

export const receivablesAnswers: { over60: ReceivablesAnswer; hold: ReceivablesAnswer; largest: ReceivablesAnswer; slowing: ReceivablesAnswer; fallback: ReceivablesAnswer } = {
  over60: { intro: "2 customers in this view carry balances over 60 days.", note: "Across the full ledger, $688K is over 60 days. Prairie Implement Co. is the largest single exposure at $45,000 over 60; Summit Drivetrain Distributors is the oldest at 121 days and already on credit hold." },
  hold: { intro: "Alfie recommends a credit hold for 1 customer.", note: "Prairie Implement Co. is at 143% of its $100,000 credit limit with an 88 day old invoice. Summit Drivetrain Distributors is already on hold. AgriCore Equipment is monitored, not held: it paid $112,400 in October and is inside its limit." },
  largest: { intro: "Largest open balances, ranked:", note: "The top 4 accounts are just over half of the open balance in this view. Amounts are in each customer's operating currency; consolidated reporting converts to CAD." },
  slowing: { intro: "2 customers are paying more slowly than they did last quarter.", note: "AgriCore Equipment: days to pay rose from 34 to 39 across the last three payments, and the current oldest invoice is 28 days past due. CanAm Railcar Works: the last two payments landed at 38 and 43 days." },
  fallback: { intro: "Collection priorities for this week, in order:", note: "1. Send the drafted reminder to AgriCore Equipment (INV-41208, $168,500). 2. Decide the Prairie Implement credit hold. 3. Call CanAm Railcar Works about the 55 day invoice before it ages further." },
};

export const slowingCustomerIds: readonly string[] = ["CUS-3301", "CUS-3304"];
export const priorityCustomerIds: readonly string[] = ["CUS-3301", "CUS-3302", "CUS-3304"];

export type DocSection = { heading: string; body: string };
export type CustomerDoc = { id: string; name: string; label: string; date: string; summary: string };
export type CustomerReply = { intro: string; items?: string[]; fields?: [string, string][]; next?: string; verdict?: string; confidence?: string; sources?: string[] | undefined; note?: string; draft?: string };

const oldestOverdue = (c: ArCustomer) => c.invoices.filter((i) => i.status === "Overdue").sort((a, b) => b.ageDays - a.ageDays)[0];

export function collectionDraftFor(c: ArCustomer): string {
  const oldest = oldestOverdue(c);
  if (c.id === flagshipCustomerId) return `Subject: Payment timing for invoice INV-41208 and the open balance of $486,000\n\nHello Greg,\n\nI am writing about invoice INV-41208 for $168,500, issued September 19 and due October 19, which is still open, alongside three further invoices bringing the account to $486,000. Thank you for the payment received on October 28.\n\nSo we can keep shipments on schedule, could you confirm a payment date for INV-41208 this week, and a plan for the remaining balance? If it helps, we can split the remaining balance across two payments in December.\n\nThank you,\nSarah Mitchell, VP Finance, Northline Manufacturing Group Inc.`;
  if (!oldest) return `Subject: Statement of account, ${c.name}\n\nHello ${c.contact.split(",")[0]},\n\nYour account is current at ${fmt(c.openBalance, c.currency)} on ${c.terms} terms. A statement of account is attached for your records. Thank you for keeping the account in good standing.\n\nSarah Mitchell, VP Finance, Northline Manufacturing Group Inc.`;
  return `Subject: Payment timing for invoice ${oldest.id} and the open balance of ${fmt(c.openBalance, c.currency)}\n\nHello ${c.contact.split(",")[0]},\n\nInvoice ${oldest.id} for ${fmt(oldest.amount, c.currency)} was due ${oldest.due} and is still open. The total balance on the account is ${fmt(c.openBalance, c.currency)}. Could you confirm when payment will be made, or let me know if anything is holding it up?\n\nThank you,\nSarah Mitchell, VP Finance, Northline Manufacturing Group Inc.`;
}

export function assessmentFor(c: ArCustomer): CustomerReply {
  const overdue = c.invoices.filter((i) => i.status === "Overdue");
  if (c.id === flagshipCustomerId) return {
    intro: "AgriCore Equipment owes $486,000 across 4 invoices. The account is not in distress, but it is drifting:",
    items: ["INV-41208 for $168,500 is 28 days past due; it is the largest single invoice and the oldest at 58 days.", "Days to pay has lengthened across the last three payments: 34, then 36, then 39 days.", "The October 28 payment of $112,400 shows the customer is paying, just more slowly."],
    verdict: "Send a firm reminder now; do not place a credit hold yet.",
    next: "Review the drafted collection note to Greg Halvorsen, then reassess if INV-41208 is unpaid by November 27.",
    confidence: "High",
    sources: ["Open invoices", "Payment history", "Credit file"],
  };
  if (c.status === "Credit Hold Recommended") return {
    intro: `${c.name} owes ${fmt(c.openBalance, c.currency)}, which is above its ${fmt(c.creditLimit, c.currency)} credit limit:`,
    items: [`The oldest invoice is ${c.oldestInvoiceDays} days old, with ${fmt(c.over60, c.currency)} over 60 days.`, "The last payment, on September 30, was partial, and nothing has been received since.", "Harvest season orders shipped against an account that is already over its limit."],
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
  if (c.id === flagshipCustomerId) return { status: "Collection review · 28 days past due", title: "INV-41208 for $168,500 is unpaid past its October 19 due date", detail: "Alfie drafted a collection note to Greg Halvorsen at AgriCore Equipment. Payment behaviour has slowed over the fall, but the account is within its $600,000 credit limit and paid $112,400 in October, so Alfie does not recommend a credit hold yet." };
  if (c.status === "Credit Hold Recommended") return { status: "Credit review · Hold recommended", title: `Alfie recommends a credit hold for ${c.name}`, detail: `The balance of ${fmt(c.openBalance, c.currency)} is above the ${fmt(c.creditLimit, c.currency)} credit limit and the oldest invoice is ${c.oldestInvoiceDays} days old. The last payment was partial and nothing has been received since September 30.` };
  if (c.status === "On Hold") return { status: "Credit hold in place", title: "This account has been on credit hold since October 12", detail: `No payment has been received since ${c.lastPayment}, and the full balance of ${fmt(c.openBalance, c.currency)} is over 60 days. Alfie recommends a final demand before the balance is considered for write-off.` };
  if (oldest) return { status: "Collection review", title: `${oldest.id} for ${fmt(oldest.amount, c.currency)} is past due`, detail: `The oldest invoice on this account is ${oldest.ageDays} days old. Alfie has a collection draft ready for your review.` };
  return { status: "Account in good standing", title: `Open balance ${fmt(c.openBalance, c.currency)}, nothing past due`, detail: "Alfie is monitoring aging and payment behaviour. No action is needed on this account today." };
}

export function customerDocsFor(c: ArCustomer): { docs: CustomerDoc[]; sections: Record<string, DocSection[]> } {
  const docs: CustomerDoc[] = [
    { id: "s1", name: `statement_${c.id}.pdf`, label: "November Statement of Account", date: "Nov 14, 2026", summary: `Statement of account for ${c.name} at November 14, 2026: open balance ${fmt(c.openBalance, c.currency)} across ${c.invoices.length} invoices, oldest ${c.oldestInvoiceDays} days.` },
    { id: "s2", name: `credit_file_${c.id}.pdf`, label: "Credit Application and Terms", date: "On file", summary: `Credit file for ${c.name}: limit ${fmt(c.creditLimit, c.currency)}, terms ${c.terms}, contact ${c.contact}. Approved by the Controller at account opening and reviewed annually.` },
    { id: "s3", name: `master_agreement_${c.id}.pdf`, label: "Master Supply Agreement", date: "On file", summary: `Master supply agreement between ${c.entity} and ${c.name}, covering pricing, delivery, and payment terms of ${c.terms} from invoice date.` },
    { id: "s4", name: `correspondence_${c.id}.pdf`, label: "Collection Correspondence", date: "Oct 21, 2026", summary: `Correspondence log for ${c.name}: statements and reminders sent, and replies received from ${c.contact}.` },
  ];
  const sections: Record<string, DocSection[]> = {
    s1: [
      { heading: "Open invoices", body: c.invoices.map((i) => `${i.id}: ${fmt(i.amount, c.currency)}, issued ${i.issued}, due ${i.due}`).join(". ") + "." },
      { heading: "Aging", body: `Current ${fmt(c.current, c.currency)}; 1 to 30 days ${fmt(c.days1to30, c.currency)}; 31 to 60 days ${fmt(c.days31to60, c.currency)}; over 60 days ${fmt(c.over60, c.currency)}. Total open ${fmt(c.openBalance, c.currency)}.` },
    ],
    s2: [
      { heading: "Approved terms", body: `Credit limit ${fmt(c.creditLimit, c.currency)} on ${c.terms} terms. Balances above the limit or past 60 days trigger a credit review under the receivables policy.` },
      { heading: "Account contacts", body: `Customer contact: ${c.contact}. Northline account owner: ${c.owner}.` },
    ],
    s3: [
      { heading: "Payment terms", body: `Invoices are payable ${c.terms.toLowerCase()} from the invoice date. Overdue balances may result in shipments being held until the account is brought current.` },
    ],
    s4: [
      { heading: "Recent correspondence", body: c.id === flagshipCustomerId ? "October 21: first reminder for INV-41208 sent by Priya Nair. October 28: payment of $112,400 received against INV-41190 with a note that INV-41208 would follow. It has not yet been paid." : "Statements are issued monthly. Reminders follow the standard sequence at 7, 21 and 35 days past due, each approved by a person before sending." },
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
  if (c.status === "On Hold") events.splice(1, 0, { time: "Oct 12, 11:30", actor: "Priya Nair", actorType: "User", action: "Credit hold placed", source: "Credit review", approval: "Approved", prev: "Watch", next: "On Hold" });
  return events;
}

export function customerReplyFor(q: string, fileNames: readonly string[], c: ArCustomer): { reply: CustomerReply; actions: string[] } {
  const p = q.toLowerCase();
  const overdue = c.invoices.filter((i) => i.status === "Overdue");
  if (fileNames.length) return { reply: { intro: `I reviewed the ${fileNames.length === 1 ? "uploaded file" : `${fileNames.length} uploaded files`} against this customer account. Nothing in it changes the open balance or aging.`, note: "Uploaded files are used in this conversation only and have not been added to the customer record.", sources: [...fileNames] }, actions: ["Ask Follow-up"] };
  if (p.includes("draft") || p.includes("collection note") || p.includes("reminder")) return { reply: { intro: `Draft collection note to ${c.contact}, for your review before sending:`, draft: collectionDraftFor(c), note: "Nothing has been sent. Sending requires your approval, and the sent note is logged to the account history.", sources: ["Open invoices", "Correspondence log"] }, actions: ["Approve and Send Reminder", "Ask Follow-up"] };
  if (p.includes("overdue")) return { reply: { intro: overdue.length ? `${overdue.length} invoice${overdue.length === 1 ? " is" : "s are"} past due on this account:` : "No invoices are past due on this account.", fields: overdue.map((i) => [i.id, `${fmt(i.amount, c.currency)} · due ${i.due} · ${i.ageDays} days old`] as [string, string]), verdict: overdue.length ? `${fmt(overdue.reduce((s, i) => s + i.amount, 0), c.currency)} is past due of the ${fmt(c.openBalance, c.currency)} open balance.` : "The account is current.", confidence: "High", sources: ["Open invoices"] }, actions: ["Draft a collection note.", "Ask Follow-up"] };
  if (p.includes("credit") || p.includes("hold")) return { reply: { intro: "Credit assessment for this account:", fields: [["Open balance", fmt(c.openBalance, c.currency)], ["Credit limit", fmt(c.creditLimit, c.currency)], ["Utilization", `${Math.round((c.openBalance / c.creditLimit) * 100)}%`], ["Over 60 days", fmt(c.over60, c.currency)], ["Oldest invoice", `${c.oldestInvoiceDays} days`]], note: c.creditNote, verdict: c.status === "Credit Hold Recommended" ? "Place the account on credit hold." : c.status === "On Hold" ? "Hold already in place. Escalate with a final demand." : "No credit hold recommended at this time.", confidence: "High", sources: ["Credit file", "Aging"] }, actions: c.status === "Credit Hold Recommended" ? ["Place Credit Hold", "Ask Follow-up"] : ["Ask Follow-up"] };
  if (p.includes("behaviour") || p.includes("behavior") || p.includes("paid") || p.includes("payment")) return { reply: { intro: "Recent payment behaviour:", fields: c.payments.map((pay) => [pay.date, `${fmt(pay.amount, c.currency)} · ${pay.appliedTo} · ${pay.note}`] as [string, string]), note: c.id === flagshipCustomerId ? "The trend is consistent: each payment lands a few days later than the one before, and the oldest open invoice is now 28 days past due." : "Payment timing is drawn from the bank feed matched to invoices.", confidence: "High", sources: ["Payment history", "Bank feed"] }, actions: ["Ask Follow-up"] };
  if (p.includes("statement")) return { reply: { intro: "The November statement of account is ready in Documents.", fields: [["Open balance", fmt(c.openBalance, c.currency)], ["Invoices listed", `${c.invoices.length}`], ["Prepared", "November 14, 2026"]], note: "Review it in the Documents tab. Sending it to the customer is a separate, approved step.", sources: ["Statement of account"] }, actions: ["Review Documents", "Ask Follow-up"] };
  return { reply: assessmentFor(c), actions: ["Draft a collection note.", "Recommend a credit action.", "Ask Follow-up"] };
}
