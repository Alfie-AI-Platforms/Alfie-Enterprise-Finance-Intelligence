// Illustrative sample data for the Planning & FP&A module. Figures follow
// INDUSTRY_BRIEFS.md: YTD revenue $139.2M against a $142.8M budget, gross
// margin 26.8% against a 29.0% budget, EBITDA $13.2M at 9.5%, FY2027 budget
// revenue $152.0M, forecast review FR-2026-021 at the approval stage,
// downside scenario of steel prices up a further 8%, USD/CAD 1.43 and
// agricultural demand down 5%.

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

/** FP&A Manager approval authority: forecast revenue change, in percent. */
export const DIRECTOR_FORECAST_AUTHORITY = 1.5;
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
  { key: "rev", label: "YTD Revenue", value: "$139.2M", delta: "-2.5% vs $142.8M budget", up: false, good: false, prompt: "Explain our revenue variance against budget year to date." },
  { key: "gm", label: "Gross Margin", value: "26.8%", delta: "-2.2 pts vs 29.0% budget", up: false, good: false, prompt: "What is driving our gross margin against budget?" },
  { key: "ebitda", label: "EBITDA", value: "$13.2M", delta: "9.5% margin, year to date", up: false, good: false, prompt: "Explain our EBITDA performance against budget year to date." },
  { key: "q4", label: "Q4 Forecast Revenue", value: "$35.8M", delta: "FR-2026-021 is at approval", up: false, good: true, prompt: "Walk me through the Q4 forecast review FR-2026-021." },
  { key: "fy27", label: "FY2027 Budget Revenue", value: "$152.0M", delta: "In internal review, FR-2026-018", up: true, good: true, prompt: "Summarize the FY2027 budget and its main assumptions." },
] as const;

// Jan to Oct 2026. Actuals sum to $139.2M and budgets to $142.8M; October
// actual revenue is the $14.6M from the brief, on budget for the month.
export const monthlyRevenue: MonthRow[] = [
  { period: "Jan", actual: 12.4, budget: 12.6, grossMargin: 27.9, ebitdaMargin: 10.2 },
  { period: "Feb", actual: 12.8, budget: 13.0, grossMargin: 28.1, ebitdaMargin: 10.4 },
  { period: "Mar", actual: 14.2, budget: 14.4, grossMargin: 28.6, ebitdaMargin: 11.0 },
  { period: "Apr", actual: 14.8, budget: 14.9, grossMargin: 28.8, ebitdaMargin: 11.2 },
  { period: "May", actual: 15.1, budget: 15.2, grossMargin: 28.5, ebitdaMargin: 10.9 },
  { period: "Jun", actual: 14.6, budget: 14.8, grossMargin: 27.7, ebitdaMargin: 10.3 },
  { period: "Jul", actual: 13.9, budget: 14.5, grossMargin: 25.6, ebitdaMargin: 8.6 },
  { period: "Aug", actual: 13.8, budget: 14.6, grossMargin: 25.0, ebitdaMargin: 8.1 },
  { period: "Sep", actual: 13.0, budget: 14.2, grossMargin: 24.2, ebitdaMargin: 7.3 },
  { period: "Oct", actual: 14.6, budget: 14.6, grossMargin: 23.5, ebitdaMargin: 6.8 },
];

// Plant revenues sum to the $139.2M group total and budgets to $142.8M.
export const entities: EntityRow[] = [
  { entity: "Precision", detail: "Guelph, Plant 1, CAD", revenue: 72.6, budget: 74.9, grossMargin: 27.4, ebitdaMargin: 10.1 },
  { entity: "Fabrication", detail: "Drummondville, Plant 2, CAD", revenue: 38.9, budget: 39.6, grossMargin: 24.8, ebitdaMargin: 7.9 },
  { entity: "Assembly", detail: "Fort Wayne, Plant 3, USD", revenue: 27.7, budget: 28.3, grossMargin: 27.9, ebitdaMargin: 10.4 },
];

// ---------- Scenario modeling (illustrative arithmetic, not a forecast) ----------
// Stated assumptions, shown wherever scenario results appear: steel is 24%
// of revenue in plant costs, 19.9% of group revenue is USD denominated
// (the Assembly share), the base FX rate is USD/CAD 1.36, and the
// operating expense ratio is 17.3% (gross margin 26.8% less the 9.5%
// EBITDA margin).
export const planConstants = {
  grossMargin: 26.8,
  opexRatio: 17.3,
  steelSharePct: 24,
  usdSharePct: 19.9,
  baseFxRate: 1.36,
} as const;

export const basePlanScenario: PlanScenarioInputs = {
  revenue: 152.0,
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
    owner: "Julia Santos",
    created: "Nov 10, 2026",
    note: "The FY2027 budget as submitted to internal review in FR-2026-018: revenue $152.0M, gross margin 26.8%, EBITDA margin 9.5%.",
  },
  {
    id: "SCN-B",
    name: "Scenario B, downside, steel, FX and demand",
    inputs: { ...basePlanScenario, steelPct: 8, fxRate: 1.43, volumePct: -5 },
    status: "Under Review",
    owner: "Julia Santos",
    created: "Nov 14, 2026",
    note: "Steel prices up a further 8%, USD/CAD at 1.43 and agricultural demand down 5%. Attached to forecast review FR-2026-021 and used as the downside in Treasury.",
  },
  {
    id: "SCN-C",
    name: "Scenario C, Assembly volume upside",
    inputs: { ...basePlanScenario, volumePct: 4 },
    status: "Draft",
    owner: "Julia Santos",
    created: "Nov 15, 2026",
    note: "A prospective Assembly contract at full volume from Q2. Revenue upside only; the labour and tooling to serve it are not yet in the plan.",
  },
];

// ---------- Forecast reviews ----------
export const forecastReviews: ForecastReview[] = [
  {
    id: "FR-2026-021",
    title: "Q4 2026 forecast update",
    scope: "Group, all plants",
    current: "Q4 revenue forecast $36.4M (October forecast)",
    proposedChangePct: -1.6,
    changeSummary: "Q4 revenue forecast cut to $35.8M",
    impactSummary:
      "FY2026 forecast revenue becomes $160.4M. The cut is agricultural order timing at Precision and Fabrication; Assembly is unchanged. The attached downside scenario shows the steel, FX and demand sensitivity in the same pack.",
    stage: 5,
    status: "Pending Approval",
    owner: "Julia Santos",
    comments: [
      {
        who: "Julia Santos, FP&A Manager",
        when: "Nov 14",
        text: "Q4 revenue cut to $35.8M on deferred agricultural orders at Precision and Fabrication. October actuals are in: revenue was on budget, but margin was the weakest month of the year on steel and scrap.",
      },
      {
        who: "Sarah Mitchell, VP Finance",
        when: "Nov 15",
        text: "The 1.6% cut is above Julia's 1.5% authority, so the approval is mine to record. Please attach the downside scenario before approval so the steel exposure is visible in the same pack.",
      },
      {
        who: "Alfie",
        when: "Nov 15",
        text: "Downside scenario attached: a further 8% steel rise removes about 1.9 points of gross margin, and agricultural demand down 5% is the larger revenue risk. No change to the revenue proposal.",
      },
    ],
  },
  {
    id: "FR-2026-018",
    title: "FY2027 annual budget",
    scope: "Group, all plants",
    current: "FY2027 draft revenue $149.8M (October build)",
    proposedChangePct: 1.5,
    changeSummary: "FY2027 budget revenue set at $152.0M",
    impactSummary:
      "Gross margin budgeted at 26.8% and EBITDA at $14.4M (9.5%), assuming the January standard revision takes effect (steel standard $1,175 per tonne, scrap factor 3.0%) and steel holds at current levels. Precision carries the volume plan; Assembly carries the USD exposure.",
    stage: 4,
    status: "In Review",
    owner: "Julia Santos",
    comments: [
      {
        who: "Priya Nair, Controller",
        when: "Nov 13",
        text: "Plant trial balances agree to the budget build. The build uses October actuals before the JE-2026-1142 true-up; the $318,000 adjustment is carried as a known item in the pack.",
      },
    ],
  },
  {
    id: "FR-2026-014",
    title: "Q3 2026 forecast",
    scope: "Group, all plants",
    current: "Q3 revenue forecast $40.4M",
    proposedChangePct: 0.7,
    changeSummary: "Q3 revenue forecast raised to $40.7M at approval",
    impactSummary:
      "Published in August. Actual Q3 revenue came in at $40.7M, on forecast, while gross margin ran light as steel moved above the January standard.",
    stage: 7,
    status: "Published",
    owner: "Julia Santos",
    comments: [],
  },
  {
    id: "FR-2026-009",
    title: "Q2 2026 forecast",
    scope: "Group, all plants",
    current: "Q2 revenue forecast $44.9M",
    proposedChangePct: -0.9,
    changeSummary: "Q2 revenue forecast trimmed to $44.5M at approval",
    impactSummary: "Published in May. Retained as the comparison point for forecast accuracy reporting.",
    stage: 7,
    status: "Published",
    owner: "Julia Santos",
    comments: [],
  },
];

export const boardRecord = {
  review: "FR-2026-018",
  package: "FY2027 budget book",
  meeting: "Board meeting, Dec 9, 2026",
  submitted: "Draft in preparation",
  status: "Internal review and CFO sign-off come first",
  note: "The board sees the approved budget only. The downside scenario is included as an appendix, with the steel, FX and agricultural demand assumptions stated, so the board pack and the internal review tell the same story.",
};

export const forecastAccuracy = {
  review: "FR-2026-014",
  published: "Published Aug 14, 2026, after CFO sign-off",
  rows: [
    { metric: "Q3 revenue", projected: "$40.7M", actual: "$40.7M", note: "On forecast." },
    { metric: "Q3 gross margin", projected: "25.4%", actual: "25.0%", note: "Steel ran above the January standard." },
    { metric: "Q3 EBITDA margin", projected: "8.4%", actual: "8.0%", note: "Scrap on Line 3 rose after the tooling change." },
    { metric: "Q3 closing cash", projected: "$9.1M", actual: "$9.6M at Oct 31", note: "Collections ran ahead of forecast." },
  ],
};

// ---------- Planning exceptions ----------
export const planningExceptions: PlanningException[] = [
  {
    id: "EXC-01",
    segment: "Precision",
    metric: "October material variance",
    observed: "$212,000 unfavourable on the Series 400 gear housing family",
    threshold: "Monthly material variance within $75,000",
    period: "Oct 2026",
    severity: "High",
    detail:
      "Steel price is the largest piece (standard $1,040 per tonne against a $1,186 actual average since July), followed by usage: scrap on Line 3 rose from 2.1% to 3.4% after the August tooling change, plus a smaller labour rate piece. Because standards are stale, October cost of goods sold is understated and inventory overstated by $318,000, and reported margin on AgriCore Equipment and Prairie Implement is overstated by about 2.3 points.",
    investigation:
      "JE-2026-1142 is prepared to true up inventory and COGS by $318,000 and is awaiting Controller review and CFO approval. The January standard revision (steel to $1,175 per tonne, scrap factor to 3.0%) is drafted alongside it.",
    owner: "Lucas Meyer",
    status: "Escalated to Accounting, JE-2026-1142",
  },
  {
    id: "EXC-02",
    segment: "Fabrication",
    metric: "Forecast data confidence",
    observed: "Plant 2 cost actuals are 2 days old",
    threshold: "Plant actuals no more than 1 day old",
    period: "Nov 2026",
    severity: "Medium",
    detail:
      "The Plex MES feed sync is stale by 2 days, so Fabrication production and cost figures in the forecast lag the plant. Revenue is unaffected; the exposure is in plant cost and margin.",
    investigation:
      "Restore the Plex MES sync in Data Sources, then refresh Fabrication actuals before FR-2026-021 is published.",
    owner: "Lucas Meyer",
    status: "Open",
  },
  {
    id: "EXC-03",
    segment: "Assembly",
    metric: "Legacy system actuals",
    observed: "Sage 300 authentication expired at Plant 3",
    threshold: "Entity actuals from the system of record",
    period: "Nov 2026",
    severity: "Medium",
    detail:
      "Assembly figures in the forecast come from spreadsheet uploads rather than Sage 300 until access is restored. The Epicor Kinetic cutover on February 12, 2027 removes the dependency.",
    investigation: "Restore the Sage 300 authentication in Data Sources; no forecast change needed at this size.",
    owner: "Julia Santos",
    status: "Monitoring",
  },
  {
    id: "EXC-04",
    segment: "Group",
    metric: "Steel price exposure",
    observed: "Steel is 24% of revenue in plant costs",
    threshold: "Single input above 15% of revenue is scenario tested",
    period: "FY2027",
    severity: "High",
    detail:
      "A further 8% steel price rise removes about 1.9 points of gross margin in the scenario engine. Standards were set in January at $1,040 per tonne against a $1,186 actual average since July, so the exposure sits in current costs as well as the downside case.",
    investigation:
      "Already scenario tested as Scenario B and attached to FR-2026-021. Pricing pass-through discussions sit with the commercial team, not FP&A.",
    owner: "Julia Santos",
    status: "Escalated to Forecast Review FR-2026-021",
  },
];

// ---------- Data sources and audit ----------
export const planningDataSources = [
  { name: "Epicor Kinetic", type: "Primary ERP", updated: "12 min ago", status: "Connected", coverage: "All plants, 2022 to present", validation: "Validated" },
  { name: "TD Bank feed", type: "Bank feed", updated: "26 min ago", status: "Connected", coverage: "Operating and term loan accounts", validation: "Validated" },
  { name: "Chase Bank feed", type: "Bank feed", updated: "31 min ago", status: "Connected", coverage: "Plant 3 operating, USD", validation: "Validated" },
  { name: "Plex MES", type: "MES and plant costs", updated: "2 days ago", status: "Needs attention", coverage: "Plant 1 and Plant 2 production", validation: "Sync stale" },
  { name: "Sage 300, Plant 3", type: "Legacy ERP", updated: "9 days ago", status: "Authentication expired", coverage: "Plant 3 entity", validation: "Incomplete" },
  { name: "Spreadsheet uploads", type: "Manual", updated: "Nov 15, 2026", status: "Connected", coverage: "Plant 3 cost summaries", validation: "Checked on upload" },
];

export const planningAudit: PlanningEvent[] = [
  { time: "Nov 15, 2026 09:12", actor: "Julia Santos", type: "User", action: "Forecast review opened", detail: "Q4 2026 forecast update (FR-2026-021)" },
  { time: "Nov 15, 2026 09:12", actor: "Alfie", type: "Alfie", action: "Data retrieved", detail: "Epicor Kinetic, Plex MES, TD and Chase feeds, Jan to Oct 2026" },
  { time: "Nov 15, 2026 09:13", actor: "Variance Analysis Agent", type: "Agent", action: "Variance computed", detail: "YTD revenue -2.5% vs budget; margin bridge led by steel price, then Line 3 scrap" },
  { time: "Nov 15, 2026 09:14", actor: "Alfie", type: "Alfie", action: "Data limitation flagged", detail: "Plant 2 MES actuals 2 days old, Plex sync stale; Plant 3 on spreadsheet uploads" },
  { time: "Nov 15, 2026 09:20", actor: "Julia Santos", type: "User", action: "Scenario attached", detail: "Scenario B, downside steel, FX and demand, attached to FR-2026-021" },
];

// ---------- Planning reports ----------
export const planningReportLibrary: PlanningReportItem[] = [
  {
    id: "PL-101",
    name: "YTD Budget vs Actual Pack, Jan to Oct 2026",
    category: "Budget & Forecast",
    period: "YTD Oct 2026",
    owner: "Julia Santos",
    status: "Published",
    updated: "Nov 12, 2026",
    parameters: "All plants, org metric definitions, compared with the FY2026 budget",
    summary:
      "Revenue of $139.2M is 2.5% behind the $142.8M budget and gross margin is 26.8% against a 29.0% budget. EBITDA is $13.2M at a 9.5% margin. The margin bridge attributes most of the gap to steel price, with Line 3 scrap the second driver.",
    sections: [
      { heading: "Variance summary", body: "Precision is $2.3M behind budget on revenue, Fabrication $0.7M and Assembly $0.6M. Gross margin is 2.2 points behind budget; steel at $1,186 per tonne against a $1,040 standard accounts for the majority of the cost increase since July." },
      { heading: "Watch items", body: "AR over 60 days is $688K, and reported margin on AgriCore Equipment and Prairie Implement is overstated by about 2.3 points until the standard cost true-up in JE-2026-1142 posts. Both are flagged in the pack rather than adjusted away." },
    ],
  },
  {
    id: "PL-102",
    name: "October 2026 Variance Report",
    category: "Variance",
    period: "Oct 2026",
    owner: "Julia Santos",
    status: "Approved",
    updated: "Nov 13, 2026",
    parameters: "Group and plant, actual vs budget vs prior year",
    summary:
      "October revenue of $14.6M was on budget, but gross margin of 23.5% was the weakest month of the year. Material variance on the Series 400 gear housing family was $212,000 unfavourable.",
    sections: [
      { heading: "What moved", body: "Steel price is the largest piece of the variance, followed by Line 3 scrap at 3.4% against a 2.1% standard since the August tooling change, and a smaller labour rate variance at Plant 1." },
      { heading: "Action", body: "No forecast change was made on October alone. The standard revision is drafted for January, and the Q4 review, FR-2026-021, carries the agricultural order timing." },
    ],
  },
  {
    id: "PL-103",
    name: "Q4 2026 Forecast Summary",
    category: "Budget & Forecast",
    period: "Q4 2026",
    owner: "Julia Santos",
    status: "Under Review",
    updated: "Nov 15, 2026",
    parameters: "Forecast review FR-2026-021, base case with downside scenario attached",
    summary:
      "Q4 revenue is forecast at $35.8M, taking FY2026 to $160.4M. The forecast is at the approval stage in FR-2026-021 and is not final until it is approved and published.",
    sections: [
      { heading: "Basis", body: "October actuals, the November order book, and December seasonality including the holiday shutdown. Agricultural order deferrals at Precision and Fabrication drive the 1.6% cut from the prior forecast of $36.4M." },
      { heading: "Sensitivity", body: "The downside scenario (steel up a further 8%, USD/CAD 1.43, agricultural demand down 5%) reduces gross margin by about 1.9 points and revenue by about 5%." },
    ],
  },
  {
    id: "PL-104",
    name: "FY2027 Budget Book",
    category: "Board Reporting",
    period: "FY2027",
    owner: "Julia Santos",
    status: "Draft",
    updated: "Nov 15, 2026",
    parameters: "Forecast review FR-2026-018, board format, downside scenario as appendix",
    summary:
      "The FY2027 budget is revenue of $152.0M, gross margin of 26.8% and EBITDA of $14.4M. It is in internal review and goes to the board on Dec 9, 2026 once approved.",
    sections: [
      { heading: "Assumptions", body: "The January standard revision (steel at $1,175 per tonne, scrap factor 3.0%), USD/CAD at 1.36, Assembly volumes flat until the Epicor cutover, and the operating expense ratio held at 17.3% of revenue." },
      { heading: "Risks", body: "Steel is 24% of revenue in plant costs, so the margin plan is exposed to a single input. The downside scenario in the appendix quantifies a further 8% steel rise, USD/CAD at 1.43 and agricultural demand down 5%." },
    ],
  },
  {
    id: "PL-105",
    name: "Downside Scenario Assessment, Steel, FX and Demand",
    category: "Scenarios",
    period: "FY2027",
    owner: "Julia Santos",
    status: "Approved",
    updated: "Nov 14, 2026",
    parameters: "Scenario B, steel +8%, USD/CAD 1.43, agricultural demand -5%, scenario engine assumptions as stated",
    summary:
      "Under the downside scenario, FY2027 revenue falls to $145.9M on the demand decline, partly offset by USD translation, while gross margin falls to 24.9% and EBITDA falls to about $11.1M. Margin and volume fall together in this case.",
    sections: [
      { heading: "Method", body: "Simple arithmetic on stated assumptions: steel at 24% of revenue, USD denominated revenue at 19.9% of the group, operating expenses held at 17.3% of revenue. It is a sensitivity, not a forecast." },
      { heading: "Use", body: "Attached to FR-2026-021, used as the downside case in Treasury, and included as an appendix to the FY2027 budget book." },
    ],
  },
  {
    id: "PL-106",
    name: "Q3 2026 Forecast Accuracy Review",
    category: "Forecast Reviews",
    period: "Q3 2026",
    owner: "Julia Santos",
    status: "Published",
    updated: "Oct 20, 2026",
    parameters: "Forecast review FR-2026-014, projected vs actual",
    summary:
      "Q3 revenue was forecast at $40.7M and came in at $40.7M, on forecast. Gross margin was 0.4 points light as steel ran above the January standard through the quarter.",
    sections: [
      { heading: "Detail", body: "Revenue variance of 0.0%, gross margin 25.0% against 25.4% forecast, EBITDA margin 8.0% against 8.4%. Closing cash was $9.6M at Oct 31 against a $9.1M forecast." },
      { heading: "Lesson", body: "Steel price was the recurring miss: actuals have run above the January standard since July, and the Q4 forecast now carries the $1,186 run rate explicitly until the January revision." },
    ],
  },
];

export const scheduledPlanningReports = [
  { name: "Monthly Budget vs Actual Pack", schedule: "Monthly, 3rd business day after close", lastRun: "Nov 12, delivered to Finance leadership", status: "Active" },
  { name: "Weekly Revenue Flash", schedule: "Weekly, Monday 7:00 AM", lastRun: "Monday, delivered to Julia Santos and Sarah Mitchell", status: "Active" },
  { name: "Quarterly Forecast Pack", schedule: "Quarterly, with the forecast review", lastRun: "Oct 20, delivered with FR-2026-014 accuracy review", status: "Active" },
  { name: "Board Finance Pack", schedule: "Monthly, ahead of the board meeting", lastRun: "Nov 13, October pack delivered", status: "Active" },
];

// ---------- Planning overview (index page) ----------
export const planningPrompts = [
  "Explain our revenue variance against budget year to date.",
  "Why did gross margin fall through the year?",
  "What is driving our gross margin against budget?",
  "Walk me through the Q4 forecast review FR-2026-021.",
  "What happens to FY2027 EBITDA if steel prices rise a further 8%?",
  "Compare forecast accuracy for Q3 against the published forecast.",
  "Summarize the FY2027 budget and its main assumptions.",
  "Which plant is furthest behind budget, and why?",
];

export const planningOverview: PlanningOverview = {
  budgetGrossMargin: 29.0,
  groupVarianceNote: "Group variance is -$3.6M.",
  entityNote:
    "All three plants are behind budget on revenue. Precision has the largest shortfall, and margin is the bigger story: steel and Line 3 scrap drive the Q4 forecast review.",
};

// ---------- Forecast review page ----------
export const planningApprovalImpact: PlanningApprovalImpact = {
  reviewId: "FR-2026-021",
  rows: [
    ["Q4 revenue forecast", "$36.4M", "$35.8M"],
    ["FY2026 forecast revenue", "$161.0M", "$160.4M"],
    ["Gross margin, base case", "26.8%", "26.8% (downside 24.9%)"],
  ],
};

export const planningReviewDefaults = {
  groupScope: "Group, all plants",
  owner: "Julia Santos",
};

// ---------- Generated planning reports ----------
export const planningGeneratedReport = {
  owner: "Julia Santos",
  groupSummary:
    "Group revenue is $139.2M year to date against a $142.8M budget, gross margin is 26.8% and EBITDA is $13.2M.",
  sourcesNote:
    "Epicor Kinetic (primary ERP), Plex MES plant costs, TD and Chase bank feeds. Plant 2 cost figures lag 2 days while the Plex MES sync is stale, and Plant 3 figures rely on spreadsheet uploads until the February cutover.",
};

// ---------- Scenario modeling copy ----------
/** The downside preset inputs, applied on top of the builder's current values. */
export const planDownsideOverrides: Partial<PlanScenarioInputs> = { steelPct: 8, fxRate: 1.43, volumePct: -5 };
/** The volume upside preset inputs, applied on top of the builder's current values. */
export const planUpsideOverrides: Partial<PlanScenarioInputs> = { steelPct: 0, fxRate: 1.36, volumePct: 4 };

export const scenarioCopy: ScenarioCopy = {
  costInputLabel: "Steel price change",
  costInputName: "steel",
  costInputTitle: "Steel",
  volumeHint:
    "Shipped and billed volume across the group. Scenario C tests +4% from a prospective Assembly contract.",
  costHint:
    "Steel is 24% of revenue in plant costs, so each 1% on steel is about 0.24 points of gross margin.",
  downsideLabel: "Downside, steel, FX and demand",
  alfieNote:
    "Scenario B (steel +8%, USD/CAD 1.43, agricultural demand -5%) is the downside attached to forecast review FR-2026-021 and the downside case in Treasury. Alfie recommends keeping Scenario C (volume upside) out of the approval pack until the Assembly contract is signed: it models the revenue without the labour and tooling needed to serve it. Neither scenario changes anything in the budget or forecast on its own.",
  sensitivityNote:
    "One variable at a time, everything else held at the builder values. Each 5 points on steel is about 1.2 points of gross margin, which is the sensitivity finding Alfie carries into the forecast review and the budget book appendix.",
  comparisonNote:
    "All scenarios share the FY2027 budget baseline and the stated assumptions. Under those assumptions the strongest EBITDA comes from the volume upside, and the weakest from the steel and demand downside, where revenue and margin fall together. That trade-off is the decision, and it belongs to the Forecast Review, not to this page.",
  driverRevenuePhrase: "on volume and translation",
  driverMarginPhrase: "on input costs",
};

// ---------- Planning Analysis conversation ----------
export const planningAnalysisContext: PlanningAnalysisContext = {
  title: "FY2026 Forecast and Variance Analysis",
  subtitle:
    "Performance against budget, the margin bridge, and the assumptions the FY2027 budget rests on.",
  firstQuestion:
    "Explain our performance against budget year to date and what needs attention before the Q4 forecast is approved.",
  details: [
    ["Analysis", "FY2026 Forecast and Variance"],
    ["ID", "FA-2026-027"],
    ["Scope", "Group, all plants"],
    ["Reporting period", "Jan to Oct 2026"],
    ["Created by", "Julia Santos"],
    ["Created", "Nov 15, 2026"],
    ["Last updated", "Just now"],
    ["Status", "In progress"],
  ],
  groupInfo: [
    ["YTD revenue", "$139.2M"],
    ["YTD budget", "$142.8M"],
    ["Gross margin", "26.8%"],
    ["EBITDA", "$13.2M (9.5%)"],
    ["Q4 forecast revenue", "$35.8M"],
    ["FY2027 budget revenue", "$152.0M"],
  ],
  keyFindings: [
    "Revenue -2.5% vs budget YTD; margin fell through the year to 23.5% in October.",
    "Steel at $1,186 per tonne against a $1,040 standard is the largest margin driver.",
    "Line 3 scrap rose from 2.1% to 3.4% after the August tooling change.",
    "Plant 2 cost actuals are 2 days old, Plex MES sync stale.",
  ],
};

export const planningAnalysisFollowUps = [
  "Why did gross margin fall this year?",
  "What happens if steel prices rise a further 8%?",
  "Walk me through FR-2026-021.",
  "Compare Q3 forecast accuracy.",
  "Summarize the FY2027 budget.",
];

/** Follow-up patterns that advance the analysis workflow stage in the page. */
export const planningAnalysisPatterns = {
  scenario: /scenario|steel|scrap|%|downside/i,
  review: /fr-2026|review/i,
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
              ? `${f.name}: budget figures by plant and month; totals agree to the $142.8M YTD budget in Epicor Kinetic.`
              : /forecast/i.test(f.name)
                ? `${f.name}: forecast assumptions detected; the steel, FX and demand assumptions match Scenario B.`
                : /xlsx|csv/i.test(f.name)
                  ? `${f.name}: structured data detected; columns mapped to plant, period, revenue and cost.`
                  : `${f.name}: narrative content summarized; no conflicting assumptions found.`,
          ),
        },
        {
          title: "How it affects this analysis",
          items: [
            "Used as conversation context only, not added to the planning data in Epicor Kinetic.",
            "Figures from uploaded files are treated as unverified until reconciled with source systems.",
          ],
        },
      ],
      confidence: "Moderate, uploaded data not yet reconciled",
      sources: files.map((f) => f.name),
      actions: ["Add to repository", "Ask Follow-up"],
    };
  if (p.includes("steel") || p.includes("downside") || p.includes("8%")) {
    const b = runPlanScenario(basePlanScenario);
    const d = runPlanScenario({ ...basePlanScenario, steelPct: 8, fxRate: 1.43, volumePct: -5 });
    return {
      intro:
        "The downside scenario from Planning, applied to the FY2027 budget: steel prices up a further 8%, USD/CAD at 1.43 and agricultural demand down 5%, on the stated scenario assumptions.",
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
            "Revenue falls on the agricultural demand decline, partly offset by USD translation. Margin falls further: steel at 24% of revenue turns a further 8% price rise into about 1.9 points of gross margin.",
            "This is the scenario attached to FR-2026-021 and used as the downside case in Treasury.",
          ],
        },
      ],
      confidence: "Illustrative, simple arithmetic on stated assumptions, not a forecast",
      limitations: ["Steel share and USD share are planning assumptions, reviewed in Forecast Reviews.", "No price pass-through to customers is modeled."],
      agents: ["Scenario Agent"],
      sources: ["Scenario B", "Epicor Kinetic"],
      actions: ["Open in Scenario Modeling", "Ask Follow-up"],
    };
  }
  if (p.includes("margin"))
    return {
      intro:
        "Gross margin is 26.8% year to date against a 29.0% budget, and it has fallen through the year, from 28.6% in March to 23.5% in October. Two drivers explain almost all of it:",
      table: [
        ["Driver", "What happened"],
        ["Steel price", "Standard $1,040 per tonne set in January; actual average $1,186 since July, up 14%"],
        ["Scrap, Line 3", "Rose from 2.1% to 3.4% after the August tooling change"],
        ["Labour rate", "A smaller rate variance at Plant 1"],
      ],
      sections: [
        {
          title: "What it did to reported numbers",
          items: [
            "October material variance on the Series 400 gear housing family was $212,000 unfavourable, and because standards are stale, October cost of goods sold is understated and inventory overstated by $318,000.",
            "Reported margin on the two largest customers, AgriCore Equipment and Prairie Implement, is overstated by about 2.3 points until the true-up posts.",
            "JE-2026-1142 trues up inventory and COGS by $318,000 and is awaiting Controller review and CFO approval.",
          ],
        },
        {
          title: "What happens next",
          items: [
            "The January standard revision (steel to $1,175 per tonne, scrap factor to 3.0%) is drafted alongside the entry.",
            "FR-2026-021 carries the current margin run rate into the Q4 forecast; it does not assume steel relief.",
          ],
        },
      ],
      confidence: "High",
      agents: ["Variance Analysis Agent", "Cost Variance Agent"],
      sources: ["Epicor Kinetic", "Plex MES"],
      actions: ["Open Forecast Review", "Ask Follow-up"],
    };
  if (p.includes("october"))
    return {
      intro: "October 2026 revenue was on budget; margin was the weakest month of the year:",
      table: [
        ["Measure", "October", "Year to date"],
        ["Revenue", "$14.6M", "$139.2M"],
        ["Gross margin", "23.5%", "26.8%"],
        ["EBITDA margin", "6.8%", "9.5%"],
      ],
      sections: [
        {
          title: "What happened",
          items: [
            "Steel price and Line 3 scrap drove a $212,000 unfavourable material variance on the Series 400 gear housing family.",
            "Revenue held on agricultural shipments, but the cost of making them ran ahead of standards set in January.",
          ],
        },
        {
          title: "What FP&A did with it",
          items: [
            "No revenue forecast change was made on October alone. The Q4 cut in FR-2026-021 is agricultural order timing, and the standard revision is drafted for January.",
          ],
        },
      ],
      confidence: "High",
      agents: ["Variance Analysis Agent"],
      sources: ["Epicor Kinetic", "Plex MES"],
      actions: ["Open Forecast Review", "Ask Follow-up"],
    };
  if (p.includes("fr-2026-021") || p.includes("forecast review") || p.includes("q4"))
    return {
      intro:
        "FR-2026-021 is the Q4 2026 forecast update, prepared by Julia Santos, and it is at the Approval stage:",
      sections: [
        {
          title: "The proposal",
          items: [
            "Q4 revenue forecast cut from $36.4M to $35.8M, a change of -1.6%, on deferred agricultural orders at Precision and Fabrication.",
            "FY2026 forecast revenue becomes $160.4M. Assembly is unchanged.",
          ],
        },
        {
          title: "Evidence and approvals",
          items: [
            "October actuals are in: revenue on budget, margin the weakest month of the year on steel and scrap.",
            "The downside scenario (steel up a further 8%, USD/CAD 1.43, agricultural demand down 5%) is attached at Sarah Mitchell's request, so the steel exposure is visible in the same pack.",
            "The -1.6% change exceeds the FP&A Manager authority of 1.5%, so approval sits with the VP Finance or CFO. Publishing follows CFO sign-off.",
          ],
        },
      ],
      confidence: "High for the revenue line; margin depends on steel prices holding",
      limitations: ["Plant 2 cost actuals are 2 days old because the Plex MES sync is stale."],
      agents: ["Forecasting Agent", "Variance Analysis Agent"],
      sources: ["FR-2026-021", "Scenario B", "Epicor Kinetic"],
      actions: ["Open Forecast Review", "Ask Follow-up"],
    };
  if (p.includes("accuracy") || p.includes("q3"))
    return {
      intro: "Q3 2026 forecast accuracy, from the published review FR-2026-014:",
      table: [
        ["Metric", "Forecast", "Actual"],
        ["Q3 revenue", "$40.7M", "$40.7M"],
        ["Q3 gross margin", "25.4%", "25.0%"],
        ["Q3 EBITDA margin", "8.4%", "8.0%"],
        ["Closing cash, Oct 31", "$9.1M", "$9.6M"],
      ],
      sections: [
        {
          title: "Takeaway",
          items: [
            "Revenue landed exactly on forecast; margin did not. Steel ran above the January standard all quarter.",
            "The Q4 forecast now carries the $1,186 per tonne run rate explicitly until the January standard revision.",
          ],
        },
      ],
      confidence: "High",
      agents: ["Financial Analysis Agent"],
      sources: ["FR-2026-014", "Epicor Kinetic"],
      actions: ["Ask Follow-up"],
    };
  if (p.includes("fy2027") || p.includes("budget") && p.includes("summar"))
    return {
      intro: "The FY2027 budget, currently in internal review as FR-2026-018:",
      sections: [
        {
          title: "Headlines",
          items: [
            "Revenue $152.0M, with gross margin held at 26.8% and EBITDA of $14.4M at a 9.5% margin.",
            "The budget assumes the January standard revision takes effect: steel standard $1,175 per tonne, scrap factor 3.0%.",
          ],
        },
        {
          title: "Assumptions to challenge",
          items: [
            "Volume growth is concentrated in Precision; Assembly carries the USD exposure at 19.9% of revenue.",
            "USD/CAD is budgeted at 1.36. The downside at 1.43, with steel up a further 8% and agricultural demand down 5%, takes EBITDA to about $11.1M.",
            "The budget goes to the board on Dec 9, 2026 after internal review and CFO sign-off, with the downside as an appendix.",
          ],
        },
      ],
      confidence: "Moderate, the budget is still in internal review",
      agents: ["Forecasting Agent"],
      sources: ["FR-2026-018", "FY2027 Budget Book"],
      actions: ["Open Forecast Review", "Ask Follow-up"],
    };
  if (p.includes("plant") || p.includes("precision") || p.includes("fabrication") || p.includes("assembly") || p.includes("entity"))
    return {
      intro: "Performance by plant, Jan to Oct 2026:",
      table: [
        ["Plant", "Revenue", "Budget", "Gross margin"],
        ["Precision", "$72.6M", "$74.9M", "27.4%"],
        ["Fabrication", "$38.9M", "$39.6M", "24.8%"],
        ["Assembly", "$27.7M", "$28.3M", "27.9%"],
      ],
      sections: [
        {
          title: "Reading the table",
          items: [
            "All three plants are behind budget on revenue. Precision has the largest shortfall, $2.3M.",
            "Fabrication has the weakest margin and the stalest data: its cost actuals are 2 days old while the Plex MES sync is stale.",
          ],
        },
      ],
      confidence: "High for Precision and Assembly; moderate for Fabrication until its data is current",
      agents: ["Variance Analysis Agent"],
      sources: ["Epicor Kinetic", "Spreadsheet uploads, Plant 3"],
      actions: ["Ask Follow-up"],
    };
  return {
    intro:
      "Here is the year to date position against budget, and what needs attention before the Q4 forecast is approved.",
    sections: [
      {
        title: "1. Performance against budget",
        items: [
          "Revenue $139.2M against a $142.8M budget, -2.5%.",
          "Gross margin 26.8%, 2.2 points behind the 29.0% budget.",
          "EBITDA $13.2M at a 9.5% margin.",
        ],
      },
      {
        title: "2. What drove it",
        items: [
          "Steel price is the largest driver: an actual average of $1,186 per tonne since July against a $1,040 standard set in January.",
          "Line 3 scrap rose from 2.1% to 3.4% after the August tooling change, the second driver, with a smaller labour rate piece at Plant 1.",
          "Agricultural order deferrals at Precision and Fabrication drive the Q4 revenue cut in FR-2026-021.",
        ],
      },
      {
        title: "3. What needs attention",
        items: [
          "FR-2026-021, the Q4 forecast update, is at Approval and needs a VP Finance or CFO decision.",
          "JE-2026-1142 trues up inventory and COGS by $318,000 for the stale standards; it needs Controller review and CFO approval.",
          "Plant 2 cost actuals are 2 days old because the Plex MES sync is stale; refresh them before FR-2026-021 is published.",
        ],
      },
    ],
    confidence: "High at group level; Fabrication cost detail is limited by stale data",
    limitations: [
      "Plant 2 cost actuals are 2 days old (Plex MES sync stale).",
      "Plant 3 figures come from spreadsheet uploads while Sage 300 authentication is expired.",
    ],
    agents: ["Variance Analysis Agent", "Forecasting Agent"],
    sources: ["Epicor Kinetic", "Plex MES", "TD Bank feed", "Chase Bank feed"],
    actions: ["Open in Scenario Modeling", "Ask Follow-up"],
  };
}
