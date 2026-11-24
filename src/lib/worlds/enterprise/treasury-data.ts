// Illustrative sample data for the Treasury module. Figures follow
// BUILD_BRIEF.md: cash of $18.4M CAD equivalent across 6 bank accounts, a 13
// week forecast with its lowest point of $11.2M in week 9, a $12.0M term loan
// and a leverage covenant of 2.1x against a 3.0x maximum.

export type BankAccount = {
  id: string;
  account: string;
  bank: string;
  entity: string;
  currency: "CAD" | "USD";
  balanceNative: string;
  balanceCad: number; // $M, CAD equivalent
  type: string;
  feed: string;
};

export const reportingFxRate = 1.36; // USD/CAD used for consolidated reporting

export const bankAccounts: BankAccount[] = [
  { id: "BA-01", account: "TD Operating", bank: "TD Bank", entity: "Manufacturing", currency: "CAD", balanceNative: "$6,214,380", balanceCad: 6.2, type: "Operating", feed: "Connected" },
  { id: "BA-02", account: "TD USD Account", bank: "TD Bank", entity: "Manufacturing", currency: "USD", balanceNative: "US$2,200,000", balanceCad: 3.0, type: "Operating, USD", feed: "Connected" },
  { id: "BA-03", account: "RBC Payroll", bank: "RBC", entity: "Group", currency: "CAD", balanceNative: "$1,802,450", balanceCad: 1.8, type: "Payroll", feed: "Connected" },
  { id: "BA-04", account: "Chase US Operating", bank: "Chase", entity: "Logistics", currency: "USD", balanceNative: "US$1,841,150", balanceCad: 2.5, type: "Operating, USD", feed: "Connected" },
  { id: "BA-05", account: "BMO Retail", bank: "BMO", entity: "Retail", currency: "CAD", balanceNative: "$2,904,120", balanceCad: 2.9, type: "Operating", feed: "Connected" },
  { id: "BA-06", account: "Money Market", bank: "TD Bank", entity: "Group", currency: "CAD", balanceNative: "$2,000,000", balanceCad: 2.0, type: "Investment", feed: "Connected" },
];

export const totalCashCad = 18.4; // $M, CAD equivalent, sum of the accounts above

export type ForecastWeek = {
  week: string;
  inflows: number; // $M
  outflows: number; // $M
  balance: number; // $M, closing cash, CAD equivalent
};

export const forecastWeeks: ForecastWeek[] = [
  { week: "Nov 16", inflows: 2.9, outflows: 3.4, balance: 17.9 },
  { week: "Nov 23", inflows: 2.7, outflows: 3.4, balance: 17.2 },
  { week: "Nov 30", inflows: 2.8, outflows: 3.6, balance: 16.4 },
  { week: "Dec 7", inflows: 2.6, outflows: 3.4, balance: 15.6 },
  { week: "Dec 14", inflows: 3.3, outflows: 2.6, balance: 16.3 },
  { week: "Dec 21", inflows: 2.5, outflows: 3.6, balance: 15.2 },
  { week: "Dec 28", inflows: 2.6, outflows: 3.7, balance: 14.1 },
  { week: "Jan 4", inflows: 2.4, outflows: 3.8, balance: 12.7 },
  { week: "Jan 11", inflows: 2.5, outflows: 4.0, balance: 11.2 },
  { week: "Jan 18", inflows: 3.6, outflows: 1.9, balance: 12.9 },
  { week: "Jan 25", inflows: 3.8, outflows: 1.9, balance: 14.8 },
  { week: "Feb 1", inflows: 3.4, outflows: 1.9, balance: 16.3 },
  { week: "Feb 8", inflows: 3.2, outflows: 2.0, balance: 17.5 },
];

export const forecastNote =
  "The dip into January is the normal pattern for Meridian: the week 9 low of $11.2M combines the scheduled term loan principal payment, the annual insurance premium and the post-holiday inventory build. Collections recover from week 10 as January invoices fall due.";

export type TreasuryScenario = {
  name: string;
  assumption: string;
  lowPoint: string;
  endCash: string;
  impact: string;
};

export const treasuryScenarios: TreasuryScenario[] = [
  {
    name: "Base case",
    assumption: "Collections at DSO 38 days, payables at DPO 44 days, planned capex and scheduled debt payments as budgeted.",
    lowPoint: "$11.2M in week 9",
    endCash: "$17.5M",
    impact: "Cash stays comfortably positive in every week, with the week 9 low well covered by the money market balance.",
  },
  {
    name: "Downside, steel and FX",
    assumption: "The Planning downside scenario: steel prices up 8% and USD/CAD at 1.42 through the quarter.",
    lowPoint: "$9.6M in week 9",
    endCash: "$15.4M",
    impact: "Cash stays positive in every week. Week 9 is the tightest point; Treasury would move the January capex payment into February if steel costs land as modeled.",
  },
  {
    name: "Delayed collections",
    assumption: "DSO stretches by 5 days, led by the AR over 60 days balance of $842K slipping further.",
    lowPoint: "$10.3M in week 9",
    endCash: "$16.6M",
    impact: "The low point arrives with less headroom. The collections actions in Receivables, including the recommended credit hold, are the fastest offset.",
  },
];

export const termLoan = {
  balance: "$12.0M",
  facility: "Senior term loan",
  covenant: "Leverage (total debt to EBITDA)",
  leverage: "2.1x",
  covenantMax: "3.0x",
  headroom: "0.9x of headroom",
  testDate: "Tested quarterly, next test Dec 31, 2026",
  status: "Compliant",
  note: "The Q3 covenant calculation is complete and the certificate is in the lender compliance package in Reports. The November calculation is a close task owned by Tom Alvarez.",
};

export type TreasuryCopy = {
  metaDescription: string;
  headerDescription: string;
  forecastLow: string;
  covenantKpi: string;
  covenantLine: string;
  explainPrompt: string;
};

export const treasuryCopy: TreasuryCopy = {
  metaDescription:
    "Cash across every Meridian bank account, a 13 week forecast, term loan covenant headroom and USD exposure.",
  headerDescription:
    "Cash position and liquidity for Meridian Group: every bank account, a rolling 13 week forecast, debt and covenant headroom, and the USD exposure that sits behind the consolidated numbers.",
  forecastLow: "$11.2M in week 9",
  covenantKpi: "2.1x of 3.0x max",
  covenantLine: "Leverage at 2.1x against the 3.0x maximum.",
  explainPrompt: "Explain the 13 week cash forecast and why week 9 is the lowest point.",
};

export const usdExposure = {
  usdCash: "US$4.04M",
  usdCashCad: "$5.5M CAD equivalent at 1.36",
  detail:
    "Meridian is naturally long USD: Logistics bills and collects in USD, and Manufacturing holds a USD account for US suppliers. USD cash is US$4.04M across the TD USD account and Chase US Operating.",
  sensitivity:
    "At the Planning downside rate of USD/CAD 1.42, translated USD cash rises by about $0.24M. The same move raises the CAD cost of USD denominated purchases, which is why the downside scenario in Planning nets the two effects.",
  intercompany:
    "The one open USD item is the intercompany balance behind JE-2026-1087: the October 31 revaluation was missed, and the correction is awaiting approval in Accounting.",
};
