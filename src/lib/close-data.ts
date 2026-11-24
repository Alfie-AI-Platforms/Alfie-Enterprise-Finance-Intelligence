import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/close-data";
import * as manufacturing from "./worlds/manufacturing/close-data";
import * as mining from "./worlds/mining/close-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { closeGroups, closePeriod, closeTasks, entityCloseStatus, octoberClose, postCloseAdjustment, closeRoles } = active;
export type { CloseGroup, CloseTaskStatus, CloseTask, EntityCloseStatus } from "./worlds/enterprise/close-data";
