/**
 * Migration console data: the projects moving Meridian's entity data
 * from its previous systems onto the group NetSuite ledger and Alfie,
 * the phases each project moves through, and the reconciliation
 * evidence behind them. Sample records, frontend only: batch execution
 * and connectors are backend work reserved for the engineering team.
 */

export type PhaseState = "Complete" | "In progress" | "Pending";

export type MigrationPhase = { name: string; detail: string; state: PhaseState };

export type MigrationObject = {
  object: string;
  total: number;
  moved: number;
  exceptions: number;
};

export type MigrationProject = {
  id: string;
  name: string;
  sourceSystem: string;
  scope: string;
  status: string;
  owner: string;
  started: string;
  targetCutover: string;
  phases: MigrationPhase[];
  objects: MigrationObject[];
  validation: string[];
};

const phaseNames = ["Assess", "Map", "Trial load", "Validate", "Cutover", "Hypercare"];
const phases = (states: PhaseState[], details: string[]): MigrationPhase[] =>
  phaseNames.map((name, i) => ({
    name,
    detail: details[i] ?? "",
    state: states[i] ?? "Pending",
  }));

export const migrationProjects: MigrationProject[] = [
  {
    id: "MIG-01",
    name: "Meridian Retail: QuickBooks to NetSuite",
    sourceSystem: "QuickBooks Online (Meridian Retail legacy)",
    scope: "Retail entity general ledger, chart of accounts, AP and AR into the group NetSuite ledger",
    status: "Trial load",
    owner: "Meridian finance systems team",
    started: "Oct 20, 2026",
    targetCutover: "Dec 12, 2026",
    phases: phases(
      ["Complete", "Complete", "In progress", "Pending", "Pending", "Pending"],
      [
        "Inventory complete: 214 chart of accounts lines, 3 fiscal years of transactions and 1,180 open AP and AR items.",
        "205 of 214 accounts mapped (96%). The 9 unmapped accounts are legacy retail accounts with no activity since 2024, under review with the Retail team.",
        "Trial load of the October trial balance is in the NetSuite sandbox. Validation is under way with the Retail accounting team.",
        "Full validation follows a clean trial reconciliation. The migration does not proceed on an unresolved money difference.",
        "Final delta load and switch of the Retail ledgers, planned for the Dec 12 window, after the November close.",
        "30-day watch with daily reconciliation after cutover. QuickBooks stays read-only as the fallback.",
      ],
    ),
    objects: [
      { object: "Chart of accounts lines", total: 214, moved: 205, exceptions: 9 },
      { object: "Trial balance accounts (October)", total: 168, moved: 168, exceptions: 3 },
      { object: "Open AP and AR items", total: 1180, moved: 0, exceptions: 0 },
    ],
    validation: [
      "Trial balance differs by $1,240 across 3 accounts. Under review with the Retail accounting team before the full load proceeds.",
      "205 of 214 chart of accounts lines are mapped (96%); nothing unmapped is dropped quietly, and each retired account is documented.",
      "Every migrated account keeps its QuickBooks account number as a searchable reference in NetSuite.",
    ],
  },
  {
    id: "MIG-02",
    name: "Historical AP archive",
    sourceSystem: "Legacy AP spreadsheet archive and scanned invoices",
    scope: "Vendor bills and payment records from 2019 to 2023, for all three entities",
    status: "Complete",
    owner: "Meridian finance systems team",
    started: "Aug 11, 2026",
    targetCutover: "Completed Oct 6, 2026",
    phases: phases(
      ["Complete", "Complete", "Complete", "Complete", "Complete", "Complete"],
      [
        "Inventory complete: 48,210 vendor bills and 47,866 payment records across the three entities.",
        "Vendor and account mapping signed off by the AP Manager; duplicate vendor records merged by agreement, never silently.",
        "Trial load of 5,000 bills reconciled on counts and payment totals.",
        "Full load validated; the 64 extraction exceptions were reprocessed and cleared.",
        "Archive switched to Alfie on Oct 6, 2026. The spreadsheet archive is read-only.",
        "Hypercare closed Nov 5, 2026 with zero open exceptions.",
      ],
    ),
    objects: [
      { object: "Vendor bills", total: 48210, moved: 48210, exceptions: 0 },
      { object: "Payment records", total: 47866, moved: 47866, exceptions: 0 },
    ],
    validation: [
      "Bill counts and payment totals match the source archive for every year, 2019 to 2023.",
      "Duplicate vendor records were merged only where the AP Manager confirmed the match in writing.",
      "Full text index rebuilt, so archived bills are searchable and previewable in place.",
    ],
  },
  {
    id: "MIG-03",
    name: "Meridian Logistics payroll history",
    sourceSystem: "ADP payroll (Logistics, USD)",
    scope: "Payroll history from 2022 to 2026 for the Columbus entity: registers, tax filings and GL posting summaries",
    status: "Assess",
    owner: "Meridian finance systems team",
    started: "Nov 10, 2026",
    targetCutover: "Mar 2027, to be confirmed",
    phases: phases(
      ["In progress", "Pending", "Pending", "Pending", "Pending", "Pending"],
      [
        "Inventory under way: 5 years of payroll registers, tax filings and GL posting summaries.",
        "Field mapping follows the assessment. Payroll fields are mapped at summary level; employee level detail stays in ADP.",
        "Trial load of one quarter follows a signed-off mapping.",
        "Validation by the Controller, who owns payroll accounting for the group.",
        "Cutover window to be agreed once the assessment sizes the history.",
        "30-day watch with daily reconciliation after cutover.",
      ],
    ),
    objects: [
      { object: "Payroll registers", total: 260, moved: 0, exceptions: 0 },
      { object: "Employee records (summary)", total: 412, moved: 0, exceptions: 0 },
    ],
    validation: [
      "Assessment only: no records have moved yet.",
      "Payroll data is classified Highly Restricted. Migration access is limited to the Controller and the migration team, and every access is logged.",
    ],
  },
];

export const migrationProcess: { step: string; detail: string }[] = [
  {
    step: "Assess",
    detail: "Inventory the source system: record counts, date ranges, document volumes and known data quality issues. Nothing moves yet.",
  },
  {
    step: "Map",
    detail: "Agree the field by field mapping into the group ledger with the business owner of each record type. Retired fields are documented, never dropped quietly.",
  },
  {
    step: "Trial load",
    detail: "Load a representative batch and reconcile counts and money totals against the source before any full load is approved.",
  },
  {
    step: "Validate",
    detail: "Business teams review exceptions in Alfie. A migration does not proceed on unresolved money differences, however small.",
  },
  {
    step: "Cutover",
    detail: "Final delta load in an agreed window, then the workload switches: queues, documents and Alfie context all read from the new ledger.",
  },
  {
    step: "Hypercare",
    detail: "30 days of daily reconciliation. The source stays read-only and available as a fallback for the full window.",
  },
];

export const migrationGuardrails: string[] = [
  "The source system is never written to or deleted from during a migration. It stays read-only until hypercare closes.",
  "Every batch reconciles on counts and money totals before the next batch starts.",
  "Exceptions are reviewed by the business owner of the record, not by the migration team alone.",
  "Migrated records keep their legacy identifiers, so anything referenced in email or paper files can still be found.",
];
