import type { EntryStatus, Priority } from "@/lib/accounting-data";

export function PriorityBadge({ priority }: { priority: Priority }) {
  const tone = priority === "High" ? "bg-destructive/10 text-destructive" : priority === "Medium" ? "bg-status-paused text-status-paused-foreground" : "bg-secondary text-muted-foreground";
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-[13px] font-medium ${tone}`}>{priority}</span>;
}
export function EntryStatusBadge({ status }: { status: EntryStatus }) {
  const tone = status === "Needs Review" ? "bg-status-paused text-status-paused-foreground" : status === "Awaiting Approval" ? "bg-warning/15 text-warning-foreground" : status === "In Preparation" ? "bg-primary/10 text-primary" : status === "Approved" ? "bg-status-active text-status-active-foreground" : "bg-positive/10 text-positive";
  return <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-[13px] font-medium ${tone}`}><span className="size-1.5 rounded-full bg-current" />{status}</span>;
}
