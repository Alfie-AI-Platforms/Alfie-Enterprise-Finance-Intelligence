import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/reports-data";
import * as manufacturing from "./worlds/manufacturing/reports-data";
import * as mining from "./worlds/mining/reports-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { reportKpis, performanceTrend, entityPerformance, moneyM, reportLibrary, reportContent, reportCategories, scheduledReports, reportAudit, executiveTargets } = active;
export type { ReportKpi, LibraryReport } from "./worlds/enterprise/reports-data";
