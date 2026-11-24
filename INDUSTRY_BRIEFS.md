# Industry pack briefs: Manufacturing and Mining workspaces

The Enterprise Finance app becomes one app with switchable workspaces. The
existing Meridian world is the "enterprise" workspace. This file is the
canonical contract for the two new industry worlds. Figures here are the
only source; never invent parallel numbers.

## How the worlds are wired (do not change this architecture)

- Enterprise data files live in `src/lib/worlds/enterprise/` (moved, content
  unchanged). Manufacturing files go in `src/lib/worlds/manufacturing/`,
  mining files in `src/lib/worlds/mining/`, same filenames as enterprise.
- `src/lib/<name>-data.ts` is a thin shim that re-exports the active
  workspace's file, selected by `src/lib/workspace.ts` (localStorage key
  `alfie.workspace.v1`, default `enterprise`). Routes and components never
  import world files directly.
- Every world file must export EXACTLY the same value names as its
  enterprise counterpart, with the same shapes. Import types from the
  enterprise file (for example
  `import type { CloseTask } from "@/lib/worlds/enterprise/close-data";`)
  instead of redefining them. Helper functions (money, fmt, getEntry,
  getBill, getCustomer, the seed audit builders, approverFor and so on)
  must exist with the same signatures, operating on the new world's data.
- Rules from AGENTS.md apply: frontend only, sample data labelled as such
  where the enterprise app does, NO em dashes in any user-facing string,
  canonical figures only.
- Sample "today" is mid November 2026 in all three worlds. October 2026 is
  closed. The November close is open. Post-close adjustments above $10,000
  need Controller review and CFO approval in all three worlds.

## Manufacturing workspace: Northline Manufacturing Group Inc.

- Consolidated reporting in CAD. HQ Guelph, Ontario.
- Entities: Northline Precision Inc. (Guelph, ON, Plant 1, precision
  drivetrain components, CAD); Northline Fabrication Ltée (Drummondville,
  QC, Plant 2, fabrication and welding, CAD); Northline Assembly Inc.
  (Fort Wayne, Indiana, Plant 3, final assembly, USD).
- Signed-in user: Sarah Mitchell, VP Finance, Organization Administrator.
- Team: David Osei (Chief Financial Officer), Priya Nair (Controller),
  Lucas Meyer (Manager, Cost Accounting), Anita Roy (Plant Controller,
  Guelph), Kevin Doyle (AP Manager), Julia Santos (FP&A Manager),
  Mark Feldman (Treasurer, also billing contact).
- October close: closed in 7 days against an 8 day target. November close:
  15 of 58 tasks complete.

### Canonical figures

- Cash: $9.6M CAD equivalent across 5 bank accounts.
- October revenue $14.6M. YTD revenue $139.2M against a $142.8M budget
  (-2.5%). Gross margin 26.8% against a 29.0% budget. EBITDA YTD $13.2M,
  margin 9.5%.
- Inventory $31.6M: raw materials $11.4M, work in progress $6.9M, finished
  goods $13.3M. Inventory turns 4.1x.
- DSO 43 days, DPO 37 days. AP due this week $1.87M. AR over 60 days $688K.
- Term loan $18.5M. Equipment loans $6.4M. Covenant: fixed charge coverage
  1.32x against a 1.20x minimum.
- Capex YTD $8.3M, including a $3.9M machining centre for Plant 1.
- Steel: hot-rolled coil standard set January 2026 at $1,040 per tonne;
  actual average since July $1,186 per tonne (+14%).

### Flagship item (the intercompany mismatch of this world)

Standard cost variance on the Series 400 gear housing family, Plant 1's
largest product line. October material variance was $212,000 unfavourable.
Alfie traced it: steel price (standard $1,040 against $1,186 actual),
usage (scrap on Line 3 rose from 2.1% to 3.4% after the August tooling
change), and a smaller labour rate piece. Because standards are stale,
October cost of goods sold is understated and inventory overstated by
$318,000, and reported margin on the two largest customers (AgriCore
Equipment and Prairie Implement) is overstated by about 2.3 points. Alfie
prepared JE-2026-1142 to true up inventory and COGS by $318,000 and
drafted the January standard revision (steel standard to $1,175 per
tonne, scrap factor to 3.0%). It needs Controller review and CFO approval
(above the $10,000 post-close threshold).

### Module notes

- Accounting: JE-2026-1142 flagship (full workspace), plus JE-2026-1144
  prepaid insurance allocation $28,500, JE-2026-1146 depreciation run
  $386,400, JE-2026-1148 revenue cut-off adjustment $74,300, JE-2026-1150
  payroll accrual $612,800.
- Payables: flagship BILL-3307, Lakefront Steel Inc., $214,600, billed at
  $1,212 per tonne against a PO price of $1,186 (price variance); above
  $50,000 so it needs VP Finance approval. Alfie held duplicate BILL-3311
  (invoice STL-2291, $18,940, Northgate Industrial Supply) because it
  duplicates BILL-3298. Approval thresholds mirror Meridian: $10K AP
  Manager, $50K Controller, above that VP Finance.
- Receivables: flagship customer AgriCore Equipment Ltd., $486,000 open,
  largest invoice 58 days old. Alfie recommends a credit hold for Prairie
  Implement Co. ($142,500 open against a $100,000 limit).
- Close: November checklist in groups (Subledgers, Reconciliations,
  Accruals and estimates, Consolidation, Reporting), plant close status,
  the open post-close adjustment JE-2026-1142.
- Reconciliations: 21 accounts, 94.8% auto-matched. Exceptions led by a
  goods received not invoiced (GRNI) clearing difference of $47,300 and a
  lagging Plant 2 payroll feed.
- Treasury: 5 bank accounts, 13 week cash forecast with a low point of
  $6.9M in week 8 (machining centre instalment), term and equipment loan
  schedules, covenant headroom, USD exposure from Plant 3 and US sales.
- Planning: budget versus actual YTD with a margin bridge (steel cost the
  biggest driver), Q4 forecast review FR-2026-021 prepared by Julia Santos
  (a 1.6% forecast cut that exceeds her 1.5% authority, at approval
  stage), FY2027 budget revenue $152.0M, downside scenario (steel +8%
  further, USD/CAD 1.43, agricultural demand -5%).
- Reports: KPI set is Revenue, Gross margin, EBITDA, Operating cash flow,
  Inventory turns, DSO, DPO, Close time. Library: November board pack,
  lender compliance package, plant financial statements, audit PBC list.
- Data sources: Epicor Kinetic (primary ERP, Connected), TD Bank feed
  (Connected), Chase Bank feed (Connected), Plex MES feed (Needs
  attention, Plant 2 sync stale 2 days), Sage 300 at Plant 3 (legacy,
  Authentication expired), spreadsheet uploads.
- Migration: Plant 3 moving from Sage 300 to Epicor Kinetic, cutover
  February 12, 2027. Onboarding: Plant 3 onboarding to the group
  workspace, go-live February 2027.
- Billing: platform fee $2,800 per month, seats $11,436 per month, Visa
  ending 6190, billing contact Mark Feldman.

## Mining workspace: Aurora Ridge Resources Inc.

- Consolidated reporting in CAD. HQ Toronto. Gold producer.
- Entities: Aurora Ridge Mining Corp. (Keno Ridge Mine, Timmins, ON,
  gold, CAD); Aurora Ridge USA Inc. (Sagebrush Mine, Elko, Nevada,
  gold and silver, USD); Copperline Metals JV (British Columbia,
  development project; Aurora holds a 40% non-operated interest, Kestrel
  Resources is the operator with 60%).
- Signed-in user: Claire Dubois, VP Finance, Organization Administrator.
- Team: Robert Hale (Chief Financial Officer), Nadia Hassan (Controller),
  Peter Lindqvist (Mine Controller, Keno Ridge), Susan Park (AP Lead),
  Angela Ruiz (Treasurer, also billing contact), George Mensah (Director,
  Planning and Analysis).
- October close: closed in 9 days against a 10 day target. November
  close: 12 of 71 tasks complete.

### Canonical figures

- Cash: $58.6M CAD equivalent across 7 bank accounts.
- October revenue $41.5M. YTD revenue $389.4M against a $352.6M budget
  (+10.4%, price driven). Gross margin 44.6%. EBITDA YTD $172.8M, margin
  44.4%.
- Production YTD 71,380 oz of gold. Realized price US$4,072 per oz. All-in
  sustaining cost US$1,588 per oz against a US$1,540 budget.
- DSO 14 days (refinery settlement terms), DPO 41 days. AP due this week
  $3.46M. AR over 60 days $196K (one refinery assay dispute).
- Project facility for Copperline $150.0M, drawn $63.4M. Revolving credit
  facility $75.0M, undrawn. Covenant: total debt to EBITDA 0.4x against a
  2.5x maximum.
- Capex YTD $97.2M: sustaining $38.6M, growth $58.6M (Copperline $51.2M
  of the growth total).
- Asset retirement obligation (reclamation) provision $88.7M.
- Hedging: 18,000 oz sold forward for Q1 2027 at US$3,940 per oz under a
  board approved program.
- Royalties: Keno Ridge carries a 2.0% net smelter return royalty held by
  Cobalt Royalties Inc. Sagebrush carries a 3.0% net smelter return
  royalty plus the Nevada Net Proceeds of Minerals tax at 5%.

### Flagship item (the intercompany mismatch of this world)

Copperline JV operator statement mismatch of $253,500. Kestrel Resources'
October statement shows Aurora Ridge's 40% share of joint venture costs
at $4,218,000; Aurora accrued $3,964,500. Alfie traced the gap: the camp
and catering line was billed at 100% of cost on one invoice instead of
Aurora's 40% share, overstating the share by $186,000, and an October
diesel accrual of $67,500 at the project is missing. Alfie prepared
JE-2026-0874 to correct the accrual and drafted a query letter to Kestrel.
It needs Controller review and CFO approval (above the $10,000 post-close
threshold).

### Module notes

- Accounting: JE-2026-0874 flagship (full workspace), plus JE-2026-0876
  mobile fleet depreciation $1,240,000, JE-2026-0878 asset retirement
  obligation accretion $412,000, JE-2026-0880 stockpile survey adjustment
  $286,000, JE-2026-0882 payroll accrual $892,000.
- Payables: flagship BILL-5108, Summit Drilling Ltd., $386,200, billed
  4,120 metres drilled against 3,940 metres verified by survey (quantity
  variance, $17,900 held); above $50,000 so it needs VP Finance approval.
  Alfie held a duplicate explosives bill from Dyno Nobel style vendor
  "Northern Explosives Ltd." Approval thresholds mirror Meridian.
- Receivables: customers are refiners and buyers. Flagship Cascade
  Refining Corp., $2,840,000 open (gold shipment settlements), one lot of
  $196,000 over 60 days under an assay dispute. Alfie recommends a
  shipment hold for Desert Sage Trading ($412,000 open against a $250,000
  limit).
- Close: November checklist in the same five groups, site close status
  (Keno Ridge, Sagebrush, Corporate, Copperline JV), the open post-close
  adjustment JE-2026-0874.
- Reconciliations: 29 accounts, 95.1% auto-matched. Exceptions led by a
  stockpile inventory difference of $94,600 awaiting the November survey
  and a lagging fuel card feed at Sagebrush.
- Treasury: 7 bank accounts, 13 week cash forecast with a low point of
  $44.2M in week 10 (Copperline cash call plus debt service), project
  facility drawdown schedule, hedge book summary, USD exposure.
- Planning: budget versus actual YTD (price driven beat, cost pressure at
  Sagebrush), forecast review FR-2026-008 prepared by George Mensah
  raising full year production guidance from 84,000 to 86,500 oz (a 3.0%
  change against his 2.0% authority, at approval stage), FY2027 budget
  revenue $428.0M, downside scenario (gold US$3,400 per oz, diesel +15%,
  USD/CAD 1.43).
- Reports: KPI set is Revenue, Gross margin, EBITDA, Operating cash flow,
  All-in sustaining cost, Production ounces, DSO, Close time. Library:
  November board pack, lender compliance package, site financial
  statements, Q3 technical report cost schedules, audit PBC list.
- Data sources: SAP S/4HANA (primary GL, Connected), RBC Royal Bank feed
  (Connected), Wells Fargo feed (Connected), ADP payroll (Needs
  attention, sync stale 4 days), Sage 300 at Sagebrush (legacy,
  Authentication expired), spreadsheet uploads (site cost reports).
- Migration: Sagebrush moving from Sage 300 to SAP S/4HANA, cutover
  March 8, 2027. Onboarding: Copperline JV reporting onboarding, go-live
  January 2027.
- Billing: platform fee $3,500 per month, seats $12,864 per month,
  American Express ending 3005, billing contact Angela Ruiz.

## Industry modules (built after the core worlds)

- Manufacturing adds Costing (/costing) and Inventory (/inventory) to the
  Work nav group. Costing: standard cost table by product family, the
  variance bridge (price, usage, labour, overhead), the Series 400
  flagship analysis, the draft January standard revision. Inventory:
  balances by plant and category against the canonical $31.6M, turns,
  slow moving and obsolescence list with a proposed reserve.
- Mining adds Capital Projects (/projects) and Royalties (/royalties).
  Capital Projects: Copperline build ($128.0M approved budget, $51.2M
  spent YTD, forecast at completion $131.5M), Keno Ridge tailings raise
  ($18.4M budget), Sagebrush underground development ($22.6M budget),
  budget versus actual versus forecast at completion, the JV statement
  tie-in. Royalties: the Keno Ridge 2.0% NSR and Sagebrush 3.0% NSR
  calculations on October production, amounts accrued and paid, the
  Nevada Net Proceeds tax accrual.
- In workspaces where a module does not apply, its data file exports the
  same names with empty collections and the route renders a short
  pack-not-included panel. The nav only links industry modules in the
  workspace that owns them.
