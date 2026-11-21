import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Info } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/alfie-ui";
import { Button } from "@/components/ui/button";
import {
  bankAccounts,
  forecastNote,
  forecastWeeks,
  termLoan,
  totalCashCad,
  treasuryScenarios,
  usdExposure,
} from "@/lib/treasury-data";

export const Route = createFileRoute("/treasury")({
  head: () => ({
    meta: [
      { title: "Treasury | Alfie Enterprise Finance" },
      {
        name: "description",
        content:
          "Cash across every Meridian bank account, a 13 week forecast, term loan covenant headroom and USD exposure.",
      },
      { property: "og:title", content: "Treasury | Alfie Enterprise Finance" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TreasuryPage,
});

const card = "rounded-2xl border border-border bg-card";
const tip = {
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    fontSize: 12,
    color: "var(--popover-foreground)",
  },
};
const axis = {
  stroke: "var(--muted-foreground)",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
} as const;
const horizons = ["4 weeks", "8 weeks", "13 weeks"] as const;

function TreasuryPage() {
  const navigate = useNavigate();
  const [horizon, setHorizon] = useState<(typeof horizons)[number]>("13 weeks");
  const [selected, setSelected] = useState<string[]>(["Base case"]);
  const open = (q: string) => navigate({ to: "/planning/analysis", search: { q } });
  const points =
    horizon === "4 weeks"
      ? forecastWeeks.slice(0, 4)
      : horizon === "8 weeks"
        ? forecastWeeks.slice(0, 8)
        : forecastWeeks;
  const toggle = (name: string) =>
    setSelected((s) => (s.includes(name) ? s.filter((x) => x !== name) : [...s, name]));

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-8 lg:px-10">
        <PageHeader
          title="Treasury"
          description="Cash position and liquidity for Meridian Group: every bank account, a rolling 13 week forecast, debt and covenant headroom, and the USD exposure that sits behind the consolidated numbers."
        />
        <p className="mt-4 flex items-center gap-1.5 text-[13px] text-muted-foreground">
          <Info className="size-3 shrink-0" />
          Illustrative sample data. Forecasts are estimates built from collection and payment
          patterns, receivables, payables and scheduled debt payments; they are not actual results.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-4">
          {[
            ["Current cash, CAD equivalent", `$${totalCashCad.toFixed(1)}M`],
            ["Forecast low, next 13 weeks", "$11.2M in week 9"],
            ["Term loan", termLoan.balance],
            ["Leverage covenant", `${termLoan.leverage} of ${termLoan.covenantMax} max`],
          ].map(([label, value]) => (
            <div key={label} className="bg-card p-4">
              <p className="text-[13px] font-medium text-muted-foreground">{label}</p>
              <p className="mt-1.5 text-xl font-semibold">{value}</p>
            </div>
          ))}
        </div>

        <section className={`${card} mt-4 overflow-hidden`}>
          <div className="p-4 pb-3">
            <h3 className="text-sm font-semibold">Bank accounts</h3>
            <p className="text-[13px] text-muted-foreground">
              Balances in native currency, with the CAD equivalent used for consolidated reporting
              at USD/CAD 1.36. Account detail and matching live in Reconciliations.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-t border-border text-left text-[13px] text-muted-foreground">
                  {["Account", "Entity", "Type", "Balance", "CAD equivalent", "Bank feed"].map(
                    (h) => (
                      <th key={h} className="px-4 py-2 font-medium">
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {bankAccounts.map((a) => (
                  <tr key={a.id} className="border-t border-border hover:bg-secondary/50">
                    <td className="px-4 py-2.5">
                      <span className="font-medium">
                        {a.bank} · {a.account}
                      </span>
                      <span className="block text-[13px] text-muted-foreground">{a.id}</span>
                    </td>
                    <td className="px-4 py-2.5">{a.entity}</td>
                    <td className="px-4 py-2.5">{a.type}</td>
                    <td className="px-4 py-2.5">{a.balanceNative}</td>
                    <td className="px-4 py-2.5 font-medium">${a.balanceCad.toFixed(1)}M</td>
                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-status-active px-2 py-0.5 text-[13px] font-medium text-status-active-foreground">
                        <span className="size-1.5 rounded-full bg-current" />
                        {a.feed}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-border bg-secondary/40">
                  <td className="px-4 py-2.5 font-semibold" colSpan={4}>
                    Total cash, CAD equivalent
                  </td>
                  <td className="px-4 py-2.5 font-semibold">${totalCashCad.toFixed(1)}M</td>
                  <td className="px-4 py-2.5" />
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className={`${card} mt-4 p-4`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold">13 week cash forecast</h3>
              <p className="text-[13px] text-muted-foreground">
                Closing cash by week, $M CAD equivalent, base case
              </p>
            </div>
            <div className="flex flex-wrap rounded-lg bg-secondary p-0.5">
              {horizons.map((h) => (
                <button
                  key={h}
                  onClick={() => setHorizon(h)}
                  className={`rounded-md px-2 py-1 text-[13px] ${horizon === h ? "bg-card font-medium shadow-sm" : "text-muted-foreground"}`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-3 h-56">
            <ResponsiveContainer>
              <AreaChart data={points}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="week" {...axis} />
                <YAxis {...axis} width={34} domain={[8, 20]} />
                <Tooltip {...tip} />
                <Area
                  dataKey="balance"
                  name="Closing cash"
                  stroke="var(--primary)"
                  fill="var(--primary)"
                  fillOpacity={0.12}
                  strokeWidth={2}
                />
                <Area
                  dataKey="inflows"
                  name="Inflows"
                  stroke="var(--muted-foreground)"
                  fill="var(--muted-foreground)"
                  fillOpacity={0.06}
                  strokeWidth={1.5}
                />
                <Area
                  dataKey="outflows"
                  name="Outflows"
                  stroke="var(--warning)"
                  fill="var(--warning)"
                  fillOpacity={0.08}
                  strokeWidth={1.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 max-w-3xl text-[13px] leading-5 text-muted-foreground">
            {forecastNote}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                open("Explain the 13 week cash forecast and why week 9 is the lowest point.")
              }
            >
              Explain this forecast with Alfie
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/reconciliations">Open Reconciliations</Link>
            </Button>
          </div>
        </section>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <section className={`${card} p-4`}>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold">Term loan and covenant</h3>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-status-active px-2 py-0.5 text-[13px] font-medium text-status-active-foreground">
                <span className="size-1.5 rounded-full bg-current" />
                {termLoan.status}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              {[
                ["Facility", termLoan.facility],
                ["Balance", termLoan.balance],
                ["Covenant", termLoan.covenant],
                ["Current leverage", termLoan.leverage],
                ["Covenant maximum", termLoan.covenantMax],
                ["Headroom", termLoan.headroom],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-secondary/50 px-2.5 py-1.5">
                  <span className="block text-[12px] uppercase tracking-wide text-muted-foreground">
                    {k}
                  </span>
                  {v}
                </div>
              ))}
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-2 rounded-full bg-primary" style={{ width: "70%" }} />
            </div>
            <p className="mt-1.5 text-[13px] text-muted-foreground">
              Leverage at 2.1x against the 3.0x maximum. {termLoan.testDate}.
            </p>
            <p className="mt-2 text-[13px] leading-5 text-muted-foreground">{termLoan.note}</p>
          </section>

          <section className={`${card} p-4`}>
            <h3 className="text-sm font-semibold">USD exposure</h3>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              {[
                ["USD cash", usdExposure.usdCash],
                ["CAD equivalent", usdExposure.usdCashCad],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-secondary/50 px-2.5 py-1.5">
                  <span className="block text-[12px] uppercase tracking-wide text-muted-foreground">
                    {k}
                  </span>
                  {v}
                </div>
              ))}
            </div>
            <p className="mt-3 text-[13px] leading-5 text-muted-foreground">{usdExposure.detail}</p>
            <p className="mt-2 text-[13px] leading-5 text-muted-foreground">
              {usdExposure.sensitivity}
            </p>
            <p className="mt-2 text-[13px] leading-5 text-muted-foreground">
              {usdExposure.intercompany}
            </p>
          </section>
        </div>

        <section className="mt-4">
          <h3 className="text-sm font-semibold">Scenario analysis</h3>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Select scenarios to compare their effect on the low point and the closing cash position
            over the 13 weeks.
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {treasuryScenarios.map((s) => {
              const active = selected.includes(s.name);
              return (
                <button
                  key={s.name}
                  onClick={() => toggle(s.name)}
                  className={`rounded-2xl border p-4 text-left transition-colors ${active ? "border-primary bg-panel" : "border-border bg-card hover:bg-secondary/50"}`}
                  aria-pressed={active}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold">{s.name}</span>
                    <span className="text-[12px] font-medium text-primary">
                      {active ? "Selected" : "Select to compare"}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{s.assumption}</p>
                  <div className="mt-3 flex gap-6 text-xs">
                    <span>
                      Lowest point
                      <br />
                      <strong className="text-sm">{s.lowPoint}</strong>
                    </span>
                    <span>
                      Cash at week 13
                      <br />
                      <strong className="text-sm">{s.endCash}</strong>
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-5">{s.impact}</p>
                </button>
              );
            })}
          </div>
          {selected.length > 1 ? (
            <p className="mt-3 text-xs text-muted-foreground">
              Comparing {selected.join(", ")}. In every selected scenario the lowest cash position
              stays positive across the 13 weeks. Ask Alfie to walk through any scenario in the
              Planning analysis workspace.
            </p>
          ) : null}
        </section>
      </div>
    </AppShell>
  );
}
