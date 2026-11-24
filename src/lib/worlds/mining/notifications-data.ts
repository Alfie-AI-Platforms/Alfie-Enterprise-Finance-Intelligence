import type {
  NotificationItem,
  NotificationKind,
  NotificationLink,
} from "@/lib/worlds/enterprise/notifications-data";

export type { NotificationItem, NotificationKind, NotificationLink };

/**
 * Workspace notifications for the signed-in user. Frontend only: the
 * list is sample data and read state is kept in the browser
 * (localStorage "alfie.notifications.v1") until the backend lands.
 */

export const notifications: NotificationItem[] = [
  {
    id: "n1",
    kind: "entry",
    title: "JE-2026-0874 needs CFO approval",
    detail: "The $253,500 post-close Copperline JV accrual correction is above the $10,000 threshold. Controller review is complete.",
    time: "12 min ago",
    link: { to: "/accounting/$entryId", params: { entryId: "JE-2026-0874" } },
  },
  {
    id: "n2",
    kind: "automation",
    title: "Automation paused at bill approval",
    detail: "New Bill Processing run EXE-7701 is holding BILL-5108 from Summit Drilling Ltd. ($386,200) until the VP Finance decides.",
    time: "48 min ago",
    link: { to: "/automations" },
  },
  {
    id: "n3",
    kind: "system",
    title: "Stockpile inventory difference of $94,600",
    detail: "The stockpile account does not reconcile for November. The Reconciliation Agent is holding it open pending the November survey.",
    time: "1 hr ago",
    link: { to: "/reconciliations" },
  },
  {
    id: "n4",
    kind: "system",
    title: "ADP payroll sync is stale",
    detail: "Last successful sync was 4 days ago. The Nov 15 site payroll runs are waiting to import, so November payroll accruals are estimated.",
    time: "2 hrs ago",
    link: { to: "/data-sources" },
  },
  {
    id: "n5",
    kind: "report",
    title: "November board pack is ready",
    detail: "RPT-301 generated on the October close: revenue $389.4M year to date, gross margin 44.6%, EBITDA margin 44.4%.",
    time: "Yesterday",
    link: { to: "/reports" },
  },
  {
    id: "n6",
    kind: "billing",
    title: "Invoice INV-2026-0118 was paid",
    detail: "$16,364 charged to the American Express ending 3005 on Nov 3, 2026.",
    time: "Nov 3",
    link: { to: "/billing" },
  },
];
