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
    title: "JE-2026-1142 needs CFO approval",
    detail: "The $318,000 post-close inventory and COGS true-up is above the $10,000 threshold. Controller review is complete.",
    time: "12 min ago",
    link: { to: "/accounting/$entryId", params: { entryId: "JE-2026-1142" } },
  },
  {
    id: "n2",
    kind: "automation",
    title: "Automation paused at bill approval",
    detail: "New Bill Processing run EXE-9101 is holding BILL-3307 from Lakefront Steel Inc. ($214,600) until the VP Finance decides.",
    time: "48 min ago",
    link: { to: "/automations" },
  },
  {
    id: "n3",
    kind: "system",
    title: "GRNI clearing exception of $47,300",
    detail: "The goods received not invoiced clearing account does not reconcile for November. The Reconciliation Agent has isolated it to Plant 1 receiving.",
    time: "1 hr ago",
    link: { to: "/reconciliations" },
  },
  {
    id: "n4",
    kind: "system",
    title: "Plex MES sync is stale",
    detail: "Last successful sync was 2 days ago. Plant 2 production and scrap reporting has not imported, so November usage variances for Plant 2 are estimated.",
    time: "2 hrs ago",
    link: { to: "/data-sources" },
  },
  {
    id: "n5",
    kind: "report",
    title: "November board pack is ready",
    detail: "RPT-301 generated on the October close: revenue $139.2M year to date, gross margin 26.8%, EBITDA margin 9.5%.",
    time: "Yesterday",
    link: { to: "/reports" },
  },
  {
    id: "n6",
    kind: "billing",
    title: "Invoice INV-2026-0118 was paid",
    detail: "$14,236 charged to the Visa ending 6190 on Nov 3, 2026.",
    time: "Nov 3",
    link: { to: "/billing" },
  },
];
