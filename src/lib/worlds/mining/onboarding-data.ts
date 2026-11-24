import type { OnboardingGroup, OnboardingItem } from "@/lib/worlds/enterprise/onboarding-data";

export type { OnboardingGroup, OnboardingItem };

/**
 * Onboarding checklist for this workspace: what Aurora Ridge and the
 * Alfie implementation team set up between kickoff and go-live, with
 * Copperline JV reporting as the current focus. Sample progress,
 * frontend only: checking an item here updates the page state in the
 * browser, nothing is provisioned behind it.
 */

export const onboardingGroups: OnboardingGroup[] = [
  {
    title: "Organization and entities",
    items: [
      { id: "ob-1", label: "Organization profile confirmed", detail: "Aurora Ridge Resources Inc., Toronto. Legal name and consolidated reporting currency (CAD) verified.", done: true },
      { id: "ob-2", label: "Entities and joint venture structure set up", detail: "Keno Ridge (Timmins, CAD), Sagebrush (Elko, USD) and the Copperline Metals JV at Aurora's 40% non-operated share, with intercompany and JV accounts mapped.", done: true },
      { id: "ob-3", label: "Plan and billing confirmed", detail: "Alfie Enterprise Finance annual plan, module seats and payment method are in place.", done: true, link: { to: "/billing", label: "Open Billing" } },
    ],
  },
  {
    title: "Connect SAP and bank feeds",
    items: [
      { id: "ob-4", label: "SAP S/4HANA connected as the primary GL", detail: "Corporate and Keno Ridge sync hourly. Chart of accounts, journals, subledgers and project costs are readable by the modules that need them.", done: true, link: { to: "/data-sources", label: "Open Data Sources" } },
      { id: "ob-5", label: "Bank feeds connected", detail: "RBC (5 accounts) and Wells Fargo (2 accounts) feeds are live, and balances reconcile to the Treasury view.", done: true, link: { to: "/data-sources", label: "Open Data Sources" } },
      { id: "ob-6", label: "ADP payroll connected", detail: "Connected, but the sync is stale by 4 days. November payroll accruals are estimated until it recovers.", done: false, link: { to: "/data-sources", label: "Open Data Sources" } },
      { id: "ob-7", label: "Sagebrush data available for the close", detail: "Sagebrush still runs on Sage 300 ahead of the March migration. Its credential expired Nov 10, so Sagebrush reporting uses the Oct 31 position until it is refreshed.", done: false, link: { to: "/data-sources", label: "Open Data Sources" } },
    ],
  },
  {
    title: "Historical migration",
    items: [
      { id: "ob-8", label: "Historical AP archive migrated", detail: "44,380 vendor bills and payment records from 2019 to 2023, validated and searchable.", done: true, link: { to: "/migration", label: "Open Migration" } },
      { id: "ob-9", label: "Sagebrush chart of accounts mapping completed", detail: "148 of 240 accounts mapped. Site cost codes and stockpile accounts are open before the trial load and the Mar 8, 2027 cutover.", done: false, link: { to: "/migration", label: "Open Migration" } },
      { id: "ob-10", label: "Keno Ridge payroll history assessed", detail: "Assessment started Nov 10, 2026. Highly Restricted data, with migration access limited to the Controller and the migration team.", done: false, link: { to: "/migration", label: "Open Migration" } },
    ],
  },
  {
    title: "Approval policies and users",
    items: [
      { id: "ob-11", label: "Team invited", detail: "42 users across 8 departments, each with a role from the permission matrix.", done: true, link: { to: "/users", label: "Open Users & Access" } },
      { id: "ob-12", label: "Approval policies configured", detail: "Bills above $50,000 route to VP Finance. Post-close adjustments above $10,000 need CFO approval. Preparers never approve their own work.", done: true, link: { to: "/permissions", label: "Open Permissions" } },
      { id: "ob-13", label: "First access review scheduled", detail: "Quarterly access review to be scheduled before go-live, owned by the Organization Administrator.", done: false, link: { to: "/users", label: "Open Users & Access" } },
    ],
  },
  {
    title: "Alfie configuration and go-live",
    items: [
      { id: "ob-14", label: "Alfie instructions published", detail: "Organization instructions are in draft at v6: terminology, escalation and authority rules for every module, including JV and royalty terminology. Version 7 publishes with go-live.", done: false, link: { to: "/settings", label: "Open Settings" } },
      { id: "ob-15", label: "Agents enabled", detail: "Reconciliation, Close, AP Processing and JV and Royalty agents are configured and in testing. Activation follows the first access review.", done: false, link: { to: "/agents", label: "Open Agents" } },
      { id: "ob-16", label: "Copperline JV reporting go-live", detail: "JV reporting on the workspace goes live in January 2027 once the operator statement format from Kestrel Resources is confirmed. Group sign-off by the Organization Administrator follows.", done: false },
    ],
  },
];

export const onboardingTimeline: { date: string; label: string; state: "Complete" | "In progress" | "Scheduled" }[] = [
  { date: "Oct 5, 2026", label: "Kickoff with the Alfie implementation team", state: "Complete" },
  { date: "Oct 19, 2026", label: "SAP S/4HANA and bank feeds connected and syncing", state: "Complete" },
  { date: "Nov 17, 2026", label: "Pilot group live in Accounting", state: "In progress" },
  { date: "Jan 29, 2027", label: "Copperline JV reporting go-live", state: "Scheduled" },
  { date: "Mar 8, 2027", label: "Sagebrush cutover from Sage 300 to SAP S/4HANA", state: "Scheduled" },
  { date: "Jun 2027", label: "Keno Ridge payroll history migration", state: "Scheduled" },
];

export const implementationTeam: { name: string; role: string; note: string }[] = [
  { name: "Alfie implementation team", role: "Onboarding and migration", note: "Runs the migration process with Aurora Ridge's finance systems team and reviews exceptions weekly." },
  { name: "Claire Dubois", role: "Aurora Ridge sponsor", note: "VP Finance and Organization Administrator. Owns sign-off for access, billing and go-live." },
  { name: "Aurora Ridge finance systems team", role: "Source systems", note: "Owns the SAP, Sage 300 and ADP extracts and the bank feed connections." },
];

export const onboardingSummary =
  "Pilot group is live in Accounting. Remaining: ADP sync health, Copperline JV reporting validation, agent activation, training and sign-off. Go-live target Jan 29, 2027.";
