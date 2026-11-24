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
    preview: "Close progress, the open post-close adjustment JE-2026-0874, and the site items that need attention.",
  },
  {
    id: "conv-2",
    title: "Copperline JV statement mismatch of $253,500 explained",
    folder: "Accounting",
    updated: "1 hr ago",
    preview:
      "How Alfie traced the gap between Kestrel Resources' operator statement and Aurora's accrual to a camp billing error and a missing diesel accrual.",
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
    title: "All-in sustaining cost movement explained",
    folder: "Planning",
    updated: "2 days ago",
    preview: "Why AISC is US$1,588 per oz against a US$1,540 budget, by site, from the FP&A Analysis Agent.",
  },
  {
    id: "conv-6",
    title: "Copperline project facility key terms",
    folder: "Documents",
    updated: "3 days ago",
    preview: "Key terms extracted from the project facility agreement in Documents, including the debt to EBITDA covenant.",
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
    owner: "Claire Dubois",
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
    name: "Copperline Project Facility Agreement 2025",
    type: "Loan agreement",
    category: "Contracts",
    department: "Treasury",
    owner: "Angela Ruiz",
    uploaded: "Aug 30, 2026",
    modified: "Oct 15, 2026",
    version: "1.4",
    status: "Approved",
    classification: "Highly Restricted",
    access: "Finance leads, Executives",
    association: "$150.0M Copperline project facility",
    pages: 64,
  },
  {
    id: "DOC-1033",
    name: "Keno Ridge October 2026 Financial Statements",
    type: "Financial statements",
    category: "Finance",
    department: "Accounting",
    owner: "Peter Lindqvist",
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
    owner: "Nadia Hassan",
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
    owner: "Claire Dubois",
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
    owner: "Nadia Hassan",
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
    owner: "Angela Ruiz",
    uploaded: "Nov 05, 2026",
    modified: "Nov 05, 2026",
    version: "1.0",
    status: "Approved",
    classification: "Restricted",
    access: "Treasury, Lender",
    association: "Total debt to EBITDA 0.4x",
    pages: 6,
  },
  {
    id: "DOC-1008",
    name: "Sagebrush Chart of Accounts Mapping",
    type: "Migration mapping",
    category: "Migration",
    department: "Accounting",
    owner: "Mark Delaney",
    uploaded: "Nov 10, 2026",
    modified: "Nov 14, 2026",
    version: "1.0",
    status: "Draft",
    classification: "Confidential",
    access: "Accounting, Migration team",
    association: "Sage 300 to SAP S/4HANA migration",
    pages: 14,
  },
  {
    id: "DOC-1003",
    name: "October 2026 Bank Statements Pack",
    type: "Bank statements",
    category: "Treasury",
    department: "Treasury",
    owner: "Angela Ruiz",
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
    owner: "Nadia Hassan",
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
      "The board pack for November 2026, built on the October close. It presents consolidated results, production and cost performance, the hedge position, and the one open post-close item, with each figure traceable to the module report behind it.",
    sections: [
      {
        heading: "Results for the year to October",
        body: "Revenue is $389.4M against a budget of $352.6M (+10.4%), driven by the realized gold price of US$4,072 per oz. Gross margin is 44.6% and EBITDA is $172.8M, a margin of 44.4%. October revenue was $41.5M and the month closed in 9 days against a 10 day target.",
      },
      {
        heading: "Cash, debt and hedging",
        body: "Cash is $58.6M CAD equivalent across 7 bank accounts. The Copperline project facility is drawn $63.4M of $150.0M and the $75.0M revolver is undrawn; total debt to EBITDA is 0.4x against a 2.5x maximum. 18,000 oz are sold forward for Q1 2027 at US$3,940 per oz. The 13 week forecast low point is $44.2M in week 10.",
      },
      {
        heading: "Item for the board",
        body: "One post-close adjustment remains open: the Copperline JV operator statement differs from Aurora's accrual by $253,500. Correcting entry JE-2026-0874 is prepared and awaits CFO approval, and a query letter to Kestrel Resources is drafted with it.",
      },
    ],
  },
  "DOC-1038": {
    summary:
      "The 2025 project facility agreement for Copperline: the $150.0M facility that funds Aurora Ridge's share of the development project, the covenants it must meet, and how compliance is evidenced to the lenders each quarter.",
    sections: [
      {
        heading: "Facility",
        body: "A project facility of $150.0M, drawn $63.4M at October 31, 2026, funding Aurora's 40% share of Copperline capital costs. The separate $75.0M revolving credit facility is undrawn.",
      },
      {
        heading: "Financial covenants",
        body: "Total debt to EBITDA must not exceed 2.5x, tested quarterly on the definitions in section 8.2. The Q3 2026 test calculated 0.4x. A breach is an event of default if not cured within the period the agreement allows.",
      },
      {
        heading: "Reporting obligations",
        body: "Aurora delivers a compliance certificate and consolidated financials each quarter, project cost reports for Copperline, and audited annual statements within 120 days of year end. The Q3 2026 certificate is DOC-1012.",
      },
    ],
  },
  "DOC-1033": {
    summary:
      "The October 2026 financial statements for Aurora Ridge Mining Corp. at the Keno Ridge Mine near Timmins: income statement, balance sheet and the notes that explain cost performance.",
    sections: [
      {
        heading: "Results",
        body: "Production year to date across the group is 71,380 oz of gold at an all-in sustaining cost of US$1,588 per oz against a US$1,540 budget. Cost pressure is concentrated in diesel, labour and camp services at both sites.",
      },
      {
        heading: "Balance sheet notes",
        body: "The asset retirement obligation provision is $88.7M group wide, covering reclamation at Keno Ridge and Sagebrush. Keno Ridge production carries a 2.0% net smelter return royalty held by Cobalt Royalties Inc., accrued monthly on production.",
      },
      {
        heading: "Basis of preparation",
        body: "Prepared from the SAP S/4HANA general ledger for the entity, on the group accounting policies in the Accounting Policies Manual (DOC-1031). Figures are final for the October close.",
      },
    ],
  },
  "DOC-1031": {
    summary:
      "The operating manual for group accounting: how journals are prepared and approved, how the close runs across sites, how joint venture statements and royalties are handled, and what evidence every entry and reconciliation must carry. Alfie's accounting preparation follows the same steps.",
    sections: [
      {
        heading: "6.1 Journal entries and approvals",
        body: "Every entry names a preparer and an approver, and the two are never the same person. Standard entries are approved by the Controller. Post-close adjustments above $10,000 require CFO approval before they post.",
      },
      {
        heading: "6.2 Bills and payments",
        body: "Vendor bills are approved on a three-way match against the purchase order and the verified service or survey record. Bills above $50,000 require VP Finance approval. The person who creates a payment never releases it.",
      },
      {
        heading: "6.3 The close calendar, JV statements and royalties",
        body: "The group close targets 10 business days: subledger cutoffs, reconciliations, accruals and estimates, consolidation, then reporting. October 2026 closed in 9 days. Operator statements for non-operated interests are accrued on Aurora's share and trued up on receipt; royalties are accrued on the month's production at the agreement rates.",
      },
    ],
  },
  "DOC-1027": {
    summary:
      "The engagement letter for the FY2026 audit: scope, responsibilities, timing and fees, signed by Aurora Ridge and the audit firm. The prepared by client list that supports the audit is RPT-303.",
    sections: [
      {
        heading: "Scope",
        body: "The audit covers the consolidated financial statements of Aurora Ridge Resources Inc. for the year ending December 31, 2026, the entity statements of the two mining subsidiaries, and Aurora's share of the Copperline joint venture.",
      },
      {
        heading: "Responsibilities",
        body: "Management is responsible for the statements, internal control and providing complete records. The auditors are responsible for their opinion. Alfie workpapers are available to the audit team with the same evidence trail people see in the workspace.",
      },
      {
        heading: "Timing",
        body: "Interim work in November 2026, fieldwork from January 2027, and signed statements targeted inside the 120 day lender deadline in the facility agreement.",
      },
    ],
  },
  "DOC-1019": {
    summary:
      "The audited consolidated financial statements of Aurora Ridge Resources Inc. for the year ended December 31, 2025, with comparatives for 2024. The auditor's report is unqualified.",
    sections: [
      {
        heading: "Basis of preparation",
        body: "The statements are prepared under Canadian accounting standards for private enterprises (ASPE). Significant accounting policies and judgements are set out in Note 2.",
      },
      {
        heading: "Results for the year",
        body: "The statements present revenue, gross margin, EBITDA and cash flow for 2025, and the opening position from which the FY2026 budget was built.",
      },
      {
        heading: "Notes to the statements",
        body: "Notes cover the project facility and covenants, the asset retirement obligation, royalty obligations, the hedge program and the Copperline joint venture interest.",
      },
    ],
  },
  "DOC-1012": {
    summary:
      "The Q3 2026 compliance certificate delivered to the project facility lenders, signed by the Treasurer: the covenant calculations, on the facility agreement's definitions, for the quarter ended September 30, 2026.",
    sections: [
      {
        heading: "Total debt to EBITDA calculation",
        body: "Total debt to EBITDA of 0.4x against the 2.5x maximum in section 8.2 of the facility agreement (DOC-1038), calculated on drawn project debt against covenant EBITDA.",
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
      "The chart of accounts mapping for moving the Sagebrush Mine from Sage 300 to the group SAP S/4HANA ledger: which Sage 300 accounts map where, which are retired, and what the mapping still has to resolve before the trial load.",
    sections: [
      {
        heading: "Mapping coverage",
        body: "148 of 240 Sage 300 accounts are mapped (62%). The unmapped accounts are mostly site cost codes for underground development and camp services that need a decision from the Sagebrush team on the SAP cost centre structure.",
      },
      {
        heading: "Open items",
        body: "Stockpile and work in progress accounts are unmapped until the November survey method is agreed, because the SAP treatment depends on how the survey adjustments will post. Nothing unmapped is dropped quietly.",
      },
      {
        heading: "Cutover",
        body: "Cutover is planned for Mar 8, 2027, after the February close. Sage 300 stays read-only through the 30 day hypercare window.",
      },
    ],
  },
  "DOC-1003": {
    summary:
      "The October 2026 bank statements for the group's 7 operating accounts at RBC and Wells Fargo, as received from the bank feeds and used in the October reconciliations.",
    sections: [
      {
        heading: "Accounts covered",
        body: "Five CAD accounts at RBC covering Keno Ridge, corporate and the Copperline project account, and two USD accounts at Wells Fargo for Sagebrush. Closing balances total $58.6M CAD equivalent.",
      },
      {
        heading: "Reconciliation status",
        body: "All 7 accounts reconciled for October. The pack is the evidence behind the October reconciliation sign-off in the Reconciliations module.",
      },
      {
        heading: "Known item",
        body: "A stockpile inventory difference of $94,600 is open in the November cycle, not in this pack; it is tracked as the lead exception in Reconciliations pending the November survey.",
      },
    ],
  },
  "DOC-0991": {
    summary:
      "The 2025 federal corporate tax return (T2) for Aurora Ridge Resources Inc. as filed, with the schedules that support the filing position for each entity.",
    sections: [
      {
        heading: "Filing position",
        body: "The return consolidates the Canadian entities' results for the 2025 tax year. The USD entity in Nevada files separately in the United States, including the Nevada Net Proceeds of Minerals tax; its figures here are for group reporting only.",
      },
      {
        heading: "Schedules",
        body: "Schedules cover capital cost allowance, mining tax credits, royalty deductions and the Copperline joint venture share.",
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
    id: "ds-sap",
    name: "SAP S/4HANA",
    category: "Financial Systems",
    vendor: "SAP",
    status: "Connected",
    access: "Read and approved writes",
    lastSync: "12 minutes ago",
    nextSync: "Hourly",
    records: "Corporate and Keno Ridge, full ledger 2023 to date",
    freshness: "Current",
    datasets: ["General ledger", "Chart of accounts", "Journal entries", "Trial balance", "AP and AR subledgers", "Project costs"],
    departments: ["Accounting", "Finance"],
    agents: ["Reconciliation Agent", "Close Agent", "AP Processing Agent", "JV and Royalty Agent"],
    chatAvailable: true,
    reporting: true,
    automation: true,
  },
  {
    id: "ds-rbc",
    name: "RBC Royal Bank Feed",
    category: "Banking and Payments",
    vendor: "RBC Royal Bank",
    status: "Connected",
    access: "Read only",
    lastSync: "26 minutes ago",
    nextSync: "Every 4 hours",
    records: "5 CAD accounts",
    freshness: "Current",
    datasets: ["Account balances", "Transactions"],
    departments: ["Treasury", "Accounting"],
    agents: ["Reconciliation Agent", "Treasury Agent"],
    chatAvailable: true,
    reporting: true,
    automation: true,
  },
  {
    id: "ds-wells",
    name: "Wells Fargo Feed",
    category: "Banking and Payments",
    vendor: "Wells Fargo",
    status: "Connected",
    access: "Read only",
    lastSync: "1 hour ago",
    nextSync: "Every 4 hours",
    records: "2 USD accounts (Sagebrush)",
    freshness: "Current",
    datasets: ["Account balances", "Transactions"],
    departments: ["Treasury", "Accounting"],
    agents: ["Reconciliation Agent", "Treasury Agent"],
    chatAvailable: false,
    reporting: true,
    automation: true,
  },
  {
    id: "ds-adp",
    name: "ADP Payroll",
    category: "Financial Systems",
    vendor: "ADP",
    status: "Needs Attention",
    access: "Read only",
    lastSync: "Nov 12, 2026",
    nextSync: "Paused, see error",
    records: "Payroll registers and GL posting summaries, both sites",
    freshness: "Stale, 4 days",
    datasets: ["Payroll registers", "GL posting summaries", "Statutory remittances"],
    departments: ["Payables", "Accounting"],
    agents: ["AP Processing Agent", "Close Agent"],
    chatAvailable: true,
    reporting: false,
    automation: false,
    error:
      "Sync stale 4 days: payroll registers since Nov 12 have not imported. The Nov 15 site payroll runs are waiting, so November payroll accruals are estimated until the sync recovers.",
  },
  {
    id: "ds-sage300-sagebrush",
    name: "Sage 300 (Sagebrush)",
    category: "Legacy Systems",
    vendor: "Sage",
    status: "Authentication Expired",
    access: "Read only",
    lastSync: "Oct 31, 2026",
    nextSync: "Blocked until credentials are refreshed",
    records: "Sagebrush ledger, to Oct 31, 2026",
    freshness: "Stale, 17 days",
    datasets: ["Sagebrush general ledger", "Sagebrush AP", "Sagebrush AR"],
    departments: ["Accounting"],
    agents: ["Close Agent"],
    chatAvailable: false,
    reporting: false,
    automation: false,
    error:
      "Authentication expired on Nov 10. Alfie cannot retrieve current Sagebrush data from this source until an administrator refreshes the credential. Sagebrush reporting uses the Oct 31 position and says so, ahead of the March migration to SAP.",
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
    records: "3,310 documents indexed",
    freshness: "Current",
    datasets: ["Published procedures", "Templates", "Board records", "Technical reports"],
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
    records: "141 files this quarter",
    freshness: "Current",
    datasets: ["Site cost reports", "Budget files", "Forecast models", "Survey results"],
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
  "Document and Collaboration",
  "Legacy Systems",
];

export const commonFields = [
  "Account code",
  "Journal entry number",
  "Vendor identifier",
  "Customer identifier",
  "Entity",
  "Site",
  "Project",
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
    actor: "Claire Dubois (Admin)",
    action: "Sync failure investigated",
    detail: "ADP Payroll, stale sync flagged and payroll accrual set to estimated",
  },
  {
    time: "Nov 14, 16:40",
    actor: "System",
    action: "Synchronization completed",
    detail: "SAP S/4HANA, 24,918 records processed, 0 rejected",
  },
  {
    time: "Nov 13, 11:15",
    actor: "Claire Dubois (Admin)",
    action: "Access permissions changed",
    detail: "Wells Fargo Feed removed from general Chat, Treasury reporting kept",
  },
  {
    time: "Nov 10, 08:00",
    actor: "System",
    action: "Authentication failed",
    detail: "Sage 300 (Sagebrush), credential expired",
  },
];

export const automations: Automation[] = [
  {
    id: "AUT-01",
    name: "New Bill Processing",
    category: "Payables",
    purpose:
      "Retrieve a new vendor bill, extract the invoice, run the three-way match against the verified service or survey record and route it for approval by amount.",
    trigger: "Event",
    triggerDetail: "A new vendor bill is received",
    status: "Active",
    agents: ["AP Processing Agent"],
    sources: ["SAP S/4HANA", "SharePoint Document Library"],
    approval: "VP Finance approval for bills above $50,000",
    lastRun: "22 min ago",
    runs: 231,
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
    sources: ["SAP S/4HANA"],
    approval: "AP Lead confirms before a held bill is released or rejected",
    lastRun: "Yesterday",
    runs: 52,
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
    sources: ["RBC Royal Bank Feed", "Wells Fargo Feed", "SAP S/4HANA"],
    approval: "No approval, exceptions are queued for review",
    lastRun: "Today, 6:00 AM",
    runs: 212,
  },
  {
    id: "AUT-04",
    name: "JV Statement Reconciliation",
    category: "Accounting",
    purpose:
      "Compare the Copperline operator statement from Kestrel Resources against Aurora's 40% accrual each month and prepare an exception report for the Controller.",
    trigger: "Scheduled",
    triggerDetail: "Monthly, on receipt of the operator statement",
    status: "Active",
    agents: ["JV and Royalty Agent"],
    sources: ["SAP S/4HANA", "Spreadsheet Uploads"],
    approval: "Controller review of exceptions before any correcting entry",
    lastRun: "Nov 08",
    runs: 7,
  },
  {
    id: "AUT-05",
    name: "Close Checklist Monitoring",
    category: "Close",
    purpose:
      "Watch close task status across sites during the close window, chase overdue tasks and flag blockers to the Controller.",
    trigger: "Scheduled",
    triggerDetail: "Daily during the close window",
    status: "Active",
    agents: ["Close Agent"],
    sources: ["SAP S/4HANA"],
    approval: "No approval, notifications only",
    lastRun: "Today, 7:00 AM",
    runs: 71,
  },
  {
    id: "AUT-06",
    name: "AR Aging and Collection Drafts",
    category: "Receivables",
    purpose: "Flag refinery settlements unpaid beyond their due date and prepare follow-up drafts for approval.",
    trigger: "Condition",
    triggerDetail: "Settlement unpaid 7 days past due date",
    status: "Paused",
    agents: ["AR Collections Agent"],
    sources: ["SAP S/4HANA"],
    approval: "Approval required before follow-ups are sent",
    lastRun: "Oct 28",
    runs: 44,
  },
  {
    id: "AUT-07",
    name: "Royalty Accrual Preparation",
    category: "Royalties",
    purpose:
      "Build the monthly net smelter return royalty accruals from production: 2.0% at Keno Ridge for Cobalt Royalties Inc., 3.0% at Sagebrush, plus the Nevada Net Proceeds accrual.",
    trigger: "Scheduled",
    triggerDetail: "Monthly, last business day",
    status: "Active",
    agents: ["JV and Royalty Agent"],
    sources: ["SAP S/4HANA", "Spreadsheet Uploads"],
    approval: "Controller approval before the accruals post",
    lastRun: "Oct 31",
    runs: 10,
  },
  {
    id: "AUT-08",
    name: "Covenant Compliance Check",
    category: "Treasury",
    purpose:
      "Recalculate total debt to EBITDA on the facility agreement definitions each month and alert Treasury if headroom falls below the configured buffer.",
    trigger: "Condition",
    triggerDetail: "Ratio above 2.0x, or headroom below 0.5x",
    status: "Active",
    agents: ["Treasury Agent"],
    sources: ["SAP S/4HANA", "RBC Royal Bank Feed", "Wells Fargo Feed"],
    approval: "No approval, alerts only",
    lastRun: "Nov 05",
    runs: 9,
  },
  {
    id: "AUT-09",
    name: "Daily Cash Position Summary",
    category: "Treasury",
    purpose: "Summarize balances across the 7 bank accounts each morning for the Treasury group.",
    trigger: "Scheduled",
    triggerDetail: "Daily, 7:30 AM",
    status: "Draft",
    agents: ["Treasury Agent"],
    sources: ["RBC Royal Bank Feed", "Wells Fargo Feed"],
    approval: "Creator approval to activate",
    lastRun: "Not run yet",
    runs: 0,
  },
  {
    id: "AUT-10",
    name: "Sync Failure Watch",
    category: "General Business",
    purpose:
      "Notify administrators when a data source sync fails twice in a row, as happened with ADP Payroll.",
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
  "Royalties",
  "General Business",
];

export const executions: Execution[] = [
  {
    id: "EXE-7701",
    automation: "New Bill Processing",
    trigger: "Event, bill BILL-5108",
    started: "Today, 09:12",
    status: "Awaiting Approval",
    steps: "5 of 7 complete",
    outcome:
      "Three-way match prepared, with a quantity variance: 4,120 metres billed against 3,940 metres verified by survey, $17,900 held. Waiting for VP Finance approval because the bill is above $50,000.",
  },
  {
    id: "EXE-7698",
    automation: "Daily Bank Reconciliation",
    trigger: "Scheduled, daily",
    started: "Today, 06:00",
    status: "Completed",
    steps: "6 of 6 complete",
    outcome: "2,486 transactions matched at a 95.1% auto-match rate. 8 exceptions queued, led by the stockpile inventory difference of $94,600 awaiting the November survey.",
  },
  {
    id: "EXE-7695",
    automation: "Duplicate Bill Detection",
    trigger: "Condition, bill BILL-5113",
    started: "Today, 08:47",
    status: "Completed",
    steps: "4 of 4 complete",
    outcome: "BILL-5113 (invoice NE-8841, $42,680, Northern Explosives Ltd.) held: it duplicates BILL-5102. AP Lead notified.",
  },
  {
    id: "EXE-7691",
    automation: "JV Statement Reconciliation",
    trigger: "Scheduled, monthly",
    started: "Nov 08, 09:00",
    status: "Completed",
    steps: "6 of 6 complete",
    outcome:
      "October operator statement compared with Aurora's accrual: a $253,500 difference isolated to the camp and catering billing and a missing diesel accrual. Correcting entry JE-2026-0874 prepared for review.",
  },
  {
    id: "EXE-7688",
    automation: "Covenant Compliance Check",
    trigger: "Condition, monthly test",
    started: "Nov 05, 07:15",
    status: "Completed",
    steps: "4 of 4 complete",
    outcome:
      "Total debt to EBITDA calculated at 0.4x, inside the 2.5x maximum and below the 2.0x alert threshold. Treasury notified with supporting schedules.",
  },
  {
    id: "EXE-7685",
    automation: "AR Aging and Collection Drafts",
    trigger: "Condition, settlement aging",
    started: "Today, 08:05",
    status: "Running",
    steps: "2 of 4 complete",
    outcome: "Reviewing 6 settlements past due, including Cascade Refining at $2,840,000 open with one lot under an assay dispute.",
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
      "Detect a new bill, extract the invoice, run the three-way match against the verified record, check the approval policy, route to the approver by amount.",
  },
  {
    name: "Monthly JV Statement Reconciliation",
    category: "Accounting",
    steps:
      "Retrieve the operator statement, compare each cost line against the accrued share, identify differences, prepare an exception report, route exceptions for review.",
  },
  {
    name: "Close Checklist Monitoring",
    category: "Close",
    steps:
      "Retrieve close task status by site, identify overdue tasks and blockers, summarize progress, notify owners and the Controller.",
  },
  {
    name: "Working Capital Monitoring",
    category: "Treasury",
    steps:
      "Retrieve receivables, payables and inventory balances, calculate DSO, DPO and the cash conversion cycle, compare against thresholds, prepare a management summary.",
  },
];

export const submissionWorkflowSteps = [
  {
    step: "Retrieve the bill",
    state: "Completed",
    detail: "BILL-5108, Summit Drilling Ltd., $386,200",
  },
  {
    step: "Extract information from the invoice",
    state: "Completed",
    detail: "Invoice SD-2217, contract and survey record extracted",
  },
  {
    step: "Run the three-way match",
    state: "Completed",
    detail: "Quantity variance: billed 4,120 metres drilled, survey verified 3,940 metres",
  },
  {
    step: "Check the duplicate register",
    state: "Completed",
    detail: "No duplicate of SD-2217 in Payables",
  },
  {
    step: "Check the approval policy",
    state: "Completed",
    detail: "Above $50,000, so VP Finance approval is required",
  },
  {
    step: "Request human approval",
    state: "Awaiting Approval",
    detail: "Assigned to Claire Dubois, due today. The automation is paused here.",
  },
  {
    step: "Record the workflow outcome",
    state: "Pending",
    detail: "Runs only after approval, and writes back to the bill record in SAP S/4HANA",
  },
];

// ---------------------------------------------------------------------------
// Route-level workspace content: canned chat replies (chats.tsx), report
// insights and ask replies (reports.tsx), agent overview details
// (agents.$agentId.index.tsx). Shapes match the enterprise workspace.
// ---------------------------------------------------------------------------

export const chatSeedCloseReply: ChatSeedReply = {
  retrieved:
    "Close checklist status from the Close workspace, synced 9 minutes ago. 12 of 71 tasks are complete and subledger cutoffs start Nov 28.",
  analysis:
    "Three items need attention this week: JE-2026-0874 is waiting on CFO approval, the stockpile inventory difference of $94,600 is awaiting the November survey, and the ADP payroll feed has not synced for 4 days, so November payroll accruals are estimated.",
  recommendation:
    "Start with JE-2026-0874. It is the only item blocked on an executive decision, and it holds the Copperline joint venture sign-off for the group.",
};

export const chatBoardPackReply: ChatBoardPackReply = {
  analysis:
    "Revenue is tracking 10.4% ahead of budget year to date, price driven, with gross margin at 44.6% and cash at $58.6M. The full breakdown is in the draft, separated into what was retrieved, what I analyzed, and what I recommend.",
  sources: ["SAP S/4HANA", "RBC and Wells Fargo bank feeds", "Planning workspace"],
};

export const chatJournalReply: ChatRetrievedReply = {
  retrieved:
    "Journal entries and account balances from SAP S/4HANA, synced 12 minutes ago, limited to the entries your role can access.",
  sources: ["SAP S/4HANA", "Documents: Accounting Policies Manual"],
};

export const chatBillReply: ChatRetrievedReply = {
  retrieved:
    "Vendor bills, purchase orders and receiving records from SAP S/4HANA, with site cost report detail where it is current.",
  sources: ["SAP S/4HANA", "Documents: Accounting Policies Manual, section 6.2"],
};

export const chatReceivableReply: ChatRetrievedReply = {
  retrieved: "Refiner and buyer balances and aging from SAP S/4HANA, which are current.",
  sources: ["SAP S/4HANA"],
};

export const chatPlanningReply: ChatPlanningReply = {
  analysis:
    "The movement is concentrated in the gold price and in costs at Sagebrush, not production volume. I have separated the data I retrieved from the interpretation, and the underlying figures are available in Planning & FP&A.",
  sources: ["Planning workspace", "SAP S/4HANA"],
};

export const chatCashReply: ChatCashReply = {
  retrieved:
    "Financial figures from SAP S/4HANA, synced 12 minutes ago. These are the same figures shown in Reports.",
  analysis:
    "Cash is $58.6M across 7 accounts and total debt to EBITDA sits at 0.4x against a 2.5x maximum, while one refinery settlement is held up by an assay dispute. Sample figures in this workspace are illustrative until your systems are connected.",
  sources: ["SAP S/4HANA", "Treasury workspace"],
};

export const reportAskReplies: ReportAskReply[] = [
  {
    match: ["gross margin", "margin"],
    agents: "FP&A Analysis Agent",
    answer:
      "Gross margin is 44.6% year to date. The story is price against cost: the realized gold price is US$4,072 per oz, while all-in sustaining cost is US$1,588 per oz against a US$1,540 budget, with the pressure at Sagebrush. These figures come from SAP S/4HANA, refreshed 12 minutes ago.",
    sources: "SAP S/4HANA · RPT-307 Consolidated Financial Performance",
  },
  {
    match: ["revenue", "budget"],
    agents: "FP&A Analysis Agent",
    answer:
      "Revenue is $389.4M year to date against a $352.6M budget, 10.4% ahead, and the beat is price driven. October contributed $41.5M. Production is 71,380 oz of gold year to date at a realized price of US$4,072 per oz.",
    sources: "SAP S/4HANA · RPT-307 Consolidated Financial Performance",
  },
  {
    match: ["cash", "liquidity"],
    agents: "Treasury Agent",
    answer:
      "Cash is $58.6M CAD equivalent across 7 bank accounts, at RBC in Canada and Wells Fargo for the US mine. The 13 week forecast low point is $44.2M in week 10, when the Copperline cash call and debt service land. The $75.0M revolving facility is undrawn.",
    sources: "RBC and Wells Fargo bank feeds · Treasury workspace",
  },
  {
    match: ["close", "closing"],
    agents: "Close Agent",
    answer:
      "October closed in 9 days against the 10 day target. November is under way with 12 of 71 tasks complete; subledger cutoffs start Nov 28. One post-close adjustment from October is still open: JE-2026-0874, the $253,500 Copperline joint venture correction, waiting on CFO approval.",
    sources: "Close workspace · RPT-311 Close Performance Report",
  },
  {
    match: ["dso", "dpo", "working capital", "receivables"],
    agents: "Reconciliation Agent, FP&A Analysis Agent",
    answer:
      "DSO is 14 days on refinery settlement terms and DPO is 41 days. Receivables stay small by design: $196K is over 60 days, a single Cascade Refining lot held up by an assay dispute. Working capital pressure sits in payables and Copperline project spend instead.",
    sources: "SAP S/4HANA · RPT-308",
  },
  {
    match: ["covenant", "lender", "loan", "leverage"],
    agents: "Treasury Agent",
    answer:
      "Total debt to EBITDA is 0.4x against a covenant maximum of 2.5x. The Copperline project facility is drawn $63.4M of $150.0M and the $75.0M revolving facility is undrawn, so headroom is wide. The Q3 compliance certificate was delivered Nov 5 and the next test date is December 31, 2026.",
    sources: "RPT-302 Lender Compliance Package · Treasury workspace",
  },
  {
    match: ["executive", "summarize", "summary", "performance"],
    agents: "Close, Reconciliation, FP&A and Treasury Agents",
    answer:
      "Executive summary: revenue is ahead of budget at $389.4M on the gold price and the October close landed in 9 days. Two items need management attention: all-in sustaining cost is US$1,588 per oz against a US$1,540 budget, and the Copperline operator statement differs from the accrual by $253,500. One post-close adjustment, JE-2026-0874 for $253,500, is waiting on CFO approval. Every figure here traces to a library report listed below.",
    sources: "RPT-301 November Board Pack · RPT-307 · RPT-308 · RPT-310",
  },
];

export const reportInsights: ReportInsight[] = [
  {
    title: "Growth vs margin",
    description:
      "Revenue is 10.4% ahead of budget, and it is price, not volume: the realized gold price is US$4,072 per oz. Gross margin is 44.6%. Cost pressure sits at Sagebrush, where all-in sustaining cost runs at US$1,588 per oz against a US$1,540 budget.",
  },
  {
    title: "Working capital",
    description:
      "Receivables settle fast on refinery terms, DSO 14 days, so working capital pressure sits in payables and project spend: $3.46M of payables is due this week and Copperline draws continue against the project facility. One refinery lot of $196,000 is held up by an assay dispute.",
  },
  {
    title: "Legacy figures, flagged",
    description:
      "Sagebrush still reports from Sage 300 while its move to SAP S/4HANA completes, so its figures in consolidated reports are flagged as preliminary rather than published as final. Trial balance differences are disclosed, not adjusted away.",
  },
];

export const reportEntityFilterOptions: string[] = [
  "Keno Ridge only",
  "Sagebrush only (USD)",
  "Copperline JV only",
];

export const reportBuilderSources: string[] = [
  "SAP S/4HANA",
  "RBC Bank Feed",
  "Wells Fargo Bank Feed",
  "ADP Payroll",
  "Spreadsheet Uploads",
];

export const agentConnectedSystems =
  "SAP S/4HANA · RBC and Wells Fargo Bank Feeds · ADP Payroll · Document Repository";

export const agentRecentRuns: [string, string, string][] = [
  ["BILL-5113", "Duplicate held", "12 min ago"],
  ["JE-2026-0874", "Approval package prepared", "31 min ago"],
  ["BILL-5108", "Three-way match completed", "1 hr ago"],
];

// ---------- Help page system status ----------
import type { HelpService } from "@/lib/worlds/enterprise/workspace-data";

export type { HelpService };

export const helpServices: HelpService[] = [
  { name: "Alfie workspace", status: "Operational", tone: "text-positive" },
  { name: "Document processing", status: "Operational", tone: "text-positive" },
  { name: "Report generation", status: "Operational", tone: "text-positive" },
  { name: "ADP payroll connector", status: "Degraded, sync delayed", tone: "text-warning" },
];
