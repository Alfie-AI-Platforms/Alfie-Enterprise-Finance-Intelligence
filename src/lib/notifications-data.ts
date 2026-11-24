import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/notifications-data";
import * as manufacturing from "./worlds/manufacturing/notifications-data";
import * as mining from "./worlds/mining/notifications-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { notifications } = active;
export type { NotificationKind, NotificationLink, NotificationItem } from "./worlds/enterprise/notifications-data";
