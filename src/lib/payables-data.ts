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
