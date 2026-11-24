// Illustrative sample data for the Royalties module (Mining pack).
// Obligations follow INDUSTRY_BRIEFS.md: Keno Ridge carries a 2.0% net
// smelter return royalty held by Cobalt Royalties Inc.; Sagebrush carries
// a 3.0% net smelter return royalty plus the Nevada Net Proceeds of
// Minerals tax at 5%. October revenue of $41.5M is split between the two
// producing mines (Keno Ridge $26.8M, Sagebrush $14.7M; Copperline is a
// development project with no revenue). Calculation bases and year to
// date accruals are derived from those figures and are consistent
// throughout this file.

export const moduleAvailable = true;

export interface RoyaltiesSummary {
  octoberTotal: string;
  accruedYtd: string;
  paidYtd: string;
  outstanding: string;
  note: string;
}

export const royaltiesSummary: RoyaltiesSummary = {
  octoberTotal: "$1,378,000",
  accruedYtd: "$12,992,000",
  paidYtd: "$11,614,000",
  outstanding: "$1,378,000",
  note: "Royalties and the Nevada Net Proceeds of Minerals tax accrue monthly on production and are paid the month after accrual. Amounts paid to date run through September; the full October accrual of $1,378,000 is outstanding and is the accrued less paid difference for the year.",
};

export interface RoyaltyProductionRow {
  property: string;
  entity: string;
  goldOunces: string;
  silverOunces: string;
  octoberRevenue: string;
  nsrBase: string;
}

export const royaltyProduction: RoyaltyProductionRow[] = [
  {
    property: "Keno Ridge Mine",
    entity: "Aurora Ridge Mining Corp.",
    goldOunces: "4,850 oz",
    silverOunces: "Byproduct, immaterial",
    octoberRevenue: "$26,800,000",
    nsrBase: "$26,100,000",
  },
  {
    property: "Sagebrush Mine",
    entity: "Aurora Ridge USA Inc.",
    goldOunces: "2,180 oz",
    silverOunces: "38,400 oz",
    octoberRevenue: "$14,700,000",
    nsrBase: "$14,200,000",
  },
];

export interface RoyaltyObligation {
  id: string;
  property: string;
  entity: string;
  holder: string;
  type: string;
  ratePct: number;
  basis: string;
  basisAmount: number;
  octoberAmount: number;
  accruedYtd: number;
  paidYtd: number;
  outstanding: number;
  status: string;
}

// October amounts are calculated on October production: Keno Ridge NSR
// base of $26,100,000 at 2.0% is $522,000; Sagebrush NSR base of
// $14,200,000 at 3.0% is $426,000; Sagebrush net proceeds of $8,600,000
// at 5% is $430,000. Accrued less paid equals the October amount on every
// row, because payments run one month behind accruals.
export const royaltyObligations: RoyaltyObligation[] = [
  {
    id: "ROY-01",
    property: "Keno Ridge Mine",
    entity: "Aurora Ridge Mining Corp.",
    holder: "Cobalt Royalties Inc.",
    type: "Net smelter return royalty",
    ratePct: 2.0,
    basis: "Net smelter return: October revenue of $26,800,000 less refining and transport charges of $700,000",
    basisAmount: 26100000,
    octoberAmount: 522000,
    accruedYtd: 4980000,
    paidYtd: 4458000,
    outstanding: 522000,
    status: "Accrued",
  },
  {
    id: "ROY-02",
    property: "Sagebrush Mine",
    entity: "Aurora Ridge USA Inc.",
    holder: "Great Basin Royalties LLC",
    type: "Net smelter return royalty",
    ratePct: 3.0,
    basis: "Net smelter return: October revenue of $14,700,000 less refining and transport charges of $500,000",
    basisAmount: 14200000,
    octoberAmount: 426000,
    accruedYtd: 4072000,
    paidYtd: 3646000,
    outstanding: 426000,
    status: "Accrued",
  },
  {
    id: "ROY-03",
    property: "Sagebrush Mine",
    entity: "Aurora Ridge USA Inc.",
    holder: "State of Nevada",
    type: "Net Proceeds of Minerals tax",
    ratePct: 5.0,
    basis: "Net proceeds: October revenue of $14,700,000 less allowable extraction, processing and transport deductions of $6,100,000",
    basisAmount: 8600000,
    octoberAmount: 430000,
    accruedYtd: 3940000,
    paidYtd: 3510000,
    outstanding: 430000,
    status: "Accrued",
  },
];

export const octoberRoyaltyTotal = 1378000;
export const accruedRoyaltyTotal = 12992000;
export const paidRoyaltyTotal = 11614000;

export const alfieRoyaltyNotes: readonly string[] = [
  "October royalties and mineral tax total $1,378,000 on revenue of $41.5M, an effective rate of about 3.3 percent of revenue. The Sagebrush obligations are the heavier burden: the 3.0 percent NSR and the 5 percent Net Proceeds tax stack on the same production.",
  "Every obligation is accrued for October and unpaid, because payments run one month behind. Accrued less paid for the year equals the October accrual exactly, which confirms no earlier month is sitting unpaid.",
  "The Nevada Net Proceeds calculation depends on the deduction schedule, not just revenue. If Sagebrush costs move, the tax accrual moves with them; Alfie rebuilds the deduction schedule from site cost reports each month rather than applying a fixed percentage of revenue.",
];
