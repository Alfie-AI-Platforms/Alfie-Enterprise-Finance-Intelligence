import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/projects-data";
import * as manufacturing from "./worlds/manufacturing/projects-data";
import * as mining from "./worlds/mining/projects-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { moduleAvailable, projectsSummary, capitalProjects, jvTieIn, alfieProjectNotes } = active;
export type { ProjectsSummary, CapitalProject, JvTieIn } from "./worlds/mining/projects-data";
