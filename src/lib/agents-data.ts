import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/agents-data";
import * as manufacturing from "./worlds/manufacturing/agents-data";
import * as mining from "./worlds/mining/agents-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { agents, knowledgeOptions, dataAccessOptions, actionOptions, workflowBlocks, agentTestScenario } = active;
export type { AgentStatus, AgentTestScenario } from "./worlds/enterprise/agents-data";
