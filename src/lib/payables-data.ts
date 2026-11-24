import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/payables-data";
import * as manufacturing from "./worlds/manufacturing/payables-data";
import * as mining from "./worlds/mining/payables-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { billStatuses, bills, getBill, cad, usd, fmt, compactFmt, approverFor, seedBillAudit, entities, entityShortNames, erpName, treasurerName, flagshipBillId, duplicateBillId, newBillDefaults, payablesMetrics, payablesExamples, payablesAnswers, payablesVendorKeywords, payablesVendorName, billPrompts, detailForBill, billAuditFor, duplicateOutcome, billReplyFor } = active;
export type { BillStatus, BillPriority, MatchStatus, BillCurrency, Bill, BillAuditEvent, PayablesAnswer, DocSection, BillDoc, BillReply, BillMatchRow, BillPolicyRow, BillDetail } from "./worlds/enterprise/payables-data";
