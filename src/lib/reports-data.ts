export type ReportKpi = {
  label: string;
  value: string;
  change: string;
  source: string;
  updated: string;
};

export const reportKpis: ReportKpi[] = [
  {
    label: "Revenue, Year to Date",
    value: "$102.6M",
    change: "+3.2% vs budget of $99.4M",
    source: "NetSuite",
    updated: "12 min ago",
  },
  {
    label: "Revenue, October",
    value: "$9.8M",
    change: "Final, October close",
    source: "NetSuite",
    updated: "12 min ago",
  },
  {
    label: "Gross Margin",
    value: "41.2%",
    change: "Year to date, all entities",
    source: "NetSuite",
    updated: "12 min ago",
  },
  {
    label: "EBITDA",
    value: "$12.9M",
    change: "Margin 12.6%, year to date",
    source: "NetSuite",
    updated: "12 min ago",
  },
  {
    label: "Operating Cash Flow",
    value: "$10.4M",
    change: "Year to date, after working capital",
    source: "NetSuite, bank feeds",
    updated: "26 min ago",
  },
  {
    label: "Cash Position",
    value: "$18.4M",
    change: "6 bank accounts, CAD equivalent",
    source: "TD and Chase bank feeds",
    updated: "26 min ago",
  },
  {
    label: "Days Sales Outstanding",
    value: "38 days",
    change: "Trailing 90 days",
    source: "NetSuite, Receivables",
    updated: "12 min ago",
  },
  {
    label: "Days Payable Outstanding",
    value: "44 days",
    change: "Trailing 90 days",
    source: "NetSuite, Payables",
    updated: "12 min ago",
  },
  {
    label: "Cash Conversion Cycle",
    value: "41 days",
    change: "DSO 38 + inventory 47 − DPO 44",
    source: "NetSuite, Treasury",
    updated: "26 min ago",
  },
  {
    label: "Close Time, October",
    value: "6 days",
    change: "Against an 8 day target",
    source: "Close workspace",
    updated: "Nov 7",
  },
  {
    label: "AP Due This Week",
    value: "$1.26M",
    change: "Across all three entities",
    source: "NetSuite, Payables",
    updated: "12 min ago",
  },
  {
    label: "AR Over 60 Days",
    value: "$842K",
    change: "Northern Build Supplies is the largest account",
    source: "NetSuite, Receivables",
    updated: "12 min ago",
  },
  {
    label: "Term Loan",
    value: "$12.0M",
    change: "Drawn in full",
    source: "Loan agreement, Treasury",
    updated: "26 min ago",
  },
  {
    label: "Leverage Covenant",
    value: "2.1x",
    change: "Maximum 3.0x, headroom 0.9x",
    source: "Lender compliance package",
    updated: "Nov 5",
  },
  {
    label: "November Close Progress",
    value: "18 of 64 tasks",
    change: "Early tasks, cutoffs start Nov 28",
    source: "Close workspace",
    updated: "9 min ago",
  },
  {
    label: "Open Intercompany Item",
    value: "$18,400",
    change: "JE-2026-1087 prepared, awaiting CFO approval",
    source: "Accounting workspace",
    updated: "9 min ago",
  },
];

export const performanceTrend = [
  { month: "May", revenue: 9.9, grossMargin: 40.6 },
  { month: "Jun", revenue: 10.1, grossMargin: 40.9 },
  { month: "Jul", revenue: 10.4, grossMargin: 41.0 },
  { month: "Aug", revenue: 10.6, grossMargin: 41.4 },
  { month: "Sep", revenue: 10.2, grossMargin: 41.1 },
  { month: "Oct", revenue: 9.8, grossMargin: 41.3 },
];

export const entityPerformance = [
  { entity: "Meridian Manufacturing", revenue: 58.4, grossProfit: 25.1 },
  { entity: "Meridian Logistics", revenue: 27.9, grossProfit: 10.6 },
  { entity: "Meridian Retail", revenue: 16.3, grossProfit: 6.6 },
];

export const moneyM = (n: number) => `$${n.toFixed(1)}M`;

export type LibraryReport = {
  id: string;
  name: string;
  category: string;
  description: string;
  period: string;
  owner: string;
  created: string;
  updated: string;
  access: string;
  status: "Final" | "Preliminary" | "Estimated";
  version: string;
  sources: string;
};

export const reportLibrary: LibraryReport[] = [
  {
    id: "RPT-301",
    name: "November Board Pack",
    category: "Executive",
    description: "Consolidated results on the October close: revenue, margin, cash, covenant and the open intercompany item.",
    period: "Oct 2026",
    owner: "Elena Brooks",
    created: "Nov 12, 2026",
    updated: "Nov 15, 2026",
    access: "Executives, Finance leadership",
    status: "Preliminary",
    version: "1.2",
    sources: "NetSuite, TD and Chase bank feeds",
  },
  {
    id: "RPT-302",
    name: "Lender Compliance Package",
    category: "Treasury",
    description: "Covenant calculations, compliance certificate and supporting schedules for the term loan lender.",
    period: "Q3 2026",
    owner: "Tom Alvarez",
    created: "Oct 08, 2026",
    updated: "Nov 05, 2026",
    access: "Treasury, CFO, Lender",
    status: "Final",
    version: "2.0",
    sources: "NetSuite, loan agreement DOC-1038",
  },
  {
    id: "RPT-303",
    name: "Audit PBC List",
    category: "Audit",
    description: "Prepared by client list for the FY2026 audit: what the auditors asked for, what is provided, and what is outstanding.",
    period: "FY2026",
    owner: "Marcus Webb",
    created: "Nov 03, 2026",
    updated: "Nov 14, 2026",
    access: "Accounting, Auditors",
    status: "Preliminary",
    version: "0.8",
    sources: "NetSuite, Documents",
  },
  {
    id: "RPT-304",
    name: "Entity Financials: Meridian Manufacturing",
    category: "Entity",
    description: "Income statement, balance sheet and margin bridge for the Toronto manufacturing entity.",
    period: "Oct 2026",
    owner: "Daniel Okafor",
    created: "Nov 07, 2026",
    updated: "Nov 08, 2026",
    access: "Finance, Executives",
    status: "Final",
    version: "1.0",
    sources: "NetSuite",
  },
  {
    id: "RPT-305",
    name: "Entity Financials: Meridian Logistics",
    category: "Entity",
    description: "Income statement and balance sheet for the Columbus entity, USD with CAD translation.",
    period: "Oct 2026",
    owner: "Daniel Okafor",
    created: "Nov 07, 2026",
    updated: "Nov 08, 2026",
    access: "Finance, Executives",
    status: "Final",
    version: "1.0",
    sources: "NetSuite",
  },
  {
    id: "RPT-306",
    name: "Entity Financials: Meridian Retail",
    category: "Entity",
    description: "Income statement and balance sheet for the Vancouver retail entity, prepared from QuickBooks during migration.",
    period: "Oct 2026",
    owner: "Daniel Okafor",
    created: "Nov 07, 2026",
    updated: "Nov 09, 2026",
    access: "Finance, Executives",
    status: "Preliminary",
    version: "0.9",
    sources: "QuickBooks (legacy, flagged in report)",
  },
  {
    id: "RPT-307",
    name: "Consolidated Financial Performance",
    category: "Finance",
    description: "Revenue, margin, EBITDA and cash flow against budget and prior year, with entity bridges.",
    period: "YTD Oct 2026",
    owner: "Elena Brooks",
    created: "Nov 08, 2026",
    updated: "Nov 12, 2026",
    access: "Finance, Executives",
    status: "Final",
    version: "2.1",
    sources: "NetSuite",
  },
  {
    id: "RPT-308",
    name: "Working Capital and Cash Conversion Review",
    category: "Finance",
    description: "DSO, DPO, inventory days and the cash conversion cycle, with the accounts driving each movement.",
    period: "Q3 2026",
    owner: "Tom Alvarez",
    created: "Oct 12, 2026",
    updated: "Oct 30, 2026",
    access: "Finance, Executives",
    status: "Final",
    version: "1.4",
    sources: "NetSuite, bank feeds",
  },
  {
    id: "RPT-309",
    name: "Budget vs Actual by Department",
    category: "Planning",
    description: "Department spend and headcount cost against the FY2026 budget, with forecast to year end.",
    period: "YTD Oct 2026",
    owner: "Grace Liu",
    created: "Nov 09, 2026",
    updated: "Nov 13, 2026",
    access: "Planning, Finance leadership",
    status: "Final",
    version: "1.1",
    sources: "NetSuite, Planning workspace",
  },
  {
    id: "RPT-310",
    name: "Intercompany Reconciliation Review",
    category: "Finance",
    description: "Intercompany balances by entity pair, with the $18,400 Manufacturing and Logistics difference traced to its cause.",
    period: "Oct 2026",
    owner: "Marcus Webb",
    created: "Nov 10, 2026",
    updated: "Nov 15, 2026",
    access: "Accounting, CFO",
    status: "Preliminary",
    version: "1.0",
    sources: "NetSuite",
  },
  {
    id: "RPT-311",
    name: "Close Performance Report",
    category: "Finance",
    description: "Close time by entity and task group for the last six closes, against the 8 day target.",
    period: "Oct 2026",
    owner: "Marcus Webb",
    created: "Nov 07, 2026",
    updated: "Nov 11, 2026",
    access: "Finance",
    status: "Final",
    version: "1.3",
    sources: "Close workspace",
  },
];

/*
 * Readable content for the in-app report preview, keyed by report id.
 * Opening a report shows its summary and headline figures in the workspace;
 * exporting to PDF, Excel or CSV stays available for anyone who needs the
 * file itself. Figures match the workspace KPI set above.
 */
export const reportContent: Record<
  string,
  { summary: string; figures: [string, string, string][] }
> = {
  "RPT-301": {
    summary:
      "The board pack on the October close. Revenue is ahead of budget for the year, gross margin is 0.8 points behind plan on Manufacturing input costs, and cash and covenant headroom are comfortable. One item is called out for the board: the $18,400 intercompany difference, its cause, and the correcting entry waiting on CFO approval.",
    figures: [
      ["Revenue, year to date", "$102.6M", "+3.2% vs budget"],
      ["Gross margin", "41.2%", "Year to date"],
      ["EBITDA", "$12.9M", "Margin 12.6%"],
      ["Cash position", "$18.4M", "6 bank accounts"],
    ],
  },
  "RPT-302": {
    summary:
      "The quarterly package for the term loan lender. Leverage is 2.1x against a 3.0x maximum, calculated on the definitions in the loan agreement, and the compliance certificate is signed by the Treasurer. The next test date is December 31, 2026.",
    figures: [
      ["Term loan", "$12.0M", "Drawn in full"],
      ["Leverage covenant", "2.1x", "Maximum 3.0x"],
      ["Covenant headroom", "0.9x", "At current EBITDA"],
      ["Cash position", "$18.4M", "CAD equivalent"],
    ],
  },
  "RPT-303": {
    summary:
      "The prepared by client list for the FY2026 audit. Most recurring items are already provided from NetSuite and Documents. Outstanding items are named with owners: the Retail trial balance support waits on the QuickBooks migration review, and two bank confirmations are with the banks.",
    figures: [
      ["Items requested", "148", "FY2026 audit"],
      ["Items provided", "121", "82% of the list"],
      ["Items outstanding", "27", "Owners named in the list"],
      ["Fieldwork starts", "Jan 2027", "Per engagement letter"],
    ],
  },
  "RPT-304": {
    summary:
      "Manufacturing is the group's margin engine and its current pressure point: revenue is ahead of budget, while steel and component costs have held gross margin below plan for three consecutive months. The margin bridge separates price, volume and input cost effects.",
    figures: [
      ["Revenue, year to date", "$58.4M", "Largest entity"],
      ["Gross profit, year to date", "$25.1M", "Margin 43.0%"],
      ["October revenue", "$5.6M", "Final, October close"],
      ["Open item", "Intercompany receivable $412,600", "See RPT-310"],
    ],
  },
  "RPT-305": {
    summary:
      "Logistics results are reported in USD and translated to CAD for consolidation. Volume grew through the fall peak. The entity carries the other side of the open intercompany item: a payable of $394,200 after conversion, against Manufacturing's receivable of $412,600.",
    figures: [
      ["Revenue, year to date", "$27.9M", "CAD translated"],
      ["Gross profit, year to date", "$10.6M", "Margin 38.0%"],
      ["Intercompany payable", "$394,200", "After conversion"],
      ["Difference vs Manufacturing", "$18,400", "FX revaluation, JE-2026-1087"],
    ],
  },
  "RPT-306": {
    summary:
      "Retail financials are prepared from QuickBooks while the entity migrates to NetSuite, and are labelled preliminary for that reason. The trial balance difference of $1,240 across 3 accounts found in the migration trial load is disclosed here rather than adjusted silently.",
    figures: [
      ["Revenue, year to date", "$16.3M", "Smallest entity"],
      ["Gross profit, year to date", "$6.6M", "Margin 40.5%"],
      ["Migration status", "Trial load", "Cutover Dec 12, 2026"],
      ["Trial balance difference", "$1,240", "3 accounts, under review"],
    ],
  },
  "RPT-307": {
    summary:
      "Consolidated performance for the year to October. Revenue growth is real and ahead of budget; profitability is slightly behind plan because Manufacturing input costs absorbed most of the price increases taken in the spring. Operating cash flow trails EBITDA on the receivables build described in RPT-308.",
    figures: [
      ["Revenue, year to date", "$102.6M", "+3.2% vs budget"],
      ["Gross margin", "41.2%", "0.8 pts behind plan"],
      ["EBITDA", "$12.9M", "Margin 12.6%"],
      ["Operating cash flow", "$10.4M", "Year to date"],
    ],
  },
  "RPT-308": {
    summary:
      "The cash conversion cycle is 41 days. Receivables are the lever: DSO rose as two large customers slowed payment, and $842K now sits over 60 days. Payables are stable at 44 days, inside the terms agreed with major suppliers.",
    figures: [
      ["Days sales outstanding", "38 days", "Trailing 90 days"],
      ["Days payable outstanding", "44 days", "Trailing 90 days"],
      ["Cash conversion cycle", "41 days", "DSO 38 + inventory 47 − DPO 44"],
      ["AR over 60 days", "$842K", "Named accounts in report body"],
    ],
  },
  "RPT-309": {
    summary:
      "Department spend is close to budget in aggregate, with two exceptions: Manufacturing overtime ran ahead of plan through the fall peak, and freight cost in Logistics tracked the volume increase. The forecast to year end holds the full year EBITDA margin at 12.6% if input costs stay flat.",
    figures: [
      ["Revenue, year to date", "$102.6M", "+3.2% vs budget"],
      ["Departments over budget", "2", "Manufacturing, Logistics"],
      ["FY2027 budget revenue", "$128.0M", "In Planning review"],
      ["Forecast review", "FR-2026-011", "At approval stage"],
    ],
  },
  "RPT-310": {
    summary:
      "All intercompany pairs reconcile except one. Manufacturing carries a receivable of $412,600 from Logistics; Logistics carries the payable at $394,200 after conversion. Alfie traced the $18,400 gap to a missing October 31 FX revaluation on the USD balance and prepared JE-2026-1087 to correct it. The entry is above the $10,000 post-close threshold, so it needs CFO approval after Controller review.",
    figures: [
      ["Intercompany receivable, Manufacturing", "$412,600", "CAD"],
      ["Intercompany payable, Logistics", "$394,200", "After conversion"],
      ["Difference", "$18,400", "Missing Oct 31 FX revaluation"],
      ["Correcting entry", "JE-2026-1087", "Awaiting CFO approval"],
    ],
  },
  "RPT-311": {
    summary:
      "October closed in 6 days against the 8 day target, the third consecutive improvement. Reconciliations and the intercompany review are now the long pole: both finished on day 5, and the open post-close adjustment shows why the intercompany step needs to move earlier in the calendar.",
    figures: [
      ["October close", "6 days", "Target 8 days"],
      ["Tasks in the close", "64", "Across 3 entities"],
      ["November progress", "18 of 64 tasks", "Cutoffs start Nov 28"],
      ["Post-close adjustments open", "1", "JE-2026-1087"],
    ],
  },
};

export const reportCategories = [
  "All categories",
  "Executive",
  "Finance",
  "Entity",
  "Treasury",
  "Audit",
  "Planning",
];

export const scheduledReports = [
  {
    name: "Daily Cash Position Summary",
    schedule: "Daily, 7:30 AM",
    recipients: "Treasury group",
    nextRun: "Tomorrow, 7:30 AM",
    lastRun: "Today, Completed and delivered",
    review: "No review, internal",
  },
  {
    name: "Weekly Working Capital Review",
    schedule: "Weekly, Monday 8:00 AM",
    recipients: "Finance leadership",
    nextRun: "Monday, 8:00 AM",
    lastRun: "Monday, Completed and delivered",
    review: "No review",
  },
  {
    name: "Monthly Board Pack",
    schedule: "Monthly, 8th business day",
    recipients: "Executive Management, Board",
    nextRun: "Dec 10, 2026",
    lastRun: "Nov 12, Completed, awaiting CFO review before board distribution",
    review: "CFO review required",
  },
  {
    name: "Quarterly Lender Compliance Package",
    schedule: "Quarterly, 15th business day",
    recipients: "Term loan lender, CFO",
    nextRun: "Jan 21, 2027",
    lastRun: "Nov 05, Completed and delivered",
    review: "Treasurer and CFO review",
  },
  {
    name: "Monthly Entity Financials",
    schedule: "Monthly, 6th business day",
    recipients: "Finance Team",
    nextRun: "Dec 08, 2026",
    lastRun:
      "Nov run completed with a data warning: Meridian Retail figures come from QuickBooks during migration and are flagged in the report",
    review: "Controller review",
  },
];

export const reportAudit = [
  {
    time: "Nov 15, 09:20",
    actor: "Elena Brooks",
    action: "Report refreshed",
    detail: "RPT-301 November Board Pack, refreshed as version 1.2, original preserved",
  },
  {
    time: "Nov 14, 08:15",
    actor: "Tom Alvarez",
    action: "Report exported",
    detail: "RPT-302 Lender Compliance Package exported to PDF for the lender",
  },
  {
    time: "Nov 13, 15:40",
    actor: "Grace Liu",
    action: "Report created",
    detail: "RPT-309 Budget vs Actual by Department, from the report builder",
  },
  {
    time: "Nov 12, 11:02",
    actor: "System",
    action: "Scheduled run completed",
    detail: "Daily Cash Position Summary delivered to the Treasury group",
  },
  {
    time: "Nov 10, 10:18",
    actor: "Marcus Webb",
    action: "Report shared",
    detail: "RPT-310 Intercompany Reconciliation Review shared as a live report with the CFO",
  },
];

export const executiveTargets = [
  { metric: "Revenue, Year to Date", actual: "$102.6M", target: "$99.4M budget", status: "Ahead" },
  { metric: "Gross Margin", actual: "41.2%", target: "42.0%", status: "Behind" },
  { metric: "EBITDA Margin", actual: "12.6%", target: "13.0%", status: "Behind" },
  { metric: "Close Time", actual: "6 days", target: "8 days", status: "Ahead" },
  { metric: "Days Sales Outstanding", actual: "38 days", target: "35 days", status: "Behind" },
];
