import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/royalties-data";
import * as manufacturing from "./worlds/manufacturing/royalties-data";
import * as mining from "./worlds/mining/royalties-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { moduleAvailable, royaltiesSummary, royaltyProduction, royaltyObligations, octoberRoyaltyTotal, accruedRoyaltyTotal, paidRoyaltyTotal, alfieRoyaltyNotes } = active;
export type { RoyaltiesSummary, RoyaltyProductionRow, RoyaltyObligation } from "./worlds/mining/royalties-data";
