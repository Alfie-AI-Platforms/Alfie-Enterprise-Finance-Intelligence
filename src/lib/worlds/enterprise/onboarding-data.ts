/**
 * Onboarding checklist for this workspace: what Meridian and the
 * Alfie implementation team set up between kickoff and go-live.
 * Sample progress, frontend only: checking an item here updates the
 * page state in the browser, nothing is provisioned behind it.
 */

export type OnboardingItem = {
  id: string;
  label: string;
  detail: string;
  done: boolean;
  link?: {
    to: "/billing" | "/data-sources" | "/migration" | "/users" | "/permissions" | "/settings" | "/agents" | "/automations";
    label: string;
  };
};

export type OnboardingGroup = { title: string; items: OnboardingItem[] };

export const onboardingGroups: OnboardingGroup[] = [
  {
    title: "Organization and entities",
    items: [
      { id: "ob-1", label: "Organization profile confirmed", detail: "Meridian Group Inc., Toronto. Legal name and consolidated reporting currency (CAD) verified.", done: true },
      { id: "ob-2", label: "Entities and intercompany structure set up", detail: "Manufacturing (Toronto, CAD), Logistics (Columbus, USD) and Retail (Vancouver, CAD), with intercompany accounts mapped between each pair.", done: true },
      { id: "ob-3", label: "Plan and billing confirmed", detail: "Alfie Enterprise Finance annual plan, module seats and payment method are in place.", done: true, link: { to: "/billing", label: "Open Billing" } },
    ],
  },
  {
    title: "Connect NetSuite and bank feeds",
    items: [
      { id: "ob-4", label: "NetSuite connected as the primary GL", detail: "All three entities sync hourly. Chart of accounts, journals and subledgers are readable by the modules that need them.", done: true, link: { to: "/data-sources", label: "Open Data Sources" } },
      { id: "ob-5", label: "Bank feeds connected", detail: "TD (4 accounts) and Chase (2 accounts) feeds are live, and balances reconcile to the Treasury view.", done: true, link: { to: "/data-sources", label: "Open Data Sources" } },
      { id: "ob-6", label: "Concur expenses connected", detail: "Connected, but the sync is stale by 3 days. November expense accruals are estimated until it recovers.", done: false, link: { to: "/data-sources", label: "Open Data Sources" } },
      { id: "ob-7", label: "Salesforce connected for receivables", detail: "Customer records and credit limits sync for the Receivables team.", done: true, link: { to: "/data-sources", label: "Open Data Sources" } },
    ],
  },
  {
    title: "Historical migration",
    items: [
      { id: "ob-8", label: "Historical AP archive migrated", detail: "48,210 vendor bills and payment records from 2019 to 2023, validated and searchable.", done: true, link: { to: "/migration", label: "Open Migration" } },
      { id: "ob-9", label: "Meridian Retail trial load validated", detail: "Trial balance differs by $1,240 across 3 accounts. Under review before the Dec 12 cutover from QuickBooks.", done: false, link: { to: "/migration", label: "Open Migration" } },
      { id: "ob-10", label: "Logistics payroll history assessed", detail: "Assessment started Nov 10, 2026. Highly Restricted data, with migration access limited to the Controller and the migration team.", done: false, link: { to: "/migration", label: "Open Migration" } },
    ],
  },
  {
    title: "Approval policies and users",
    items: [
      { id: "ob-11", label: "Team invited", detail: "28 users across 8 departments, each with a role from the permission matrix.", done: true, link: { to: "/users", label: "Open Users & Access" } },
      { id: "ob-12", label: "Approval policies configured", detail: "Bills above $50,000 route to VP Finance. Post-close adjustments above $10,000 need CFO approval. Preparers never approve their own work.", done: true, link: { to: "/permissions", label: "Open Permissions" } },
      { id: "ob-13", label: "First access review scheduled", detail: "Quarterly access review to be scheduled before go-live, owned by the Organization Administrator.", done: false, link: { to: "/users", label: "Open Users & Access" } },
    ],
  },
  {
    title: "Alfie configuration and go-live",
    items: [
      { id: "ob-14", label: "Alfie instructions published", detail: "Organization instructions are in draft at v6: terminology, escalation and authority rules for every module. Version 7 publishes with go-live.", done: false, link: { to: "/settings", label: "Open Settings" } },
      { id: "ob-15", label: "Agents enabled", detail: "Reconciliation, Close and AP Processing agents are configured and in testing. Activation follows the first access review.", done: false, link: { to: "/agents", label: "Open Agents" } },
      { id: "ob-16", label: "Go-live sign-off", detail: "Sign-off by the Organization Administrator once the Retail cutover, agent activation and training are complete.", done: false },
    ],
  },
];

export const onboardingTimeline: { date: string; label: string; state: "Complete" | "In progress" | "Scheduled" }[] = [
  { date: "Nov 3, 2026", label: "Kickoff with the Alfie implementation team", state: "Complete" },
  { date: "Nov 10, 2026", label: "NetSuite and bank feeds connected and syncing", state: "Complete" },
  { date: "Nov 17, 2026", label: "Pilot group live in Accounting", state: "In progress" },
  { date: "Dec 12, 2026", label: "Meridian Retail cutover from QuickBooks", state: "Scheduled" },
  { date: "Jan 15, 2027", label: "Go-live target and sign-off", state: "Scheduled" },
  { date: "Mar 2027", label: "Logistics payroll history migration", state: "Scheduled" },
];

export const implementationTeam: { name: string; role: string; note: string }[] = [
  { name: "Alfie implementation team", role: "Onboarding and migration", note: "Runs the migration process with Meridian's finance systems team and reviews exceptions weekly." },
  { name: "Elena Brooks", role: "Meridian sponsor", note: "VP Finance and Organization Administrator. Owns sign-off for access, billing and go-live." },
  { name: "Meridian finance systems team", role: "Source systems", note: "Owns the NetSuite, QuickBooks and ADP extracts and the bank feed connections." },
];

export const onboardingSummary =
  "Pilot group is live in Accounting. Remaining: Concur sync health, Retail migration validation, agent activation, training and sign-off. Go-live target Jan 15, 2027.";
