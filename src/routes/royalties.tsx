import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AlfieChip, PageHeader, SectionLabel } from "@/components/alfie-ui";
import { Button } from "@/components/ui/button";
import {
  alfieRoyaltyNotes,
  moduleAvailable,
  royaltiesSummary,
  royaltyObligations,
  royaltyProduction,
} from "@/lib/royalties-data";
import { WORKSPACES, activeWorkspace } from "@/lib/workspace";

export const Route = createFileRoute("/royalties")({
  head: () => ({
    meta: [
      { title: "Royalties | Alfie Enterprise Finance" },
      {
        name: "description",
        content:
          "Royalty and mineral tax calculations for the Mining workspace: net smelter return royalties and the Nevada Net Proceeds tax, accrued against paid.",
      },
      { property: "og:title", content: "Royalties | Alfie Enterprise Finance" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: RoyaltiesPage,
});

const card = "rounded-2xl border border-border bg-card";

const money0 = (n: number) => `$${n.toLocaleString("en-US")}`;

function Badge({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-secondary px-2 py-0.5 text-[13px] font-medium text-muted-foreground">
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function PackNotIncluded() {
  const pack = WORKSPACES.find((w) => w.id === "mining") ?? WORKSPACES[0]!;
  return (
    <section className={`${card} mt-6 p-5`}>
      <h3 className="text-sm font-semibold">Royalties is part of the {pack.industry} industry pack</h3>
      <p className="mt-2 max-w-2xl text-[13px] leading-5 text-muted-foreground">
        This module is included in the {pack.industry} pack, shown in the {pack.company} workspace,
        and is not included in the {activeWorkspace.company} workspace. Industry modules are
        configured per client at onboarding; the core finance modules in this workspace are
        unchanged.
      </p>
      <p className="mt-2 max-w-2xl text-[13px] leading-5 text-muted-foreground">
        Use the workspace switcher at the top of the sidebar to open the {pack.companyShort}{" "}
        workspace and see Royalties with its sample data.
      </p>
    </section>
  );
}

function RoyaltiesPage() {
  const navigate = useNavigate();
  const open = (q: string) => navigate({ to: "/planning/analysis", search: { q } });

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-8 lg:px-10">
        <PageHeader
          title="Royalties"
          description={
            moduleAvailable
              ? "Net smelter return royalties and the Nevada Net Proceeds of Minerals tax for Aurora Ridge Resources, calculated on October production, accrued against paid."
              : "Royalty and mineral tax calculations. This module belongs to an industry pack."
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
                ["October accrual, all obligations", royaltiesSummary.octoberTotal],
                ["Accrued YTD", royaltiesSummary.accruedYtd],
                ["Paid YTD", royaltiesSummary.paidYtd],
                ["Outstanding", royaltiesSummary.outstanding],
              ].map(([label, value]) => (
                <div key={label} className="bg-card p-4">
                  <p className="text-[13px] font-medium text-muted-foreground">{label}</p>
                  <p className="mt-1.5 text-xl font-semibold">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[13px] text-muted-foreground">{royaltiesSummary.note}</p>

            <section className={`${card} mt-4 p-4`}>
              <div className="flex items-center gap-2">
                <AlfieChip />
                <h3 className="text-sm font-semibold">What Alfie found this month</h3>
              </div>
              <ul className="mt-2.5 space-y-2">
                {alfieRoyaltyNotes.map((n) => (
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
                    open("Walk me through the October royalty calculations for Keno Ridge and Sagebrush, including the Nevada Net Proceeds tax.")
                  }
                >
                  Explain the October calculations
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/payables">Royalty payments in Payables</Link>
                </Button>
              </div>
            </section>

            <section className={`${card} mt-6 overflow-hidden`}>
              <div className="p-4 pb-3">
                <h3 className="text-sm font-semibold">October production and revenue by property</h3>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  October revenue of $41.5M splits $26.8M to Keno Ridge and $14.7M to Sagebrush.
                  Copperline is a development project and has no production or revenue.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-sm">
                  <thead>
                    <tr className="border-t border-border text-left text-[13px] text-muted-foreground">
                      {["Property", "Gold", "Silver", "October revenue", "NSR base"].map((h) => (
                        <th key={h} className="px-4 py-2 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {royaltyProduction.map((r) => (
                      <tr key={r.property} className="border-t border-border hover:bg-secondary/50">
                        <td className="px-4 py-2.5">
                          <span className="font-medium">{r.property}</span>
                          <span className="block text-[13px] text-muted-foreground">{r.entity}</span>
                        </td>
                        <td className="px-4 py-2.5">{r.goldOunces}</td>
                        <td className="px-4 py-2.5">{r.silverOunces}</td>
                        <td className="px-4 py-2.5">{r.octoberRevenue}</td>
                        <td className="px-4 py-2.5">{r.nsrBase}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-6">
              <SectionLabel>October calculations, accrued against paid</SectionLabel>
              <div className="mt-3 grid gap-3">
                {royaltyObligations.map((o) => (
                  <article key={o.id} className={`${card} p-4`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-semibold">
                        {o.property}, {o.type.toLowerCase()}
                      </h4>
                      <Badge status={o.status} />
                    </div>
                    <p className="mt-1 text-[13px] text-muted-foreground">
                      {o.id} · Payable to {o.holder} · {o.entity} · Rate {o.ratePct.toFixed(1)}%
                    </p>
                    <p className="mt-2 max-w-3xl text-[13px] leading-5 text-muted-foreground">
                      {o.basis}. Calculation: {money0(o.basisAmount)} at {o.ratePct.toFixed(1)}% is{" "}
                      {money0(o.octoberAmount)} for October.
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-4">
                      {[
                        ["October accrual", money0(o.octoberAmount)],
                        ["Accrued YTD", money0(o.accruedYtd)],
                        ["Paid YTD", money0(o.paidYtd)],
                        ["Outstanding", money0(o.outstanding)],
                      ].map(([label, value]) => (
                        <div key={label} className="bg-card p-3">
                          <p className="text-[13px] font-medium text-muted-foreground">{label}</p>
                          <p className="mt-1 text-base font-semibold">{value}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
              <p className="mt-3 text-[13px] leading-5 text-muted-foreground">
                Accruals are calculated monthly from production and settlement data and are paid
                the month after accrual through Payables. Nothing on this page pays a royalty:
                payments follow the approval thresholds in Payables, and the accrual entries are
                prepared in Accounting.
              </p>
            </section>
          </>
        )}
      </div>
    </AppShell>
  );
}
