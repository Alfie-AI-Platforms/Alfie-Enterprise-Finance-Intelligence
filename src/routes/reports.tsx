import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Bot,
  CalendarClock,
  CheckCircle2,
  Copy,
  Download,
  FileBarChart,
  Plus,
  Search,
  Share2,
  ShieldCheck,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/alfie-ui";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WorkspaceStatusBadge } from "@/components/workspace-badges";
import {
  entityPerformance,
  executiveTargets,
  moneyM,
  performanceTrend,
  reportAudit,
  reportCategories,
  reportContent,
  reportKpis,
  reportLibrary,
  scheduledReports,
  type LibraryReport,
} from "@/lib/reports-data";

export const Route = createFileRoute("/reports")({ component: ReportsPage });

const card = "rounded-2xl border border-border bg-card p-5";
const inputCls =
  "h-9 w-full rounded-lg border border-border bg-background px-2.5 text-xs outline-none focus:border-ring";
const selectCls =
  "select-chevron h-9 rounded-lg border border-border bg-background pl-2.5 text-xs outline-none focus:border-ring";

const askReplies: { match: string[]; agents: string; answer: string; sources: string }[] = [
  {
    match: ["gross margin", "margin"],
    agents: "FP&A Analysis Agent",
    answer:
      "Gross margin is 41.2% year to date, 0.8 points behind the 42.0% plan. Manufacturing is the driver: steel and component costs absorbed most of the spring price increases. Logistics runs at 38.0% and Retail at 40.5%. These figures come from NetSuite, refreshed 12 minutes ago.",
    sources: "NetSuite · RPT-307 Consolidated Financial Performance",
  },
  {
    match: ["revenue", "budget"],
    agents: "FP&A Analysis Agent",
    answer:
      "Revenue is $102.6M year to date against a $99.4M budget, 3.2% ahead. October contributed $9.8M. Manufacturing is the largest entity at $58.4M, then Logistics at $27.9M and Retail at $16.3M. Retail figures are labelled preliminary while its QuickBooks migration completes.",
    sources: "NetSuite · RPT-307 · RPT-306 (Retail, preliminary)",
  },
  {
    match: ["cash", "liquidity"],
    agents: "Treasury Agent",
    answer:
      "Cash is $18.4M CAD equivalent across 6 bank accounts, 4 at TD and 2 at Chase for the USD entity. The 13 week forecast low point is $11.2M in week 9. Operating cash flow is $10.4M year to date, behind EBITDA of $12.9M because receivables have built up.",
    sources: "TD and Chase bank feeds · Treasury workspace",
  },
  {
    match: ["close", "closing"],
    agents: "Close Agent",
    answer:
      "October closed in 6 days against the 8 day target, the third consecutive improvement. November is under way with 18 of 64 tasks complete; subledger cutoffs start Nov 28. One post-close adjustment from October is still open: JE-2026-1087, the $18,400 intercompany correction, waiting on CFO approval.",
    sources: "Close workspace · RPT-311 Close Performance Report",
  },
  {
    match: ["dso", "dpo", "working capital", "receivables"],
    agents: "Reconciliation Agent, FP&A Analysis Agent",
    answer:
      "DSO is 38 days and DPO is 44 days, giving a cash conversion cycle of 41 days with inventory at 47 days. The pressure is in receivables: $842K is over 60 days, and Northern Build Supplies alone carries $214,300 open with its largest invoice 62 days old.",
    sources: "NetSuite · RPT-308 Working Capital and Cash Conversion Review",
  },
  {
    match: ["covenant", "lender", "loan", "leverage"],
    agents: "Treasury Agent",
    answer:
      "Leverage is 2.1x against a covenant maximum of 3.0x on the $12.0M term loan, so headroom is 0.9x at current EBITDA. The Q3 compliance certificate was delivered Nov 5 and the next test date is December 31, 2026.",
    sources: "Loan agreement DOC-1038 · RPT-302 Lender Compliance Package",
  },
  {
    match: ["executive", "summarize", "summary", "performance"],
    agents: "Close, Reconciliation, FP&A and Treasury Agents",
    answer:
      "Executive summary: revenue is ahead of budget at $102.6M and the October close landed in 6 days. Two items need management attention: gross margin is 0.8 points behind plan at 41.2% on Manufacturing input costs, and $842K of receivables is over 60 days. One post-close adjustment, JE-2026-1087 for $18,400, is waiting on CFO approval. Every figure here traces to a library report listed below.",
    sources: "RPT-301 November Board Pack · RPT-307 · RPT-308 · RPT-310",
  },
];

function ReportsPage() {
  const [period, setPeriod] = useState("This quarter");
  const [category, setCategory] = useState("All categories");
  const [search, setSearch] = useState("");
  const [library, setLibrary] = useState<LibraryReport[]>(reportLibrary);
  const [preview, setPreview] = useState<LibraryReport | null>(null);
  const [shareMode, setShareMode] = useState("Live report");
  const [shareNote, setShareNote] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<{ agents: string; answer: string; sources: string } | null>(null);
  // Builder
  const [bCategory, setBCategory] = useState("Finance");
  const [bPeriod, setBPeriod] = useState("Last 12 months");
  const [bComparison, setBComparison] = useState("Prior period");
  const [bSources, setBSources] = useState<string[]>(["NetSuite"]);
  const [bMetrics, setBMetrics] = useState<string[]>(["Revenue", "Gross margin"]);
  const [generated, setGenerated] = useState<string | null>(null);
  const [savedNote, setSavedNote] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      library.filter((r) => {
        if (category !== "All categories" && r.category !== category) return false;
        if (
          search &&
          !`${r.name} ${r.description} ${r.owner}`.toLowerCase().includes(search.toLowerCase())
        )
          return false;
        return true;
      }),
    [library, category, search],
  );

  function ask() {
    const q = question.toLowerCase();
    const found = askReplies.find((r) => r.match.some((m) => q.includes(m)));
    setAnswer(
      found ?? {
        agents: "Alfie, coordinating the relevant agents",
        answer:
          "I can answer that from the reports and sources your role can access. Try asking about gross margin, revenue against budget, the cash position, the close, working capital or the leverage covenant, or ask for an executive summary. If the data behind a question is stale or incomplete, I will say so rather than estimate it.",
        sources: "Report Library · connected Data Sources",
      },
    );
  }

  function toggle(list: string[], value: string, set: (v: string[]) => void) {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  function generate() {
    setGenerated(
      `${bCategory} report for ${bPeriod}, compared with ${bComparison.toLowerCase()}. Sources: ${bSources.join(", ")}. Metrics: ${bMetrics.join(", ")}, grouped by entity. Definitions follow the organization metric dictionary, the same definitions used in Accounting, Planning and Treasury, so figures reconcile across departments.`,
    );
    setSavedNote(null);
  }

  function saveGenerated() {
    const report: LibraryReport = {
      id: `RPT-${312 + library.length}`,
      name: `${bCategory} Performance, ${bPeriod}`,
      category: bCategory,
      description: generated ?? "",
      period: bPeriod,
      owner: "Elena Brooks",
      created: "Nov 16, 2026",
      updated: "Nov 16, 2026",
      access: "Creator's departments",
      status: "Preliminary",
      version: "1.0",
      sources: bSources.join(", "),
    };
    setLibrary((prev) => [report, ...prev]);
    setSavedNote(
      `Saved to the Report Library as ${report.id}, version 1.0, with its filters, period, definitions and sources preserved so it can be reproduced exactly.`,
    );
  }

  function duplicate(r: LibraryReport) {
    const copy: LibraryReport = {
      ...r,
      id: `RPT-${400 + library.length}`,
      name: `${r.name} (copy)`,
      version: "1.0",
      created: "Nov 16, 2026",
      updated: "Nov 16, 2026",
      status: "Preliminary",
    };
    setLibrary((prev) => [copy, ...prev]);
    setShareNote(
      `Duplicated ${r.id} as ${copy.id}. The copy keeps the original's filters and definitions and starts as Preliminary.`,
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-8 lg:px-10">
        <PageHeader title="Reports" description="The organization's central reporting and business intelligence workspace. Reports consolidate authorized data from Accounting, Close, Payables, Receivables, Planning and Treasury. Reporting is read and analysis only: nothing here modifies an operational record." actions={<>
          <label className="block text-[13px] text-muted-foreground">
            Reporting period
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="select-chevron mt-1 h-9 rounded-lg border border-border bg-background pl-2.5 text-xs outline-none focus:border-ring"
            >
              <option>This quarter</option>
              <option>Last quarter</option>
              <option>Year to date</option>
              <option>Last 12 months</option>
            </select>
          </label>
        </>} />
        <p className="mt-3 rounded-xl bg-secondary/60 px-3 py-2 text-[13px] leading-4 text-muted-foreground">
          Illustrative sample data, shown until your systems are connected. Every figure carries its
          source and last updated time, and figures from a stale source are flagged, never presented
          as current.
        </p>

        <section className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {reportKpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-border bg-card p-4">
              <p className="text-[13px] font-medium uppercase tracking-wide text-muted-foreground">
                {k.label}
              </p>
              <p className="mt-1.5 text-xl font-semibold">{k.value}</p>
              <p className="mt-1 text-[13px] font-medium text-positive">{k.change}</p>
              <p className="mt-1 text-[12px] leading-4 text-muted-foreground">
                {k.source} · Updated {k.updated}
              </p>
            </div>
          ))}
        </section>

        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
          <section className={card}>
            <h2 className="text-sm font-semibold">Revenue and gross margin</h2>
            <p className="mt-0.5 text-[13px] text-muted-foreground">
              Monthly revenue ($M) against gross margin (%), last 6 months. The two series use
              the shared metric definitions, so they reconcile to the entity financials.
            </p>
            <div className="mt-3 h-60">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={performanceTrend} margin={{ top: 4, right: 4, bottom: 0, left: -14 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11 }}
                    stroke="var(--color-muted-foreground)"
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 11 }}
                    stroke="var(--color-muted-foreground)"
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[35, 45]}
                    tick={{ fontSize: 11 }}
                    stroke="var(--color-muted-foreground)"
                  />
                  <Tooltip />
                  <Bar
                    yAxisId="left"
                    dataKey="revenue"
                    name="Revenue ($M)"
                    fill="var(--color-primary)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="grossMargin"
                    name="Gross margin %"
                    stroke="var(--color-destructive)"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 grid gap-2.5 md:grid-cols-3">
              {[
                [
                  "Growth vs margin",
                  "Revenue is 3.2% ahead of budget while gross margin is 0.8 points behind plan. Growth and profitability are moving in opposite directions because Manufacturing input costs absorbed the spring price increases. Volume growth in the same period is not proof of margin health.",
                ],
                [
                  "Working capital",
                  "The cash conversion cycle is 41 days and receivables are the lever: DSO is 38 days with $842K over 60 days. Payables at 44 days sit inside agreed supplier terms, so the fix is on the collections side, not in stretching vendors.",
                ],
                [
                  "Retail figures, flagged",
                  "Meridian Retail still reports from QuickBooks while its migration completes, so Retail figures in consolidated reports are flagged as preliminary in RPT-306 rather than published as final. The trial balance difference of $1,240 is disclosed, not adjusted away.",
                ],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl bg-secondary/50 p-3 text-xs leading-5">
                  <p className="font-semibold">{t}</p>
                  <p className="mt-1 text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={card}>
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <Bot className="size-4 text-primary" /> Ask Alfie about performance
            </h2>
            <div className="mt-3 flex gap-2">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && ask()}
                placeholder="e.g. Why is gross margin behind plan?"
                className={`${inputCls} flex-1`}
              />
              <Button size="sm" onClick={ask}>
                Ask
              </Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {[
                "Why is gross margin behind plan?",
                "How does revenue compare to budget?",
                "What is our cash position?",
                "How did the October close go?",
                "Prepare an executive summary",
              ].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setQuestion(s);
                  }}
                  className="rounded-full border border-border px-2.5 py-1 text-[12px] font-medium hover:bg-secondary"
                >
                  {s}
                </button>
              ))}
            </div>
            {answer ? (
              <div className="mt-3 rounded-xl bg-secondary/50 p-3.5 text-xs leading-5">
                <p className="text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Via {answer.agents}
                </p>
                <p className="mt-1.5">{answer.answer}</p>
                <p className="mt-2 text-[13px] text-muted-foreground">Sources: {answer.sources}</p>
              </div>
            ) : (
              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                Alfie coordinates the Accounting, Close, Reconciliation, Planning and Treasury
                agents, uses only the data your role can access, and states plainly when data
                is stale, incomplete or insufficient, instead of inventing a figure.
              </p>
            )}
            <div className="mt-4 border-t border-border pt-3">
              <h3 className="text-xs font-semibold">Performance against targets</h3>
              <ul className="mt-2 space-y-1.5">
                {executiveTargets.map((t) => (
                  <li key={t.metric} className="flex items-center justify-between gap-2 text-xs">
                    <span className="text-muted-foreground">{t.metric}</span>
                    <span className="font-medium">
                      {t.actual} <span className="text-muted-foreground">vs {t.target}</span>
                    </span>
                    <WorkspaceStatusBadge
                      status={
                        t.status === "Ahead"
                          ? "Completed"
                          : t.status === "Behind"
                            ? "Needs Attention"
                            : "In Progress"
                      }
                    />
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[13px] leading-4 text-muted-foreground">
                The executive briefing Alfie prepares from these figures stays traceable: every
                number links back to its library report.
              </p>
            </div>
          </section>
        </div>

        <section className={`${card} mt-4`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <FileBarChart className="size-4" /> Report Library
            </h2>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search reports"
                  className="h-9 rounded-lg border border-border bg-background pl-8 pr-2 text-xs outline-none focus:border-ring"
                />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={selectCls}
              >
                {reportCategories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          {shareNote ? <p className="mt-2 text-xs font-medium text-positive">{shareNote}</p> : null}
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2 pr-3 font-medium">Report</th>
                  <th className="py-2 pr-3 font-medium">Period</th>
                  <th className="py-2 pr-3 font-medium">Owner</th>
                  <th className="py-2 pr-3 font-medium">Status</th>
                  <th className="py-2 pr-3 font-medium">Access</th>
                  <th className="py-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-border/60 last:border-0 hover:bg-secondary/40"
                  >
                    <td className="py-2.5 pr-3">
                      <span className="block font-medium">{r.name}</span>
                      <span className="text-muted-foreground">
                        {r.id} · {r.category} · v{r.version} · Updated {r.updated}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3">{r.period}</td>
                    <td className="py-2.5 pr-3">{r.owner}</td>
                    <td className="py-2.5 pr-3">
                      <WorkspaceStatusBadge
                        status={
                          r.status === "Final"
                            ? "Completed"
                            : r.status === "Preliminary"
                              ? "In Progress"
                              : "Needs Attention"
                        }
                      />
                    </td>
                    <td className="py-2.5 pr-3">{r.access}</td>
                    <td className="py-2.5">
                      <span className="flex flex-wrap gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setPreview(r);
                            setShareNote(null);
                          }}
                        >
                          View
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => duplicate(r)}>
                          <Copy className="size-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            setShareNote(
                              `${r.name} exported. Exports keep the reporting period, sources and definitions, and the export is written to the report audit history.`,
                            )
                          }
                        >
                          <Download className="size-3.5" />
                        </Button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 ? (
              <p className="py-8 text-center text-xs text-muted-foreground">
                No reports match, or your role cannot access them.
              </p>
            ) : null}
          </div>
        </section>

        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          <section className={card}>
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <Plus className="size-4" /> Report builder
            </h2>
            <p className="mt-0.5 text-[13px] text-muted-foreground">
              Generate a report in steps: category, sources, metrics, period, filters, comparison,
              then review and save. Or describe it in plain language and Alfie will set the same
              fields and explain them.
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="block text-[13px] text-muted-foreground">
                Category
                <select
                  value={bCategory}
                  onChange={(e) => setBCategory(e.target.value)}
                  className={`${selectCls} mt-1`}
                >
                  {reportCategories.slice(1).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="block text-[13px] text-muted-foreground">
                Reporting period
                <select
                  value={bPeriod}
                  onChange={(e) => setBPeriod(e.target.value)}
                  className={`${selectCls} mt-1`}
                >
                  {[
                    "This month",
                    "This quarter",
                    "Last quarter",
                    "Last 12 months",
                    "Year to date",
                  ].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="block text-[13px] text-muted-foreground">
                Comparison
                <select
                  value={bComparison}
                  onChange={(e) => setBComparison(e.target.value)}
                  className={`${selectCls} mt-1`}
                >
                  {["Prior period", "Same period last year", "No comparison"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="block text-[13px] text-muted-foreground">
                Filters
                <select
                  className={`${selectCls} mt-1`}
                  defaultValue="All entities, all currencies"
                >
                  <option>All entities, all currencies</option>
                  <option>Manufacturing only</option>
                  <option>Logistics only (USD)</option>
                  <option>Retail only</option>
                </select>
              </label>
            </div>
            <div className="mt-3">
              <p className="text-[13px] text-muted-foreground">
                Data sources (only ones your role can use)
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {[
                  "NetSuite",
                  "TD Bank Feed",
                  "Chase Bank Feed",
                  "Salesforce",
                  "Spreadsheet Uploads",
                ].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggle(bSources, s, setBSources)}
                    className={`rounded-full px-2.5 py-1 text-[13px] font-medium ${bSources.includes(s) ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <p className="text-[13px] text-muted-foreground">Metrics and aggregations</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {[
                  "Revenue",
                  "Gross margin",
                  "EBITDA",
                  "Operating expenses",
                  "DSO",
                  "DPO",
                ].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggle(bMetrics, s, setBMetrics)}
                    className={`rounded-full px-2.5 py-1 text-[13px] font-medium ${bMetrics.includes(s) ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={generate}>Generate report</Button>
              {generated ? (
                <Button variant="outline" onClick={saveGenerated}>
                  Save to library
                </Button>
              ) : null}
            </div>
            {generated ? (
              <div className="mt-3 rounded-xl bg-secondary/50 p-3.5 text-xs leading-5">
                <p className="font-semibold">Generated preview, by entity</p>
                <p className="mt-1 text-muted-foreground">{generated}</p>
                <table className="mt-2 w-full text-left">
                  <thead>
                    <tr className="text-muted-foreground">
                      <th className="py-1 pr-2 font-medium">Entity</th>
                      <th className="py-1 pr-2 font-medium">Revenue</th>
                      <th className="py-1 pr-2 font-medium">Gross profit</th>
                      <th className="py-1 font-medium">Gross margin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entityPerformance.map((l) => (
                      <tr key={l.entity} className="border-t border-border/50">
                        <td className="py-1 pr-2 font-medium">{l.entity}</td>
                        <td className="py-1 pr-2">{moneyM(l.revenue)}</td>
                        <td className="py-1 pr-2">{moneyM(l.grossProfit)}</td>
                        <td className="py-1">{((l.grossProfit / l.revenue) * 100).toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-2 text-[13px] text-muted-foreground">
                  Example of a natural language build: "Revenue by entity, grouped by month,
                  with gross margin, EBITDA and operating cash flow for the last twelve months"
                  sets exactly these fields, and Alfie lists the fields and calculations it used.
                </p>
              </div>
            ) : null}
            {savedNote ? (
              <p className="mt-2 flex items-start gap-1.5 text-xs font-medium text-positive">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0" /> {savedNote}
              </p>
            ) : null}
          </section>

          <section className={card}>
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <CalendarClock className="size-4" /> Scheduled reports
            </h2>
            <div className="mt-3 space-y-2">
              {scheduledReports.map((s) => (
                <div key={s.name} className="rounded-xl border border-border p-3 text-xs leading-5">
                  <p className="font-semibold">
                    {s.name}{" "}
                    <span className="font-normal text-muted-foreground">· {s.schedule}</span>
                  </p>
                  <p className="text-muted-foreground">
                    Recipients: {s.recipients} · Next: {s.nextRun} · Review: {s.review}
                  </p>
                  <p className="text-muted-foreground">Last run: {s.lastRun}</p>
                </div>
              ))}
            </div>
            <p className="mt-2.5 text-[13px] leading-4 text-muted-foreground">
              Every scheduled run, delivery and failure is logged, including data source problems.
              Sensitive reports follow the organization's distribution policy, and schedules can
              require review before anything is sent.
            </p>
            <div className="mt-4 border-t border-border pt-3">
              <h3 className="flex items-center gap-2 text-xs font-semibold">
                <ShieldCheck className="size-3.5" /> Governance and audit
              </h3>
              <ul className="mt-2 space-y-1.5 text-[13px] leading-4 text-muted-foreground">
                <li>
                  Access follows roles and data level permissions: asking Alfie for a cross
                  department report never grants access to restricted departmental data.
                </li>
                <li>
                  Exports are PDF, Excel or CSV, and sharing is either a static snapshot or a live
                  report that refreshes from its authorized sources.
                </li>
                <li>
                  If underlying data changes, a refresh creates a new version. The original report
                  is preserved, never silently replaced.
                </li>
              </ul>
              <ul className="mt-3 space-y-2 border-t border-border pt-3">
                {reportAudit.map((a) => (
                  <li key={a.time + a.detail} className="text-xs leading-5">
                    <span className="font-medium">{a.action}</span>{" "}
                    <span className="text-muted-foreground">· {a.detail}</span>
                    <span className="block text-[12px] text-muted-foreground">
                      {a.time} · {a.actor}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>

      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{preview?.name}</DialogTitle>
            <DialogDescription>{preview?.description}</DialogDescription>
          </DialogHeader>
          {preview ? (
            <div className="space-y-3 text-sm leading-6">
              {reportContent[preview.id] ? (
                <div className="rounded-xl border border-border bg-card p-5">
                  <div>
                    <p className="font-display text-base font-semibold">Executive summary</p>
                    <p className="mt-1 font-display text-[15px] leading-7">
                      {reportContent[preview.id]!.summary}
                    </p>
                  </div>
                  <div>
                    <p className="mt-5 font-display text-base font-semibold">Headline figures</p>
                    <table className="mt-1 w-full text-xs">
                      <tbody>
                        {reportContent[preview.id]!.figures.map(([label, value, change]) => (
                          <tr key={label} className="border-t border-border">
                            <td className="py-2 font-medium">{label}</td>
                            <td className="py-2 text-right tabular-nums">{value}</td>
                            <td className="py-2 text-right text-muted-foreground">{change}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  ["Report ID", preview.id],
                  ["Category", preview.category],
                  ["Period", preview.period],
                  ["Status", preview.status],
                  ["Version", preview.version],
                  ["Owner", preview.owner],
                  ["Created", preview.created],
                  ["Last updated", preview.updated],
                  ["Access", preview.access],
                  ["Sources", preview.sources],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-secondary/50 px-2.5 py-1.5">
                    <span className="block text-[12px] uppercase tracking-wide text-muted-foreground">
                      {k}
                    </span>
                    {v}
                  </div>
                ))}
              </div>
              <p className="text-xs leading-5 text-muted-foreground">
                Integrity: this report preserves its period, generation time, sources, filters,
                metric definitions and creator, so it can be reproduced. Figures are labelled{" "}
                {preview.status.toLowerCase()}. If a source was incomplete when it ran, the gap is
                flagged in the report rather than treated as complete.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setShareNote(
                      `${preview.name} exported to PDF with its period, sources and definitions included.`,
                    )
                  }
                >
                  <Download className="size-3.5" /> PDF
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShareNote(`${preview.name} exported to Excel.`)}
                >
                  <Download className="size-3.5" /> Excel
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShareNote(`${preview.name} exported to CSV.`)}
                >
                  <Download className="size-3.5" /> CSV
                </Button>
                <select
                  value={shareMode}
                  onChange={(e) => setShareMode(e.target.value)}
                  className={selectCls}
                >
                  <option>Live report</option>
                  <option>Static snapshot</option>
                </select>
                <Button
                  size="sm"
                  onClick={() =>
                    setShareNote(
                      `Shared as a ${shareMode.toLowerCase()}. Only people whose permissions cover the underlying data can open it.`,
                    )
                  }
                >
                  <Share2 className="size-3.5" /> Share
                </Button>
              </div>
              {shareNote ? <p className="text-xs font-medium text-positive">{shareNote}</p> : null}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
