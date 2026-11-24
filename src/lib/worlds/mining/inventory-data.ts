// Inventory is a Manufacturing pack module. In this workspace the module
// is not included, so the file exports the same names as the
// manufacturing file with empty collections; the route renders a
// pack-not-included panel from moduleAvailable.

import type {
  InventoryCategoryTotal,
  InventoryPlantBalance,
  InventorySummary,
  SlowMovingItem,
} from "@/lib/worlds/manufacturing/inventory-data";

export const moduleAvailable = false;

export const inventorySummary: InventorySummary = {
  totalFormatted: "",
  turns: "",
  slowMovingCarrying: "",
  proposedReserve: "",
  note: "",
};

export const inventoryByPlant: InventoryPlantBalance[] = [];

export const inventoryByCategory: InventoryCategoryTotal[] = [];

export const slowMovingItems: SlowMovingItem[] = [];

export const slowMovingTotal = 0;
export const proposedReserveTotal = 0;

export const alfieInventoryNotes: readonly string[] = [];
