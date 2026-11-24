// Illustrative sample data for the Treasury module. Figures follow
// INDUSTRY_BRIEFS.md: cash of $9.6M CAD equivalent across 5 bank accounts, a
// 13 week forecast with its lowest point of $6.9M in week 8, an $18.5M term
// loan, $6.4M of equipment loans and a fixed charge coverage covenant of
// 1.32x against a 1.20x minimum.

import type { BankAccount, ForecastWeek, TreasuryScenario, TreasuryCopy } from "@/lib/worlds/enterprise/treasury-data";

export type { BankAccount, ForecastWeek, TreasuryScenario, TreasuryCopy } from "@/lib/worlds/enterprise/treasury-data";

export const reportingFxRate = 1.38; // USD/CAD used for consolidated reporting

export const bankAccounts: BankAccount[] = [
  { id: "BA-01", account: "TD Operating", bank: "TD Bank", entity: "Precision", currency: "CAD", balanceNative: "$3,412,680", balanceCad: 3.4, type: "Operating", feed: "Connected" },
  { id: "BA-02", account: "TD USD Account", bank: "TD Bank", entity: "Precision", currency: "USD", balanceNative: "US$1,450,000", balanceCad: 2.0, type: "Operating, USD", feed: "Connected" },
  { id: "BA-03", account: "Desjardins Operating", bank: "Desjardins", entity: "Fabrication", currency: "CAD", balanceNative: "$1,604,220", balanceCad: 1.6, type: "Operating", feed: "Connected" },
  { id: "BA-04", account: "Chase US Operating", bank: "Chase", entity: "Assembly", currency: "USD", balanceNative: "US$1,160,000", balanceCad: 1.6, type: "Operating, USD", feed: "Connected" },
  { id: "BA-05", account: "Money Market", bank: "BMO", entity: "Group", currency: "CAD", balanceNative: "$1,000,000", balanceCad: 1.0, type: "Investment", feed: "Connected" },
];

export const totalCashCad = 9.6; // $M, CAD equivalent, sum of the accounts above

export const forecastWeeks: ForecastWeek[] = [
  { week: "Nov 16", inflows: 3.2, outflows: 3.6, balance: 9.2 },
  { week: "Nov 23", inflows: 3.0, outflows: 3.5, balance: 8.7 },
  { week: "Nov 30", inflows: 3.3, outflows: 3.6, balance: 8.4 },
  { week: "Dec 7", inflows: 2.9, outflows: 3.2, balance: 8.1 },
  { week: "Dec 14", inflows: 3.5, outflows: 2.9, balance: 8.7 },
  { week: "Dec 21", inflows: 2.8, outflows: 3.6, balance: 7.9 },
  { week: "Dec 28", inflows: 2.7, outflows: 3.3, balance: 7.3 },
  { week: "Jan 4", inflows: 3.0, outflows: 3.4, balance: 6.9 },
  { week: "Jan 11", inflows: 3.6, outflows: 2.4, balance: 8.1 },
  { week: "Jan 18", inflows: 3.7, outflows: 2.3, balance: 9.5 },
  { week: "Jan 25", inflows: 3.4, outflows: 2.4, balance: 10.5 },
  { week: "Feb 1", inflows: 3.3, outflows: 2.3, balance: 11.5 },
  { week: "Feb 8", inflows: 3.2, outflows: 2.4, balance: 12.3 },
];

export const forecastNote =
  "The week 8 low of $6.9M combines the machining centre instalment for Plant 1, the January payroll cycle and steel purchases at prices still well above the January standard. Collections recover from week 9 as AgriCore Equipment and the US assembly program invoices fall due.";

export const treasuryScenarios: TreasuryScenario[] = [
  {
    name: "Base case",
    assumption: "Collections at DSO 43 days, payables at DPO 37 days, planned capex instalments and scheduled debt payments as budgeted.",
    lowPoint: "$6.9M in week 8",
    endCash: "$12.3M",
    impact: "Cash stays positive in every week. The week 8 low is covered by the operating accounts without drawing on the money market balance.",
  },
  {
    name: "Downside, steel and demand",
    assumption: "The Planning downside scenario: steel up a further 8%, USD/CAD at 1.43 and agricultural demand down 5% through the quarter.",
    lowPoint: "$5.8M in week 8",
    endCash: "$10.6M",
    impact: "Cash stays positive in every week, but week 8 headroom narrows. Treasury would defer the February tooling payment and pull the AgriCore settlement forward if steel lands as modeled.",
  },
  {
    name: "Delayed collections",
    assumption: "DSO stretches by 5 days, led by the AR over 60 days balance of $688K slipping further, including the Prairie Implement account under a recommended credit hold.",
    lowPoint: "$6.1M in week 8",
    endCash: "$11.4M",
    impact: "The low point arrives with less headroom. The collections actions in Receivables are the fastest offset, ahead of any capex deferral.",
  },
];

export const termLoan = {
  balance: "$18.5M",
  facility: "Senior term loan",
  covenant: "Fixed charge coverage",
  leverage: "1.32x",
  covenantMax: "1.20x minimum",
  headroom: "0.12x of headroom",
  testDate: "Tested quarterly, next test Dec 31, 2026",
  status: "Compliant",
  note: "Equipment loans of $6.4M sit alongside the term loan, including the financing on the $3.9M machining centre installed at Plant 1 this year. The Q3 covenant calculation is complete and the certificate is in the lender compliance package in Reports. The November calculation is a close task owned by Mark Feldman.",
};

export const treasuryCopy: TreasuryCopy = {
  metaDescription:
    "Cash across every Northline bank account, a 13 week forecast, term and equipment loan covenant headroom and USD exposure.",
  headerDescription:
    "Cash position and liquidity for Northline Group: every bank account, a rolling 13 week forecast, debt and covenant headroom, and the USD exposure that sits behind the consolidated numbers.",
  forecastLow: "$6.9M in week 8",
  covenantKpi: "1.32x vs 1.20x min",
  covenantLine: "Fixed charge coverage at 1.32x against a 1.20x minimum.",
  explainPrompt: "Explain the 13 week cash forecast and why week 8 is the lowest point.",
};

export const usdExposure = {
  usdCash: "US$2.61M",
  usdCashCad: "$3.6M CAD equivalent at 1.38",
  detail:
    "Northline is naturally long USD: Plant 3 in Fort Wayne bills and collects in USD, and the group holds a USD account at TD for US tooling and component suppliers. USD cash is US$2.61M across the TD USD account and Chase US Operating.",
  sensitivity:
    "At the Planning downside rate of USD/CAD 1.43, translated USD cash rises by about $0.13M. The same move raises the CAD cost of USD denominated purchases, which is why the downside scenario in Planning nets the two effects.",
  intercompany:
    "No intercompany USD balances are open at month end. Plant 3 intercompany charges settle monthly through the TD USD account, most recently on October 31.",
};
