// Illustrative sample data for the Planning & FP&A module. Figures follow
// BUILD_BRIEF.md: YTD revenue $102.6M against a $99.4M budget, gross margin
// 41.2%, EBITDA $12.9M at 12.6%, FY2027 budget revenue $128.0M, forecast
// review FR-2026-011 at the approval stage, downside scenario of steel
// prices +8% and USD/CAD 1.42.

import type { DocSection } from "@/components/document-view";

// ---------- Roles and approval authority ----------
export type PlanningRole = "FP&A Analyst" | "FP&A Director" | "VP Finance" | "CFO" | "Administrator";
export type PlanningPermission =
  | "view"
  | "runAnalysis"
  | "createScenario"
  | "prepareForecast"
  | "reviewAssumptions"
  | "approveForecast"
  | "publishForecast"
  | "manageModels";

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

/** FP&A Director approval authority: forecast revenue change, in percent. */
export const DIRECTOR_FORECAST_AUTHORITY = 1.5;
export function canApproveForecast(role: PlanningRole, changePct: number) {
  if (!canPlanning(role, "approveForecast")) return false;
  if (role === "FP&A Director") return Math.abs(changePct) <= DIRECTOR_FORECAST_AUTHORITY;
  return true;
}

export type ReviewStage =
  | "Draft Prepared"
  | "Data Validated"
  | "Variance Analysis"
  | "Forecast Updated"
  | "Internal Review"
  | "Approval"
  | "CFO Sign-off"
  | "Published";
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
export type ReviewStatus = "Draft" | "In Review" | "Pending Approval" | "Approved" | "Published" | "Rejected";

/** Publishing is only possible once a review is approved at CFO sign-off. */
export function canPublish(role: PlanningRole, status: ReviewStatus) {
  return canPlanning(role, "publishForecast") && status === "Approved";
}

// ---------- Overview ----------
export const kpis = [
  { key: "rev", label: "YTD Revenue", value: "$102.6M", delta: "+3.2% vs $99.4M budget", up: true, good: true, prompt: "Explain our revenue variance against budget year to date." },
  { key: "gm", label: "Gross Margin", value: "41.2%", delta: "+0.4 pts vs budget", up: true, good: true, prompt: "What is driving our gross margin against budget?" },
  { key: "ebitda", label: "EBITDA", value: "$12.9M", delta: "12.6% margin, ahead of the 12.2% budget", up: true, good: true, prompt: "Explain our EBITDA performance against budget year to date." },
  { key: "q4", label: "Q4 Forecast Revenue", value: "$29.0M", delta: "FR-2026-011 is at approval", up: true, good: true, prompt: "Walk me through the Q4 forecast review FR-2026-011." },
  { key: "fy27", label: "FY2027 Budget Revenue", value: "$128.0M", delta: "In internal review, FR-2026-008", up: true, good: true, prompt: "Summarize the FY2027 budget and its main assumptions." },
] as const;

export type MonthRow = {
  period: string;
  actual: number; // $M revenue
  budget: number; // $M revenue
  grossMargin: number; // %
  ebitdaMargin: number; // %
};

// Jan to Oct 2026. Actuals sum to $102.6M and budgets to $99.4M; October
// actual revenue is the $9.8M from the brief.
export const monthlyRevenue: MonthRow[] = [
  { period: "Jan", actual: 9.9, budget: 9.4, grossMargin: 40.6, ebitdaMargin: 11.9 },
  { period: "Feb", actual: 10.0, budget: 9.5, grossMargin: 40.9, ebitdaMargin: 12.2 },
  { period: "Mar", actual: 10.4, budget: 9.9, grossMargin: 41.4, ebitdaMargin: 12.8 },
  { period: "Apr", actual: 10.5, budget: 10.0, grossMargin: 41.8, ebitdaMargin: 13.1 },
  { period: "May", actual: 10.8, budget: 10.2, grossMargin: 42.0, ebitdaMargin: 13.4 },
  { period: "Jun", actual: 10.6, budget: 10.1, grossMargin: 41.5, ebitdaMargin: 12.9 },
  { period: "Jul", actual: 10.2, budget: 9.9, grossMargin: 40.8, ebitdaMargin: 12.0 },
  { period: "Aug", actual: 10.4, budget: 10.1, grossMargin: 41.1, ebitdaMargin: 12.5 },
  { period: "Sep", actual: 10.0, budget: 10.2, grossMargin: 41.3, ebitdaMargin: 12.7 },
  { period: "Oct", actual: 9.8, budget: 10.1, grossMargin: 40.9, ebitdaMargin: 12.2 },
];

export type EntityRow = {
  entity: string;
  detail: string;
  revenue: number; // $M YTD
  budget: number; // $M YTD
  grossMargin: number; // %
  ebitdaMargin: number; // %
};

// Entity revenues sum to the $102.6M group total and budgets to $99.4M.
export const entities: EntityRow[] = [
  { entity: "Manufacturing", detail: "Toronto, CAD", revenue: 58.4, budget: 56.9, grossMargin: 38.2, ebitdaMargin: 11.8 },
  { entity: "Logistics", detail: "Columbus, Ohio, USD", revenue: 27.9, budget: 26.8, grossMargin: 44.0, ebitdaMargin: 13.9 },
  { entity: "Retail", detail: "Vancouver, CAD", revenue: 16.3, budget: 15.7, grossMargin: 47.2, ebitdaMargin: 13.1 },
];

// ---------- Scenario modeling (illustrative arithmetic, not a forecast) ----------
// Stated assumptions, shown wherever scenario results appear: steel is 18%
// of revenue in Manufacturing costs, 27.2% of group revenue is USD
// denominated (the Logistics share), the base FX rate is USD/CAD 1.36, and
// the operating expense ratio is 28.6% (gross margin 41.2% less the 12.6%
// EBITDA margin).
export const planConstants = {
  grossMargin: 41.2,
  opexRatio: 28.6,
  steelSharePct: 18,
  usdSharePct: 27.2,
  baseFxRate: 1.36,
} as const;

export type PlanScenarioInputs = {
  revenue: number; // $M, FY2027 budget revenue base
  growthPct: number; // additional revenue growth, %
  volumePct: number; // volume change, %
  steelPct: number; // steel price change, %
  fxRate: number; // USD/CAD
};
export type PlanScenarioResult = {
  revenue: number;
  grossMargin: number;
  ebitda: number;
  ebitdaMargin: number;
};
export const basePlanScenario: PlanScenarioInputs = {
  revenue: 128.0,
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

export type SeedPlanScenario = {
  id: string;
  name: string;
  inputs: PlanScenarioInputs;
  status: string;
  owner: string;
  created: string;
  note: string;
};

export const seedPlanScenarios: SeedPlanScenario[] = [
  {
    id: "SCN-A",
    name: "Scenario A, FY2027 budget base case",
    inputs: { ...basePlanScenario },
    status: "Approved",
    owner: "Grace Liu",
    created: "Nov 10, 2026",
    note: "The FY2027 budget as submitted to internal review in FR-2026-008: revenue $128.0M, gross margin 41.2%, EBITDA margin 12.6%.",
  },
  {
    id: "SCN-B",
    name: "Scenario B, downside, steel and FX",
    inputs: { ...basePlanScenario, steelPct: 8, fxRate: 1.42 },
    status: "Under Review",
    owner: "Grace Liu",
    created: "Nov 14, 2026",
    note: "Steel prices up 8% and USD/CAD at 1.42. Attached to forecast review FR-2026-011 and used as the downside in Treasury.",
  },
  {
    id: "SCN-C",
    name: "Scenario C, Logistics volume upside",
    inputs: { ...basePlanScenario, volumePct: 4 },
    status: "Draft",
    owner: "Grace Liu",
    created: "Nov 15, 2026",
    note: "Two prospective Logistics contracts at full volume from Q2. Revenue upside only; the hiring and capex to serve it are not yet in the plan.",
  },
];

// ---------- Forecast reviews ----------
export type ForecastReview = {
  id: string;
  title: string;
  scope: string;
  current: string;
  proposedChangePct: number;
  changeSummary: string;
  impactSummary: string;
  stage: number;
  status: ReviewStatus;
  owner: string;
  comments: { who: string; when: string; text: string }[];
};

export const forecastReviews: ForecastReview[] = [
  {
    id: "FR-2026-011",
    title: "Q4 2026 forecast update",
    scope: "Group, all entities",
    current: "Q4 revenue forecast $28.5M (October forecast)",
    proposedChangePct: 1.8,
    changeSummary: "Q4 revenue forecast raised to $29.0M",
    impactSummary:
      "FY2026 forecast revenue becomes $121.8M. Gross margin is held at 41.2% in the base case; the attached downside scenario shows the steel and FX sensitivity in the same pack.",
    stage: 5,
    status: "Pending Approval",
    owner: "Grace Liu",
    comments: [
      {
        who: "Grace Liu, FP&A Director",
        when: "Nov 14",
        text: "Q4 revenue raised to $29.0M on Logistics contract volume. October actuals are in, and November is tracking ahead of the prior forecast.",
      },
      {
        who: "Elena Brooks, VP Finance",
        when: "Nov 15",
        text: "Comfortable with the revenue line. Please attach the downside scenario before approval so the steel exposure is visible in the same pack.",
      },
      {
        who: "Alfie",
        when: "Nov 15",
        text: "Downside scenario attached: steel up 8% and USD/CAD at 1.42 reduce gross margin by about 1.4 points. No change to the revenue proposal.",
      },
    ],
  },
  {
    id: "FR-2026-008",
    title: "FY2027 annual budget",
    scope: "Group, all entities",
    current: "FY2026 forecast revenue $121.8M",
    proposedChangePct: 5.1,
    changeSummary: "FY2027 budget revenue $128.0M, up 5.1% on the FY2026 forecast",
    impactSummary:
      "Gross margin budgeted at 41.2% and EBITDA at $16.1M (12.6%). Manufacturing carries the steel price risk; Logistics carries the volume growth.",
    stage: 4,
    status: "In Review",
    owner: "Grace Liu",
    comments: [
      {
        who: "Marcus Webb, Controller",
        when: "Nov 13",
        text: "Entity trial balances agree to the budget build. The intercompany eliminations in the budget use the corrected October balances.",
      },
    ],
  },
  {
    id: "FR-2026-005",
    title: "Q3 2026 forecast",
    scope: "Group, all entities",
    current: "Q3 revenue forecast $30.2M",
    proposedChangePct: 0.9,
    changeSummary: "Q3 revenue forecast raised to $30.5M at approval",
    impactSummary:
      "Published in August. Actual Q3 revenue came in at $30.6M, within the 2% tolerance the forecast is managed to.",
    stage: 7,
    status: "Published",
    owner: "Grace Liu",
    comments: [],
  },
  {
    id: "FR-2026-002",
    title: "Q2 2026 forecast",
    scope: "Group, all entities",
    current: "Q2 revenue forecast $30.9M",
    proposedChangePct: -0.6,
    changeSummary: "Q2 revenue forecast trimmed to $30.7M at approval",
    impactSummary: "Published in May. Retained as the comparison point for forecast accuracy reporting.",
    stage: 7,
    status: "Published",
    owner: "Grace Liu",
    comments: [],
  },
];

export const boardRecord = {
  review: "FR-2026-008",
  package: "FY2027 budget book",
  meeting: "Board meeting, Dec 10, 2026",
  submitted: "Draft in preparation",
  status: "Internal review and CFO sign-off come first",
  note: "The board sees the approved budget only. The downside scenario is included as an appendix, with the steel and FX assumptions stated, so the board pack and the internal review tell the same story.",
};

export const forecastAccuracy = {
  review: "FR-2026-005",
  published: "Published Aug 18, 2026, after CFO sign-off",
  rows: [
    { metric: "Q3 revenue", projected: "$30.5M", actual: "$30.6M", note: "Within the 2% tolerance." },
    { metric: "Q3 gross margin", projected: "41.0%", actual: "41.1%", note: "Steel costs tracked the plan." },
    { metric: "Q3 EBITDA margin", projected: "12.1%", actual: "12.4%", note: "Freight costs came in light." },
    { metric: "Q3 closing cash", projected: "$17.9M", actual: "$18.4M at Oct 31", note: "Collections ran ahead of forecast." },
  ],
};

// ---------- Planning exceptions ----------
export type PlanningException = {
  id: string;
  segment: string;
  metric: string;
  observed: string;
  threshold: string;
  period: string;
  severity: "High" | "Medium" | "Low";
  detail: string;
  investigation: string;
  owner: string;
  status: string;
};

export const planningExceptions: PlanningException[] = [
  {
    id: "EXC-01",
    segment: "Manufacturing",
    metric: "October revenue",
    observed: "$9.8M group revenue vs a $10.1M budget",
    threshold: "Monthly variance within 2%",
    period: "Oct 2026",
    severity: "Medium",
    detail:
      "October is the only month this year below budget. Manufacturing shipments scheduled for the last week of October slipped into November, which flatters November if they are counted twice in commentary.",
    investigation:
      "Confirm the slipped shipments land in November actuals before changing the Q4 forecast. FR-2026-011 already reflects them once.",
    owner: "Grace Liu",
    status: "Open",
  },
  {
    id: "EXC-02",
    segment: "Retail",
    metric: "Forecast data confidence",
    observed: "Retail actuals are 11 days old",
    threshold: "Entity actuals no more than 3 days old",
    period: "Nov 2026",
    severity: "Medium",
    detail:
      "The QuickBooks connection for Meridian Retail has expired, so Retail figures in the forecast come from spreadsheet uploads of POS data rather than the system of record.",
    investigation:
      "Restore the QuickBooks connection in Data Sources, then re-run the Retail forecast before FR-2026-011 is published.",
    owner: "Daniel Okafor",
    status: "Open",
  },
  {
    id: "EXC-03",
    segment: "Group",
    metric: "Operating expense actuals",
    observed: "Concur sync stale by 3 days",
    threshold: "Expense actuals current to yesterday",
    period: "Nov 2026",
    severity: "Low",
    detail:
      "November expense accruals are estimated from October patterns until the Concur sync recovers. The amount at risk is small relative to the forecast, but it is an estimate, not an actual.",
    investigation: "Chase the Concur connection in Data Sources; no forecast change needed at this size.",
    owner: "Rachel Kim",
    status: "Monitoring",
  },
  {
    id: "EXC-04",
    segment: "Manufacturing",
    metric: "Steel price exposure",
    observed: "Steel is 18% of revenue in Manufacturing costs",
    threshold: "Single input above 15% of revenue is scenario tested",
    period: "FY2027",
    severity: "High",
    detail:
      "An 8% steel price rise removes about 1.4 points of gross margin in the scenario engine. The FY2027 budget holds margin at 41.2%, so the exposure sits entirely in the downside case.",
    investigation:
      "Already scenario tested as Scenario B and attached to FR-2026-011. Pricing pass-through discussions sit with the commercial team, not FP&A.",
    owner: "Grace Liu",
    status: "Escalated to Forecast Review FR-2026-011",
  },
];

// ---------- Data sources and audit ----------
export const planningDataSources = [
  { name: "NetSuite", type: "Primary GL", updated: "12 min ago", status: "Connected", coverage: "All entities, 2021 to present", validation: "Validated" },
  { name: "TD Bank feed", type: "Bank feed", updated: "26 min ago", status: "Connected", coverage: "Operating, USD and money market", validation: "Validated" },
  { name: "Chase Bank feed", type: "Bank feed", updated: "31 min ago", status: "Connected", coverage: "Logistics operating", validation: "Validated" },
  { name: "Salesforce", type: "CRM and orders", updated: "1 hour ago", status: "Connected", coverage: "Pipeline and order book", validation: "Validated" },
  { name: "Concur", type: "Expenses", updated: "3 days ago", status: "Needs attention", coverage: "Group expenses", validation: "Sync stale" },
  { name: "QuickBooks, Meridian Retail", type: "Legacy GL", updated: "11 days ago", status: "Authentication expired", coverage: "Retail entity", validation: "Incomplete" },
  { name: "Spreadsheet uploads", type: "Manual", updated: "Nov 15, 2026", status: "Connected", coverage: "Retail POS summaries", validation: "Checked on upload" },
];

export type PlanningEvent = {
  time: string;
  actor: string;
  type: "User" | "Alfie" | "Agent" | "System";
  action: string;
  detail: string;
};

export const planningAudit: PlanningEvent[] = [
  { time: "Nov 15, 2026 09:12", actor: "Grace Liu", type: "User", action: "Forecast review opened", detail: "Q4 2026 forecast update (FR-2026-011)" },
  { time: "Nov 15, 2026 09:12", actor: "Alfie", type: "Alfie", action: "Data retrieved", detail: "NetSuite, Salesforce, TD and Chase feeds, Jan to Oct 2026" },
  { time: "Nov 15, 2026 09:13", actor: "Variance Analysis Agent", type: "Agent", action: "Variance computed", detail: "YTD revenue +3.2% vs budget; October the only month below budget" },
  { time: "Nov 15, 2026 09:14", actor: "Alfie", type: "Alfie", action: "Data limitation flagged", detail: "Retail actuals 11 days old, QuickBooks authentication expired" },
  { time: "Nov 15, 2026 09:20", actor: "Grace Liu", type: "User", action: "Scenario attached", detail: "Scenario B, downside steel and FX, attached to FR-2026-011" },
];

// ---------- Planning reports ----------
export type PlanningReportItem = {
  id: string;
  name: string;
  category: string;
  period: string;
  owner: string;
  status: string;
  updated: string;
  parameters: string;
  summary: string;
  sections: DocSection[];
};

export const planningReportLibrary: PlanningReportItem[] = [
  {
    id: "PL-101",
    name: "YTD Budget vs Actual Pack, Jan to Oct 2026",
    category: "Budget & Forecast",
    period: "YTD Oct 2026",
    owner: "Grace Liu",
    status: "Published",
    updated: "Nov 12, 2026",
    parameters: "All entities, org metric definitions, compared with the FY2026 budget",
    summary:
      "Revenue of $102.6M is 3.2% ahead of the $99.4M budget, gross margin is 41.2% and EBITDA is $12.9M at a 12.6% margin. October is the only month below budget.",
    sections: [
      { heading: "Variance summary", body: "Logistics is the largest contributor to the revenue beat at $1.1M ahead of budget, followed by Manufacturing at $1.5M on volume and Retail at $0.6M. Gross margin is 0.4 points ahead of budget, helped by freight costs running light in Q3." },
      { heading: "Watch items", body: "AR over 60 days is $842K, and Retail actuals depend on spreadsheet uploads until the QuickBooks connection is restored. Both are flagged in the pack rather than adjusted away." },
    ],
  },
  {
    id: "PL-102",
    name: "October 2026 Variance Report",
    category: "Variance",
    period: "Oct 2026",
    owner: "Grace Liu",
    status: "Approved",
    updated: "Nov 13, 2026",
    parameters: "Group and entity, actual vs budget vs prior year",
    summary:
      "October revenue of $9.8M was 3.0% below the $10.1M budget, the only miss of the year. The cause is timing: Manufacturing shipments slipped into November.",
    sections: [
      { heading: "What moved", body: "Manufacturing revenue was $0.4M light on slipped shipments. Logistics and Retail were within 1% of budget. Gross margin of 40.9% was 0.3 points below the month budget on mix." },
      { heading: "Action", body: "No forecast change was made on October alone. The slipped shipments are tracked in the Q4 forecast review, FR-2026-011, and counted once." },
    ],
  },
  {
    id: "PL-103",
    name: "Q4 2026 Forecast Summary",
    category: "Budget & Forecast",
    period: "Q4 2026",
    owner: "Grace Liu",
    status: "Under Review",
    updated: "Nov 15, 2026",
    parameters: "Forecast review FR-2026-011, base case with downside scenario attached",
    summary:
      "Q4 revenue is forecast at $29.0M, taking FY2026 to $121.8M. The forecast is at the approval stage in FR-2026-011 and is not final until it is approved and published.",
    sections: [
      { heading: "Basis", body: "October actuals, November order book from Salesforce, and December seasonality from the prior two years. Logistics contract volume is the main driver of the increase from the prior forecast of $28.5M." },
      { heading: "Sensitivity", body: "The downside scenario (steel up 8%, USD/CAD 1.42) reduces gross margin by about 1.4 points. Revenue is less sensitive than margin in Q4 because most Q4 volume is already contracted." },
    ],
  },
  {
    id: "PL-104",
    name: "FY2027 Budget Book",
    category: "Board Reporting",
    period: "FY2027",
    owner: "Grace Liu",
    status: "Draft",
    updated: "Nov 15, 2026",
    parameters: "Forecast review FR-2026-008, board format, downside scenario as appendix",
    summary:
      "The FY2027 budget is revenue of $128.0M, gross margin of 41.2% and EBITDA of $16.1M. It is in internal review and goes to the board on Dec 10, 2026 once approved.",
    sections: [
      { heading: "Assumptions", body: "Volume growth concentrated in Logistics, steel prices held at current levels in the base case, USD/CAD at 1.36, and the operating expense ratio held at 28.6% of revenue." },
      { heading: "Risks", body: "Steel is 18% of revenue in Manufacturing costs, so the margin plan is exposed to a single input. The downside scenario in the appendix quantifies an 8% steel rise and USD/CAD at 1.42." },
    ],
  },
  {
    id: "PL-105",
    name: "Downside Scenario Assessment, Steel and FX",
    category: "Scenarios",
    period: "FY2027",
    owner: "Grace Liu",
    status: "Approved",
    updated: "Nov 14, 2026",
    parameters: "Scenario B, steel +8%, USD/CAD 1.42, scenario engine assumptions as stated",
    summary:
      "Under the downside scenario, FY2027 revenue rises slightly to $129.5M on translation while gross margin falls to 39.8% and EBITDA falls to about $14.5M. Margin, not revenue, is where the downside lands.",
    sections: [
      { heading: "Method", body: "Simple arithmetic on stated assumptions: steel at 18% of revenue, USD denominated revenue at 27.2% of the group, operating expenses held at 28.6% of revenue. It is a sensitivity, not a forecast." },
      { heading: "Use", body: "Attached to FR-2026-011, used as the downside case in Treasury, and included as an appendix to the FY2027 budget book." },
    ],
  },
  {
    id: "PL-106",
    name: "Q3 2026 Forecast Accuracy Review",
    category: "Forecast Reviews",
    period: "Q3 2026",
    owner: "Grace Liu",
    status: "Published",
    updated: "Oct 20, 2026",
    parameters: "Forecast review FR-2026-005, projected vs actual",
    summary:
      "Q3 revenue was forecast at $30.5M and came in at $30.6M, inside the 2% tolerance. Gross margin and EBITDA margin were both slightly better than forecast.",
    sections: [
      { heading: "Detail", body: "Revenue variance of +0.3%, gross margin 41.1% against 41.0% forecast, EBITDA margin 12.4% against 12.1%. Closing cash was $18.4M at Oct 31 against a $17.9M forecast." },
      { heading: "Lesson", body: "Freight costs were the recurring optimistic miss in the other direction: they have run light for two quarters, and the Q4 forecast now uses the lower run rate explicitly." },
    ],
  },
];

export const scheduledPlanningReports = [
  { name: "Monthly Budget vs Actual Pack", schedule: "Monthly, 3rd business day after close", lastRun: "Nov 12, delivered to Finance leadership", status: "Active" },
  { name: "Weekly Revenue Flash", schedule: "Weekly, Monday 7:00 AM", lastRun: "Monday, delivered to Grace Liu and Elena Brooks", status: "Active" },
  { name: "Quarterly Forecast Pack", schedule: "Quarterly, with the forecast review", lastRun: "Oct 20, delivered with FR-2026-005 accuracy review", status: "Active" },
  { name: "Board Finance Pack", schedule: "Monthly, ahead of the board meeting", lastRun: "Nov 13, October pack delivered", status: "Active" },
];
