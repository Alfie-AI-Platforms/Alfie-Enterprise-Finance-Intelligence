import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/payables-data";
import * as manufacturing from "./worlds/manufacturing/payables-data";
import * as mining from "./worlds/mining/payables-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { billStatuses, bills, getBill, cad, usd, fmt, compactFmt, approverFor, seedBillAudit } = active;
export type { BillStatus, BillPriority, MatchStatus, BillCurrency, Bill, BillAuditEvent } from "./worlds/enterprise/payables-data";
