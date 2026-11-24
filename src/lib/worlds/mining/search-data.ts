import type { SearchEntry, SearchLink } from "@/lib/worlds/enterprise/search-data";

export type { SearchEntry, SearchLink };

/**
 * The global search index. Entries are defined alongside the module
 * data they point to, so a result always matches what the destination
 * page shows. Search runs entirely in the browser over this index
 * (frontend only, no backend yet). This file is self-contained: it
 * imports nothing from the module data files.
 */

const pages: SearchEntry[] = [
  { title: "Home", kind: "Page", detail: "Your queue, recent files and activity", link: { to: "/" } },
  { title: "Accounting", kind: "Page", detail: "Journal entry queue and entry files", link: { to: "/accounting" } },
  { title: "Close", kind: "Page", detail: "Close checklist, site status and sign-off", link: { to: "/close" } },
  { title: "Reconciliations", kind: "Page", detail: "Account reconciliations and the exceptions queue", link: { to: "/reconciliations" } },
  { title: "Payables", kind: "Page", detail: "Vendor bill queue and bill files", link: { to: "/payables" } },
  { title: "Receivables", kind: "Page", detail: "Refinery settlements, aging and collections", link: { to: "/receivables" } },
  { title: "Planning & FP&A", kind: "Page", detail: "Budget vs actual, forecast reviews and scenarios", link: { to: "/planning" } },
  { title: "Treasury", kind: "Page", detail: "Bank balances, 13 week cash forecast, covenants and hedging", link: { to: "/treasury" } },
  { title: "Reports", kind: "Page", detail: "KPIs, report library, builder and schedules", link: { to: "/reports" } },
  { title: "Chats", kind: "Page", detail: "Conversations with Alfie", link: { to: "/chats" } },
  { title: "Documents", kind: "Page", detail: "The governed document library", link: { to: "/documents" } },
  { title: "Data Sources", kind: "Page", detail: "Connected systems, sync health and access levels", link: { to: "/data-sources" } },
  { title: "Migration", kind: "Page", detail: "Move site data onto the group ledger from previous systems", link: { to: "/migration" } },
  { title: "Automations", kind: "Page", detail: "Automation runs, approvals and schedules", link: { to: "/automations" } },
  { title: "Agents", kind: "Page", detail: "Alfie agents, builder and tests", link: { to: "/agents" } },
  { title: "Users & Access", kind: "Page", detail: "People, roles and access reviews", link: { to: "/users" } },
  { title: "Policies & Permissions", kind: "Page", detail: "Permission matrix, approval thresholds and separation of duties", link: { to: "/permissions" } },
  { title: "Billing", kind: "Page", detail: "Plan, module seats, usage, payment method and invoices", link: { to: "/billing" } },
  { title: "Settings", kind: "Page", detail: "Organization configuration, retention and audit log", link: { to: "/settings" } },
  { title: "Onboarding", kind: "Page", detail: "Setup checklist and go-live plan for this workspace", link: { to: "/onboarding" } },
  { title: "Profile", kind: "Page", detail: "Your details, security and recent activity", link: { to: "/profile" } },
  { title: "Preferences", kind: "Page", detail: "Appearance, notifications and workspace defaults", link: { to: "/preferences" } },
  { title: "Help", kind: "Page", detail: "Guides, support and system status", link: { to: "/help" } },
];

const journalEntries: { id: string; title: string; detail: string }[] = [
  { id: "JE-2026-0874", title: "Copperline JV accrual correction", detail: "Post-close adjustment · $253,500 · Awaiting CFO approval" },
  { id: "JE-2026-0876", title: "Mobile fleet depreciation", detail: "Fixed assets · $1,240,000 · In review" },
  { id: "JE-2026-0878", title: "Asset retirement obligation accretion", detail: "Reclamation provision · $412,000 · In review" },
  { id: "JE-2026-0880", title: "Stockpile survey adjustment", detail: "Inventory · $286,000 · In review" },
  { id: "JE-2026-0882", title: "Payroll accrual, November", detail: "Group payroll · $892,000 · Draft" },
];

const bills: { id: string; vendor: string; detail: string }[] = [
  { id: "BILL-5108", vendor: "Summit Drilling Ltd.", detail: "$386,200 · Quantity variance against the survey record · Awaiting VP Finance approval" },
  { id: "BILL-5113", vendor: "Northern Explosives Ltd.", detail: "$42,680 · Held by Alfie as a duplicate of BILL-5102" },
  { id: "BILL-5102", vendor: "Northern Explosives Ltd.", detail: "$42,680 · Invoice NE-8841 · Approved" },
];

const customers: { id: string; name: string; detail: string }[] = [
  { id: "Cascade Refining Corp.", name: "Cascade Refining Corp.", detail: "$2,840,000 open · One lot of $196,000 over 60 days under an assay dispute" },
  { id: "Desert Sage Trading", name: "Desert Sage Trading", detail: "Shipment hold recommended by Alfie · $412,000 open against a $250,000 limit" },
  { id: "Great Basin Bullion LLC", name: "Great Basin Bullion LLC", detail: "$618,000 open · Within terms" },
  { id: "Northern Mint and Refining", name: "Northern Mint and Refining", detail: "$284,500 open · Within terms" },
];

const documents: { id: string; name: string; detail: string }[] = [
  { id: "DOC-1042", name: "November 2026 Board Pack", detail: "DOC-1042 · Board & Executive · Finance" },
  { id: "DOC-1038", name: "Copperline Project Facility Agreement 2025", detail: "DOC-1038 · Contracts · Treasury" },
  { id: "DOC-1031", name: "Accounting Policies Manual", detail: "DOC-1031 · Procedures · Accounting" },
  { id: "DOC-1027", name: "Audit Engagement Letter 2026", detail: "DOC-1027 · Audit · Finance" },
  { id: "DOC-1012", name: "Q3 2026 Lender Compliance Certificate", detail: "DOC-1012 · Treasury · Treasury" },
];

const reports: { id: string; name: string; detail: string }[] = [
  { id: "RPT-301", name: "November Board Pack", detail: "RPT-301 · Executive · Oct 2026" },
  { id: "RPT-302", name: "Lender Compliance Package", detail: "RPT-302 · Treasury · Q3 2026" },
  { id: "RPT-303", name: "Audit PBC List", detail: "RPT-303 · Audit · FY2026" },
  { id: "RPT-310", name: "Copperline JV Statement Review", detail: "RPT-310 · Finance · Oct 2026" },
];

export const searchIndex: SearchEntry[] = [
  ...pages,
  ...journalEntries.map((e) => ({
    title: `${e.id} · ${e.title}`,
    kind: "Journal entry" as const,
    detail: e.detail,
    link: { to: "/accounting/$entryId" as const, params: { entryId: e.id } },
  })),
  ...bills.map((b) => ({
    title: `${b.id} · ${b.vendor}`,
    kind: "Bill" as const,
    detail: b.detail,
    link: { to: "/payables/$billId" as const, params: { billId: b.id } },
  })),
  ...customers.map((c) => ({
    title: c.name,
    kind: "Customer" as const,
    detail: c.detail,
    link: { to: "/receivables/$customerId" as const, params: { customerId: c.id } },
  })),
  ...documents.map((d) => ({
    title: d.name,
    kind: "Document" as const,
    detail: d.detail,
    link: { to: "/documents" as const },
  })),
  ...reports.map((r) => ({
    title: r.name,
    kind: "Report" as const,
    detail: r.detail,
    link: { to: "/reports" as const },
  })),
];

export function searchEntries(query: string, limit = 8): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return searchIndex
    .filter((e) => {
      const hay = `${e.title} ${e.kind} ${e.detail}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    })
    .slice(0, limit);
}
