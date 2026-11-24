import type { AccountingAnswers, AuditEvent, EntryStatus, JournalEntry } from "@/lib/worlds/enterprise/accounting-data";

export const entryStatuses: readonly EntryStatus[] = ["Needs Review", "In Preparation", "Awaiting Approval", "Approved", "Posted"];

export const entities: readonly string[] = ["Northline Precision Inc.", "Northline Fabrication Ltée", "Northline Assembly Inc.", "Northline Manufacturing Group (consolidated)"];

export const entries: JournalEntry[] = [
  {
    id: "JE-2026-1142",
    title: "Standard cost true-up, Series 400 gear housings, October",
    type: "Costing",
    entity: "Northline Precision Inc.",
    status: "Needs Review",
    priority: "High",
    preparedBy: "Alfie",
    reviewer: "Priya Nair",
    updated: "32m ago",
    updatedDays: 0,
    period: "October 2026 · Post-close adjustment",
    entryDate: "October 31, 2026",
    amount: 318000,
    source: "Alfie cost accounting review",
    lines: [
      { account: "5010", accountName: "Cost of goods sold", entity: "Northline Precision Inc.", debit: 318000, credit: 0, memo: "True up October COGS for the Series 400 standard cost variance" },
      { account: "1420", accountName: "Inventory, work in progress", entity: "Northline Precision Inc.", debit: 0, credit: 124000, memo: "WIP carried at stale standards, Plant 1" },
      { account: "1410", accountName: "Inventory, finished goods", entity: "Northline Precision Inc.", debit: 0, credit: 194000, memo: "Finished Series 400 housings carried at stale standards, Plant 1" },
    ],
    evidence: [
      {
        id: "ev1",
        name: "series400_variance_report_october.pdf",
        label: "Series 400 Variance Report, October",
        size: "212 KB",
        summary: "Plant 1 standard cost variance report for the Series 400 gear housing family, October 2026. Total material variance of $212,000 unfavourable, with labour and overhead variances on top, before the inventory carrying effect.",
        sections: [
          { heading: "Material variance", body: "October material variance on the Series 400 family was $212,000 unfavourable. The family is Plant 1's largest product line and consumes the majority of the plant's hot-rolled coil steel." },
          { heading: "Carrying effect", body: "Because the standards were not updated during the year, the variance flowed through production and left October cost of goods sold understated and closing inventory overstated by a combined $318,000." },
        ],
      },
      {
        id: "ev2",
        name: "steel_price_history_2026.pdf",
        label: "Steel Price History, 2026",
        size: "104 KB",
        summary: "Hot-rolled coil purchase price history for 2026. The standard cost was set in January 2026 at $1,040 per tonne; the actual average price since July is $1,186 per tonne, 14 percent above standard.",
        sections: [
          { heading: "Price movement", body: "Hot-rolled coil averaged $1,186 per tonne from July to October against a January standard of $1,040. The increase was in place before the October production run and is the largest single driver of the material variance." },
          { heading: "Standard revision", body: "The draft January standard revision sets steel at $1,175 per tonne, close to the current run rate, so the price variance does not repeat at the same scale in 2027." },
        ],
      },
      {
        id: "ev3",
        name: "line3_scrap_report_october.pdf",
        label: "Line 3 Scrap Report, October",
        size: "148 KB",
        summary: "Scrap reporting for Line 3 at Plant 1. The scrap rate rose from 2.1 percent to 3.4 percent after the August tooling change and has not recovered.",
        sections: [
          { heading: "Usage variance", body: "At 3.4 percent scrap against a 2.1 percent standard factor, Line 3 consumed materially more steel per finished housing in October. The tooling change in August is the point where the rate stepped up." },
          { heading: "Standard revision", body: "The draft January revision moves the scrap factor to 3.0 percent, between the old standard and the current rate, pending the tooling review with production engineering." },
        ],
      },
      {
        id: "ev4",
        name: "alfie_variance_workpaper.pdf",
        label: "Alfie Variance Workpaper",
        size: "156 KB",
        summary: "Alfie's post-close cost review workpaper. It decomposes the Series 400 variance into price, usage and labour rate components and supports the $318,000 true-up in entry JE-2026-1142.",
        sections: [
          { heading: "Decomposition", body: "Price accounts for the largest share of the variance (steel at $1,186 against a $1,040 standard), usage is next (scrap at 3.4 percent against 2.1 percent), and a smaller labour rate piece reflects the September rate increase at Plant 1 that the standards also missed." },
          { heading: "Margin effect", body: "With costs understated, reported margin on the two largest Series 400 customers, AgriCore Equipment and Prairie Implement, is overstated by about 2.3 points for October. The January standard revision corrects the pricing basis for both accounts." },
          { heading: "Conclusion", body: "The variance is a standards problem, not a billing or cash problem. Entry JE-2026-1142 trues up October COGS and inventory by $318,000 so the closed period is stated at actual cost." },
        ],
      },
    ],
    analysis: {
      intro: "I reviewed the October standard cost results for the Series 400 gear housing family at Plant 1 and found the standards are stale enough that October is misstated:",
      items: [
        "October material variance was $212,000 unfavourable. Steel is the largest driver: the standard was set in January at $1,040 per tonne, while the actual average since July is $1,186, up 14 percent.",
        "Usage added to it. Scrap on Line 3 rose from 2.1 percent to 3.4 percent after the August tooling change, so each finished housing consumed more steel than the standard allows.",
        "With a smaller labour rate piece on top, October cost of goods sold is understated and inventory is overstated by $318,000. Reported margin on AgriCore Equipment and Prairie Implement is overstated by about 2.3 points.",
        "This entry trues up inventory and COGS by $318,000. I have also drafted the January standard revision: steel to $1,175 per tonne and the scrap factor to 3.0 percent.",
      ],
      next: "Controller review, then CFO approval. Post-close adjustments above $10,000 require both.",
      confidence: "High",
      sources: ["Series 400 Variance Report, October", "Steel Price History, 2026", "Line 3 Scrap Report, October", "Epicor Kinetic cost module, Plant 1"],
    },
  },
  {
    id: "JE-2026-1150",
    title: "Payroll accrual, November",
    type: "Payroll",
    entity: "Northline Manufacturing Group (consolidated)",
    status: "Needs Review",
    priority: "Medium",
    preparedBy: "Alfie",
    reviewer: "Priya Nair",
    updated: "4h ago",
    updatedDays: 0,
    period: "November 2026",
    entryDate: "November 30, 2026",
    amount: 612800,
    source: "Alfie payroll accrual",
    lines: [
      { account: "6110", accountName: "Salaries and wages", entity: "Northline Manufacturing Group (consolidated)", debit: 521400, credit: 0, memo: "Accrued wages for the November 23 to 30 pay period, all three plants" },
      { account: "6150", accountName: "Payroll taxes and benefits", entity: "Northline Manufacturing Group (consolidated)", debit: 91400, credit: 0, memo: "Employer taxes and benefits on accrued wages" },
      { account: "2130", accountName: "Accrued payroll", entity: "Northline Manufacturing Group (consolidated)", debit: 0, credit: 612800, memo: "Payable on the December 4 payroll run" },
    ],
    evidence: [
      {
        id: "ev1",
        name: "payroll_register_november_2026.pdf",
        label: "Payroll Register, November 2026",
        size: "228 KB",
        summary: "Payroll register summary for November 2026 across the three plants. The final pay period of the month runs November 23 to 30 and is paid on December 4.",
        sections: [
          { heading: "Accrual basis", body: "Accrued wages of $521,400 cover November 23 to 30, calculated from the current payroll registers for Plant 1, Plant 2 and Plant 3, including Line 3 overtime at Plant 1." },
          { heading: "Employer costs", body: "Employer taxes and benefits of $91,400 are accrued at the blended rate from the last completed payroll run at each plant." },
        ],
      },
      {
        id: "ev2",
        name: "payroll_calendar_2026.pdf",
        label: "Payroll Calendar",
        size: "84 KB",
        summary: "Group payroll calendar for 2026. Pay periods are weekly, paid the following Friday. The November 23 to 30 period is paid on December 4, 2026.",
        sections: [
          { heading: "Cut-off", body: "Because the pay date falls in December, the November portion is accrued at November 30 and reverses automatically when the December 4 payroll is processed." },
        ],
      },
    ],
    analysis: {
      intro: "This accrual covers the final week of November, which falls in the November period but is paid on December 4:",
      items: [
        "Accrued wages of $521,400 cover November 23 to 30 across the three plants, based on the current payroll registers.",
        "Employer taxes and benefits of $91,400 are accrued at the blended rate from the last completed payroll at each plant.",
        "The accrual reverses automatically when the December 4 payroll is processed, so there is no manual reversal to track.",
      ],
      next: "Controller review and posting.",
      confidence: "High",
      sources: ["Payroll Register, November 2026", "Payroll Calendar"],
    },
  },
  {
    id: "JE-2026-1148",
    title: "Revenue cut-off adjustment, October",
    type: "Revenue",
    entity: "Northline Assembly Inc.",
    status: "Awaiting Approval",
    priority: "High",
    preparedBy: "Lucas Meyer",
    reviewer: "David Osei",
    updated: "2h ago",
    updatedDays: 0,
    period: "October 2026 · Post-close adjustment",
    entryDate: "October 31, 2026",
    amount: 74300,
    source: "Alfie cut-off check",
    lines: [
      { account: "4010", accountName: "Product revenue", entity: "Northline Assembly Inc.", debit: 74300, credit: 0, memo: "Reverse October revenue for assemblies delivered November 2" },
      { account: "2060", accountName: "Deferred revenue", entity: "Northline Assembly Inc.", debit: 0, credit: 74300, memo: "Invoices NA-3317 to NA-3321, delivery completed November 2" },
    ],
    evidence: [
      {
        id: "ev1",
        name: "assembly_invoice_listing_october.pdf",
        label: "Assembly Invoice Listing, October",
        size: "142 KB",
        summary: "Northline Assembly invoices dated October 31, 2026. Five invoices, NA-3317 to NA-3321, total $74,300 and were recorded as October revenue.",
        sections: [
          { heading: "Invoices in question", body: "Invoices NA-3317 to NA-3321 were issued on October 31 for finished assemblies picked up by the carrier the same day. The invoice dates fall in October; the delivery dates do not." },
        ],
      },
      {
        id: "ev2",
        name: "carrier_delivery_log_fortwayne.pdf",
        label: "Carrier Delivery Log, Fort Wayne",
        size: "118 KB",
        summary: "Carrier delivery records for the five invoices. All five deliveries were completed and signed for on November 2, 2026.",
        sections: [
          { heading: "Delivery evidence", body: "Signed delivery receipts for NA-3317 to NA-3321 are all dated November 2. Under the group revenue policy, revenue is recognized on delivery, so the $74,300 belongs in November." },
        ],
      },
    ],
    analysis: {
      intro: "Alfie's cut-off check found five Plant 3 invoices recorded in October where delivery was completed in November:",
      items: [
        "Invoices NA-3317 to NA-3321 total $74,300 and were dated October 31. The carrier delivery records show delivery on November 2.",
        "Under the group revenue policy, revenue is recognized on delivery. This entry defers the $74,300 to November.",
        "The related cost of sales effect is immaterial and will be picked up in the November close.",
      ],
      next: "CFO approval, as a post-close adjustment above the $10,000 threshold, then posting.",
      confidence: "High",
      sources: ["Assembly Invoice Listing, October", "Carrier Delivery Log, Fort Wayne"],
    },
  },
  {
    id: "JE-2026-1146",
    title: "Depreciation run, November",
    type: "Depreciation",
    entity: "Northline Manufacturing Group (consolidated)",
    status: "In Preparation",
    priority: "Medium",
    preparedBy: "Anita Roy",
    reviewer: "Priya Nair",
    updated: "1h ago",
    updatedDays: 0,
    period: "November 2026",
    entryDate: "November 30, 2026",
    amount: 386400,
    source: "Epicor Kinetic fixed assets",
    lines: [
      { account: "6810", accountName: "Depreciation expense", entity: "Northline Precision Inc.", debit: 212600, credit: 0, memo: "Plant 1 machinery and equipment, Guelph" },
      { account: "6810", accountName: "Depreciation expense", entity: "Northline Fabrication Ltée", debit: 98300, credit: 0, memo: "Plant 2 fabrication and welding equipment, Drummondville" },
      { account: "6810", accountName: "Depreciation expense", entity: "Northline Assembly Inc.", debit: 75500, credit: 0, memo: "Plant 3 assembly equipment, Fort Wayne" },
      { account: "1590", accountName: "Accumulated depreciation", entity: "Northline Manufacturing Group (consolidated)", debit: 0, credit: 386400, memo: "November depreciation run per the fixed asset register" },
    ],
    evidence: [
      {
        id: "ev1",
        name: "fixed_asset_register_extract.pdf",
        label: "Fixed Asset Register Extract",
        size: "356 KB",
        summary: "Extract of the group fixed asset register supporting the November depreciation run of $386,400 across the three plants.",
        sections: [
          { heading: "Run composition", body: "Plant 1 accounts for $212,600 of the run, reflecting the machining base in Guelph. Plant 2 accounts for $98,300 and Plant 3 for $75,500." },
          { heading: "Changes this month", body: "The new $3.9M machining centre at Plant 1 is not yet in this run; it enters service in December and depreciation starts with the December run. No disposals or impairments are included." },
        ],
      },
    ],
    analysis: {
      intro: "The November depreciation run from the fixed asset register is drafted and ready to finish:",
      items: [
        "The run totals $386,400 across the three plants. Plant 1 is the largest share at $212,600, reflecting the machining base in Guelph.",
        "The $3.9M machining centre installed at Plant 1 enters service in December, so its depreciation starts next month and is not in this run.",
        "No disposals or impairments are included in this run.",
      ],
      next: "Finish preparation, then Controller review.",
      confidence: "High",
      sources: ["Fixed Asset Register Extract"],
    },
  },
  {
    id: "JE-2026-1144",
    title: "Prepaid insurance allocation, November",
    type: "Prepaid",
    entity: "Northline Precision Inc.",
    status: "Needs Review",
    priority: "Low",
    preparedBy: "Lucas Meyer",
    reviewer: "Priya Nair",
    updated: "3h ago",
    updatedDays: 0,
    period: "November 2026",
    entryDate: "November 30, 2026",
    amount: 28500,
    source: "Epicor Kinetic prepaid schedule",
    lines: [
      { account: "6320", accountName: "Insurance expense", entity: "Northline Precision Inc.", debit: 28500, credit: 0, memo: "November allocation of the annual property, liability and equipment premium" },
      { account: "1450", accountName: "Prepaid expenses", entity: "Northline Precision Inc.", debit: 0, credit: 28500, memo: "Prepaid insurance, policy year to August 2027" },
    ],
    evidence: [
      {
        id: "ev1",
        name: "prepaid_schedule_november_2026.pdf",
        label: "Prepaid Schedule, November 2026",
        size: "98 KB",
        summary: "Prepaid expense schedule for the group insurance program. The annual premium of $342,000 was prepaid in September 2026 and is allocated evenly over the policy year.",
        sections: [
          { heading: "Allocation", body: "The monthly allocation is $28,500. After the November entry, the prepaid balance is $256,500, covering December 2026 to August 2027." },
          { heading: "Agreement to the ledger", body: "The schedule agrees to the prepaid balance in Epicor Kinetic with no variance." },
        ],
      },
    ],
    analysis: {
      intro: "This is the November allocation of the group annual insurance premium, posted from the prepaid schedule:",
      items: [
        "The annual premium of $342,000 was prepaid in September and is allocated evenly over the policy year, $28,500 per month.",
        "The schedule balance after this entry is $256,500, covering December 2026 to August 2027.",
        "The allocation agrees to the prepaid schedule in Epicor Kinetic with no variance.",
      ],
      next: "Controller review and posting.",
      confidence: "High",
      sources: ["Prepaid Schedule, November 2026"],
    },
  },
  {
    id: "JE-2026-1143",
    title: "Warranty provision update, October",
    type: "Accrual",
    entity: "Northline Precision Inc.",
    status: "Approved",
    priority: "Medium",
    preparedBy: "Anita Roy",
    reviewer: "Sarah Mitchell",
    updated: "Yesterday",
    updatedDays: 1,
    period: "October 2026 · Post-close adjustment",
    entryDate: "October 31, 2026",
    amount: 18900,
    source: "Alfie warranty review",
    lines: [
      { account: "6640", accountName: "Warranty expense", entity: "Northline Precision Inc.", debit: 18900, credit: 0, memo: "Warranty provision update on Series 400 shipments, October review" },
      { account: "2240", accountName: "Warranty provision", entity: "Northline Precision Inc.", debit: 0, credit: 18900, memo: "Provision held against drivetrain component warranty claims" },
    ],
    evidence: [
      {
        id: "ev1",
        name: "warranty_claims_summary_october.pdf",
        label: "Warranty Claims Summary, October",
        size: "112 KB",
        summary: "Warranty claims summary for October 2026, supporting the $18,900 update to the Plant 1 warranty provision.",
        sections: [
          { heading: "Basis", body: "The update follows the October claims run rate on Series 400 shipments and brings the provision in line with the group's provisioning policy of claims expected over the remaining warranty term." },
        ],
      },
    ],
    analysis: {
      intro: "This update brings the Plant 1 warranty provision in line with the October claims experience:",
      items: [
        "The provision is calculated on the group's provisioning policy, using the trailing claims rate on Series 400 shipments.",
        "The entry was reviewed and approved by the VP Finance as a post-close adjustment.",
      ],
      next: "Approved. Posts with the next consolidation run.",
      confidence: "High",
      sources: ["Warranty Claims Summary, October"],
    },
  },
  {
    id: "JE-2026-1140",
    title: "Corporate card expense allocation, October",
    type: "Reclassification",
    entity: "Northline Manufacturing Group (consolidated)",
    status: "Posted",
    priority: "Low",
    preparedBy: "Lucas Meyer",
    reviewer: "Priya Nair",
    updated: "9d ago",
    updatedDays: 9,
    period: "October 2026",
    entryDate: "October 31, 2026",
    amount: 33480,
    source: "Epicor Kinetic",
    lines: [
      { account: "6410", accountName: "Travel and entertainment", entity: "Northline Manufacturing Group (consolidated)", debit: 33480, credit: 0, memo: "October corporate card spend allocated by cost centre" },
      { account: "2150", accountName: "Corporate card clearing", entity: "Northline Manufacturing Group (consolidated)", debit: 0, credit: 33480, memo: "Visa corporate card clearing, October statement" },
    ],
    evidence: [
      {
        id: "ev1",
        name: "visa_statement_october.pdf",
        label: "Visa Statement, October",
        size: "154 KB",
        summary: "Visa corporate card statement for October 2026. Total spend of $33,480 was allocated to cost centres and posted in the October close.",
        sections: [
          { heading: "Allocation", body: "Each transaction on the October statement was coded to a cost centre before posting. The clearing account balance for October is nil after this entry." },
        ],
      },
    ],
    analysis: {
      intro: "Posted to Epicor Kinetic on October 31, 2026 as part of the October close:",
      items: ["October corporate card spend of $33,480 was allocated by cost centre from the Visa statement.", "The corporate card clearing account is nil for October after this entry."],
      next: "Posted. No further action.",
      confidence: "High",
      sources: ["Visa Statement, October"],
    },
  },
  {
    id: "JE-2026-1138",
    title: "October revenue recognition",
    type: "Revenue",
    entity: "Northline Manufacturing Group (consolidated)",
    status: "Posted",
    priority: "Low",
    preparedBy: "Epicor Kinetic",
    reviewer: "Priya Nair",
    updated: "10d ago",
    updatedDays: 10,
    period: "October 2026",
    entryDate: "October 31, 2026",
    amount: 14600000,
    source: "Epicor Kinetic billing",
    lines: [
      { account: "1210", accountName: "Accounts receivable", entity: "Northline Manufacturing Group (consolidated)", debit: 14600000, credit: 0, memo: "October invoicing per Epicor Kinetic billing" },
      { account: "4010", accountName: "Product revenue", entity: "Northline Manufacturing Group (consolidated)", debit: 0, credit: 14600000, memo: "October revenue recognized on delivery" },
    ],
    evidence: [
      {
        id: "ev1",
        name: "october_revenue_summary.pdf",
        label: "October Revenue Summary",
        size: "136 KB",
        summary: "Consolidated revenue summary for October 2026. Revenue of $14.6M was recognized across the three plants and posted as the October summary entry.",
        sections: [
          { heading: "Composition", body: "The $14.6M October total is the consolidated sum of delivered invoicing for Plant 1, Plant 2 and Plant 3, recognized on delivery under the group revenue policy." },
        ],
      },
    ],
    analysis: {
      intro: "Posted to Epicor Kinetic on October 31, 2026 as part of the October close:",
      items: ["October revenue of $14.6M was recognized on delivery across the three plants.", "This is the summary posting from Epicor Kinetic billing; invoice-level detail sits in Receivables."],
      next: "Posted. No further action.",
      confidence: "High",
      sources: ["October Revenue Summary"],
    },
  },
  {
    id: "JE-2026-1135",
    title: "Inventory obsolescence provision",
    type: "Accrual",
    entity: "Northline Fabrication Ltée",
    status: "Posted",
    priority: "Low",
    preparedBy: "Lucas Meyer",
    reviewer: "Priya Nair",
    updated: "10d ago",
    updatedDays: 10,
    period: "October 2026",
    entryDate: "October 31, 2026",
    amount: 42600,
    source: "Epicor Kinetic",
    lines: [
      { account: "6580", accountName: "Inventory write-down", entity: "Northline Fabrication Ltée", debit: 42600, credit: 0, memo: "Provision against slow-moving fabricated stock, October review" },
      { account: "1480", accountName: "Inventory obsolescence provision", entity: "Northline Fabrication Ltée", debit: 0, credit: 42600, memo: "Provision balance after the October review" },
    ],
    evidence: [
      {
        id: "ev1",
        name: "slow_moving_inventory_report_plant2.pdf",
        label: "Slow-Moving Inventory Report, Plant 2",
        size: "168 KB",
        summary: "Drummondville slow-moving inventory report at October 31, 2026, supporting the $42,600 obsolescence provision.",
        sections: [
          { heading: "Basis", body: "The provision covers fabricated stock lines with no movement in over 180 days, valued under the group's provisioning policy." },
        ],
      },
    ],
    analysis: {
      intro: "Posted to Epicor Kinetic on October 31, 2026 as part of the October close:",
      items: ["The $42,600 provision covers Plant 2 stock lines with no movement in over 180 days."],
      next: "Posted. No further action.",
      confidence: "High",
      sources: ["Slow-Moving Inventory Report, Plant 2"],
    },
  },
  {
    id: "JE-2026-1132",
    title: "Intercompany management fee, October",
    type: "Intercompany",
    entity: "Northline Precision Inc.",
    status: "Posted",
    priority: "Low",
    preparedBy: "Lucas Meyer",
    reviewer: "Priya Nair",
    updated: "11d ago",
    updatedDays: 11,
    period: "October 2026",
    entryDate: "October 31, 2026",
    amount: 96000,
    source: "Epicor Kinetic",
    lines: [
      { account: "2140", accountName: "Intercompany receivable, Northline Assembly Inc.", entity: "Northline Precision Inc.", debit: 96000, credit: 0, memo: "October management fee charged to Plant 3" },
      { account: "4250", accountName: "Management fee income", entity: "Northline Precision Inc.", debit: 0, credit: 96000, memo: "Monthly management fee per the intercompany services agreement" },
    ],
    evidence: [
      {
        id: "ev1",
        name: "intercompany_services_agreement_extract.pdf",
        label: "Intercompany Services Agreement Extract",
        size: "196 KB",
        summary: "Extract of the intercompany services agreement. Head office at Plant 1 provides management, finance and IT services to the other plants for a combined monthly fee of $96,000.",
        sections: [
          { heading: "Fee basis", body: "The monthly fee of $96,000 is fixed under the agreement and is eliminated on consolidation with the matching expense in the receiving plants." },
        ],
      },
    ],
    analysis: {
      intro: "Posted to Epicor Kinetic on October 31, 2026 as part of the October close:",
      items: ["The October management fee of $96,000 was charged under the intercompany services agreement.", "The fee eliminates on consolidation against the matching expense in the receiving plants."],
      next: "Posted. No further action.",
      confidence: "High",
      sources: ["Intercompany Services Agreement Extract"],
    },
  },
];

// Route content for the Accounting pages (register and entry workspace).
// World-specific narrative lives here so the routes stay world-agnostic.

export const flagshipEntryId = "JE-2026-1142";

export const flagshipKeywords: readonly string[] = ["variance", "difference"];

export const flagshipPrompt = "Explain the standard cost variance.";

export const accountingMetrics: readonly (readonly [string, string, string, boolean])[] = [["Open Entries", "6", "November and post-close", true], ["Needs Review", "3", "+1 today", true], ["Awaiting Approval", "1", "With the CFO", true], ["Post-Close Adjustments", "3", "October period", true], ["Posted in October", "4", "In this register", false]];

export const accountingExamples: readonly string[] = ["Show me the entries that need my attention today.", "Explain the standard cost variance.", "Which entries are waiting on approval?", "Show me the open post-close adjustments."];

export const accountingAnswers: AccountingAnswers = {
  flagship: {
    intro: "The standard cost variance sits in JE-2026-1142, the October post-close adjustment Alfie prepared.",
    note: "Steel averaged $1,186 per tonne against a $1,040 standard, and Line 3 scrap rose from 2.1 percent to 3.4 percent after the August tooling change. Alfie traced the carrying effect to $318,000 of understated COGS and overstated inventory. Sources: Series 400 variance report, steel price history for 2026.",
  },
  approval: {
    intro: "2 entries are in the approval path.",
    note: "JE-2026-1148 ($74,300) is with the CFO. JE-2026-1142 ($318,000) needs CFO approval after Controller review because it is a post-close adjustment above the $10,000 threshold.",
  },
  postClose: {
    intro: "3 October post-close adjustments are still open.",
    note: "October closed in 7 days against the 8 day target. Post-close adjustments above $10,000 need Controller review and CFO approval before they post.",
  },
  attention: {
    intro: "You have 3 entries that need your attention today, based on status, priority, and the close calendar.",
    note: "JE-2026-1142 is the open item blocking the October cost close out, and the January standard revision depends on it. Sources: journal register, close checklist.",
  },
};

export const newEntryDefaults = { preparedBy: "Sarah Mitchell", reviewer: "Priya Nair", firstNumber: 1151 };

export const erpName = "Epicor Kinetic";

export const entryPrompts: readonly string[] = ["Analyze this entry.", "What requires my attention?", "Explain the standard cost variance.", "Walk me through the entry lines.", "Check this entry against policy.", "What information is missing?", "Prepare a summary for the CFO."];

export const entryWorkflow: readonly string[] = ["Prepared", "Evidence Attached", "Alfie Analysis", "Controller Review", "CFO Approval", "Posted to Epicor Kinetic", "Closed"];

export const flagshipIssue = "October COGS and inventory stay misstated until this entry posts.";

export const flagshipRouteNext = "Route to David Osei (CFO) after Controller review.";

export const flagshipMissingItems: string[] = ["Controller review has not yet been recorded (Priya Nair).", "CFO approval is outstanding (David Osei), required above the $10,000 post-close threshold."];

export const flagshipReviewBar = {
  title: "Standard cost variance of $318,000 needs a true-up decision",
  detail: "Alfie traced the October variance on the Series 400 gear housing family to steel priced above standard and Line 3 scrap running above the standard factor, and prepared this entry. As a post-close adjustment above the $10,000 threshold, it also needs CFO approval after Controller review.",
};

export const getEntry = (id: string) => entries.find((entry) => entry.id === id);
export const money = (value: number) => `${value < 0 ? "-" : ""}$${Math.abs(value).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export const seedAudit: AuditEvent[] = [
  { time: "Nov 14, 10:02", actor: "Alfie", actorType: "Alfie", action: "Entry routed for review", source: "Accounting workflow", result: "With Priya Nair (Controller)" },
  { time: "Nov 14, 10:01", actor: "Alfie", actorType: "Alfie", action: "Prepared JE-2026-1142", source: "Variance workpaper", result: "$318,000 standard cost true-up drafted" },
  { time: "Nov 14, 09:58", actor: "Alfie", actorType: "Alfie", action: "Decomposed the Series 400 variance", source: "Steel Price History, 2026", result: "Price, usage and labour components identified" },
  { time: "Nov 14, 09:55", actor: "Alfie", actorType: "Alfie", action: "Reviewed October standard cost results", source: "Epicor Kinetic cost module", result: "Material variance of $212,000 flagged" },
  { time: "Nov 1, 08:10", actor: "System", actorType: "System", action: "Plant 1 books closed for October", source: "Epicor Kinetic", result: "Standards left unchanged for the October run" },
  { time: "Oct 31, 17:40", actor: "Anita Roy", actorType: "User", action: "Submitted Plant 1 cost roll", source: "Epicor Kinetic cost module", result: "Series 400 costed at January standards" },
  { time: "Jan 12, 09:00", actor: "System", actorType: "System", action: "2026 standards set", source: "Epicor Kinetic cost module", result: "Steel standard set at $1,040 per tonne" },
];
