import type {
  MigrationObject,
  MigrationPhase,
  MigrationProject,
  PhaseState,
} from "@/lib/worlds/enterprise/migration-data";

export type { MigrationObject, MigrationPhase, MigrationProject, PhaseState };

/**
 * Migration console data: the projects moving Northline's plant data
 * from its previous systems onto the group Epicor Kinetic ledger and
 * Alfie, the phases each project moves through, and the reconciliation
 * evidence behind them. Sample records, frontend only: batch execution
 * and connectors are backend work reserved for the engineering team.
 */

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
    name: "Northline Assembly (Plant 3): Sage 300 to Epicor Kinetic",
    sourceSystem: "Sage 300 (Plant 3 legacy)",
    scope: "Plant 3 general ledger, chart of accounts, AP and AR into the group Epicor Kinetic ledger",
    status: "Trial load",
    owner: "Northline finance systems team",
    started: "Oct 20, 2026",
    targetCutover: "Feb 12, 2027",
    phases: phases(
      ["Complete", "Complete", "In progress", "Pending", "Pending", "Pending"],
      [
        "Inventory complete: 186 chart of accounts lines, 3 fiscal years of transactions and 940 open AP and AR items.",
        "172 of 186 accounts mapped (92%). The 14 unmapped accounts are legacy assembly accounts with no activity since 2024, under review with the Plant 3 team.",
        "Trial load of the October trial balance is in the Epicor sandbox. Validation is under way with the Plant 3 accounting team.",
        "Full validation follows a clean trial reconciliation. The migration does not proceed on an unresolved money difference.",
        "Final delta load and switch of the Plant 3 ledgers, planned for the Feb 12 window, after the January close.",
        "30-day watch with daily reconciliation after cutover. Sage 300 stays read-only as the fallback.",
      ],
    ),
    objects: [
      { object: "Chart of accounts lines", total: 186, moved: 172, exceptions: 14 },
      { object: "Trial balance accounts (October)", total: 154, moved: 154, exceptions: 4 },
      { object: "Open AP and AR items", total: 940, moved: 0, exceptions: 0 },
    ],
    validation: [
      "Trial balance differs by $2,860 across 4 accounts. Under review with the Plant 3 accounting team before the full load proceeds.",
      "172 of 186 chart of accounts lines are mapped (92%); nothing unmapped is dropped quietly, and each retired account is documented.",
      "Every migrated account keeps its Sage 300 account number as a searchable reference in Epicor.",
    ],
  },
  {
    id: "MIG-02",
    name: "Historical AP archive",
    sourceSystem: "Legacy AP spreadsheet archive and scanned invoices",
    scope: "Vendor bills and payment records from 2019 to 2023, for all three plants",
    status: "Complete",
    owner: "Northline finance systems team",
    started: "Aug 11, 2026",
    targetCutover: "Completed Oct 6, 2026",
    phases: phases(
      ["Complete", "Complete", "Complete", "Complete", "Complete", "Complete"],
      [
        "Inventory complete: 39,640 vendor bills and 39,102 payment records across the three plants.",
        "Vendor and account mapping signed off by the AP Manager; duplicate vendor records merged by agreement, never silently.",
        "Trial load of 5,000 bills reconciled on counts and payment totals.",
        "Full load validated; the 51 extraction exceptions were reprocessed and cleared.",
        "Archive switched to Alfie on Oct 6, 2026. The spreadsheet archive is read-only.",
        "Hypercare closed Nov 5, 2026 with zero open exceptions.",
      ],
    ),
    objects: [
      { object: "Vendor bills", total: 39640, moved: 39640, exceptions: 0 },
      { object: "Payment records", total: 39102, moved: 39102, exceptions: 0 },
    ],
    validation: [
      "Bill counts and payment totals match the source archive for every year, 2019 to 2023.",
      "Duplicate vendor records were merged only where the AP Manager confirmed the match in writing.",
      "Full text index rebuilt, so archived bills are searchable and previewable in place.",
    ],
  },
  {
    id: "MIG-03",
    name: "Northline Fabrication payroll history",
    sourceSystem: "Legacy payroll system (Plant 2, Drummondville)",
    scope: "Payroll history from 2022 to 2026 for the Drummondville plant: registers, tax filings and GL posting summaries",
    status: "Assess",
    owner: "Northline finance systems team",
    started: "Nov 10, 2026",
    targetCutover: "Apr 2027, to be confirmed",
    phases: phases(
      ["In progress", "Pending", "Pending", "Pending", "Pending", "Pending"],
      [
        "Inventory under way: 5 years of payroll registers, tax filings and GL posting summaries, including Quebec payroll filings.",
        "Field mapping follows the assessment. Payroll fields are mapped at summary level; employee level detail stays in the payroll system.",
        "Trial load of one quarter follows a signed-off mapping.",
        "Validation by the Controller, who owns payroll accounting for the group.",
        "Cutover window to be agreed once the assessment sizes the history.",
        "30-day watch with daily reconciliation after cutover.",
      ],
    ),
    objects: [
      { object: "Payroll registers", total: 260, moved: 0, exceptions: 0 },
      { object: "Employee records (summary)", total: 486, moved: 0, exceptions: 0 },
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
