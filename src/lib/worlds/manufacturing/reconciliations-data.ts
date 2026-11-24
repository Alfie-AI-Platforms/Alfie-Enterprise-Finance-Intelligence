// Illustrative sample data for the Reconciliations module. Figures follow
// INDUSTRY_BRIEFS.md: 21 accounts, 94.8% auto-matched overall, exceptions
// led by the GRNI clearing difference of $47,300 and the lagging Plant 2
// payroll feed.

import type { RecAccount, RecCorrectionLink, RecException } from "@/lib/worlds/enterprise/reconciliations-data";

export const recSummary = {
  accounts: 21,
  autoMatched: "94.8%",
  reconciled: 6,
  openExceptions: 5,
  note: "Auto-match rate is transaction weighted across all 21 accounts for November to date. Bank feeds from TD and Chase are connected; the Plex MES feed at Plant 2 is the one lagging source, and it holds up the payroll clearing account with it.",
};

export const recAccounts: RecAccount[] = [
  { id: "RA-01", account: "TD Operating CAD", type: "Bank", entity: "Plant 1", owner: "Mark Feldman", glBalance: "$3,842,600", sourceBalance: "$3,842,600", difference: "$0", matchedPct: 99.1, status: "Reconciled", lastActivity: "Nov 19" },
  { id: "RA-02", account: "TD USD Account", type: "Bank", entity: "Plant 1", owner: "Mark Feldman", glBalance: "US$1,150,000", sourceBalance: "US$1,150,000", difference: "$0", matchedPct: 97.4, status: "In Progress", lastActivity: "Nov 20" },
  { id: "RA-03", account: "RBC Payroll", type: "Bank", entity: "Group", owner: "Mark Feldman", glBalance: "$964,300", sourceBalance: "$964,300", difference: "$0", matchedPct: 99.5, status: "Reconciled", lastActivity: "Nov 19" },
  { id: "RA-04", account: "Chase US Operating", type: "Bank", entity: "Plant 3", owner: "Mark Feldman", glBalance: "US$986,400", sourceBalance: "US$985,150", difference: "US$1,250", matchedPct: 96.3, status: "In Progress", lastActivity: "Nov 20" },
  { id: "RA-05", account: "TD Money Market", type: "Bank", entity: "Group", owner: "Mark Feldman", glBalance: "$2,500,000", sourceBalance: "$2,500,000", difference: "$0", matchedPct: 100, status: "Reconciled", lastActivity: "Nov 19" },
  { id: "RA-06", account: "Visa Corporate Card", type: "Card", entity: "Group", owner: "Kevin Doyle", glBalance: "$18,760", sourceBalance: "$18,760", difference: "$0", matchedPct: 97.0, status: "In Progress", lastActivity: "Nov 20" },
  { id: "RA-07", account: "GRNI Clearing", type: "Clearing", entity: "Group", owner: "Kevin Doyle", glBalance: "$47,300", sourceBalance: "$0", difference: "$47,300", matchedPct: 89.6, status: "Exception", lastActivity: "Nov 20" },
  { id: "RA-08", account: "Payroll Clearing, Plant 2", type: "Clearing", entity: "Plant 2", owner: "Lucas Meyer", glBalance: "$6,480", sourceBalance: "Feed incomplete", difference: "Unknown", matchedPct: 82.7, status: "Exception", lastActivity: "Nov 18" },
  { id: "RA-09", account: "AR Control", type: "Subledger", entity: "Group", owner: "Lucas Meyer", glBalance: "$18,420,000", sourceBalance: "$18,420,000", difference: "$0", matchedPct: 98.2, status: "In Progress", lastActivity: "Nov 20" },
  { id: "RA-10", account: "AP Control", type: "Subledger", entity: "Group", owner: "Kevin Doyle", glBalance: "$7,860,000", sourceBalance: "$7,860,000", difference: "$0", matchedPct: 98.0, status: "In Progress", lastActivity: "Nov 20" },
  { id: "RA-11", account: "Inventory Control", type: "Subledger", entity: "Plant 1", owner: "Anita Roy", glBalance: "$31,600,000", sourceBalance: "$31,597,150", difference: "$2,850", matchedPct: 95.1, status: "In Progress", lastActivity: "Nov 20" },
  { id: "RA-12", account: "Fixed Assets Control", type: "Subledger", entity: "Group", owner: "Anita Roy", glBalance: "$64,800,000", sourceBalance: "$64,800,000", difference: "$0", matchedPct: 99.0, status: "Reconciled", lastActivity: "Nov 19" },
  { id: "RA-13", account: "Intercompany, Plants 1 and 3", type: "Intercompany", entity: "Group", owner: "Priya Nair", glBalance: "$286,400 receivable", sourceBalance: "$286,400 payable", difference: "$0", matchedPct: 93.5, status: "In Progress", lastActivity: "Nov 20" },
  { id: "RA-14", account: "GST/HST Payable", type: "Tax", entity: "Plant 1", owner: "Lucas Meyer", glBalance: "$412,800", sourceBalance: "Not yet compared", difference: "Pending", matchedPct: null, status: "Not Started", lastActivity: "Nov 27 due" },
  { id: "RA-15", account: "QST Payable", type: "Tax", entity: "Plant 2", owner: "Lucas Meyer", glBalance: "$168,300", sourceBalance: "Not yet compared", difference: "Pending", matchedPct: null, status: "Not Started", lastActivity: "Nov 27 due" },
  { id: "RA-16", account: "US Sales Tax Payable", type: "Tax", entity: "Plant 3", owner: "Lucas Meyer", glBalance: "US$74,200", sourceBalance: "Not yet compared", difference: "Pending", matchedPct: null, status: "Not Started", lastActivity: "Nov 27 due" },
  { id: "RA-17", account: "Accrued Liabilities", type: "Accrual", entity: "Group", owner: "Priya Nair", glBalance: "$1,462,000", sourceBalance: "$1,462,000", difference: "$0", matchedPct: 93.9, status: "In Progress", lastActivity: "Nov 20" },
  { id: "RA-18", account: "Prepaid Expenses", type: "Accrual", entity: "Group", owner: "Lucas Meyer", glBalance: "$318,500", sourceBalance: "$318,500", difference: "$0", matchedPct: 99.2, status: "Reconciled", lastActivity: "Nov 19" },
  { id: "RA-19", account: "Wages Payable", type: "Payroll", entity: "Group", owner: "Kevin Doyle", glBalance: "$612,800", sourceBalance: "$612,800", difference: "$0", matchedPct: 99.4, status: "Reconciled", lastActivity: "Nov 20" },
  { id: "RA-20", account: "Bonus Accrual", type: "Payroll", entity: "Group", owner: "Sarah Mitchell", glBalance: "$840,000", sourceBalance: "$840,000", difference: "$0", matchedPct: 92.4, status: "In Progress", lastActivity: "Nov 20" },
  { id: "RA-21", account: "FX Revaluation Clearing", type: "FX", entity: "Group", owner: "Priya Nair", glBalance: "$0", sourceBalance: "$0", difference: "$0", matchedPct: 91.3, status: "In Progress", lastActivity: "Nov 20" },
];

export const recExceptions: RecException[] = [
  {
    id: "EX-01",
    account: "GRNI Clearing",
    amount: "$47,300",
    age: "9 days",
    title: "Goods received not invoiced difference of $47,300",
    detail:
      "Alfie matched receipts to invoices across all three plants except for $47,300 of steel and tooling received at Plant 1 and Plant 2 in early November where the supplier invoices have not arrived. The largest single receipt is a Lakefront Steel coil delivery received November 9. No journal entry is needed yet; the balance clears as invoices land, and anything still open at month end is reviewed for accrual.",
    owner: "Kevin Doyle",
    status: "In review",
  },
  {
    id: "EX-02",
    account: "Payroll Clearing, Plant 2",
    amount: "Not yet known",
    age: "2 days",
    title: "Plant 2 payroll feed is lagging with the MES sync",
    detail:
      "The Plex MES feed at Plant 2 has not delivered time and payroll data for 2 days, so the Plant 2 payroll clearing account cannot be completed. The GL balance of $6,480 is carried from the last completed run. The feed status is also shown in Data Sources; Plant 2 IT is working the sync with the vendor.",
    owner: "Lucas Meyer",
    status: "Open",
  },
  {
    id: "EX-03",
    account: "Inventory Control",
    amount: "$2,850",
    age: "3 days",
    title: "Inventory control difference of $2,850 at Plant 1",
    detail:
      "The perpetual inventory at Plant 1 is $2,850 above the GL control account, traced to a Line 3 scrap posting made twice on November 17. The duplicate posting is identified and the correction will be made in Inventory, not by journal, so the audit trail stays with the scrap transaction.",
    owner: "Anita Roy",
    status: "In review",
  },
  {
    id: "EX-04",
    account: "Chase US Operating",
    amount: "US$1,250",
    age: "4 days",
    title: "Duplicate bank fee on the Chase account",
    detail:
      "The November account analysis fee appears twice on the Chase statement for Plant 3. Mark Feldman has raised it with the bank; the duplicate is expected to be reversed rather than adjusted in the GL.",
    owner: "Mark Feldman",
    status: "Open",
  },
  {
    id: "EX-05",
    account: "AR Control",
    amount: "$12,600",
    age: "7 days",
    title: "Unapplied customer deposit of $12,600",
    detail:
      "A deposit was received on November 10 with no remittance reference. Alfie matched it to an open AgriCore Equipment order by amount and date, but applying cash needs a person to confirm, so it stays unapplied until Receivables confirms.",
    owner: "Lucas Meyer",
    status: "Open",
  },
];

export const alfieRecNotes = [
  "Matching runs continuously as feeds arrive. This week Alfie auto-matched 94.8% of November lines; every unmatched line lands in the exceptions queue with the reason attached.",
  "The largest exception, the $47,300 GRNI balance, is a timing item rather than an error: goods are received, invoices are in transit. Alfie ages each receipt so the team can chase the oldest invoices first.",
  "The Plant 2 payroll clearing account is held up by the MES feed, not by the books. Once the Plex sync recovers, the two days of time data land together and the account clears without manual work.",
] as const;

// Route content for the Reconciliations page. World-specific narrative
// lives here so the route stays world-agnostic.

export const recMetaDescription =
  "Bank, subledger and control account reconciliations for Northline Group, with continuous auto-matching and one exceptions queue.";

export const recDescription =
  "Every bank, card, subledger and control account for Northline Group, matched continuously by Alfie, with one exceptions queue for the lines a person needs to look at.";

export const recRunNote =
  "Matching run completed just now. No new exceptions; the five open exceptions below are unchanged.";

export const recFlagshipPrompt = {
  label: "Explain the GRNI clearing difference",
  prompt: "Explain the goods received not invoiced difference of $47,300 and whether it needs a journal entry.",
};

export const recCorrectionLink: RecCorrectionLink | null = null;
