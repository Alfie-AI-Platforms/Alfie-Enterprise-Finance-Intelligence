// Capital Projects is a Mining pack module. In this workspace the module
// is not included, so the file exports the same names as the mining file
// with empty collections; the route renders a pack-not-included panel
// from moduleAvailable.

import type {
  CapitalProject,
  JvTieIn,
  ProjectsSummary,
} from "@/lib/worlds/mining/projects-data";

export const moduleAvailable = false;

export const projectsSummary: ProjectsSummary = {
  capexYtd: "",
  sustainingYtd: "",
  growthYtd: "",
  facilityDrawn: "",
  note: "",
};

export const capitalProjects: CapitalProject[] = [];

export const jvTieIn: JvTieIn = {
  entryId: "",
  statementShare: "",
  accruedShare: "",
  difference: "",
  status: "",
  points: [],
};

export const alfieProjectNotes: readonly string[] = [];
