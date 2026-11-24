import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/migration-data";
import * as manufacturing from "./worlds/manufacturing/migration-data";
import * as mining from "./worlds/mining/migration-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { migrationProjects, migrationProcess, migrationGuardrails } = active;
export type { PhaseState, MigrationPhase, MigrationObject, MigrationProject } from "./worlds/enterprise/migration-data";
