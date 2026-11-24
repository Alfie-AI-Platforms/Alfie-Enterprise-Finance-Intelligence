import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/receivables-data";
import * as manufacturing from "./worlds/manufacturing/receivables-data";
import * as mining from "./worlds/mining/receivables-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { customerStatuses, customers, getCustomer, cad, usd, fmt, seedCustomerAudit, entities, entityShortNames, customerSegments, erpName, flagshipCustomerId, newCustomerDefaults, receivablesMetrics, receivablesAnswers, slowingCustomerIds, priorityCustomerIds, collectionDraftFor, assessmentFor, reviewForCustomer, customerDocsFor, customerAuditFor, customerReplyFor } = active;
export type { CustomerStatus, ArCurrency, InvoiceStatus, ArInvoice, ArPayment, ArCustomer, ArAuditEvent, ReceivablesAnswer, DocSection, CustomerDoc, CustomerReply } from "./worlds/enterprise/receivables-data";
