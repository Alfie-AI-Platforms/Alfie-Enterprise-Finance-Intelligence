// Illustrative sample data for the Costing module (Manufacturing pack).
// Figures follow INDUSTRY_BRIEFS.md and agree with JE-2026-1142 in
// accounting-data.ts and the margin bridge in planning-data.ts: steel
// standard $1,040 per tonne against a $1,186 actual average since July,
// Line 3 scrap up from 2.1% to 3.4%, October material variance of $212,000
// unfavourable, and a $318,000 inventory and COGS true-up.

export const moduleAvailable = true;

export interface CostingSummary {
  octoberMaterialVariance: string;
  octoberTotalVariance: string;
  trueUpAmount: string;
  trueUpEntryId: string;
  note: string;
}

export const costingSummary: CostingSummary = {
  octoberMaterialVariance: "$212,000 U",
  octoberTotalVariance: "$259,500 U",
  trueUpAmount: "$318,000",
  trueUpEntryId: "JE-2026-1142",
  note: "Variances are October 2026 actuals against the standards set in January 2026. U means unfavourable. The $318,000 true-up is larger than the October variance alone because it also clears the carrying effect of stale standards in closing work in progress and finished goods.",
};

export interface StandardCostRow {
  family: string;
  plant: string;
  entity: string;
  steelStandardPerTonne: number;
  steelActualPerTonne: number;
  scrapStandardPct: number;
  scrapActualPct: number;
  standardUnitCost: number;
  actualUnitCost: number;
  octoberUnits: number;
  totalVariance: number;
}

export const standardCosts: StandardCostRow[] = [
  {
    family: "Series 400 gear housings",
    plant: "Plant 1, Guelph",
    entity: "Northline Precision Inc.",
    steelStandardPerTonne: 1040,
    steelActualPerTonne: 1186,
    scrapStandardPct: 2.1,
    scrapActualPct: 3.4,
    standardUnitCost: 412.5,
    actualUnitCost: 438.9,
    octoberUnits: 9820,
    totalVariance: 259500,
  },
  {
    family: "Series 250 shafts and couplings",
    plant: "Plant 1, Guelph",
    entity: "Northline Precision Inc.",
    steelStandardPerTonne: 1040,
    steelActualPerTonne: 1186,
    scrapStandardPct: 1.8,
    scrapActualPct: 2.2,
    standardUnitCost: 96.4,
    actualUnitCost: 104.1,
    octoberUnits: 21450,
    totalVariance: 165165,
  },
  {
    family: "Hydraulic manifold blocks",
    plant: "Plant 2, Drummondville",
    entity: "Northline Fabrication Ltée",
    steelStandardPerTonne: 1040,
    steelActualPerTonne: 1179,
    scrapStandardPct: 2.6,
    scrapActualPct: 2.9,
    standardUnitCost: 188.2,
    actualUnitCost: 199.6,
    octoberUnits: 6340,
    totalVariance: 72276,
  },
  {
    family: "Final drive assemblies",
    plant: "Plant 3, Fort Wayne",
    entity: "Northline Assembly Inc.",
    steelStandardPerTonne: 1040,
    steelActualPerTonne: 1186,
    scrapStandardPct: 1.5,
    scrapActualPct: 1.7,
    standardUnitCost: 764.0,
    actualUnitCost: 791.3,
    octoberUnits: 1980,
    totalVariance: 54054,
  },
];

export interface VarianceComponent {
  component: string;
  amount: number;
  formatted: string;
  sharePct: number;
  detail: string;
}

// October variance bridge for the Series 400 family. Material price and
// material usage sum to the canonical $212,000 unfavourable material
// variance; labour and overhead sit on top, as in the accounting workpaper.
export const varianceBridge: VarianceComponent[] = [
  {
    component: "Material price",
    amount: 148000,
    formatted: "$148,000 U",
    sharePct: 57.0,
    detail:
      "Hot-rolled coil averaged $1,186 per tonne from July to October against the January standard of $1,040, up 14 percent. The increase was in place before the October production run and is the largest single driver of the variance.",
  },
  {
    component: "Material usage (scrap)",
    amount: 64000,
    formatted: "$64,000 U",
    sharePct: 24.7,
    detail:
      "Scrap on Line 3 rose from 2.1 percent to 3.4 percent after the August tooling change and has not recovered. At the higher rate, Line 3 consumed materially more steel per finished housing in October.",
  },
  {
    component: "Labour rate",
    amount: 23500,
    formatted: "$23,500 U",
    sharePct: 9.1,
    detail:
      "The September rate increase at Plant 1 lifted actual labour cost above the January standard rate. The standards were not updated for it, so the difference lands in the rate variance.",
  },
  {
    component: "Labour efficiency",
    amount: 9800,
    formatted: "$9,800 U",
    sharePct: 3.8,
    detail:
      "Changeovers around the Line 3 tooling work ran longer than standard in October. Small next to price and usage, and expected to normalise as the tooling beds in.",
  },
  {
    component: "Overhead absorption",
    amount: 14200,
    formatted: "$14,200 U",
    sharePct: 5.5,
    detail:
      "October volume on the Series 400 family ran slightly under the denominator volume used to set the overhead rate, leaving a small under-absorption for the month.",
  },
];

export interface FlagshipAnalysis {
  title: string;
  entryId: string;
  status: string;
  intro: string;
  points: readonly string[];
  sources: readonly string[];
}

export const flagshipAnalysis: FlagshipAnalysis = {
  title: "Series 400 standard cost variance, October",
  entryId: "JE-2026-1142",
  status: "Correction prepared",
  intro:
    "I reviewed the October standard cost results for the Series 400 gear housing family at Plant 1 and found the standards are stale enough that October is misstated:",
  points: [
    "October material variance was $212,000 unfavourable. Steel is the largest driver: the standard was set in January at $1,040 per tonne, while the actual average since July is $1,186, up 14 percent.",
    "Usage is next: scrap on Line 3 rose from 2.1 percent to 3.4 percent after the August tooling change. A smaller labour rate piece reflects the September rate increase at Plant 1 that the standards also missed.",
    "With costs understated, October cost of goods sold is understated and inventory is overstated by $318,000 (work in progress $124,000, finished goods $194,000). Reported margin on AgriCore Equipment and Prairie Implement is overstated by about 2.3 points.",
    "Entry JE-2026-1142 trues up inventory and COGS by $318,000. Because it is a post-close adjustment above $10,000, it needs Controller review and CFO approval before it posts.",
  ],
  sources: [
    "Series 400 Variance Report, October",
    "Steel Price History, 2026",
    "Line 3 Scrap Report, October",
    "Epicor Kinetic cost module, Plant 1",
  ],
};

export const alfieCostingNotes: readonly string[] = [
  "Steel is 24 percent of revenue in plant costs, so the stale standard is the group's largest single margin exposure. The January revision below moves the steel standard to $1,175 per tonne, just under the current $1,186 run rate.",
  "The Series 400 family is the only family where all three drivers (price, usage and labour rate) moved at once. The other families carry the steel price piece only, which is why their unit variances are smaller.",
  "The draft January revision is a costing change, not an accounting entry. It takes effect for January production once the Controller and CFO approve it alongside JE-2026-1142.",
];

export interface StandardRevisionItem {
  item: string;
  current: string;
  proposed: string;
  basis: string;
  status: string;
}

export const standardRevision: StandardRevisionItem[] = [
  {
    item: "Hot-rolled coil steel standard",
    current: "$1,040 per tonne",
    proposed: "$1,175 per tonne",
    basis: "Actual average since July is $1,186 per tonne. The proposed standard sits just under the run rate so a small favourable price variance remains visible if prices ease.",
    status: "Draft",
  },
  {
    item: "Line 3 scrap factor",
    current: "2.1%",
    proposed: "3.0%",
    basis: "Actual scrap has run at 3.4 percent since the August tooling change. The proposed factor sits between the old standard and the current rate, pending the tooling review with production engineering.",
    status: "Draft",
  },
  {
    item: "Plant 1 labour rate standard",
    current: "January 2026 rates",
    proposed: "September 2026 rates",
    basis: "The September rate increase at Plant 1 is already in actual payroll. Rolling it into the standard removes the recurring labour rate variance from January.",
    status: "Draft",
  },
  {
    item: "Effective date",
    current: "Standards set January 2026",
    proposed: "January 1, 2027",
    basis: "Applies to January production onward. October to December 2026 continue to report against the January 2026 standards, with variances explained in this module.",
    status: "Draft",
  },
];
