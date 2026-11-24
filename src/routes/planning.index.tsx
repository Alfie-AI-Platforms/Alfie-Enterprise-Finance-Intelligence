import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowDownRight, ArrowUpRight, FileBarChart, FlaskConical, Plus, Sparkle } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AlfieMark } from "@/components/alfie-ui";
import { Button } from "@/components/ui/button";
import { AlfieComposer, type Attachment } from "@/components/alfie-composer";
import { PlanningHeader, SampleDataNote, card } from "@/components/planning-nav";
import { entities, kpis, monthlyRevenue, planningOverview, planningPrompts } from "@/lib/planning-data";
import { activeWorkspace } from "@/lib/workspace";

export const Route = createFileRoute("/planning/")({
  head: () => ({
    meta: [
      { title: "Planning & FP&A | Alfie Enterprise Finance" },
      {
        name: "description",
        content: `Budget versus actual, forecasts, scenarios and forecast reviews for ${activeWorkspace.companyShort}, with Alfie.`,
      },
      { property: "og:title", content: "Planning & FP&A | Alfie Enterprise Finance" },
      { property: "og:description", content: "AI powered planning and FP&A workspace for the CFO office." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PlanningOverview,
});

const prompts = planningPrompts;
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

function PlanningOverview() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [view, setView] = useState<"Monthly" | "Cumulative">("Monthly");
  const open = (q: string, _files: Attachment[] = []) =>
    navigate({ to: "/planning/analysis", search: { q: q || "Analyze the attached files." } });

  const series =
    view === "Monthly"
      ? monthlyRevenue
      : monthlyRevenue.map((m, i) => ({
          ...m,
          actual: +monthlyRevenue.slice(0, i + 1).reduce((a, b) => a + b.actual, 0).toFixed(1),
          budget: +monthlyRevenue.slice(0, i + 1).reduce((a, b) => a + b.budget, 0).toFixed(1),
        }));
  const varianceData = entities.map((e) => ({
    name: e.entity,
    value: +(e.revenue - e.budget).toFixed(1),
  }));

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-8 lg:px-10">
        <PlanningHeader
          title="Planning & FP&A"
          subtitle={`Budget versus actual, the rolling forecast, scenarios and the FY2027 budget for ${activeWorkspace.companyShort}, prepared and explained with Alfie.`}
          actions={
            <>
              <Button variant="outline" onClick={() => navigate({ to: "/planning/analysis" })}>
                <Plus className="size-4" />
                New Analysis
              </Button>
              <Button variant="outline" onClick={() => navigate({ to: "/planning/scenarios" })}>
                <FlaskConical className="size-4" />
                Create Scenario
              </Button>
              <Button onClick={() => navigate({ to: "/planning/reports" })}>
                <FileBarChart className="size-4" />
                Generate Report
              </Button>
            </>
          }
        />

        <section className="mt-6 rounded-2xl border border-border bg-panel p-4">
          <div className="mb-3 flex items-center gap-2">
            <AlfieMark />
            <h2 className="text-sm font-semibold">Ask Alfie about your plan, budget and forecast.</h2>
          </div>
          <AlfieComposer
            value={prompt}
            onChange={setPrompt}
            onSend={open}
            placeholder="Ask Alfie to explain a variance, walk through a forecast review, or test a scenario..."
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {prompts.map((p) => (
              <Button
                key={p}
                variant="secondary"
                size="sm"
                className="h-auto whitespace-normal py-1.5 text-left font-normal"
                onClick={() => open(p)}
              >
                <Sparkle className="size-3 shrink-0 text-primary" />
                {p}
              </Button>
            ))}
          </div>
        </section>

        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Performance against budget, Jan to Oct 2026</h2>
          <SampleDataNote />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-5">
          {kpis.map((k) => (
            <button
              key={k.key}
              onClick={() => open(k.prompt)}
              className="group bg-card p-4 text-left transition-colors hover:bg-secondary/60"
              title="Open analysis with Alfie"
            >
              <p className="text-[13px] font-medium text-muted-foreground">{k.label}</p>
              <p className="mt-1.5 text-2xl font-semibold">{k.value}</p>
              <p
                className={`mt-1 flex items-center gap-0.5 text-[12px] ${k.good ? "text-positive" : "text-warning"}`}
              >
                {k.up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                {k.delta}
              </p>
              <p className="mt-2 text-[12px] text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Analyze with Alfie →
              </p>
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <section className={`${card} p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">Revenue, actual vs budget</h3>
                <p className="text-[13px] text-muted-foreground">Revenue by month, $M</p>
              </div>
              <div className="flex rounded-lg bg-secondary p-0.5">
                {(["Monthly", "Cumulative"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`rounded-md px-2 py-1 text-[13px] ${view === v ? "bg-card font-medium shadow-sm" : "text-muted-foreground"}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-3 h-52">
              <ResponsiveContainer>
                <AreaChart data={series}>
                  <CartesianGrid stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="period" {...axis} />
                  <YAxis {...axis} width={34} />
                  <Tooltip {...tip} />
                  <Area
                    dataKey="actual"
                    name="Actual"
                    stroke="var(--primary)"
                    fill="var(--primary)"
                    fillOpacity={0.12}
                    strokeWidth={2}
                  />
                  <Area
                    dataKey="budget"
                    name="Budget"
                    stroke="var(--warning)"
                    fill="var(--warning)"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
          <section className={`${card} p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">Margin trend</h3>
                <p className="text-[13px] text-muted-foreground">
                  Gross margin and EBITDA margin by month, budget gross margin{" "}
                  {planningOverview.budgetGrossMargin}%
                </p>
              </div>
            </div>
            <div className="mt-3 h-52">
              <ResponsiveContainer>
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="period" {...axis} />
                  <YAxis {...axis} width={34} domain={["dataMin - 4", "dataMax + 4"]} unit="%" />
                  <Tooltip {...tip} />
                  <ReferenceLine
                    y={planningOverview.budgetGrossMargin}
                    stroke="var(--muted-foreground)"
                    strokeDasharray="4 4"
                    label={{
                      value: "Budget GM",
                      fontSize: 10,
                      fill: "var(--muted-foreground)",
                      position: "insideTopLeft",
                    }}
                  />
                  <Line
                    dataKey="grossMargin"
                    name="Gross margin %"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    dataKey="ebitdaMargin"
                    name="EBITDA margin %"
                    stroke="var(--warning)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <section className={`${card} overflow-hidden`}>
            <div className="p-4 pb-2">
              <h3 className="text-sm font-semibold">Performance by entity, YTD</h3>
              <p className="text-[13px] text-muted-foreground">
                Click an entity to investigate with Alfie
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[13px] text-muted-foreground">
                    {["Entity", "Revenue", "Budget", "Variance", "Gross margin", "EBITDA margin"].map(
                      (h) => (
                        <th key={h} className="px-4 py-2 font-medium">
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {entities.map((e) => {
                    const variance = +(e.revenue - e.budget).toFixed(1);
                    const variancePct = ((variance / e.budget) * 100).toFixed(1);
                    return (
                      <tr
                        key={e.entity}
                        onClick={() =>
                          open(`Analyze ${e.entity} performance against budget year to date.`)
                        }
                        className="cursor-pointer border-t border-border hover:bg-secondary/50"
                      >
                        <td className="px-4 py-2.5">
                          <span className="font-medium">{e.entity}</span>
                          <span className="block text-[13px] text-muted-foreground">{e.detail}</span>
                        </td>
                        <td className="px-4">${e.revenue.toFixed(1)}M</td>
                        <td className="px-4">${e.budget.toFixed(1)}M</td>
                        <td className="px-4">
                          <span className={variance >= 0 ? "text-positive" : "text-destructive"}>
                            {variance >= 0 ? "+" : ""}${variance.toFixed(1)}M ({variancePct}%)
                          </span>
                        </td>
                        <td className="px-4">{e.grossMargin.toFixed(1)}%</td>
                        <td className="px-4">{e.ebitdaMargin.toFixed(1)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
          <section className={`${card} p-4`}>
            <div>
              <h3 className="text-sm font-semibold">Revenue variance by entity</h3>
              <p className="text-[13px] text-muted-foreground">
                YTD actual less budget, $M. {planningOverview.groupVarianceNote}
              </p>
            </div>
            <div className="mt-3 h-56">
              <ResponsiveContainer>
                <BarChart data={varianceData} layout="vertical" margin={{ left: 10 }}>
                  <XAxis type="number" {...axis} unit="M" />
                  <YAxis type="category" dataKey="name" {...axis} width={110} />
                  <Tooltip
                    {...tip}
                    formatter={(v) => [`$${v}M`, "Revenue variance"]}
                  />
                  <ReferenceLine x={0} stroke="var(--border)" />
                  <Bar dataKey="value" fill="var(--primary)" radius={4} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-1 text-[13px] text-muted-foreground">
              {planningOverview.entityNote}
            </p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
