import type { OrgUser, UserStatus } from "@/lib/worlds/enterprise/admin-data";

export type { OrgUser, UserStatus };

export const orgUsers: OrgUser[] = [
  {
    id: "USR-001",
    name: "Sarah Mitchell",
    email: "sarah.mitchell@northlinemfg.com",
    employeeId: "NL-1001",
    title: "VP Finance",
    department: "Finance",
    roles: ["Organization Administrator"],
    manager: "David Osei",
    status: "Active",
    invitation: "Accepted",
    added: "Jan 06, 2026",
    lastLogin: "Today, 09:41 AM",
    auth: "SSO + MFA",
    sessions: 2,
  },
  {
    id: "USR-002",
    name: "David Osei",
    email: "david.osei@northlinemfg.com",
    employeeId: "NL-1002",
    title: "Chief Financial Officer",
    department: "Executive",
    roles: ["Chief Financial Officer", "Approver (group)"],
    manager: "Executive Management",
    status: "Active",
    invitation: "Accepted",
    added: "Jan 06, 2026",
    lastLogin: "Today, 08:15 AM",
    auth: "SSO + MFA + hardware key",
    sessions: 1,
  },
  {
    id: "USR-003",
    name: "Priya Nair",
    email: "priya.nair@northlinemfg.com",
    employeeId: "NL-1014",
    title: "Controller",
    department: "Accounting",
    roles: ["Controller"],
    manager: "Sarah Mitchell",
    status: "Active",
    invitation: "Accepted",
    added: "Jan 06, 2026",
    lastLogin: "Today, 09:02 AM",
    auth: "SSO + MFA",
    sessions: 1,
  },
  {
    id: "USR-004",
    name: "Lucas Meyer",
    email: "lucas.meyer@northlinemfg.com",
    employeeId: "NL-1022",
    title: "Manager, Cost Accounting",
    department: "Accounting",
    roles: ["Cost Accounting Manager"],
    manager: "Priya Nair",
    status: "Active",
    invitation: "Accepted",
    added: "Jan 12, 2026",
    lastLogin: "Today, 10:11 AM",
    auth: "SSO + MFA",
    sessions: 1,
  },
  {
    id: "USR-005",
    name: "Anita Roy",
    email: "anita.roy@northlinemfg.com",
    employeeId: "NL-1031",
    title: "Plant Controller, Guelph",
    department: "Accounting",
    roles: ["Plant Controller"],
    manager: "Priya Nair",
    status: "Active",
    invitation: "Accepted",
    added: "Jan 12, 2026",
    lastLogin: "Yesterday, 05:48 PM",
    auth: "SSO + MFA",
    sessions: 0,
  },
  {
    id: "USR-006",
    name: "Kevin Doyle",
    email: "kevin.doyle@northlinemfg.com",
    employeeId: "NL-1040",
    title: "AP Manager",
    department: "Payables",
    roles: ["AP Manager"],
    manager: "Sarah Mitchell",
    status: "Active",
    invitation: "Accepted",
    added: "Jan 06, 2026",
    lastLogin: "Today, 07:57 AM",
    auth: "SSO + MFA",
    sessions: 1,
  },
  {
    id: "USR-007",
    name: "Julia Santos",
    email: "julia.santos@northlinemfg.com",
    employeeId: "NL-1052",
    title: "FP&A Manager",
    department: "Planning",
    roles: ["FP&A Manager"],
    manager: "David Osei",
    status: "Active",
    invitation: "Accepted",
    added: "Feb 02, 2026",
    lastLogin: "Today, 08:44 AM",
    auth: "SSO + MFA",
    sessions: 1,
  },
  {
    id: "USR-008",
    name: "Mark Feldman",
    email: "mark.feldman@northlinemfg.com",
    employeeId: "NL-1063",
    title: "Treasurer",
    department: "Treasury",
    roles: ["Treasurer"],
    manager: "David Osei",
    status: "Active",
    invitation: "Accepted",
    added: "Jan 06, 2026",
    lastLogin: "Today, 07:30 AM",
    auth: "SSO + MFA",
    sessions: 1,
  },
  {
    id: "USR-009",
    name: "Omar Haddad",
    email: "omar.haddad@northlinemfg.com",
    employeeId: "NL-1071",
    title: "Compliance and Security Lead",
    department: "Compliance",
    roles: ["Security Administrator", "Compliance Officer"],
    manager: "David Osei",
    status: "Active",
    invitation: "Accepted",
    added: "Jan 06, 2026",
    lastLogin: "Today, 07:12 AM",
    auth: "SSO + MFA + hardware key",
    sessions: 1,
  },
  {
    id: "USR-010",
    name: "Tom Becker",
    email: "tom.becker@northlinemfg.com",
    employeeId: "NL-1080",
    title: "Senior Accountant",
    department: "Accounting",
    roles: ["Senior Accountant"],
    manager: "Priya Nair",
    status: "Active",
    invitation: "Accepted",
    added: "Feb 16, 2026",
    lastLogin: "Today, 08:58 AM",
    auth: "SSO + MFA",
    sessions: 1,
  },
  {
    id: "USR-011",
    name: "Hana Kim",
    email: "hana.kim@northlinemfg.com",
    employeeId: "NL-1088",
    title: "AP Specialist",
    department: "Payables",
    roles: ["AP Specialist"],
    manager: "Kevin Doyle",
    status: "Active",
    invitation: "Accepted",
    added: "Mar 02, 2026",
    lastLogin: "Oct 14, 2026",
    auth: "SSO + MFA",
    sessions: 0,
  },
  {
    id: "USR-012",
    name: "Erin Walsh",
    email: "erin.walsh@northlinemfg.com",
    employeeId: "NL-1095",
    title: "AR Specialist",
    department: "Receivables",
    roles: ["AR Specialist"],
    manager: "Sarah Mitchell",
    status: "Invited",
    invitation: "Sent Nov 14, expires in 5 days",
    added: "Nov 14, 2026",
    lastLogin: "Never",
    auth: "Not activated",
    sessions: 0,
  },
  {
    id: "USR-013",
    name: "Chris Novak",
    email: "chris.novak@northlinemfg.com",
    employeeId: "NL-1102",
    title: "Accountant",
    department: "Accounting",
    roles: ["Accountant"],
    manager: "Priya Nair",
    status: "Suspended",
    invitation: "Accepted",
    added: "Apr 13, 2026",
    lastLogin: "Oct 28, 2026",
    auth: "SSO + MFA, sessions revoked",
    sessions: 0,
  },
];

export const roleTemplates = [
  "Organization Owner",
  "Organization Administrator",
  "Security Administrator",
  "Department Administrator",
  "Department Manager",
  "Chief Financial Officer",
  "Controller",
  "Plant Controller",
  "Cost Accounting Manager",
  "Senior Accountant",
  "Accountant",
  "AP Manager",
  "AP Specialist",
  "AR Specialist",
  "Treasurer",
  "FP&A Manager",
  "FP&A Analyst",
  "Reporting Analyst",
  "Compliance Officer",
  "Read-Only Employee",
];

export const departments = [
  "Accounting",
  "Payables",
  "Receivables",
  "Treasury",
  "Planning",
  "Finance",
  "Executive",
  "Compliance",
];

export const orgGroups = [
  {
    name: "Accounting Close Team",
    members: 6,
    manager: "Priya Nair",
    usedFor: "Close tasks, journal approvals",
  },
  {
    name: "AP Approvers",
    members: 3,
    manager: "Kevin Doyle",
    usedFor: "Bill approvals above $10,000",
  },
  {
    name: "Finance Leadership",
    members: 4,
    manager: "David Osei",
    usedFor: "Executive approvals, board reporting",
  },
  { name: "Treasury Team", members: 3, manager: "Mark Feldman", usedFor: "Bank accounts, covenant reporting" },
  {
    name: "FP&A Team",
    members: 4,
    manager: "Julia Santos",
    usedFor: "Forecast reviews, budget cycles",
  },
  {
    name: "Plant Controllers",
    members: 3,
    manager: "Anita Roy",
    usedFor: "Plant close status, plant financial statements",
  },
  {
    name: "Compliance and Risk",
    members: 3,
    manager: "Omar Haddad",
    usedFor: "Access reviews, security alerts",
  },
];

export const accessReviews = [
  {
    name: "Q4 2026 privileged access review",
    owner: "Sarah Mitchell",
    scope: "All users with administrator or approval roles",
    due: "Nov 27, 2026",
    status: "In Progress",
    progress: "16 of 24 reviewed",
  },
  {
    name: "Accounting department access review",
    owner: "Priya Nair",
    scope: "Accounting department, 8 users",
    due: "Dec 04, 2026",
    status: "In Progress",
    progress: "4 of 8 reviewed",
  },
  {
    name: "Inactive account check",
    owner: "System, assigned to Sarah Mitchell",
    scope: "No login in 30 days: 1 account (Hana Kim)",
    due: "Nov 20, 2026",
    status: "Action Required",
    progress: "1 account flagged",
  },
  {
    name: "Direct permission assignments",
    owner: "Sarah Mitchell",
    scope: "2 users hold direct permissions outside their roles",
    due: "Nov 27, 2026",
    status: "Not Started",
    progress: "2 assignments to confirm or revoke",
  },
];

export const platformModules = [
  "Accounting",
  "Close",
  "Reconciliations",
  "Payables",
  "Receivables",
  "Planning",
  "Treasury",
  "Costing",
  "Inventory",
  "Reports",
  "Chat",
  "Documents",
  "Data Sources",
  "Automations",
  "Users & Access",
  "Policies & Permissions",
  "Settings",
];
export const permissionActions = [
  "View",
  "Create",
  "Edit",
  "Delete",
  "Approve",
  "Execute",
  "Administer",
];

// Baseline effective access per role family, used by the module matrix and the permission tester.
export function baselineAccess(role: string, module: string, action: string): boolean {
  if (role === "Organization Owner" || role === "Organization Administrator") return true;
  if (role === "Security Administrator")
    return module === "Users & Access" ||
      module === "Policies & Permissions" ||
      module === "Settings"
      ? true
      : action === "View";
  if (role === "Read-Only Employee")
    return (
      action === "View" &&
      module !== "Users & Access" &&
      module !== "Policies & Permissions" &&
      module !== "Settings"
    );
  if (role === "Compliance Officer") return action === "View" || module === "Documents";
  if (role === "Chief Financial Officer") {
    if (module === "Users & Access" || module === "Policies & Permissions" || module === "Settings")
      return action === "View";
    return action === "View" || action === "Approve" || module === "Reports" || module === "Planning" || module === "Treasury"
      ? action !== "Administer"
      : false;
  }
  const home: Record<string, string> = {
    Controller: "Accounting",
    "Plant Controller": "Accounting",
    "Cost Accounting Manager": "Costing",
    "Senior Accountant": "Accounting",
    Accountant: "Accounting",
    "AP Manager": "Payables",
    "AP Specialist": "Payables",
    "AR Specialist": "Receivables",
    Treasurer: "Treasury",
    "FP&A Manager": "Planning",
    "FP&A Analyst": "Planning",
    "Reporting Analyst": "Reports",
    "Department Manager": "",
    "Department Administrator": "",
  };
  const shared = ["Chat", "Documents"];
  if (shared.includes(module)) return action === "View" || action === "Create";
  if (module === "Reports")
    return action === "View" || (role === "Reporting Analyst" && action !== "Administer");
  if (home[role] && module === home[role]) {
    if (role.endsWith("Manager") || role === "Controller" || role.endsWith("Director"))
      return action !== "Administer";
    return ["View", "Create", "Edit", "Execute"].includes(action);
  }
  if (module === "Close" && home[role] === "Accounting") return action !== "Administer";
  if (module === "Reconciliations" && home[role] === "Accounting") return action !== "Administer";
  if (module === "Inventory" && (home[role] === "Accounting" || home[role] === "Costing"))
    return action !== "Administer";
  if (module === "Costing" && home[role] === "Accounting") return action !== "Administer";
  if (module === "Data Sources" || module === "Automations") return action === "View";
  return false;
}

export const approvalAuthorities = [
  {
    action: "Bill payment approval",
    levels: "AP Specialist prepares · AP Manager up to $50,000 · VP Finance above $50,000",
    chain: "AP Specialist → AP Manager → VP Finance",
  },
  {
    action: "Journal entry approval",
    levels: "Preparer can never approve their own entry (segregation of duties) · Controller approves standard entries",
    chain: "Preparer → Controller",
  },
  {
    action: "Post-close adjustment approval",
    levels: "Controller reviews all post-close adjustments · CFO approval above $10,000",
    chain: "Controller → Chief Financial Officer",
  },
  {
    action: "Standard cost revision approval",
    levels: "Cost Accounting prepares the revision · Controller reviews · CFO approves before new standards take effect",
    chain: "Cost Accounting Manager → Controller → Chief Financial Officer",
  },
  {
    action: "Bank payment release",
    levels: "Treasurer prepares the payment run · A second authorized signer releases it (dual control)",
    chain: "Treasurer → Second signer",
  },
  {
    action: "Financial period close",
    levels: "Controller sign off · CFO final sign off",
    chain: "Controller → Chief Financial Officer",
  },
  {
    action: "Credit hold and credit limit changes",
    levels: "AR prepares the recommendation · VP Finance approves",
    chain: "AR Specialist → VP Finance",
  },
  {
    action: "Forecast review approval",
    levels: "FP&A Manager prepares · CFO approves before the forecast is published",
    chain: "FP&A Manager → Chief Financial Officer",
  },
  {
    action: "Document publication",
    levels: "Owner submits · assigned reviewer approves",
    chain: "Owner → Reviewer",
  },
  {
    action: "Automation activation",
    levels: "Creator configures · separate administrator or approver activates",
    chain: "Creator → Approver → Active",
  },
];

export const delegations = [
  {
    from: "Priya Nair (Controller)",
    to: "Chris Novak (Accountant)",
    scope: "Journal entry approvals for standard entries",
    period: "Delegated Oct 20, revoked Oct 28, 2026 when the account was suspended",
    status: "Revoked",
  },
  {
    from: "Kevin Doyle (AP Manager)",
    to: "Hana Kim (AP Specialist, acting)",
    scope: "Bill approvals up to $10,000 only, Payables",
    period: "Nov 10 to Nov 21, 2026",
    status: "Active",
  },
];

export const sodRules = [
  {
    rule: "Bill creator cannot approve the same bill",
    appliesTo: "Payables",
    status: "Enforced",
  },
  {
    rule: "Journal entry preparer cannot approve their own entry",
    appliesTo: "Accounting",
    status: "Enforced",
  },
  {
    rule: "Payment creator cannot release the same payment",
    appliesTo: "Treasury",
    status: "Enforced",
  },
  {
    rule: "Automation creator cannot be the sole activator of a sensitive automation",
    appliesTo: "Automations",
    status: "Enforced",
  },
  {
    rule: "No user can grant themselves additional privileges",
    appliesTo: "Platform wide",
    status: "Enforced",
  },
  {
    rule: "Accountant cannot both post to and reconcile the same bank account in one period",
    appliesTo: "Reconciliations",
    status: "Warning only, under review",
  },
];

export const agentProfiles = [
  {
    name: "Reconciliation Agent",
    can: [
      "Read authorized bank and ledger records",
      "Match transactions and isolate exceptions",
      "Prepare reconciliations and exception explanations",
    ],
    cannot: [
      "Post correcting entries or clear its own exceptions",
      "Access accounts outside the operating user's or automation's permissions",
    ],
    approval: "Correcting entries, exception write-offs",
    external: "No external communication",
  },
  {
    name: "AP Processing Agent",
    can: [
      "Read authorized vendor bills, purchase orders and receiving records",
      "Run the three-way match and flag variances",
      "Prepare approval packages by amount and policy",
    ],
    cannot: [
      "Approve or pay a bill, unless an explicitly approved workflow grants that authority",
      "Change vendor bank details or payment terms",
    ],
    approval: "Bill approvals above thresholds, any payment run",
    external: "No vendor communication without approval",
  },
  {
    name: "Close Agent",
    can: [
      "Read close checklists, subledger status and account balances",
      "Draft flux explanations from the underlying movements",
      "Prepare journal entries for human review",
    ],
    cannot: [
      "Approve its own financial actions or post journals silently",
      "Sign off a close step on behalf of a person",
    ],
    approval: "Journal postings, post-close adjustments, period close steps",
    external: "No external communication",
  },
];

export const auditEvents = [
  {
    time: "Nov 16, 09:12",
    type: "Automation",
    actor: "Sarah Mitchell",
    resource: "Automation AUT-10 Sync Failure Watch",
    detail: "Status changed Draft → In Testing",
    outcome: "Recorded",
  },
  {
    time: "Nov 15, 08:47",
    type: "Data Source",
    actor: "Sarah Mitchell",
    resource: "Plex MES Feed",
    detail: "Sync failure investigated, Plant 2 usage variances flagged as estimated",
    outcome: "Recorded",
  },
  {
    time: "Nov 13, 16:20",
    type: "Permission",
    actor: "Omar Haddad",
    resource: "Role: Accountant",
    detail: "Execute on Data Sources changed from Allowed → Not allowed",
    outcome: "Applied",
  },
  {
    time: "Nov 13, 11:15",
    type: "Data Source",
    actor: "Sarah Mitchell",
    resource: "Chase Bank Feed",
    detail: "Removed from general Chat, reporting kept",
    outcome: "Applied",
  },
  {
    time: "Nov 14, 09:03",
    type: "User",
    actor: "Sarah Mitchell",
    resource: "Erin Walsh",
    detail: "Invitation sent, AR Specialist role, expires in 7 days",
    outcome: "Sent",
  },
  {
    time: "Nov 10, 14:44",
    type: "Document",
    actor: "Lucas Meyer",
    resource: "DOC-1008 Plant 3 Chart of Accounts Mapping",
    detail: "Uploaded and stored as Draft v1.0, classification Confidential",
    outcome: "Recorded",
  },
  {
    time: "Oct 28, 10:30",
    type: "User",
    actor: "Omar Haddad",
    resource: "Chris Novak",
    detail: "Account suspended, sessions revoked, delegation revoked",
    outcome: "Applied",
  },
  {
    time: "Oct 28, 09:14",
    type: "Authentication",
    actor: "System",
    resource: "Chris Novak",
    detail: "3 failed login attempts before suspension",
    outcome: "Flagged",
  },
  {
    time: "Nov 10, 08:00",
    type: "Data Source",
    actor: "System",
    resource: "Sage 300 (Plant 3)",
    detail: "Authentication failed, credential expired",
    outcome: "Flagged",
  },
  {
    time: "Oct 15, 13:02",
    type: "AI Configuration",
    actor: "Sarah Mitchell",
    resource: "Alfie organizational instructions",
    detail: "Version 5 → 6, escalation wording updated",
    outcome: "Applied",
  },
];

export const platformServices = [
  { name: "Application services", status: "Operational", note: "All modules responding normally" },
  {
    name: "AI agent availability",
    status: "Operational",
    note: "8 agents enabled, 2 in draft or paused by configuration",
  },
  {
    name: "Integration health",
    status: "Degraded",
    note: "Plex MES sync stale 2 days, Sage 300 (Plant 3) credential expired",
  },
  {
    name: "Data synchronization",
    status: "Degraded",
    note: "5 of 7 sources current, 1 stale, 1 authentication expired",
  },
  {
    name: "Automation execution",
    status: "Operational",
    note: "1 execution awaiting approval, 1 failed this week with owner notified",
  },
  { name: "Document processing", status: "Operational", note: "Ingestion and OCR queue clear" },
  {
    name: "Background jobs and API",
    status: "Operational",
    note: "No elevated error rates in the last 24 hours",
  },
];

export const retentionPolicies = [
  {
    data: "Conversation history",
    retention: "2 years, then archive",
    hold: "Legal hold supported",
  },
  {
    data: "Documents",
    retention: "Per document type schedule, 7 years for financial records",
    hold: "Legal hold blocks deletion",
  },
  {
    data: "Audit records",
    retention: "7 years, tamper evident",
    hold: "Never deletable by administrators",
  },
  { data: "Automation execution history", retention: "3 years", hold: "Legal hold supported" },
  {
    data: "Integration logs",
    retention: "1 year",
    hold: "Security investigations extend on request",
  },
  {
    data: "Generated reports",
    retention: "Per report type, Finance reports 7 years",
    hold: "Legal hold supported",
  },
  {
    data: "User access history",
    retention: "Kept after deactivation, 7 years",
    hold: "Preserved with the user record",
  },
];

// ---------- Settings, users and automations page content ----------
import type { OrgProfile } from "@/lib/worlds/enterprise/admin-data";

export type { OrgProfile };

export const orgProfile: OrgProfile = {
  name: "Northline Group",
  legalName: "Northline Manufacturing Group Inc.",
  identifier: "NL-ORG-2026-001",
  industry: "Manufacturing",
  address: "125 Woodlawn Road West, Guelph, ON",
  email: "finance@northlinemfg.com",
  phone: "+1 519 555 0142",
  domain: "northlinemfg.com",
  erpName: "Epicor Kinetic",
};

export const alfieInstructions =
  "Use Northline Group terminology. Refer to the three plants by their full names. Escalate any journal entry unapproved for more than 2 business days to the Controller. Never present sample or stale data as current: name the source and its sync time.";

export const openIncident =
  "Open incident: Plex MES synchronization for Plant 2 has been stale for 2 days, and the Sage 300 credential for Plant 3 has expired. Owner: Sarah Mitchell. Alfie marks data from these sources as stale wherever it would be used.";

export const inviteManagers = ["Sarah Mitchell", "Priya Nair", "Kevin Doyle", "Julia Santos"];

export const automationAgentChoices = [
  "Reconciliation Agent",
  "Close Agent",
  "AP Processing Agent",
  "AR Collections Agent",
  "FP&A Analysis Agent",
  "Treasury Agent",
  "Compliance Monitoring Agent",
  "Cost Variance Agent",
];

export const automationSourceChoices = [
  "Epicor Kinetic",
  "TD Bank Feed",
  "Chase Bank Feed",
  "Plex MES",
  "Sage 300, Plant 3",
  "SharePoint Document Library",
];
