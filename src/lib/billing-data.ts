import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/billing-data";
import * as manufacturing from "./worlds/manufacturing/billing-data";
import * as mining from "./worlds/mining/billing-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { plan, moduleSeats, moduleMonthly, modulesMonthlyTotal, monthlyTotal, activeSeats, licensedSeats, usageThisPeriod, paymentMethod, invoices, invoiceSummary, invoiceSections } = active;
export type { ModuleSeat, UsageItem, Invoice } from "./worlds/enterprise/billing-data";
