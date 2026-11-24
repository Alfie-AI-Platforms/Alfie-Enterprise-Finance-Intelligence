import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AlfieChip, PageHeader, SectionLabel } from "@/components/alfie-ui";
import { Button } from "@/components/ui/button";
import {
  alfieProjectNotes,
  capitalProjects,
  jvTieIn,
  moduleAvailable,
  projectsSummary,
} from "@/lib/projects-data";
import { WORKSPACES, activeWorkspace } from "@/lib/workspace";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Capital Projects | Alfie Enterprise Finance" },
      {
        name: "description",
        content:
          "Capital projects for the Mining workspace: budget against spent and forecast at completion, with the Copperline joint venture tie-in.",
      },
      { property: "og:title", content: "Capital Projects | Alfie Enterprise Finance" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ProjectsPage,
});

const card = "rounded-2xl border border-border bg-card";

const money0 = (n: number) => `$${n.toLocaleString("en-US")}`;

function Badge({ status }: { status: string }) {
  const tone =
    status === "Correction prepared" || status === "In Progress"
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
  const pack = WORKSPACES.find((w) => w.id === "mining") ?? WORKSPACES[0]!;
  return (
    <section className={`${card} mt-6 p-5`}>
      <h3 className="text-sm font-semibold">
        Capital Projects is part of the {pack.industry} industry pack
      </h3>
      <p className="mt-2 max-w-2xl text-[13px] leading-5 text-muted-foreground">
        This module is included in the {pack.industry} pack, shown in the {pack.company} workspace,
        and is not included in the {activeWorkspace.company} workspace. Industry modules are
        configured per client at onboarding; the core finance modules in this workspace are
        unchanged.
      </p>
      <p className="mt-2 max-w-2xl text-[13px] leading-5 text-muted-foreground">
        Use the workspace switcher at the top of the sidebar to open the {pack.companyShort}{" "}
        workspace and see Capital Projects with its sample data.
      </p>
    </section>
  );
}

function ProjectsPage() {
  const navigate = useNavigate();
  const open = (q: string) => navigate({ to: "/planning/analysis", search: { q } });

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-8 lg:px-10">
        <PageHeader
          title="Capital Projects"
          description={
            moduleAvailable
              ? "Every capital project for Aurora Ridge Resources, budget against spent and forecast at completion, split between growth and sustaining capex."
              : "Capital project tracking. This module belongs to an industry pack."
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
                ["Capex YTD", projectsSummary.capexYtd],
                ["Sustaining capex YTD", projectsSummary.sustainingYtd],
                ["Growth capex YTD", projectsSummary.growthYtd],
                ["Copperline facility drawn", projectsSummary.facilityDrawn],
              ].map(([label, value]) => (
                <div key={label} className="bg-card p-4">
                  <p className="text-[13px] font-medium text-muted-foreground">{label}</p>
                  <p className="mt-1.5 text-xl font-semibold">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[13px] text-muted-foreground">{projectsSummary.note}</p>

            <section className={`${card} mt-4 p-4`}>
              <div className="flex items-center gap-2">
                <AlfieChip />
                <h3 className="text-sm font-semibold">What Alfie found this month</h3>
              </div>
              <ul className="mt-2.5 space-y-2">
                {alfieProjectNotes.map((n) => (
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
                    open("Explain the Copperline forecast at completion of $131.5M against the $128.0M budget.")
                  }
                >
                  Explain the Copperline forecast
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/treasury">Project facility in Treasury</Link>
                </Button>
              </div>
            </section>

            <section className={`${card} mt-6 overflow-hidden`}>
              <div className="p-4 pb-3">
                <h3 className="text-sm font-semibold">Projects, budget against forecast</h3>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  Spent is calendar 2026 to the end of October. Growth projects sum to $58.6M spent
                  and sustaining projects to $38.6M, the canonical capex split.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] text-sm">
                  <thead>
                    <tr className="border-t border-border text-left text-[13px] text-muted-foreground">
                      {[
                        "Project",
                        "Category",
                        "Budget",
                        "Spent YTD",
                        "Forecast at completion",
                        "Forecast vs budget",
                        "Complete",
                        "Status",
                      ].map((h) => (
                        <th key={h} className="px-4 py-2 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {capitalProjects.map((p) => {
                      const variance = p.forecastAtCompletion - p.budget;
                      return (
                        <tr key={p.id} className="border-t border-border hover:bg-secondary/50">
                          <td className="px-4 py-2.5">
                            <span className="font-medium">{p.name}</span>
                            <span className="block text-[13px] text-muted-foreground">
                              {p.id} · {p.site}
                            </span>
                          </td>
                          <td className="px-4 py-2.5">{p.category}</td>
                          <td className="px-4 py-2.5">{money0(p.budget)}</td>
                          <td className="px-4 py-2.5">{money0(p.spentYtd)}</td>
                          <td className="px-4 py-2.5">{money0(p.forecastAtCompletion)}</td>
                          <td className={`px-4 py-2.5 ${variance > 0 ? "font-medium" : ""}`}>
                            {variance > 0 ? `${money0(variance)} over` : "On budget"}
                          </td>
                          <td className="px-4 py-2.5">
                            <span className="flex items-center gap-2">
                              <span className="h-1.5 w-16 rounded-full bg-secondary">
                                <span
                                  className="block h-1.5 rounded-full bg-primary"
                                  style={{ width: `${p.pctComplete}%` }}
                                />
                              </span>
                              {p.pctComplete}%
                            </span>
                          </td>
                          <td className="px-4 py-2.5">
                            <Badge status={p.status} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-6">
              <SectionLabel>Project notes</SectionLabel>
              <div className="mt-3 grid gap-3 lg:grid-cols-2">
                {capitalProjects.map((p) => (
                  <article key={p.id} className={`${card} p-4`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-semibold">{p.name}</h4>
                      <span className="inline-flex items-center whitespace-nowrap rounded-full bg-secondary px-2 py-0.5 text-[13px] font-medium text-muted-foreground">
                        {p.category}
                      </span>
                    </div>
                    <p className="mt-1 text-[13px] text-muted-foreground">
                      {p.site} · {p.entity}
                    </p>
                    <p className="mt-2 text-[13px] leading-5 text-muted-foreground">{p.note}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-6">
              <SectionLabel>Joint venture tie-in</SectionLabel>
              <article className={`${card} mt-3 p-4`}>
                <div className="flex flex-wrap items-center gap-2">
                  <AlfieChip />
                  <h3 className="text-sm font-semibold">
                    Copperline operator statement, October, ties to {jvTieIn.entryId}
                  </h3>
                  <Badge status={jvTieIn.status} />
                </div>
                <div className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
                  {[
                    ["Aurora share per operator statement", jvTieIn.statementShare],
                    ["Aurora accrual", jvTieIn.accruedShare],
                    ["Difference", jvTieIn.difference],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-card p-4">
                      <p className="text-[13px] font-medium text-muted-foreground">{label}</p>
                      <p className="mt-1.5 text-xl font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  {jvTieIn.points.map((p) => (
                    <li key={p} className="max-w-3xl text-[13px] leading-5 text-muted-foreground">
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" asChild>
                    <Link to="/accounting/$entryId" params={{ entryId: jvTieIn.entryId }}>
                      Open {jvTieIn.entryId}
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/close">Open the November close</Link>
                  </Button>
                </div>
              </article>
            </section>
          </>
        )}
      </div>
    </AppShell>
  );
}
