import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Info, RefreshCw } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AlfieChip, PageHeader, SectionLabel } from "@/components/alfie-ui";
import { Button } from "@/components/ui/button";
import {
  alfieRecNotes,
  recAccounts,
  recExceptions,
  recSummary,
  type RecAccountStatus,
} from "@/lib/reconciliations-data";

export const Route = createFileRoute("/reconciliations")({
  head: () => ({
    meta: [
      { title: "Reconciliations | Alfie Enterprise Finance" },
      {
        name: "description",
        content:
          "Bank, subledger and control account reconciliations for Meridian Group, with continuous auto-matching and one exceptions queue.",
      },
      { property: "og:title", content: "Reconciliations | Alfie Enterprise Finance" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ReconciliationsPage,
});

const card = "rounded-2xl border border-border bg-card";

const good = new Set(["Reconciled", "In review"]);
const warn = new Set(["Exception", "Open"]);
const info = new Set(["In Progress", "Correction prepared"]);

function Badge({ status }: { status: string }) {
  const tone = good.has(status)
    ? "bg-status-active text-status-active-foreground"
    : warn.has(status)
      ? "bg-destructive/10 text-destructive"
      : info.has(status)
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

const filters: readonly ("All accounts" | RecAccountStatus)[] = [
  "All accounts",
  "Reconciled",
  "In Progress",
  "Exception",
  "Not Started",
];

function ReconciliationsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<(typeof filters)[number]>("All accounts");
  const [runNote, setRunNote] = useState<string | null>(null);
  const visible = useMemo(
    () => (filter === "All accounts" ? recAccounts : recAccounts.filter((a) => a.status === filter)),
    [filter],
  );
  const open = (q: string) => navigate({ to: "/planning/analysis", search: { q } });

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-8 lg:px-10">
        <PageHeader
          title="Reconciliations"
          description="Every bank, card, subledger and control account for Meridian Group, matched continuously by Alfie, with one exceptions queue for the lines a person needs to look at."
          actions={
            <Button
              variant="outline"
              onClick={() =>
                setRunNote(
                  "Matching run completed just now. No new exceptions; the six open exceptions below are unchanged.",
                )
              }
            >
              <RefreshCw className="size-4" />
              Run matching
            </Button>
          }
        />
        <p className="mt-4 flex items-center gap-1.5 text-[13px] text-muted-foreground">
          <Info className="size-3 shrink-0" />
          Illustrative sample data, not verified financial records until connected to your systems.
        </p>
        {runNote ? (
          <p className="mt-3 rounded-xl bg-positive/10 p-3 text-xs font-medium leading-5 text-positive">
            {runNote}
          </p>
        ) : null}

        <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-4">
          {[
            ["Accounts reconciled", `${recSummary.accounts}`],
            ["Auto-matched, November", recSummary.autoMatched],
            ["Fully reconciled", `${recSummary.reconciled} of ${recSummary.accounts}`],
            ["Open exceptions", `${recSummary.openExceptions}`],
          ].map(([label, value]) => (
            <div key={label} className="bg-card p-4">
              <p className="text-[13px] font-medium text-muted-foreground">{label}</p>
              <p className="mt-1.5 text-xl font-semibold">{value}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[13px] text-muted-foreground">{recSummary.note}</p>

        <section className={`${card} mt-4 p-4`}>
          <div className="flex items-center gap-2">
            <AlfieChip />
            <h3 className="text-sm font-semibold">What Alfie found this week</h3>
          </div>
          <ul className="mt-2.5 space-y-2">
            {alfieRecNotes.map((n) => (
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
                open("Explain the payroll clearing difference of $3,215 and whether it needs a journal entry.")
              }
            >
              Explain the payroll clearing difference
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/close">Open the November close</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/treasury">View cash accounts in Treasury</Link>
            </Button>
          </div>
        </section>

        <section className={`${card} mt-4 overflow-hidden`}>
          <div className="flex flex-wrap items-center gap-2 p-4 pb-3">
            <h3 className="text-sm font-semibold">Accounts</h3>
            <span className="ml-auto flex flex-wrap gap-1">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-2.5 py-1 text-[13px] font-medium ${filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                >
                  {f}
                </button>
              ))}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="border-t border-border text-left text-[13px] text-muted-foreground">
                  {["Account", "Type", "Entity", "GL balance", "Source balance", "Difference", "Auto-matched", "Status", "Owner"].map(
                    (h) => (
                      <th key={h} className="px-4 py-2 font-medium">
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {visible.map((a) => (
                  <tr key={a.id} className="border-t border-border hover:bg-secondary/50">
                    <td className="px-4 py-2.5">
                      <span className="font-medium">{a.account}</span>
                      <span className="block text-[13px] text-muted-foreground">
                        {a.id} · Last activity {a.lastActivity}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">{a.type}</td>
                    <td className="px-4 py-2.5">{a.entity}</td>
                    <td className="px-4 py-2.5">{a.glBalance}</td>
                    <td className="px-4 py-2.5">{a.sourceBalance}</td>
                    <td className={`px-4 py-2.5 ${a.difference !== "$0" ? "font-medium" : ""}`}>
                      {a.difference}
                    </td>
                    <td className="px-4 py-2.5">
                      {a.matchedPct == null ? (
                        <span className="text-muted-foreground">Not started</span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <span className="h-1.5 w-16 rounded-full bg-secondary">
                            <span
                              className={`block h-1.5 rounded-full ${a.matchedPct >= 95 ? "bg-primary" : "bg-warning"}`}
                              style={{ width: `${a.matchedPct}%` }}
                            />
                          </span>
                          {a.matchedPct.toFixed(1)}%
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      <Badge status={a.status} />
                    </td>
                    <td className="px-4 py-2.5">{a.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6">
          <SectionLabel>Exceptions queue</SectionLabel>
          <div className="mt-3 grid gap-3 lg:grid-cols-2">
            {recExceptions.map((e) => (
              <article key={e.id} className={`${card} p-4`}>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-semibold">{e.title}</h4>
                  <Badge status={e.status} />
                </div>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  {e.id} · {e.account} · {e.amount} · Open {e.age} · Owner {e.owner}
                </p>
                <p className="mt-2 text-[13px] leading-5 text-muted-foreground">{e.detail}</p>
                {e.id === "EX-03" ? (
                  <Button asChild size="sm" variant="outline" className="mt-3">
                    <Link to="/accounting/$entryId" params={{ entryId: "JE-2026-1087" }}>
                      Open JE-2026-1087
                    </Link>
                  </Button>
                ) : null}
              </article>
            ))}
          </div>
          <p className="mt-3 text-[13px] leading-5 text-muted-foreground">
            Exceptions never adjust the books on their own. Anything that needs an entry is prepared
            in Accounting and follows the approval rules there; timing differences are left to clear
            and are rechecked on every feed import.
          </p>
        </section>
      </div>
    </AppShell>
  );
}
