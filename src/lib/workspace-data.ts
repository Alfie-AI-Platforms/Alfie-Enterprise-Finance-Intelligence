import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/workspace-data";
import * as manufacturing from "./worlds/manufacturing/workspace-data";
import * as mining from "./worlds/mining/workspace-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { seedConversations, conversationFolders, orgDocuments, documentPreviews, documentCategories, ingestionSteps, dataSources, sourceCategories, commonFields, sourceAudit, automations, automationCategories, executions, automationTemplates, submissionWorkflowSteps, chatSeedCloseReply, chatBoardPackReply, chatJournalReply, chatBillReply, chatReceivableReply, chatPlanningReply, chatCashReply, reportAskReplies, reportInsights, reportEntityFilterOptions, reportBuilderSources, agentConnectedSystems, agentRecentRuns, helpServices } = active;
export type { Conversation, OrgDocument, DataSourceStatus, DataSource, AutomationStatus, TriggerType, Automation, Execution, HelpService } from "./worlds/enterprise/workspace-data";
