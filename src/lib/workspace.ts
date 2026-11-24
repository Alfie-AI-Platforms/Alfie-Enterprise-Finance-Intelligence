// Workspace registry for the Alfie Enterprise Finance app.
//
// One app, several industry workspaces. The active workspace is stored in
// the browser (localStorage key below) and read once at module load; every
// data shim in src/lib selects its dataset from src/lib/worlds/<id>/.
// Switching workspace stores the choice and reloads at the app root so all
// module data re-resolves. In the real product a client only ever has one
// workspace, configured at onboarding; the switcher is a demo tool.

export type WorkspaceId = "enterprise" | "manufacturing" | "mining";

export interface WorkspaceInfo {
  id: WorkspaceId;
  company: string;
  companyShort: string;
  label: string;
  industry: string;
  userName: string;
  userFirstName: string;
  userInitials: string;
  userRole: string;
}

export const WORKSPACES: readonly WorkspaceInfo[] = [
  {
    id: "enterprise",
    company: "Meridian Group Inc.",
    companyShort: "Meridian Group",
    label: "Finance workspace",
    industry: "Enterprise Finance",
    userName: "Elena Brooks",
    userFirstName: "Elena",
    userInitials: "EB",
    userRole: "VP Finance",
  },
  {
    id: "manufacturing",
    company: "Northline Manufacturing Group Inc.",
    companyShort: "Northline Group",
    label: "Manufacturing workspace",
    industry: "Manufacturing",
    userName: "Sarah Mitchell",
    userFirstName: "Sarah",
    userInitials: "SM",
    userRole: "VP Finance",
  },
  {
    id: "mining",
    company: "Aurora Ridge Resources Inc.",
    companyShort: "Aurora Ridge",
    label: "Mining workspace",
    industry: "Mining",
    userName: "Claire Dubois",
    userFirstName: "Claire",
    userInitials: "CD",
    userRole: "VP Finance",
  },
];

const STORAGE_KEY = "alfie.workspace.v1";

export function getActiveWorkspaceId(): WorkspaceId {
  if (typeof window === "undefined") return "enterprise";
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "manufacturing" || raw === "mining" || raw === "enterprise") return raw;
  } catch {
    // storage is a convenience; fall through to the default workspace
  }
  return "enterprise";
}

export const activeWorkspaceId: WorkspaceId = getActiveWorkspaceId();

export const activeWorkspace: WorkspaceInfo =
  WORKSPACES.find((w) => w.id === activeWorkspaceId) ?? WORKSPACES[0]!;

export function setActiveWorkspace(id: WorkspaceId): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // see above
  }
  window.location.assign(import.meta.env.BASE_URL || "/");
}
