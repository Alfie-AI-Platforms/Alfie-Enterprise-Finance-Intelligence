import type { AccountingAnswers, AuditEvent, EntryStatus, JournalEntry } from "@/lib/worlds/enterprise/accounting-data";

export const entryStatuses: readonly EntryStatus[] = ["Needs Review", "In Preparation", "Awaiting Approval", "Approved", "Posted"];

export const entities: readonly string[] = ["Aurora Ridge Mining Corp.", "Aurora Ridge USA Inc.", "Copperline Metals JV", "Aurora Ridge Resources (consolidated)"];

export const entries: JournalEntry[] = [
  {
    id: "JE-2026-0874",
    title: "Copperline JV operator statement correction, October",
    type: "Joint Venture",
    entity: "Copperline Metals JV",
    status: "Needs Review",
    priority: "High",
    preparedBy: "Alfie",
    reviewer: "Nadia Hassan",
    updated: "41m ago",
    updatedDays: 0,
    period: "October 2026 · Post-close adjustment",
    entryDate: "October 31, 2026",
    amount: 253500,
    source: "Alfie joint venture reconciliation",
    lines: [
      { account: "2180", accountName: "Accrued joint venture costs", entity: "Copperline Metals JV", debit: 186000, credit: 0, memo: "Reduce the October accrual for the camp and catering overbilling" },
      { account: "5240", accountName: "JV camp and catering costs", entity: "Copperline Metals JV", debit: 0, credit: 186000, memo: "Camp invoice billed at 100 percent of cost instead of Aurora's 40 percent share" },
      { account: "5310", accountName: "JV diesel and fuel costs", entity: "Copperline Metals JV", debit: 67500, credit: 0, memo: "October diesel accrual at the project, missing from the operator statement accrual" },
      { account: "2180", accountName: "Accrued joint venture costs", entity: "Copperline Metals JV", debit: 0, credit: 67500, memo: "Accrue Aurora's 40 percent share of October project diesel" },
    ],
    evidence: [
      {
        id: "ev1",
        name: "kestrel_operator_statement_october.pdf",
        label: "Kestrel Operator Statement, October",
        size: "264 KB",
        summary: "Copperline Metals JV operator statement from Kestrel Resources for October 2026. The statement shows Aurora Ridge's 40 percent share of joint venture costs at $4,218,000; Aurora accrued $3,964,500. Difference: $253,500.",
        sections: [
          { heading: "Statement total", body: "Kestrel, as operator with a 60 percent interest, bills Aurora monthly for its 40 percent share of project costs. The October statement totals $4,218,000 for Aurora's share." },
          { heading: "Accrual comparison", body: "Aurora accrued $3,964,500 for October based on the project cost reports. The $253,500 difference between the statement and the accrual is the subject of this entry." },
        ],
      },
      {
        id: "ev2",
        name: "copperline_jv_agreement_extract.pdf",
        label: "Copperline JV Agreement Extract",
        size: "232 KB",
        summary: "Extract of the Copperline joint venture agreement. Aurora Ridge holds a 40 percent non-operated interest; Kestrel Resources operates with 60 percent. Shared costs are billed strictly in proportion to interests.",
        sections: [
          { heading: "Cost sharing", body: "All joint venture costs, including camp and catering, are shared 60 percent Kestrel and 40 percent Aurora. No cost category is billable at 100 percent to the non-operator." },
          { heading: "Statement queries", body: "Aurora may query any statement line within 60 days. Queries do not suspend the operator's right to call cash, but corrections are reflected in the following statement cycle." },
        ],
      },
      {
        id: "ev3",
        name: "camp_catering_invoice_detail.pdf",
        label: "Camp and Catering Invoice Detail",
        size: "171 KB",
        summary: "Detail of the October camp and catering invoice in the operator statement. One invoice was billed to Aurora at 100 percent of its cost instead of the 40 percent share, overstating Aurora's share by $186,000.",
        sections: [
          { heading: "Billing error", body: "The camp and catering line includes one invoice for the full camp cost for October. Aurora's 40 percent share of that invoice is 60 percent less than the amount billed, a difference of $186,000." },
        ],
      },
      {
        id: "ev4",
        name: "alfie_jv_workpaper.pdf",
        label: "Alfie JV Reconciliation Workpaper",
        size: "149 KB",
        summary: "Alfie's reconciliation of the October operator statement to Aurora's accrual. It traces the $253,500 gap to the camp billing error and a missing diesel accrual, and supports entry JE-2026-0874. A draft query letter to Kestrel accompanies the workpaper.",
        sections: [
          { heading: "Trace", body: "Line by line, the statement agrees to Aurora's cost reports except for two items: the camp and catering invoice billed at 100 percent ($186,000 overstatement of Aurora's share) and October diesel consumed at the project that Aurora had not accrued ($67,500)." },
          { heading: "Conclusion", body: "The corrected October share is the accrued amount adjusted by this entry. The billing error itself is Kestrel's to correct on the next statement; the draft query letter asks for that correction and for the camp invoice to be reissued at 40 percent." },
        ],
      },
    ],
    analysis: {
      intro: "I reconciled Kestrel Resources' October operator statement for Copperline against Aurora's accrual and found a difference of $253,500 that breaks into two items:",
      items: [
        "The statement shows Aurora's 40 percent share of October JV costs at $4,218,000; Aurora accrued $3,964,500.",
        "The camp and catering line was billed at 100 percent of cost on one invoice instead of Aurora's 40 percent share, overstating the share by $186,000. The JV agreement bills every cost category strictly by interest.",
        "An October diesel accrual of $67,500 at the project is missing from Aurora's accrual, which runs the other way.",
        "This entry corrects the accrual for both items, and I have drafted a query letter to Kestrel asking for the camp invoice to be reissued at 40 percent on the next statement.",
      ],
      next: "Controller review, then CFO approval. Post-close adjustments above $10,000 require both.",
      confidence: "High",
      sources: ["Kestrel Operator Statement, October", "Copperline JV Agreement Extract", "Camp and Catering Invoice Detail", "SAP S/4HANA GL, Copperline JV"],
    },
  },
  {
    id: "JE-2026-0882",
    title: "Payroll accrual, November",
    type: "Payroll",
    entity: "Aurora Ridge Resources (consolidated)",
    status: "Needs Review",
    priority: "Medium",
    preparedBy: "Alfie",
    reviewer: "Nadia Hassan",
    updated: "3h ago",
    updatedDays: 0,
    period: "November 2026",
    entryDate: "November 30, 2026",
    amount: 892000,
    source: "Alfie payroll accrual",
    lines: [
      { account: "6110", accountName: "Salaries and wages", entity: "Aurora Ridge Resources (consolidated)", debit: 758000, credit: 0, memo: "Accrued wages for the November 23 to 30 pay period, both mines and corporate" },
      { account: "6150", accountName: "Payroll taxes and benefits", entity: "Aurora Ridge Resources (consolidated)", debit: 134000, credit: 0, memo: "Employer taxes and benefits on accrued wages" },
      { account: "2130", accountName: "Accrued payroll", entity: "Aurora Ridge Resources (consolidated)", debit: 0, credit: 892000, memo: "Payable on the December 4 payroll run" },
    ],
    evidence: [
      {
        id: "ev1",
        name: "payroll_register_november_2026.pdf",
        label: "Payroll Register, November 2026",
        size: "236 KB",
        summary: "Payroll register summary for November 2026 across Keno Ridge, Sagebrush and corporate. The final pay period of the month runs November 23 to 30 and is paid on December 4.",
        sections: [
          { heading: "Accrual basis", body: "Accrued wages of $758,000 cover November 23 to 30, calculated from the current payroll registers, including rotational camp crews at both mines." },
          { heading: "Employer costs", body: "Employer taxes and benefits of $134,000 are accrued at the blended rate from the last completed payroll run at each site." },
        ],
      },
      {
        id: "ev2",
        name: "payroll_calendar_2026.pdf",
        label: "Payroll Calendar",
        size: "82 KB",
        summary: "Group payroll calendar for 2026. Pay periods are weekly, paid the following Friday. The November 23 to 30 period is paid on December 4, 2026.",
        sections: [
          { heading: "Cut-off", body: "Because the pay date falls in December, the November portion is accrued at November 30 and reverses automatically when the December 4 payroll is processed." },
        ],
      },
    ],
    analysis: {
      intro: "This accrual covers the final week of November, which falls in the November period but is paid on December 4:",
      items: [
        "Accrued wages of $758,000 cover November 23 to 30 across both mines and corporate, based on the current payroll registers.",
        "Employer taxes and benefits of $134,000 are accrued at the blended rate from the last completed payroll at each site.",
        "The accrual reverses automatically when the December 4 payroll is processed, so there is no manual reversal to track.",
      ],
      next: "Controller review and posting.",
      confidence: "High",
      sources: ["Payroll Register, November 2026", "Payroll Calendar"],
    },
  },
  {
    id: "JE-2026-0880",
    title: "Stockpile survey adjustment, October",
    type: "Inventory",
    entity: "Aurora Ridge Mining Corp.",
    status: "Awaiting Approval",
    priority: "High",
    preparedBy: "Peter Lindqvist",
    reviewer: "Robert Hale",
    updated: "5h ago",
    updatedDays: 0,
    period: "October 2026 · Post-close adjustment",
    entryDate: "October 31, 2026",
    amount: 286000,
    source: "Alfie stockpile check",
    lines: [
      { account: "5120", accountName: "Cost of sales, stockpile adjustment", entity: "Aurora Ridge Mining Corp.", debit: 286000, credit: 0, memo: "Write down Keno Ridge ore stockpile to the October survey quantity" },
      { account: "1430", accountName: "Ore stockpile inventory", entity: "Aurora Ridge Mining Corp.", debit: 0, credit: 286000, memo: "Survey measured fewer tonnes than the book stockpile at October 31" },
    ],
    evidence: [
      {
        id: "ev1",
        name: "keno_stockpile_survey_october.pdf",
        label: "Keno Ridge Stockpile Survey, October",
        size: "188 KB",
        summary: "October volumetric survey of the Keno Ridge ore stockpiles. Surveyed tonnes are below the book stockpile, supporting a $286,000 write-down at the October average cost per tonne.",
        sections: [
          { heading: "Survey result", body: "The October survey measured the run of mine and crushed ore stockpiles at Keno Ridge. At the October average cost per tonne, the shortfall against the book quantity is $286,000." },
          { heading: "Cause", body: "The difference is attributed to density assumptions in the September survey and crusher throughput timing. No material is unaccounted for outside the survey tolerance the site reports each quarter." },
        ],
      },
    ],
    analysis: {
      intro: "The October stockpile survey at Keno Ridge measured fewer tonnes than the book stockpile, and the carrying value needs to follow the survey:",
      items: [
        "At the October average cost per tonne, the survey shortfall is $286,000. This entry writes the stockpile down to the surveyed quantity.",
        "The site attributes the difference to September density assumptions and crusher timing, both inside normal survey tolerance.",
        "The November survey is already scheduled and will confirm whether any of the difference reverses.",
      ],
      next: "CFO approval, as a post-close adjustment above the $10,000 threshold, then posting.",
      confidence: "Medium",
      sources: ["Keno Ridge Stockpile Survey, October"],
    },
  },
  {
    id: "JE-2026-0878",
    title: "Asset retirement obligation accretion, October",
    type: "Accrual",
    entity: "Aurora Ridge Mining Corp.",
    status: "Needs Review",
    priority: "Medium",
    preparedBy: "Peter Lindqvist",
    reviewer: "Nadia Hassan",
    updated: "2h ago",
    updatedDays: 0,
    period: "October 2026",
    entryDate: "October 31, 2026",
    amount: 412000,
    source: "SAP S/4HANA ARO schedule",
    lines: [
      { account: "6910", accountName: "Accretion expense, asset retirement obligation", entity: "Aurora Ridge Mining Corp.", debit: 298000, credit: 0, memo: "October accretion on the Keno Ridge reclamation provision" },
      { account: "6910", accountName: "Accretion expense, asset retirement obligation", entity: "Aurora Ridge USA Inc.", debit: 114000, credit: 0, memo: "October accretion on the Sagebrush reclamation provision" },
      { account: "2610", accountName: "Asset retirement obligation", entity: "Aurora Ridge Resources (consolidated)", debit: 0, credit: 412000, memo: "Provision carried at $88.7M after the October accretion" },
    ],
    evidence: [
      {
        id: "ev1",
        name: "aro_schedule_october_2026.pdf",
        label: "ARO Schedule, October 2026",
        size: "164 KB",
        summary: "Asset retirement obligation schedule for both mines. The consolidated provision is $88.7M; October accretion of $412,000 unwinds the discount for the month.",
        sections: [
          { heading: "Accretion", body: "Accretion is charged monthly at the credit-adjusted risk-free rate used when each obligation was recognized. Keno Ridge accounts for $298,000 of the October charge and Sagebrush for $114,000." },
          { heading: "Provision balance", body: "After the October entry the consolidated provision is $88.7M. The next full reclamation cost re-estimate is scheduled with the year-end technical review." },
        ],
      },
    ],
    analysis: {
      intro: "This is the October accretion on the reclamation provision for both mines, posted from the ARO schedule:",
      items: [
        "Accretion of $412,000 unwinds one month of discount on the $88.7M provision: $298,000 at Keno Ridge and $114,000 at Sagebrush.",
        "No change to the underlying reclamation cost estimates is included; the next re-estimate comes with the year-end technical review.",
        "The schedule agrees to the provision balance in SAP S/4HANA with no variance.",
      ],
      next: "Controller review and posting.",
      confidence: "High",
      sources: ["ARO Schedule, October 2026"],
    },
  },
  {
    id: "JE-2026-0876",
    title: "Mobile fleet depreciation, October",
    type: "Depreciation",
    entity: "Aurora Ridge Mining Corp.",
    status: "In Preparation",
    priority: "Medium",
    preparedBy: "Peter Lindqvist",
    reviewer: "Nadia Hassan",
    updated: "1h ago",
    updatedDays: 0,
    period: "October 2026",
    entryDate: "October 31, 2026",
    amount: 1240000,
    source: "SAP S/4HANA fixed assets",
    lines: [
      { account: "6810", accountName: "Depreciation expense", entity: "Aurora Ridge Mining Corp.", debit: 812000, credit: 0, memo: "Keno Ridge mobile fleet and plant, units of production" },
      { account: "6810", accountName: "Depreciation expense", entity: "Aurora Ridge USA Inc.", debit: 428000, credit: 0, memo: "Sagebrush mobile fleet and plant, units of production" },
      { account: "1590", accountName: "Accumulated depreciation", entity: "Aurora Ridge Resources (consolidated)", debit: 0, credit: 1240000, memo: "October depreciation run per the fixed asset register" },
    ],
    evidence: [
      {
        id: "ev1",
        name: "fixed_asset_register_extract.pdf",
        label: "Fixed Asset Register Extract",
        size: "348 KB",
        summary: "Extract of the group fixed asset register supporting the October depreciation run of $1,240,000 across the two mines.",
        sections: [
          { heading: "Run composition", body: "Keno Ridge accounts for $812,000 of the run on a units of production basis, reflecting October throughput. Sagebrush accounts for $428,000." },
          { heading: "Changes this month", body: "Two haul trucks at Keno Ridge reach the end of their component life this month and are re-based in the November run. No disposals or impairments are included." },
        ],
      },
    ],
    analysis: {
      intro: "The October depreciation run from the fixed asset register is drafted and ready to finish:",
      items: [
        "The run totals $1,240,000 across the two mines. Keno Ridge is the largest share at $812,000, on a units of production basis.",
        "Two Keno Ridge haul trucks reach the end of their component life this month and are re-based in the November run.",
        "No disposals or impairments are included in this run.",
      ],
      next: "Finish preparation, then Controller review.",
      confidence: "High",
      sources: ["Fixed Asset Register Extract"],
    },
  },
  {
    id: "JE-2026-0872",
    title: "Hedge settlement, October forward sales",
    type: "Treasury",
    entity: "Aurora Ridge Resources (consolidated)",
    status: "Approved",
    priority: "Medium",
    preparedBy: "Angela Ruiz",
    reviewer: "Claire Dubois",
    updated: "Yesterday",
    updatedDays: 1,
    period: "October 2026 · Post-close adjustment",
    entryDate: "October 31, 2026",
    amount: 384000,
    source: "Alfie treasury review",
    lines: [
      { account: "7190", accountName: "Hedge settlement loss", entity: "Aurora Ridge Resources (consolidated)", debit: 384000, credit: 0, memo: "October settlements on matured gold forwards under the board approved program" },
      { account: "1115", accountName: "Cash, RBC USD account", entity: "Aurora Ridge Resources (consolidated)", debit: 0, credit: 384000, memo: "Net settlement paid on October maturities" },
    ],
    evidence: [
      {
        id: "ev1",
        name: "hedge_settlement_statement_october.pdf",
        label: "Hedge Settlement Statement, October",
        size: "126 KB",
        summary: "Counterparty settlement statement for October 2026 forward maturities. Net settlement of $384,000 was paid, reflecting realized prices above the forward prices on the matured ounces.",
        sections: [
          { heading: "Program context", body: "The settlements arise under the board approved hedging program. A further 18,000 oz is sold forward for Q1 2027 at US$3,940 per oz." },
        ],
      },
    ],
    analysis: {
      intro: "This records the October settlements on the matured portion of the forward book:",
      items: [
        "Realized prices on the matured ounces ran above the forward prices, so the October maturities settled as a $384,000 payment.",
        "The entry was reviewed and approved by the VP Finance as a post-close adjustment.",
      ],
      next: "Approved. Posts with the next consolidation run.",
      confidence: "High",
      sources: ["Hedge Settlement Statement, October"],
    },
  },
  {
    id: "JE-2026-0870",
    title: "Corporate card expense allocation, October",
    type: "Reclassification",
    entity: "Aurora Ridge Resources (consolidated)",
    status: "Posted",
    priority: "Low",
    preparedBy: "Peter Lindqvist",
    reviewer: "Nadia Hassan",
    updated: "8d ago",
    updatedDays: 8,
    period: "October 2026",
    entryDate: "October 31, 2026",
    amount: 27960,
    source: "SAP S/4HANA",
    lines: [
      { account: "6410", accountName: "Travel and entertainment", entity: "Aurora Ridge Resources (consolidated)", debit: 27960, credit: 0, memo: "October corporate card spend allocated by cost centre" },
      { account: "2150", accountName: "Corporate card clearing", entity: "Aurora Ridge Resources (consolidated)", debit: 0, credit: 27960, memo: "American Express corporate card clearing, October statement" },
    ],
    evidence: [
      {
        id: "ev1",
        name: "amex_statement_october.pdf",
        label: "Amex Statement, October",
        size: "158 KB",
        summary: "American Express corporate card statement for October 2026. Total spend of $27,960 was allocated to cost centres and posted in the October close.",
        sections: [
          { heading: "Allocation", body: "Each transaction on the October statement was coded to a cost centre before posting. The clearing account balance for October is nil after this entry." },
        ],
      },
    ],
    analysis: {
      intro: "Posted to SAP S/4HANA on October 31, 2026 as part of the October close:",
      items: ["October corporate card spend of $27,960 was allocated by cost centre from the Amex statement.", "The corporate card clearing account is nil for October after this entry."],
      next: "Posted. No further action.",
      confidence: "High",
      sources: ["Amex Statement, October"],
    },
  },
  {
    id: "JE-2026-0868",
    title: "October revenue recognition",
    type: "Revenue",
    entity: "Aurora Ridge Resources (consolidated)",
    status: "Posted",
    priority: "Low",
    preparedBy: "SAP S/4HANA",
    reviewer: "Nadia Hassan",
    updated: "9d ago",
    updatedDays: 9,
    period: "October 2026",
    entryDate: "October 31, 2026",
    amount: 41500000,
    source: "SAP S/4HANA billing",
    lines: [
      { account: "1210", accountName: "Accounts receivable", entity: "Aurora Ridge Resources (consolidated)", debit: 41500000, credit: 0, memo: "October gold and silver settlements per SAP billing" },
      { account: "4010", accountName: "Metal sales revenue", entity: "Aurora Ridge Resources (consolidated)", debit: 0, credit: 41500000, memo: "October revenue recognized on refinery settlement" },
    ],
    evidence: [
      {
        id: "ev1",
        name: "october_revenue_summary.pdf",
        label: "October Revenue Summary",
        size: "144 KB",
        summary: "Consolidated revenue summary for October 2026. Revenue of $41.5M was recognized on refinery settlements from Keno Ridge and Sagebrush and posted as the October summary entry.",
        sections: [
          { heading: "Composition", body: "The $41.5M October total is the consolidated sum of settled gold and silver sales from both mines, recognized on final refinery settlement under the group revenue policy." },
        ],
      },
    ],
    analysis: {
      intro: "Posted to SAP S/4HANA on October 31, 2026 as part of the October close:",
      items: ["October revenue of $41.5M was recognized on refinery settlement across the two mines.", "This is the summary posting from SAP billing; lot-level detail sits in Receivables."],
      next: "Posted. No further action.",
      confidence: "High",
      sources: ["October Revenue Summary"],
    },
  },
  {
    id: "JE-2026-0865",
    title: "Income tax installment accrual, Q4",
    type: "Accrual",
    entity: "Aurora Ridge Resources (consolidated)",
    status: "Posted",
    priority: "Low",
    preparedBy: "Peter Lindqvist",
    reviewer: "Nadia Hassan",
    updated: "9d ago",
    updatedDays: 9,
    period: "October 2026",
    entryDate: "October 31, 2026",
    amount: 2400000,
    source: "SAP S/4HANA",
    lines: [
      { account: "7210", accountName: "Income tax expense", entity: "Aurora Ridge Resources (consolidated)", debit: 2400000, credit: 0, memo: "Q4 income tax installment accrual, including mining taxes" },
      { account: "2210", accountName: "Income taxes payable", entity: "Aurora Ridge Resources (consolidated)", debit: 0, credit: 2400000, memo: "Installment payable on the Q4 due date" },
    ],
    evidence: [
      {
        id: "ev1",
        name: "tax_installment_schedule.pdf",
        label: "Tax Installment Schedule",
        size: "94 KB",
        summary: "Income and mining tax installment schedule for 2026. The Q4 installment accrual of $2,400,000 follows the schedule agreed with the group's tax advisors.",
        sections: [
          { heading: "Basis", body: "Installments are accrued monthly against the annual schedule so the expense is recognized in the period it relates to." },
        ],
      },
    ],
    analysis: {
      intro: "Posted to SAP S/4HANA on October 31, 2026 as part of the October close:",
      items: ["The Q4 installment accrual of $2,400,000 follows the installment schedule for 2026."],
      next: "Posted. No further action.",
      confidence: "High",
      sources: ["Tax Installment Schedule"],
    },
  },
  {
    id: "JE-2026-0862",
    title: "Intercompany management fee, October",
    type: "Intercompany",
    entity: "Aurora Ridge Mining Corp.",
    status: "Posted",
    priority: "Low",
    preparedBy: "Peter Lindqvist",
    reviewer: "Nadia Hassan",
    updated: "10d ago",
    updatedDays: 10,
    period: "October 2026",
    entryDate: "October 31, 2026",
    amount: 210000,
    source: "SAP S/4HANA",
    lines: [
      { account: "2140", accountName: "Intercompany receivable, Aurora Ridge USA Inc.", entity: "Aurora Ridge Mining Corp.", debit: 210000, credit: 0, memo: "October management and technical services fee charged to Sagebrush" },
      { account: "4250", accountName: "Management fee income", entity: "Aurora Ridge Mining Corp.", debit: 0, credit: 210000, memo: "Monthly fee per the intercompany services agreement" },
    ],
    evidence: [
      {
        id: "ev1",
        name: "intercompany_services_agreement_extract.pdf",
        label: "Intercompany Services Agreement Extract",
        size: "201 KB",
        summary: "Extract of the intercompany services agreement. Corporate provides management, technical services and treasury support to the mines for a combined monthly fee of $210,000.",
        sections: [
          { heading: "Fee basis", body: "The monthly fee of $210,000 is fixed under the agreement and is eliminated on consolidation with the matching expense in the receiving entities." },
        ],
      },
    ],
    analysis: {
      intro: "Posted to SAP S/4HANA on October 31, 2026 as part of the October close:",
      items: ["The October management fee of $210,000 was charged under the intercompany services agreement.", "The fee eliminates on consolidation against the matching expense in the receiving entities."],
      next: "Posted. No further action.",
      confidence: "High",
      sources: ["Intercompany Services Agreement Extract"],
    },
  },
];

// Route content for the Accounting pages (register and entry workspace).
// World-specific narrative lives here so the routes stay world-agnostic.

export const flagshipEntryId = "JE-2026-0874";

export const flagshipKeywords: readonly string[] = ["operator statement", "difference", "joint venture"];

export const flagshipPrompt = "Explain the operator statement difference.";

export const accountingMetrics: readonly (readonly [string, string, string, boolean])[] = [["Open Entries", "6", "November and post-close", true], ["Needs Review", "3", "+1 today", true], ["Awaiting Approval", "1", "With the CFO", true], ["Post-Close Adjustments", "3", "October period", true], ["Posted in October", "4", "In this register", false]];

export const accountingExamples: readonly string[] = ["Show me the entries that need my attention today.", "Explain the operator statement difference.", "Which entries are waiting on approval?", "Show me the open post-close adjustments."];

export const accountingAnswers: AccountingAnswers = {
  flagship: {
    intro: "The operator statement difference sits in JE-2026-0874, the October post-close adjustment Alfie prepared.",
    note: "Kestrel's statement shows Aurora's 40 percent share at $4,218,000 against an accrual of $3,964,500. Alfie traced the $253,500 gap to a camp invoice billed at 100 percent of cost ($186,000) and a missing October diesel accrual ($67,500). Sources: Kestrel operator statement, Copperline JV agreement extract.",
  },
  approval: {
    intro: "2 entries are in the approval path.",
    note: "JE-2026-0880 ($286,000) is with the CFO. JE-2026-0874 ($253,500) needs CFO approval after Controller review because it is a post-close adjustment above the $10,000 threshold.",
  },
  postClose: {
    intro: "3 October post-close adjustments are still open.",
    note: "October closed in 9 days against the 10 day target. Post-close adjustments above $10,000 need Controller review and CFO approval before they post.",
  },
  attention: {
    intro: "You have 3 entries that need your attention today, based on status, priority, and the close calendar.",
    note: "JE-2026-0874 is the open item blocking the Copperline equity pickup for October. Sources: journal register, close checklist.",
  },
};

export const newEntryDefaults = { preparedBy: "Claire Dubois", reviewer: "Nadia Hassan", firstNumber: 883 };

export const erpName = "SAP S/4HANA";

export const entryPrompts: readonly string[] = ["Analyze this entry.", "What requires my attention?", "Explain the operator statement difference.", "Walk me through the entry lines.", "Check this entry against policy.", "What information is missing?", "Prepare a summary for the CFO."];

export const entryWorkflow: readonly string[] = ["Prepared", "Evidence Attached", "Alfie Analysis", "Controller Review", "CFO Approval", "Posted to SAP S/4HANA", "Closed"];

export const flagshipIssue = "The Copperline accrual stays misstated until this entry posts.";

export const flagshipRouteNext = "Route to Robert Hale (CFO) after Controller review.";

export const flagshipMissingItems: string[] = ["Controller review has not yet been recorded (Nadia Hassan).", "CFO approval is outstanding (Robert Hale), required above the $10,000 post-close threshold."];

export const flagshipReviewBar = {
  title: "Operator statement difference of $253,500 needs a correction decision",
  detail: "Alfie traced the gap between Kestrel Resources' October statement and Aurora's accrual to a camp and catering invoice billed at 100 percent of cost and a missing October diesel accrual, and prepared this entry. As a post-close adjustment above the $10,000 threshold, it also needs CFO approval after Controller review.",
};

export const getEntry = (id: string) => entries.find((entry) => entry.id === id);
export const money = (value: number) => `${value < 0 ? "-" : ""}$${Math.abs(value).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export const seedAudit: AuditEvent[] = [
  { time: "Nov 14, 09:41", actor: "Alfie", actorType: "Alfie", action: "Entry routed for review", source: "Accounting workflow", result: "With Nadia Hassan (Controller)" },
  { time: "Nov 14, 09:40", actor: "Alfie", actorType: "Alfie", action: "Prepared JE-2026-0874", source: "JV reconciliation workpaper", result: "$253,500 operator statement correction drafted" },
  { time: "Nov 14, 09:37", actor: "Alfie", actorType: "Alfie", action: "Traced difference to camp billing and diesel", source: "Kestrel Operator Statement, October", result: "Camp billed at 100 percent; diesel accrual missing" },
  { time: "Nov 14, 09:33", actor: "Alfie", actorType: "Alfie", action: "Reconciled the Copperline operator statement", source: "SAP S/4HANA consolidation", result: "Difference of $253,500 flagged" },
  { time: "Nov 3, 08:15", actor: "System", actorType: "System", action: "Copperline JV books closed for October", source: "SAP S/4HANA", result: "Accrual carried at $3,964,500" },
  { time: "Nov 2, 16:20", actor: "Kestrel Resources", actorType: "User", action: "Issued October operator statement", source: "Operator statement", result: "Aurora share shown at $4,218,000" },
  { time: "Oct 31, 18:05", actor: "Peter Lindqvist", actorType: "User", action: "Posted site cost accruals", source: "SAP S/4HANA GL", result: "October site costs accrued per cost reports" },
];
