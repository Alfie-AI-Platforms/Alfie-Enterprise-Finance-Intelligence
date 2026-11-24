import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/admin-data";
import * as manufacturing from "./worlds/manufacturing/admin-data";
import * as mining from "./worlds/mining/admin-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { orgUsers, roleTemplates, departments, orgGroups, accessReviews, platformModules, permissionActions, baselineAccess, approvalAuthorities, delegations, sodRules, agentProfiles, auditEvents, platformServices, retentionPolicies, orgProfile, alfieInstructions, openIncident, inviteManagers, automationAgentChoices, automationSourceChoices } = active;
export type { UserStatus, OrgUser, OrgProfile } from "./worlds/enterprise/admin-data";
