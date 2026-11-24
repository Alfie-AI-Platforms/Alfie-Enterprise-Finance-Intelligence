import type { LibraryReport, ReportKpi } from "@/lib/worlds/enterprise/reports-data";

export type { LibraryReport, ReportKpi } from "@/lib/worlds/enterprise/reports-data";

export const reportKpis: ReportKpi[] = [
  {
    label: "Revenue, Year to Date",
    value: "$389.4M",
    change: "+10.4% vs budget of $352.6M",
    source: "SAP S/4HANA",
    updated: "12 min ago",
  },
  {
    label: "Revenue, October",
    value: "$41.5M",
    change: "Final, October close",
    source: "SAP S/4HANA",
    updated: "12 min ago",
  },
  {
    label: "Gross Margin",
    value: "44.6%",
    change: "Year to date, all sites",
    source: "SAP S/4HANA",
    updated: "12 min ago",
  },
  {
    label: "EBITDA",
    value: "$172.8M",
    change: "Margin 44.4%, year to date",
    source: "SAP S/4HANA",
    updated: "12 min ago",
  },
  {
    label: "Operating Cash Flow",
    value: "$156.2M",
    change: "Year to date, after working capital",
    source: "SAP S/4HANA, bank feeds",
    updated: "26 min ago",
  },
  {
    label: "Cash Position",
    value: "$58.6M",
    change: "7 bank accounts, CAD equivalent",
    source: "RBC and Wells Fargo bank feeds",
    updated: "26 min ago",
  },
  {
    label: "Production, Year to Date",
    value: "71,380 oz",
    change: "Gold, Keno Ridge and Sagebrush",
    source: "SAP S/4HANA, site reports",
    updated: "12 min ago",
  },
  {
    label: "All-in Sustaining Cost",
    value: "US$1,588 per oz",
    change: "Budget US$1,540 per oz",
    source: "Site cost reports",
    updated: "12 min ago",
  },
  {
    label: "Days Sales Outstanding",
    value: "14 days",
    change: "Refinery settlement terms",
    source: "SAP S/4HANA, Receivables",
    updated: "12 min ago",
  },
  {
    label: "Close Time, October",
    value: "9 days",
    change: "Against a 10 day target",
    source: "Close workspace",
    updated: "Nov 12",
  },
  {
    label: "AP Due This Week",
    value: "$3.46M",
    change: "Across both mines and corporate",
    source: "SAP S/4HANA, Payables",
    updated: "12 min ago",
  },
  {
    label: "AR Over 60 Days",
    value: "$196K",
    change: "One refinery lot under an assay dispute",
    source: "SAP S/4HANA, Receivables",
    updated: "12 min ago",
  },
  {
    label: "Project Facility, Copperline",
    value: "$63.4M drawn",
    change: "Facility $150.0M, revolver $75.0M undrawn",
    source: "Loan agreements, Treasury",
    updated: "26 min ago",
  },
  {
    label: "Debt to EBITDA Covenant",
    value: "0.4x",
    change: "Maximum 2.5x, headroom 2.1x",
    source: "Lender compliance package",
    updated: "Nov 5",
  },
  {
    label: "November Close Progress",
    value: "12 of 71 tasks",
    change: "Early tasks, cutoffs start Nov 28",
    source: "Close workspace",
    updated: "9 min ago",
  },
  {
    label: "Open JV Item",
    value: "$253,500",
    change: "JE-2026-0874 prepared, awaiting CFO approval",
    source: "Accounting workspace",
    updated: "9 min ago",
  },
];

export const performanceTrend = [
  { month: "May", revenue: 39.6, grossMargin: 44.9 },
  { month: "Jun", revenue: 40.1, grossMargin: 45.1 },
  { month: "Jul", revenue: 40.8, grossMargin: 45.4 },
  { month: "Aug", revenue: 41.2, grossMargin: 45.6 },
  { month: "Sep", revenue: 42.2, grossMargin: 46.2 },
  { month: "Oct", revenue: 41.5, grossMargin: 45.9 },
];

export const entityPerformance = [
  { entity: "Aurora Ridge Mining (Keno Ridge)", revenue: 246.8, grossProfit: 115.5 },
  { entity: "Aurora Ridge USA (Sagebrush)", revenue: 142.6, grossProfit: 58.2 },
];

export const moneyM = (n: number) => `$${n.toFixed(1)}M`;

export const reportLibrary: LibraryReport[] = [
  {
    id: "RPT-301",
    name: "November Board Pack",
    category: "Executive",
    description: "Consolidated results on the October close: revenue, margin, production, cash and the open Copperline JV item.",
    period: "Oct 2026",
    owner: "Claire Dubois",
    created: "Nov 12, 2026",
    updated: "Nov 15, 2026",
    access: "Executives, Finance leadership",
    status: "Preliminary",
    version: "1.2",
    sources: "SAP S/4HANA, RBC and Wells Fargo bank feeds",
  },
  {
    id: "RPT-302",
    name: "Lender Compliance Package",
    category: "Treasury",
    description: "Covenant calculations, compliance certificate and project facility schedules for the lenders.",
    period: "Q3 2026",
    owner: "Angela Ruiz",
    created: "Oct 08, 2026",
    updated: "Nov 05, 2026",
    access: "Treasury, CFO, Lender",
    status: "Final",
    version: "2.0",
    sources: "SAP S/4HANA, facility agreements",
  },
  {
    id: "RPT-303",
    name: "Audit PBC List",
    category: "Audit",
    description: "Prepared by client list for the FY2026 audit: what the auditors asked for, what is provided, and what is outstanding.",
    period: "FY2026",
    owner: "Nadia Hassan",
    created: "Nov 03, 2026",
    updated: "Nov 14, 2026",
    access: "Accounting, Auditors",
    status: "Preliminary",
    version: "0.8",
    sources: "SAP S/4HANA, Documents",
  },
  {
    id: "RPT-304",
    name: "Site Financials: Keno Ridge Mine",
    category: "Entity",
    description: "Income statement, balance sheet and cost per ounce for the Timmins mine.",
    period: "Oct 2026",
    owner: "Peter Lindqvist",
    created: "Nov 07, 2026",
    updated: "Nov 08, 2026",
    access: "Finance, Executives",
    status: "Final",
    version: "1.0",
    sources: "SAP S/4HANA",
  },
  {
    id: "RPT-305",
    name: "Site Financials: Sagebrush Mine",
    category: "Entity",
    description: "Income statement and balance sheet for the Nevada mine, USD with CAD translation, prepared with Sage 300 data ahead of the SAP migration.",
    period: "Oct 2026",
    owner: "Nadia Hassan",
    created: "Nov 07, 2026",
    updated: "Nov 09, 2026",
    access: "Finance, Executives",
    status: "Preliminary",
    version: "0.9",
    sources: "Sage 300 (legacy, flagged in report)",
  },
  {
    id: "RPT-306",
    name: "Copperline JV Reporting Pack",
    category: "Entity",
    description: "Aurora Ridge's 40% share of joint venture costs, cash calls and the operator statement reconciliation.",
    period: "Oct 2026",
    owner: "Nadia Hassan",
    created: "Nov 10, 2026",
    updated: "Nov 15, 2026",
    access: "Finance, Executives",
    status: "Preliminary",
    version: "1.0",
    sources: "Operator statements, SAP S/4HANA",
  },
  {
    id: "RPT-307",
    name: "Consolidated Financial Performance",
    category: "Finance",
    description: "Revenue, margin, EBITDA and cash flow against budget and prior year, with site bridges.",
    period: "YTD Oct 2026",
    owner: "Claire Dubois",
    created: "Nov 08, 2026",
    updated: "Nov 12, 2026",
    access: "Finance, Executives",
    status: "Final",
    version: "2.1",
    sources: "SAP S/4HANA",
  },
  {
    id: "RPT-308",
    name: "Q3 Technical Report Cost Schedules",
    category: "Finance",
    description: "Cost schedules supporting the Q3 technical report: production, the AISC build and capex by project.",
    period: "Q3 2026",
    owner: "George Mensah",
    created: "Oct 12, 2026",
    updated: "Oct 30, 2026",
    access: "Finance, Executives",
    status: "Final",
    version: "1.4",
    sources: "SAP S/4HANA, site cost reports",
  },
  {
    id: "RPT-309",
    name: "Budget vs Actual by Site",
    category: "Planning",
    description: "Site revenue, margin and unit costs against the FY2026 budget, with forecast to year end.",
    period: "YTD Oct 2026",
    owner: "George Mensah",
    created: "Nov 09, 2026",
    updated: "Nov 13, 2026",
    access: "Planning, Finance leadership",
    status: "Final",
    version: "1.1",
    sources: "SAP S/4HANA, Planning workspace",
  },
  {
    id: "RPT-310",
    name: "JV Operator Statement Reconciliation",
    category: "Finance",
    description: "The October Copperline statement from Kestrel Resources against Aurora Ridge's accrual, with the $253,500 difference traced to its causes.",
    period: "Oct 2026",
    owner: "Nadia Hassan",
    created: "Nov 10, 2026",
    updated: "Nov 15, 2026",
    access: "Accounting, CFO",
    status: "Preliminary",
    version: "1.0",
    sources: "Operator statements",
  },
  {
    id: "RPT-311",
    name: "Close Performance Report",
    category: "Finance",
    description: "Close time by site and task group for the last six closes, against the 10 day target.",
    period: "Oct 2026",
    owner: "Peter Lindqvist",
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
      "The board pack on the October close. Revenue is 10.4% ahead of budget for the year on the gold price, production is close to plan, and cash is strong. Two items are called out for the board: AISC above budget at Sagebrush, and the $253,500 Copperline JV statement difference, its causes, and the correcting entry waiting on CFO approval.",
    figures: [
      ["Revenue, year to date", "$389.4M", "+10.4% vs budget"],
      ["Gross margin", "44.6%", "Year to date"],
      ["EBITDA", "$172.8M", "Margin 44.4%"],
      ["Cash position", "$58.6M", "7 bank accounts"],
    ],
  },
  "RPT-302": {
    summary:
      "The quarterly package for the project facility and revolving lenders. Total debt to EBITDA is 0.4x against a 2.5x maximum, calculated on the definitions in the facility agreements, and the compliance certificate is signed by the Treasurer. The next test date is December 31, 2026.",
    figures: [
      ["Project facility drawn", "$63.4M", "Facility $150.0M"],
      ["Debt to EBITDA", "0.4x", "Maximum 2.5x"],
      ["Revolving facility", "$75.0M", "Undrawn"],
      ["Cash position", "$58.6M", "CAD equivalent"],
    ],
  },
  "RPT-303": {
    summary:
      "The prepared by client list for the FY2026 audit. Most recurring items are already provided from SAP S/4HANA and Documents. Outstanding items are named with owners: the Sagebrush cost support waits on the Sage 300 review, the assay certificates for the disputed refinery lot are with Cascade Refining, and two bank confirmations are with the banks.",
    figures: [
      ["Items requested", "156", "FY2026 audit"],
      ["Items provided", "118", "76% of the list"],
      ["Items outstanding", "38", "Owners named in the list"],
      ["Fieldwork starts", "Jan 2027", "Per engagement letter"],
    ],
  },
  "RPT-304": {
    summary:
      "Keno Ridge is the group's production and margin engine: grades ran strong through the fall and the site is ahead of budget on revenue and margin. The site carries a 2.0% net smelter return royalty held by Cobalt Royalties Inc., accrued monthly on production.",
    figures: [
      ["Revenue, year to date", "$246.8M", "Largest site"],
      ["Gross profit, year to date", "$115.5M", "Margin 46.8%"],
      ["Realized price", "US$4,072 per oz", "Group, year to date"],
      ["NSR royalty", "2.0%", "Cobalt Royalties Inc."],
    ],
  },
  "RPT-305": {
    summary:
      "Sagebrush financials are prepared with Sage 300 data while the mine migrates to SAP S/4HANA, and are labelled preliminary for that reason. Unit costs are the site's pressure point: diesel and contract mining rates have held AISC above budget. The mine carries a 3.0% net smelter return royalty plus the Nevada Net Proceeds of Minerals tax at 5%.",
    figures: [
      ["Revenue, year to date", "$142.6M", "CAD translated"],
      ["Gross profit, year to date", "$58.2M", "Margin 40.8%"],
      ["NSR royalty", "3.0%", "Plus Nevada Net Proceeds tax at 5%"],
      ["Migration status", "Sage 300 to SAP", "Cutover Mar 8, 2027"],
    ],
  },
  "RPT-306": {
    summary:
      "The Copperline reporting pack covers Aurora Ridge's 40% non-operated share of the development project, with Kestrel Resources as operator. October is the open month: the operator statement shows the share of costs at $4,218,000 against an accrual of $3,964,500, and the $253,500 difference is traced in RPT-310. Cash calls and the drawdown position on the $150.0M project facility are shown with the pack.",
    figures: [
      ["Operator statement share", "$4,218,000", "Kestrel Resources, October"],
      ["Accrued share", "$3,964,500", "Aurora Ridge accrual"],
      ["Difference", "$253,500", "Two causes traced"],
      ["Correcting entry", "JE-2026-0874", "Awaiting CFO approval"],
    ],
  },
  "RPT-307": {
    summary:
      "Consolidated performance for the year to October. The revenue beat is price: the realized price of US$4,072 per oz ran ahead of the budget deck all year, while production of 71,380 oz is close to plan. Profitability carries the offset at Sagebrush, where unit costs rose on diesel and contract rates. Operating cash flow trails EBITDA on Copperline cash calls.",
    figures: [
      ["Revenue, year to date", "$389.4M", "+10.4% vs budget"],
      ["Gross margin", "44.6%", "Year to date"],
      ["EBITDA", "$172.8M", "Margin 44.4%"],
      ["Operating cash flow", "$156.2M", "Year to date"],
    ],
  },
  "RPT-308": {
    summary:
      "The cost schedules behind the Q3 technical report. Production year to date is 71,380 oz of gold. The AISC build shows site operating costs, royalties, sustaining capex and corporate allocation per ounce, and capex is split between sustaining programs at the two mines and growth spending at Copperline.",
    figures: [
      ["Production, year to date", "71,380 oz", "Gold"],
      ["All-in sustaining cost", "US$1,588 per oz", "Budget US$1,540 per oz"],
      ["Capex, year to date", "$97.2M", "Sustaining $38.6M, growth $58.6M"],
      ["Copperline capex", "$51.2M", "Of the growth total"],
    ],
  },
  "RPT-309": {
    summary:
      "Both mines are ahead of budget on revenue, Keno Ridge by $22.3M and Sagebrush by $14.5M, entirely on price. The forecast to year end carries the guidance raise in FR-2026-008 and holds AISC at the current run rate rather than assuming the Sagebrush cost pressure away.",
    figures: [
      ["Revenue, year to date", "$389.4M", "+10.4% vs budget"],
      ["Sites ahead of budget", "2", "Keno Ridge, Sagebrush"],
      ["FY2027 budget revenue", "$428.0M", "In Planning review"],
      ["Forecast review", "FR-2026-008", "At approval stage"],
    ],
  },
  "RPT-310": {
    summary:
      "All October JV lines agree except two. The camp and catering line was billed at 100% of cost on one invoice instead of Aurora Ridge's 40% share, overstating the share by $186,000, and an October diesel accrual of $67,500 at the project is missing from the statement. Alfie prepared JE-2026-0874 to correct the accrual and drafted a query letter to Kestrel Resources. The entry is above the $10,000 post-close threshold, so it needs CFO approval after Controller review.",
    figures: [
      ["Operator statement share", "$4,218,000", "Kestrel Resources, October"],
      ["Accrued share", "$3,964,500", "Aurora Ridge accrual"],
      ["Camp and catering overbilling", "$186,000", "Billed at 100%, share is 40%"],
      ["Missing diesel accrual", "$67,500", "October, at the project"],
    ],
  },
  "RPT-311": {
    summary:
      "October closed in 9 days against the 10 day target. Sagebrush reporting is the long pole: its spreadsheet based cost reports finished on day 7, and the JV statement review needs to move earlier in the calendar, as the open post-close adjustment shows.",
    figures: [
      ["October close", "9 days", "Target 10 days"],
      ["Tasks in the close", "71", "Across both mines, corporate and the JV"],
      ["November progress", "12 of 71 tasks", "Cutoffs start Nov 28"],
      ["Post-close adjustments open", "1", "JE-2026-0874"],
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
    name: "Weekly Production and Working Capital Review",
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
    nextRun: "Dec 11, 2026",
    lastRun: "Nov 12, Completed, awaiting CFO review before board distribution",
    review: "CFO review required",
  },
  {
    name: "Quarterly Lender Compliance Package",
    schedule: "Quarterly, 15th business day",
    recipients: "Project facility lenders, CFO",
    nextRun: "Jan 21, 2027",
    lastRun: "Nov 05, Completed and delivered",
    review: "Treasurer and CFO review",
  },
  {
    name: "Monthly Site Financials",
    schedule: "Monthly, 6th business day",
    recipients: "Finance Team",
    nextRun: "Dec 08, 2026",
    lastRun:
      "Nov run completed with a data warning: Sagebrush figures come from Sage 300 during migration and are flagged in the report",
    review: "Controller review",
  },
];

export const reportAudit = [
  {
    time: "Nov 15, 09:20",
    actor: "Claire Dubois",
    action: "Report refreshed",
    detail: "RPT-301 November Board Pack, refreshed as version 1.2, original preserved",
  },
  {
    time: "Nov 14, 08:15",
    actor: "Angela Ruiz",
    action: "Report exported",
    detail: "RPT-302 Lender Compliance Package exported to PDF for the lenders",
  },
  {
    time: "Nov 13, 15:40",
    actor: "George Mensah",
    action: "Report created",
    detail: "RPT-309 Budget vs Actual by Site, from the report builder",
  },
  {
    time: "Nov 12, 11:02",
    actor: "System",
    action: "Scheduled run completed",
    detail: "Daily Cash Position Summary delivered to the Treasury group",
  },
  {
    time: "Nov 10, 10:18",
    actor: "Nadia Hassan",
    action: "Report shared",
    detail: "RPT-310 JV Operator Statement Reconciliation shared as a live report with the CFO",
  },
];

export const executiveTargets = [
  { metric: "Revenue, Year to Date", actual: "$389.4M", target: "$352.6M budget", status: "Ahead" },
  { metric: "Gross Margin", actual: "44.6%", target: "44.0%", status: "Ahead" },
  { metric: "All-in Sustaining Cost", actual: "US$1,588 per oz", target: "US$1,540 per oz budget", status: "Behind" },
  { metric: "Production, Year to Date", actual: "71,380 oz", target: "70,000 oz plan", status: "Ahead" },
  { metric: "Close Time", actual: "9 days", target: "10 days", status: "Ahead" },
];
