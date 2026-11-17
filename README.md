# Alfie: Enterprise Finance Intelligence

The CFO workspace product in the Alfie Platform family: an AI-native
workspace for enterprise finance teams, built on the same product and UI
foundation as Alfie Insurance Intelligence.

Alfie is the intelligence layer above the systems a finance office already
runs (NetSuite, bank feeds, Salesforce, spreadsheets). It reconciles
continuously, flags anomalies before the close, prepares journal entries,
bills and analysis for human approval, and answers questions about the
numbers with the evidence attached. It is not a system of record and does
not replace the general ledger.

## Modules

- **Work:** Accounting (journal entry queue and entry files), Close,
  Reconciliations, Payables, Receivables
- **Intelligence:** Planning & FP&A (budget vs actual, forecast reviews,
  scenarios), Treasury (bank balances, 13 week cash forecast, covenants),
  Reports
- **Library:** Chats, Documents, Data Sources, Migration, Automations,
  Agents
- **Administration:** Onboarding, Users & Access, Policies & Permissions,
  Billing, Settings

## Sample data

The workspace ships with an illustrative sample company, Meridian Group
Inc. (Manufacturing in Toronto, Logistics in Columbus, Retail in
Vancouver), so every flow can be evaluated end to end. `BUILD_BRIEF.md`
holds the canonical figures. Frontend only: pages, flows and interactions
run on local state and sample data; backend systems are connected through
Data Sources by the engineering team.

## Development

TanStack Start (React 19), Vite, Tailwind CSS 4. Install with npm, then
`npm run dev`. Production build: `npm run build`. Tests: `npm test`.
See `AGENTS.md` for architecture and design rules.
