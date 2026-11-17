import type { BillStatus, MatchStatus, BillPriority } from "@/lib/payables-data";

export function BillPriorityBadge({ priority }: { priority: BillPriority }) {
  const tone = priority === "High" ? "bg-destructive/10 text-destructive" : priority === "Medium" ? "bg-status-paused text-status-paused-foreground" : "bg-secondary text-muted-foreground";
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-[13px] font-medium ${tone}`}>{priority}</span>;
}

export function BillStatusBadge({ status }: { status: BillStatus }) {
  const tone =
    status === "Needs Review" || status === "Awaiting Approval" ? "bg-status-paused text-status-paused-foreground"
    : status === "Approved" || status === "Scheduled" || status === "Paid" ? "bg-status-active text-status-active-foreground"
    : status === "New" || status === "Matching" ? "bg-primary/10 text-primary"
    : status === "On Hold" ? "bg-destructive/10 text-destructive"
    : "bg-secondary text-muted-foreground";
  return <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-[13px] font-medium ${tone}`}><span className="size-1.5 rounded-full bg-current" />{status}</span>;
}

export function MatchBadge({ match }: { match: MatchStatus }) {
  const tone =
    match === "Matched" ? "bg-status-active text-status-active-foreground"
    : match === "Variance" ? "bg-status-paused text-status-paused-foreground"
    : match === "Duplicate held" ? "bg-destructive/10 text-destructive"
    : "bg-secondary text-muted-foreground";
  return <span className={`inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-[13px] font-medium ${tone}`}>{match}</span>;
}
