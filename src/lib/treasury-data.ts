import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/treasury-data";
import * as manufacturing from "./worlds/manufacturing/treasury-data";
import * as mining from "./worlds/mining/treasury-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { reportingFxRate, bankAccounts, totalCashCad, forecastWeeks, forecastNote, treasuryScenarios, termLoan, usdExposure, treasuryCopy } = active;
export type { BankAccount, ForecastWeek, TreasuryScenario, TreasuryCopy } from "./worlds/enterprise/treasury-data";
