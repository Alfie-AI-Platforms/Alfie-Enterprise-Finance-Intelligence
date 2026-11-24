import type {
  Automation,
  AutomationStatus,
  ChatBoardPackReply,
  ChatCashReply,
  ChatPlanningReply,
  ChatRetrievedReply,
  ChatSeedReply,
  Conversation,
  DataSource,
  DataSourceStatus,
  Execution,
  OrgDocument,
  ReportAskReply,
  ReportInsight,
  TriggerType,
} from "@/lib/worlds/enterprise/workspace-data";

export type {
  Automation,
  AutomationStatus,
  Conversation,
  DataSource,
  DataSourceStatus,
  Execution,
  OrgDocument,
  TriggerType,
};

export const seedConversations: Conversation[] = [
  {
    id: "conv-1",
    title: "November close tracking",
    folder: "Accounting",
    updated: "18 min ago",
    preview: "Close progress, the open post-close adjustment JE-2026-1142, and the plant items that need attention.",
  },
  {
    id: "conv-2",
    title: "Series 400 standard cost variance explained",
    folder: "Accounting",
    updated: "1 hr ago",
    preview:
      "How Alfie traced the $212,000 October material variance to steel prices, Line 3 scrap and stale standards.",
  },
  {
    id: "conv-3",
    title: "November board pack draft",
    folder: "Reports",
    updated: "Yesterday",
    preview: "Cross module draft combining Accounting, Planning and Treasury figures for the board.",
  },
  {
    id: "conv-4",
    title: "Bill approval policy",
    folder: "General",
    updated: "Yesterday",
    preview: "Answer sourced from the Accounting Policies Manual in Documents, section 6.1.",
  },
  {
    id: "conv-5",
    title: "Gross margin movement explained",
    folder: "Planning",
    updated: "2 days ago",
    preview: "Why gross margin is 26.8% against a 29.0% budget, by plant, from the FP&A Analysis Agent.",
  },
  {
    id: "conv-6",
    title: "Term loan agreement key terms",
    folder: "Documents",
    updated: "3 days ago",
    preview: "Key terms extracted from the term loan agreement in Documents, including the fixed charge coverage covenant.",
  },
  {
    id: "conv-7",
    title: "Old spreadsheet forecast comparison",
    folder: "General",
    updated: "Last week",
    preview: "Archived comparison from September.",
    archived: true,
  },
];

export const conversationFolders = [
  "All conversations",
  "General",
  "Accounting",
  "Payables",
  "Planning",
  "Reports",
  "Documents",
];

export const orgDocuments: OrgDocument[] = [
  {
    id: "DOC-1042",
    name: "November 2026 Board Pack",
    type: "Board pack",
    category: "Board & Executive",
    department: "Finance",
    owner: "Sarah Mitchell",
    uploaded: "Nov 12, 2026",
    modified: "Nov 15, 2026",
    version: "1.2",
    status: "Published",
    classification: "Confidential",
    access: "Finance leadership, Executives",
    association: "October 2026 close",
    pages: 38,
  },
  {
    id: "DOC-1038",
    name: "Term Loan Agreement 2024",
    type: "Loan agreement",
    category: "Contracts",
    department: "Treasury",
    owner: "Mark Feldman",
    uploaded: "Aug 30, 2026",
    modified: "Oct 15, 2026",
    version: "1.4",
    status: "Approved",
    classification: "Highly Restricted",
    access: "Finance leads, Executives",
    association: "$18.5M term loan",
    pages: 64,
  },
  {
    id: "DOC-1033",
    name: "Northline Precision October 2026 Financial Statements",
    type: "Financial statements",
    category: "Finance",
    department: "Accounting",
    owner: "Anita Roy",
    uploaded: "Nov 08, 2026",
    modified: "Nov 08, 2026",
    version: "1.0",
    status: "Published",
    classification: "Confidential",
    access: "Finance, Executives",
    association: "October 2026 reporting period",
    pages: 24,
  },
  {
    id: "DOC-1031",
    name: "Accounting Policies Manual",
    type: "Internal procedure",
    category: "Procedures",
    department: "Accounting",
    owner: "Priya Nair",
    uploaded: "Jun 04, 2026",
    modified: "Oct 22, 2026",
    version: "5.1",
    status: "Published",
    classification: "General Internal",
    access: "All departments",
    association: "Accounting operations",
    pages: 118,
  },
  {
    id: "DOC-1027",
    name: "Audit Engagement Letter 2026",
    type: "Audit letter",
    category: "Audit",
    department: "Finance",
    owner: "Sarah Mitchell",
    uploaded: "Sep 18, 2026",
    modified: "Oct 30, 2026",
    version: "1.1",
    status: "Approved",
    classification: "Restricted",
    access: "Finance leads, Auditors",
    association: "FY2026 audit",
    pages: 9,
  },
  {
    id: "DOC-1019",
    name: "FY2025 Audited Financial Statements",
    type: "Financial statements",
    category: "Finance",
    department: "Finance",
    owner: "Priya Nair",
    uploaded: "Mar 02, 2026",
    modified: "Mar 02, 2026",
    version: "1.2",
    status: "Archived",
    classification: "Restricted",
    access: "Finance leads",
    association: "FY2025 reporting period",
    pages: 52,
  },
  {
    id: "DOC-1012",
    name: "Q3 2026 Lender Compliance Certificate",
    type: "Compliance certificate",
    category: "Treasury",
    department: "Treasury",
    owner: "Mark Feldman",
    uploaded: "Nov 05, 2026",
    modified: "Nov 05, 2026",
    version: "1.0",
    status: "Approved",
    classification: "Restricted",
    access: "Treasury, Lender",
    association: "Fixed charge coverage 1.32x",
    pages: 6,
  },
  {
    id: "DOC-1008",
    name: "Plant 3 Chart of Accounts Mapping",
    type: "Migration mapping",
    category: "Migration",
    department: "Accounting",
    owner: "Lucas Meyer",
    uploaded: "Nov 10, 2026",
    modified: "Nov 14, 2026",
    version: "1.0",
    status: "Draft",
    classification: "Confidential",
    access: "Accounting, Migration team",
    association: "Sage 300 to Epicor Kinetic migration",
    pages: 14,
  },
  {
    id: "DOC-1003",
    name: "October 2026 Bank Statements Pack",
    type: "Bank statements",
    category: "Treasury",
    department: "Treasury",
    owner: "Mark Feldman",
    uploaded: "Nov 04, 2026",
    modified: "Nov 04, 2026",
    version: "1.0",
    status: "Published",
    classification: "Restricted",
    access: "Accounting, Treasury",
    association: "October 2026 reconciliations",
    pages: 42,
  },
  {
    id: "DOC-0991",
    name: "2025 Corporate Tax Return (T2)",
    type: "Tax filing",
    category: "Tax",
    department: "Finance",
    owner: "Priya Nair",
    uploaded: "Jun 28, 2026",
    modified: "Jun 28, 2026",
    version: "1.0",
    status: "Archived",
    classification: "Highly Restricted",
    access: "Finance leads",
    association: "2025 tax year",
    pages: 88,
  },
];

/*
 * Readable content for the in-app document preview, keyed by document id.
 * Viewing a document shows its summary and opening sections in the
 * workspace, so reading never requires a download. The full governed record
 * (versions, approvals, retention) stays on the document itself.
 */
export const documentPreviews: Record<
  string,
  { summary: string; sections: { heading: string; body: string }[] }
> = {
  "DOC-1042": {
    summary:
      "The board pack for November 2026, built on the October close. It presents consolidated results, inventory and cash position, and the one open post-close item, with each figure traceable to the module report behind it.",
    sections: [
      {
        heading: "Results for the year to October",
        body: "Revenue is $139.2M against a budget of $142.8M (-2.5%). Gross margin is 26.8% against a 29.0% budget and EBITDA is $13.2M, a margin of 9.5%. October revenue was $14.6M and the month closed in 7 days against an 8 day target.",
      },
      {
        heading: "Cash, inventory and covenants",
        body: "Cash is $9.6M CAD equivalent across 5 bank accounts. Inventory is $31.6M and turns 4.1x. The term loan is $18.5M and equipment loans are $6.4M; fixed charge coverage is 1.32x against a 1.20x minimum. The 13 week forecast low point is $6.9M in week 8.",
      },
      {
        heading: "Item for the board",
        body: "One post-close adjustment remains open: stale cost standards have understated October cost of goods sold and overstated inventory by $318,000. Correcting entry JE-2026-1142 is prepared and awaits CFO approval, and the January standard revision is drafted with it.",
      },
    ],
  },
  "DOC-1038": {
    summary:
      "The 2024 term loan agreement for the $18.5M facility: what Northline borrowed, the covenants it must meet, and how compliance is evidenced to the lender each quarter. Equipment loans of $6.4M sit under separate agreements.",
    sections: [
      {
        heading: "Facility",
        body: "A term loan of $18.5M, repayable on the schedule in Schedule B. Interest is priced off the benchmark rate plus the margin grid, which steps with the fixed charge coverage ratio.",
      },
      {
        heading: "Financial covenants",
        body: "Fixed charge coverage must not fall below 1.20x, tested quarterly on the definitions in section 8.2. The Q3 2026 test calculated 1.32x. A breach is an event of default if not cured within the period the agreement allows.",
      },
      {
        heading: "Reporting obligations",
        body: "Northline delivers a compliance certificate and consolidated financials each quarter, and audited annual statements within 120 days of year end. The Q3 2026 certificate is DOC-1012.",
      },
    ],
  },
  "DOC-1033": {
    summary:
      "The October 2026 financial statements for Northline Precision Inc. in Guelph, the group's largest plant: income statement, balance sheet and the notes that explain the margin movement.",
    sections: [
      {
        heading: "Results",
        body: "The plant runs the Series 400 gear housing family, the group's largest product line. October material variance on that family was $212,000 unfavourable: hot-rolled coil averaged $1,186 per tonne against a standard of $1,040 set in January, and scrap on Line 3 rose from 2.1% to 3.4% after the August tooling change.",
      },
      {
        heading: "Balance sheet notes",
        body: "Plant inventory is stated at standards set in January 2026. Because those standards are stale, inventory is overstated and cost of goods sold understated by $318,000 at October 31, before the correcting entry JE-2026-1142 described in the variance review.",
      },
      {
        heading: "Basis of preparation",
        body: "Prepared from the Epicor Kinetic general ledger for the entity, on the group accounting policies in the Accounting Policies Manual (DOC-1031). Figures are final for the October close, subject to the open post-close adjustment.",
      },
    ],
  },
  "DOC-1031": {
    summary:
      "The operating manual for group accounting: how journals are prepared and approved, how the close runs, how standard costs are set, and what evidence every entry and reconciliation must carry. Alfie's accounting preparation follows the same steps.",
    sections: [
      {
        heading: "6.1 Journal entries and approvals",
        body: "Every entry names a preparer and an approver, and the two are never the same person. Standard entries are approved by the Controller. Post-close adjustments above $10,000 require CFO approval before they post.",
      },
      {
        heading: "6.2 Bills and payments",
        body: "Vendor bills are approved on a three-way match against the purchase order and receiving record. Bills above $50,000 require VP Finance approval. The person who creates a payment never releases it.",
      },
      {
        heading: "6.3 The close calendar and standard costs",
        body: "The group close targets 8 business days: subledger cutoffs, reconciliations, accruals and estimates, consolidation, then reporting. October 2026 closed in 7 days. Standard costs are revised each January; a mid-year revision needs Controller and CFO approval, which is why the October variance is carried as a post-close adjustment instead.",
      },
    ],
  },
  "DOC-1027": {
    summary:
      "The engagement letter for the FY2026 audit: scope, responsibilities, timing and fees, signed by Northline and the audit firm. The prepared by client list that supports the audit is RPT-303.",
    sections: [
      {
        heading: "Scope",
        body: "The audit covers the consolidated financial statements of Northline Manufacturing Group Inc. for the year ending December 31, 2026, and the entity statements of the three plants.",
      },
      {
        heading: "Responsibilities",
        body: "Management is responsible for the statements, internal control and providing complete records. The auditors are responsible for their opinion. Alfie workpapers are available to the audit team with the same evidence trail people see in the workspace.",
      },
      {
        heading: "Timing",
        body: "Interim work in November 2026, fieldwork from January 2027, and signed statements targeted inside the 120 day lender deadline in the loan agreement.",
      },
    ],
  },
  "DOC-1019": {
    summary:
      "The audited consolidated financial statements of Northline Manufacturing Group Inc. for the year ended December 31, 2025, with comparatives for 2024. The auditor's report is unqualified.",
    sections: [
      {
        heading: "Basis of preparation",
        body: "The statements are prepared under Canadian accounting standards for private enterprises (ASPE). Significant accounting policies and judgements are set out in Note 2.",
      },
      {
        heading: "Results for the year",
        body: "The statements present revenue, gross margin, EBITDA and cash flow for 2025, and the opening position from which the FY2026 budget and the January 2026 cost standards were built.",
      },
      {
        heading: "Notes to the statements",
        body: "Notes cover the term loan and equipment loans, inventory and standard costing, intercompany balances and commitments, including the machining centre ordered for Plant 1.",
      },
    ],
  },
  "DOC-1012": {
    summary:
      "The Q3 2026 compliance certificate delivered to the term loan lender, signed by the Treasurer: the covenant calculations, on the loan agreement's definitions, for the quarter ended September 30, 2026.",
    sections: [
      {
        heading: "Fixed charge coverage calculation",
        body: "Fixed charge coverage of 1.32x against the 1.20x minimum in section 8.2 of the loan agreement (DOC-1038), calculated on covenant EBITDA less maintenance capex and scheduled debt service.",
      },
      {
        heading: "Certificate",
        body: "The Treasurer certifies that no event of default has occurred and that the calculations follow the agreement's definitions. Supporting schedules are in the lender compliance package, RPT-302.",
      },
      {
        heading: "Next test",
        body: "The next quarterly test is December 31, 2026. Treasury tracks headroom monthly in the 13 week forecast so a tightening trend is visible before a test date.",
      },
    ],
  },
  "DOC-1008": {
    summary:
      "The chart of accounts mapping for moving Plant 3 in Fort Wayne from Sage 300 to the group Epicor Kinetic ledger: which Sage 300 accounts map where, which are retired, and the trial balance evidence from the trial load.",
    sections: [
      {
        heading: "Mapping coverage",
        body: "172 of 186 Sage 300 accounts are mapped (92%). The 14 unmapped accounts are legacy assembly accounts with no activity since 2024; each is listed with its proposed treatment rather than dropped quietly.",
      },
      {
        heading: "Trial balance difference",
        body: "The October trial balance differs by $2,860 across 4 accounts between Sage 300 and the trial load. The difference is under review with the Plant 3 accounting team and blocks the full load until resolved.",
      },
      {
        heading: "Cutover",
        body: "Cutover is planned for Feb 12, 2027, after the January close. Sage 300 stays read-only through the 30 day hypercare window.",
      },
    ],
  },
  "DOC-1003": {
    summary:
      "The October 2026 bank statements for the group's 5 operating accounts at TD and Chase, as received from the bank feeds and used in the October reconciliations.",
    sections: [
      {
        heading: "Accounts covered",
        body: "Four CAD accounts at TD covering the Guelph and Drummondville plants and the group operating account, and one USD account at Chase for Plant 3 in Fort Wayne. Closing balances total $9.6M CAD equivalent.",
      },
      {
        heading: "Reconciliation status",
        body: "All 5 accounts reconciled for October. The pack is the evidence behind the October reconciliation sign-off in the Reconciliations module.",
      },
      {
        heading: "Known item",
        body: "A goods received not invoiced clearing difference of $47,300 is open in the November cycle, not in this pack; it is tracked as the lead exception in Reconciliations.",
      },
    ],
  },
  "DOC-0991": {
    summary:
      "The 2025 federal corporate tax return (T2) for Northline Manufacturing Group Inc. as filed, with the schedules that support the filing position for each entity.",
    sections: [
      {
        heading: "Filing position",
        body: "The return consolidates the Canadian entities' results for the 2025 tax year. The USD entity in Fort Wayne files separately in the United States; its figures here are for group reporting only.",
      },
      {
        heading: "Schedules",
        body: "Schedules cover capital cost allowance, intercompany charges and the scientific research and experimental development claim for the Plant 1 machining centre project.",
      },
      {
        heading: "Retention",
        body: "Filed returns and supporting working papers are retained for 7 years under the financial records schedule and are Highly Restricted: access is limited to Finance leads.",
      },
    ],
  },
};

export const documentCategories = [
  "All categories",
  "Board & Executive",
  "Contracts",
  "Procedures",
  "Audit",
  "Finance",
  "Treasury",
  "Migration",
  "Tax",
];

export const ingestionSteps = [
  "Receive the document",
  "Validate file type and size",
  "Scan for malicious content",
  "Extract text and metadata",
  "Run OCR where necessary",
  "Identify document type",
  "Identify entities and business references",
  "Suggest category and classification",
  "Check for potential duplicates",
  "Confirm classification and association",
  "Store with metadata",
];

export const dataSources: DataSource[] = [
  {
    id: "ds-epicor",
    name: "Epicor Kinetic",
    category: "Financial Systems",
    vendor: "Epicor",
    status: "Connected",
    access: "Read and approved writes",
    lastSync: "12 minutes ago",
    nextSync: "Hourly",
    records: "Plants 1 and 2, full ledger 2023 to date",
    freshness: "Current",
    datasets: ["General ledger", "Chart of accounts", "Journal entries", "Trial balance", "AP and AR subledgers", "Standard costs", "Inventory"],
    departments: ["Accounting", "Finance"],
    agents: ["Reconciliation Agent", "Close Agent", "AP Processing Agent", "Cost Variance Agent"],
    chatAvailable: true,
    reporting: true,
    automation: true,
  },
  {
    id: "ds-td",
    name: "TD Bank Feed",
    category: "Banking and Payments",
    vendor: "TD Bank",
    status: "Connected",
    access: "Read only",
    lastSync: "26 minutes ago",
    nextSync: "Every 4 hours",
    records: "4 CAD accounts",
    freshness: "Current",
    datasets: ["Account balances", "Transactions"],
    departments: ["Treasury", "Accounting"],
    agents: ["Reconciliation Agent", "Treasury Agent"],
    chatAvailable: true,
    reporting: true,
    automation: true,
  },
  {
    id: "ds-chase",
    name: "Chase Bank Feed",
    category: "Banking and Payments",
    vendor: "JPMorgan Chase",
    status: "Connected",
    access: "Read only",
    lastSync: "1 hour ago",
    nextSync: "Every 4 hours",
    records: "1 USD account (Plant 3)",
    freshness: "Current",
    datasets: ["Account balances", "Transactions"],
    departments: ["Treasury", "Accounting"],
    agents: ["Reconciliation Agent", "Treasury Agent"],
    chatAvailable: false,
    reporting: true,
    automation: true,
  },
  {
    id: "ds-plex",
    name: "Plex MES Feed",
    category: "Manufacturing Systems",
    vendor: "Rockwell Automation Plex",
    status: "Needs Attention",
    access: "Read only",
    lastSync: "Nov 14, 2026",
    nextSync: "Paused, see error",
    records: "Production, scrap and labour reporting, Plants 1 and 2",
    freshness: "Stale, 2 days",
    datasets: ["Production quantities", "Scrap rates", "Labour hours", "Work in progress"],
    departments: ["Accounting", "Costing"],
    agents: ["Cost Variance Agent", "Close Agent"],
    chatAvailable: true,
    reporting: false,
    automation: false,
    error:
      "Sync stale 2 days: Plant 2 production and scrap reporting since Nov 14 has not imported. November usage variances for Plant 2 are estimated until the sync recovers.",
  },
  {
    id: "ds-sage300-plant3",
    name: "Sage 300 (Plant 3)",
    category: "Legacy Systems",
    vendor: "Sage",
    status: "Authentication Expired",
    access: "Read only",
    lastSync: "Oct 31, 2026",
    nextSync: "Blocked until credentials are refreshed",
    records: "Plant 3 ledger, to Oct 31, 2026",
    freshness: "Stale, 17 days",
    datasets: ["Plant 3 general ledger", "Plant 3 AP", "Plant 3 AR"],
    departments: ["Accounting"],
    agents: ["Close Agent"],
    chatAvailable: false,
    reporting: false,
    automation: false,
    error:
      "Authentication expired on Nov 10. Alfie cannot retrieve current Plant 3 data from this source until an administrator refreshes the credential. Plant 3 reporting uses the Oct 31 position and says so, ahead of the February migration to Epicor.",
  },
  {
    id: "ds-docs",
    name: "SharePoint Document Library",
    category: "Document and Collaboration",
    vendor: "Microsoft SharePoint",
    status: "Connected",
    access: "Read only",
    lastSync: "2 hours ago",
    nextSync: "Every 2 hours",
    records: "3,940 documents indexed",
    freshness: "Current",
    datasets: ["Published procedures", "Templates", "Board records"],
    departments: ["All departments"],
    agents: ["All agents, within their permissions"],
    chatAvailable: true,
    reporting: false,
    automation: true,
  },
  {
    id: "ds-uploads",
    name: "Spreadsheet Uploads",
    category: "Financial Systems",
    vendor: "Manual uploads (Excel, CSV)",
    status: "Connected",
    access: "Read only",
    lastSync: "Yesterday, 4:20 PM",
    nextSync: "On upload",
    records: "96 files this quarter",
    freshness: "Current",
    datasets: ["Budget files", "Forecast models", "Accrual schedules", "Steel price trackers"],
    departments: ["Planning", "Accounting"],
    agents: ["FP&A Analysis Agent", "Close Agent"],
    chatAvailable: true,
    reporting: true,
    automation: false,
  },
];

export const sourceCategories = [
  "All categories",
  "Financial Systems",
  "Banking and Payments",
  "Manufacturing Systems",
  "Document and Collaboration",
  "Legacy Systems",
];

export const commonFields = [
  "Account code",
  "Journal entry number",
  "Vendor identifier",
  "Customer identifier",
  "Entity",
  "Plant",
  "Product family",
  "Amount",
  "Currency",
  "Transaction date",
  "Due date",
  "Approval status",
  "Source document",
];

export const sourceAudit = [
  {
    time: "Nov 15, 09:02",
    actor: "Sarah Mitchell (Admin)",
    action: "Sync failure investigated",
    detail: "Plex MES Feed, stale sync flagged and Plant 2 usage variances set to estimated",
  },
  {
    time: "Nov 14, 16:40",
    actor: "System",
    action: "Synchronization completed",
    detail: "Epicor Kinetic, 21,406 records processed, 0 rejected",
  },
  {
    time: "Nov 13, 11:15",
    actor: "Sarah Mitchell (Admin)",
    action: "Access permissions changed",
    detail: "Chase Bank Feed removed from general Chat, Treasury reporting kept",
  },
  {
    time: "Nov 10, 08:00",
    actor: "System",
    action: "Authentication failed",
    detail: "Sage 300 (Plant 3), credential expired",
  },
];

export const automations: Automation[] = [
  {
    id: "AUT-01",
    name: "New Bill Processing",
    category: "Payables",
    purpose:
      "Retrieve a new vendor bill, extract the invoice, run the three-way match and route it for approval by amount.",
    trigger: "Event",
    triggerDetail: "A new vendor bill is received",
    status: "Active",
    agents: ["AP Processing Agent"],
    sources: ["Epicor Kinetic", "SharePoint Document Library"],
    approval: "VP Finance approval for bills above $50,000",
    lastRun: "22 min ago",
    runs: 204,
  },
  {
    id: "AUT-02",
    name: "Duplicate Bill Detection",
    category: "Payables",
    purpose: "Check every new bill against invoice number, vendor and amount, and hold anything that duplicates an existing bill.",
    trigger: "Condition",
    triggerDetail: "Invoice number and amount match an existing bill",
    status: "Active",
    agents: ["AP Processing Agent"],
    sources: ["Epicor Kinetic"],
    approval: "AP Manager confirms before a held bill is released or rejected",
    lastRun: "Yesterday",
    runs: 47,
  },
  {
    id: "AUT-03",
    name: "Daily Bank Reconciliation",
    category: "Reconciliations",
    purpose:
      "Match bank feed transactions to the ledger each morning and queue the exceptions for the accounting team.",
    trigger: "Scheduled",
    triggerDetail: "Daily, 6:00 AM",
    status: "Active",
    agents: ["Reconciliation Agent"],
    sources: ["TD Bank Feed", "Chase Bank Feed", "Epicor Kinetic"],
    approval: "No approval, exceptions are queued for review",
    lastRun: "Today, 6:00 AM",
    runs: 212,
  },
  {
    id: "AUT-04",
    name: "Intercompany Reconciliation",
    category: "Accounting",
    purpose:
      "Compare intercompany balances by plant pair each month, convert Plant 3 at the period rate, and prepare an exception report for the Controller.",
    trigger: "Scheduled",
    triggerDetail: "Monthly, 3rd business day",
    status: "Active",
    agents: ["Reconciliation Agent"],
    sources: ["Epicor Kinetic"],
    approval: "Controller review of exceptions before any correcting entry",
    lastRun: "Nov 05",
    runs: 11,
  },
  {
    id: "AUT-05",
    name: "Close Checklist Monitoring",
    category: "Close",
    purpose:
      "Watch close task status across plants during the close window, chase overdue tasks and flag blockers to the Controller.",
    trigger: "Scheduled",
    triggerDetail: "Daily during the close window",
    status: "Active",
    agents: ["Close Agent"],
    sources: ["Epicor Kinetic"],
    approval: "No approval, notifications only",
    lastRun: "Today, 7:00 AM",
    runs: 64,
  },
  {
    id: "AUT-06",
    name: "AR Aging and Collection Drafts",
    category: "Receivables",
    purpose: "Flag invoices unpaid beyond their due date and prepare collection follow-up drafts for approval.",
    trigger: "Condition",
    triggerDetail: "Invoice unpaid 7 days past due date",
    status: "Paused",
    agents: ["AR Collections Agent"],
    sources: ["Epicor Kinetic"],
    approval: "Approval required before follow-ups are sent",
    lastRun: "Oct 28",
    runs: 63,
  },
  {
    id: "AUT-07",
    name: "Standard Cost Variance Watch",
    category: "Costing",
    purpose:
      "Compare actual material, labour and overhead against standard by product family each month and prepare the variance bridge for the Cost Accounting team.",
    trigger: "Scheduled",
    triggerDetail: "Monthly, 4th business day",
    status: "Active",
    agents: ["Cost Variance Agent"],
    sources: ["Epicor Kinetic", "Plex MES Feed"],
    approval: "Controller review before any true-up entry is prepared",
    lastRun: "Nov 06",
    runs: 10,
  },
  {
    id: "AUT-08",
    name: "Covenant Compliance Check",
    category: "Treasury",
    purpose:
      "Recalculate fixed charge coverage on the loan agreement definitions each month and alert Treasury if headroom falls below the configured buffer.",
    trigger: "Condition",
    triggerDetail: "Coverage below 1.28x, or headroom below 0.08x",
    status: "Active",
    agents: ["Treasury Agent"],
    sources: ["Epicor Kinetic", "TD Bank Feed", "Chase Bank Feed"],
    approval: "No approval, alerts only",
    lastRun: "Nov 05",
    runs: 9,
  },
  {
    id: "AUT-09",
    name: "Daily Cash Position Summary",
    category: "Treasury",
    purpose: "Summarize balances across the 5 bank accounts each morning for the Treasury group.",
    trigger: "Scheduled",
    triggerDetail: "Daily, 7:30 AM",
    status: "Draft",
    agents: ["Treasury Agent"],
    sources: ["TD Bank Feed", "Chase Bank Feed"],
    approval: "Creator approval to activate",
    lastRun: "Not run yet",
    runs: 0,
  },
  {
    id: "AUT-10",
    name: "Sync Failure Watch",
    category: "General Business",
    purpose:
      "Notify administrators when a data source sync fails twice in a row, as happened with the Plex MES feed.",
    trigger: "Condition",
    triggerDetail: "Two consecutive sync failures on any source",
    status: "In Testing",
    agents: ["Compliance Monitoring Agent"],
    sources: ["All data sources"],
    approval: "Admin approval to activate",
    lastRun: "Test run, Nov 16",
    runs: 3,
  },
];

export const automationCategories = [
  "All categories",
  "Accounting",
  "Close",
  "Reconciliations",
  "Payables",
  "Receivables",
  "Treasury",
  "Costing",
  "General Business",
];

export const executions: Execution[] = [
  {
    id: "EXE-9101",
    automation: "New Bill Processing",
    trigger: "Event, bill BILL-3307",
    started: "Today, 09:12",
    status: "Awaiting Approval",
    steps: "5 of 7 complete",
    outcome:
      "Three-way match prepared, with a price variance on the steel line: billed $1,212 per tonne against a PO price of $1,186. Waiting for VP Finance approval because the bill is above $50,000.",
  },
  {
    id: "EXE-9098",
    automation: "Daily Bank Reconciliation",
    trigger: "Scheduled, daily",
    started: "Today, 06:00",
    status: "Completed",
    steps: "6 of 6 complete",
    outcome: "2,140 transactions matched at a 94.8% auto-match rate. 9 exceptions queued, led by the goods received not invoiced clearing difference of $47,300.",
  },
  {
    id: "EXE-9095",
    automation: "Duplicate Bill Detection",
    trigger: "Condition, bill BILL-3311",
    started: "Today, 08:47",
    status: "Completed",
    steps: "4 of 4 complete",
    outcome: "BILL-3311 (invoice STL-2291, $18,940, Northgate Industrial Supply) held: it duplicates BILL-3298. AP Manager notified.",
  },
  {
    id: "EXE-9091",
    automation: "Intercompany Reconciliation",
    trigger: "Scheduled, monthly",
    started: "Nov 05, 09:00",
    status: "Failed",
    steps: "3 of 6 complete",
    outcome:
      "Stopped at Compare balances: Sage 300 data for Plant 3 is stale (authentication expired). No report was produced from incomplete data, and Accounting was notified.",
  },
  {
    id: "EXE-9088",
    automation: "Covenant Compliance Check",
    trigger: "Condition, monthly test",
    started: "Nov 05, 07:15",
    status: "Completed",
    steps: "4 of 4 complete",
    outcome:
      "Fixed charge coverage calculated at 1.32x, inside the 1.20x minimum and above the 1.28x alert threshold. Treasury notified with supporting schedules.",
  },
  {
    id: "EXE-9085",
    automation: "AR Aging and Collection Drafts",
    trigger: "Condition, invoice aging",
    started: "Today, 08:05",
    status: "Running",
    steps: "2 of 4 complete",
    outcome: "Reviewing 11 accounts past due, including AgriCore Equipment at $486,000 open.",
  },
];

export const automationTemplates = [
  {
    name: "Daily Bank Reconciliation",
    category: "Reconciliations",
    steps:
      "Retrieve bank feed transactions, match to the ledger, calculate the auto-match rate, queue exceptions, notify the accounting team.",
  },
  {
    name: "New Bill Processing",
    category: "Payables",
    steps:
      "Detect a new bill, extract the invoice, run the three-way match, check the approval policy, route to the approver by amount.",
  },
  {
    name: "Monthly Standard Cost Variance Review",
    category: "Costing",
    steps:
      "Retrieve actual material, labour and overhead by product family, compare against standard, split price, usage and rate variances, prepare the bridge, route for Controller review.",
  },
  {
    name: "Close Checklist Monitoring",
    category: "Close",
    steps:
      "Retrieve close task status by plant, identify overdue tasks and blockers, summarize progress, notify owners and the Controller.",
  },
  {
    name: "Working Capital Monitoring",
    category: "Treasury",
    steps:
      "Retrieve receivables, payables and inventory balances, calculate DSO, DPO and inventory turns, compare against thresholds, prepare a management summary.",
  },
];

export const submissionWorkflowSteps = [
  {
    step: "Retrieve the bill",
    state: "Completed",
    detail: "BILL-3307, Lakefront Steel Inc., $214,600",
  },
  {
    step: "Extract information from the invoice",
    state: "Completed",
    detail: "Invoice LFS-10482, purchase order and receiving record extracted",
  },
  {
    step: "Run the three-way match",
    state: "Completed",
    detail: "Price variance on the steel line: billed $1,212 per tonne, PO price $1,186 per tonne",
  },
  {
    step: "Check the duplicate register",
    state: "Completed",
    detail: "No duplicate of LFS-10482 in Payables",
  },
  {
    step: "Check the approval policy",
    state: "Completed",
    detail: "Above $50,000, so VP Finance approval is required",
  },
  {
    step: "Request human approval",
    state: "Awaiting Approval",
    detail: "Assigned to Sarah Mitchell, due today. The automation is paused here.",
  },
  {
    step: "Record the workflow outcome",
    state: "Pending",
    detail: "Runs only after approval, and writes back to the bill record in Epicor Kinetic",
  },
];

// ---------------------------------------------------------------------------
// Route-level workspace content: canned chat replies (chats.tsx), report
// insights and ask replies (reports.tsx), agent overview details
// (agents.$agentId.index.tsx). Shapes match the enterprise workspace.
// ---------------------------------------------------------------------------

export const chatSeedCloseReply: ChatSeedReply = {
  retrieved:
    "Close checklist status from the Close workspace, synced 9 minutes ago. 15 of 58 tasks are complete and subledger cutoffs start Nov 28.",
  analysis:
    "Three items need attention this week: JE-2026-1142 is waiting on CFO approval, the goods received not invoiced clearing difference of $47,300 is unreconciled, and the Plex MES feed from Plant 2 has not synced for 2 days, so November production costs are estimated.",
  recommendation:
    "Start with JE-2026-1142. It is the only item blocked on an executive decision, and it holds the inventory and cost of goods sold true-up for the group.",
};

export const chatBoardPackReply: ChatBoardPackReply = {
  analysis:
    "Revenue is tracking 2.5% behind budget year to date while gross margin is 2.2 points behind plan, and cash is $9.6M. The full breakdown is in the draft, separated into what was retrieved, what I analyzed, and what I recommend.",
  sources: ["Epicor Kinetic", "TD and Chase bank feeds", "Planning workspace"],
};

export const chatJournalReply: ChatRetrievedReply = {
  retrieved:
    "Journal entries and account balances from Epicor Kinetic, synced 12 minutes ago, limited to the entries your role can access.",
  sources: ["Epicor Kinetic", "Documents: Accounting Policies Manual"],
};

export const chatBillReply: ChatRetrievedReply = {
  retrieved:
    "Vendor bills, purchase orders and receiving records from Epicor Kinetic, with plant receiving detail from Plex where it is current.",
  sources: ["Epicor Kinetic", "Documents: Accounting Policies Manual, section 6.2"],
};

export const chatReceivableReply: ChatRetrievedReply = {
  retrieved: "Customer balances and aging from Epicor Kinetic, which are current.",
  sources: ["Epicor Kinetic"],
};

export const chatPlanningReply: ChatPlanningReply = {
  analysis:
    "The movement is concentrated in steel costs at Plant 1, not volume. I have separated the data I retrieved from the interpretation, and the underlying figures are available in Planning & FP&A.",
  sources: ["Planning workspace", "Epicor Kinetic"],
};

export const chatCashReply: ChatCashReply = {
  retrieved:
    "Financial figures from Epicor Kinetic, synced 12 minutes ago. These are the same figures shown in Reports.",
  analysis:
    "Cash is $9.6M across 5 accounts and the fixed charge coverage covenant sits at 1.32x against a 1.20x minimum, while receivables over 60 days need attention. Sample figures in this workspace are illustrative until your systems are connected.",
  sources: ["Epicor Kinetic", "Treasury workspace"],
};

export const reportAskReplies: ReportAskReply[] = [
  {
    match: ["gross margin", "margin"],
    agents: "FP&A Analysis Agent",
    answer:
      "Gross margin is 26.8% year to date, 2.2 points behind the 29.0% plan. Steel is the driver: hot-rolled coil has averaged $1,186 per tonne since July against a $1,040 standard set in January, and scrap on Line 3 at Plant 1 rose after the August tooling change. These figures come from Epicor Kinetic, refreshed 12 minutes ago.",
    sources: "Epicor Kinetic · RPT-307 Consolidated Financial Performance",
  },
  {
    match: ["revenue", "budget"],
    agents: "FP&A Analysis Agent",
    answer:
      "Revenue is $139.2M year to date against a $142.8M budget, 2.5% behind. October contributed $14.6M. The gap is price and mix on softer agricultural demand, not plant volume. Plant 3 figures are labelled preliminary while its Sage 300 migration completes.",
    sources: "Epicor Kinetic · RPT-307 Consolidated Financial Performance",
  },
  {
    match: ["cash", "liquidity"],
    agents: "Treasury Agent",
    answer:
      "Cash is $9.6M CAD equivalent across 5 bank accounts, at TD for the Canadian plants and Chase for the US plant. The 13 week forecast low point is $6.9M in week 8, when the next machining centre instalment is due. EBITDA is $13.2M year to date at a 9.5% margin.",
    sources: "TD and Chase bank feeds · Treasury workspace",
  },
  {
    match: ["close", "closing"],
    agents: "Close Agent",
    answer:
      "October closed in 7 days against the 8 day target. November is under way with 15 of 58 tasks complete; subledger cutoffs start Nov 28. One post-close adjustment from October is still open: JE-2026-1142, the $318,000 inventory and cost of goods sold true-up, waiting on CFO approval.",
    sources: "Close workspace · RPT-311 Close Performance Report",
  },
  {
    match: ["dso", "dpo", "working capital", "receivables"],
    agents: "Reconciliation Agent, FP&A Analysis Agent",
    answer:
      "DSO is 43 days and DPO is 37 days. Inventory is $31.6M across raw materials, work in progress and finished goods, turning 4.1x. The pressure is in receivables: $688K is over 60 days, and AgriCore Equipment alone carries $486,000 open with its largest invoice 58 days old.",
    sources: "Epicor Kinetic · RPT-308 Working Capital and Inventory Review",
  },
  {
    match: ["covenant", "lender", "loan", "leverage"],
    agents: "Treasury Agent",
    answer:
      "Fixed charge coverage is 1.32x against a covenant minimum of 1.20x on the $18.5M term loan, with a further $6.4M in equipment loans, so headroom is 0.12x at current EBITDA. The Q3 compliance certificate was delivered Nov 5 and the next test date is December 31, 2026.",
    sources: "RPT-302 Lender Compliance Package · Treasury workspace",
  },
  {
    match: ["executive", "summarize", "summary", "performance"],
    agents: "Close, Reconciliation, FP&A and Treasury Agents",
    answer:
      "Executive summary: revenue is behind budget at $139.2M and the October close landed in 7 days. Two items need management attention: gross margin is 2.2 points behind plan at 26.8% on steel costs, and October cost of goods sold is understated by $318,000 because cost standards are stale. One post-close adjustment, JE-2026-1142 for $318,000, is waiting on CFO approval. Every figure here traces to a library report listed below.",
    sources: "RPT-301 November Board Pack · RPT-307 · RPT-308 · RPT-310",
  },
];

export const reportInsights: ReportInsight[] = [
  {
    title: "Growth vs margin",
    description:
      "Revenue is 2.5% behind budget and gross margin is 2.2 points behind plan. Steel absorbed the difference: hot-rolled coil has averaged $1,186 per tonne since July against a $1,040 standard set in January. Volume is not the problem, input cost is.",
  },
  {
    title: "Working capital",
    description:
      "Inventory is the lever: $31.6M is tied up across raw materials, work in progress and finished goods, turning 4.1x. Receivables over 60 days are $688K with DSO at 43 days, while payables at 37 days sit inside agreed supplier terms.",
  },
  {
    title: "Legacy figures, flagged",
    description:
      "Plant 3 still reports from Sage 300 while its move to Epicor Kinetic completes, so its figures in consolidated reports are flagged as preliminary rather than published as final. Trial balance differences are disclosed, not adjusted away.",
  },
];

export const reportEntityFilterOptions: string[] = [
  "Precision only",
  "Fabrication only",
  "Assembly only (USD)",
];

export const reportBuilderSources: string[] = [
  "Epicor Kinetic",
  "TD Bank Feed",
  "Chase Bank Feed",
  "Plex MES Feed",
  "Spreadsheet Uploads",
];

export const agentConnectedSystems =
  "Epicor Kinetic · TD and Chase Bank Feeds · Plex MES · Document Repository";

export const agentRecentRuns: [string, string, string][] = [
  ["BILL-3311", "Duplicate held", "12 min ago"],
  ["JE-2026-1142", "Approval package prepared", "31 min ago"],
  ["BILL-3307", "Three-way match completed", "1 hr ago"],
];

// ---------- Help page system status ----------
import type { HelpService } from "@/lib/worlds/enterprise/workspace-data";

export type { HelpService };

export const helpServices: HelpService[] = [
  { name: "Alfie workspace", status: "Operational", tone: "text-positive" },
  { name: "Document processing", status: "Operational", tone: "text-positive" },
  { name: "Report generation", status: "Operational", tone: "text-positive" },
  { name: "Plex MES connector", status: "Degraded, sync delayed", tone: "text-warning" },
];
