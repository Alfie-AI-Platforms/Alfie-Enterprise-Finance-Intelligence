# Build brief: Alfie Enterprise Finance Intelligence (v1)

This repo is the CFO workspace product in the Alfie Platform family. It is a
sibling of Alfie Insurance Intelligence and uses the SAME UI, shell, design
system and patterns. The full insurance source is kept as a read-only
reference at `~/workspace/.reference/alfie-insurance-src/` (routes in
`routes/`, data in `lib/`, components in `components/`). Model every new
module on its insurance counterpart listed below, swapping the domain.

Read `AGENTS.md` in this repo first and follow it: frontend only, local
state and sample data, no em dashes in user-facing copy, semantic tokens
only, nothing below 12px, module pages use `mx-auto max-w-7xl px-5 pb-12
pt-8 lg:px-10`, file workspaces use a centre canvas with `ReviewBar` and a
360px right Alfie rail, previews through the shared `DocumentSheet`
(`src/components/document-view.tsx`), preview dialogs never have a footer
Close button.

## Sample company and people (use exactly, everywhere)

- Customer: **Meridian Group Inc.**, consolidated reporting in CAD.
- Entities: Meridian Manufacturing Inc. (Toronto, CAD), Meridian Logistics
  LLC (Columbus, Ohio, USD), Meridian Retail Group Inc. (Vancouver, CAD).
- Signed-in user: **Elena Brooks**, VP Finance, Organization Administrator.
- Team: James Whitfield (Chief Financial Officer), Marcus Webb (Controller),
  Daniel Okafor (Senior Accountant), Rachel Kim (AP Manager), Tom Alvarez
  (Treasurer), Grace Liu (FP&A Director).
- Today in the sample world: mid November 2026. October 2026 is closed
  (closed in 6 days against an 8 day target). The November close is open
  with early tasks underway.

## Shared figures (never invent parallel numbers)

- Cash: $18.4M CAD equivalent across 6 bank accounts.
- October revenue $9.8M. YTD revenue (Jan to Oct) $102.6M against a $99.4M
  budget (+3.2%). Gross margin 41.2%. EBITDA $12.9M YTD, margin 12.6%.
- DSO 38 days, DPO 44 days. AP due this week $1.26M. AR over 60 days $842K.
- November close: 18 of 64 tasks complete (early tasks; subledger cutoffs
  start Nov 28). One post-close adjustment from October is still open.
- Term loan $12.0M. Leverage covenant 2.1x against a 3.0x maximum.
- Flagship item (the CL-45821 of this product): intercompany mismatch of
  $18,400. Manufacturing carries an intercompany receivable of $412,600;
  Logistics carries the payable at $394,200 after conversion. Alfie traced
  the gap to a missing October 31 FX revaluation on the USD balance and
  prepared journal entry JE-2026-1087 to correct it. It needs Controller
  review and CFO approval because it is above the $10,000 post-close
  adjustment threshold.

## Modules and their insurance models

- Accounting (`src/lib/accounting-data.ts`, routes `accounting.tsx`,
  `accounting.index.tsx`, `accounting.$entryId.tsx`) models on Claims.
  Journal entry queue plus an entry file workspace. Entries: JE-2026-1087
  (flagship, full workspace), JE-2026-1091 prepaid allocation $36,000,
  JE-2026-1093 depreciation run $212,480, JE-2026-1095 revenue cut-off
  adjustment $58,900, JE-2026-1098 payroll accrual $486,200.
- Payables (data `payables-data.ts`, routes `payables.tsx`,
  `payables.index.tsx`, `payables.$billId.tsx`) models on Underwriting.
  Vendor bill queue plus a bill workspace (invoice document, three-way PO
  match, approval policy). Flagship: BILL-2214, Great Lakes Steel Co.,
  $86,400, quantity variance on one line; above $50,000 so it needs VP
  Finance approval. Alfie held duplicate BILL-2219 (invoice INV-88312,
  $12,750, Northgate Office Supply) because it duplicates BILL-2207.
- Receivables (data `receivables-data.ts`, routes `receivables.tsx`,
  `receivables.index.tsx`, `receivables.$customerId.tsx`) models on Policy.
  Customer accounts plus a customer workspace (open invoices, aging,
  payment history, Alfie collection draft). Flagship customer: Northern
  Build Supplies, $214,300 open, largest invoice 62 days old. Alfie
  recommends a credit hold for Summit Retail Co.
- Close (`close-data.ts`, `close.tsx`) models on the insurance
  `finance.close.tsx`. November close checklist in groups (Subledgers,
  Reconciliations, Accruals and estimates, Consolidation, Reporting),
  entity close status, the open post-close adjustment JE-2026-1087.
- Reconciliations (`reconciliations-data.ts`, `reconciliations.tsx`) is a
  new single page in the module style: 24 accounts, 96.4% auto-matched,
  exceptions queue led by the payroll clearing difference of $3,215 and a
  lagging Amex corporate card feed.
- Treasury (`treasury-data.ts`, `treasury.tsx`) models on the insurance
  `finance.cash-flow.tsx`: the 6 bank accounts and balances, a 13 week
  cash forecast (lowest point $11.2M in week 9), term loan and covenant
  headroom, USD exposure.
- Planning (`planning-data.ts`, routes `planning.tsx`,
  `planning.index.tsx`, `planning.analysis.tsx`, `planning.scenarios.tsx`,
  `planning.reviews.tsx`, `planning.reports.tsx`) models on Pricing.
  Budget versus actual YTD, Q4 forecast review FR-2026-011 at approval
  stage (prepared by Grace Liu), FY2027 budget revenue $128.0M, downside
  scenario (steel prices +8%, USD/CAD 1.42).
- Reports (`reports-data.ts`, `reports.tsx`) models on the insurance
  Reports: KPI set is Revenue, Gross margin, EBITDA, Operating cash flow,
  DSO, DPO, Cash conversion cycle, Close time. Library: November board
  pack, lender compliance package, audit PBC list, entity financials.

## Data sources (shared story, used by several modules)

NetSuite (primary GL, Connected), TD Bank feed (Connected), Chase Bank
feed (Connected), Salesforce (Connected), Concur expenses (Needs
attention, sync stale 3 days), QuickBooks for Meridian Retail (legacy,
Authentication expired), plus spreadsheet uploads.

## Rules for every file

- All figures above are canonical. If a number is not in this brief, derive
  it from these or keep it qualitative.
- Sample data is labelled illustrative in the UI where the insurance app
  did the same.
- Do not edit `src/components/app-shell.tsx`, `src/routes/index.tsx`,
  `src/routeTree.gen.ts`, or another module's files. The shell and home
  are handled centrally.
- Links between modules use the routes listed above only.
- When done, your files must typecheck against the shared components in
  `src/components/` (alfie-ui, document-view, alfie-composer, ui).
