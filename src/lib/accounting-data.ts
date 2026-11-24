import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/accounting-data";
import * as manufacturing from "./worlds/manufacturing/accounting-data";
import * as mining from "./worlds/mining/accounting-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { entryStatuses, entities, entries, getEntry, money, seedAudit, flagshipEntryId, flagshipKeywords, flagshipPrompt, accountingMetrics, accountingExamples, accountingAnswers, newEntryDefaults, erpName, entryPrompts, entryWorkflow, flagshipIssue, flagshipRouteNext, flagshipMissingItems, flagshipReviewBar } = active;
export type { EntryStatus, Priority, EntryLine, DocSection, EntryEvidence, EntryAnalysis, JournalEntry, AuditEvent, AccountingAnswer, AccountingAnswers } from "./worlds/enterprise/accounting-data";
