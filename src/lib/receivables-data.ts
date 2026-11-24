import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/receivables-data";
import * as manufacturing from "./worlds/manufacturing/receivables-data";
import * as mining from "./worlds/mining/receivables-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { customerStatuses, customers, getCustomer, cad, usd, fmt, seedCustomerAudit } = active;
export type { CustomerStatus, ArCurrency, InvoiceStatus, ArInvoice, ArPayment, ArCustomer, ArAuditEvent } from "./worlds/enterprise/receivables-data";
