import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, FileBarChart } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DocumentSheet } from "@/components/document-view";
import { PlanningHeader, SampleDataNote, card, selectCls } from "@/components/planning-nav";
import { entities } from "@/lib/planning-data";
import {
  planningReportLibrary,
  scheduledPlanningReports,
  type PlanningReportItem,
} from "@/lib/planning-data";

export const Route = createFileRoute("/planning/reports")({
  head: () => ({ meta: [{ title: "Planning Reports | Alfie Enterprise Finance" }] }),
  component: PlanningReportsPage,
});

const categories = [
  "All categories",
  "Budget & Forecast",
  "Variance",
  "Board Reporting",
  "Scenarios",
  "Forecast Reviews",
];
const workflow = ["Draft", "Generated", "Under Review", "Approved", "Published", "Archived"];

function PlanningReportsPage() {
  const [category, setCategory] = useState("All categories");
  const [library, setLibrary] = useState<PlanningReportItem[]>(planningReportLibrary);
  const [gCategory, setGCategory] = useState("Variance");
  const [gEntity, setGEntity] = useState("All entities");
  const [gPeriod, setGPeriod] = useState("Oct 2026");
  const [gBasis, setGBasis] = useState("Actual vs Budget");
  const [preview, setPreview] = useState<PlanningReportItem | null>(null);
  const [note, setNote] = useState<string | null>(null);

  const filtered = useMemo(
    () => library.filter((r) => category === "All categories" || r.category === category),
    [library, category],
  );
  const entity = entities.find((e) => e.entity === gEntity);

  function generate() {
    const item: PlanningReportItem = {
      id: `PL-${107 + library.length}`,
      name: `${gEntity} ${gCategory} Report, ${gPeriod}`,
      category: gCategory,
      period: gPeriod,
      owner: "Grace Liu",
      status: "Draft",
      updated: "Nov 16, 2026",
      parameters: `${gEntity}, ${gPeriod}, basis ${gBasis}, org metric definitions, sources preserved`,
      summary: entity
        ? `${entity.entity} revenue is $${entity.revenue.toFixed(1)}M year to date against a $${entity.budget.toFixed(1)}M budget, with gross margin of ${entity.grossMargin.toFixed(1)}% and an EBITDA margin of ${entity.ebitdaMargin.toFixed(1)}%. This draft was generated on the ${gBasis} basis for ${gPeriod}.`
        : `Group revenue is $102.6M year to date against a $99.4M budget, gross margin is 41.2% and EBITDA is $12.9M. This draft was generated on the ${gBasis} basis for ${gPeriod}.`,
      sections: [
        {
          heading: "Basis and sources",
          body: `Parameters preserved with this report: ${gEntity}, ${gPeriod}, basis ${gBasis}. Sources: NetSuite (primary GL), Salesforce order book, TD and Chase bank feeds. Retail figures rely on spreadsheet uploads until the QuickBooks connection is restored, and November expenses are estimated while the Concur sync is stale.`,
        },
        {
          heading: "Limitations",
          body: "Sample data until systems are connected. Figures are preliminary until the relevant forecast review and sign-off steps complete. Alfie's narrative is labelled as AI commentary and kept separate from verified calculations and approved conclusions.",
        },
      ],
    };
    setLibrary((prev) => [item, ...prev]);
    setPreview(item);
    setNote(
      `Generated ${item.id} as a Draft. Its parameters, period, basis and sources are preserved with it, so it can be reproduced exactly.`,
    );
  }
  function advance(r: PlanningReportItem) {
    const idx = workflow.indexOf(r.status);
    if (idx < 0 || idx >= workflow.length - 1) return;
    const next = workflow[idx + 1]!;
    setLibrary((prev) => prev.map((x) => (x.id === r.id ? { ...x, status: next } : x)));
    setNote(
      `${r.id} moved to ${next}. Status changes, reviewers and approval dates are recorded on the report.`,
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-8 lg:px-10">
        <PlanningHeader
          title="Planning Reports"
          subtitle="Reporting for the FP&A function: budget and forecast packs, variance reports, scenario assessments and forecast review records. For organization wide business reporting, use the main Reports module instead. These reports reference the reviews and scenarios they came from rather than duplicating them."
          actions={
            <Button asChild variant="outline">
              <Link to="/reports">Open main Reports</Link>
            </Button>
          }
        />
        <div className="mt-4">
          <SampleDataNote />
        </div>
        {note ? (
          <p className="mt-3 rounded-xl bg-positive/10 p-3 text-xs font-medium leading-5 text-positive">
            {note}
          </p>
        ) : null}

        <div className="mt-4 grid gap-4 xl:grid-cols-[380px_minmax(0,1fr)]">
          <section className={`${card} p-5`}>
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <FileBarChart className="size-4" /> Generate a planning report
            </h2>
            <div className="mt-3 space-y-3">
              <label className="block text-[13px] text-muted-foreground">
                Report category
                <select
                  value={gCategory}
                  onChange={(e) => setGCategory(e.target.value)}
                  className="select-chevron mt-1 h-9 w-full rounded-lg border border-border bg-background pl-2.5 text-xs outline-none focus:border-ring"
                >
                  {categories.slice(1).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="block text-[13px] text-muted-foreground">
                Entity
                <select
                  value={gEntity}
                  onChange={(e) => setGEntity(e.target.value)}
                  className="select-chevron mt-1 h-9 w-full rounded-lg border border-border bg-background pl-2.5 text-xs outline-none focus:border-ring"
                >
                  <option>All entities</option>
                  {entities.map((e) => (
                    <option key={e.entity}>{e.entity}</option>
                  ))}
                </select>
              </label>
              <label className="block text-[13px] text-muted-foreground">
                Reporting period
                <select
                  value={gPeriod}
                  onChange={(e) => setGPeriod(e.target.value)}
                  className="select-chevron mt-1 h-9 w-full rounded-lg border border-border bg-background pl-2.5 text-xs outline-none focus:border-ring"
                >
                  {["Oct 2026", "YTD Oct 2026", "Q4 2026", "Q3 2026", "FY2027"].map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </label>
              <label className="block text-[13px] text-muted-foreground">
                Basis
                <select
                  value={gBasis}
                  onChange={(e) => setGBasis(e.target.value)}
                  className="select-chevron mt-1 h-9 w-full rounded-lg border border-border bg-background pl-2.5 text-xs outline-none focus:border-ring"
                >
                  {["Actual vs Budget", "Actual vs Forecast", "Forecast only", "Budget only", "Scenario comparison"].map(
                    (b) => (
                      <option key={b}>{b}</option>
                    ),
                  )}
                </select>
              </label>
            </div>
            <Button className="mt-4 w-full" onClick={generate}>
              Generate report
            </Button>
            <p className="mt-2 text-[13px] leading-4 text-muted-foreground">
              Planning reports follow a fixed structure: summary, purpose and scope, data sources,
              basis and assumptions, results, comparisons, limitations, findings and
              recommendations. Alfie's narrative is labelled as AI commentary and kept separate
              from verified calculations and approved conclusions.
            </p>
            <div className="mt-4 border-t border-border pt-4">
              <h3 className="text-xs font-semibold">Scheduled planning reports</h3>
              <ul className="mt-2 space-y-2">
                {scheduledPlanningReports.map((s) => (
                  <li key={s.name} className="rounded-xl bg-secondary/50 p-3 text-xs leading-5">
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-muted-foreground">
                      {s.schedule} · {s.status}
                    </p>
                    <p className="text-muted-foreground">Last run: {s.lastRun}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className={`${card} p-5`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-semibold">Planning report library</h2>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={selectCls}
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="py-2 pr-3 font-medium">Report</th>
                    <th className="py-2 pr-3 font-medium">Period</th>
                    <th className="py-2 pr-3 font-medium">Owner</th>
                    <th className="py-2 pr-3 font-medium">Status</th>
                    <th className="py-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-border/60 last:border-0 align-top hover:bg-secondary/40"
                    >
                      <td className="py-2.5 pr-3">
                        <span className="block font-medium">{r.name}</span>
                        <span className="text-muted-foreground">
                          {r.id} · {r.category} · Updated {r.updated}
                        </span>
                        <span className="block text-muted-foreground">{r.parameters}</span>
                      </td>
                      <td className="py-2.5 pr-3">{r.period}</td>
                      <td className="py-2.5 pr-3">{r.owner}</td>
                      <td className="py-2.5 pr-3">{r.status}</td>
                      <td className="py-2.5">
                        <span className="flex flex-wrap gap-1">
                          <Button size="sm" variant="outline" onClick={() => setPreview(r)}>
                            Open
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            disabled={workflow.indexOf(r.status) >= workflow.length - 1}
                            onClick={() => advance(r)}
                          >
                            Advance
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              setNote(
                                `${r.name} exported. Exports keep the period, parameters, sources and definitions, follow the report's access rules, and are written to the audit history.`,
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
            </div>
            <p className="mt-2 text-[13px] leading-4 text-muted-foreground">
              Review workflow: Draft, Generated, Under Review, Changes Requested, Approved,
              Published, Archived. Confidential and restricted reports follow the organization's
              distribution rules, and scheduled reports log every run and delivery.
            </p>
          </section>
        </div>
      </div>

      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{preview?.name}</DialogTitle>
            <DialogDescription>
              {preview?.id} · {preview?.category} · {preview?.period} · Status {preview?.status} ·
              Owner {preview?.owner}
            </DialogDescription>
          </DialogHeader>
          {preview ? (
            <DocumentSheet summary={preview.summary} sections={preview.sections} />
          ) : null}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
