import type { OrgUser, UserStatus } from "@/lib/worlds/enterprise/admin-data";

export type { OrgUser, UserStatus };

export const orgUsers: OrgUser[] = [
  {
    id: "USR-001",
    name: "Claire Dubois",
    email: "claire.dubois@auroraridge.com",
    employeeId: "AR-1001",
    title: "VP Finance",
    department: "Finance",
    roles: ["Organization Administrator"],
    manager: "Robert Hale",
    status: "Active",
    invitation: "Accepted",
    added: "Jan 06, 2026",
    lastLogin: "Today, 09:41 AM",
    auth: "SSO + MFA",
    sessions: 2,
  },
  {
    id: "USR-002",
    name: "Robert Hale",
    email: "robert.hale@auroraridge.com",
    employeeId: "AR-1002",
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
    name: "Nadia Hassan",
    email: "nadia.hassan@auroraridge.com",
    employeeId: "AR-1014",
    title: "Controller",
    department: "Accounting",
    roles: ["Controller"],
    manager: "Claire Dubois",
    status: "Active",
    invitation: "Accepted",
    added: "Jan 06, 2026",
    lastLogin: "Today, 09:02 AM",
    auth: "SSO + MFA",
    sessions: 1,
  },
  {
    id: "USR-004",
    name: "Peter Lindqvist",
    email: "peter.lindqvist@auroraridge.com",
    employeeId: "AR-1022",
    title: "Mine Controller, Keno Ridge",
    department: "Accounting",
    roles: ["Mine Controller"],
    manager: "Nadia Hassan",
    status: "Active",
    invitation: "Accepted",
    added: "Jan 12, 2026",
    lastLogin: "Today, 10:11 AM",
    auth: "SSO + MFA",
    sessions: 1,
  },
  {
    id: "USR-005",
    name: "Susan Park",
    email: "susan.park@auroraridge.com",
    employeeId: "AR-1031",
    title: "AP Lead",
    department: "Payables",
    roles: ["AP Lead"],
    manager: "Claire Dubois",
    status: "Active",
    invitation: "Accepted",
    added: "Jan 12, 2026",
    lastLogin: "Yesterday, 05:48 PM",
    auth: "SSO + MFA",
    sessions: 0,
  },
  {
    id: "USR-006",
    name: "Angela Ruiz",
    email: "angela.ruiz@auroraridge.com",
    employeeId: "AR-1040",
    title: "Treasurer",
    department: "Treasury",
    roles: ["Treasurer"],
    manager: "Robert Hale",
    status: "Active",
    invitation: "Accepted",
    added: "Jan 06, 2026",
    lastLogin: "Today, 07:57 AM",
    auth: "SSO + MFA",
    sessions: 1,
  },
  {
    id: "USR-007",
    name: "George Mensah",
    email: "george.mensah@auroraridge.com",
    employeeId: "AR-1052",
    title: "Director, Planning and Analysis",
    department: "Planning",
    roles: ["Planning Director"],
    manager: "Robert Hale",
    status: "Active",
    invitation: "Accepted",
    added: "Feb 02, 2026",
    lastLogin: "Today, 08:44 AM",
    auth: "SSO + MFA",
    sessions: 1,
  },
  {
    id: "USR-008",
    name: "Ingrid Sorensen",
    email: "ingrid.sorensen@auroraridge.com",
    employeeId: "AR-1063",
    title: "Compliance and Security Lead",
    department: "Compliance",
    roles: ["Security Administrator", "Compliance Officer"],
    manager: "Robert Hale",
    status: "Active",
    invitation: "Accepted",
    added: "Jan 06, 2026",
    lastLogin: "Today, 07:30 AM",
    auth: "SSO + MFA + hardware key",
    sessions: 1,
  },
  {
    id: "USR-009",
    name: "Mark Delaney",
    email: "mark.delaney@auroraridge.com",
    employeeId: "AR-1071",
    title: "Senior Accountant",
    department: "Accounting",
    roles: ["Senior Accountant"],
    manager: "Nadia Hassan",
    status: "Active",
    invitation: "Accepted",
    added: "Feb 16, 2026",
    lastLogin: "Today, 08:58 AM",
    auth: "SSO + MFA",
    sessions: 1,
  },
  {
    id: "USR-010",
    name: "Karen White",
    email: "karen.white@auroraridge.com",
    employeeId: "AR-1080",
    title: "AP Specialist",
    department: "Payables",
    roles: ["AP Specialist"],
    manager: "Susan Park",
    status: "Active",
    invitation: "Accepted",
    added: "Mar 02, 2026",
    lastLogin: "Oct 16, 2026",
    auth: "SSO + MFA",
    sessions: 0,
  },
  {
    id: "USR-011",
    name: "Sam Whitaker",
    email: "sam.whitaker@auroraridge.com",
    employeeId: "AR-1088",
    title: "Receivables Analyst",
    department: "Receivables",
    roles: ["AR Specialist"],
    manager: "Claire Dubois",
    status: "Invited",
    invitation: "Sent Nov 14, expires in 5 days",
    added: "Nov 14, 2026",
    lastLogin: "Never",
    auth: "Not activated",
    sessions: 0,
  },
  {
    id: "USR-012",
    name: "Paul Girard",
    email: "paul.girard@auroraridge.com",
    employeeId: "AR-1095",
    title: "Accountant",
    department: "Accounting",
    roles: ["Accountant"],
    manager: "Nadia Hassan",
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
  "Mine Controller",
  "Senior Accountant",
  "Accountant",
  "AP Lead",
  "AP Specialist",
  "AR Specialist",
  "Treasurer",
  "Planning Director",
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
    manager: "Nadia Hassan",
    usedFor: "Close tasks, journal approvals",
  },
  {
    name: "AP Approvers",
    members: 3,
    manager: "Susan Park",
    usedFor: "Bill approvals above $10,000",
  },
  {
    name: "Finance Leadership",
    members: 4,
    manager: "Robert Hale",
    usedFor: "Executive approvals, board reporting",
  },
  { name: "Treasury Team", members: 3, manager: "Angela Ruiz", usedFor: "Bank accounts, covenant reporting" },
  {
    name: "Planning and Analysis Team",
    members: 4,
    manager: "George Mensah",
    usedFor: "Forecast reviews, budget cycles, guidance",
  },
  {
    name: "Site Controllers",
    members: 3,
    manager: "Peter Lindqvist",
    usedFor: "Site close status, site financial statements",
  },
  {
    name: "Compliance and Risk",
    members: 3,
    manager: "Ingrid Sorensen",
    usedFor: "Access reviews, security alerts",
  },
];

export const accessReviews = [
  {
    name: "Q4 2026 privileged access review",
    owner: "Claire Dubois",
    scope: "All users with administrator or approval roles",
    due: "Nov 27, 2026",
    status: "In Progress",
    progress: "15 of 23 reviewed",
  },
  {
    name: "Accounting department access review",
    owner: "Nadia Hassan",
    scope: "Accounting department, 8 users",
    due: "Dec 04, 2026",
    status: "In Progress",
    progress: "4 of 8 reviewed",
  },
  {
    name: "Inactive account check",
    owner: "System, assigned to Claire Dubois",
    scope: "No login in 30 days: 1 account (Karen White)",
    due: "Nov 20, 2026",
    status: "Action Required",
    progress: "1 account flagged",
  },
  {
    name: "Direct permission assignments",
    owner: "Claire Dubois",
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
  "Capital Projects",
  "Royalties",
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
    "Mine Controller": "Accounting",
    "Senior Accountant": "Accounting",
    Accountant: "Accounting",
    "AP Lead": "Payables",
    "AP Specialist": "Payables",
    "AR Specialist": "Receivables",
    Treasurer: "Treasury",
    "Planning Director": "Planning",
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
    if (role.endsWith("Lead") || role === "Controller" || role.endsWith("Director"))
      return action !== "Administer";
    return ["View", "Create", "Edit", "Execute"].includes(action);
  }
  if (module === "Close" && home[role] === "Accounting") return action !== "Administer";
  if (module === "Reconciliations" && home[role] === "Accounting") return action !== "Administer";
  if (module === "Capital Projects" && (home[role] === "Accounting" || home[role] === "Planning"))
    return action !== "Administer";
  if (module === "Royalties" && home[role] === "Accounting") return action !== "Administer";
  if (module === "Data Sources" || module === "Automations") return action === "View";
  return false;
}

export const approvalAuthorities = [
  {
    action: "Bill payment approval",
    levels: "AP Specialist prepares · AP Lead up to $50,000 · VP Finance above $50,000",
    chain: "AP Specialist → AP Lead → VP Finance",
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
    action: "JV statement dispute approval",
    levels: "Controller prepares the query to the operator · CFO approves before a disputed amount is withheld",
    chain: "Controller → Chief Financial Officer",
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
    action: "Shipment hold and credit limit changes",
    levels: "Receivables prepares the recommendation · VP Finance approves",
    chain: "AR Specialist → VP Finance",
  },
  {
    action: "Forecast and guidance approval",
    levels: "Director, Planning and Analysis prepares · CFO approves before guidance is published",
    chain: "Planning Director → Chief Financial Officer",
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
    from: "Nadia Hassan (Controller)",
    to: "Paul Girard (Accountant)",
    scope: "Journal entry approvals for standard entries",
    period: "Delegated Oct 20, revoked Oct 28, 2026 when the account was suspended",
    status: "Revoked",
  },
  {
    from: "Susan Park (AP Lead)",
    to: "Karen White (AP Specialist, acting)",
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
    actor: "Claire Dubois",
    resource: "Automation AUT-10 Sync Failure Watch",
    detail: "Status changed Draft → In Testing",
    outcome: "Recorded",
  },
  {
    time: "Nov 15, 08:47",
    type: "Data Source",
    actor: "Claire Dubois",
    resource: "ADP Payroll",
    detail: "Sync failure investigated, payroll accrual flagged as estimated",
    outcome: "Recorded",
  },
  {
    time: "Nov 13, 16:20",
    type: "Permission",
    actor: "Ingrid Sorensen",
    resource: "Role: Accountant",
    detail: "Execute on Data Sources changed from Allowed → Not allowed",
    outcome: "Applied",
  },
  {
    time: "Nov 13, 11:15",
    type: "Data Source",
    actor: "Claire Dubois",
    resource: "Wells Fargo Feed",
    detail: "Removed from general Chat, reporting kept",
    outcome: "Applied",
  },
  {
    time: "Nov 14, 09:03",
    type: "User",
    actor: "Claire Dubois",
    resource: "Sam Whitaker",
    detail: "Invitation sent, AR Specialist role, expires in 7 days",
    outcome: "Sent",
  },
  {
    time: "Nov 10, 14:44",
    type: "Document",
    actor: "Mark Delaney",
    resource: "DOC-1008 Sagebrush Chart of Accounts Mapping",
    detail: "Uploaded and stored as Draft v1.0, classification Confidential",
    outcome: "Recorded",
  },
  {
    time: "Oct 28, 10:30",
    type: "User",
    actor: "Ingrid Sorensen",
    resource: "Paul Girard",
    detail: "Account suspended, sessions revoked, delegation revoked",
    outcome: "Applied",
  },
  {
    time: "Oct 28, 09:14",
    type: "Authentication",
    actor: "System",
    resource: "Paul Girard",
    detail: "3 failed login attempts before suspension",
    outcome: "Flagged",
  },
  {
    time: "Nov 10, 08:00",
    type: "Data Source",
    actor: "System",
    resource: "Sage 300 (Sagebrush)",
    detail: "Authentication failed, credential expired",
    outcome: "Flagged",
  },
  {
    time: "Oct 15, 13:02",
    type: "AI Configuration",
    actor: "Claire Dubois",
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
    note: "ADP sync stale 4 days, Sage 300 (Sagebrush) credential expired",
  },
  {
    name: "Data synchronization",
    status: "Degraded",
    note: "5 of 7 sources current, 1 stale, 1 authentication expired",
  },
  {
    name: "Automation execution",
    status: "Operational",
    note: "1 execution awaiting approval, 1 completed with a flagged JV exception this week",
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
  name: "Aurora Ridge",
  legalName: "Aurora Ridge Resources Inc.",
  identifier: "AR-ORG-2026-001",
  industry: "Mining, gold production",
  address: "200 Bay Street, Toronto, ON",
  email: "finance@auroraridge.com",
  phone: "+1 416 555 0173",
  domain: "auroraridge.com",
  erpName: "SAP S/4HANA",
};

export const alfieInstructions =
  "Use Aurora Ridge terminology. Refer to the two mines and the Copperline JV by their full names. Escalate any journal entry unapproved for more than 2 business days to the Controller. Never present sample or stale data as current: name the source and its sync time.";

export const openIncident =
  "Open incident: ADP payroll synchronization has been stale for 4 days, and the Sage 300 credential for Sagebrush has expired. Owner: Claire Dubois. Alfie marks data from these sources as stale wherever it would be used.";

export const inviteManagers = ["Claire Dubois", "Nadia Hassan", "Susan Park", "George Mensah"];

export const automationAgentChoices = [
  "Reconciliation Agent",
  "Close Agent",
  "AP Processing Agent",
  "AR Collections Agent",
  "FP&A Analysis Agent",
  "Treasury Agent",
  "Compliance Monitoring Agent",
  "JV and Royalty Agent",
];

export const automationSourceChoices = [
  "SAP S/4HANA",
  "RBC Royal Bank Feed",
  "Wells Fargo Feed",
  "ADP Payroll",
  "Sage 300, Sagebrush",
  "SharePoint Document Library",
];
