// Costing is a Manufacturing pack module. In this workspace the module is
// not included, so the file exports the same names as the manufacturing
// file with empty collections; the route renders a pack-not-included
// panel from moduleAvailable.

import type {
  CostingSummary,
  FlagshipAnalysis,
  StandardCostRow,
  StandardRevisionItem,
  VarianceComponent,
} from "@/lib/worlds/manufacturing/costing-data";

export const moduleAvailable = false;

export const costingSummary: CostingSummary = {
  octoberMaterialVariance: "",
  octoberTotalVariance: "",
  trueUpAmount: "",
  trueUpEntryId: "",
  note: "",
};

export const standardCosts: StandardCostRow[] = [];

export const varianceBridge: VarianceComponent[] = [];

export const flagshipAnalysis: FlagshipAnalysis = {
  title: "",
  entryId: "",
  status: "",
  intro: "",
  points: [],
  sources: [],
};

export const alfieCostingNotes: readonly string[] = [];

export const standardRevision: StandardRevisionItem[] = [];
