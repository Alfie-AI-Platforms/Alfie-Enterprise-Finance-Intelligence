// Illustrative sample data for the Inventory module (Manufacturing pack).
// Figures follow INDUSTRY_BRIEFS.md: total inventory of $31.6M (raw
// materials $11.4M, work in progress $6.9M, finished goods $13.3M) and
// inventory turns of 4.1x. Plant splits below sum to those totals.

export const moduleAvailable = true;

export interface InventorySummary {
  totalFormatted: string;
  turns: string;
  slowMovingCarrying: string;
  proposedReserve: string;
  note: string;
}

export const inventorySummary: InventorySummary = {
  totalFormatted: "$31.6M",
  turns: "4.1x",
  slowMovingCarrying: "$1,570,000",
  proposedReserve: "$582,000",
  note: "Balances are at the October close, stated before the pending JE-2026-1142 true-up of $318,000 (work in progress $124,000, finished goods $194,000), which reduces Plant 1 carrying values once approved. Turns are trailing twelve months cost of goods sold over average inventory.",
};

export interface InventoryPlantBalance {
  plant: string;
  entity: string;
  rawMaterials: number;
  workInProgress: number;
  finishedGoods: number;
  total: number;
}

// Plant splits sum to the canonical category totals: raw materials
// $11.4M, work in progress $6.9M, finished goods $13.3M, total $31.6M.
export const inventoryByPlant: InventoryPlantBalance[] = [
  {
    plant: "Plant 1, Guelph",
    entity: "Northline Precision Inc.",
    rawMaterials: 6200000,
    workInProgress: 3800000,
    finishedGoods: 7100000,
    total: 17100000,
  },
  {
    plant: "Plant 2, Drummondville",
    entity: "Northline Fabrication Ltée",
    rawMaterials: 3100000,
    workInProgress: 1900000,
    finishedGoods: 3400000,
    total: 8400000,
  },
  {
    plant: "Plant 3, Fort Wayne",
    entity: "Northline Assembly Inc.",
    rawMaterials: 2100000,
    workInProgress: 1200000,
    finishedGoods: 2800000,
    total: 6100000,
  },
];

export interface InventoryCategoryTotal {
  category: string;
  amount: number;
  formatted: string;
  sharePct: number;
  note: string;
}

export const inventoryByCategory: InventoryCategoryTotal[] = [
  {
    category: "Raw materials",
    amount: 11400000,
    formatted: "$11.4M",
    sharePct: 36.1,
    note: "Led by hot-rolled coil steel at Plant 1 and Plant 2. Carried at January standards, so the steel balance is understated against current replacement cost.",
  },
  {
    category: "Work in progress",
    amount: 6900000,
    formatted: "$6.9M",
    sharePct: 21.8,
    note: "Series 400 housings in process at Plant 1 are the largest piece. JE-2026-1142 credits $124,000 against this balance once approved.",
  },
  {
    category: "Finished goods",
    amount: 13300000,
    formatted: "$13.3M",
    sharePct: 42.1,
    note: "Finished Series 400 housings awaiting shipment to AgriCore Equipment and Prairie Implement. JE-2026-1142 credits $194,000 against this balance once approved.",
  },
];

export interface SlowMovingItem {
  sku: string;
  description: string;
  plant: string;
  category: string;
  quantity: string;
  carryingValue: number;
  lastMovement: string;
  monthsOnHand: number;
  proposedReservePct: number;
  proposedReserve: number;
  reason: string;
}

export const slowMovingItems: SlowMovingItem[] = [
  {
    sku: "RM-3110",
    description: "Series 300 gear blanks, bar stock",
    plant: "Plant 1, Guelph",
    category: "Raw materials",
    quantity: "18,400 kg",
    carryingValue: 412000,
    lastMovement: "Mar 2026",
    monthsOnHand: 14.2,
    proposedReservePct: 50,
    proposedReserve: 206000,
    reason: "Superseded by the Series 400 blank specification. Remaining stock is usable only for service parts, which move slowly.",
  },
  {
    sku: "FG-2085",
    description: "Hydraulic manifolds, discontinued valve line",
    plant: "Plant 2, Drummondville",
    category: "Finished goods",
    quantity: "1,150 units",
    carryingValue: 358000,
    lastMovement: "Feb 2026",
    monthsOnHand: 11.6,
    proposedReservePct: 40,
    proposedReserve: 143200,
    reason: "The valve line was discontinued in the spring. A distributor has taken small lots at a discount; the balance is reserved against further price erosion.",
  },
  {
    sku: "WIP-4470",
    description: "Partially machined Series 400 housings, pre-tooling-change revision",
    plant: "Plant 1, Guelph",
    category: "Work in progress",
    quantity: "2,300 units",
    carryingValue: 296000,
    lastMovement: "Aug 2026",
    monthsOnHand: 9.8,
    proposedReservePct: 25,
    proposedReserve: 74000,
    reason: "Machined before the August tooling change. Most units can be reworked to the current revision; the reserve covers the expected rework fallout.",
  },
  {
    sku: "RM-1180",
    description: "Specialty alloy plate, cancelled export order",
    plant: "Plant 2, Drummondville",
    category: "Raw materials",
    quantity: "9,600 kg",
    carryingValue: 214000,
    lastMovement: "May 2026",
    monthsOnHand: 8.4,
    proposedReservePct: 30,
    proposedReserve: 64200,
    reason: "Bought for an export order that was cancelled in May. The grade is not used in standard production; resale to a stockholder is being explored.",
  },
  {
    sku: "FG-3090",
    description: "Final drive assemblies, prior model year specification",
    plant: "Plant 3, Fort Wayne",
    category: "Finished goods",
    quantity: "640 units",
    carryingValue: 168000,
    lastMovement: "Jun 2026",
    monthsOnHand: 7.9,
    proposedReservePct: 20,
    proposedReserve: 33600,
    reason: "Prior model year specification still saleable into the aftermarket, at lower velocity. Reserve reflects slower expected sell-through, not obsolescence.",
  },
  {
    sku: "RM-5525",
    description: "Obsolete fastener kits, Series 250 legacy packaging",
    plant: "Plant 1, Guelph",
    category: "Raw materials",
    quantity: "3,850 kits",
    carryingValue: 122000,
    lastMovement: "Jan 2026",
    monthsOnHand: 16.5,
    proposedReservePct: 50,
    proposedReserve: 61000,
    reason: "Packaging changed with the Series 250 refresh in January. Kits cannot be repacked economically; half the value is reserved and disposal is under review.",
  },
];

export const slowMovingTotal = 1570000;
export const proposedReserveTotal = 582000;

export const alfieInventoryNotes: readonly string[] = [
  "Six items have had no meaningful movement in over six months and carry $1,570,000 of value. The proposed reserve of $582,000 is weighted by recoverability: items with an aftermarket or rework path carry lower reserve rates than items awaiting disposal.",
  "The reserve is a proposal for the November close, not a posted adjustment. Anything the Controller approves is prepared as an entry in Accounting and follows the same approval rules as any other post-close item.",
  "Inventory control at Plant 1 shows a $2,850 difference to the general ledger in Reconciliations. It is a count timing difference from the October cycle count and is expected to clear in November; it is separate from the $318,000 standards true-up.",
];
