import { BookOpen, Building2, CircleDollarSign, ClipboardCheck, FileBarChart, Landmark, Receipt, Sparkle, TrendingUp, type LucideIcon } from "lucide-react";
import type { FileLink, QueueItem } from "@/lib/worlds/enterprise/home-data";

export const homeMetrics = [
  ["Cash Position", "$9.6M", "5 accounts · CAD equivalent", "text-positive"],
  ["November Close", "15 of 58", "Plant subledgers under way", "text-warning"],
  ["AP Due This Week", "$1.87M", "Across the three plants", "text-warning"],
  ["AR Over 60 Days", "$688K", "AgriCore is the largest balance", "text-warning"],
];
export const homePrompts = ["Why is the standard cost variance $212,000 unfavourable?", "What is steel doing to gross margin?", "Which bills are waiting on my approval?", "What does the 13 week cash forecast say?"];

export const homeQueue: QueueItem[] = [
  { icon: BookOpen, title: "Entry JE-2026-1142: standard cost true-up of $318,000", detail: "Alfie traced the Series 400 variance to steel at $1,186 per tonne against a $1,040 standard and Line 3 scrap at 3.4 percent, and prepared the entry truing up October COGS and inventory. Post-close adjustments above $10,000 need CFO approval after your review.", chip: "CFO approval", chipTone: "bg-status-paused text-status-paused-foreground", link: { to: "/accounting/$entryId", params: { entryId: "JE-2026-1142" } }, linkLabel: "Open entry file" },
  { icon: TrendingUp, title: "Forecast review FR-2026-021: Q4 forecast update", detail: "Julia Santos has submitted the updated Q4 forecast with a 1.6 percent revenue cut on softer agricultural demand. The cut exceeds her 1.5 percent authority, so it is with you for approval.", chip: "Awaiting approval", chipTone: "bg-status-paused text-status-paused-foreground", link: { to: "/planning/reviews" }, linkLabel: "Open forecast review" },
  { icon: Receipt, title: "Payables: a duplicate bill was held for you", detail: "Alfie held BILL-3311 from Northgate Industrial Supply because it duplicates BILL-3298, same invoice number STL-2291 and amount. BILL-3307 from Lakefront Steel, $214,600, is ready for your approval.", chip: "Decisions needed", chipTone: "bg-secondary text-secondary-foreground", link: { to: "/payables" }, linkLabel: "Open payables" },
  { icon: ClipboardCheck, title: "November close: plant subledgers under way", detail: "15 of 58 tasks are complete. Subledger cutoffs start November 28, and the GRNI clearing difference of $47,300 is the one reconciliation item Alfie cannot clear on its own.", chip: "In progress", chipTone: "bg-status-active text-status-active-foreground", link: { to: "/close" }, linkLabel: "Open close checklist" },
];

export const homeRecentFiles: readonly { icon: LucideIcon; title: string; meta: string; link: FileLink }[] = [
  { icon: BookOpen, title: "Entry JE-2026-1142", meta: "Costing · Northline Precision", link: { to: "/accounting/$entryId", params: { entryId: "JE-2026-1142" } } },
  { icon: Receipt, title: "Payables queue", meta: "Bills, approvals and duplicates", link: { to: "/payables" } },
  { icon: CircleDollarSign, title: "Receivables", meta: "$688K over 60 days", link: { to: "/receivables" } },
  { icon: FileBarChart, title: "Reports library", meta: "Board, lender and plant reports", link: { to: "/reports" } },
];

export const homeActivities: readonly (readonly [LucideIcon, string, string])[] = [[FileBarChart, "October margin bridge completed", "Planning · 18 minutes ago"], [Landmark, "Reconciled 14 of 21 accounts", "Treasury · 1 hour ago"], [Sparkle, "Flagged 6 anomalies in October plant actuals", "Accounting · 3 hours ago"]];
export const homeContextItems: readonly (readonly [string, string, LucideIcon])[] = [["Current context", "Manufacturing", Building2], ["Active workspace", "Accounting", BookOpen]];
