import type { ArAuditEvent, ArCustomer, ArCurrency, CustomerStatus } from "@/lib/worlds/enterprise/receivables-data";

export type { ArAuditEvent, ArCustomer, ArCurrency, ArInvoice, ArPayment, CustomerStatus, InvoiceStatus } from "@/lib/worlds/enterprise/receivables-data";

export const customerStatuses: readonly CustomerStatus[] = ["Current", "Watch", "Overdue", "Credit Hold Recommended", "On Hold"];

export const customers: ArCustomer[] = [
  {
    id: "CUS-5101", name: "Cascade Refining Corp.", entity: "Aurora Ridge Mining Corp.", segment: "Refinery", status: "Overdue", currency: "CAD",
    openBalance: 2_840_000, current: 2_214_000, days1to30: 430_000, days31to60: 0, over60: 196_000,
    creditLimit: 3_500_000, terms: "Settlement 10 days", owner: "Angela Ruiz", contact: "Michael Tran, Settlements Manager",
    oldestInvoiceDays: 74, lastPayment: "Nov 12, 2026", lastPaymentAmount: 1_150_000,
    creditNote: "Aurora Ridge's largest buyer, settling gold shipments on 10 day terms with a clean history. One lot of $196,000 is over 60 days under an assay dispute on final weights and is being held back by agreement. Alfie recommends continuing shipments while the dispute is resolved, with no hold.",
    invoices: [
      { id: "INV-2098", issued: "Sep 3, 2026", due: "Sep 13, 2026", amount: 196_000, ageDays: 74, status: "Overdue", description: "Lot KR-2098 doré shipment, held under assay dispute" },
      { id: "INV-2140", issued: "Oct 25, 2026", due: "Nov 4, 2026", amount: 430_000, ageDays: 22, status: "Open", description: "Lot KR-2140 gold shipment settlement, October" },
      { id: "INV-2151", issued: "Nov 7, 2026", due: "Nov 17, 2026", amount: 986_000, ageDays: 9, status: "Current", description: "Lot KR-2151 gold shipment settlement, November" },
      { id: "INV-2157", issued: "Nov 12, 2026", due: "Nov 22, 2026", amount: 1_228_000, ageDays: 4, status: "Current", description: "Lot KR-2157 gold shipment settlement, November" },
    ],
    payments: [
      { date: "Nov 12, 2026", amount: 1_150_000, method: "Wire", appliedTo: "INV-2133", note: "Settled in full, 9 days after shipment" },
      { date: "Oct 24, 2026", amount: 1_042_000, method: "Wire", appliedTo: "INV-2109", note: "Settled in full, 10 days after shipment" },
      { date: "Oct 3, 2026", amount: 968_500, method: "Wire", appliedTo: "INV-2077", note: "Settled in full, 10 days after shipment" },
    ],
  },
  {
    id: "CUS-5102", name: "Desert Sage Trading", entity: "Aurora Ridge USA Inc.", segment: "Bullion dealer", status: "Credit Hold Recommended", currency: "USD",
    openBalance: 412_000, current: 96_000, days1to30: 172_000, days31to60: 144_000, over60: 0,
    creditLimit: 250_000, terms: "Settlement 10 days", owner: "Angela Ruiz", contact: "Rosa Delgado, Owner",
    oldestInvoiceDays: 56, lastPayment: "Oct 19, 2026", lastPaymentAmount: 88_000,
    creditNote: "Balance of $412,000 is 165% of the $250,000 limit set for dealer accounts, and settlements have stretched from 10 days to nearly 8 weeks. Alfie recommends a shipment hold until the balance is back under the limit.",
    invoices: [
      { id: "INV-3087", issued: "Sep 21, 2026", due: "Oct 1, 2026", amount: 144_000, ageDays: 56, status: "Overdue", description: "Sagebrush doré lot SB-118, September shipment" },
      { id: "INV-3119", issued: "Oct 18, 2026", due: "Oct 28, 2026", amount: 172_000, ageDays: 29, status: "Open", description: "Sagebrush doré lot SB-124, October shipment" },
      { id: "INV-3130", issued: "Nov 8, 2026", due: "Nov 18, 2026", amount: 96_000, ageDays: 8, status: "Current", description: "Sagebrush silver lot SB-127, November shipment" },
    ],
    payments: [
      { date: "Oct 19, 2026", amount: 88_000, method: "Wire", appliedTo: "INV-3060", note: "Partial settlement; $36,000 short of the agreed amount" },
      { date: "Aug 30, 2026", amount: 121_500, method: "Wire", appliedTo: "INV-3019", note: "Settled in full, 24 days after shipment" },
    ],
  },
  {
    id: "CUS-5103", name: "Pacific Bullion Bank", entity: "Aurora Ridge Mining Corp.", segment: "Bullion bank", status: "Current", currency: "CAD",
    openBalance: 1_486_000, current: 1_486_000, days1to30: 0, days31to60: 0, over60: 0,
    creditLimit: 2_500_000, terms: "Settlement 5 days", owner: "Angela Ruiz", contact: "David Kim, Bullion Desk",
    oldestInvoiceDays: 6, lastPayment: "Nov 13, 2026", lastPaymentAmount: 1_204_000,
    creditNote: "Settles loco Toronto gold sales on 5 day terms without exception. No action recommended.",
    invoices: [
      { id: "INV-2160", issued: "Nov 10, 2026", due: "Nov 15, 2026", amount: 892_000, ageDays: 6, status: "Current", description: "Refined gold sale, 220 oz, November" },
      { id: "INV-2163", issued: "Nov 13, 2026", due: "Nov 18, 2026", amount: 594_000, ageDays: 3, status: "Current", description: "Refined gold sale, 146 oz, November" },
    ],
    payments: [
      { date: "Nov 13, 2026", amount: 1_204_000, method: "Wire", appliedTo: "INV-2144", note: "Settled in full, 5 days after sale" },
      { date: "Oct 27, 2026", amount: 1_118_000, method: "Wire", appliedTo: "INV-2118", note: "Settled in full, 5 days after sale" },
    ],
  },
  {
    id: "CUS-5104", name: "Great Basin Refining LLC", entity: "Aurora Ridge USA Inc.", segment: "Refinery", status: "Current", currency: "USD",
    openBalance: 764_000, current: 512_000, days1to30: 252_000, days31to60: 0, over60: 0,
    creditLimit: 1_200_000, terms: "Settlement 10 days", owner: "Angela Ruiz", contact: "Joe Marino, Settlements Lead",
    oldestInvoiceDays: 19, lastPayment: "Nov 9, 2026", lastPaymentAmount: 486_000,
    creditNote: "Sagebrush's refiner of record, settling inside terms. Utilization is 64% of a USD 1,200,000 limit. No action recommended.",
    invoices: [
      { id: "INV-3144", issued: "Oct 28, 2026", due: "Nov 7, 2026", amount: 252_000, ageDays: 19, status: "Open", description: "Sagebrush doré lot SB-121 settlement, October" },
      { id: "INV-3151", issued: "Nov 9, 2026", due: "Nov 19, 2026", amount: 512_000, ageDays: 7, status: "Current", description: "Sagebrush doré lot SB-126 settlement, November" },
    ],
    payments: [
      { date: "Nov 9, 2026", amount: 486_000, method: "Wire", appliedTo: "INV-3126", note: "Settled in full, 9 days after shipment" },
      { date: "Oct 15, 2026", amount: 502_000, method: "Wire", appliedTo: "INV-3098", note: "Settled in full, 10 days after shipment" },
    ],
  },
  {
    id: "CUS-5105", name: "Sierra Precious Metals Inc.", entity: "Aurora Ridge USA Inc.", segment: "Bullion dealer", status: "Watch", currency: "USD",
    openBalance: 188_500, current: 62_500, days1to30: 71_000, days31to60: 55_000, over60: 0,
    creditLimit: 300_000, terms: "Settlement 10 days", owner: "Angela Ruiz", contact: "Amy Chen, Finance Manager",
    oldestInvoiceDays: 49, lastPayment: "Oct 26, 2026", lastPaymentAmount: 64_200,
    creditNote: "Oldest settlement is 49 days old against 10 day terms. The dealer is responsive and settled in October, but the pattern is drifting. Alfie recommends a firm reminder and a watch flag, not a hold.",
    invoices: [
      { id: "INV-3102", issued: "Sep 28, 2026", due: "Oct 8, 2026", amount: 55_000, ageDays: 49, status: "Overdue", description: "Sagebrush silver lot SB-112, September shipment" },
      { id: "INV-3122", issued: "Oct 23, 2026", due: "Nov 2, 2026", amount: 71_000, ageDays: 24, status: "Open", description: "Sagebrush doré lot SB-123, October shipment" },
      { id: "INV-3136", issued: "Nov 7, 2026", due: "Nov 17, 2026", amount: 62_500, ageDays: 9, status: "Current", description: "Sagebrush doré lot SB-128, November shipment" },
    ],
    payments: [
      { date: "Oct 26, 2026", amount: 64_200, method: "Wire", appliedTo: "INV-3088", note: "Settled in full, 31 days after shipment" },
      { date: "Sep 15, 2026", amount: 58_900, method: "Wire", appliedTo: "INV-3055", note: "Settled in full, 27 days after shipment" },
    ],
  },
  {
    id: "CUS-5106", name: "Northern Mint Corp.", entity: "Aurora Ridge Mining Corp.", segment: "Mint", status: "Current", currency: "CAD",
    openBalance: 326_000, current: 326_000, days1to30: 0, days31to60: 0, over60: 0,
    creditLimit: 500_000, terms: "Settlement 10 days", owner: "Angela Ruiz", contact: "Sandra Peters, Procurement Lead",
    oldestInvoiceDays: 8, lastPayment: "Nov 6, 2026", lastPaymentAmount: 298_000,
    creditNote: "Mint program buyer on a steady monthly cycle, current on all settlements. No action recommended.",
    invoices: [
      { id: "INV-2155", issued: "Nov 8, 2026", due: "Nov 18, 2026", amount: 326_000, ageDays: 8, status: "Current", description: "Refined gold for mint program, 80 oz, November" },
    ],
    payments: [
      { date: "Nov 6, 2026", amount: 298_000, method: "Wire", appliedTo: "INV-2129", note: "Settled in full, 9 days after sale" },
      { date: "Oct 7, 2026", amount: 284_000, method: "Wire", appliedTo: "INV-2096", note: "Settled in full, 10 days after sale" },
    ],
  },
  {
    id: "CUS-5107", name: "Yukon Gold Traders Ltd.", entity: "Aurora Ridge Mining Corp.", segment: "Bullion dealer", status: "Watch", currency: "CAD",
    openBalance: 94_800, current: 31_800, days1to30: 63_000, days31to60: 0, over60: 0,
    creditLimit: 150_000, terms: "Settlement 10 days", owner: "Angela Ruiz", contact: "Paul Tremblay, Owner",
    oldestInvoiceDays: 27, lastPayment: "Oct 30, 2026", lastPaymentAmount: 41_600,
    creditNote: "Small dealer account settling at about three weeks against 10 day terms. Inside the limit and communicating well. Alfie recommends a watch flag only.",
    invoices: [
      { id: "INV-2136", issued: "Oct 20, 2026", due: "Oct 30, 2026", amount: 63_000, ageDays: 27, status: "Open", description: "Keno Ridge doré lot KR-2136, October shipment" },
      { id: "INV-2152", issued: "Nov 6, 2026", due: "Nov 16, 2026", amount: 31_800, ageDays: 10, status: "Current", description: "Keno Ridge doré lot KR-2152, November shipment" },
    ],
    payments: [
      { date: "Oct 30, 2026", amount: 41_600, method: "Wire", appliedTo: "INV-2110", note: "Settled in full, 19 days after shipment" },
      { date: "Sep 29, 2026", amount: 38_200, method: "Wire", appliedTo: "INV-2079", note: "Settled in full, 21 days after shipment" },
    ],
  },
];

export const getCustomer = (id: string) => customers.find((c) => c.id === id);
export const cad = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
export const usd = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
export const fmt = (v: number, c: ArCurrency) => (c === "USD" ? usd(v) : cad(v));

export const seedCustomerAudit: ArAuditEvent[] = [
  { time: "Nov 16, 09:48", actor: "Alfie", actorType: "Alfie", action: "Settlement assessment updated", source: "Aging and settlement history", approval: "Not required", next: "Continue shipments; assay dispute lot tracked separately" },
  { time: "Nov 14, 15:02", actor: "Alfie", actorType: "Alfie", action: "Statement of account prepared", source: "Open settlements at Nov 14", approval: "Not required", next: "Ready for review" },
  { time: "Nov 12, 13:26", actor: "System", actorType: "System", action: "Settlement received", source: "RBC Royal Bank feed", approval: "Not required", next: "INV-2133 settled in full · $1,150,000" },
  { time: "Oct 16, 10:11", actor: "Angela Ruiz", actorType: "User", action: "Assay dispute acknowledged", source: "Receivables workspace", approval: "Approved", next: "Lot KR-2098 held at $196,000 pending final assay" },
  { time: "Sep 13, 09:00", actor: "System", actorType: "System", action: "Settlement passed due date", source: "INV-2098", approval: "Not required", next: "Aging bucket: 1 to 30 days" },
];

export const entities: readonly string[] = ["Aurora Ridge Mining Corp.", "Aurora Ridge USA Inc.", "Copperline Metals JV"];

export const entityShortNames: Record<string, string> = {
  "Aurora Ridge Mining Corp.": "Mining",
  "Aurora Ridge USA Inc.": "USA",
  "Copperline Metals JV": "Copperline Metals JV",
};

export const customerSegments: readonly string[] = ["Refinery", "Bullion dealer", "Bullion bank", "Mint"];

export const erpName = "SAP S/4HANA";

export const flagshipCustomerId = "CUS-5101";

export const newCustomerDefaults = { owner: "Angela Ruiz", firstNumber: 5108, usdEntity: "Aurora Ridge USA Inc." };

export const receivablesMetrics: readonly (readonly [string, string, string, boolean])[] = [["Over 60 Days", "$196K", "One assay dispute", false], ["DSO", "14 days", "Refinery settlement terms", true], ["Customers Overdue", "6", "Of 41 with balances", false], ["Shipment Hold Recommended", "1", "Desert Sage Trading", false], ["Oldest Invoice", "74 days", "Cascade Refining Corp.", false]];

export type ReceivablesAnswer = { intro: string; note: string };

export const receivablesAnswers: { over60: ReceivablesAnswer; hold: ReceivablesAnswer; largest: ReceivablesAnswer; slowing: ReceivablesAnswer; fallback: ReceivablesAnswer } = {
  over60: { intro: "1 customer in this view carries a balance over 60 days.", note: "Across the full ledger, $196K is over 60 days, and all of it is the Cascade Refining assay dispute on lot KR-2098, held back by agreement while final weights are settled. It is a dispute, not a collection problem." },
  hold: { intro: "Alfie recommends a shipment hold for 1 customer.", note: "Desert Sage Trading is at 165% of its $250,000 dealer limit, and settlements have stretched from 10 days to nearly 8 weeks. Cascade Refining is not held: its one old lot is an assay dispute being resolved by agreement." },
  largest: { intro: "Largest open balances, ranked:", note: "The top 4 accounts are just over half of the open balance in this view. Amounts are in each customer's operating currency; consolidated reporting converts to CAD." },
  slowing: { intro: "2 customers are settling more slowly than they did last quarter.", note: "Desert Sage Trading: settlements have stretched from 10 day terms to 24 days, and the October settlement was partial. Sierra Precious Metals: the last two settlements landed at 27 and 31 days against 10 day terms." },
  fallback: { intro: "Receivables priorities for this week, in order:", note: "1. Track the Cascade Refining assay dispute on lot KR-2098 ($196,000) to final weights. 2. Decide the Desert Sage Trading shipment hold. 3. Send a firm reminder to Sierra Precious Metals about the 49 day settlement." },
};

export const slowingCustomerIds: readonly string[] = ["CUS-5102", "CUS-5105"];
export const priorityCustomerIds: readonly string[] = ["CUS-5101", "CUS-5102", "CUS-5105"];

export type DocSection = { heading: string; body: string };
export type CustomerDoc = { id: string; name: string; label: string; date: string; summary: string };
export type CustomerReply = { intro: string; items?: string[]; fields?: [string, string][]; next?: string; verdict?: string; confidence?: string; sources?: string[] | undefined; note?: string; draft?: string };

const oldestOverdue = (c: ArCustomer) => c.invoices.filter((i) => i.status === "Overdue").sort((a, b) => b.ageDays - a.ageDays)[0];

export function collectionDraftFor(c: ArCustomer): string {
  const oldest = oldestOverdue(c);
  if (c.id === flagshipCustomerId) return `Subject: Assay dispute on lot KR-2098 and settlement timing\n\nHello Michael,\n\nI am writing about lot KR-2098, invoiced at $196,000 on September 3, which remains open while the final assay weights are settled. All other lots are settling inside the 10 day terms, including the November 12 settlement of $1,150,000, and shipments will continue as normal.\n\nCould you confirm when the umpire assay results are expected, so we can close this lot out?\n\nThank you,\nClaire Dubois, VP Finance, Aurora Ridge Resources Inc.`;
  if (!oldest) return `Subject: Statement of account, ${c.name}\n\nHello ${c.contact.split(",")[0]},\n\nYour account is current at ${fmt(c.openBalance, c.currency)} on ${c.terms} terms. A statement of account is attached for your records. Thank you for keeping the account in good standing.\n\nClaire Dubois, VP Finance, Aurora Ridge Resources Inc.`;
  return `Subject: Settlement timing for invoice ${oldest.id} and the open balance of ${fmt(c.openBalance, c.currency)}\n\nHello ${c.contact.split(",")[0]},\n\nInvoice ${oldest.id} for ${fmt(oldest.amount, c.currency)} was due ${oldest.due} and is still open. The total balance on the account is ${fmt(c.openBalance, c.currency)}. Could you confirm when settlement will be made, or let me know if anything is holding it up?\n\nThank you,\nClaire Dubois, VP Finance, Aurora Ridge Resources Inc.`;
}

export function assessmentFor(c: ArCustomer): CustomerReply {
  const overdue = c.invoices.filter((i) => i.status === "Overdue");
  if (c.id === flagshipCustomerId) return {
    intro: "Cascade Refining owes $2,840,000 across 4 settlements. The account is healthy; one lot is in dispute:",
    items: ["Lot KR-2098 for $196,000 is 74 days old, held back by agreement under an assay dispute on final weights.", "Every other lot has settled inside the 10 day terms, including $1,150,000 on November 12.", "The balance is 81% of the $3,500,000 limit, with $2,214,000 current."],
    verdict: "Continue shipments; do not place a hold. Track the dispute to the umpire assay.",
    next: "Confirm the expected umpire assay date with the settlements team, then reassess lot KR-2098.",
    confidence: "High",
    sources: ["Open settlements", "Settlement history", "Credit file"],
  };
  if (c.status === "Credit Hold Recommended") return {
    intro: `${c.name} owes ${fmt(c.openBalance, c.currency)}, which is above its ${fmt(c.creditLimit, c.currency)} dealer limit:`,
    items: [`The oldest settlement is ${c.oldestInvoiceDays} days old against 10 day terms.`, "Settlements have stretched from 10 days to nearly 8 weeks, and the last settlement was partial.", "New shipments continue against an account that is already over its limit."],
    verdict: "Place the account on shipment hold until the balance is back under the limit.",
    next: "Approve the hold, then Alfie will draft the customer notification for your review.",
    confidence: "High",
    sources: ["Open settlements", "Credit file", "Settlement history"],
  };
  return {
    intro: `${c.name} owes ${fmt(c.openBalance, c.currency)} across ${c.invoices.length} open settlement${c.invoices.length === 1 ? "" : "s"}. ${overdue.length ? `${overdue.length} settlement${overdue.length === 1 ? " is" : "s are"} past due, the oldest at ${c.oldestInvoiceDays} days.` : "Nothing is past due."}`,
    items: c.creditNote ? [c.creditNote] : [],
    verdict: c.status === "On Hold" ? "Shipment hold is in place. Escalate with a final demand." : c.status === "Current" ? "No action needed. The account is in good standing." : "Monitor, with a reminder this week.",
    confidence: "High",
    sources: ["Open settlements", "Settlement history", "Credit file"],
  };
}

export function reviewForCustomer(c: ArCustomer): { status: string; title: string; detail: string } {
  const oldest = oldestOverdue(c);
  if (c.id === flagshipCustomerId) return { status: "Settlement review · Assay dispute", title: "Lot KR-2098 for $196,000 is held under an assay dispute", detail: "Alfie drafted a follow-up to Michael Tran at Cascade Refining. Every other lot settles inside the 10 day terms and the account is within its $3,500,000 limit, so Alfie does not recommend a shipment hold." };
  if (c.status === "Credit Hold Recommended") return { status: "Credit review · Hold recommended", title: `Alfie recommends a shipment hold for ${c.name}`, detail: `The balance of ${fmt(c.openBalance, c.currency)} is above the ${fmt(c.creditLimit, c.currency)} dealer limit and the oldest settlement is ${c.oldestInvoiceDays} days old. Settlements have stretched from 10 day terms to nearly 8 weeks.` };
  if (c.status === "On Hold") return { status: "Shipment hold in place", title: "This account is on shipment hold", detail: `No settlement has been received since ${c.lastPayment}, and the full balance of ${fmt(c.openBalance, c.currency)} is over 60 days. Alfie recommends a final demand before the balance is considered for write-off.` };
  if (oldest) return { status: "Settlement review", title: `${oldest.id} for ${fmt(oldest.amount, c.currency)} is past due`, detail: `The oldest settlement on this account is ${oldest.ageDays} days old. Alfie has a follow-up draft ready for your review.` };
  return { status: "Account in good standing", title: `Open balance ${fmt(c.openBalance, c.currency)}, nothing past due`, detail: "Alfie is monitoring aging and settlement behaviour. No action is needed on this account today." };
}

export function customerDocsFor(c: ArCustomer): { docs: CustomerDoc[]; sections: Record<string, DocSection[]> } {
  const docs: CustomerDoc[] = [
    { id: "s1", name: `statement_${c.id}.pdf`, label: "November Statement of Account", date: "Nov 14, 2026", summary: `Statement of account for ${c.name} at November 14, 2026: open balance ${fmt(c.openBalance, c.currency)} across ${c.invoices.length} settlements, oldest ${c.oldestInvoiceDays} days.` },
    { id: "s2", name: `credit_file_${c.id}.pdf`, label: "Credit Application and Terms", date: "On file", summary: `Credit file for ${c.name}: limit ${fmt(c.creditLimit, c.currency)}, terms ${c.terms}, contact ${c.contact}. Approved by the Controller at account opening and reviewed annually.` },
    { id: "s3", name: `master_agreement_${c.id}.pdf`, label: "Master Sales Agreement", date: "On file", summary: `Master sales agreement between ${c.entity} and ${c.name}, covering pricing, delivery, and settlement terms of ${c.terms} from shipment date.` },
    { id: "s4", name: `correspondence_${c.id}.pdf`, label: "Settlement Correspondence", date: "Oct 16, 2026", summary: `Correspondence log for ${c.name}: statements and follow-ups sent, and replies received from ${c.contact}.` },
  ];
  const sections: Record<string, DocSection[]> = {
    s1: [
      { heading: "Open settlements", body: c.invoices.map((i) => `${i.id}: ${fmt(i.amount, c.currency)}, issued ${i.issued}, due ${i.due}`).join(". ") + "." },
      { heading: "Aging", body: `Current ${fmt(c.current, c.currency)}; 1 to 30 days ${fmt(c.days1to30, c.currency)}; 31 to 60 days ${fmt(c.days31to60, c.currency)}; over 60 days ${fmt(c.over60, c.currency)}. Total open ${fmt(c.openBalance, c.currency)}.` },
    ],
    s2: [
      { heading: "Approved terms", body: `Credit limit ${fmt(c.creditLimit, c.currency)} on ${c.terms} terms. Balances above the limit or past 60 days trigger a credit review under the receivables policy.` },
      { heading: "Account contacts", body: `Customer contact: ${c.contact}. Aurora Ridge account owner: ${c.owner}.` },
    ],
    s3: [
      { heading: "Settlement terms", body: `Settlements are payable ${c.terms.toLowerCase()} from the shipment date. Overdue balances may result in shipments being held until the account is brought current.` },
    ],
    s4: [
      { heading: "Recent correspondence", body: c.id === flagshipCustomerId ? "October 16: assay dispute on lot KR-2098 acknowledged by Angela Ruiz, with the $196,000 held by agreement pending final weights. November 12: settlement of $1,150,000 received against INV-2133. All other lots continue to settle inside terms." : "Settlement statements are issued per shipment. Follow-ups follow the standard sequence, each approved by a person before sending." },
    ],
  };
  return { docs, sections };
}

export function customerAuditFor(c: ArCustomer): ArAuditEvent[] {
  if (c.id === flagshipCustomerId) return seedCustomerAudit;
  const events: ArAuditEvent[] = [
    { time: "Nov 16, 09:48", actor: "Alfie", actorType: "Alfie", action: "Settlement assessment updated", source: "Aging and settlement history", approval: "Not required", next: c.status === "Credit Hold Recommended" ? "Shipment hold recommended" : c.status === "On Hold" ? "Final demand recommended" : "Monitoring" },
    { time: "Nov 14, 15:02", actor: "Alfie", actorType: "Alfie", action: "Statement of account prepared", source: "Open settlements at Nov 14", approval: "Not required", next: "Ready for review" },
    ...c.payments.slice(0, 2).map((p): ArAuditEvent => ({ time: p.date, actor: "System", actorType: "System", action: "Settlement received", source: "Bank feed", approval: "Not required", next: `${p.appliedTo} settled · ${fmt(p.amount, c.currency)}` })),
  ];
  if (c.status === "On Hold") events.splice(1, 0, { time: "Oct 6, 11:30", actor: "Nadia Hassan", actorType: "User", action: "Shipment hold placed", source: "Credit review", approval: "Approved", prev: "Watch", next: "On Hold" });
  return events;
}

export function customerReplyFor(q: string, fileNames: readonly string[], c: ArCustomer): { reply: CustomerReply; actions: string[] } {
  const p = q.toLowerCase();
  const overdue = c.invoices.filter((i) => i.status === "Overdue");
  if (fileNames.length) return { reply: { intro: `I reviewed the ${fileNames.length === 1 ? "uploaded file" : `${fileNames.length} uploaded files`} against this customer account. Nothing in it changes the open balance or aging.`, note: "Uploaded files are used in this conversation only and have not been added to the customer record.", sources: [...fileNames] }, actions: ["Ask Follow-up"] };
  if (p.includes("draft") || p.includes("collection note") || p.includes("reminder")) return { reply: { intro: `Draft note to ${c.contact}, for your review before sending:`, draft: collectionDraftFor(c), note: "Nothing has been sent. Sending requires your approval, and the sent note is logged to the account history.", sources: ["Open settlements", "Correspondence log"] }, actions: ["Approve and Send Reminder", "Ask Follow-up"] };
  if (p.includes("overdue")) return { reply: { intro: overdue.length ? `${overdue.length} settlement${overdue.length === 1 ? " is" : "s are"} past due on this account:` : "No settlements are past due on this account.", fields: overdue.map((i) => [i.id, `${fmt(i.amount, c.currency)} · due ${i.due} · ${i.ageDays} days old`] as [string, string]), verdict: overdue.length ? `${fmt(overdue.reduce((s, i) => s + i.amount, 0), c.currency)} is past due of the ${fmt(c.openBalance, c.currency)} open balance.` : "The account is current.", confidence: "High", sources: ["Open settlements"] }, actions: ["Draft a collection note.", "Ask Follow-up"] };
  if (p.includes("credit") || p.includes("hold")) return { reply: { intro: "Credit assessment for this account:", fields: [["Open balance", fmt(c.openBalance, c.currency)], ["Credit limit", fmt(c.creditLimit, c.currency)], ["Utilization", `${Math.round((c.openBalance / c.creditLimit) * 100)}%`], ["Over 60 days", fmt(c.over60, c.currency)], ["Oldest invoice", `${c.oldestInvoiceDays} days`]], note: c.creditNote, verdict: c.status === "Credit Hold Recommended" ? "Place the account on shipment hold." : c.status === "On Hold" ? "Hold already in place. Escalate with a final demand." : "No shipment hold recommended at this time.", confidence: "High", sources: ["Credit file", "Aging"] }, actions: c.status === "Credit Hold Recommended" ? ["Place Credit Hold", "Ask Follow-up"] : ["Ask Follow-up"] };
  if (p.includes("behaviour") || p.includes("behavior") || p.includes("paid") || p.includes("payment")) return { reply: { intro: "Recent settlement behaviour:", fields: c.payments.map((pay) => [pay.date, `${fmt(pay.amount, c.currency)} · ${pay.appliedTo} · ${pay.note}`] as [string, string]), note: c.id === flagshipCustomerId ? "Settlement timing is drawn from the bank feed matched to lots. The only exception is lot KR-2098, held under the assay dispute." : "Settlement timing is drawn from the bank feed matched to lots.", confidence: "High", sources: ["Settlement history", "Bank feed"] }, actions: ["Ask Follow-up"] };
  if (p.includes("statement")) return { reply: { intro: "The November statement of account is ready in Documents.", fields: [["Open balance", fmt(c.openBalance, c.currency)], ["Settlements listed", `${c.invoices.length}`], ["Prepared", "November 14, 2026"]], note: "Review it in the Documents tab. Sending it to the customer is a separate, approved step.", sources: ["Statement of account"] }, actions: ["Review Documents", "Ask Follow-up"] };
  return { reply: assessmentFor(c), actions: ["Draft a collection note.", "Recommend a credit action.", "Ask Follow-up"] };
}
