// Illustrative sample data for the Close module. Figures follow BUILD_BRIEF.md
// and are consistent with the Accounting, Reconciliations and Planning data.

export type CloseGroup =
  | "Subledgers"
  | "Reconciliations"
  | "Accruals and estimates"
  | "Consolidation"
  | "Reporting";

export const closeGroups: readonly CloseGroup[] = [
  "Subledgers",
  "Reconciliations",
  "Accruals and estimates",
  "Consolidation",
  "Reporting",
];

export type CloseTaskStatus = "Complete" | "In Progress" | "Not Started" | "Blocked";

export type CloseTask = {
  id: string;
  group: CloseGroup;
  task: string;
  owner: string;
  entity: string;
  due: string;
  status: CloseTaskStatus;
  approval: string;
  note?: string;
};

export const closePeriod = {
  period: "November 2026",
  status: "In progress, early tasks underway",
  target: "Close by Dec 8, 2026, inside the 8 business day target",
  note: "Subledger cutoffs start Nov 28. Three tasks are blocked: the Retail POS import needs the QuickBooks connection restored, and two reconciliations are waiting on items detailed in Reconciliations.",
};

export const closeTasks: CloseTask[] = [
  // Subledgers (14)
  { id: "C-01", group: "Subledgers", task: "AP subledger roll-forward and open item review", owner: "Rachel Kim", entity: "Group", due: "Nov 20", status: "Complete", approval: "Approved" },
  { id: "C-02", group: "Subledgers", task: "AP subledger to GL tie-out", owner: "Rachel Kim", entity: "Group", due: "Nov 21", status: "Complete", approval: "Approved" },
  { id: "C-03", group: "Subledgers", task: "AR subledger roll-forward", owner: "Daniel Okafor", entity: "Group", due: "Nov 20", status: "Complete", approval: "Approved" },
  { id: "C-04", group: "Subledgers", task: "AR subledger to GL tie-out", owner: "Daniel Okafor", entity: "Group", due: "Nov 21", status: "Complete", approval: "Approved" },
  { id: "C-05", group: "Subledgers", task: "Fixed asset additions, disposals and transfers", owner: "Daniel Okafor", entity: "Manufacturing", due: "Nov 21", status: "Complete", approval: "Approved" },
  { id: "C-06", group: "Subledgers", task: "Depreciation run, November (JE-2026-1093)", owner: "Daniel Okafor", entity: "Group", due: "Nov 20", status: "Complete", approval: "Approved" },
  { id: "C-07", group: "Subledgers", task: "Prepaid expense schedule roll-forward (JE-2026-1091)", owner: "Daniel Okafor", entity: "Group", due: "Nov 19", status: "Complete", approval: "Approved" },
  { id: "C-08", group: "Subledgers", task: "Inventory count schedule, Toronto plant", owner: "Daniel Okafor", entity: "Manufacturing", due: "Nov 24", status: "Complete", approval: "Approved" },
  { id: "C-09", group: "Subledgers", task: "Inventory in-transit listing, Logistics", owner: "Daniel Okafor", entity: "Logistics", due: "Nov 24", status: "Complete", approval: "Approved" },
  { id: "C-10", group: "Subledgers", task: "Payroll subledger cutoff, Nov 28", owner: "Rachel Kim", entity: "Group", due: "Nov 28", status: "In Progress", approval: "Not submitted" },
  { id: "C-11", group: "Subledgers", task: "Expense report cutoff, Concur", owner: "Rachel Kim", entity: "Group", due: "Nov 28", status: "Not Started", approval: "Not submitted", note: "Concur sync is stale by 3 days, see Data Sources." },
  { id: "C-12", group: "Subledgers", task: "Intercompany sales and purchases cutoff", owner: "Marcus Webb", entity: "Group", due: "Nov 28", status: "Not Started", approval: "Not submitted" },
  { id: "C-13", group: "Subledgers", task: "Retail POS sales import, QuickBooks", owner: "Daniel Okafor", entity: "Retail", due: "Nov 28", status: "Blocked", approval: "Not submitted", note: "QuickBooks authentication has expired for Meridian Retail." },
  { id: "C-14", group: "Subledgers", task: "Subledger access and segregation review", owner: "Elena Brooks", entity: "Group", due: "Dec 1", status: "Not Started", approval: "Not submitted" },
  // Reconciliations (16)
  { id: "C-15", group: "Reconciliations", task: "TD Operating CAD reconciliation", owner: "Tom Alvarez", entity: "Manufacturing", due: "Nov 19", status: "Complete", approval: "Approved" },
  { id: "C-16", group: "Reconciliations", task: "RBC Payroll reconciliation", owner: "Tom Alvarez", entity: "Group", due: "Nov 19", status: "Complete", approval: "Approved" },
  { id: "C-17", group: "Reconciliations", task: "BMO Retail reconciliation", owner: "Daniel Okafor", entity: "Retail", due: "Nov 20", status: "Complete", approval: "Approved" },
  { id: "C-18", group: "Reconciliations", task: "Money market reconciliation", owner: "Tom Alvarez", entity: "Group", due: "Nov 19", status: "Complete", approval: "Approved" },
  { id: "C-19", group: "Reconciliations", task: "TD USD account reconciliation", owner: "Tom Alvarez", entity: "Manufacturing", due: "Nov 25", status: "In Progress", approval: "Pending" },
  { id: "C-20", group: "Reconciliations", task: "Chase US Operating reconciliation", owner: "Tom Alvarez", entity: "Logistics", due: "Nov 25", status: "In Progress", approval: "Pending" },
  { id: "C-21", group: "Reconciliations", task: "Payroll clearing reconciliation", owner: "Daniel Okafor", entity: "Group", due: "Nov 25", status: "Blocked", approval: "Pending", note: "Difference of $3,215 under review in Reconciliations." },
  { id: "C-22", group: "Reconciliations", task: "Amex corporate card reconciliation", owner: "Rachel Kim", entity: "Group", due: "Nov 25", status: "Blocked", approval: "Pending", note: "Card feed has been lagging since Nov 12." },
  { id: "C-23", group: "Reconciliations", task: "AR control account reconciliation", owner: "Daniel Okafor", entity: "Group", due: "Nov 26", status: "In Progress", approval: "Pending" },
  { id: "C-24", group: "Reconciliations", task: "AP control account reconciliation", owner: "Rachel Kim", entity: "Group", due: "Nov 26", status: "Not Started", approval: "Not submitted" },
  { id: "C-25", group: "Reconciliations", task: "Inventory control reconciliation", owner: "Daniel Okafor", entity: "Manufacturing", due: "Nov 27", status: "Not Started", approval: "Not submitted" },
  { id: "C-26", group: "Reconciliations", task: "Fixed assets control reconciliation", owner: "Daniel Okafor", entity: "Group", due: "Nov 27", status: "Not Started", approval: "Not submitted" },
  { id: "C-27", group: "Reconciliations", task: "Intercompany accounts reconciliation", owner: "Marcus Webb", entity: "Group", due: "Nov 27", status: "In Progress", approval: "Pending" },
  { id: "C-28", group: "Reconciliations", task: "GST/HST payable reconciliation", owner: "Daniel Okafor", entity: "Manufacturing", due: "Nov 27", status: "Not Started", approval: "Not submitted" },
  { id: "C-29", group: "Reconciliations", task: "US sales tax payable reconciliation", owner: "Daniel Okafor", entity: "Logistics", due: "Nov 27", status: "Not Started", approval: "Not submitted" },
  { id: "C-30", group: "Reconciliations", task: "Accrued liabilities reconciliation", owner: "Marcus Webb", entity: "Group", due: "Nov 27", status: "Not Started", approval: "Not submitted" },
  // Accruals and estimates (12)
  { id: "C-31", group: "Accruals and estimates", task: "Payroll accrual prepared (JE-2026-1098)", owner: "Daniel Okafor", entity: "Group", due: "Nov 20", status: "Complete", approval: "Approved" },
  { id: "C-32", group: "Accruals and estimates", task: "Revenue cut-off adjustment reviewed (JE-2026-1095)", owner: "Marcus Webb", entity: "Group", due: "Nov 21", status: "Complete", approval: "Approved" },
  { id: "C-33", group: "Accruals and estimates", task: "USD balance revaluation, November", owner: "Marcus Webb", entity: "Group", due: "Nov 21", status: "Complete", approval: "Approved" },
  { id: "C-34", group: "Accruals and estimates", task: "Bonus accrual update", owner: "Elena Brooks", entity: "Group", due: "Nov 26", status: "In Progress", approval: "Pending" },
  { id: "C-35", group: "Accruals and estimates", task: "Warranty provision review", owner: "Marcus Webb", entity: "Manufacturing", due: "Nov 27", status: "Not Started", approval: "Not submitted" },
  { id: "C-36", group: "Accruals and estimates", task: "Inventory obsolescence provision", owner: "Marcus Webb", entity: "Manufacturing", due: "Nov 27", status: "Not Started", approval: "Not submitted" },
  { id: "C-37", group: "Accruals and estimates", task: "Bad debt provision review", owner: "Elena Brooks", entity: "Group", due: "Nov 27", status: "Not Started", approval: "Not submitted", note: "AR over 60 days is $842K, including Northern Build Supplies." },
  { id: "C-38", group: "Accruals and estimates", task: "Freight accrual", owner: "Daniel Okafor", entity: "Logistics", due: "Nov 26", status: "Not Started", approval: "Not submitted" },
  { id: "C-39", group: "Accruals and estimates", task: "Utilities and occupancy accruals", owner: "Daniel Okafor", entity: "Group", due: "Nov 26", status: "Not Started", approval: "Not submitted" },
  { id: "C-40", group: "Accruals and estimates", task: "Professional fees accrual", owner: "Elena Brooks", entity: "Group", due: "Nov 26", status: "Not Started", approval: "Not submitted" },
  { id: "C-41", group: "Accruals and estimates", task: "Interest accrual, term loan", owner: "Tom Alvarez", entity: "Group", due: "Nov 26", status: "Not Started", approval: "Not submitted" },
  { id: "C-42", group: "Accruals and estimates", task: "Income tax provision draft", owner: "Elena Brooks", entity: "Group", due: "Dec 2", status: "Not Started", approval: "Not submitted" },
  // Consolidation (10)
  { id: "C-43", group: "Consolidation", task: "Entity trial balance imports", owner: "Marcus Webb", entity: "Group", due: "Nov 24", status: "Complete", approval: "Approved" },
  { id: "C-44", group: "Consolidation", task: "Intercompany eliminations", owner: "Marcus Webb", entity: "Group", due: "Dec 1", status: "In Progress", approval: "Pending" },
  { id: "C-45", group: "Consolidation", task: "FX translation, Logistics USD to CAD", owner: "Marcus Webb", entity: "Logistics", due: "Dec 1", status: "Not Started", approval: "Not submitted" },
  { id: "C-46", group: "Consolidation", task: "Investment in subsidiaries elimination", owner: "Marcus Webb", entity: "Group", due: "Dec 2", status: "Not Started", approval: "Not submitted" },
  { id: "C-47", group: "Consolidation", task: "Consolidated revenue agreement to entities", owner: "Grace Liu", entity: "Group", due: "Dec 2", status: "Not Started", approval: "Not submitted" },
  { id: "C-48", group: "Consolidation", task: "Consolidated balance sheet review", owner: "Marcus Webb", entity: "Group", due: "Dec 3", status: "Not Started", approval: "Not submitted" },
  { id: "C-49", group: "Consolidation", task: "Consolidated cash flow statement draft", owner: "Tom Alvarez", entity: "Group", due: "Dec 3", status: "Not Started", approval: "Not submitted" },
  { id: "C-50", group: "Consolidation", task: "Segment reporting pack", owner: "Grace Liu", entity: "Group", due: "Dec 4", status: "Not Started", approval: "Not submitted" },
  { id: "C-51", group: "Consolidation", task: "Consolidation adjustments review", owner: "Elena Brooks", entity: "Group", due: "Dec 4", status: "Not Started", approval: "Not submitted" },
  { id: "C-52", group: "Consolidation", task: "Group trial balance sign-off", owner: "Marcus Webb", entity: "Group", due: "Dec 4", status: "Not Started", approval: "Not submitted" },
  // Reporting (12)
  { id: "C-53", group: "Reporting", task: "Board pack outline and KPI definitions", owner: "Grace Liu", entity: "Group", due: "Nov 21", status: "Complete", approval: "Approved" },
  { id: "C-54", group: "Reporting", task: "Covenant calculation, leverage", owner: "Tom Alvarez", entity: "Group", due: "Nov 26", status: "In Progress", approval: "Pending", note: "Leverage 2.1x against a 3.0x maximum, see Treasury." },
  { id: "C-55", group: "Reporting", task: "November board pack draft", owner: "Grace Liu", entity: "Group", due: "Dec 5", status: "Not Started", approval: "Not submitted" },
  { id: "C-56", group: "Reporting", task: "Lender compliance certificate draft", owner: "Tom Alvarez", entity: "Group", due: "Dec 5", status: "Not Started", approval: "Not submitted" },
  { id: "C-57", group: "Reporting", task: "Entity financial statements, Manufacturing", owner: "Marcus Webb", entity: "Manufacturing", due: "Dec 4", status: "Not Started", approval: "Not submitted" },
  { id: "C-58", group: "Reporting", task: "Entity financial statements, Logistics", owner: "Marcus Webb", entity: "Logistics", due: "Dec 4", status: "Not Started", approval: "Not submitted" },
  { id: "C-59", group: "Reporting", task: "Entity financial statements, Retail", owner: "Daniel Okafor", entity: "Retail", due: "Dec 4", status: "Not Started", approval: "Not submitted" },
  { id: "C-60", group: "Reporting", task: "Variance commentary, budget vs actual", owner: "Grace Liu", entity: "Group", due: "Dec 5", status: "Not Started", approval: "Not submitted" },
  { id: "C-61", group: "Reporting", task: "Audit PBC list update", owner: "Daniel Okafor", entity: "Group", due: "Dec 5", status: "Not Started", approval: "Not submitted" },
  { id: "C-62", group: "Reporting", task: "Disclosure checklist", owner: "Elena Brooks", entity: "Group", due: "Dec 7", status: "Not Started", approval: "Not submitted" },
  { id: "C-63", group: "Reporting", task: "CFO review of draft statements", owner: "James Whitfield", entity: "Group", due: "Dec 7", status: "Not Started", approval: "Not submitted" },
  { id: "C-64", group: "Reporting", task: "Period lock and close sign-off", owner: "Elena Brooks", entity: "Group", due: "Dec 8", status: "Not Started", approval: "Not submitted" },
];

export type EntityCloseStatus = {
  entity: string;
  detail: string;
  owner: string;
  complete: number;
  total: number;
  status: string;
  note: string;
};

export const entityCloseStatus: EntityCloseStatus[] = [
  {
    entity: "Meridian Manufacturing Inc.",
    detail: "Toronto, CAD",
    owner: "Daniel Okafor",
    complete: 7,
    total: 24,
    status: "In Progress",
    note: "Subledgers are ahead of schedule. Inventory control and the warranty provision are the long items.",
  },
  {
    entity: "Meridian Logistics LLC",
    detail: "Columbus, Ohio, USD",
    owner: "Marcus Webb",
    complete: 5,
    total: 18,
    status: "In Progress",
    note: "Chase reconciliation and the freight accrual are open. FX translation starts once eliminations are agreed.",
  },
  {
    entity: "Meridian Retail Group Inc.",
    detail: "Vancouver, CAD",
    owner: "Daniel Okafor",
    complete: 6,
    total: 22,
    status: "In Progress",
    note: "Bank reconciliation is complete, but the POS sales import is blocked until the QuickBooks connection is restored.",
  },
];

export const octoberClose = {
  period: "October 2026",
  closedIn: "Closed in 6 business days",
  target: "8 business day target",
  closedOn: "Nov 9, 2026",
  note: "October closed two days ahead of target. One post-close adjustment remains open and is tracked below; closed periods are not silently modified, so the correction is prepared as a new entry against October with its own approvals.",
};

export const postCloseAdjustment = {
  entryId: "JE-2026-1087",
  title: "Intercompany FX revaluation, October 31",
  amount: "$18,400",
  status: "Awaiting approval",
  detail:
    "Manufacturing carries an intercompany receivable of $412,600 while Logistics carries the payable at $394,200 after conversion. Alfie traced the $18,400 gap to a missing October 31 FX revaluation on the USD balance and prepared JE-2026-1087 to correct it.",
  approvals:
    "Needs Controller review and CFO approval, because it is above the $10,000 post-close adjustment threshold.",
  preparedBy: "Prepared by Alfie, from the intercompany reconciliation",
};

export const closeRoles = [
  {
    role: "Senior Accountant",
    desc: "Prepares reconciliations, accruals and supporting schedules, and drafts journal entries. Cannot post entries or approve their own work.",
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
    desc: "Owns the close calendar, reviews entity and group reporting, and records the period lock once every task is complete and signed off.",
  },
  {
    role: "CFO",
    desc: "Approves material post-close adjustments and the final financial statements, and reviews covenant compliance before the lender certificate is issued.",
  },
  {
    role: "Administrator",
    desc: "Manages user access, permissions, integrations and agent configurations. Has no approval rights over accounting records.",
  },
] as const;
