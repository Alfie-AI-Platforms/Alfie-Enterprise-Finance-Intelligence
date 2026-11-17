import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Bot, Copy, Save } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { PlanningHeader, SampleDataNote, card } from "@/components/planning-nav";
import {
  basePlanScenario,
  planConstants,
  runPlanScenario,
  seedPlanScenarios,
  type PlanScenarioInputs,
} from "@/lib/planning-data";

export const Route = createFileRoute("/planning/scenarios")({
  head: () => ({ meta: [{ title: "Scenario Modeling | Alfie Enterprise Finance" }] }),
  component: ScenariosPage,
});

type SavedScenario = {
  id: string;
  name: string;
  inputs: PlanScenarioInputs;
  status: string;
  owner: string;
  created: string;
  note: string;
};

const pct = (n: number) => `${n.toFixed(1)}%`;
const money = (n: number) => `$${n.toFixed(1)}M`;

function ScenariosPage() {
  const [inputs, setInputs] = useState<PlanScenarioInputs>({
    ...basePlanScenario,
    steelPct: 8,
    fxRate: 1.42,
  });
  const [name, setName] = useState("");
  const [saved, setSaved] = useState<SavedScenario[]>(
    seedPlanScenarios.map((s) => ({ ...s, inputs: { ...s.inputs } })),
  );
  const [note, setNote] = useState<string | null>(null);

  const baseline = useMemo(() => runPlanScenario(basePlanScenario), []);
  const result = useMemo(() => runPlanScenario(inputs), [inputs]);
  const sensitivity = useMemo(
    () =>
      [0, 4, 8, 12, 16].map((steel) => ({
        steel,
        r: runPlanScenario({ ...inputs, steelPct: steel }),
      })),
    [inputs],
  );

  function set<K extends keyof PlanScenarioInputs>(key: K, value: number) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }
  function save() {
    const id = `SCN-${String.fromCharCode(68 + saved.length)}`;
    setSaved((prev) => [
      {
        id,
        name: name.trim() || `Scenario ${id.slice(4)}, steel ${inputs.steelPct >= 0 ? "+" : ""}${inputs.steelPct}%, USD/CAD ${inputs.fxRate.toFixed(2)}`,
        inputs: { ...inputs },
        status: "Draft",
        owner: "Elena Brooks",
        created: "Nov 16, 2026",
        note: "Saved from the scenario builder. Assumptions are versioned with the scenario.",
      },
      ...prev,
    ]);
    setName("");
    setNote(
      `Saved as ${id} (Draft). Scenarios are separate from the live budget and forecast: nothing here changes FR-2026-008 or FR-2026-011. To act on a scenario, attach it to a Forecast Review so the approval workflow applies.`,
    );
  }
  function duplicate(s: SavedScenario) {
    setSaved((prev) => [
      { ...s, id: `${s.id}-copy`, name: `${s.name} (copy)`, status: "Draft" },
      ...prev,
    ]);
    setNote(
      `Duplicated ${s.id}. The copy keeps the original assumptions as its starting point and is versioned separately.`,
    );
  }

  const slider = (
    label: string,
    key: keyof PlanScenarioInputs,
    min: number,
    max: number,
    step: number,
    display: string,
    hint: string,
  ) => (
    <label className="block text-xs">
      <span className="flex items-center justify-between">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={inputs[key]}
        onChange={(e) => set(key, Number(e.target.value))}
        className="mt-1.5 w-full accent-primary"
      />
      <span className="mt-0.5 block text-[12px] leading-4 text-muted-foreground">{hint}</span>
    </label>
  );

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-8 lg:px-10">
        <PlanningHeader
          title="Scenario Modeling"
          subtitle="Test growth, input cost and currency changes against the FY2027 budget before anything is proposed. Scenarios are a controlled sandbox: they never modify the budget, the forecast or any review."
        />
        <div className="mt-4">
          <SampleDataNote>
            Illustrative sample data. Results are simple arithmetic on the stated assumptions, not
            a financial forecast. The assumptions are printed with every result: steel is{" "}
            {planConstants.steelSharePct}% of revenue, USD denominated revenue is{" "}
            {planConstants.usdSharePct}% of the group, and operating expenses are held at{" "}
            {planConstants.opexRatio}% of revenue.
          </SampleDataNote>
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[380px_minmax(0,1fr)]">
          <section className={`${card} p-5`}>
            <h2 className="text-sm font-semibold">Scenario builder</h2>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Baseline: FY2027 budget revenue {money(basePlanScenario.revenue)}, gross margin{" "}
              {pct(planConstants.grossMargin)}, EBITDA {money(baseline.ebitda)}.
            </p>
            <div className="mt-4 space-y-4">
              {slider(
                "Revenue growth",
                "growthPct",
                -2,
                10,
                0.5,
                `${inputs.growthPct >= 0 ? "+" : ""}${inputs.growthPct}%`,
                "Growth on top of the FY2027 budget revenue of $128.0M, before volume and currency effects.",
              )}
              {slider(
                "Volume change",
                "volumePct",
                -5,
                10,
                0.5,
                `${inputs.volumePct >= 0 ? "+" : ""}${inputs.volumePct}%`,
                "Shipped and billed volume across the group. Scenario C tests +4% from the prospective Logistics contracts.",
              )}
              {slider(
                "Steel price change",
                "steelPct",
                -5,
                25,
                0.5,
                `${inputs.steelPct >= 0 ? "+" : ""}${inputs.steelPct}%`,
                "Steel is 18% of revenue in Manufacturing costs, so each 1% on steel is about 0.18 points of gross margin.",
              )}
              {slider(
                "USD/CAD rate",
                "fxRate",
                1.3,
                1.48,
                0.01,
                inputs.fxRate.toFixed(2),
                "Translation rate for the 27.2% of revenue that is USD denominated. The budget rate is 1.36; the downside uses 1.42.",
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setInputs({ ...basePlanScenario })}
              >
                Budget base
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setInputs((p) => ({ ...p, steelPct: 8, fxRate: 1.42 }))}
              >
                Downside, steel and FX
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setInputs((p) => ({ ...p, steelPct: 0, fxRate: 1.36, volumePct: 4 }))}
              >
                Volume upside
              </Button>
            </div>
            <p className="mt-2 text-[13px] leading-4 text-muted-foreground">
              Presets change assumptions only. Results under the downside are hypothetical
              estimates and are labelled as such wherever they are used.
            </p>
            <div className="mt-4 flex gap-2 border-t border-border pt-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Scenario name (optional)"
                className="h-9 min-w-0 flex-1 rounded-lg border border-border bg-background px-2.5 text-xs outline-none focus:border-ring"
              />
              <Button size="sm" onClick={save}>
                <Save className="size-3.5" /> Save scenario
              </Button>
            </div>
            {note ? <p className="mt-2 text-xs font-medium text-positive">{note}</p> : null}
          </section>

          <div className="space-y-4">
            <section className={`${card} p-5`}>
              <h2 className="text-sm font-semibold">Projected results vs FY2027 budget</h2>
              <table className="mt-2.5 w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="py-2 pr-3 font-medium">Metric</th>
                    <th className="py-2 pr-3 font-medium">Budget</th>
                    <th className="py-2 pr-3 font-medium">Scenario</th>
                    <th className="py-2 font-medium">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {(
                    [
                      ["Revenue", money(baseline.revenue), money(result.revenue), result.revenue - baseline.revenue, "M"],
                      ["Gross margin", pct(baseline.grossMargin), pct(result.grossMargin), result.grossMargin - baseline.grossMargin, "pts"],
                      ["EBITDA", money(baseline.ebitda), money(result.ebitda), result.ebitda - baseline.ebitda, "M"],
                      ["EBITDA margin", pct(baseline.ebitdaMargin), pct(result.ebitdaMargin), result.ebitdaMargin - baseline.ebitdaMargin, "pts"],
                    ] as const
                  ).map(([label, b, s, d, unit]) => (
                    <tr key={label} className="border-b border-border/60 last:border-0">
                      <td className="py-2 pr-3 font-medium">{label}</td>
                      <td className="py-2 pr-3">{b}</td>
                      <td className="py-2 pr-3 font-medium">{s}</td>
                      <td className="py-2">
                        {d >= 0 ? "+" : ""}
                        {unit === "M" ? `$${d.toFixed(1)}M` : `${d.toFixed(1)} pts`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-[13px] leading-4 text-muted-foreground">
                Key driver: at steel {inputs.steelPct >= 0 ? "+" : ""}
                {inputs.steelPct}% and USD/CAD {inputs.fxRate.toFixed(2)}, revenue{" "}
                {result.revenue >= baseline.revenue ? "rises" : "falls"} on translation and volume
                while gross margin{" "}
                {result.grossMargin <= baseline.grossMargin ? "compresses" : "expands"} on input
                costs. The two effects move in opposite directions, which is why this scenario is
                attached to the forecast review rather than summarized as a single number.
              </p>
            </section>

            <section className={`${card} p-5`}>
              <h2 className="text-sm font-semibold">
                Sensitivity: steel price at the current growth and FX settings
              </h2>
              <div className="mt-2.5 grid grid-cols-3 gap-2 sm:grid-cols-5">
                {sensitivity.map(({ steel, r }) => (
                  <div
                    key={steel}
                    className={`rounded-xl p-3 text-center ${steel === inputs.steelPct ? "bg-primary/10 ring-1 ring-primary" : "bg-secondary/50"}`}
                  >
                    <p className="text-[12px] font-medium uppercase tracking-wide text-muted-foreground">
                      Steel {steel >= 0 ? "+" : ""}
                      {steel}%
                    </p>
                    <p className="mt-1 text-sm font-semibold">{pct(r.grossMargin)}</p>
                    <p className="text-[12px] text-muted-foreground">
                      EBITDA {money(r.ebitda)}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[13px] leading-4 text-muted-foreground">
                One variable at a time, everything else held at the builder values. Each 5 points
                on steel is about 0.9 points of gross margin, which is the sensitivity finding
                Alfie carries into the forecast review and the budget book appendix.
              </p>
            </section>

            <section className={`${card} p-5`}>
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <Bot className="size-4 text-primary" /> Alfie, scenario notes
              </h2>
              <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                Scenario B (steel +8%, USD/CAD 1.42) is the downside attached to forecast review
                FR-2026-011 and the downside case in Treasury. Alfie recommends keeping Scenario C
                (volume upside) out of the approval pack until the Logistics contracts are signed:
                it models the revenue without the hiring and capex needed to serve it. Neither
                scenario changes anything in the budget or forecast on its own.
              </p>
            </section>
          </div>
        </div>

        <section className={`${card} mt-4 p-5`}>
          <h2 className="text-sm font-semibold">Scenario comparison</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2 pr-3 font-medium">Scenario</th>
                  <th className="py-2 pr-3 font-medium">Assumptions</th>
                  <th className="py-2 pr-3 font-medium">Revenue</th>
                  <th className="py-2 pr-3 font-medium">Gross margin</th>
                  <th className="py-2 pr-3 font-medium">EBITDA</th>
                  <th className="py-2 pr-3 font-medium">Status</th>
                  <th className="py-2 font-medium" />
                </tr>
              </thead>
              <tbody>
                {saved.map((s) => {
                  const r = runPlanScenario(s.inputs);
                  return (
                    <tr key={s.id} className="border-b border-border/60 last:border-0 align-top">
                      <td className="py-2.5 pr-3">
                        <span className="block font-medium">{s.name}</span>
                        <span className="text-muted-foreground">
                          {s.id} · {s.owner} · {s.created}
                        </span>
                      </td>
                      <td className="py-2.5 pr-3">
                        Growth {s.inputs.growthPct >= 0 ? "+" : ""}
                        {s.inputs.growthPct}%, volume {s.inputs.volumePct >= 0 ? "+" : ""}
                        {s.inputs.volumePct}%, steel {s.inputs.steelPct >= 0 ? "+" : ""}
                        {s.inputs.steelPct}%, USD/CAD {s.inputs.fxRate.toFixed(2)}
                      </td>
                      <td className="py-2.5 pr-3">{money(r.revenue)}</td>
                      <td className="py-2.5 pr-3">{pct(r.grossMargin)}</td>
                      <td className="py-2.5 pr-3">{money(r.ebitda)}</td>
                      <td className="py-2.5 pr-3">{s.status}</td>
                      <td className="py-2.5">
                        <span className="flex gap-1">
                          <Button size="sm" variant="ghost" onClick={() => duplicate(s)}>
                            <Copy className="size-3.5" />
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link to="/planning/reviews">To Forecast Review</Link>
                          </Button>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[13px] leading-4 text-muted-foreground">
            All scenarios share the FY2027 budget baseline and the stated assumptions. Under those
            assumptions the strongest EBITDA comes from the volume upside, and the weakest from the
            steel downside, even though downside revenue is higher. That trade-off is the decision,
            and it belongs to the Forecast Review, not to this page.
          </p>
        </section>
      </div>
    </AppShell>
  );
}
