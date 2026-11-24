/**
 * Workspace notifications for the signed-in user. Frontend only: the
 * list is sample data and read state is kept in the browser
 * (localStorage "alfie.notifications.v1") until the backend lands.
 */

export type NotificationKind =
  | "approval"
  | "automation"
  | "entry"
  | "system"
  | "report"
  | "billing";

export type NotificationLink =
  | { to: "/close" | "/reconciliations" | "/payables" | "/automations" | "/data-sources" | "/reports" | "/billing" | "/preferences" }
  | { to: "/accounting/$entryId"; params: { entryId: string } };

export type NotificationItem = {
  id: string;
  kind: NotificationKind;
  title: string;
  detail: string;
  time: string;
  link: NotificationLink;
};

export const notifications: NotificationItem[] = [
  {
    id: "n1",
    kind: "entry",
    title: "JE-2026-1087 needs CFO approval",
    detail: "The $18,400 post-close intercompany adjustment is above the $10,000 threshold. Controller review is complete.",
    time: "12 min ago",
    link: { to: "/accounting/$entryId", params: { entryId: "JE-2026-1087" } },
  },
  {
    id: "n2",
    kind: "automation",
    title: "Automation paused at bill approval",
    detail: "New Bill Processing run EXE-8841 is holding BILL-2214 from Great Lakes Steel Co. ($86,400) until the VP Finance decides.",
    time: "48 min ago",
    link: { to: "/automations" },
  },
  {
    id: "n3",
    kind: "system",
    title: "Payroll clearing exception of $3,215",
    detail: "The payroll clearing account does not reconcile for November. The Reconciliation Agent has isolated it to the Nov 14 payroll run.",
    time: "1 hr ago",
    link: { to: "/reconciliations" },
  },
  {
    id: "n4",
    kind: "system",
    title: "Concur expense sync is stale",
    detail: "Last successful sync was 3 days ago. 86 expense reports are waiting to import, so November expense accruals are estimated.",
    time: "2 hrs ago",
    link: { to: "/data-sources" },
  },
  {
    id: "n5",
    kind: "report",
    title: "November board pack is ready",
    detail: "RPT-301 generated on the October close: revenue $102.6M year to date, gross margin 41.2%, EBITDA margin 12.6%.",
    time: "Yesterday",
    link: { to: "/reports" },
  },
  {
    id: "n6",
    kind: "billing",
    title: "Invoice INV-2026-0118 was paid",
    detail: "$10,072 charged to the Mastercard ending 2210 on Nov 3, 2026.",
    time: "Nov 3",
    link: { to: "/billing" },
  },
];
