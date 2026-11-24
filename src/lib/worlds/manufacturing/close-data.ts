// Illustrative sample data for the Close module. Figures follow
// INDUSTRY_BRIEFS.md and are consistent with the Accounting,
// Reconciliations and Planning data for the manufacturing workspace.

import type { CloseGroup, CloseTask, EntityCloseStatus } from "@/lib/worlds/enterprise/close-data";

export const closeGroups: readonly CloseGroup[] = [
  "Subledgers",
  "Reconciliations",
  "Accruals and estimates",
  "Consolidation",
  "Reporting",
];

export const closePeriod = {
  period: "November 2026",
  status: "In progress, plant subledgers underway",
  target: "Close by Dec 9, 2026, inside the 8 business day target",
  note: "Subledger cutoffs start Nov 28. Two items need attention: the Plex MES feed at Plant 2 has been stale for 2 days, and the Plant 3 inventory count is scheduled late in the window.",
};

export const closeTasks: CloseTask[] = [
  // Subledgers (12)
  { id: "C-01", group: "Subledgers", task: "AP subledger roll-forward and open item review", owner: "Kevin Doyle", entity: "Group", due: "Nov 20", status: "Complete", approval: "Approved" },
  { id: "C-02", group: "Subledgers", task: "AP subledger to GL tie-out", owner: "Kevin Doyle", entity: "Group", due: "Nov 21", status: "Complete", approval: "Approved" },
  { id: "C-03", group: "Subledgers", task: "AR subledger roll-forward", owner: "Lucas Meyer", entity: "Group", due: "Nov 20", status: "Complete", approval: "Approved" },
  { id: "C-04", group: "Subledgers", task: "AR subledger to GL tie-out", owner: "Lucas Meyer", entity: "Group", due: "Nov 21", status: "Complete", approval: "Approved" },
  { id: "C-05", group: "Subledgers", task: "Fixed asset additions, disposals and transfers", owner: "Anita Roy", entity: "Plant 1", due: "Nov 21", status: "Complete", approval: "Approved" },
  { id: "C-06", group: "Subledgers", task: "Depreciation run, November (JE-2026-1146)", owner: "Anita Roy", entity: "Group", due: "Nov 20", status: "Complete", approval: "Approved" },
  { id: "C-07", group: "Subledgers", task: "Prepaid expense schedule roll-forward (JE-2026-1144)", owner: "Lucas Meyer", entity: "Group", due: "Nov 19", status: "Complete", approval: "Approved" },
  { id: "C-08", group: "Subledgers", task: "GRNI clearing review, all plants", owner: "Kevin Doyle", entity: "Group", due: "Nov 24", status: "Complete", approval: "Approved", note: "A $47,300 clearing difference is carried in Reconciliations." },
  { id: "C-09", group: "Subledgers", task: "Inventory count, Plant 1 Guelph", owner: "Anita Roy", entity: "Plant 1", due: "Nov 27", status: "In Progress", approval: "Not submitted" },
  { id: "C-10", group: "Subledgers", task: "Inventory count, Plant 2 Drummondville", owner: "Lucas Meyer", entity: "Plant 2", due: "Nov 27", status: "In Progress", approval: "Not submitted", note: "Plex MES feed is stale by 2 days, see Data Sources." },
  { id: "C-11", group: "Subledgers", task: "Inventory count, Plant 3 Fort Wayne", owner: "Lucas Meyer", entity: "Plant 3", due: "Nov 28", status: "Not Started", approval: "Not submitted" },
  { id: "C-12", group: "Subledgers", task: "Payroll subledger cutoff, Nov 28", owner: "Kevin Doyle", entity: "Group", due: "Nov 28", status: "Not Started", approval: "Not submitted" },
  // Reconciliations (13)
  { id: "C-13", group: "Reconciliations", task: "TD Operating CAD reconciliation", owner: "Mark Feldman", entity: "Plant 1", due: "Nov 19", status: "Complete", approval: "Approved" },
  { id: "C-14", group: "Reconciliations", task: "RBC Payroll reconciliation", owner: "Mark Feldman", entity: "Group", due: "Nov 19", status: "Complete", approval: "Approved" },
  { id: "C-15", group: "Reconciliations", task: "TD Money Market reconciliation", owner: "Mark Feldman", entity: "Group", due: "Nov 19", status: "Complete", approval: "Approved" },
  { id: "C-16", group: "Reconciliations", task: "Fixed assets control reconciliation", owner: "Anita Roy", entity: "Group", due: "Nov 20", status: "Complete", approval: "Approved" },
  { id: "C-17", group: "Reconciliations", task: "TD USD account reconciliation", owner: "Mark Feldman", entity: "Plant 1", due: "Nov 25", status: "In Progress", approval: "Pending" },
  { id: "C-18", group: "Reconciliations", task: "Chase US Operating reconciliation", owner: "Mark Feldman", entity: "Plant 3", due: "Nov 25", status: "In Progress", approval: "Pending" },
  { id: "C-19", group: "Reconciliations", task: "GRNI clearing reconciliation", owner: "Kevin Doyle", entity: "Group", due: "Nov 25", status: "Blocked", approval: "Pending", note: "Difference of $47,300 under review in Reconciliations." },
  { id: "C-20", group: "Reconciliations", task: "Payroll clearing reconciliation, Plant 2", owner: "Lucas Meyer", entity: "Plant 2", due: "Nov 25", status: "Blocked", approval: "Pending", note: "Plant 2 payroll feed is lagging with the Plex MES sync." },
  { id: "C-21", group: "Reconciliations", task: "AR control account reconciliation", owner: "Lucas Meyer", entity: "Group", due: "Nov 26", status: "In Progress", approval: "Pending" },
  { id: "C-22", group: "Reconciliations", task: "AP control account reconciliation", owner: "Kevin Doyle", entity: "Group", due: "Nov 26", status: "Not Started", approval: "Not submitted" },
  { id: "C-23", group: "Reconciliations", task: "Inventory control reconciliation", owner: "Anita Roy", entity: "Plant 1", due: "Nov 27", status: "Not Started", approval: "Not submitted" },
  { id: "C-24", group: "Reconciliations", task: "Intercompany accounts reconciliation", owner: "Priya Nair", entity: "Group", due: "Nov 27", status: "In Progress", approval: "Pending" },
  { id: "C-25", group: "Reconciliations", task: "GST/HST and QST payable reconciliations", owner: "Lucas Meyer", entity: "Group", due: "Nov 27", status: "Not Started", approval: "Not submitted" },
  // Accruals and estimates (11)
  { id: "C-26", group: "Accruals and estimates", task: "Payroll accrual prepared (JE-2026-1150)", owner: "Lucas Meyer", entity: "Group", due: "Nov 20", status: "Complete", approval: "Approved" },
  { id: "C-27", group: "Accruals and estimates", task: "Standard cost variance review, Series 400 (JE-2026-1142)", owner: "Priya Nair", entity: "Plant 1", due: "Nov 21", status: "Complete", approval: "Approved" },
  { id: "C-28", group: "Accruals and estimates", task: "USD balance revaluation, November", owner: "Priya Nair", entity: "Group", due: "Nov 26", status: "In Progress", approval: "Pending" },
  { id: "C-29", group: "Accruals and estimates", task: "Inventory obsolescence provision", owner: "Priya Nair", entity: "Group", due: "Nov 27", status: "Not Started", approval: "Not submitted" },
  { id: "C-30", group: "Accruals and estimates", task: "Warranty provision review", owner: "Anita Roy", entity: "Plant 1", due: "Nov 27", status: "Not Started", approval: "Not submitted" },
  { id: "C-31", group: "Accruals and estimates", task: "Bad debt provision review", owner: "Sarah Mitchell", entity: "Group", due: "Nov 27", status: "Not Started", approval: "Not submitted", note: "AR over 60 days is $688K, including AgriCore Equipment." },
  { id: "C-32", group: "Accruals and estimates", task: "Freight accrual", owner: "Lucas Meyer", entity: "Group", due: "Nov 26", status: "Not Started", approval: "Not submitted" },
  { id: "C-33", group: "Accruals and estimates", task: "Utilities and occupancy accruals", owner: "Lucas Meyer", entity: "Group", due: "Nov 26", status: "Not Started", approval: "Not submitted" },
  { id: "C-34", group: "Accruals and estimates", task: "Bonus accrual update", owner: "Sarah Mitchell", entity: "Group", due: "Nov 26", status: "In Progress", approval: "Pending" },
  { id: "C-35", group: "Accruals and estimates", task: "Interest accrual, term and equipment loans", owner: "Mark Feldman", entity: "Group", due: "Nov 26", status: "Not Started", approval: "Not submitted" },
  { id: "C-36", group: "Accruals and estimates", task: "Income tax provision draft", owner: "Sarah Mitchell", entity: "Group", due: "Dec 2", status: "Not Started", approval: "Not submitted" },
  // Consolidation (10)
  { id: "C-37", group: "Consolidation", task: "Plant trial balance imports", owner: "Priya Nair", entity: "Group", due: "Nov 24", status: "Complete", approval: "Approved" },
  { id: "C-38", group: "Consolidation", task: "Intercompany eliminations", owner: "Priya Nair", entity: "Group", due: "Dec 1", status: "In Progress", approval: "Pending" },
  { id: "C-39", group: "Consolidation", task: "FX translation, Plant 3 USD to CAD", owner: "Priya Nair", entity: "Plant 3", due: "Dec 1", status: "Not Started", approval: "Not submitted" },
  { id: "C-40", group: "Consolidation", task: "Investment in subsidiaries elimination", owner: "Priya Nair", entity: "Group", due: "Dec 2", status: "Not Started", approval: "Not submitted" },
  { id: "C-41", group: "Consolidation", task: "Consolidated revenue agreement to plants", owner: "Julia Santos", entity: "Group", due: "Dec 2", status: "Not Started", approval: "Not submitted" },
  { id: "C-42", group: "Consolidation", task: "Consolidated balance sheet review", owner: "Priya Nair", entity: "Group", due: "Dec 3", status: "Not Started", approval: "Not submitted" },
  { id: "C-43", group: "Consolidation", task: "Consolidated cash flow statement draft", owner: "Mark Feldman", entity: "Group", due: "Dec 3", status: "Not Started", approval: "Not submitted" },
  { id: "C-44", group: "Consolidation", task: "Plant segment reporting pack", owner: "Julia Santos", entity: "Group", due: "Dec 4", status: "Not Started", approval: "Not submitted" },
  { id: "C-45", group: "Consolidation", task: "Consolidation adjustments review", owner: "Sarah Mitchell", entity: "Group", due: "Dec 4", status: "Not Started", approval: "Not submitted" },
  { id: "C-46", group: "Consolidation", task: "Group trial balance sign-off", owner: "Priya Nair", entity: "Group", due: "Dec 4", status: "Not Started", approval: "Not submitted" },
  // Reporting (12)
  { id: "C-47", group: "Reporting", task: "Board pack outline and KPI definitions", owner: "Julia Santos", entity: "Group", due: "Nov 25", status: "In Progress", approval: "Pending" },
  { id: "C-48", group: "Reporting", task: "Covenant calculation, fixed charge coverage", owner: "Mark Feldman", entity: "Group", due: "Nov 26", status: "In Progress", approval: "Pending", note: "Fixed charge coverage 1.32x against a 1.20x minimum, see Treasury." },
  { id: "C-49", group: "Reporting", task: "November board pack draft", owner: "Julia Santos", entity: "Group", due: "Dec 5", status: "Not Started", approval: "Not submitted" },
  { id: "C-50", group: "Reporting", task: "Lender compliance certificate draft", owner: "Mark Feldman", entity: "Group", due: "Dec 5", status: "Not Started", approval: "Not submitted" },
  { id: "C-51", group: "Reporting", task: "Plant financial statements, Plant 1", owner: "Anita Roy", entity: "Plant 1", due: "Dec 4", status: "Not Started", approval: "Not submitted" },
  { id: "C-52", group: "Reporting", task: "Plant financial statements, Plant 2", owner: "Lucas Meyer", entity: "Plant 2", due: "Dec 4", status: "Not Started", approval: "Not submitted" },
  { id: "C-53", group: "Reporting", task: "Plant financial statements, Plant 3", owner: "Lucas Meyer", entity: "Plant 3", due: "Dec 4", status: "Not Started", approval: "Not submitted" },
  { id: "C-54", group: "Reporting", task: "Variance commentary, budget vs actual", owner: "Julia Santos", entity: "Group", due: "Dec 5", status: "Not Started", approval: "Not submitted", note: "Steel cost is the largest margin driver, see Planning." },
  { id: "C-55", group: "Reporting", task: "Audit PBC list update", owner: "Lucas Meyer", entity: "Group", due: "Dec 5", status: "Not Started", approval: "Not submitted" },
  { id: "C-56", group: "Reporting", task: "Disclosure checklist", owner: "Sarah Mitchell", entity: "Group", due: "Dec 7", status: "Not Started", approval: "Not submitted" },
  { id: "C-57", group: "Reporting", task: "CFO review of draft statements", owner: "David Osei", entity: "Group", due: "Dec 7", status: "Not Started", approval: "Not submitted" },
  { id: "C-58", group: "Reporting", task: "Period lock and close sign-off", owner: "Sarah Mitchell", entity: "Group", due: "Dec 9", status: "Not Started", approval: "Not submitted" },
];

export const entityCloseStatus: EntityCloseStatus[] = [
  {
    entity: "Northline Precision Inc.",
    detail: "Guelph, Ontario, Plant 1, CAD",
    owner: "Anita Roy",
    complete: 7,
    total: 24,
    status: "In Progress",
    note: "Subledgers are ahead of schedule. The inventory count and the inventory control reconciliation are the long items.",
  },
  {
    entity: "Northline Fabrication Ltée",
    detail: "Drummondville, Quebec, Plant 2, CAD",
    owner: "Lucas Meyer",
    complete: 4,
    total: 16,
    status: "In Progress",
    note: "The Plex MES sync is stale by 2 days, which holds up the inventory count and the payroll clearing reconciliation.",
  },
  {
    entity: "Northline Assembly Inc.",
    detail: "Fort Wayne, Indiana, Plant 3, USD",
    owner: "Lucas Meyer",
    complete: 4,
    total: 18,
    status: "In Progress",
    note: "Bank reconciliation is under way. FX translation starts once eliminations are agreed, and the plant is still closing on Sage 300 ahead of the Epicor migration.",
  },
];

export const octoberClose = {
  period: "October 2026",
  closedIn: "Closed in 7 business days",
  target: "8 business day target",
  closedOn: "Nov 10, 2026",
  note: "October closed one day ahead of target. One post-close adjustment remains open and is tracked below; closed periods are not silently modified, so the correction is prepared as a new entry against October with its own approvals.",
};

export const postCloseAdjustment = {
  entryId: "JE-2026-1142",
  title: "Standard cost true-up, Series 400 gear housings, October",
  amount: "$318,000",
  status: "Awaiting approval",
  detail:
    "October material variance on the Series 400 family was $212,000 unfavourable, driven by steel at $1,186 per tonne against a $1,040 standard and Line 3 scrap at 3.4 percent against 2.1 percent. Alfie traced the carrying effect and prepared JE-2026-1142 to true up October COGS and inventory by $318,000.",
  approvals:
    "Needs Controller review and CFO approval, because it is above the $10,000 post-close adjustment threshold.",
  preparedBy: "Prepared by Alfie, from the cost accounting review",
};

export const closeRoles = [
  {
    role: "Cost Accountant",
    desc: "Maintains standard costs, prepares variance analysis and supporting schedules, and drafts journal entries. Cannot post entries or approve their own work.",
  },
  {
    role: "Plant Controller",
    desc: "Owns the plant close calendar, reviews plant reconciliations and inventory counts, and signs off plant trial balances for consolidation.",
  },
  {
    role: "AP / AR Specialist",
    desc: "Owns subledger cutoffs for payables and receivables and prepares tie-outs. Cannot approve payments beyond configured authority.",
  },
  {
    role: "Controller",
    desc: "Reviews close tasks, reconciliations and journal entries, approves post-close adjustments jointly with the CFO above $10,000, and owns the consolidation.",
  },
  {
    role: "VP Finance",
    desc: "Owns the group close calendar, reviews plant and group reporting, and records the period lock once every task is complete and signed off.",
  },
  {
    role: "CFO",
    desc: "Approves material post-close adjustments and the final financial statements, and reviews covenant compliance before the lender certificate is issued.",
  },
] as const;

// Route content for the Close page header. World-specific narrative lives
// here so the route stays world-agnostic.
export const closeDescription =
  "Month end close for Northline Group, managed as a controlled process with owners, due dates, approvals and reconciliation status across all three plants.";
