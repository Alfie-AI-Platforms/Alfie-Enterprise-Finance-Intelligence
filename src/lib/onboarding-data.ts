import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/onboarding-data";
import * as manufacturing from "./worlds/manufacturing/onboarding-data";
import * as mining from "./worlds/mining/onboarding-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { onboardingGroups, onboardingTimeline, implementationTeam } = active;
export type { OnboardingItem, OnboardingGroup } from "./worlds/enterprise/onboarding-data";
