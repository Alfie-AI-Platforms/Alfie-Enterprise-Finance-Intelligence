import { Bot, CircleDollarSign, ClipboardCheck, Landmark, Receipt, Scale, ShieldCheck, TrendingUp } from "lucide-react";

export type AgentStatus = "Active" | "Draft" | "Paused";

export const agents = [
  { id: "reconciliation", name: "Reconciliation Agent", description: "Matches bank and subledger activity to the ledger, isolates exceptions and prepares reconciliation reviews for sign-off.", department: "Reconciliations", status: "Active" as AgentStatus, lastRun: "12 min ago", createdBy: "Marcus Webb", access: "Accounting Team", icon: Scale },
  { id: "close", name: "Close Agent", description: "Tracks the close checklist across entities, chases overdue tasks and drafts flux explanations for the Controller.", department: "Close", status: "Active" as AgentStatus, lastRun: "34 min ago", createdBy: "Elena Brooks", access: "Finance Leadership", icon: ClipboardCheck },
  { id: "ap-processing", name: "AP Processing Agent", description: "Extracts vendor bills, runs the three-way match against purchase orders and receiving, and routes approvals by amount.", department: "Payables", status: "Active" as AgentStatus, lastRun: "48 min ago", createdBy: "Rachel Kim", access: "AP Team", icon: Receipt },
  { id: "ar-collections", name: "AR Collections Agent", description: "Monitors customer aging, drafts collection follow-ups and recommends credit holds for approval.", department: "Receivables", status: "Paused" as AgentStatus, lastRun: "Yesterday", createdBy: "Elena Brooks", access: "Receivables Team", icon: CircleDollarSign },
  { id: "fpa-analysis", name: "FP&A Analysis Agent", description: "Builds budget versus actual analysis, forecast scenarios and board pack commentary from the same figures as Reports.", department: "Planning", status: "Active" as AgentStatus, lastRun: "1 hr ago", createdBy: "Grace Liu", access: "FP&A Team", icon: TrendingUp },
  { id: "treasury", name: "Treasury Agent", description: "Rolls the 13 week cash forecast, tracks covenant headroom and flags concentration across bank balances.", department: "Treasury", status: "Draft" as AgentStatus, lastRun: "Not run", createdBy: "Tom Alvarez", access: "Treasury Team", icon: Landmark },
  { id: "compliance-monitoring", name: "Compliance Monitoring Agent", description: "Monitors activity against approval policies and segregation of duties, and packages exceptions for review.", department: "Compliance", status: "Active" as AgentStatus, lastRun: "2 hrs ago", createdBy: "Maya Thompson", access: "Compliance + Finance Leadership", icon: Bot },
];

export const knowledgeOptions = ["Accounting policies manual", "Approval policies", "Chart of accounts", "Close procedures", "Board pack templates", "Loan agreements and covenants", "NetSuite general ledger", "Bank feeds", "Vendor master", "Customer master", "Budget and forecast models"];
export const dataAccessOptions = ["Read journal entries", "Read bank transactions", "Read vendor bills", "Read customer invoices", "Read documents", "Read budgets and forecasts"];
export const actionOptions = ["Prepare journal entry", "Prepare bill approval", "Draft collection follow-up", "Prepare reconciliation", "Prepare report", "Send notification", "Update close checklist", "Request information", "Prepare payment run", "Flag exception"];
export const workflowBlocks = ["New Bill", "Retrieve Vendor Record", "Extract Invoice", "Three-Way Match", "Check Approval Policy", "Decision", "Human Review", "Prepare Approval", "Record Outcome"];
