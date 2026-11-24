import { activeWorkspaceId } from "./workspace";
import * as enterprise from "./worlds/enterprise/search-data";
import * as manufacturing from "./worlds/manufacturing/search-data";
import * as mining from "./worlds/mining/search-data";

const active = activeWorkspaceId === "manufacturing" ? manufacturing : activeWorkspaceId === "mining" ? mining : enterprise;

export const { searchIndex, searchEntries } = active;
export type { SearchLink, SearchEntry } from "./worlds/enterprise/search-data";
