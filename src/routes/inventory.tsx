import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AlfieChip, PageHeader, SectionLabel } from "@/components/alfie-ui";
import { Button } from "@/components/ui/button";
import {
  alfieInventoryNotes,
  inventoryByCategory,
  inventoryByPlant,
  inventorySummary,
  moduleAvailable,
  proposedReserveTotal,
  slowMovingItems,
  slowMovingTotal,
} from "@/lib/inventory-data";
import { WORKSPACES, activeWorkspace } from "@/lib/workspace";

export const Route = createFileRoute("/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory | Alfie Enterprise Finance" },
      {
        name: "description",
        content:
          "Inventory balances by plant and category for the Manufacturing workspace, with turns, slow moving stock and the proposed obsolescence reserve.",
      },
      { property: "og:title", content: "Inventory | Alfie Enterprise Finance" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: InventoryPage,
});

const card = "rounded-2xl border border-border bg-card";

const money0 = (n: number) => `$${n.toLocaleString("en-US")}`;

function PackNotIncluded() {
  const pack = WORKSPACES.find((w) => w.id === "manufacturing") ?? WORKSPACES[0]!;
  return (
    <section className={`${card} mt-6 p-5`}>
      <h3 className="text-sm font-semibold">Inventory is part of the {pack.industry} industry pack</h3>
      <p className="mt-2 max-w-2xl text-[13px] leading-5 text-muted-foreground">
        This module is included in the {pack.industry} pack, shown in the {pack.company} workspace,
        and is not included in the {activeWorkspace.company} workspace. Industry modules are
        configured per client at onboarding; the core finance modules in this workspace are
        unchanged.
      </p>
      <p className="mt-2 max-w-2xl text-[13px] leading-5 text-muted-foreground">
        Use the workspace switcher at the top of the sidebar to open the {pack.companyShort}{" "}
        workspace and see Inventory with its sample data.
      </p>
    </section>
  );
}

function InventoryPage() {
  const navigate = useNavigate();
  const open = (q: string) => navigate({ to: "/planning/analysis", search: { q } });
  const plantTotals = inventoryByPlant.reduce(
    (acc, p) => ({
      rawMaterials: acc.rawMaterials + p.rawMaterials,
      workInProgress: acc.workInProgress + p.workInProgress,
      finishedGoods: acc.finishedGoods + p.finishedGoods,
      total: acc.total + p.total,
    }),
    { rawMaterials: 0, workInProgress: 0, finishedGoods: 0, total: 0 },
  );

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-8 lg:px-10">
        <PageHeader
          title="Inventory"
          description={
            moduleAvailable
              ? "Balances by plant and category for Northline Manufacturing Group, inventory turns, and the slow moving list with Alfie's proposed obsolescence reserve."
              : "Inventory balances and slow moving stock. This module belongs to an industry pack."
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
                ["Total inventory, October close", inventorySummary.totalFormatted],
                ["Inventory turns", inventorySummary.turns],
                ["Slow moving, carrying value", inventorySummary.slowMovingCarrying],
                ["Proposed reserve", inventorySummary.proposedReserve],
              ].map(([label, value]) => (
                <div key={label} className="bg-card p-4">
                  <p className="text-[13px] font-medium text-muted-foreground">{label}</p>
                  <p className="mt-1.5 text-xl font-semibold">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[13px] text-muted-foreground">{inventorySummary.note}</p>

            <section className={`${card} mt-4 p-4`}>
              <div className="flex items-center gap-2">
                <AlfieChip />
                <h3 className="text-sm font-semibold">What Alfie found this month</h3>
              </div>
              <ul className="mt-2.5 space-y-2">
                {alfieInventoryNotes.map((n) => (
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
                    open("Explain the proposed inventory reserve of $582,000 and how each rate was set.")
                  }
                >
                  Explain the proposed reserve
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/accounting/$entryId" params={{ entryId: "JE-2026-1142" }}>
                    Open the JE-2026-1142 true-up
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/reconciliations">Inventory control in Reconciliations</Link>
                </Button>
              </div>
            </section>

            <section className={`${card} mt-6 overflow-hidden`}>
              <div className="p-4 pb-3">
                <h3 className="text-sm font-semibold">Balances by plant</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-sm">
                  <thead>
                    <tr className="border-t border-border text-left text-[13px] text-muted-foreground">
                      {["Plant", "Raw materials", "Work in progress", "Finished goods", "Total"].map(
                        (h) => (
                          <th key={h} className="px-4 py-2 font-medium">
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryByPlant.map((p) => (
                      <tr key={p.plant} className="border-t border-border hover:bg-secondary/50">
                        <td className="px-4 py-2.5">
                          <span className="font-medium">{p.plant}</span>
                          <span className="block text-[13px] text-muted-foreground">{p.entity}</span>
                        </td>
                        <td className="px-4 py-2.5">{money0(p.rawMaterials)}</td>
                        <td className="px-4 py-2.5">{money0(p.workInProgress)}</td>
                        <td className="px-4 py-2.5">{money0(p.finishedGoods)}</td>
                        <td className="px-4 py-2.5 font-medium">{money0(p.total)}</td>
                      </tr>
                    ))}
                    <tr className="border-t border-border bg-secondary/40">
                      <td className="px-4 py-2.5 font-semibold">Group total</td>
                      <td className="px-4 py-2.5 font-semibold">{money0(plantTotals.rawMaterials)}</td>
                      <td className="px-4 py-2.5 font-semibold">{money0(plantTotals.workInProgress)}</td>
                      <td className="px-4 py-2.5 font-semibold">{money0(plantTotals.finishedGoods)}</td>
                      <td className="px-4 py-2.5 font-semibold">{money0(plantTotals.total)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-6">
              <SectionLabel>Balances by category</SectionLabel>
              <div className="mt-3 grid gap-3 lg:grid-cols-3">
                {inventoryByCategory.map((c) => (
                  <article key={c.category} className={`${card} p-4`}>
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="text-sm font-semibold">{c.category}</h4>
                      <p className="text-xl font-semibold">{c.formatted}</p>
                    </div>
                    <span className="mt-3 flex items-center gap-2">
                      <span className="h-1.5 w-full rounded-full bg-secondary">
                        <span
                          className="block h-1.5 rounded-full bg-primary"
                          style={{ width: `${c.sharePct}%` }}
                        />
                      </span>
                      <span className="text-[13px] text-muted-foreground">
                        {c.sharePct.toFixed(1)}%
                      </span>
                    </span>
                    <p className="mt-2 text-[13px] leading-5 text-muted-foreground">{c.note}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-6">
              <SectionLabel>Slow moving and obsolescence</SectionLabel>
              <div className="mt-3 grid gap-3 lg:grid-cols-2">
                {slowMovingItems.map((item) => (
                  <article key={item.sku} className={`${card} p-4`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-semibold">{item.description}</h4>
                      <span className="inline-flex items-center whitespace-nowrap rounded-full bg-secondary px-2 py-0.5 text-[13px] font-medium text-muted-foreground">
                        {item.category}
                      </span>
                    </div>
                    <p className="mt-1 text-[13px] text-muted-foreground">
                      {item.sku} · {item.plant} · {item.quantity} · Last movement {item.lastMovement} ·{" "}
                      {item.monthsOnHand.toFixed(1)} months on hand
                    </p>
                    <p className="mt-2 text-[13px] leading-5 text-muted-foreground">{item.reason}</p>
                    <p className="mt-2 text-[13px] font-medium">
                      Carrying value {money0(item.carryingValue)} · Proposed reserve{" "}
                      {money0(item.proposedReserve)} ({item.proposedReservePct}%)
                    </p>
                  </article>
                ))}
              </div>
              <p className="mt-3 text-[13px] leading-5 text-muted-foreground">
                Slow moving items carry {money0(slowMovingTotal)} in total; the proposed reserve is{" "}
                {money0(proposedReserveTotal)}. The reserve is a proposal for the November close.
                Nothing is written down from this page: an approved reserve is prepared as an entry
                in Accounting and follows the approval rules there.
              </p>
            </section>
          </>
        )}
      </div>
    </AppShell>
  );
}
