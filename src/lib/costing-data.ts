import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/costing-data";
import * as manufacturing from "./worlds/manufacturing/costing-data";
import * as mining from "./worlds/mining/costing-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { moduleAvailable, costingSummary, standardCosts, varianceBridge, flagshipAnalysis, alfieCostingNotes, standardRevision } = active;
export type { CostingSummary, StandardCostRow, VarianceComponent, FlagshipAnalysis, StandardRevisionItem } from "./worlds/manufacturing/costing-data";
