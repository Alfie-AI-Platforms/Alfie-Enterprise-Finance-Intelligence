// Illustrative sample data for the Reconciliations module. Figures follow
// INDUSTRY_BRIEFS.md: 29 accounts, 95.1% auto-matched overall, exceptions
// led by the stockpile inventory difference of $94,600 awaiting the
// November survey and the lagging fuel card feed at Sagebrush.

import type { RecAccount, RecCorrectionLink, RecException } from "@/lib/worlds/enterprise/reconciliations-data";

export const recSummary = {
  accounts: 29,
  autoMatched: "95.1%",
  reconciled: 7,
  openExceptions: 6,
  note: "Auto-match rate is transaction weighted across all 29 accounts for November to date. Bank feeds from RBC and Wells Fargo are connected; the Sagebrush fuel card feed is the one lagging source.",
};

export const recAccounts: RecAccount[] = [
  { id: "RA-01", account: "RBC Operating CAD", type: "Bank", entity: "Corporate", owner: "Angela Ruiz", glBalance: "$21,480,000", sourceBalance: "$21,480,000", difference: "$0", matchedPct: 99.3, status: "Reconciled", lastActivity: "Nov 19" },
  { id: "RA-02", account: "RBC USD Account", type: "Bank", entity: "Corporate", owner: "Angela Ruiz", glBalance: "US$14,260,000", sourceBalance: "US$14,260,000", difference: "$0", matchedPct: 97.9, status: "In Progress", lastActivity: "Nov 20" },
  { id: "RA-03", account: "Wells Fargo US Operating", type: "Bank", entity: "Sagebrush", owner: "Angela Ruiz", glBalance: "US$6,840,000", sourceBalance: "US$6,838,900", difference: "US$1,100", matchedPct: 96.4, status: "In Progress", lastActivity: "Nov 20" },
  { id: "RA-04", account: "RBC Payroll", type: "Bank", entity: "Group", owner: "Angela Ruiz", glBalance: "$2,914,000", sourceBalance: "$2,914,000", difference: "$0", matchedPct: 99.6, status: "Reconciled", lastActivity: "Nov 19" },
  { id: "RA-05", account: "RBC Money Market", type: "Bank", entity: "Corporate", owner: "Angela Ruiz", glBalance: "$12,000,000", sourceBalance: "$12,000,000", difference: "$0", matchedPct: 100, status: "Reconciled", lastActivity: "Nov 19" },
  { id: "RA-06", account: "Scotiabank Project Facility", type: "Bank", entity: "Copperline JV", owner: "Angela Ruiz", glBalance: "$63,400,000 drawn", sourceBalance: "$63,400,000 drawn", difference: "$0", matchedPct: 98.8, status: "In Progress", lastActivity: "Nov 20" },
  { id: "RA-07", account: "TD Term Deposit", type: "Bank", entity: "Corporate", owner: "Angela Ruiz", glBalance: "$5,000,000", sourceBalance: "$5,000,000", difference: "$0", matchedPct: 100, status: "Reconciled", lastActivity: "Nov 19" },
  { id: "RA-08", account: "Fuel Card, Sagebrush", type: "Card", entity: "Sagebrush", owner: "Peter Lindqvist", glBalance: "$86,400", sourceBalance: "Statement incomplete", difference: "Unknown", matchedPct: 81.9, status: "Exception", lastActivity: "Nov 14" },
  { id: "RA-09", account: "Visa Corporate Card", type: "Card", entity: "Group", owner: "Susan Park", glBalance: "$24,180", sourceBalance: "$24,180", difference: "$0", matchedPct: 97.2, status: "In Progress", lastActivity: "Nov 20" },
  { id: "RA-10", account: "AR Control, Refinery Settlements", type: "Subledger", entity: "Group", owner: "Peter Lindqvist", glBalance: "$9,860,000", sourceBalance: "$9,860,000", difference: "$0", matchedPct: 98.6, status: "In Progress", lastActivity: "Nov 20" },
  { id: "RA-11", account: "AP Control", type: "Subledger", entity: "Group", owner: "Susan Park", glBalance: "$11,240,000", sourceBalance: "$11,240,000", difference: "$0", matchedPct: 98.1, status: "In Progress", lastActivity: "Nov 20" },
  { id: "RA-12", account: "Stockpile Inventory, Keno Ridge", type: "Subledger", entity: "Keno Ridge", owner: "Peter Lindqvist", glBalance: "$18,940,000", sourceBalance: "$18,845,400 surveyed", difference: "$94,600", matchedPct: 92.8, status: "Exception", lastActivity: "Nov 18" },
  { id: "RA-13", account: "Refinery in Transit", type: "Subledger", entity: "Group", owner: "Peter Lindqvist", glBalance: "$3,420,000", sourceBalance: "$3,420,000", difference: "$0", matchedPct: 96.7, status: "In Progress", lastActivity: "Nov 20" },
  { id: "RA-14", account: "Fixed Assets Control", type: "Subledger", entity: "Group", owner: "Peter Lindqvist", glBalance: "$412,600,000", sourceBalance: "$412,600,000", difference: "$0", matchedPct: 99.1, status: "Reconciled", lastActivity: "Nov 19" },
  { id: "RA-15", account: "JV Clearing, Copperline", type: "Joint Venture", entity: "Copperline JV", owner: "Nadia Hassan", glBalance: "$4,218,000 statement", sourceBalance: "$3,964,500 accrued", difference: "$253,500", matchedPct: 88.9, status: "Exception", lastActivity: "Nov 18" },
  { id: "RA-16", account: "ARO Provision", type: "Accrual", entity: "Group", owner: "Nadia Hassan", glBalance: "$88,700,000", sourceBalance: "$88,700,000", difference: "$0", matchedPct: 99.4, status: "In Progress", lastActivity: "Nov 20" },
  { id: "RA-17", account: "Accrued Liabilities", type: "Accrual", entity: "Group", owner: "Nadia Hassan", glBalance: "$4,860,000", sourceBalance: "$4,860,000", difference: "$0", matchedPct: 93.7, status: "In Progress", lastActivity: "Nov 20" },
  { id: "RA-18", account: "Prepaid Expenses", type: "Accrual", entity: "Group", owner: "Peter Lindqvist", glBalance: "$684,000", sourceBalance: "$684,000", difference: "$0", matchedPct: 99.0, status: "Reconciled", lastActivity: "Nov 19" },
  { id: "RA-19", account: "Wages Payable", type: "Payroll", entity: "Group", owner: "Susan Park", glBalance: "$892,000", sourceBalance: "$892,000", difference: "$0", matchedPct: 99.5, status: "Reconciled", lastActivity: "Nov 20" },
  { id: "RA-20", account: "Payroll Clearing", type: "Clearing", entity: "Group", owner: "Peter Lindqvist", glBalance: "$4,180", sourceBalance: "$0", difference: "$4,180", matchedPct: 91.6, status: "Exception", lastActivity: "Nov 20" },
  { id: "RA-21", account: "Bonus Accrual", type: "Payroll", entity: "Group", owner: "Claire Dubois", glBalance: "$1,640,000", sourceBalance: "$1,640,000", difference: "$0", matchedPct: 92.9, status: "In Progress", lastActivity: "Nov 20" },
  { id: "RA-22", account: "Royalty Payable, Keno Ridge", type: "Accrual", entity: "Keno Ridge", owner: "Peter Lindqvist", glBalance: "$412,600 accrued", sourceBalance: "Statement pending", difference: "Pending", matchedPct: null, status: "In Progress", lastActivity: "Nov 20" },
  { id: "RA-23", account: "Royalty Payable, Sagebrush", type: "Accrual", entity: "Sagebrush", owner: "Peter Lindqvist", glBalance: "$268,900 accrued", sourceBalance: "Statement pending", difference: "Pending", matchedPct: null, status: "Not Started", lastActivity: "Nov 27 due" },
  { id: "RA-24", account: "Nevada Net Proceeds Tax", type: "Tax", entity: "Sagebrush", owner: "Peter Lindqvist", glBalance: "$486,000 accrued", sourceBalance: "Not yet compared", difference: "Pending", matchedPct: null, status: "Not Started", lastActivity: "Nov 27 due" },
  { id: "RA-25", account: "GST/HST Payable", type: "Tax", entity: "Keno Ridge", owner: "Peter Lindqvist", glBalance: "$524,000", sourceBalance: "Not yet compared", difference: "Pending", matchedPct: null, status: "Not Started", lastActivity: "Nov 27 due" },
  { id: "RA-26", account: "Hedge Clearing", type: "Derivative", entity: "Corporate", owner: "Angela Ruiz", glBalance: "$1,180,000 liability", sourceBalance: "$1,180,000 liability", difference: "$0", matchedPct: 95.8, status: "In Progress", lastActivity: "Nov 20" },
  { id: "RA-27", account: "FX Revaluation Clearing", type: "FX", entity: "Group", owner: "Nadia Hassan", glBalance: "$0", sourceBalance: "$0", difference: "$0", matchedPct: 91.1, status: "In Progress", lastActivity: "Nov 20" },
  { id: "RA-28", account: "Intercompany, Corporate and USA", type: "Intercompany", entity: "Group", owner: "Nadia Hassan", glBalance: "$1,240,000 receivable", sourceBalance: "$1,240,000 payable", difference: "$0", matchedPct: 94.6, status: "In Progress", lastActivity: "Nov 20" },
  { id: "RA-29", account: "Gold in Transit Clearing", type: "Clearing", entity: "Group", owner: "Peter Lindqvist", glBalance: "$18,600", sourceBalance: "$18,600", difference: "$0", matchedPct: 97.4, status: "In Progress", lastActivity: "Nov 20" },
];

export const recExceptions: RecException[] = [
  {
    id: "EX-01",
    account: "Stockpile Inventory, Keno Ridge",
    amount: "$94,600",
    age: "From Oct 31",
    title: "Stockpile inventory difference of $94,600",
    detail:
      "The October survey at Keno Ridge measured the ore stockpiles below the book quantity, and a further $94,600 of difference has built up in November movements. The account stays in exception until the November survey lands late in the close window; the survey, not a journal estimate, settles the final number.",
    owner: "Peter Lindqvist",
    status: "In review",
  },
  {
    id: "EX-02",
    account: "Fuel Card, Sagebrush",
    amount: "Not yet known",
    age: "6 days",
    title: "Sagebrush fuel card feed is lagging",
    detail:
      "The fuel card feed has not delivered transactions since November 14, so diesel drawn at Sagebrush cannot be matched to the card statement. The GL balance of $86,400 is carried from site fuel logs in the meantime. Site administration is following up with the card provider.",
    owner: "Peter Lindqvist",
    status: "Open",
  },
  {
    id: "EX-03",
    account: "JV Clearing, Copperline",
    amount: "$253,500",
    age: "From Oct 31",
    title: "Copperline operator statement difference of $253,500",
    detail:
      "Kestrel's October statement shows Aurora's share at $4,218,000 against an accrual of $3,964,500. Alfie traced the gap to a camp invoice billed at 100 percent of cost ($186,000) and a missing diesel accrual ($67,500), and prepared JE-2026-0874. The correction is awaiting Controller review and CFO approval in Accounting.",
    owner: "Nadia Hassan",
    status: "Correction prepared",
  },
  {
    id: "EX-04",
    account: "Payroll Clearing",
    amount: "$4,180",
    age: "5 days",
    title: "Payroll clearing difference of $4,180",
    detail:
      "Alfie matched 286 of 290 clearing lines. The remaining $4,180 is a November 13 source deduction remittance that settled at the bank on November 17; it clears when the next RBC statement imports, which the stale ADP sync is delaying. No journal entry is needed.",
    owner: "Peter Lindqvist",
    status: "In review",
  },
  {
    id: "EX-05",
    account: "AR Control, Refinery Settlements",
    amount: "$196,000",
    age: "Over 60 days",
    title: "Refinery lot under assay dispute, $196,000",
    detail:
      "One gold lot settled with Cascade Refining is held at $196,000 pending the umpire assay. The receivable stays open in Receivables while the assay is resolved; no adjustment is made until the final settlement sheet arrives.",
    owner: "Peter Lindqvist",
    status: "Open",
  },
  {
    id: "EX-06",
    account: "Wells Fargo US Operating",
    amount: "US$1,100",
    age: "4 days",
    title: "Duplicate bank fee on the Wells Fargo account",
    detail:
      "The November account analysis fee appears twice on the Wells Fargo statement for Sagebrush. Angela Ruiz has raised it with the bank; the duplicate is expected to be reversed rather than adjusted in the GL.",
    owner: "Angela Ruiz",
    status: "Open",
  },
];

export const alfieRecNotes = [
  "Matching runs continuously as feeds arrive. This week Alfie auto-matched 95.1% of November lines; every unmatched line lands in the exceptions queue with the reason attached.",
  "Two of the six exceptions need no journal entry at all: the payroll clearing difference clears on the next statement import, and the duplicate bank fee is the bank's to reverse. Alfie marks these so the team does not chase them.",
  "The only exception that changes the October books is the Copperline operator statement difference, and its correction already exists as JE-2026-0874 with approvals attached. The stockpile difference waits on the November survey by design.",
] as const;

// Route content for the Reconciliations page. World-specific narrative
// lives here so the route stays world-agnostic.

export const recMetaDescription =
  "Bank, subledger and control account reconciliations for Aurora Ridge, with continuous auto-matching and one exceptions queue.";

export const recDescription =
  "Every bank, card, subledger and control account for Aurora Ridge, matched continuously by Alfie, with one exceptions queue for the lines a person needs to look at.";

export const recRunNote =
  "Matching run completed just now. No new exceptions; the six open exceptions below are unchanged.";

export const recFlagshipPrompt = {
  label: "Explain the stockpile inventory difference",
  prompt: "Explain the stockpile inventory difference of $94,600 and whether it needs a journal entry.",
};

export const recCorrectionLink: RecCorrectionLink | null = { exceptionId: "EX-03", entryId: "JE-2026-0874" };
