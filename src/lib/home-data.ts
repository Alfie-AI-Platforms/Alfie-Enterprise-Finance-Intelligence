import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/home-data";
import * as manufacturing from "./worlds/manufacturing/home-data";
import * as mining from "./worlds/mining/home-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { homeMetrics, homePrompts, homeQueue, homeRecentFiles, homeActivities, homeContextItems } = active;
export type { FileLink, QueueItem } from "./worlds/enterprise/home-data";
