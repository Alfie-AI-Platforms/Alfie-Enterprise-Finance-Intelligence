// Illustrative sample data for the Capital Projects module (Mining pack).
// Figures follow INDUSTRY_BRIEFS.md: capex YTD of $97.2M (sustaining
// $38.6M, growth $58.6M, with Copperline $51.2M of the growth total),
// Copperline budget $128.0M and forecast at completion $131.5M, Keno Ridge
// tailings raise budget $18.4M, Sagebrush underground budget $22.6M. Spent
// and forecast figures for the smaller projects are derived so the project
// list sums to the canonical sustaining and growth totals.

export const moduleAvailable = true;

export interface ProjectsSummary {
  capexYtd: string;
  sustainingYtd: string;
  growthYtd: string;
  facilityDrawn: string;
  note: string;
}

export const projectsSummary: ProjectsSummary = {
  capexYtd: "$97.2M",
  sustainingYtd: "$38.6M",
  growthYtd: "$58.6M",
  facilityDrawn: "$63.4M of $150.0M",
  note: "Capex is calendar 2026 to the end of October. Copperline is $51.2M of the $58.6M growth total. The Copperline project facility of $150.0M is drawn to $63.4M; the $75.0M revolving facility is undrawn. Spent figures for projects other than Copperline are derived from site cost reports so the list agrees to the sustaining and growth totals.",
};

export interface CapitalProject {
  id: string;
  name: string;
  site: string;
  entity: string;
  category: "Growth" | "Sustaining";
  budget: number;
  spentYtd: number;
  forecastAtCompletion: number;
  pctComplete: number;
  status: string;
  note: string;
}

// Spent YTD by category sums to the canonical totals: growth $58.6M
// (Copperline $51.2M, Sagebrush underground $5.9M, Keno Ridge exploration
// $1.5M) and sustaining $38.6M (tailings raise $11.8M, fleet rebuild
// $9.6M, mill and crusher $8.9M, water treatment $5.1M, ventilation $3.2M).
export const capitalProjects: CapitalProject[] = [
  {
    id: "CP-01",
    name: "Copperline copper project, construction",
    site: "Copperline, British Columbia",
    entity: "Copperline Metals JV",
    category: "Growth",
    budget: 128000000,
    spentYtd: 51200000,
    forecastAtCompletion: 131500000,
    pctComplete: 38,
    status: "In Progress",
    note: "Aurora's 40 percent share of the joint venture build, operated by Kestrel Resources. Forecast at completion is $3.5M over the approved budget, driven by camp costs and the schedule extension into Q2 2027. Funded from the $150.0M project facility, drawn to $63.4M across the venture.",
  },
  {
    id: "CP-02",
    name: "Sagebrush underground development",
    site: "Sagebrush Mine, Elko, Nevada",
    entity: "Aurora Ridge USA Inc.",
    category: "Growth",
    budget: 22600000,
    spentYtd: 5900000,
    forecastAtCompletion: 23400000,
    pctComplete: 24,
    status: "In Progress",
    note: "Decline and level development to reach the deeper ore zones. Forecast at completion runs $0.8M over budget on ground support costs; the overrun is inside the project's contingency review with the CFO.",
  },
  {
    id: "CP-03",
    name: "Keno Ridge exploration drilling program",
    site: "Keno Ridge Mine, Timmins, Ontario",
    entity: "Aurora Ridge Mining Corp.",
    category: "Growth",
    budget: 4200000,
    spentYtd: 1500000,
    forecastAtCompletion: 4200000,
    pctComplete: 36,
    status: "In Progress",
    note: "Near-mine drilling to extend the Keno Ridge resource. Spend is tracking to budget; results feed the Q3 technical report cost schedules.",
  },
  {
    id: "CP-04",
    name: "Keno Ridge tailings facility raise",
    site: "Keno Ridge Mine, Timmins, Ontario",
    entity: "Aurora Ridge Mining Corp.",
    category: "Sustaining",
    budget: 18400000,
    spentYtd: 11800000,
    forecastAtCompletion: 18900000,
    pctComplete: 61,
    status: "In Progress",
    note: "Stage raise of the tailings facility to hold production through 2029. Forecast at completion is $0.5M over budget on liner material costs. The raise supports the asset retirement obligation profile of $88.7M carried in the accounts.",
  },
  {
    id: "CP-05",
    name: "Mobile fleet rebuild program",
    site: "Keno Ridge Mine, Timmins, Ontario",
    entity: "Aurora Ridge Mining Corp.",
    category: "Sustaining",
    budget: 12400000,
    spentYtd: 9600000,
    forecastAtCompletion: 12400000,
    pctComplete: 77,
    status: "In Progress",
    note: "Engine and component rebuilds across the haul fleet. Depreciation on the rebuilt fleet runs through JE-2026-0876 in Accounting.",
  },
  {
    id: "CP-06",
    name: "Sagebrush mill liner and crusher replacement",
    site: "Sagebrush Mine, Elko, Nevada",
    entity: "Aurora Ridge USA Inc.",
    category: "Sustaining",
    budget: 9800000,
    spentYtd: 8900000,
    forecastAtCompletion: 9800000,
    pctComplete: 88,
    status: "In Progress",
    note: "Mill liner change-out and primary crusher replacement completed during the October maintenance shutdown. Final invoices are clearing through Payables.",
  },
  {
    id: "CP-07",
    name: "Keno Ridge water treatment upgrade",
    site: "Keno Ridge Mine, Timmins, Ontario",
    entity: "Aurora Ridge Mining Corp.",
    category: "Sustaining",
    budget: 6600000,
    spentYtd: 5100000,
    forecastAtCompletion: 6700000,
    pctComplete: 74,
    status: "In Progress",
    note: "Treatment capacity upgrade tied to the site water licence. Forecast at completion is $0.1M over budget, within the mine controller's authority.",
  },
  {
    id: "CP-08",
    name: "Sagebrush ventilation raise",
    site: "Sagebrush Mine, Elko, Nevada",
    entity: "Aurora Ridge USA Inc.",
    category: "Sustaining",
    budget: 4500000,
    spentYtd: 3200000,
    forecastAtCompletion: 4500000,
    pctComplete: 68,
    status: "In Progress",
    note: "Ventilation raise ahead of the underground development reaching the deeper levels. Spend is tracking to budget.",
  },
];

export interface JvTieIn {
  entryId: string;
  statementShare: string;
  accruedShare: string;
  difference: string;
  status: string;
  points: readonly string[];
}

export const jvTieIn: JvTieIn = {
  entryId: "JE-2026-0874",
  statementShare: "$4,218,000",
  accruedShare: "$3,964,500",
  difference: "$253,500",
  status: "Correction prepared",
  points: [
    "Kestrel Resources' October operator statement shows Aurora's 40 percent share of joint venture costs at $4,218,000. Aurora accrued $3,964,500, a difference of $253,500.",
    "The camp and catering line was billed at 100 percent of cost on one invoice instead of Aurora's 40 percent share, overstating the share by $186,000. The JV agreement bills every cost category strictly by interest.",
    "An October diesel accrual of $67,500 at the project is missing from Aurora's accrual, which runs the other way.",
    "Entry JE-2026-0874 corrects the accrual, and a draft query letter to Kestrel accompanies it. Because it is a post-close adjustment above $10,000, it needs Controller review and CFO approval.",
  ],
};

export const alfieProjectNotes: readonly string[] = [
  "Copperline is the only project forecasting over its approved budget: $131.5M at completion against $128.0M approved. The $3.5M overrun should go to the board with the November pack, alongside the operator statement correction in JE-2026-0874.",
  "Growth capex is concentrated: Copperline is $51.2M of the $58.6M growth total, so project risk in this portfolio is effectively Copperline risk until Sagebrush underground development scales up in 2027.",
  "Sustaining capex of $38.6M YTD against production of 71,380 oz is the capital half of the all-in sustaining cost of US$1,588 per oz, which is running above the US$1,540 budget. The tailings raise and fleet rebuild are the two largest sustaining items.",
];
