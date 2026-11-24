import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AlfieChip, PageHeader, SectionLabel } from "@/components/alfie-ui";
import { Button } from "@/components/ui/button";
import {
  alfieCostingNotes,
  costingSummary,
  flagshipAnalysis,
  moduleAvailable,
  standardCosts,
  standardRevision,
  varianceBridge,
} from "@/lib/costing-data";
import { WORKSPACES, activeWorkspace } from "@/lib/workspace";

export const Route = createFileRoute("/costing")({
  head: () => ({
    meta: [
      { title: "Costing | Alfie Enterprise Finance" },
      {
        name: "description",
        content:
          "Standard costs, variance analysis and standard revisions for the Manufacturing workspace, with the Series 400 variance flagship.",
      },
      { property: "og:title", content: "Costing | Alfie Enterprise Finance" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CostingPage,
});

const card = "rounded-2xl border border-border bg-card";

function Badge({ status }: { status: string }) {
  const tone =
    status === "Correction prepared"
      ? "bg-status-paused text-status-paused-foreground"
      : "bg-secondary text-muted-foreground";
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-[13px] font-medium ${tone}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function PackNotIncluded() {
  const pack = WORKSPACES.find((w) => w.id === "manufacturing") ?? WORKSPACES[0]!;
  return (
    <section className={`${card} mt-6 p-5`}>
      <h3 className="text-sm font-semibold">Costing is part of the {pack.industry} industry pack</h3>
      <p className="mt-2 max-w-2xl text-[13px] leading-5 text-muted-foreground">
        This module is included in the {pack.industry} pack, shown in the {pack.company} workspace,
        and is not included in the {activeWorkspace.company} workspace. Industry modules are
        configured per client at onboarding; the core finance modules in this workspace are
        unchanged.
      </p>
      <p className="mt-2 max-w-2xl text-[13px] leading-5 text-muted-foreground">
        Use the workspace switcher at the top of the sidebar to open the {pack.companyShort}{" "}
        workspace and see Costing with its sample data.
      </p>
    </section>
  );
}

const money2 = (n: number) => `$${n.toFixed(2)}`;
const money0 = (n: number) => `$${n.toLocaleString("en-US")}`;

function CostingPage() {
  const navigate = useNavigate();
  const open = (q: string) => navigate({ to: "/planning/analysis", search: { q } });

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-8 lg:px-10">
        <PageHeader
          title="Costing"
          description={
            moduleAvailable
              ? "Standard costs, variance analysis and the draft January standard revision for Northline Manufacturing Group, by plant and product family."
              : "Standard costs and variance analysis. This module belongs to an industry pack."
          }
        />
        {!moduleAvailable ? (
          <PackNotIncluded />
        ) : (
          <>
            <p className="mt-4 flex items-center gap-1.5 text-[13px] text-muted-foreground">
              <Info className="size-3 shrink-0" />
              Illustrative sample data, not verified financial records until connected to your systems.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-4">
              {[
                ["October material variance", costingSummary.octoberMaterialVariance],
                ["October total variance, Series 400", costingSummary.octoberTotalVariance],
                ["True-up prepared", costingSummary.trueUpAmount],
                ["Steel, actual vs standard", "$1,186 vs $1,040 /t"],
              ].map(([label, value]) => (
                <div key={label} className="bg-card p-4">
                  <p className="text-[13px] font-medium text-muted-foreground">{label}</p>
                  <p className="mt-1.5 text-xl font-semibold">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[13px] text-muted-foreground">{costingSummary.note}</p>

            <section className={`${card} mt-4 p-4`}>
              <div className="flex items-center gap-2">
                <AlfieChip />
                <h3 className="text-sm font-semibold">What Alfie found this month</h3>
              </div>
              <ul className="mt-2.5 space-y-2">
                {alfieCostingNotes.map((n) => (
                  <li key={n} className="max-w-3xl text-[13px] leading-5 text-muted-foreground">
                    {n}
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    open("Walk me through the Series 400 variance bridge for October, price, usage and labour.")
                  }
                >
                  Explain the variance bridge
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/planning">See the margin bridge in Planning</Link>
                </Button>
              </div>
            </section>

            <section className="mt-6">
              <SectionLabel>Flagship analysis</SectionLabel>
              <article className={`${card} mt-3 p-4`}>
                <div className="flex flex-wrap items-center gap-2">
                  <AlfieChip />
                  <h3 className="text-sm font-semibold">{flagshipAnalysis.title}</h3>
                  <Badge status={flagshipAnalysis.status} />
                </div>
                <p className="mt-3 max-w-3xl text-[13px] leading-5 text-muted-foreground">
                  {flagshipAnalysis.intro}
                </p>
                <ul className="mt-2.5 list-disc space-y-2 pl-5">
                  {flagshipAnalysis.points.map((p) => (
                    <li key={p} className="max-w-3xl text-[13px] leading-5 text-muted-foreground">
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[13px] text-muted-foreground">
                  Sources: {flagshipAnalysis.sources.join(" · ")}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" asChild>
                    <Link to="/accounting/$entryId" params={{ entryId: flagshipAnalysis.entryId }}>
                      Open {flagshipAnalysis.entryId}
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/close">Open the November close</Link>
                  </Button>
                </div>
              </article>
            </section>

            <section className={`${card} mt-6 overflow-hidden`}>
              <div className="p-4 pb-3">
                <h3 className="text-sm font-semibold">
                  Variance bridge, Series 400 gear housings, October
                </h3>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  Material price and usage sum to the $212,000 unfavourable material variance;
                  labour and overhead sit on top.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-sm">
                  <thead>
                    <tr className="border-t border-border text-left text-[13px] text-muted-foreground">
                      {["Component", "Amount", "Share", "What drove it"].map((h) => (
                        <th key={h} className="px-4 py-2 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {varianceBridge.map((v) => (
                      <tr key={v.component} className="border-t border-border hover:bg-secondary/50">
                        <td className="px-4 py-2.5 font-medium">{v.component}</td>
                        <td className="px-4 py-2.5">{v.formatted}</td>
                        <td className="px-4 py-2.5">
                          <span className="flex items-center gap-2">
                            <span className="h-1.5 w-16 rounded-full bg-secondary">
                              <span
                                className="block h-1.5 rounded-full bg-warning"
                                style={{ width: `${v.sharePct}%` }}
                              />
                            </span>
                            {v.sharePct.toFixed(1)}%
                          </span>
                        </td>
                        <td className="max-w-md px-4 py-2.5 text-[13px] leading-5 text-muted-foreground">
                          {v.detail}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t border-border bg-secondary/40">
                      <td className="px-4 py-2.5 font-semibold">Total, Series 400, October</td>
                      <td className="px-4 py-2.5 font-semibold">$259,500 U</td>
                      <td className="px-4 py-2.5 font-semibold">100.0%</td>
                      <td className="px-4 py-2.5" />
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className={`${card} mt-6 overflow-hidden`}>
              <div className="p-4 pb-3">
                <h3 className="text-sm font-semibold">Standard costs by product family</h3>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  Standards set January 2026 against October actuals. The Series 400 row is the
                  flagship family; the other families carry the steel price piece only.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] text-sm">
                  <thead>
                    <tr className="border-t border-border text-left text-[13px] text-muted-foreground">
                      {[
                        "Product family",
                        "Plant",
                        "Steel std /t",
                        "Steel actual /t",
                        "Scrap std",
                        "Scrap actual",
                        "Std unit cost",
                        "Actual unit cost",
                        "October units",
                        "October variance",
                      ].map((h) => (
                        <th key={h} className="px-4 py-2 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {standardCosts.map((r) => (
                      <tr key={r.family} className="border-t border-border hover:bg-secondary/50">
                        <td className="px-4 py-2.5">
                          <span className="font-medium">{r.family}</span>
                          <span className="block text-[13px] text-muted-foreground">{r.entity}</span>
                        </td>
                        <td className="px-4 py-2.5">{r.plant}</td>
                        <td className="px-4 py-2.5">{money0(r.steelStandardPerTonne)}</td>
                        <td className="px-4 py-2.5">{money0(r.steelActualPerTonne)}</td>
                        <td className="px-4 py-2.5">{r.scrapStandardPct.toFixed(1)}%</td>
                        <td className="px-4 py-2.5">{r.scrapActualPct.toFixed(1)}%</td>
                        <td className="px-4 py-2.5">{money2(r.standardUnitCost)}</td>
                        <td className="px-4 py-2.5">{money2(r.actualUnitCost)}</td>
                        <td className="px-4 py-2.5">{r.octoberUnits.toLocaleString("en-US")}</td>
                        <td className="px-4 py-2.5 font-medium">{money0(r.totalVariance)} U</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-6">
              <SectionLabel>Draft January standard revision</SectionLabel>
              <div className="mt-3 grid gap-3 lg:grid-cols-2">
                {standardRevision.map((item) => (
                  <article key={item.item} className={`${card} p-4`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-semibold">{item.item}</h4>
                      <Badge status={item.status} />
                    </div>
                    <p className="mt-1 text-[13px] text-muted-foreground">
                      Current {item.current} · Proposed {item.proposed}
                    </p>
                    <p className="mt-2 text-[13px] leading-5 text-muted-foreground">{item.basis}</p>
                  </article>
                ))}
              </div>
              <p className="mt-3 text-[13px] leading-5 text-muted-foreground">
                The revision is drafted alongside JE-2026-1142 and is approved through the same
                review: Lucas Meyer prepares, Priya Nair reviews, David Osei approves. It changes
                January costing only; it does not restate 2026.
              </p>
            </section>
          </>
        )}
      </div>
    </AppShell>
  );
}
