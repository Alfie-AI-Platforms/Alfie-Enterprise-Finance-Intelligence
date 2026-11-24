import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/inventory-data";
import * as manufacturing from "./worlds/manufacturing/inventory-data";
import * as mining from "./worlds/mining/inventory-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { moduleAvailable, inventorySummary, inventoryByPlant, inventoryByCategory, slowMovingItems, slowMovingTotal, proposedReserveTotal, alfieInventoryNotes } = active;
export type { InventorySummary, InventoryPlantBalance, InventoryCategoryTotal, SlowMovingItem } from "./worlds/manufacturing/inventory-data";
