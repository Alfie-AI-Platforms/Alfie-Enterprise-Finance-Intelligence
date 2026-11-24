import type { OnboardingGroup, OnboardingItem } from "@/lib/worlds/enterprise/onboarding-data";

export type { OnboardingGroup, OnboardingItem };

/**
 * Onboarding checklist for this workspace: what Northline and the
 * Alfie implementation team set up between kickoff and go-live, with
 * Plant 3 joining the group workspace as the current focus. Sample
 * progress, frontend only: checking an item here updates the page
 * state in the browser, nothing is provisioned behind it.
 */

export const onboardingGroups: OnboardingGroup[] = [
  {
    title: "Organization and entities",
    items: [
      { id: "ob-1", label: "Organization profile confirmed", detail: "Northline Manufacturing Group Inc., Guelph. Legal name and consolidated reporting currency (CAD) verified.", done: true },
      { id: "ob-2", label: "Entities and intercompany structure set up", detail: "Precision (Guelph, CAD), Fabrication (Drummondville, CAD) and Assembly (Fort Wayne, USD), with intercompany accounts mapped between each pair.", done: true },
      { id: "ob-3", label: "Plan and billing confirmed", detail: "Alfie Enterprise Finance annual plan, module seats and payment method are in place.", done: true, link: { to: "/billing", label: "Open Billing" } },
    ],
  },
  {
    title: "Connect Epicor and bank feeds",
    items: [
      { id: "ob-4", label: "Epicor Kinetic connected as the primary ERP", detail: "Plants 1 and 2 sync hourly. Chart of accounts, journals, subledgers and standard costs are readable by the modules that need them.", done: true, link: { to: "/data-sources", label: "Open Data Sources" } },
      { id: "ob-5", label: "Bank feeds connected", detail: "TD (4 accounts) and Chase (1 account) feeds are live, and balances reconcile to the Treasury view.", done: true, link: { to: "/data-sources", label: "Open Data Sources" } },
      { id: "ob-6", label: "Plex MES feed connected", detail: "Connected, but the Plant 2 sync is stale by 2 days. November usage variances for Plant 2 are estimated until it recovers.", done: false, link: { to: "/data-sources", label: "Open Data Sources" } },
      { id: "ob-7", label: "Plant 3 data available for the close", detail: "Plant 3 still runs on Sage 300 ahead of the February migration. Its credential expired Nov 10, so Plant 3 reporting uses the Oct 31 position until it is refreshed.", done: false, link: { to: "/data-sources", label: "Open Data Sources" } },
    ],
  },
  {
    title: "Historical migration",
    items: [
      { id: "ob-8", label: "Historical AP archive migrated", detail: "39,640 vendor bills and payment records from 2019 to 2023, validated and searchable.", done: true, link: { to: "/migration", label: "Open Migration" } },
      { id: "ob-9", label: "Plant 3 trial load validated", detail: "Trial balance differs by $2,860 across 4 accounts. Under review before the Feb 12, 2027 cutover from Sage 300.", done: false, link: { to: "/migration", label: "Open Migration" } },
      { id: "ob-10", label: "Fabrication payroll history assessed", detail: "Assessment started Nov 10, 2026. Highly Restricted data, with migration access limited to the Controller and the migration team.", done: false, link: { to: "/migration", label: "Open Migration" } },
    ],
  },
  {
    title: "Approval policies and users",
    items: [
      { id: "ob-11", label: "Team invited", detail: "40 users across 8 departments, each with a role from the permission matrix.", done: true, link: { to: "/users", label: "Open Users & Access" } },
      { id: "ob-12", label: "Approval policies configured", detail: "Bills above $50,000 route to VP Finance. Post-close adjustments above $10,000 need CFO approval. Preparers never approve their own work.", done: true, link: { to: "/permissions", label: "Open Permissions" } },
      { id: "ob-13", label: "First access review scheduled", detail: "Quarterly access review to be scheduled before go-live, owned by the Organization Administrator.", done: false, link: { to: "/users", label: "Open Users & Access" } },
    ],
  },
  {
    title: "Alfie configuration and go-live",
    items: [
      { id: "ob-14", label: "Alfie instructions published", detail: "Organization instructions are in draft at v6: terminology, escalation and authority rules for every module, including standard cost terminology. Version 7 publishes with go-live.", done: false, link: { to: "/settings", label: "Open Settings" } },
      { id: "ob-15", label: "Agents enabled", detail: "Reconciliation, Close, AP Processing and Cost Variance agents are configured and in testing. Activation follows the first access review.", done: false, link: { to: "/agents", label: "Open Agents" } },
      { id: "ob-16", label: "Plant 3 go-live sign-off", detail: "Sign-off by the Organization Administrator once the Plant 3 cutover, agent activation and training are complete. Group go-live follows in February 2027.", done: false },
    ],
  },
];

export const onboardingTimeline: { date: string; label: string; state: "Complete" | "In progress" | "Scheduled" }[] = [
  { date: "Oct 5, 2026", label: "Kickoff with the Alfie implementation team", state: "Complete" },
  { date: "Oct 19, 2026", label: "Epicor Kinetic and bank feeds connected and syncing", state: "Complete" },
  { date: "Nov 17, 2026", label: "Pilot group live in Accounting", state: "In progress" },
  { date: "Feb 12, 2027", label: "Plant 3 cutover from Sage 300 to Epicor Kinetic", state: "Scheduled" },
  { date: "Feb 26, 2027", label: "Plant 3 go-live and group sign-off", state: "Scheduled" },
  { date: "Apr 2027", label: "Fabrication payroll history migration", state: "Scheduled" },
];

export const implementationTeam: { name: string; role: string; note: string }[] = [
  { name: "Alfie implementation team", role: "Onboarding and migration", note: "Runs the migration process with Northline's finance systems team and reviews exceptions weekly." },
  { name: "Sarah Mitchell", role: "Northline sponsor", note: "VP Finance and Organization Administrator. Owns sign-off for access, billing and go-live." },
  { name: "Northline finance systems team", role: "Source systems", note: "Owns the Epicor, Sage 300 and Plex extracts and the bank feed connections." },
];

export const onboardingSummary =
  "Pilot group is live in Accounting. Remaining: Plex MES sync health, Plant 3 migration validation, agent activation, training and sign-off. Go-live target Feb 26, 2027.";
