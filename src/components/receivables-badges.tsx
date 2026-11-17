import type { CustomerStatus, InvoiceStatus } from "@/lib/receivables-data";

export function CustomerStatusBadge({ status }: { status: CustomerStatus }) {
  const tone =
    status === "Current" ? "bg-status-active text-status-active-foreground"
    : status === "Watch" || status === "Credit Hold Recommended" ? "bg-status-paused text-status-paused-foreground"
    : status === "Overdue" || status === "On Hold" ? "bg-destructive/10 text-destructive"
    : "bg-secondary text-muted-foreground";
  return <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-[13px] font-medium ${tone}`}><span className="size-1.5 rounded-full bg-current" />{status}</span>;
}

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  const tone =
    status === "Overdue" ? "bg-destructive/10 text-destructive"
    : status === "Open" ? "bg-status-paused text-status-paused-foreground"
    : "bg-secondary text-muted-foreground";
  return <span className={`inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-[13px] font-medium ${tone}`}>{status}</span>;
}
