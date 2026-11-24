// Illustrative sample data for the Treasury module. Figures follow
// INDUSTRY_BRIEFS.md: cash of $58.6M CAD equivalent across 7 bank accounts, a
// 13 week forecast with its lowest point of $44.2M in week 10, a $150.0M
// Copperline project facility drawn $63.4M, a $75.0M revolving facility
// undrawn and a total debt to EBITDA covenant of 0.4x against a 2.5x maximum.

import type { BankAccount, ForecastWeek, TreasuryScenario, TreasuryCopy } from "@/lib/worlds/enterprise/treasury-data";

export type { BankAccount, ForecastWeek, TreasuryScenario, TreasuryCopy } from "@/lib/worlds/enterprise/treasury-data";

export const reportingFxRate = 1.38; // USD/CAD used for consolidated reporting

export const bankAccounts: BankAccount[] = [
  { id: "BA-01", account: "RBC Operating", bank: "RBC Royal Bank", entity: "Keno Ridge", currency: "CAD", balanceNative: "$14,208,540", balanceCad: 14.2, type: "Operating", feed: "Connected" },
  { id: "BA-02", account: "RBC USD Account", bank: "RBC Royal Bank", entity: "Corporate", currency: "USD", balanceNative: "US$8,700,000", balanceCad: 12.0, type: "Operating, USD", feed: "Connected" },
  { id: "BA-03", account: "Wells Fargo US Operating", bank: "Wells Fargo", entity: "Sagebrush", currency: "USD", balanceNative: "US$5,800,000", balanceCad: 8.0, type: "Operating, USD", feed: "Connected" },
  { id: "BA-04", account: "Money Market", bank: "RBC Royal Bank", entity: "Corporate", currency: "CAD", balanceNative: "$16,400,000", balanceCad: 16.4, type: "Investment", feed: "Connected" },
  { id: "BA-05", account: "RBC Payroll", bank: "RBC Royal Bank", entity: "Corporate", currency: "CAD", balanceNative: "$2,611,300", balanceCad: 2.6, type: "Payroll", feed: "Connected" },
  { id: "BA-06", account: "TD Operating", bank: "TD Bank", entity: "Corporate", currency: "CAD", balanceNative: "$3,802,450", balanceCad: 3.8, type: "Operating", feed: "Connected" },
  { id: "BA-07", account: "Copperline JV Account", bank: "RBC Royal Bank", entity: "Copperline JV", currency: "CAD", balanceNative: "$1,600,000", balanceCad: 1.6, type: "Joint venture", feed: "Connected" },
];

export const totalCashCad = 58.6; // $M, CAD equivalent, sum of the accounts above

export const forecastWeeks: ForecastWeek[] = [
  { week: "Nov 16", inflows: 6.4, outflows: 7.1, balance: 57.9 },
  { week: "Nov 23", inflows: 6.1, outflows: 6.8, balance: 57.2 },
  { week: "Nov 30", inflows: 6.6, outflows: 7.4, balance: 56.4 },
  { week: "Dec 7", inflows: 6.2, outflows: 7.0, balance: 55.6 },
  { week: "Dec 14", inflows: 7.0, outflows: 5.9, balance: 56.7 },
  { week: "Dec 21", inflows: 5.8, outflows: 7.2, balance: 55.3 },
  { week: "Dec 28", inflows: 5.6, outflows: 7.5, balance: 53.4 },
  { week: "Jan 4", inflows: 5.9, outflows: 7.8, balance: 51.5 },
  { week: "Jan 11", inflows: 6.1, outflows: 8.9, balance: 48.7 },
  { week: "Jan 18", inflows: 6.4, outflows: 10.9, balance: 44.2 },
  { week: "Jan 25", inflows: 7.8, outflows: 5.6, balance: 46.4 },
  { week: "Feb 1", inflows: 8.1, outflows: 5.4, balance: 49.1 },
  { week: "Feb 8", inflows: 7.6, outflows: 5.5, balance: 51.2 },
];

export const forecastNote =
  "The week 10 low of $44.2M combines the January Copperline cash call, project facility debt service and the Keno Ridge winter fuel delivery. Refinery settlements recover from week 11 as the January gold shipments settle, and no draw on the revolving facility is planned in any week.";

export const treasuryScenarios: TreasuryScenario[] = [
  {
    name: "Base case",
    assumption: "Refinery settlements at DSO 14 days, payables at DPO 41 days, Copperline cash calls and scheduled debt service as budgeted.",
    lowPoint: "$44.2M in week 10",
    endCash: "$51.2M",
    impact: "Cash stays comfortably positive in every week, with the revolving facility undrawn throughout the quarter.",
  },
  {
    name: "Downside, gold price",
    assumption: "The Planning downside scenario: gold at US$3,400 per oz, diesel up 15% and USD/CAD at 1.43 through the quarter. The Q1 2027 forward sales at US$3,940 per oz soften the first quarter of the move.",
    lowPoint: "$38.6M in week 10",
    endCash: "$44.9M",
    impact: "Cash stays positive in every week. Treasury would stage the discretionary growth capex at Sagebrush before touching the revolving facility.",
  },
  {
    name: "Delayed settlements",
    assumption: "Refinery settlement terms stretch by 7 days and the $196,000 Cascade assay dispute lot remains unpaid through the quarter.",
    lowPoint: "$42.7M in week 10",
    endCash: "$49.8M",
    impact: "The low point arrives with less headroom but no action is required beyond the settlement follow-up already open in Receivables.",
  },
];

export const termLoan = {
  balance: "$63.4M drawn",
  facility: "Copperline project facility ($150.0M committed)",
  covenant: "Total debt to EBITDA",
  leverage: "0.4x",
  covenantMax: "2.5x",
  headroom: "2.1x of headroom",
  testDate: "Tested quarterly, next test Dec 31, 2026",
  status: "Compliant",
  note: "The revolving credit facility of $75.0M is undrawn. The asset retirement obligation provision of $88.7M is unfunded and sits outside the debt covenant. The Q3 covenant calculation is complete and the certificate is in the lender compliance package in Reports. The November calculation is a close task owned by Angela Ruiz.",
};

export const treasuryCopy: TreasuryCopy = {
  metaDescription:
    "Cash across every Aurora Ridge bank account, a 13 week forecast, project facility covenant headroom and USD exposure.",
  headerDescription:
    "Cash position and liquidity for Aurora Ridge: every bank account, a rolling 13 week forecast, debt and covenant headroom, and the USD exposure that sits behind the consolidated numbers.",
  forecastLow: "$44.2M in week 10",
  covenantKpi: "0.4x of 2.5x max",
  covenantLine: "Total debt to EBITDA at 0.4x against a 2.5x maximum.",
  explainPrompt: "Explain the 13 week cash forecast and why week 10 is the lowest point.",
};

export const usdExposure = {
  usdCash: "US$14.5M",
  usdCashCad: "$20.0M CAD equivalent at 1.38",
  detail:
    "Aurora Ridge earns most of its revenue in USD: Sagebrush sells in USD and Keno Ridge settlements are priced off US dollar gold. USD cash is US$14.5M across the RBC USD account and Wells Fargo US Operating. The hedge book holds 18,000 oz sold forward for Q1 2027 at US$3,940 per oz under the board approved program, against a year to date realized price of US$4,072 per oz.",
  sensitivity:
    "At the Planning downside rate of USD/CAD 1.43, translated USD cash rises by about $0.73M. Unhedged Q1 2027 production remains exposed below the forward price, which is why the downside scenario in Planning models revenue at US$3,400 per oz on the unhedged ounces only.",
  intercompany:
    "No intercompany USD balances are open at month end. Sagebrush settles intercompany charges monthly through Wells Fargo, most recently on October 31. Copperline JV cash calls are funded in CAD from the joint venture account.",
};
