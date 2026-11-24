// Illustrative sample data for the Close module. Figures follow
// INDUSTRY_BRIEFS.md and are consistent with the Accounting,
// Reconciliations and Planning data for the mining workspace.

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
  status: "In progress, site subledgers underway",
  target: "Close by Dec 11, 2026, inside the 10 business day target",
  note: "Subledger cutoffs start Nov 28. Three items need attention: the ADP payroll sync is stale by 4 days, the Sagebrush books are still on Sage 300 with an expired connection, and the November stockpile surveys land late in the window.",
};

export const closeTasks: CloseTask[] = [
  // Subledgers (15)
  { id: "C-01", group: "Subledgers", task: "AP subledger roll-forward and open item review", owner: "Susan Park", entity: "Group", due: "Nov 20", status: "Complete", approval: "Approved" },
  { id: "C-02", group: "Subledgers", task: "AP subledger to GL tie-out", owner: "Susan Park", entity: "Group", due: "Nov 21", status: "Complete", approval: "Approved" },
  { id: "C-03", group: "Subledgers", task: "AR subledger roll-forward, refinery settlements", owner: "Peter Lindqvist", entity: "Group", due: "Nov 20", status: "Complete", approval: "Approved" },
  { id: "C-04", group: "Subledgers", task: "AR subledger to GL tie-out", owner: "Peter Lindqvist", entity: "Group", due: "Nov 21", status: "Complete", approval: "Approved" },
  { id: "C-05", group: "Subledgers", task: "Fixed asset additions, disposals and transfers", owner: "Peter Lindqvist", entity: "Group", due: "Nov 21", status: "Complete", approval: "Approved" },
  { id: "C-06", group: "Subledgers", task: "Mobile fleet depreciation run, November", owner: "Peter Lindqvist", entity: "Group", due: "Nov 20", status: "In Progress", approval: "Not submitted" },
  { id: "C-07", group: "Subledgers", task: "Capital project cost roll-forward, Copperline", owner: "Nadia Hassan", entity: "Copperline JV", due: "Nov 24", status: "In Progress", approval: "Not submitted" },
  { id: "C-08", group: "Subledgers", task: "Capital project cost roll-forward, Keno Ridge tailings", owner: "Peter Lindqvist", entity: "Keno Ridge", due: "Nov 24", status: "In Progress", approval: "Not submitted" },
  { id: "C-09", group: "Subledgers", task: "Stockpile survey, Keno Ridge", owner: "Peter Lindqvist", entity: "Keno Ridge", due: "Nov 27", status: "In Progress", approval: "Not submitted", note: "October survey difference of $94,600 is carried in Reconciliations." },
  { id: "C-10", group: "Subledgers", task: "Stockpile survey, Sagebrush", owner: "Peter Lindqvist", entity: "Sagebrush", due: "Nov 27", status: "Not Started", approval: "Not submitted" },
  { id: "C-11", group: "Subledgers", task: "JV operator statement intake, October", owner: "Nadia Hassan", entity: "Copperline JV", due: "Nov 19", status: "Complete", approval: "Approved" },
  { id: "C-12", group: "Subledgers", task: "Payroll subledger cutoff, Nov 28", owner: "Susan Park", entity: "Group", due: "Nov 28", status: "Not Started", approval: "Not submitted", note: "ADP sync is stale by 4 days, see Data Sources." },
  { id: "C-13", group: "Subledgers", task: "Fuel and consumables inventory listing", owner: "Peter Lindqvist", entity: "Group", due: "Nov 27", status: "Not Started", approval: "Not submitted" },
  { id: "C-14", group: "Subledgers", task: "Refinery in transit listing", owner: "Peter Lindqvist", entity: "Group", due: "Nov 27", status: "Not Started", approval: "Not submitted" },
  { id: "C-15", group: "Subledgers", task: "Subledger access and segregation review", owner: "Claire Dubois", entity: "Group", due: "Dec 1", status: "Not Started", approval: "Not submitted" },
  // Reconciliations (16)
  { id: "C-16", group: "Reconciliations", task: "RBC Operating CAD reconciliation", owner: "Angela Ruiz", entity: "Corporate", due: "Nov 19", status: "Complete", approval: "Approved" },
  { id: "C-17", group: "Reconciliations", task: "RBC Payroll reconciliation", owner: "Angela Ruiz", entity: "Group", due: "Nov 19", status: "Complete", approval: "Approved" },
  { id: "C-18", group: "Reconciliations", task: "RBC Money Market reconciliation", owner: "Angela Ruiz", entity: "Corporate", due: "Nov 19", status: "Complete", approval: "Approved" },
  { id: "C-19", group: "Reconciliations", task: "RBC USD account reconciliation", owner: "Angela Ruiz", entity: "Corporate", due: "Nov 25", status: "In Progress", approval: "Pending" },
  { id: "C-20", group: "Reconciliations", task: "Wells Fargo US Operating reconciliation", owner: "Angela Ruiz", entity: "Sagebrush", due: "Nov 25", status: "In Progress", approval: "Pending" },
  { id: "C-21", group: "Reconciliations", task: "Project facility account reconciliation, Copperline", owner: "Angela Ruiz", entity: "Copperline JV", due: "Nov 25", status: "In Progress", approval: "Pending" },
  { id: "C-22", group: "Reconciliations", task: "Stockpile inventory reconciliation", owner: "Peter Lindqvist", entity: "Keno Ridge", due: "Nov 27", status: "Blocked", approval: "Pending", note: "Difference of $94,600 awaiting the November survey." },
  { id: "C-23", group: "Reconciliations", task: "Fuel card reconciliation, Sagebrush", owner: "Peter Lindqvist", entity: "Sagebrush", due: "Nov 25", status: "Blocked", approval: "Pending", note: "Fuel card feed at Sagebrush is lagging." },
  { id: "C-24", group: "Reconciliations", task: "JV clearing reconciliation, Copperline", owner: "Nadia Hassan", entity: "Copperline JV", due: "Nov 26", status: "In Progress", approval: "Pending", note: "Operator statement correction JE-2026-0874 is in Accounting." },
  { id: "C-25", group: "Reconciliations", task: "AR control account reconciliation", owner: "Peter Lindqvist", entity: "Group", due: "Nov 26", status: "In Progress", approval: "Pending" },
  { id: "C-26", group: "Reconciliations", task: "AP control account reconciliation", owner: "Susan Park", entity: "Group", due: "Nov 26", status: "Not Started", approval: "Not submitted" },
  { id: "C-27", group: "Reconciliations", task: "Fixed assets control reconciliation", owner: "Peter Lindqvist", entity: "Group", due: "Nov 27", status: "Not Started", approval: "Not submitted" },
  { id: "C-28", group: "Reconciliations", task: "Royalty payable reconciliation, Keno Ridge", owner: "Peter Lindqvist", entity: "Keno Ridge", due: "Nov 27", status: "Not Started", approval: "Not submitted" },
  { id: "C-29", group: "Reconciliations", task: "Royalty and Nevada tax reconciliation, Sagebrush", owner: "Peter Lindqvist", entity: "Sagebrush", due: "Nov 27", status: "Not Started", approval: "Not submitted" },
  { id: "C-30", group: "Reconciliations", task: "Hedge clearing reconciliation", owner: "Angela Ruiz", entity: "Corporate", due: "Nov 27", status: "In Progress", approval: "Pending" },
  { id: "C-31", group: "Reconciliations", task: "Accrued liabilities reconciliation", owner: "Nadia Hassan", entity: "Group", due: "Nov 27", status: "Not Started", approval: "Not submitted" },
  // Accruals and estimates (13)
  { id: "C-32", group: "Accruals and estimates", task: "Payroll accrual prepared (JE-2026-0882)", owner: "Peter Lindqvist", entity: "Group", due: "Nov 20", status: "Complete", approval: "Approved" },
  { id: "C-33", group: "Accruals and estimates", task: "ARO accretion posted (JE-2026-0878)", owner: "Peter Lindqvist", entity: "Group", due: "Nov 21", status: "Complete", approval: "Approved" },
  { id: "C-34", group: "Accruals and estimates", task: "JV statement correction reviewed (JE-2026-0874)", owner: "Nadia Hassan", entity: "Copperline JV", due: "Nov 24", status: "In Progress", approval: "Pending" },
  { id: "C-35", group: "Accruals and estimates", task: "Royalty accrual, Keno Ridge NSR", owner: "Peter Lindqvist", entity: "Keno Ridge", due: "Nov 26", status: "In Progress", approval: "Pending" },
  { id: "C-36", group: "Accruals and estimates", task: "Royalty and net proceeds tax accrual, Sagebrush", owner: "Peter Lindqvist", entity: "Sagebrush", due: "Nov 26", status: "Not Started", approval: "Not submitted" },
  { id: "C-37", group: "Accruals and estimates", task: "Stockpile survey adjustment review", owner: "Nadia Hassan", entity: "Keno Ridge", due: "Nov 27", status: "Not Started", approval: "Not submitted" },
  { id: "C-38", group: "Accruals and estimates", task: "Diesel and consumables accrual", owner: "Peter Lindqvist", entity: "Group", due: "Nov 26", status: "Not Started", approval: "Not submitted" },
  { id: "C-39", group: "Accruals and estimates", task: "Contractor accruals, drilling and blasting", owner: "Susan Park", entity: "Group", due: "Nov 26", status: "Not Started", approval: "Not submitted" },
  { id: "C-40", group: "Accruals and estimates", task: "Bonus accrual update", owner: "Claire Dubois", entity: "Group", due: "Nov 26", status: "In Progress", approval: "Pending" },
  { id: "C-41", group: "Accruals and estimates", task: "ARO estimate review, preliminary", owner: "Nadia Hassan", entity: "Group", due: "Dec 2", status: "Not Started", approval: "Not submitted", note: "Full reclamation re-estimate lands with the year-end technical review; the provision stands at $88.7M." },
  { id: "C-42", group: "Accruals and estimates", task: "Interest accrual, project and revolving facilities", owner: "Angela Ruiz", entity: "Group", due: "Nov 26", status: "Not Started", approval: "Not submitted" },
  { id: "C-43", group: "Accruals and estimates", task: "Hedge mark to market, November", owner: "Angela Ruiz", entity: "Corporate", due: "Nov 27", status: "Not Started", approval: "Not submitted" },
  { id: "C-44", group: "Accruals and estimates", task: "Income and mining tax provision draft", owner: "Claire Dubois", entity: "Group", due: "Dec 2", status: "Not Started", approval: "Not submitted" },
  // Consolidation (12)
  { id: "C-45", group: "Consolidation", task: "Entity trial balance imports", owner: "Nadia Hassan", entity: "Group", due: "Nov 24", status: "Complete", approval: "Approved" },
  { id: "C-46", group: "Consolidation", task: "JV equity pickup, Copperline 40 percent", owner: "Nadia Hassan", entity: "Copperline JV", due: "Dec 1", status: "In Progress", approval: "Pending" },
  { id: "C-47", group: "Consolidation", task: "Intercompany eliminations", owner: "Nadia Hassan", entity: "Group", due: "Dec 1", status: "In Progress", approval: "Pending" },
  { id: "C-48", group: "Consolidation", task: "FX translation, Sagebrush USD to CAD", owner: "Nadia Hassan", entity: "Sagebrush", due: "Dec 1", status: "Not Started", approval: "Not submitted" },
  { id: "C-49", group: "Consolidation", task: "Investment in subsidiaries elimination", owner: "Nadia Hassan", entity: "Group", due: "Dec 2", status: "Not Started", approval: "Not submitted" },
  { id: "C-50", group: "Consolidation", task: "Consolidated revenue agreement to sites", owner: "George Mensah", entity: "Group", due: "Dec 2", status: "Not Started", approval: "Not submitted" },
  { id: "C-51", group: "Consolidation", task: "Consolidated balance sheet review", owner: "Nadia Hassan", entity: "Group", due: "Dec 3", status: "Not Started", approval: "Not submitted" },
  { id: "C-52", group: "Consolidation", task: "Consolidated cash flow statement draft", owner: "Angela Ruiz", entity: "Group", due: "Dec 3", status: "Not Started", approval: "Not submitted" },
  { id: "C-53", group: "Consolidation", task: "Site segment reporting pack", owner: "George Mensah", entity: "Group", due: "Dec 4", status: "Not Started", approval: "Not submitted" },
  { id: "C-54", group: "Consolidation", task: "Production and AISC statistics pack", owner: "George Mensah", entity: "Group", due: "Dec 4", status: "Not Started", approval: "Not submitted" },
  { id: "C-55", group: "Consolidation", task: "Consolidation adjustments review", owner: "Claire Dubois", entity: "Group", due: "Dec 4", status: "Not Started", approval: "Not submitted" },
  { id: "C-56", group: "Consolidation", task: "Group trial balance sign-off", owner: "Nadia Hassan", entity: "Group", due: "Dec 4", status: "Not Started", approval: "Not submitted" },
  // Reporting (15)
  { id: "C-57", group: "Reporting", task: "Board pack outline and KPI definitions", owner: "George Mensah", entity: "Group", due: "Nov 25", status: "In Progress", approval: "Pending" },
  { id: "C-58", group: "Reporting", task: "Covenant calculation, total debt to EBITDA", owner: "Angela Ruiz", entity: "Group", due: "Nov 26", status: "In Progress", approval: "Pending", note: "Total debt to EBITDA 0.4x against a 2.5x maximum, see Treasury." },
  { id: "C-59", group: "Reporting", task: "November board pack draft", owner: "George Mensah", entity: "Group", due: "Dec 5", status: "Not Started", approval: "Not submitted" },
  { id: "C-60", group: "Reporting", task: "Lender compliance certificate draft", owner: "Angela Ruiz", entity: "Group", due: "Dec 5", status: "Not Started", approval: "Not submitted" },
  { id: "C-61", group: "Reporting", task: "Site financial statements, Keno Ridge", owner: "Peter Lindqvist", entity: "Keno Ridge", due: "Dec 4", status: "Not Started", approval: "Not submitted" },
  { id: "C-62", group: "Reporting", task: "Site financial statements, Sagebrush", owner: "Peter Lindqvist", entity: "Sagebrush", due: "Dec 4", status: "Not Started", approval: "Not submitted" },
  { id: "C-63", group: "Reporting", task: "Copperline JV reporting package", owner: "Nadia Hassan", entity: "Copperline JV", due: "Dec 4", status: "Not Started", approval: "Not submitted" },
  { id: "C-64", group: "Reporting", task: "Variance commentary, budget vs actual", owner: "George Mensah", entity: "Group", due: "Dec 5", status: "Not Started", approval: "Not submitted", note: "Price driven revenue beat with cost pressure at Sagebrush, see Planning." },
  { id: "C-65", group: "Reporting", task: "Q3 technical report cost schedules", owner: "George Mensah", entity: "Group", due: "Dec 5", status: "Not Started", approval: "Not submitted" },
  { id: "C-66", group: "Reporting", task: "Audit PBC list update", owner: "Peter Lindqvist", entity: "Group", due: "Dec 5", status: "Not Started", approval: "Not submitted" },
  { id: "C-67", group: "Reporting", task: "Royalty statements and filings", owner: "Peter Lindqvist", entity: "Group", due: "Dec 5", status: "Not Started", approval: "Not submitted" },
  { id: "C-68", group: "Reporting", task: "Disclosure checklist", owner: "Claire Dubois", entity: "Group", due: "Dec 7", status: "Not Started", approval: "Not submitted" },
  { id: "C-69", group: "Reporting", task: "CFO review of draft statements", owner: "Robert Hale", entity: "Group", due: "Dec 7", status: "Not Started", approval: "Not submitted" },
  { id: "C-70", group: "Reporting", task: "Period lock and close sign-off", owner: "Claire Dubois", entity: "Group", due: "Dec 11", status: "Not Started", approval: "Not submitted" },
  { id: "C-71", group: "Reporting", task: "Year-end technical review kickoff pack", owner: "George Mensah", entity: "Group", due: "Dec 10", status: "Not Started", approval: "Not submitted" },
];

export const entityCloseStatus: EntityCloseStatus[] = [
  {
    entity: "Aurora Ridge Mining Corp.",
    detail: "Keno Ridge Mine, Timmins, Ontario, CAD",
    owner: "Peter Lindqvist",
    complete: 5,
    total: 26,
    status: "In Progress",
    note: "Subledgers are on track. The stockpile reconciliation waits on the November survey, and the royalty accrual is the other long item.",
  },
  {
    entity: "Aurora Ridge USA Inc.",
    detail: "Sagebrush Mine, Elko, Nevada, USD",
    owner: "Peter Lindqvist",
    complete: 3,
    total: 22,
    status: "In Progress",
    note: "The fuel card feed is lagging and the site is still closing on Sage 300 with an expired connection, ahead of the SAP migration.",
  },
  {
    entity: "Corporate",
    detail: "Toronto head office, CAD",
    owner: "Nadia Hassan",
    complete: 3,
    total: 15,
    status: "In Progress",
    note: "Bank reconciliations are complete. Hedge mark to market and the tax provision draft are the open corporate items.",
  },
  {
    entity: "Copperline Metals JV",
    detail: "British Columbia, 40 percent non-operated interest",
    owner: "Nadia Hassan",
    complete: 1,
    total: 8,
    status: "In Progress",
    note: "The operator statement is in and the correction JE-2026-0874 is in Accounting. The equity pickup follows once the correction is approved.",
  },
];

export const octoberClose = {
  period: "October 2026",
  closedIn: "Closed in 9 business days",
  target: "10 business day target",
  closedOn: "Nov 12, 2026",
  note: "October closed one day ahead of target. One post-close adjustment remains open and is tracked below; closed periods are not silently modified, so the correction is prepared as a new entry against October with its own approvals.",
};

export const postCloseAdjustment = {
  entryId: "JE-2026-0874",
  title: "Copperline JV operator statement correction, October",
  amount: "$253,500",
  status: "Awaiting approval",
  detail:
    "Kestrel Resources' October statement shows Aurora's 40 percent share of JV costs at $4,218,000 against an accrual of $3,964,500. Alfie traced the $253,500 gap to a camp and catering invoice billed at 100 percent of cost instead of the 40 percent share ($186,000) and a missing October diesel accrual ($67,500), and prepared JE-2026-0874 to correct the accrual.",
  approvals:
    "Needs Controller review and CFO approval, because it is above the $10,000 post-close adjustment threshold.",
  preparedBy: "Prepared by Alfie, from the joint venture reconciliation",
};

export const closeRoles = [
  {
    role: "Mine Accountant",
    desc: "Prepares site reconciliations, stockpile and cost schedules, and drafts journal entries. Cannot post entries or approve their own work.",
  },
  {
    role: "Mine Controller",
    desc: "Owns the site close calendar, reviews site reconciliations and surveys, and signs off site trial balances for consolidation.",
  },
  {
    role: "AP / AR Specialist",
    desc: "Owns subledger cutoffs for payables and refinery settlements and prepares tie-outs. Cannot approve payments beyond configured authority.",
  },
  {
    role: "Controller",
    desc: "Reviews close tasks, reconciliations and journal entries, approves post-close adjustments jointly with the CFO above $10,000, and owns the consolidation and the JV equity pickup.",
  },
  {
    role: "VP Finance",
    desc: "Owns the group close calendar, reviews site and group reporting, and records the period lock once every task is complete and signed off.",
  },
  {
    role: "CFO",
    desc: "Approves material post-close adjustments and the final financial statements, and reviews covenant compliance before the lender certificate is issued.",
  },
] as const;

// Route content for the Close page header. World-specific narrative lives
// here so the route stays world-agnostic.
export const closeDescription =
  "Month end close for Aurora Ridge, managed as a controlled process with owners, due dates, approvals and reconciliation status across both mines, corporate and the Copperline JV.";
