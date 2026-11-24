import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/reconciliations-data";
import * as manufacturing from "./worlds/manufacturing/reconciliations-data";
import * as mining from "./worlds/mining/reconciliations-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { recSummary, recAccounts, recExceptions, alfieRecNotes, recMetaDescription, recDescription, recRunNote, recFlagshipPrompt, recCorrectionLink } = active;
export type { RecAccountStatus, RecAccount, RecException, RecCorrectionLink } from "./worlds/enterprise/reconciliations-data";
