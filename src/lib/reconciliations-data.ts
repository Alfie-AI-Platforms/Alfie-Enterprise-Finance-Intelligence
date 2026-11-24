import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/reconciliations-data";
import * as manufacturing from "./worlds/manufacturing/reconciliations-data";
import * as mining from "./worlds/mining/reconciliations-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { recSummary, recAccounts, recExceptions, alfieRecNotes } = active;
export type { RecAccountStatus, RecAccount, RecException } from "./worlds/enterprise/reconciliations-data";
