import type { DocSection } from "@/components/document-view";
import type { Invoice, ModuleSeat, UsageItem } from "@/lib/worlds/enterprise/billing-data";

export type { Invoice, ModuleSeat, UsageItem };

/**
 * Billing for the organization's own Alfie subscription: plan, module
 * seats, usage, payment method and invoices. This is platform billing
 * (what Aurora Ridge pays Alfie), not customer invoicing or vendor
 * payments, which live in Receivables and Payables. Figures follow the
 * published module pricing and are sample records until the payment
 * provider is connected.
 */

export const plan = {
  name: "Alfie Enterprise Finance",
  term: "Annual contract, billed monthly",
  planYear: "Nov 1, 2026 to Oct 31, 2027",
  renews: "Nov 1, 2027",
  platformFeeMonthly: 3500,
  platformFeeNote: "Platform fee $42,000 per year",
  nextInvoiceDate: "Dec 1, 2026",
  nextInvoiceEstimate: 12864,
};

export const moduleSeats: ModuleSeat[] = [
  { module: "Accounting & Close", pricePerSeat: 299, active: 10, licensed: 12 },
  { module: "Payables & Receivables", pricePerSeat: 199, active: 14, licensed: 16 },
  { module: "Planning & FP&A", pricePerSeat: 399, active: 7, licensed: 8 },
  { module: "Treasury", pricePerSeat: 249, active: 7, licensed: 8 },
  { module: "Capital Projects & Royalties", pricePerSeat: 319, active: 8, licensed: 10 },
  { module: "Reports", pricePerSeat: null, active: 42, licensed: 50 },
];

export const moduleMonthly = (m: ModuleSeat) =>
  m.pricePerSeat === null ? 0 : m.pricePerSeat * m.active;

export const modulesMonthlyTotal = moduleSeats.reduce((sum, m) => sum + moduleMonthly(m), 0);
export const monthlyTotal = modulesMonthlyTotal + plan.platformFeeMonthly;
export const activeSeats = moduleSeats
  .filter((m) => m.pricePerSeat !== null)
  .reduce((sum, m) => sum + m.active, 0);
export const licensedSeats = moduleSeats
  .filter((m) => m.pricePerSeat !== null)
  .reduce((sum, m) => sum + m.licensed, 0);

export const usageThisPeriod: UsageItem[] = [
  {
    label: "Alfie analyses",
    used: "5,930",
    detail: "Analyses run Nov 1 to Nov 15 across Accounting, Payables, Receivables, Planning and Capital Projects. No per-analysis charge on this plan.",
    pct: 100,
  },
  {
    label: "Documents processed",
    used: "2,940",
    detail: "Of 5,000 documents included each month. Processing beyond the allowance is billed at $1.25 per document on the next invoice.",
    pct: 59,
  },
  {
    label: "Automation runs",
    used: "1,412",
    detail: "Scheduled and triggered automations executed this period, including bill processing, daily bank reconciliation and the JV statement reconciliation.",
    pct: 100,
  },
];

export const paymentMethod = {
  brand: "American Express",
  last4: "3005",
  expiry: "11 / 2028",
  holder: "Aurora Ridge Resources Inc.",
  contactName: "Angela Ruiz",
  contactRole: "Treasurer",
  contactEmail: "billing@auroraridge.com",
  address: "390 Bay Street, Suite 2400, Toronto, ON M5H 2Y2",
};

export const invoices: Invoice[] = [
  {
    id: "INV-2026-0118",
    date: "Nov 1, 2026",
    period: "November 2026",
    amount: 16364,
    status: "Paid",
    note: "Paid Nov 3, 2026 on the card ending 3005.",
  },
  {
    id: "INV-2026-0104",
    date: "Oct 1, 2026",
    period: "October 2026",
    amount: 16632,
    status: "Paid",
    note: "Includes $268 of document processing above the included allowance (214 documents at $1.25). Paid Oct 3, 2026.",
  },
  {
    id: "INV-2026-0091",
    date: "Sep 1, 2026",
    period: "September 2026",
    amount: 16364,
    status: "Paid",
    note: "Paid Sep 3, 2026 on the card ending 3005.",
  },
  {
    id: "INV-2026-0077",
    date: "Aug 1, 2026",
    period: "August 2026",
    amount: 15866,
    status: "Paid",
    note: "Lower than the standard month: Treasury ran 5 active seats in August, increased to 7 from September. Paid Aug 4, 2026.",
  },
];

export const invoiceSummary = (inv: Invoice) =>
  `Invoice ${inv.id} for the ${inv.period} billing period. Total $${inv.amount.toLocaleString()} USD, status ${inv.status.toLowerCase()}. ${inv.note}`;

export const invoiceSections = (inv: Invoice): DocSection[] => [
  {
    heading: "Charges",
    body: `Platform fee $${plan.platformFeeMonthly.toLocaleString()}. Module seats $${modulesMonthlyTotal.toLocaleString()} at the seat counts and rates on the Billing page (Accounting & Close $299, Payables & Receivables $199, Planning & FP&A $399, Treasury $249, Capital Projects & Royalties $319 per user per month; Reports bundled).${inv.id === "INV-2026-0104" ? " Document processing overage $268." : ""}${inv.id === "INV-2026-0077" ? " Module seats reflect August counts, before the Treasury seat increase." : ""} Total $${inv.amount.toLocaleString()}.`,
  },
  {
    heading: "Bill to",
    body: `${paymentMethod.holder}, ${paymentMethod.address}. Billing contact: ${paymentMethod.contactName}, ${paymentMethod.contactRole}, ${paymentMethod.contactEmail}. All amounts in USD. Taxes, where applicable, are calculated by the payment provider and shown on the remittance copy.`,
  },
  {
    heading: "Payment",
    body:
      inv.status === "Paid"
        ? `Paid on the ${paymentMethod.brand} card ending ${paymentMethod.last4}. The charge appears as ALFIE PLATFORM on the card statement.`
        : `Scheduled to charge the ${paymentMethod.brand} card ending ${paymentMethod.last4} on ${inv.date}.`,
  },
];
