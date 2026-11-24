import { BookOpen, Building2, CircleDollarSign, ClipboardCheck, FileBarChart, Landmark, Receipt, Sparkle, TrendingUp, type LucideIcon } from "lucide-react";
import type { FileLink, QueueItem } from "@/lib/worlds/enterprise/home-data";

export const homeMetrics = [
  ["Cash Position", "$58.6M", "7 accounts · CAD equivalent", "text-positive"],
  ["November Close", "12 of 71", "Site subledgers under way", "text-warning"],
  ["AP Due This Week", "$3.46M", "Both mines and the JV", "text-warning"],
  ["AR Over 60 Days", "$196K", "One refinery assay dispute", "text-warning"],
];
export const homePrompts = ["Walk me through the Copperline JV statement difference.", "What is our all-in sustaining cost per ounce?", "Which bills are waiting on my approval?", "What does the 13 week cash forecast say?"];

export const homeQueue: QueueItem[] = [
  { icon: BookOpen, title: "Entry JE-2026-0874: JV operator statement difference of $253,500", detail: "Alfie traced the gap between Kestrel's October statement and Aurora's accrual to a camp invoice billed at 100 percent of cost and a missing diesel accrual, and prepared the correcting entry. Post-close adjustments above $10,000 need CFO approval after your review.", chip: "CFO approval", chipTone: "bg-status-paused text-status-paused-foreground", link: { to: "/accounting/$entryId", params: { entryId: "JE-2026-0874" } }, linkLabel: "Open entry file" },
  { icon: TrendingUp, title: "Forecast review FR-2026-008: production guidance update", detail: "George Mensah has submitted a forecast review raising full year production guidance from 84,000 to 86,500 oz. The 3.0 percent change exceeds his 2.0 percent authority, so it is with you for approval.", chip: "Awaiting approval", chipTone: "bg-status-paused text-status-paused-foreground", link: { to: "/planning/reviews" }, linkLabel: "Open forecast review" },
  { icon: Receipt, title: "Payables: a duplicate bill was held for you", detail: "Alfie held a duplicate explosives bill from Northern Explosives Ltd. BILL-5108 from Summit Drilling, $386,200, is ready for your approval, with $17,900 held back on a drilling quantity variance.", chip: "Decisions needed", chipTone: "bg-secondary text-secondary-foreground", link: { to: "/payables" }, linkLabel: "Open payables" },
  { icon: ClipboardCheck, title: "November close: site subledgers under way", detail: "12 of 71 tasks are complete. Subledger cutoffs start November 28, and the stockpile difference of $94,600 waits on the November survey at Keno Ridge.", chip: "In progress", chipTone: "bg-status-active text-status-active-foreground", link: { to: "/close" }, linkLabel: "Open close checklist" },
];

export const homeRecentFiles: readonly { icon: LucideIcon; title: string; meta: string; link: FileLink }[] = [
  { icon: BookOpen, title: "Entry JE-2026-0874", meta: "Joint Venture · Copperline Metals JV", link: { to: "/accounting/$entryId", params: { entryId: "JE-2026-0874" } } },
  { icon: Receipt, title: "Payables queue", meta: "Bills, approvals and duplicates", link: { to: "/payables" } },
  { icon: CircleDollarSign, title: "Receivables", meta: "$196K over 60 days", link: { to: "/receivables" } },
  { icon: FileBarChart, title: "Reports library", meta: "Board, lender and site reports", link: { to: "/reports" } },
];

export const homeActivities: readonly (readonly [LucideIcon, string, string])[] = [[FileBarChart, "October cost per ounce analysis completed", "Planning · 26 minutes ago"], [Landmark, "Reconciled 20 of 29 bank and control accounts", "Treasury · 1 hour ago"], [Sparkle, "Flagged 5 anomalies in October site actuals", "Accounting · 3 hours ago"]];
export const homeContextItems: readonly (readonly [string, string, LucideIcon])[] = [["Current context", "Mining", Building2], ["Active workspace", "Accounting", BookOpen]];
