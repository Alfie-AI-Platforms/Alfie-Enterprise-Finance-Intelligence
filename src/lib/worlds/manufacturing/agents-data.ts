import { CircleDollarSign, ClipboardCheck, Factory, Landmark, Receipt, Scale, ShieldCheck, TrendingUp } from "lucide-react";
import type { AgentStatus } from "@/lib/worlds/enterprise/agents-data";

export type { AgentStatus };

export const agents = [
  { id: "reconciliation", name: "Reconciliation Agent", description: "Matches bank and subledger activity to the ledger, isolates exceptions and prepares reconciliation reviews for sign-off.", department: "Reconciliations", status: "Active" as AgentStatus, lastRun: "12 min ago", createdBy: "Priya Nair", access: "Accounting Team", icon: Scale },
  { id: "close", name: "Close Agent", description: "Tracks the close checklist across plants, chases overdue tasks and drafts flux explanations for the Controller.", department: "Close", status: "Active" as AgentStatus, lastRun: "34 min ago", createdBy: "Sarah Mitchell", access: "Finance Leadership", icon: ClipboardCheck },
  { id: "ap-processing", name: "AP Processing Agent", description: "Extracts vendor bills, runs the three-way match against purchase orders and receiving, and routes approvals by amount.", department: "Payables", status: "Active" as AgentStatus, lastRun: "48 min ago", createdBy: "Kevin Doyle", access: "AP Team", icon: Receipt },
  { id: "ar-collections", name: "AR Collections Agent", description: "Monitors customer aging, drafts collection follow-ups and recommends credit holds for approval.", department: "Receivables", status: "Paused" as AgentStatus, lastRun: "Yesterday", createdBy: "Sarah Mitchell", access: "Receivables Team", icon: CircleDollarSign },
  { id: "fpa-analysis", name: "FP&A Analysis Agent", description: "Builds budget versus actual analysis, forecast scenarios and board pack commentary from the same figures as Reports.", department: "Planning", status: "Active" as AgentStatus, lastRun: "1 hr ago", createdBy: "Julia Santos", access: "FP&A Team", icon: TrendingUp },
  { id: "treasury", name: "Treasury Agent", description: "Rolls the 13 week cash forecast, tracks covenant headroom and flags concentration across bank balances.", department: "Treasury", status: "Draft" as AgentStatus, lastRun: "Not run", createdBy: "Mark Feldman", access: "Treasury Team", icon: Landmark },
  { id: "compliance-monitoring", name: "Compliance Monitoring Agent", description: "Monitors activity against approval policies and segregation of duties, and packages exceptions for review.", department: "Compliance", status: "Active" as AgentStatus, lastRun: "2 hrs ago", createdBy: "Omar Haddad", access: "Compliance + Finance Leadership", icon: ShieldCheck },
  { id: "cost-variance", name: "Cost Variance Agent", description: "Splits material, labour and overhead variances into price, usage and rate by product family, and prepares true-up entries and standard revision drafts.", department: "Costing", status: "Active" as AgentStatus, lastRun: "26 min ago", createdBy: "Lucas Meyer", access: "Cost Accounting Team", icon: Factory },
];

export const knowledgeOptions = ["Accounting policies manual", "Approval policies", "Chart of accounts", "Close procedures", "Board pack templates", "Loan agreements and covenants", "Epicor Kinetic general ledger", "Bank feeds", "Vendor master", "Customer master", "Standard cost tables", "Budget and forecast models"];
export const dataAccessOptions = ["Read journal entries", "Read bank transactions", "Read vendor bills", "Read customer invoices", "Read documents", "Read budgets and forecasts", "Read standard costs and variances"];
export const actionOptions = ["Prepare journal entry", "Prepare bill approval", "Draft collection follow-up", "Prepare reconciliation", "Prepare report", "Send notification", "Update close checklist", "Request information", "Prepare payment run", "Flag exception", "Draft standard revision"];
export const workflowBlocks = ["New Bill", "Retrieve Vendor Record", "Extract Invoice", "Three-Way Match", "Check Approval Policy", "Decision", "Human Review", "Prepare Approval", "Record Outcome"];

// ---------- Agent test page scenario ----------
import { Database, FileText, Wrench, type LucideIcon } from "lucide-react";
import type { AgentTestScenario } from "@/lib/worlds/enterprise/agents-data";

export type { AgentTestScenario };

export const agentTestScenario: AgentTestScenario = {
  agentName: "Reconciliation Agent",
  prompt: "Review the GRNI clearing difference of $47,300 and tell me what requires attention.",
  trace: [
    { icon: FileText, title: "Knowledge", copy: "Accounting Policies Manual v5 · Close Procedures" },
    { icon: Database, title: "Data accessed", copy: "Goods receipts · Supplier invoices · Reconciliation history" },
    { icon: Wrench, title: "Actions", copy: "Read-only retrieval · Analysis" },
    { icon: ShieldCheck, title: "Permission result", copy: "Write actions blocked · Approval enforced" },
  ],
  intro:
    "I reviewed the GRNI clearing account against receiving records and the November ledger postings. Three items require attention:",
  points: [
    {
      lead: "Root cause:",
      text: "$47,300 of steel and tooling was received at Plant 1 and Plant 2 in early November and the supplier invoices have not arrived, so the clearing account carries the receipts with nothing to match against.",
    },
    {
      lead: "Largest item:",
      text: "A Lakefront Steel coil delivery received November 9 is the largest single receipt in the balance. Alfie ages each receipt so the team can chase the oldest invoices first.",
    },
    {
      lead: "Next step:",
      text: "No journal entry is needed yet; the balance clears as invoices land. Anything still open at month end is reviewed for accrual, and the exception stays open on the reconciliation until then.",
    },
  ],
};
