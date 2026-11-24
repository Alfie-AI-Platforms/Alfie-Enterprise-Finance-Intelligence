import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/workspace-data";
import * as manufacturing from "./worlds/manufacturing/workspace-data";
import * as mining from "./worlds/mining/workspace-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { seedConversations, conversationFolders, orgDocuments, documentPreviews, documentCategories, ingestionSteps, dataSources, sourceCategories, commonFields, sourceAudit, automations, automationCategories, executions, automationTemplates, submissionWorkflowSteps } = active;
export type { Conversation, OrgDocument, DataSourceStatus, DataSource, AutomationStatus, TriggerType, Automation, Execution } from "./worlds/enterprise/workspace-data";
