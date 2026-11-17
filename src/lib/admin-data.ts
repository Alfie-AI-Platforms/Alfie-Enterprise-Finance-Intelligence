export type UserStatus = "Active" | "Invited" | "Suspended" | "Deactivated";

export type OrgUser = {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  title: string;
  department: string;
  roles: string[];
  manager: string;
  status: UserStatus;
  invitation: string;
  added: string;
  lastLogin: string;
  auth: string;
  sessions: number;
};

export const orgUsers: OrgUser[] = [
  {
    id: "USR-001",
    name: "Elena Brooks",
    email: "elena.brooks@meridiangroup.com",
    employeeId: "MG-1001",
    title: "VP Finance",
    department: "Finance",
    roles: ["Organization Administrator"],
    manager: "James Whitfield",
    status: "Active",
    invitation: "Accepted",
    added: "Jan 06, 2026",
    lastLogin: "Today, 09:41 AM",
    auth: "SSO + MFA",
    sessions: 2,
  },
  {
    id: "USR-002",
    name: "James Whitfield",
    email: "james.whitfield@meridiangroup.com",
    employeeId: "MG-1002",
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
    name: "Marcus Webb",
    email: "marcus.webb@meridiangroup.com",
    employeeId: "MG-1014",
    title: "Controller",
    department: "Accounting",
    roles: ["Controller"],
    manager: "Elena Brooks",
    status: "Active",
    invitation: "Accepted",
    added: "Jan 06, 2026",
    lastLogin: "Today, 09:02 AM",
    auth: "SSO + MFA",
    sessions: 1,
  },
  {
    id: "USR-004",
    name: "Daniel Okafor",
    email: "daniel.okafor@meridiangroup.com",
    employeeId: "MG-1022",
    title: "Senior Accountant",
    department: "Accounting",
    roles: ["Senior Accountant"],
    manager: "Marcus Webb",
    status: "Active",
    invitation: "Accepted",
    added: "Jan 12, 2026",
    lastLogin: "Today, 10:11 AM",
    auth: "SSO + MFA",
    sessions: 1,
  },
  {
    id: "USR-005",
    name: "Rachel Kim",
    email: "rachel.kim@meridiangroup.com",
    employeeId: "MG-1031",
    title: "AP Manager",
    department: "Payables",
    roles: ["AP Manager"],
    manager: "Elena Brooks",
    status: "Active",
    invitation: "Accepted",
    added: "Jan 12, 2026",
    lastLogin: "Yesterday, 05:48 PM",
    auth: "SSO + MFA",
    sessions: 0,
  },
  {
    id: "USR-006",
    name: "Tom Alvarez",
    email: "tom.alvarez@meridiangroup.com",
    employeeId: "MG-1040",
    title: "Treasurer",
    department: "Treasury",
    roles: ["Treasurer"],
    manager: "James Whitfield",
    status: "Active",
    invitation: "Accepted",
    added: "Jan 06, 2026",
    lastLogin: "Today, 07:57 AM",
    auth: "SSO + MFA",
    sessions: 1,
  },
  {
    id: "USR-007",
    name: "Grace Liu",
    email: "grace.liu@meridiangroup.com",
    employeeId: "MG-1052",
    title: "FP&A Director",
    department: "Planning",
    roles: ["FP&A Director"],
    manager: "James Whitfield",
    status: "Active",
    invitation: "Accepted",
    added: "Feb 02, 2026",
    lastLogin: "Today, 08:44 AM",
    auth: "SSO + MFA",
    sessions: 1,
  },
  {
    id: "USR-008",
    name: "Maya Thompson",
    email: "maya.thompson@meridiangroup.com",
    employeeId: "MG-1063",
    title: "Compliance and Security Lead",
    department: "Compliance",
    roles: ["Security Administrator", "Compliance Officer"],
    manager: "James Whitfield",
    status: "Active",
    invitation: "Accepted",
    added: "Jan 06, 2026",
    lastLogin: "Today, 07:30 AM",
    auth: "SSO + MFA + hardware key",
    sessions: 1,
  },
  {
    id: "USR-009",
    name: "Priya Nair",
    email: "priya.nair@meridiangroup.com",
    employeeId: "MG-1071",
    title: "AP Specialist",
    department: "Payables",
    roles: ["AP Specialist"],
    manager: "Rachel Kim",
    status: "Active",
    invitation: "Accepted",
    added: "Feb 16, 2026",
    lastLogin: "Oct 12, 2026",
    auth: "SSO + MFA",
    sessions: 0,
  },
  {
    id: "USR-010",
    name: "Sofia Marino",
    email: "sofia.marino@meridiangroup.com",
    employeeId: "MG-1080",
    title: "AR Specialist",
    department: "Receivables",
    roles: ["AR Specialist"],
    manager: "Elena Brooks",
    status: "Invited",
    invitation: "Sent Nov 14, expires in 5 days",
    added: "Nov 14, 2026",
    lastLogin: "Never",
    auth: "Not activated",
    sessions: 0,
  },
  {
    id: "USR-011",
    name: "David Lindqvist",
    email: "david.lindqvist@meridiangroup.com",
    employeeId: "MG-1088",
    title: "Accountant",
    department: "Accounting",
    roles: ["Accountant"],
    manager: "Marcus Webb",
    status: "Suspended",
    invitation: "Accepted",
    added: "Apr 13, 2026",
    lastLogin: "Oct 28, 2026",
    auth: "SSO + MFA, sessions revoked",
    sessions: 0,
  },
  {
    id: "USR-012",
    name: "Henry Walsh",
    email: "henry.walsh@meridiangroup.com",
    employeeId: "MG-1095",
    title: "Accountant",
    department: "Accounting",
    roles: ["Accountant"],
    manager: "Marcus Webb",
    status: "Deactivated",
    invitation: "Accepted",
    added: "Feb 23, 2026",
    lastLogin: "Sep 18, 2026",
    auth: "Deactivated, history preserved",
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
  "Senior Accountant",
  "Accountant",
  "AP Manager",
  "AP Specialist",
  "AR Specialist",
  "Treasurer",
  "FP&A Director",
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
    manager: "Marcus Webb",
    usedFor: "Close tasks, journal approvals",
  },
  {
    name: "AP Approvers",
    members: 3,
    manager: "Rachel Kim",
    usedFor: "Bill approvals above $10,000",
  },
  {
    name: "Finance Leadership",
    members: 4,
    manager: "James Whitfield",
    usedFor: "Executive approvals, board reporting",
  },
  { name: "Treasury Team", members: 3, manager: "Tom Alvarez", usedFor: "Bank accounts, covenant reporting" },
  {
    name: "FP&A Team",
    members: 4,
    manager: "Grace Liu",
    usedFor: "Forecast reviews, budget cycles",
  },
  {
    name: "Compliance and Risk",
    members: 3,
    manager: "Maya Thompson",
    usedFor: "Access reviews, security alerts",
  },
];

export const accessReviews = [
  {
    name: "Q4 2026 privileged access review",
    owner: "Elena Brooks",
    scope: "All users with administrator or approval roles",
    due: "Nov 27, 2026",
    status: "In Progress",
    progress: "18 of 26 reviewed",
  },
  {
    name: "Accounting department access review",
    owner: "Marcus Webb",
    scope: "Accounting department, 9 users",
    due: "Dec 04, 2026",
    status: "In Progress",
    progress: "5 of 9 reviewed",
  },
  {
    name: "Inactive account check",
    owner: "System, assigned to Elena Brooks",
    scope: "No login in 30 days: 1 account (Priya Nair)",
    due: "Nov 20, 2026",
    status: "Action Required",
    progress: "1 account flagged",
  },
  {
    name: "Direct permission assignments",
    owner: "Elena Brooks",
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
    "Senior Accountant": "Accounting",
    Accountant: "Accounting",
    "AP Manager": "Payables",
    "AP Specialist": "Payables",
    "AR Specialist": "Receivables",
    Treasurer: "Treasury",
    "FP&A Director": "Planning",
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
    levels: "FP&A Director prepares · CFO approves before the forecast is published",
    chain: "FP&A Director → Chief Financial Officer",
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
    from: "Marcus Webb (Controller)",
    to: "David Lindqvist (Accountant)",
    scope: "Journal entry approvals for standard entries",
    period: "Delegated Oct 20, revoked Oct 28, 2026 when the account was suspended",
    status: "Revoked",
  },
  {
    from: "Rachel Kim (AP Manager)",
    to: "Priya Nair (AP Specialist, acting)",
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
    actor: "Elena Brooks",
    resource: "Automation AUT-10 Sync Failure Watch",
    detail: "Status changed Draft → In Testing",
    outcome: "Recorded",
  },
  {
    time: "Nov 15, 08:47",
    type: "Data Source",
    actor: "Elena Brooks",
    resource: "Concur Expenses",
    detail: "Sync failure investigated, expense accrual flagged as estimated",
    outcome: "Recorded",
  },
  {
    time: "Nov 13, 16:20",
    type: "Permission",
    actor: "Maya Thompson",
    resource: "Role: Accountant",
    detail: "Execute on Data Sources changed from Allowed → Not allowed",
    outcome: "Applied",
  },
  {
    time: "Nov 13, 11:15",
    type: "Data Source",
    actor: "Elena Brooks",
    resource: "Chase Bank Feed",
    detail: "Removed from general Chat, reporting kept",
    outcome: "Applied",
  },
  {
    time: "Nov 14, 09:03",
    type: "User",
    actor: "Elena Brooks",
    resource: "Sofia Marino",
    detail: "Invitation sent, AR Specialist role, expires in 7 days",
    outcome: "Sent",
  },
  {
    time: "Nov 10, 14:44",
    type: "Document",
    actor: "Daniel Okafor",
    resource: "DOC-1008 Meridian Retail Chart of Accounts Mapping",
    detail: "Uploaded and stored as Draft v1.0, classification Confidential",
    outcome: "Recorded",
  },
  {
    time: "Oct 28, 10:30",
    type: "User",
    actor: "Maya Thompson",
    resource: "David Lindqvist",
    detail: "Account suspended, sessions revoked, delegation revoked",
    outcome: "Applied",
  },
  {
    time: "Oct 28, 09:14",
    type: "Authentication",
    actor: "System",
    resource: "David Lindqvist",
    detail: "3 failed login attempts before suspension",
    outcome: "Flagged",
  },
  {
    time: "Nov 10, 08:00",
    type: "Data Source",
    actor: "System",
    resource: "QuickBooks (Meridian Retail)",
    detail: "Authentication failed, credential expired",
    outcome: "Flagged",
  },
  {
    time: "Oct 15, 13:02",
    type: "AI Configuration",
    actor: "Elena Brooks",
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
    note: "7 agents enabled, 2 in draft or paused by configuration",
  },
  {
    name: "Integration health",
    status: "Degraded",
    note: "Concur sync stale 3 days, QuickBooks credential expired",
  },
  {
    name: "Data synchronization",
    status: "Degraded",
    note: "6 of 8 sources current, 1 stale, 1 authentication expired",
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
