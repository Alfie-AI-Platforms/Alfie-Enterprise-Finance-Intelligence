import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/planning-data";
import * as manufacturing from "./worlds/manufacturing/planning-data";
import * as mining from "./worlds/mining/planning-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { planningRolePermissions, planningRoles, canPlanning, DIRECTOR_FORECAST_AUTHORITY, canApproveForecast, reviewStages, canPublish, kpis, monthlyRevenue, entities, planConstants, basePlanScenario, runPlanScenario, seedPlanScenarios, forecastReviews, boardRecord, forecastAccuracy, planningExceptions, planningDataSources, planningAudit, planningReportLibrary, scheduledPlanningReports, planningPrompts, planningOverview, planningApprovalImpact, planningReviewDefaults, planningGeneratedReport, planDownsideOverrides, planUpsideOverrides, scenarioCopy, planningAnalysisContext, planningAnalysisFollowUps, planningAnalysisPatterns, planningAnalysisReply } = active;
export type { PlanningRole, PlanningPermission, ReviewStage, ReviewStatus, MonthRow, EntityRow, PlanScenarioInputs, PlanScenarioResult, SeedPlanScenario, ForecastReview, PlanningException, PlanningEvent, PlanningReportItem, PlanningOverview, PlanningApprovalImpact, ScenarioCopy, AnalysisSection, AnalysisReply, PlanningAnalysisContext } from "./worlds/enterprise/planning-data";
