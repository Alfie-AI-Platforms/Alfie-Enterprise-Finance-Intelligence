import { CircleDollarSign, ClipboardCheck, Landmark, Pickaxe, Receipt, Scale, ShieldCheck, TrendingUp } from "lucide-react";
import type { AgentStatus } from "@/lib/worlds/enterprise/agents-data";

export type { AgentStatus };

export const agents = [
  { id: "reconciliation", name: "Reconciliation Agent", description: "Matches bank and subledger activity to the ledger, isolates exceptions and prepares reconciliation reviews for sign-off.", department: "Reconciliations", status: "Active" as AgentStatus, lastRun: "12 min ago", createdBy: "Nadia Hassan", access: "Accounting Team", icon: Scale },
  { id: "close", name: "Close Agent", description: "Tracks the close checklist across sites, chases overdue tasks and drafts flux explanations for the Controller.", department: "Close", status: "Active" as AgentStatus, lastRun: "34 min ago", createdBy: "Claire Dubois", access: "Finance Leadership", icon: ClipboardCheck },
  { id: "ap-processing", name: "AP Processing Agent", description: "Extracts vendor bills, runs the three-way match against purchase orders and verified service records, and routes approvals by amount.", department: "Payables", status: "Active" as AgentStatus, lastRun: "48 min ago", createdBy: "Susan Park", access: "AP Team", icon: Receipt },
  { id: "ar-collections", name: "AR Collections Agent", description: "Monitors refinery settlement aging, drafts follow-ups and recommends shipment holds for approval.", department: "Receivables", status: "Paused" as AgentStatus, lastRun: "Yesterday", createdBy: "Claire Dubois", access: "Receivables Team", icon: CircleDollarSign },
  { id: "fpa-analysis", name: "FP&A Analysis Agent", description: "Builds budget versus actual analysis, production and cost reporting, forecast scenarios and board pack commentary from the same figures as Reports.", department: "Planning", status: "Active" as AgentStatus, lastRun: "1 hr ago", createdBy: "George Mensah", access: "FP&A Team", icon: TrendingUp },
  { id: "treasury", name: "Treasury Agent", description: "Rolls the 13 week cash forecast, tracks covenant headroom and the hedge book, and flags concentration across bank balances.", department: "Treasury", status: "Draft" as AgentStatus, lastRun: "Not run", createdBy: "Angela Ruiz", access: "Treasury Team", icon: Landmark },
  { id: "compliance-monitoring", name: "Compliance Monitoring Agent", description: "Monitors activity against approval policies and segregation of duties, and packages exceptions for review.", department: "Compliance", status: "Active" as AgentStatus, lastRun: "2 hrs ago", createdBy: "Ingrid Sorensen", access: "Compliance + Finance Leadership", icon: ShieldCheck },
  { id: "jv-royalty", name: "JV and Royalty Agent", description: "Reconciles operator statements against Aurora's accrued share, prepares JV correcting entries and query letters, and builds the monthly royalty accruals.", department: "Capital Projects", status: "Active" as AgentStatus, lastRun: "18 min ago", createdBy: "Nadia Hassan", access: "Accounting Team", icon: Pickaxe },
];

export const knowledgeOptions = ["Accounting policies manual", "Approval policies", "Chart of accounts", "Close procedures", "Board pack templates", "Facility agreements and covenants", "SAP S/4HANA general ledger", "Bank feeds", "Vendor master", "Customer master", "JV agreements and operator statements", "Royalty agreements", "Budget and forecast models"];
export const dataAccessOptions = ["Read journal entries", "Read bank transactions", "Read vendor bills", "Read customer invoices", "Read documents", "Read budgets and forecasts", "Read JV statements", "Read production and royalty data"];
export const actionOptions = ["Prepare journal entry", "Prepare bill approval", "Draft collection follow-up", "Prepare reconciliation", "Prepare report", "Send notification", "Update close checklist", "Request information", "Prepare payment run", "Flag exception", "Draft operator query letter"];
export const workflowBlocks = ["New Bill", "Retrieve Vendor Record", "Extract Invoice", "Three-Way Match", "Check Approval Policy", "Decision", "Human Review", "Prepare Approval", "Record Outcome"];

// ---------- Agent test page scenario ----------
import { Database, FileText, Wrench, type LucideIcon } from "lucide-react";
import type { AgentTestScenario } from "@/lib/worlds/enterprise/agents-data";

export type { AgentTestScenario };

export const agentTestScenario: AgentTestScenario = {
  agentName: "Reconciliation Agent",
  prompt: "Review the stockpile inventory difference of $94,600 and tell me what requires attention.",
  trace: [
    { icon: FileText, title: "Knowledge", copy: "Accounting Policies Manual v5 · Close Procedures" },
    { icon: Database, title: "Data accessed", copy: "Stockpile surveys · Inventory movements · Reconciliation history" },
    { icon: Wrench, title: "Actions", copy: "Read-only retrieval · Analysis" },
    { icon: ShieldCheck, title: "Permission result", copy: "Write actions blocked · Approval enforced" },
  ],
  intro:
    "I reviewed the Keno Ridge stockpile inventory account against the October survey and the November movements. Three items require attention:",
  points: [
    {
      lead: "Root cause:",
      text: "The October survey at Keno Ridge measured the ore stockpiles below the book quantity, and a further $94,600 of difference has built up in November movements.",
    },
    {
      lead: "What settles it:",
      text: "The November survey, due late in the close window, settles the final number. A journal estimate is not substituted for the survey, and the account stays in exception until it lands.",
    },
    {
      lead: "Next step:",
      text: "A stockpile survey adjustment is prepared once the survey is in, following the pattern of JE-2026-0880. The exception stays open on the reconciliation until then.",
    },
  ],
};
