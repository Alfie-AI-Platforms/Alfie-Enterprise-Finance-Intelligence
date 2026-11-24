import { BookOpen, Building2, CircleDollarSign, ClipboardCheck, FileBarChart, Landmark, Receipt, Sparkle, TrendingUp, type LucideIcon } from "lucide-react";

export type FileLink = { to: "/accounting/$entryId"; params: { entryId: string } } | { to: "/planning/reviews" | "/payables" | "/close" | "/receivables" | "/reports"; params?: undefined };
export type QueueItem = { icon: LucideIcon; title: string; detail: string; chip: string; chipTone: string; linkLabel: string; link: FileLink };

export const homeMetrics = [
  ["Cash Position", "$18.4M", "6 accounts · CAD equivalent", "text-positive"],
  ["November Close", "18 of 64", "Early tasks under way", "text-warning"],
  ["AP Due This Week", "$1.26M", "23 bills scheduled", "text-warning"],
  ["AR Over 60 Days", "$842K", "4 customers to chase", "text-warning"],
];
export const homePrompts = ["Why did gross margin move in October?", "Which bills are waiting on my approval?", "Show me the intercompany differences.", "What does the 13 week cash forecast say?"];

export const homeQueue: QueueItem[] = [
  { icon: BookOpen, title: "Entry JE-2026-1087: intercompany difference of $18,400", detail: "Alfie traced the gap between Manufacturing and Logistics to a missing October 31 FX revaluation and prepared the correcting entry. Post-close adjustments above $10,000 need CFO approval after your review.", chip: "CFO approval", chipTone: "bg-status-paused text-status-paused-foreground", link: { to: "/accounting/$entryId", params: { entryId: "JE-2026-1087" } }, linkLabel: "Open entry file" },
  { icon: TrendingUp, title: "Forecast review FR-2026-011: Q4 forecast update", detail: "Grace Liu has submitted the updated Q4 forecast. Revenue holds at $102.6M YTD pace, with steel costs running above budget in Manufacturing.", chip: "Awaiting approval", chipTone: "bg-status-paused text-status-paused-foreground", link: { to: "/planning/reviews" }, linkLabel: "Open forecast review" },
  { icon: Receipt, title: "Payables: a duplicate bill was held for you", detail: "Alfie held BILL-2219 from Northgate Office Supply because it duplicates BILL-2207, same invoice number and amount. BILL-2214 from Great Lakes Steel, $86,400, is ready for your approval.", chip: "Decisions needed", chipTone: "bg-secondary text-secondary-foreground", link: { to: "/payables" }, linkLabel: "Open payables" },
  { icon: ClipboardCheck, title: "November close: early tasks under way", detail: "18 of 64 tasks are complete. Subledger cutoffs start November 28, and the payroll clearing exception of $3,215 is the one reconciliation item Alfie cannot clear on its own.", chip: "In progress", chipTone: "bg-status-active text-status-active-foreground", link: { to: "/close" }, linkLabel: "Open close checklist" },
];

export const homeRecentFiles: readonly { icon: LucideIcon; title: string; meta: string; link: FileLink }[] = [
  { icon: BookOpen, title: "Entry JE-2026-1087", meta: "Intercompany · Meridian Manufacturing", link: { to: "/accounting/$entryId", params: { entryId: "JE-2026-1087" } } },
  { icon: Receipt, title: "Payables queue", meta: "Bills, approvals and duplicates", link: { to: "/payables" } },
  { icon: CircleDollarSign, title: "Receivables", meta: "$842K over 60 days", link: { to: "/receivables" } },
  { icon: FileBarChart, title: "Reports library", meta: "Board, lender and audit reports", link: { to: "/reports" } },
];

export const homeActivities: readonly (readonly [LucideIcon, string, string])[] = [[FileBarChart, "October margin analysis completed", "Manufacturing · 22 minutes ago"], [Landmark, "Reconciled 19 of 24 bank accounts", "Treasury · 1 hour ago"], [Sparkle, "Flagged 7 anomalies in October actuals", "Accounting · 3 hours ago"]];
export const homeContextItems: readonly (readonly [string, string, LucideIcon])[] = [["Current context", "Finance", Building2], ["Active workspace", "Accounting", BookOpen]];
