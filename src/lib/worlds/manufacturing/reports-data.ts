import type { LibraryReport, ReportKpi } from "@/lib/worlds/enterprise/reports-data";

export type { LibraryReport, ReportKpi } from "@/lib/worlds/enterprise/reports-data";

export const reportKpis: ReportKpi[] = [
  {
    label: "Revenue, Year to Date",
    value: "$139.2M",
    change: "-2.5% vs budget of $142.8M",
    source: "Epicor Kinetic",
    updated: "12 min ago",
  },
  {
    label: "Revenue, October",
    value: "$14.6M",
    change: "Final, October close",
    source: "Epicor Kinetic",
    updated: "12 min ago",
  },
  {
    label: "Gross Margin",
    value: "26.8%",
    change: "Year to date, vs 29.0% budget",
    source: "Epicor Kinetic",
    updated: "12 min ago",
  },
  {
    label: "EBITDA",
    value: "$13.2M",
    change: "Margin 9.5%, year to date",
    source: "Epicor Kinetic",
    updated: "12 min ago",
  },
  {
    label: "Operating Cash Flow",
    value: "$7.4M",
    change: "Year to date, after working capital",
    source: "Epicor Kinetic, bank feeds",
    updated: "26 min ago",
  },
  {
    label: "Cash Position",
    value: "$9.6M",
    change: "5 bank accounts, CAD equivalent",
    source: "TD and Chase bank feeds",
    updated: "26 min ago",
  },
  {
    label: "Inventory Turns",
    value: "4.1x",
    change: "Inventory $31.6M across 3 plants",
    source: "Epicor Kinetic",
    updated: "12 min ago",
  },
  {
    label: "Days Sales Outstanding",
    value: "43 days",
    change: "Trailing 90 days",
    source: "Epicor Kinetic, Receivables",
    updated: "12 min ago",
  },
  {
    label: "Days Payable Outstanding",
    value: "37 days",
    change: "Trailing 90 days",
    source: "Epicor Kinetic, Payables",
    updated: "12 min ago",
  },
  {
    label: "Close Time, October",
    value: "7 days",
    change: "Against an 8 day target",
    source: "Close workspace",
    updated: "Nov 10",
  },
  {
    label: "AP Due This Week",
    value: "$1.87M",
    change: "Across all three plants",
    source: "Epicor Kinetic, Payables",
    updated: "12 min ago",
  },
  {
    label: "AR Over 60 Days",
    value: "$688K",
    change: "AgriCore Equipment is the largest account",
    source: "Epicor Kinetic, Receivables",
    updated: "12 min ago",
  },
  {
    label: "Term Loan",
    value: "$18.5M",
    change: "Equipment loans a further $6.4M",
    source: "Loan agreements, Treasury",
    updated: "26 min ago",
  },
  {
    label: "Fixed Charge Coverage Covenant",
    value: "1.32x",
    change: "Minimum 1.20x, headroom 0.12x",
    source: "Lender compliance package",
    updated: "Nov 5",
  },
  {
    label: "November Close Progress",
    value: "15 of 58 tasks",
    change: "Early tasks, cutoffs start Nov 28",
    source: "Close workspace",
    updated: "9 min ago",
  },
  {
    label: "Open Standard Cost Item",
    value: "$318,000",
    change: "JE-2026-1142 prepared, awaiting CFO approval",
    source: "Accounting workspace",
    updated: "9 min ago",
  },
];

export const performanceTrend = [
  { month: "May", revenue: 15.1, grossMargin: 28.5 },
  { month: "Jun", revenue: 14.6, grossMargin: 27.7 },
  { month: "Jul", revenue: 13.9, grossMargin: 25.6 },
  { month: "Aug", revenue: 13.8, grossMargin: 25.0 },
  { month: "Sep", revenue: 13.0, grossMargin: 24.2 },
  { month: "Oct", revenue: 14.6, grossMargin: 23.5 },
];

export const entityPerformance = [
  { entity: "Northline Precision", revenue: 72.6, grossProfit: 19.9 },
  { entity: "Northline Fabrication", revenue: 38.9, grossProfit: 9.6 },
  { entity: "Northline Assembly", revenue: 27.7, grossProfit: 7.7 },
];

export const moneyM = (n: number) => `$${n.toFixed(1)}M`;

export const reportLibrary: LibraryReport[] = [
  {
    id: "RPT-301",
    name: "November Board Pack",
    category: "Executive",
    description: "Consolidated results on the October close: revenue, margin, cash, covenant and the open standard cost item.",
    period: "Oct 2026",
    owner: "Sarah Mitchell",
    created: "Nov 12, 2026",
    updated: "Nov 15, 2026",
    access: "Executives, Finance leadership",
    status: "Preliminary",
    version: "1.2",
    sources: "Epicor Kinetic, TD and Chase bank feeds",
  },
  {
    id: "RPT-302",
    name: "Lender Compliance Package",
    category: "Treasury",
    description: "Covenant calculations, compliance certificate and supporting schedules for the term loan and equipment loan lenders.",
    period: "Q3 2026",
    owner: "Mark Feldman",
    created: "Oct 08, 2026",
    updated: "Nov 05, 2026",
    access: "Treasury, CFO, Lender",
    status: "Final",
    version: "2.0",
    sources: "Epicor Kinetic, loan agreements",
  },
  {
    id: "RPT-303",
    name: "Audit PBC List",
    category: "Audit",
    description: "Prepared by client list for the FY2026 audit: what the auditors asked for, what is provided, and what is outstanding.",
    period: "FY2026",
    owner: "Priya Nair",
    created: "Nov 03, 2026",
    updated: "Nov 14, 2026",
    access: "Accounting, Auditors",
    status: "Preliminary",
    version: "0.8",
    sources: "Epicor Kinetic, Documents",
  },
  {
    id: "RPT-304",
    name: "Plant Financials: Northline Precision",
    category: "Entity",
    description: "Income statement, balance sheet and margin bridge for the Guelph plant.",
    period: "Oct 2026",
    owner: "Anita Roy",
    created: "Nov 07, 2026",
    updated: "Nov 08, 2026",
    access: "Finance, Executives",
    status: "Final",
    version: "1.0",
    sources: "Epicor Kinetic",
  },
  {
    id: "RPT-305",
    name: "Plant Financials: Northline Fabrication",
    category: "Entity",
    description: "Income statement and balance sheet for the Drummondville plant.",
    period: "Oct 2026",
    owner: "Lucas Meyer",
    created: "Nov 07, 2026",
    updated: "Nov 08, 2026",
    access: "Finance, Executives",
    status: "Final",
    version: "1.0",
    sources: "Epicor Kinetic, Plex MES",
  },
  {
    id: "RPT-306",
    name: "Plant Financials: Northline Assembly",
    category: "Entity",
    description: "Income statement and balance sheet for the Fort Wayne plant, USD with CAD translation, prepared from Sage 300 ahead of the Epicor migration.",
    period: "Oct 2026",
    owner: "Priya Nair",
    created: "Nov 07, 2026",
    updated: "Nov 09, 2026",
    access: "Finance, Executives",
    status: "Preliminary",
    version: "0.9",
    sources: "Sage 300 (legacy, flagged in report)",
  },
  {
    id: "RPT-307",
    name: "Consolidated Financial Performance",
    category: "Finance",
    description: "Revenue, margin, EBITDA and cash flow against budget and prior year, with plant bridges.",
    period: "YTD Oct 2026",
    owner: "Sarah Mitchell",
    created: "Nov 08, 2026",
    updated: "Nov 12, 2026",
    access: "Finance, Executives",
    status: "Final",
    version: "2.1",
    sources: "Epicor Kinetic",
  },
  {
    id: "RPT-308",
    name: "Working Capital and Inventory Review",
    category: "Finance",
    description: "DSO, DPO, inventory by category and turns, with the accounts and product families driving each movement.",
    period: "Q3 2026",
    owner: "Mark Feldman",
    created: "Oct 12, 2026",
    updated: "Oct 30, 2026",
    access: "Finance, Executives",
    status: "Final",
    version: "1.4",
    sources: "Epicor Kinetic, bank feeds",
  },
  {
    id: "RPT-309",
    name: "Budget vs Actual by Plant",
    category: "Planning",
    description: "Plant revenue, margin and cost against the FY2026 budget, with forecast to year end.",
    period: "YTD Oct 2026",
    owner: "Julia Santos",
    created: "Nov 09, 2026",
    updated: "Nov 13, 2026",
    access: "Planning, Finance leadership",
    status: "Final",
    version: "1.1",
    sources: "Epicor Kinetic, Planning workspace",
  },
  {
    id: "RPT-310",
    name: "Standard Cost Variance Review",
    category: "Finance",
    description: "Variance bridge for the Series 400 gear housing family: price, usage and labour, with the $318,000 inventory and COGS true-up.",
    period: "Oct 2026",
    owner: "Lucas Meyer",
    created: "Nov 10, 2026",
    updated: "Nov 15, 2026",
    access: "Accounting, CFO",
    status: "Preliminary",
    version: "1.0",
    sources: "Epicor Kinetic, Plex MES",
  },
  {
    id: "RPT-311",
    name: "Close Performance Report",
    category: "Finance",
    description: "Close time by plant and task group for the last six closes, against the 8 day target.",
    period: "Oct 2026",
    owner: "Priya Nair",
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
      "The board pack on the October close. Revenue is 2.5% behind budget for the year, gross margin is 2.2 points behind plan on steel costs and Line 3 scrap, and cash and covenant headroom are adequate. One item is called out for the board: the $318,000 standard cost true-up on the Series 400 family, its causes, and the correcting entry waiting on CFO approval.",
    figures: [
      ["Revenue, year to date", "$139.2M", "-2.5% vs budget"],
      ["Gross margin", "26.8%", "Budget 29.0%"],
      ["EBITDA", "$13.2M", "Margin 9.5%"],
      ["Cash position", "$9.6M", "5 bank accounts"],
    ],
  },
  "RPT-302": {
    summary:
      "The quarterly package for the term loan and equipment loan lenders. Fixed charge coverage is 1.32x against a 1.20x minimum, calculated on the definitions in the loan agreements, and the compliance certificate is signed by the Treasurer. The next test date is December 31, 2026.",
    figures: [
      ["Term loan", "$18.5M", "Equipment loans $6.4M"],
      ["Fixed charge coverage", "1.32x", "Minimum 1.20x"],
      ["Covenant headroom", "0.12x", "At current EBITDA"],
      ["Cash position", "$9.6M", "CAD equivalent"],
    ],
  },
  "RPT-303": {
    summary:
      "The prepared by client list for the FY2026 audit. Most recurring items are already provided from Epicor Kinetic and Documents. Outstanding items are named with owners: the Plant 3 cost support waits on the Sage 300 review, and two bank confirmations are with the banks.",
    figures: [
      ["Items requested", "132", "FY2026 audit"],
      ["Items provided", "104", "79% of the list"],
      ["Items outstanding", "28", "Owners named in the list"],
      ["Fieldwork starts", "Jan 2027", "Per engagement letter"],
    ],
  },
  "RPT-304": {
    summary:
      "Precision is the group's largest plant and its current margin pressure point: revenue is behind budget on agricultural order timing, while steel costs and Line 3 scrap have held gross margin below plan since July. The margin bridge separates price, usage and labour effects on the Series 400 family.",
    figures: [
      ["Revenue, year to date", "$72.6M", "Largest plant"],
      ["Gross profit, year to date", "$19.9M", "Margin 27.4%"],
      ["October material variance", "$212,000 unfavourable", "Series 400 gear housings"],
      ["Open item", "JE-2026-1142, $318,000", "See RPT-310"],
    ],
  },
  "RPT-305": {
    summary:
      "Fabrication results are reported from Epicor Kinetic with production data from Plex MES. The MES sync is stale by 2 days, so the plant cost figures in this report are labelled as at the last successful sync rather than adjusted silently.",
    figures: [
      ["Revenue, year to date", "$38.9M", "Second plant"],
      ["Gross profit, year to date", "$9.6M", "Margin 24.8%"],
      ["MES sync", "Stale 2 days", "Plex MES, Plant 2"],
      ["Open item", "Payroll feed lag", "See Reconciliations"],
    ],
  },
  "RPT-306": {
    summary:
      "Assembly financials are prepared from Sage 300 while the plant migrates to Epicor Kinetic, and are labelled preliminary for that reason. The migration moves Plant 3 onto the group ERP at the February 12, 2027 cutover.",
    figures: [
      ["Revenue, year to date", "$27.7M", "USD translated"],
      ["Gross profit, year to date", "$7.7M", "Margin 27.9%"],
      ["Migration status", "Sage 300 to Epicor", "Cutover Feb 12, 2027"],
      ["Open item", "Authentication expired", "Spreadsheet uploads in use"],
    ],
  },
  "RPT-307": {
    summary:
      "Consolidated performance for the year to October. Revenue is behind budget on order timing at the two Canadian plants; profitability is further behind because steel costs absorbed the price increases taken in the spring. Operating cash flow trails EBITDA on the inventory build described in RPT-308.",
    figures: [
      ["Revenue, year to date", "$139.2M", "-2.5% vs budget"],
      ["Gross margin", "26.8%", "2.2 pts behind budget"],
      ["EBITDA", "$13.2M", "Margin 9.5%"],
      ["Operating cash flow", "$7.4M", "Year to date"],
    ],
  },
  "RPT-308": {
    summary:
      "Inventory is the working capital story: $31.6M is held across the three plants and turns are 4.1x. Finished goods built ahead of the agricultural season while orders deferred. Receivables are the second lever, with $688K over 60 days led by AgriCore Equipment.",
    figures: [
      ["Days sales outstanding", "43 days", "Trailing 90 days"],
      ["Days payable outstanding", "37 days", "Trailing 90 days"],
      ["Inventory", "$31.6M", "Raw $11.4M, WIP $6.9M, finished $13.3M"],
      ["Inventory turns", "4.1x", "Annualized"],
    ],
  },
  "RPT-309": {
    summary:
      "All three plants are behind budget on revenue, with Precision the largest gap at $2.3M. The forecast to year end carries the Q4 cut in FR-2026-021 and holds the full year EBITDA margin at 9.5% only if steel holds at current levels.",
    figures: [
      ["Revenue, year to date", "$139.2M", "-2.5% vs budget"],
      ["Plants behind budget", "3", "Precision, Fabrication, Assembly"],
      ["FY2027 budget revenue", "$152.0M", "In Planning review"],
      ["Forecast review", "FR-2026-021", "At approval stage"],
    ],
  },
  "RPT-310": {
    summary:
      "October material variance on the Series 400 gear housing family was $212,000 unfavourable. Alfie traced it to three causes: steel price (standard $1,040 per tonne against a $1,186 actual average since July), usage (scrap on Line 3 up from 2.1% to 3.4% after the August tooling change), and a smaller labour rate piece. Because the standards are stale, cost of goods sold is understated and inventory overstated by $318,000. JE-2026-1142 corrects it and is above the $10,000 post-close threshold, so it needs CFO approval after Controller review. The draft January standard revision (steel $1,175 per tonne, scrap factor 3.0%) is attached.",
    figures: [
      ["October material variance", "$212,000", "Unfavourable, Series 400"],
      ["Steel, standard vs actual", "$1,040 vs $1,186 per tonne", "Actual average since July"],
      ["Inventory and COGS true-up", "$318,000", "JE-2026-1142"],
      ["Margin overstatement", "2.3 pts", "AgriCore and Prairie Implement"],
    ],
  },
  "RPT-311": {
    summary:
      "October closed in 7 days against the 8 day target. Reconciliations and the standard cost review are now the long pole: both finished on day 6, and the open post-close adjustment shows why the costing step needs to move earlier in the calendar.",
    figures: [
      ["October close", "7 days", "Target 8 days"],
      ["Tasks in the close", "58", "Across 3 plants"],
      ["November progress", "15 of 58 tasks", "Cutoffs start Nov 28"],
      ["Post-close adjustments open", "1", "JE-2026-1142"],
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
    nextRun: "Dec 09, 2026",
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
    name: "Monthly Plant Financials",
    schedule: "Monthly, 6th business day",
    recipients: "Finance Team",
    nextRun: "Dec 08, 2026",
    lastRun:
      "Nov run completed with a data warning: Northline Assembly figures come from Sage 300 during migration and are flagged in the report",
    review: "Controller review",
  },
];

export const reportAudit = [
  {
    time: "Nov 15, 09:20",
    actor: "Sarah Mitchell",
    action: "Report refreshed",
    detail: "RPT-301 November Board Pack, refreshed as version 1.2, original preserved",
  },
  {
    time: "Nov 14, 08:15",
    actor: "Mark Feldman",
    action: "Report exported",
    detail: "RPT-302 Lender Compliance Package exported to PDF for the lender",
  },
  {
    time: "Nov 13, 15:40",
    actor: "Julia Santos",
    action: "Report created",
    detail: "RPT-309 Budget vs Actual by Plant, from the report builder",
  },
  {
    time: "Nov 12, 11:02",
    actor: "System",
    action: "Scheduled run completed",
    detail: "Daily Cash Position Summary delivered to the Treasury group",
  },
  {
    time: "Nov 10, 10:18",
    actor: "Lucas Meyer",
    action: "Report shared",
    detail: "RPT-310 Standard Cost Variance Review shared as a live report with the CFO",
  },
];

export const executiveTargets = [
  { metric: "Revenue, Year to Date", actual: "$139.2M", target: "$142.8M budget", status: "Behind" },
  { metric: "Gross Margin", actual: "26.8%", target: "29.0%", status: "Behind" },
  { metric: "Close Time", actual: "7 days", target: "8 days", status: "Ahead" },
  { metric: "Inventory Turns", actual: "4.1x", target: "4.5x", status: "Behind" },
  { metric: "Days Sales Outstanding", actual: "43 days", target: "40 days", status: "Behind" },
];
