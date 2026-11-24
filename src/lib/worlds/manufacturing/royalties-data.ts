// Royalties is a Mining pack module. In this workspace the module is not
// included, so the file exports the same names as the mining file with
// empty collections; the route renders a pack-not-included panel from
// moduleAvailable.

import type {
  RoyaltiesSummary,
  RoyaltyObligation,
  RoyaltyProductionRow,
} from "@/lib/worlds/mining/royalties-data";

export const moduleAvailable = false;

export const royaltiesSummary: RoyaltiesSummary = {
  octoberTotal: "",
  accruedYtd: "",
  paidYtd: "",
  outstanding: "",
  note: "",
};

export const royaltyProduction: RoyaltyProductionRow[] = [];

export const royaltyObligations: RoyaltyObligation[] = [];

export const octoberRoyaltyTotal = 0;
export const accruedRoyaltyTotal = 0;
export const paidRoyaltyTotal = 0;

export const alfieRoyaltyNotes: readonly string[] = [];
