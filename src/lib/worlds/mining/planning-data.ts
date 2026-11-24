// Illustrative sample data for the Planning & FP&A module. Figures follow
// INDUSTRY_BRIEFS.md: YTD revenue $389.4M against a $352.6M budget, gross
// margin 44.6%, EBITDA $172.8M at 44.4%, FY2027 budget revenue $428.0M,
// forecast review FR-2026-008 at the approval stage, downside scenario of
// gold at US$3,400 per oz, diesel up 15% and USD/CAD 1.43.

import type {
  ForecastReview,
  MonthRow,
  EntityRow,
  PlanningEvent,
  PlanningException,
  PlanningReportItem,
  PlanningRole,
  PlanningPermission,
  ReviewStage,
  ReviewStatus,
  PlanScenarioInputs,
  PlanScenarioResult,
  SeedPlanScenario,
  PlanningOverview,
  PlanningApprovalImpact,
  ScenarioCopy,
  AnalysisSection,
  AnalysisReply,
  PlanningAnalysisContext,
} from "@/lib/worlds/enterprise/planning-data";

export type {
  ForecastReview,
  MonthRow,
  EntityRow,
  PlanningEvent,
  PlanningException,
  PlanningReportItem,
  PlanningRole,
  PlanningPermission,
  ReviewStage,
  ReviewStatus,
  PlanScenarioInputs,
  PlanScenarioResult,
  SeedPlanScenario,
  PlanningOverview,
  PlanningApprovalImpact,
  ScenarioCopy,
  AnalysisSection,
  AnalysisReply,
  PlanningAnalysisContext,
} from "@/lib/worlds/enterprise/planning-data";

// ---------- Roles and approval authority ----------
export const planningRolePermissions: Record<PlanningRole, readonly PlanningPermission[]> = {
  "FP&A Analyst": ["view", "runAnalysis", "createScenario", "prepareForecast"],
  "FP&A Director": ["view", "runAnalysis", "createScenario", "prepareForecast", "reviewAssumptions", "approveForecast"],
  "VP Finance": ["view", "runAnalysis", "createScenario", "prepareForecast", "reviewAssumptions", "approveForecast", "publishForecast"],
  CFO: ["view", "runAnalysis", "approveForecast", "publishForecast"],
  Administrator: ["view", "manageModels"],
};
export const planningRoles = Object.keys(planningRolePermissions) as PlanningRole[];
export const canPlanning = (role: PlanningRole, p: PlanningPermission) =>
  planningRolePermissions[role].includes(p);

/** Director, Planning and Analysis approval authority: forecast change, in percent. */
export const DIRECTOR_FORECAST_AUTHORITY = 2.0;
export function canApproveForecast(role: PlanningRole, changePct: number) {
  if (!canPlanning(role, "approveForecast")) return false;
  if (role === "FP&A Director") return Math.abs(changePct) <= DIRECTOR_FORECAST_AUTHORITY;
  return true;
}

export const reviewStages: readonly ReviewStage[] = [
  "Draft Prepared",
  "Data Validated",
  "Variance Analysis",
  "Forecast Updated",
  "Internal Review",
  "Approval",
  "CFO Sign-off",
  "Published",
];

/** Publishing is only possible once a review is approved at CFO sign-off. */
export function canPublish(role: PlanningRole, status: ReviewStatus) {
  return canPlanning(role, "publishForecast") && status === "Approved";
}

// ---------- Overview ----------
export const kpis = [
  { key: "rev", label: "YTD Revenue", value: "$389.4M", delta: "+10.4% vs $352.6M budget", up: true, good: true, prompt: "Explain our revenue variance against budget year to date." },
  { key: "gm", label: "Gross Margin", value: "44.6%", delta: "Year to date, price driven", up: true, good: true, prompt: "What is driving our gross margin against budget?" },
  { key: "ebitda", label: "EBITDA", value: "$172.8M", delta: "44.4% margin, year to date", up: true, good: true, prompt: "Explain our EBITDA performance against budget year to date." },
  { key: "q4", label: "Q4 Forecast Revenue", value: "$125.4M", delta: "FR-2026-008 is at approval", up: true, good: true, prompt: "Walk me through the production guidance review FR-2026-008." },
  { key: "fy27", label: "FY2027 Budget Revenue", value: "$428.0M", delta: "In internal review, FR-2026-012", up: true, good: true, prompt: "Summarize the FY2027 budget and its main assumptions." },
] as const;

// Jan to Oct 2026. Actuals sum to $389.4M and budgets to $352.6M; October
// actual revenue is the $41.5M from the brief.
export const monthlyRevenue: MonthRow[] = [
  { period: "Jan", actual: 33.8, budget: 33.5, grossMargin: 41.8, ebitdaMargin: 41.6 },
  { period: "Feb", actual: 34.6, budget: 33.9, grossMargin: 42.3, ebitdaMargin: 42.1 },
  { period: "Mar", actual: 37.2, budget: 35.4, grossMargin: 43.6, ebitdaMargin: 43.4 },
  { period: "Apr", actual: 38.4, budget: 35.8, grossMargin: 44.2, ebitdaMargin: 44.0 },
  { period: "May", actual: 39.6, budget: 36.2, grossMargin: 44.9, ebitdaMargin: 44.7 },
  { period: "Jun", actual: 40.1, budget: 35.9, grossMargin: 45.1, ebitdaMargin: 44.9 },
  { period: "Jul", actual: 40.8, budget: 35.6, grossMargin: 45.4, ebitdaMargin: 45.2 },
  { period: "Aug", actual: 41.2, budget: 35.8, grossMargin: 45.6, ebitdaMargin: 45.4 },
  { period: "Sep", actual: 42.2, budget: 35.4, grossMargin: 46.2, ebitdaMargin: 46.0 },
  { period: "Oct", actual: 41.5, budget: 35.1, grossMargin: 45.9, ebitdaMargin: 45.7 },
];

// Site revenues sum to the $389.4M group total and budgets to $352.6M.
// Copperline is a development project and carries no revenue.
export const entities: EntityRow[] = [
  { entity: "Keno Ridge", detail: "Timmins, Ontario, CAD", revenue: 246.8, budget: 224.5, grossMargin: 46.8, ebitdaMargin: 46.5 },
  { entity: "Sagebrush", detail: "Elko, Nevada, USD", revenue: 142.6, budget: 128.1, grossMargin: 40.8, ebitdaMargin: 40.8 },
  { entity: "Copperline JV", detail: "British Columbia, 40% interest", revenue: 0.0, budget: 0.0, grossMargin: 0.0, ebitdaMargin: 0.0 },
];

// ---------- Scenario modeling (illustrative arithmetic, not a forecast) ----------
// Stated assumptions, shown wherever scenario results appear: diesel is 9%
// of revenue in site costs (the scenario engine's unit cost input), 36.6%
// of group revenue is USD denominated (the Sagebrush share), the base FX
// rate is USD/CAD 1.36, and the corporate expense ratio is 0.2% (gross
// margin 44.6% less the 44.4% EBITDA margin; site costs sit in cost of
// sales). A gold price move is applied through the revenue growth input.
export const planConstants = {
  grossMargin: 44.6,
  opexRatio: 0.2,
  steelSharePct: 9,
  usdSharePct: 36.6,
  baseFxRate: 1.36,
} as const;

export const basePlanScenario: PlanScenarioInputs = {
  revenue: 428.0,
  growthPct: 0,
  volumePct: 0,
  steelPct: 0,
  fxRate: planConstants.baseFxRate,
};

export function runPlanScenario(i: PlanScenarioInputs): PlanScenarioResult {
  const fxEffectPct =
    (planConstants.usdSharePct / 100) * (i.fxRate / planConstants.baseFxRate - 1) * 100;
  const revenue =
    i.revenue * (1 + i.growthPct / 100) * (1 + i.volumePct / 100) * (1 + fxEffectPct / 100);
  const grossMargin =
    planConstants.grossMargin - (planConstants.steelSharePct * i.steelPct) / 100;
  const ebitdaMargin = grossMargin - planConstants.opexRatio;
  return { revenue, grossMargin, ebitda: (revenue * ebitdaMargin) / 100, ebitdaMargin };
}

export const seedPlanScenarios: SeedPlanScenario[] = [
  {
    id: "SCN-A",
    name: "Scenario A, FY2027 budget base case",
    inputs: { ...basePlanScenario },
    status: "Approved",
    owner: "George Mensah",
    created: "Nov 10, 2026",
    note: "The FY2027 budget as submitted to internal review in FR-2026-012: revenue $428.0M, gross margin 44.6%, EBITDA margin 44.4%, at a planning price below the year to date realized price of US$4,072 per oz.",
  },
  {
    id: "SCN-B",
    name: "Scenario B, downside, gold, diesel and FX",
    inputs: { ...basePlanScenario, growthPct: -16.5, steelPct: 15, fxRate: 1.43 },
    status: "Under Review",
    owner: "George Mensah",
    created: "Nov 14, 2026",
    note: "Gold at US$3,400 per oz, applied as a 16.5% revenue reduction against the realized price, diesel up 15% and USD/CAD at 1.43. Attached to forecast review FR-2026-008 and used as the downside in Treasury.",
  },
  {
    id: "SCN-C",
    name: "Scenario C, Keno Ridge grade upside",
    inputs: { ...basePlanScenario, volumePct: 3 },
    status: "Draft",
    owner: "George Mensah",
    created: "Nov 15, 2026",
    note: "Sustained Q4 grades at Keno Ridge carried through FY2027. Revenue upside only; the additional haulage and processing cost is not yet in the plan.",
  },
];

// ---------- Forecast reviews ----------
export const forecastReviews: ForecastReview[] = [
  {
    id: "FR-2026-008",
    title: "Full year 2026 production guidance update",
    scope: "Group, Keno Ridge and Sagebrush",
    current: "Full year production guidance 84,000 oz",
    proposedChangePct: 3.0,
    changeSummary: "Production guidance raised to 86,500 oz",
    impactSummary:
      "At the year to date realized price of US$4,072 per oz, the additional 2,500 oz is worth about $13.8M of revenue, taking the FY2026 revenue forecast to $473.3M and Q4 revenue to $125.4M. AISC guidance is unchanged; the change is volume and grade, not cost.",
    stage: 5,
    status: "Pending Approval",
    owner: "George Mensah",
    comments: [
      {
        who: "George Mensah, Director, Planning and Analysis",
        when: "Nov 14",
        text: "Guidance raised to 86,500 oz on Keno Ridge grades and Sagebrush throughput running ahead of plan through October. Production year to date is 71,380 oz, so the raise asks for a strong but achievable November and December.",
      },
      {
        who: "Claire Dubois, VP Finance",
        when: "Nov 15",
        text: "The 3.0% change is above George's 2.0% authority, so the approval is mine to record with Robert Hale. Please attach the downside scenario before approval so the gold price exposure is visible in the same pack.",
      },
      {
        who: "Alfie",
        when: "Nov 15",
        text: "Downside scenario attached: gold at US$3,400 per oz removes about $71M of FY2027 revenue before translation effects, and diesel up 15% removes about 1.4 points of gross margin. No change to the guidance proposal.",
      },
    ],
  },
  {
    id: "FR-2026-012",
    title: "FY2027 annual budget",
    scope: "Group, all sites and the Copperline JV",
    current: "FY2027 draft revenue $421.7M (October build)",
    proposedChangePct: 1.5,
    changeSummary: "FY2027 budget revenue set at $428.0M",
    impactSummary:
      "Gross margin budgeted at 44.6% and EBITDA at $190.0M (44.4%), at a planning price below the US$4,072 per oz realized year to date. Keno Ridge carries the production plan; Copperline carries the growth capex, continuing toward the $128.0M approved project budget.",
    stage: 4,
    status: "In Review",
    owner: "George Mensah",
    comments: [
      {
        who: "Nadia Hassan, Controller",
        when: "Nov 13",
        text: "Site trial balances agree to the budget build. The budget carries the accrued October JV balance; JE-2026-0874 corrects it once approved.",
      },
    ],
  },
  {
    id: "FR-2026-005",
    title: "Q3 2026 forecast",
    scope: "Group, both mines",
    current: "Q3 revenue forecast $122.7M",
    proposedChangePct: 1.2,
    changeSummary: "Q3 revenue forecast raised to $124.2M at approval",
    impactSummary:
      "Published in August. Actual Q3 revenue came in at $124.2M, on forecast, with the gold price offsetting Sagebrush cost pressure.",
    stage: 7,
    status: "Published",
    owner: "George Mensah",
    comments: [],
  },
  {
    id: "FR-2026-003",
    title: "Q2 2026 forecast",
    scope: "Group, both mines",
    current: "Q2 revenue forecast $119.2M",
    proposedChangePct: -0.9,
    changeSummary: "Q2 revenue forecast trimmed to $118.1M at approval",
    impactSummary: "Published in May. Retained as the comparison point for forecast accuracy reporting.",
    stage: 7,
    status: "Published",
    owner: "George Mensah",
    comments: [],
  },
];

export const boardRecord = {
  review: "FR-2026-012",
  package: "FY2027 budget book",
  meeting: "Board meeting, Dec 11, 2026",
  submitted: "Draft in preparation",
  status: "Internal review and CFO sign-off come first",
  note: "The board sees the approved budget only. The downside scenario is included as an appendix, with the gold price, diesel and FX assumptions stated, so the board pack and the internal review tell the same story.",
};

export const forecastAccuracy = {
  review: "FR-2026-005",
  published: "Published Aug 16, 2026, after CFO sign-off",
  rows: [
    { metric: "Q3 revenue", projected: "$124.2M", actual: "$124.2M", note: "On forecast." },
    { metric: "Q3 gross margin", projected: "45.2%", actual: "45.6%", note: "The gold price ran ahead of the plan deck." },
    { metric: "Q3 EBITDA margin", projected: "45.1%", actual: "45.5%", note: "Price offset Sagebrush diesel costs." },
    { metric: "Q3 closing cash", projected: "$55.9M", actual: "$58.6M at Oct 31", note: "Refinery settlements landed early." },
  ],
};

// ---------- Planning exceptions ----------
export const planningExceptions: PlanningException[] = [
  {
    id: "EXC-01",
    segment: "Copperline JV",
    metric: "Operator statement variance",
    observed: "$253,500 difference on the October JV statement",
    threshold: "JV share variance within $25,000",
    period: "Oct 2026",
    severity: "High",
    detail:
      "Kestrel Resources' October statement shows Aurora Ridge's 40% share of joint venture costs at $4,218,000 against an accrual of $3,964,500. The camp and catering line was billed at 100% of cost on one invoice instead of Aurora's 40% share, overstating the share by $186,000, and an October diesel accrual of $67,500 at the project is missing.",
    investigation:
      "JE-2026-0874 is prepared to correct the accrual and a query letter to Kestrel Resources is drafted. Both are awaiting Controller review and CFO approval.",
    owner: "Nadia Hassan",
    status: "Escalated to Accounting, JE-2026-0874",
  },
  {
    id: "EXC-02",
    segment: "Sagebrush",
    metric: "Unit cost pressure",
    observed: "AISC of US$1,588 per oz against a US$1,540 budget",
    threshold: "AISC within 3% of budget",
    period: "Oct 2026",
    severity: "Medium",
    detail:
      "Production is ahead of plan, but diesel and contract mining rates at Sagebrush have pushed all-in sustaining cost above budget for three consecutive months. The guidance raise in FR-2026-008 is volume only; it does not assume this cost pressure away.",
    investigation:
      "Site cost review with the Sagebrush team before the FY2027 budget is published. The downside scenario carries diesel up a further 15%.",
    owner: "George Mensah",
    status: "Open",
  },
  {
    id: "EXC-03",
    segment: "Sagebrush",
    metric: "Forecast data confidence",
    observed: "Sagebrush actuals come from spreadsheet uploads",
    threshold: "Site actuals from the system of record",
    period: "Nov 2026",
    severity: "Medium",
    detail:
      "Sage 300 authentication has expired at Sagebrush, so site cost reports are uploaded as spreadsheets rather than read from the system of record. The SAP S/4HANA cutover on March 8, 2027 removes the dependency.",
    investigation: "Restore the Sage 300 authentication in Data Sources, then re-run the Sagebrush forecast before FR-2026-008 is published.",
    owner: "George Mensah",
    status: "Monitoring",
  },
  {
    id: "EXC-04",
    segment: "Group",
    metric: "Gold price exposure",
    observed: "Revenue is priced off a single commodity",
    threshold: "Single input above 15% of revenue is scenario tested",
    period: "FY2027",
    severity: "High",
    detail:
      "A fall to US$3,400 per oz removes about $71M of FY2027 revenue in the scenario engine before translation effects. The hedge book covers 18,000 oz of Q1 2027 production at US$3,940 per oz under the board approved program, a small part of one quarter's output.",
    investigation:
      "Already scenario tested as Scenario B and attached to FR-2026-008. Hedge program decisions sit with the board, not Planning and Analysis.",
    owner: "George Mensah",
    status: "Escalated to Forecast Review FR-2026-008",
  },
];

// ---------- Data sources and audit ----------
export const planningDataSources = [
  { name: "SAP S/4HANA", type: "Primary GL", updated: "12 min ago", status: "Connected", coverage: "Keno Ridge and Corporate, 2021 to present", validation: "Validated" },
  { name: "RBC Royal Bank feed", type: "Bank feed", updated: "26 min ago", status: "Connected", coverage: "Operating and project facility accounts", validation: "Validated" },
  { name: "Wells Fargo feed", type: "Bank feed", updated: "31 min ago", status: "Connected", coverage: "Sagebrush operating, USD", validation: "Validated" },
  { name: "ADP payroll", type: "Payroll", updated: "4 days ago", status: "Needs attention", coverage: "Group payroll", validation: "Sync stale" },
  { name: "Sage 300, Sagebrush", type: "Legacy GL", updated: "9 days ago", status: "Authentication expired", coverage: "Sagebrush entity", validation: "Incomplete" },
  { name: "Spreadsheet uploads", type: "Manual", updated: "Nov 15, 2026", status: "Connected", coverage: "Site cost reports", validation: "Checked on upload" },
];

export const planningAudit: PlanningEvent[] = [
  { time: "Nov 15, 2026 09:12", actor: "George Mensah", type: "User", action: "Forecast review opened", detail: "Full year 2026 production guidance update (FR-2026-008)" },
  { time: "Nov 15, 2026 09:12", actor: "Alfie", type: "Alfie", action: "Data retrieved", detail: "SAP S/4HANA, RBC and Wells Fargo feeds, Jan to Oct 2026" },
  { time: "Nov 15, 2026 09:13", actor: "Variance Analysis Agent", type: "Agent", action: "Variance computed", detail: "YTD revenue +10.4% vs budget, price driven; AISC US$1,588 per oz vs a US$1,540 budget" },
  { time: "Nov 15, 2026 09:14", actor: "Alfie", type: "Alfie", action: "Data limitation flagged", detail: "Sagebrush actuals from spreadsheet uploads, Sage 300 authentication expired" },
  { time: "Nov 15, 2026 09:20", actor: "George Mensah", type: "User", action: "Scenario attached", detail: "Scenario B, downside gold, diesel and FX, attached to FR-2026-008" },
];

// ---------- Planning reports ----------
export const planningReportLibrary: PlanningReportItem[] = [
  {
    id: "PL-101",
    name: "YTD Budget vs Actual Pack, Jan to Oct 2026",
    category: "Budget & Forecast",
    period: "YTD Oct 2026",
    owner: "George Mensah",
    status: "Published",
    updated: "Nov 12, 2026",
    parameters: "All sites and the JV, org metric definitions, compared with the FY2026 budget",
    summary:
      "Revenue of $389.4M is 10.4% ahead of the $352.6M budget on a realized gold price of US$4,072 per oz. Gross margin is 44.6% and EBITDA is $172.8M at a 44.4% margin. The beat is price, not volume, and AISC of US$1,588 per oz is above the US$1,540 budget.",
    sections: [
      { heading: "Variance summary", body: "Keno Ridge is $22.3M ahead of budget on revenue and Sagebrush $14.5M, both on price. Production of 71,380 oz is close to plan. Cost pressure sits at Sagebrush, where diesel and contract mining rates pushed unit costs up through the fall." },
      { heading: "Watch items", body: "AR over 60 days is $196K, a single refinery lot under an assay dispute, and the Copperline JV accrual is corrected by JE-2026-0874 once approved. Both are flagged in the pack rather than adjusted away." },
    ],
  },
  {
    id: "PL-102",
    name: "October 2026 Variance Report",
    category: "Variance",
    period: "Oct 2026",
    owner: "George Mensah",
    status: "Approved",
    updated: "Nov 13, 2026",
    parameters: "Group and site, actual vs budget vs prior year",
    summary:
      "October revenue of $41.5M was 18% ahead of the $35.1M budget on price. The month's open item is the Copperline JV operator statement difference of $253,500.",
    sections: [
      { heading: "What moved", body: "The realized price held above US$4,000 per oz and Keno Ridge grades were strong. Sagebrush unit costs rose again on diesel, keeping AISC above budget." },
      { heading: "Action", body: "No forecast change was made on October alone. The guidance update is handled in FR-2026-008 and the JV correction in JE-2026-0874." },
    ],
  },
  {
    id: "PL-103",
    name: "Q4 2026 Forecast Summary",
    category: "Budget & Forecast",
    period: "Q4 2026",
    owner: "George Mensah",
    status: "Under Review",
    updated: "Nov 15, 2026",
    parameters: "Forecast review FR-2026-008, base case with downside scenario attached",
    summary:
      "Q4 revenue is forecast at $125.4M, taking FY2026 to $473.3M, on full year production guidance of 86,500 oz. The guidance change is at the approval stage in FR-2026-008 and is not final until it is approved and published.",
    sections: [
      { heading: "Basis", body: "October actuals, November production to date, and the hedge position for Q1 2027. The additional 2,500 oz comes from Keno Ridge grade and Sagebrush throughput, not from a price assumption." },
      { heading: "Sensitivity", body: "The downside scenario (gold at US$3,400 per oz, diesel up 15%, USD/CAD 1.43) is run on the FY2027 base in PL-105. Q4 revenue is less exposed because most Q4 settlements are already priced." },
    ],
  },
  {
    id: "PL-104",
    name: "FY2027 Budget Book",
    category: "Board Reporting",
    period: "FY2027",
    owner: "George Mensah",
    status: "Draft",
    updated: "Nov 15, 2026",
    parameters: "Forecast review FR-2026-012, board format, downside scenario as appendix",
    summary:
      "The FY2027 budget is revenue of $428.0M, gross margin of 44.6% and EBITDA of $190.0M. It is in internal review and goes to the board on Dec 11, 2026 once approved.",
    sections: [
      { heading: "Assumptions", body: "A planning price below the US$4,072 per oz realized year to date, production growth at Keno Ridge, USD/CAD at 1.36, and Copperline construction continuing toward the $128.0M approved project budget." },
      { heading: "Risks", body: "Revenue is priced off a single commodity. The downside appendix quantifies gold at US$3,400 per oz, diesel up 15% and USD/CAD at 1.43. The hedge book covers 18,000 oz of Q1 2027 at US$3,940 per oz." },
    ],
  },
  {
    id: "PL-105",
    name: "Downside Scenario Assessment, Gold, Diesel and FX",
    category: "Scenarios",
    period: "FY2027",
    owner: "George Mensah",
    status: "Approved",
    updated: "Nov 14, 2026",
    parameters: "Scenario B, gold US$3,400 per oz, diesel +15%, USD/CAD 1.43, scenario engine assumptions as stated",
    summary:
      "Under the downside scenario, FY2027 revenue falls to $364.1M, partly offset by USD translation, while gross margin falls to 43.3% and EBITDA falls to about $156.7M. Revenue, not margin, is where most of the downside lands.",
    sections: [
      { heading: "Method", body: "Simple arithmetic on stated assumptions: the gold price applied as a 16.5% revenue reduction from the realized price, diesel at 9% of revenue in site costs, USD denominated revenue at 36.6% of the group, corporate expenses held at 0.2% of revenue. It is a sensitivity, not a forecast." },
      { heading: "Use", body: "Attached to FR-2026-008, used as the downside case in Treasury, and included as an appendix to the FY2027 budget book." },
    ],
  },
  {
    id: "PL-106",
    name: "Q3 2026 Forecast Accuracy Review",
    category: "Forecast Reviews",
    period: "Q3 2026",
    owner: "George Mensah",
    status: "Published",
    updated: "Oct 20, 2026",
    parameters: "Forecast review FR-2026-005, projected vs actual",
    summary:
      "Q3 revenue was forecast at $124.2M and came in at $124.2M, on forecast. Gross margin was 0.4 points better than forecast as the gold price ran ahead of the plan deck.",
    sections: [
      { heading: "Detail", body: "Revenue variance of 0.0%, gross margin 45.6% against 45.2% forecast, EBITDA margin 45.5% against 45.1%. Closing cash was $58.6M at Oct 31 against a $55.9M forecast." },
      { heading: "Lesson", body: "Price was the recurring beat: realized prices have run above the plan deck all year, and the FY2027 budget now states its planning price assumption explicitly." },
    ],
  },
];

export const scheduledPlanningReports = [
  { name: "Monthly Budget vs Actual Pack", schedule: "Monthly, 3rd business day after close", lastRun: "Nov 12, delivered to Finance leadership", status: "Active" },
  { name: "Weekly Revenue and Production Flash", schedule: "Weekly, Monday 7:00 AM", lastRun: "Monday, delivered to George Mensah and Claire Dubois", status: "Active" },
  { name: "Quarterly Forecast Pack", schedule: "Quarterly, with the forecast review", lastRun: "Oct 20, delivered with FR-2026-005 accuracy review", status: "Active" },
  { name: "Board Finance Pack", schedule: "Monthly, ahead of the board meeting", lastRun: "Nov 13, October pack delivered", status: "Active" },
];

// ---------- Planning overview (index page) ----------
export const planningPrompts = [
  "Explain our revenue variance against budget year to date.",
  "Why did revenue beat budget, and where is the cost pressure?",
  "What is driving our gross margin against budget?",
  "Walk me through the production guidance review FR-2026-008.",
  "What happens to FY2027 revenue if gold falls to US$3,400 per oz?",
  "Compare forecast accuracy for Q3 against the published forecast.",
  "Summarize the FY2027 budget and its main assumptions.",
  "Which site is furthest ahead of budget, and why?",
];

export const planningOverview: PlanningOverview = {
  budgetGrossMargin: 45.2,
  groupVarianceNote: "Group variance is +$36.8M.",
  entityNote:
    "Both producing sites are ahead of budget on price. Keno Ridge has the largest beat; Copperline is a development project and carries no revenue.",
};

// ---------- Forecast review page ----------
export const planningApprovalImpact: PlanningApprovalImpact = {
  reviewId: "FR-2026-008",
  rows: [
    ["Full year production guidance", "84,000 oz", "86,500 oz"],
    ["FY2026 forecast revenue", "$459.5M", "$473.3M"],
    ["AISC guidance", "Unchanged", "Unchanged"],
  ],
};

export const planningReviewDefaults = {
  groupScope: "Group, all sites",
  owner: "George Mensah",
};

// ---------- Generated planning reports ----------
export const planningGeneratedReport = {
  owner: "George Mensah",
  groupSummary:
    "Group revenue is $389.4M year to date against a $352.6M budget, gross margin is 44.6% and EBITDA is $172.8M.",
  sourcesNote:
    "SAP S/4HANA (primary GL), RBC and Wells Fargo bank feeds, refinery settlement statements. Sagebrush figures rely on site cost report uploads until the Sage 300 authentication is restored, and payroll figures are estimated while the ADP sync is stale.",
};

// ---------- Scenario modeling copy ----------
/** The downside preset inputs, applied on top of the builder's current values. */
export const planDownsideOverrides: Partial<PlanScenarioInputs> = { growthPct: -16.5, steelPct: 15, fxRate: 1.43 };
/** The volume upside preset inputs, applied on top of the builder's current values. */
export const planUpsideOverrides: Partial<PlanScenarioInputs> = { steelPct: 0, fxRate: 1.36, volumePct: 3 };

export const scenarioCopy: ScenarioCopy = {
  costInputLabel: "Diesel price change",
  costInputName: "diesel",
  costInputTitle: "Diesel",
  volumeHint:
    "Production volume across both mines. Scenario C tests +3% from sustained Keno Ridge grades.",
  costHint:
    "Diesel is 9% of revenue in site costs, so each 1% on diesel is about 0.09 points of gross margin. The gold price is tested through revenue growth.",
  downsideLabel: "Downside, gold, diesel and FX",
  alfieNote:
    "Scenario B (gold at US$3,400 per oz, diesel +15%, USD/CAD 1.43) is the downside attached to forecast review FR-2026-008 and the downside case in Treasury. Alfie recommends keeping Scenario C (grade upside) out of the approval pack until Q4 grades are confirmed: it models the revenue without the additional haulage and processing cost. Neither scenario changes anything in the budget or forecast on its own.",
  sensitivityNote:
    "One variable at a time, everything else held at the builder values. Each 5 points on diesel is about 0.5 points of gross margin, which is the sensitivity finding Alfie carries into the forecast review and the budget book appendix.",
  comparisonNote:
    "All scenarios share the FY2027 budget baseline and the stated assumptions. Under those assumptions the strongest EBITDA comes from the grade upside, and the weakest from the gold downside, where revenue falls by about a sixth before translation. That trade-off is the decision, and it belongs to the Forecast Review, not to this page.",
  driverRevenuePhrase: "on the gold price and translation",
  driverMarginPhrase: "on diesel and site costs",
};

// ---------- Planning Analysis conversation ----------
export const planningAnalysisContext: PlanningAnalysisContext = {
  title: "FY2026 Forecast and Variance Analysis",
  subtitle:
    "Performance against budget, the production guidance review, and the assumptions the FY2027 budget rests on.",
  firstQuestion:
    "Explain our performance against budget year to date and what needs attention before the production guidance is approved.",
  details: [
    ["Analysis", "FY2026 Forecast and Variance"],
    ["ID", "FA-2026-031"],
    ["Scope", "Group, both mines and the JV"],
    ["Reporting period", "Jan to Oct 2026"],
    ["Created by", "George Mensah"],
    ["Created", "Nov 15, 2026"],
    ["Last updated", "Just now"],
    ["Status", "In progress"],
  ],
  groupInfo: [
    ["YTD revenue", "$389.4M"],
    ["YTD budget", "$352.6M"],
    ["Gross margin", "44.6%"],
    ["EBITDA", "$172.8M (44.4%)"],
    ["Q4 forecast revenue", "$125.4M"],
    ["FY2027 budget revenue", "$428.0M"],
  ],
  keyFindings: [
    "Revenue +10.4% vs budget YTD, price driven at a realized US$4,072 per oz.",
    "AISC of US$1,588 per oz is above the US$1,540 budget on Sagebrush costs.",
    "Copperline JV statement differs from the accrual by $253,500.",
    "Sagebrush actuals come from spreadsheet uploads, Sage 300 authentication expired.",
  ],
};

export const planningAnalysisFollowUps = [
  "Why did revenue beat budget?",
  "What happens if gold falls to US$3,400 per oz?",
  "Walk me through FR-2026-008.",
  "Compare Q3 forecast accuracy.",
  "Summarize the FY2027 budget.",
];

/** Follow-up patterns that advance the analysis workflow stage in the page. */
export const planningAnalysisPatterns = {
  scenario: /scenario|gold|diesel|%|downside/i,
  review: /fr-2026|review|guidance/i,
};

const pctFmt = (n: number) => `${n.toFixed(1)}%`;
const moneyFmt = (n: number) => `$${n.toFixed(1)}M`;

export function planningAnalysisReply(
  q: string,
  files: readonly { name: string }[],
  turn: number,
): AnalysisReply {
  const p = q.toLowerCase();
  if (files.length)
    return {
      intro: `I read ${files.length === 1 ? "the attached file" : `the ${files.length} attached files`} in the context of the FY2026 forecast analysis.`,
      sections: [
        {
          title: "What I extracted",
          items: files.map((f) =>
            /budget/i.test(f.name)
              ? `${f.name}: budget figures by site and month; totals agree to the $352.6M YTD budget in SAP S/4HANA.`
              : /forecast/i.test(f.name)
                ? `${f.name}: forecast assumptions detected; the gold price and diesel assumptions match Scenario B.`
                : /xlsx|csv/i.test(f.name)
                  ? `${f.name}: structured data detected; columns mapped to site, period, revenue and cost.`
                  : `${f.name}: narrative content summarized; no conflicting assumptions found.`,
          ),
        },
        {
          title: "How it affects this analysis",
          items: [
            "Used as conversation context only, not added to the planning data in SAP S/4HANA.",
            "Figures from uploaded files are treated as unverified until reconciled with source systems.",
          ],
        },
      ],
      confidence: "Moderate, uploaded data not yet reconciled",
      sources: files.map((f) => f.name),
      actions: ["Add to repository", "Ask Follow-up"],
    };
  if (p.includes("gold") || p.includes("downside") || p.includes("3,400")) {
    const b = runPlanScenario(basePlanScenario);
    const d = runPlanScenario({ ...basePlanScenario, growthPct: -16.5, steelPct: 15, fxRate: 1.43 });
    return {
      intro:
        "The downside scenario from Planning, applied to the FY2027 budget: gold at US$3,400 per oz, diesel up 15% and USD/CAD at 1.43, on the stated scenario assumptions.",
      table: [
        ["Metric", "FY2027 budget", "Downside"],
        ["Revenue", moneyFmt(b.revenue), moneyFmt(d.revenue)],
        ["Gross margin", pctFmt(b.grossMargin), pctFmt(d.grossMargin)],
        ["EBITDA", moneyFmt(b.ebitda), moneyFmt(d.ebitda)],
        ["EBITDA margin", pctFmt(b.ebitdaMargin), pctFmt(d.ebitdaMargin)],
      ],
      sections: [
        {
          title: "Interpretation",
          items: [
            "Revenue is where the downside lands: the price reduction from the realized US$4,072 per oz removes about $71M of FY2027 revenue before translation partly offsets it. Margin compresses by about 1.4 points on diesel at 9% of revenue.",
            "This is the scenario attached to FR-2026-008 and used as the downside case in Treasury. The hedge book covers 18,000 oz of Q1 2027 production at US$3,940 per oz, a small part of one quarter's output.",
          ],
        },
      ],
      confidence: "Illustrative, simple arithmetic on stated assumptions, not a forecast",
      limitations: ["The gold price is applied as a flat revenue reduction; no production response is modeled.", "Diesel share and USD share are planning assumptions, reviewed in Forecast Reviews."],
      agents: ["Scenario Agent"],
      sources: ["Scenario B", "SAP S/4HANA"],
      actions: ["Open in Scenario Modeling", "Ask Follow-up"],
    };
  }
  if (p.includes("beat") || p.includes("aisc") || p.includes("margin") || p.includes("cost"))
    return {
      intro:
        "Revenue is 10.4% ahead of budget year to date, and the beat is price, not volume:",
      table: [
        ["Driver", "What happened"],
        ["Gold price", "Realized US$4,072 per oz against a plan deck set below it; production of 71,380 oz is close to plan"],
        ["Keno Ridge", "Revenue $246.8M against a $224.5M budget, on price and strong grades"],
        ["Sagebrush", "Revenue $142.6M against a $128.1M budget, on price, with unit costs rising"],
      ],
      sections: [
        {
          title: "The cost side",
          items: [
            "All-in sustaining cost is US$1,588 per oz against a US$1,540 budget, above budget for three consecutive months.",
            "Diesel and contract mining rates at Sagebrush are the pressure; Keno Ridge unit costs are on plan.",
            "The guidance raise in FR-2026-008 is volume and grade only; it does not assume this cost pressure away.",
          ],
        },
      ],
      confidence: "High",
      agents: ["Variance Analysis Agent"],
      sources: ["SAP S/4HANA", "Refinery settlement statements"],
      actions: ["Open Forecast Review", "Ask Follow-up"],
    };
  if (p.includes("october"))
    return {
      intro: "October 2026 was the strongest revenue month against budget this year:",
      table: [
        ["Measure", "October", "Year to date"],
        ["Revenue", "$41.5M", "$389.4M"],
        ["Gross margin", "45.9%", "44.6%"],
        ["EBITDA margin", "45.7%", "44.4%"],
      ],
      sections: [
        {
          title: "What happened",
          items: [
            "The realized price held above US$4,000 per oz and Keno Ridge grades were strong.",
            "Sagebrush unit costs rose again on diesel, keeping AISC above budget.",
          ],
        },
        {
          title: "What FP&A did with it",
          items: [
            "No forecast change was made on October alone. The production guidance update is handled in FR-2026-008, and the Copperline JV difference of $253,500 is corrected by JE-2026-0874.",
          ],
        },
      ],
      confidence: "High",
      agents: ["Variance Analysis Agent"],
      sources: ["SAP S/4HANA"],
      actions: ["Open Forecast Review", "Ask Follow-up"],
    };
  if (p.includes("fr-2026-008") || p.includes("guidance") || p.includes("forecast review"))
    return {
      intro:
        "FR-2026-008 is the full year 2026 production guidance update, prepared by George Mensah, and it is at the Approval stage:",
      sections: [
        {
          title: "The proposal",
          items: [
            "Full year production guidance raised from 84,000 to 86,500 oz, a change of +3.0%, on Keno Ridge grades and Sagebrush throughput.",
            "At the realized price of US$4,072 per oz, the additional 2,500 oz is worth about $13.8M, taking the FY2026 revenue forecast to $473.3M. AISC guidance is unchanged.",
          ],
        },
        {
          title: "Evidence and approvals",
          items: [
            "Production year to date is 71,380 oz through October, so the raise asks for a strong but achievable November and December.",
            "The downside scenario (gold at US$3,400 per oz, diesel up 15%, USD/CAD 1.43) is attached at Claire Dubois' request, so the gold price exposure is visible in the same pack.",
            "The +3.0% change exceeds the Director, Planning and Analysis authority of 2.0%, so approval sits with the VP Finance and CFO. Publishing follows CFO sign-off.",
          ],
        },
      ],
      confidence: "High for the revenue line at current prices; AISC depends on Sagebrush diesel and contract rates",
      limitations: ["Sagebrush actuals come from spreadsheet uploads while Sage 300 authentication is expired."],
      agents: ["Forecasting Agent", "Variance Analysis Agent"],
      sources: ["FR-2026-008", "Scenario B", "SAP S/4HANA"],
      actions: ["Open Forecast Review", "Ask Follow-up"],
    };
  if (p.includes("accuracy") || p.includes("q3"))
    return {
      intro: "Q3 2026 forecast accuracy, from the published review FR-2026-005:",
      table: [
        ["Metric", "Forecast", "Actual"],
        ["Q3 revenue", "$124.2M", "$124.2M"],
        ["Q3 gross margin", "45.2%", "45.6%"],
        ["Q3 EBITDA margin", "45.1%", "45.5%"],
        ["Closing cash, Oct 31", "$55.9M", "$58.6M"],
      ],
      sections: [
        {
          title: "Takeaway",
          items: [
            "Revenue landed exactly on forecast. The gold price ran ahead of the plan deck and offset Sagebrush cost pressure.",
            "The FY2027 budget now states its planning price assumption explicitly instead of burying it in the deck.",
          ],
        },
      ],
      confidence: "High",
      agents: ["Financial Analysis Agent"],
      sources: ["FR-2026-005", "SAP S/4HANA"],
      actions: ["Ask Follow-up"],
    };
  if (p.includes("fy2027") || p.includes("budget") && p.includes("summar"))
    return {
      intro: "The FY2027 budget, currently in internal review as FR-2026-012:",
      sections: [
        {
          title: "Headlines",
          items: [
            "Revenue $428.0M, gross margin 44.6% and EBITDA of $190.0M at a 44.4% margin.",
            "The budget is struck at a planning price below the US$4,072 per oz realized year to date.",
          ],
        },
        {
          title: "Assumptions to challenge",
          items: [
            "Production growth is concentrated at Keno Ridge; Copperline carries the growth capex toward its $128.0M approved project budget.",
            "USD/CAD is budgeted at 1.36. The downside, gold at US$3,400 per oz, diesel up 15% and USD/CAD at 1.43, takes FY2027 revenue to about $364.1M.",
            "The budget goes to the board on Dec 11, 2026 after internal review and CFO sign-off, with the downside as an appendix.",
          ],
        },
      ],
      confidence: "Moderate, the budget is still in internal review",
      agents: ["Forecasting Agent"],
      sources: ["FR-2026-012", "FY2027 Budget Book"],
      actions: ["Open Forecast Review", "Ask Follow-up"],
    };
  if (p.includes("site") || p.includes("keno") || p.includes("sagebrush") || p.includes("copperline") || p.includes("entity"))
    return {
      intro: "Performance by site, Jan to Oct 2026:",
      table: [
        ["Site", "Revenue", "Budget", "Gross margin"],
        ["Keno Ridge", "$246.8M", "$224.5M", "46.8%"],
        ["Sagebrush", "$142.6M", "$128.1M", "40.8%"],
        ["Copperline JV", "$0.0M", "$0.0M", "n/a"],
      ],
      sections: [
        {
          title: "Reading the table",
          items: [
            "Both producing sites are ahead of budget on price. Keno Ridge has the largest beat, $22.3M.",
            "Sagebrush has the weakest margin and the stalest data: its actuals come from spreadsheet uploads while Sage 300 authentication is expired. Copperline is a development project and carries no revenue.",
          ],
        },
      ],
      confidence: "High for Keno Ridge; moderate for Sagebrush until its data is current",
      agents: ["Variance Analysis Agent"],
      sources: ["SAP S/4HANA", "Spreadsheet uploads, site cost reports"],
      actions: ["Ask Follow-up"],
    };
  return {
    intro:
      "Here is the year to date position against budget, and what needs attention before the production guidance is approved.",
    sections: [
      {
        title: "1. Performance against budget",
        items: [
          "Revenue $389.4M against a $352.6M budget, +10.4%.",
          "Gross margin 44.6% and EBITDA $172.8M at a 44.4% margin.",
          "Production of 71,380 oz at a realized price of US$4,072 per oz.",
        ],
      },
      {
        title: "2. What drove it",
        items: [
          "The gold price is the largest single driver; production is close to plan, so the beat is price, not volume.",
          "Keno Ridge grades added to the price effect, and Sagebrush throughput ran ahead of plan.",
          "Sagebrush diesel and contract mining costs pushed AISC to US$1,588 per oz against a US$1,540 budget.",
        ],
      },
      {
        title: "3. What needs attention",
        items: [
          "FR-2026-008, the production guidance update, is at Approval and needs a VP Finance and CFO decision.",
          "The Copperline JV operator statement differs from the accrual by $253,500; JE-2026-0874 corrects it once approved.",
          "Sagebrush actuals come from spreadsheet uploads because Sage 300 authentication has expired; restore it before FR-2026-008 is published.",
        ],
      },
    ],
    confidence: "High at group level; Sagebrush cost detail is limited by uploaded data",
    limitations: [
      "Sagebrush actuals are from spreadsheet uploads (Sage 300 authentication expired).",
      "Payroll actuals are estimated while the ADP sync is stale.",
    ],
    agents: ["Variance Analysis Agent", "Forecasting Agent"],
    sources: ["SAP S/4HANA", "RBC Royal Bank feed", "Wells Fargo feed"],
    actions: ["Open in Scenario Modeling", "Ask Follow-up"],
  };
}
