import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Circle,
  Database,
  Download,
  FlaskConical,
  PanelRightClose,
  PanelRightOpen,
  Share2,
  Sparkle,
  Upload,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AlfieMark } from "@/components/alfie-ui";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlfieComposer, AttachmentChip, type Attachment } from "@/components/alfie-composer";
import { PlanningNav, SampleDataNote } from "@/components/planning-nav";
import {
  basePlanScenario,
  planningAudit,
  planningDataSources,
  runPlanScenario,
} from "@/lib/planning-data";

export const Route = createFileRoute("/planning/analysis")({
  validateSearch: (s: Record<string, unknown>): { q?: string } => {
    const q = s["q"];
    return typeof q === "string" && q ? { q } : {};
  },
  head: () => ({
    meta: [
      { title: "Planning Analysis | Alfie Enterprise Finance" },
      {
        name: "description",
        content: "Investigate budget variances and forecast changes in a conversation with Alfie.",
      },
      { property: "og:title", content: "Planning Analysis | Alfie Enterprise Finance" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AnalysisWorkspace,
});

type Section = { title: string; items: string[] };
type Reply = {
  intro: string;
  sections?: Section[];
  table?: string[][];
  confidence?: string;
  limitations?: string[];
  sources?: string[];
  agents?: string[];
  actions?: string[];
};
type Msg = { id: string; role: "user" | "alfie"; text?: string; files?: Attachment[]; reply?: Reply };

const followUps = [
  "Why was October below budget?",
  "What happens if steel prices rise 8%?",
  "Walk me through FR-2026-011.",
  "Compare Q3 forecast accuracy.",
  "Summarize the FY2027 budget.",
];
const workflow = [
  "Data Collection",
  "Data Validation",
  "Variance Analysis",
  "Forecast Update",
  "Scenario Modeling",
  "FP&A Review",
  "Approval",
  "Final Report",
];
const pct = (n: number) => `${n.toFixed(1)}%`;
const money = (n: number) => `$${n.toFixed(1)}M`;

function replyFor(q: string, files: Attachment[], turn: number): Reply {
  const p = q.toLowerCase();
  if (files.length)
    return {
      intro: `I read ${files.length === 1 ? "the attached file" : `the ${files.length} attached files`} in the context of the FY2026 forecast analysis.`,
      sections: [
        {
          title: "What I extracted",
          items: files.map((f) =>
            /budget/i.test(f.name)
              ? `${f.name}: budget figures by entity and month; totals agree to the $99.4M YTD budget in NetSuite.`
              : /forecast/i.test(f.name)
                ? `${f.name}: forecast assumptions detected; the steel and FX assumptions match Scenario B.`
                : /xlsx|csv/i.test(f.name)
                  ? `${f.name}: structured data detected; columns mapped to entity, period, revenue and cost.`
                  : `${f.name}: narrative content summarized; no conflicting assumptions found.`,
          ),
        },
        {
          title: "How it affects this analysis",
          items: [
            "Used as conversation context only, not added to the planning data in NetSuite.",
            "Figures from uploaded files are treated as unverified until reconciled with source systems.",
          ],
        },
      ],
      confidence: "Moderate, uploaded data not yet reconciled",
      sources: files.map((f) => f.name),
      actions: ["Add to repository", "Ask Follow-up"],
    };
  if (p.includes("steel") || p.includes("downside") || p.includes("8%")) {
    const b = runPlanScenario(basePlanScenario);
    const d = runPlanScenario({ ...basePlanScenario, steelPct: 8, fxRate: 1.42 });
    return {
      intro:
        "The downside scenario from Planning, applied to the FY2027 budget: steel prices up 8% and USD/CAD at 1.42, on the stated scenario assumptions.",
      table: [
        ["Metric", "FY2027 budget", "Downside"],
        ["Revenue", money(b.revenue), money(d.revenue)],
        ["Gross margin", pct(b.grossMargin), pct(d.grossMargin)],
        ["EBITDA", money(b.ebitda), money(d.ebitda)],
        ["EBITDA margin", pct(b.ebitdaMargin), pct(d.ebitdaMargin)],
      ],
      sections: [
        {
          title: "Interpretation",
          items: [
            "Revenue rises slightly because 27.2% of it is USD denominated and translates at a weaker CAD. Margin is where the downside lands: steel at 18% of revenue turns an 8% price rise into about 1.4 points of gross margin.",
            "This is the scenario attached to FR-2026-011 and used as the downside case in Treasury, where the week 9 cash low falls to $9.6M.",
          ],
        },
      ],
      confidence: "Illustrative, simple arithmetic on stated assumptions, not a forecast",
      limitations: ["Steel share and USD share are planning assumptions, reviewed in Forecast Reviews.", "No volume response to price changes is modeled."],
      agents: ["Scenario Agent"],
      sources: ["Scenario B", "NetSuite"],
      actions: ["Open in Scenario Modeling", "Ask Follow-up"],
    };
  }
  if (p.includes("october"))
    return {
      intro: "October 2026 is the only month this year below budget:",
      table: [
        ["Measure", "Actual", "Budget"],
        ["Group revenue", "$9.8M", "$10.1M"],
        ["Gross margin", "40.9%", "41.2%"],
        ["EBITDA margin", "12.2%", "12.5%"],
      ],
      sections: [
        {
          title: "What happened",
          items: [
            "Manufacturing shipments scheduled for the last week of October slipped into November, taking about $0.4M of revenue with them.",
            "Logistics and Retail were both within 1% of budget, so this is a timing story in one entity, not a demand problem.",
          ],
        },
        {
          title: "What FP&A did with it",
          items: [
            "No forecast change was made on October alone. The slipped shipments are counted once, in the Q4 forecast review FR-2026-011.",
          ],
        },
      ],
      confidence: "High",
      agents: ["Variance Analysis Agent"],
      sources: ["NetSuite", "Salesforce order book"],
      actions: ["Open Forecast Review", "Ask Follow-up"],
    };
  if (p.includes("fr-2026-011") || p.includes("forecast review") || p.includes("q4"))
    return {
      intro:
        "FR-2026-011 is the Q4 2026 forecast update, prepared by Grace Liu, and it is at the Approval stage:",
      sections: [
        {
          title: "The proposal",
          items: [
            "Q4 revenue forecast raised from $28.5M to $29.0M, a change of +1.8%, on Logistics contract volume.",
            "FY2026 forecast revenue becomes $121.8M. Gross margin is held at 41.2% in the base case.",
          ],
        },
        {
          title: "Evidence and approvals",
          items: [
            "October actuals are in and November is tracking ahead of the prior forecast.",
            "The downside scenario (steel up 8%, USD/CAD 1.42) is attached at Elena Brooks' request, so the steel exposure is visible in the same pack.",
            "The +1.8% change exceeds the FP&A Director authority of 1.5%, so approval sits with the VP Finance or CFO. Publishing follows CFO sign-off.",
          ],
        },
      ],
      confidence: "High for the revenue line; margin depends on steel prices holding",
      limitations: ["Retail actuals are 11 days old because the QuickBooks connection has expired."],
      agents: ["Forecasting Agent", "Variance Analysis Agent"],
      sources: ["FR-2026-011", "Scenario B", "NetSuite"],
      actions: ["Open Forecast Review", "Ask Follow-up"],
    };
  if (p.includes("accuracy") || p.includes("q3"))
    return {
      intro: "Q3 2026 forecast accuracy, from the published review FR-2026-005:",
      table: [
        ["Metric", "Forecast", "Actual"],
        ["Q3 revenue", "$30.5M", "$30.6M"],
        ["Q3 gross margin", "41.0%", "41.1%"],
        ["Q3 EBITDA margin", "12.1%", "12.4%"],
        ["Closing cash, Oct 31", "$17.9M", "$18.4M"],
      ],
      sections: [
        {
          title: "Takeaway",
          items: [
            "Every headline measure landed inside the 2% tolerance the forecast is managed to.",
            "Freight costs have run light for two quarters; the Q4 forecast now uses the lower run rate explicitly instead of treating it as a surprise.",
          ],
        },
      ],
      confidence: "High",
      agents: ["Financial Analysis Agent"],
      sources: ["FR-2026-005", "NetSuite"],
      actions: ["Ask Follow-up"],
    };
  if (p.includes("fy2027") || p.includes("budget") && p.includes("summar"))
    return {
      intro: "The FY2027 budget, currently in internal review as FR-2026-008:",
      sections: [
        {
          title: "Headlines",
          items: [
            "Revenue $128.0M, up 5.1% on the FY2026 forecast of $121.8M.",
            "Gross margin held at 41.2% and EBITDA of $16.1M at a 12.6% margin.",
            "Operating expense ratio held at 28.6% of revenue.",
          ],
        },
        {
          title: "Assumptions to challenge",
          items: [
            "Volume growth is concentrated in Logistics; Manufacturing carries the steel price risk at 18% of revenue.",
            "USD/CAD is budgeted at 1.36. The downside scenario at 1.42 with steel up 8% takes EBITDA to about $14.5M.",
            "The budget goes to the board on Dec 10, 2026 after internal review and CFO sign-off, with the downside as an appendix.",
          ],
        },
      ],
      confidence: "Moderate, the budget is still in internal review",
      agents: ["Forecasting Agent"],
      sources: ["FR-2026-008", "FY2027 Budget Book"],
      actions: ["Open Forecast Review", "Ask Follow-up"],
    };
  if (p.includes("entity") || p.includes("logistics") || p.includes("manufacturing") || p.includes("retail"))
    return {
      intro: "Performance by entity, Jan to Oct 2026:",
      table: [
        ["Entity", "Revenue", "Budget", "Gross margin"],
        ["Manufacturing", "$58.4M", "$56.9M", "38.2%"],
        ["Logistics", "$27.9M", "$26.8M", "44.0%"],
        ["Retail", "$16.3M", "$15.7M", "47.2%"],
      ],
      sections: [
        {
          title: "Reading the table",
          items: [
            "All three entities are ahead of budget. Logistics has the largest percentage beat, +4.1%, on contract volume.",
            "Retail has the strongest margins and the weakest data: its actuals are 11 days old while the QuickBooks connection is expired.",
          ],
        },
      ],
      confidence: "High for Manufacturing and Logistics; moderate for Retail until its data is current",
      agents: ["Variance Analysis Agent"],
      sources: ["NetSuite", "Spreadsheet uploads, Retail POS"],
      actions: ["Ask Follow-up"],
    };
  return {
    intro:
      "Here is the year to date position against budget, and what needs attention before the Q4 forecast is approved.",
    sections: [
      {
        title: "1. Performance against budget",
        items: [
          "Revenue $102.6M against a $99.4M budget, +3.2%.",
          "Gross margin 41.2%, 0.4 points ahead of budget.",
          "EBITDA $12.9M at a 12.6% margin, ahead of the 12.2% budget.",
        ],
      },
      {
        title: "2. What drove it",
        items: [
          "Logistics contract volume is the largest single driver, and it also drives the Q4 forecast increase.",
          "Freight costs ran light through Q3, which flatters margin and is now built into the forecast explicitly.",
          "October is the only month below budget, on Manufacturing shipments that slipped into November.",
        ],
      },
      {
        title: "3. What needs attention",
        items: [
          "FR-2026-011, the Q4 forecast update, is at Approval and needs a VP Finance or CFO decision.",
          "Retail actuals are 11 days old because the QuickBooks connection has expired; the Retail forecast should be re-run once it is restored.",
          "Steel is 18% of revenue in Manufacturing costs, so the FY2027 margin plan carries a single-input exposure that only the downside scenario shows.",
        ],
      },
    ],
    confidence: "High at group level; Retail entity level is limited by stale data",
    limitations: [
      "Retail actuals are 11 days old (QuickBooks authentication expired).",
      "November expense actuals are estimated while the Concur sync is stale.",
    ],
    agents: ["Variance Analysis Agent", "Forecasting Agent"],
    sources: ["NetSuite", "Salesforce", "TD Bank feed", "Chase Bank feed"],
    actions: ["Open in Scenario Modeling", "Ask Follow-up"],
  };
}

function AnalysisWorkspace() {
  const { q } = Route.useSearch();
  const first =
    q ?? "Explain our performance against budget year to date and what needs attention before the Q4 forecast is approved.";
  const [messages, setMessages] = useState<Msg[]>(() => [
    { id: "u0", role: "user", text: first },
    { id: "a0", role: "alfie", reply: replyFor(first, [], 0) },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [panel, setPanel] = useState(true);
  const [stage, setStage] = useState(2);
  const [confirm, setConfirm] = useState<Attachment[] | null>(null);
  const [savedFiles, setSavedFiles] = useState<string[]>([]);
  const [lastFiles, setLastFiles] = useState<Attachment[]>([]);
  const [audit, setAudit] = useState(planningAudit);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  const send = (text: string, files: Attachment[] = []) => {
    const t = text || "Analyze the attached files.";
    setInput("");
    if (files.length) setLastFiles(files);
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", text: t, files }]);
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "alfie", reply: replyFor(t, files, m.length) }]);
      setThinking(false);
      if (/scenario|steel|%|downside/i.test(t)) setStage((s) => Math.max(s, 4));
      else if (/fr-2026|review/i.test(t)) setStage((s) => Math.max(s, 5));
      setAudit((a) => [
        ...a,
        {
          time: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
          actor: "Alfie",
          type: "Alfie" as const,
          action: files.length ? "Documents analyzed" : "Analysis response",
          detail: t.slice(0, 70),
        },
      ]);
    }, 800);
  };
  const action = (a: string) => {
    if (a === "Ask Follow-up") return;
    if (a === "Add to repository") setConfirm(lastFiles);
  };

  const right = panel ? (
    <aside className="scrollbar-thin hidden w-[320px] shrink-0 overflow-y-auto border-l border-border bg-panel p-4 xl:block">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Planning Context</h2>
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          onClick={() => setPanel(false)}
          aria-label="Collapse context panel"
        >
          <PanelRightClose className="size-4" />
        </Button>
      </div>
      <Group
        title="Analysis Details"
        rows={[
          ["Analysis", "FY2026 Forecast and Variance"],
          ["ID", "FA-2026-021"],
          ["Scope", "Group, all entities"],
          ["Reporting period", "Jan to Oct 2026"],
          ["Created by", "Grace Liu"],
          ["Created", "Nov 15, 2026"],
          ["Last updated", "Just now"],
          ["Status", "In progress"],
        ]}
      />
      <Group
        title="Group Information"
        rows={[
          ["YTD revenue", "$102.6M"],
          ["YTD budget", "$99.4M"],
          ["Gross margin", "41.2%"],
          ["EBITDA", "$12.9M (12.6%)"],
          ["Q4 forecast revenue", "$29.0M"],
          ["FY2027 budget revenue", "$128.0M"],
        ]}
      />
      <Collapsible title="Data Sources">
        {planningDataSources.slice(0, 6).map((d) => (
          <div key={d.name} className="flex items-start justify-between gap-2 py-1.5 text-xs">
            <span className="flex items-center gap-1.5">
              <Database className="size-3 text-muted-foreground" />
              {d.name}
            </span>
            <span
              className={`shrink-0 text-[12px] ${d.status !== "Connected" ? "text-warning" : "text-muted-foreground"}`}
            >
              {d.status !== "Connected" ? `${d.status} · ` : ""}
              {d.updated}
            </span>
          </div>
        ))}
        <div className="flex justify-between py-1.5 text-xs">
          <span className="flex items-center gap-1.5">
            <Upload className="size-3 text-muted-foreground" />
            Uploaded documents
          </span>
          <span className="text-[12px] text-muted-foreground">
            {messages.reduce((n, m) => n + (m.files?.length ?? 0), 0)} in conversation
          </span>
        </div>
      </Collapsible>
      <Collapsible title="Key Findings">
        <ul className="space-y-1.5 text-xs">
          {[
            "Revenue +3.2% vs budget YTD; October the only month below budget.",
            "Logistics is the largest percentage beat, +4.1%.",
            "Steel at 18% of revenue is the main FY2027 margin exposure.",
            "Retail actuals are 11 days old, QuickBooks authentication expired.",
          ].map((f) => (
            <li key={f} className="flex gap-1.5">
              <Sparkle className="mt-0.5 size-3 shrink-0 text-primary" />
              {f}
            </li>
          ))}
        </ul>
      </Collapsible>
      <Collapsible title="Analysis Workflow">
        <ol className="space-y-1">
          {workflow.map((w, i) => (
            <li
              key={w}
              className={`flex items-center gap-2 rounded-md px-1.5 py-1 text-xs ${i === stage ? "bg-accent font-medium text-accent-foreground" : i < stage ? "" : "text-muted-foreground"}`}
            >
              {i < stage ? (
                <Check className="size-3.5 text-positive" />
              ) : i === stage ? (
                <ChevronRight className="size-3.5" />
              ) : (
                <Circle className="size-3" />
              )}
              {w}
            </li>
          ))}
        </ol>
      </Collapsible>
      <Collapsible title="Audit Trail" defaultOpen={false}>
        <ul className="space-y-2">
          {audit
            .slice()
            .reverse()
            .map((e, i) => (
              <li key={i} className="text-[13px]">
                <p className="font-medium">
                  {e.action} <span className="font-normal text-muted-foreground">· {e.actor}</span>
                </p>
                <p className="text-muted-foreground">{e.detail}</p>
                <p className="text-[12px] text-muted-foreground">{e.time}</p>
              </li>
            ))}
        </ul>
      </Collapsible>
    </aside>
  ) : null;

  return (
    <AppShell rightPanel={right}>
      <div className="flex min-h-full flex-col">
        <div className="border-b border-border px-5 pt-5 lg:px-8">
          <PlanningNav />
        </div>
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 lg:px-8">
          <header className="flex flex-wrap items-start justify-between gap-3 py-5">
            <div>
              <h1 className="text-xl font-semibold">FY2026 Forecast and Variance Analysis</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Performance against budget, the Q4 forecast review, and the assumptions the FY2027
                budget rests on.
              </p>
              <div className="mt-2">
                <SampleDataNote />
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" aria-label="Share" title="Share">
                <Share2 className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Export" title="Export">
                <Download className="size-4" />
              </Button>
              {!panel ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setPanel(true)}
                  aria-label="Show context panel"
                  className="hidden xl:inline-flex"
                >
                  <PanelRightOpen className="size-4" />
                </Button>
              ) : null}
            </div>
          </header>
          <div className="flex-1 space-y-5 pb-6">
            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="ml-auto max-w-[85%] space-y-2">
                  <div className="rounded-2xl bg-secondary px-4 py-2.5 text-sm">{m.text}</div>
                  {m.files?.length ? (
                    <>
                      <div className="flex flex-wrap justify-end gap-2">
                        {m.files.map((f) => (
                          <AttachmentChip key={f.id} file={f} />
                        ))}
                      </div>
                      <p className="text-right text-[13px] text-muted-foreground">
                        {m.files.length} attachment{m.files.length > 1 ? "s" : ""} ready for
                        analysis
                      </p>
                    </>
                  ) : null}
                </div>
              ) : (
                <div key={m.id} className="flex gap-3">
                  <AlfieMark />
                  <ReplyView reply={m.reply!} onAction={action} />
                </div>
              ),
            )}
            {thinking ? (
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <AlfieMark />
                <span className="animate-pulse">
                  Alfie is retrieving authorized data and validating sources…
                </span>
              </div>
            ) : null}
            <div ref={end} />
          </div>
          <div className="sticky bottom-0 bg-background pb-5 pt-2">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {followUps.map((f) => (
                <button
                  key={f}
                  onClick={() => send(f)}
                  className="rounded-full border border-border bg-card px-2.5 py-1 text-[13px] text-muted-foreground hover:text-foreground"
                >
                  {f}
                </button>
              ))}
            </div>
            <AlfieComposer
              value={input}
              onChange={setInput}
              onSend={send}
              placeholder="Ask a follow-up about this analysis…"
            />
          </div>
        </div>
        <Dialog open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add to permanent repository?</DialogTitle>
              <DialogDescription>
                These files will be added to the organization's planning repository and become
                available to other authorized users and agents. Conversation attachments are not
                saved permanently unless you confirm.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-wrap gap-2">
              {confirm?.map((f) => (
                <AttachmentChip key={f.id} file={f} />
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirm(null)}>
                Keep in conversation only
              </Button>
              <Button
                onClick={() => {
                  setSavedFiles((s) => [...s, ...(confirm ?? []).map((f) => f.name)]);
                  setAudit((a) => [
                    ...a,
                    {
                      time: "Just now",
                      actor: "Elena Brooks",
                      type: "User",
                      action: "Added to repository",
                      detail: (confirm ?? []).map((f) => f.name).join(", "),
                    },
                  ]);
                  setConfirm(null);
                }}
              >
                Add to repository
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {savedFiles.length ? (
          <p className="sr-only" role="status">
            {savedFiles.length} files added to repository
          </p>
        ) : null}
      </div>
    </AppShell>
  );
}

function ReplyView({ reply, onAction }: { reply: Reply; onAction: (a: string) => void }) {
  return (
    <div className="min-w-0 flex-1 space-y-3 font-display text-[15px] leading-7">
      {reply.agents?.length ? (
        <p className="text-[13px] text-muted-foreground">
          Coordinated with {reply.agents.join(", ")}
        </p>
      ) : null}
      <p>{reply.intro}</p>
      {reply.table ? (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-secondary/60">
                {(reply.table[0] ?? []).map((h) => (
                  <th key={h} className="px-3 py-2 text-left font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reply.table.slice(1).map((r) => (
                <tr key={r[0]} className="border-t border-border">
                  {r.map((c, i) => (
                    <td key={i} className={`px-3 py-2 ${i === 0 ? "font-medium" : ""}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {reply.sections?.map((s) => (
        <div key={s.title}>
          <p className="font-semibold">{s.title}</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5 text-foreground/90">
            {s.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      ))}
      {reply.confidence || reply.limitations ? (
        <div className="rounded-xl border border-border bg-secondary/40 p-3 text-xs">
          <p>
            <span className="font-semibold">Confidence:</span> {reply.confidence}
          </p>
          {reply.limitations ? (
            <>
              <p className="mt-2 font-semibold">Data limitations & assumptions</p>
              <ul className="mt-1 list-disc pl-4 text-muted-foreground">
                {reply.limitations.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      ) : null}
      {reply.sources ? (
        <div className="flex flex-wrap items-center gap-1.5 text-[13px]">
          <span className="text-muted-foreground">Sources:</span>
          {reply.sources.map((s) => (
            <span key={s} className="rounded-md border border-border bg-card px-1.5 py-0.5">
              {s}
            </span>
          ))}
        </div>
      ) : null}
      {reply.actions ? (
        <div className="flex flex-wrap gap-2">
          {reply.actions.map((a) =>
            a === "Open in Scenario Modeling" ? (
              <Button key={a} size="sm" variant="outline" asChild>
                <Link to="/planning/scenarios">
                  <FlaskConical className="size-3.5" />
                  {a}
                </Link>
              </Button>
            ) : a === "Open Forecast Review" ? (
              <Button key={a} size="sm" variant="outline" asChild>
                <Link to="/planning/reviews">{a}</Link>
              </Button>
            ) : (
              <Button key={a} size="sm" variant="outline" onClick={() => onAction(a)}>
                {a}
              </Button>
            ),
          )}
        </div>
      ) : null}
    </div>
  );
}

function Group({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <Collapsible title={title}>
      <dl className="space-y-1.5">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 text-xs">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="text-right font-medium">{v}</dd>
          </div>
        ))}
      </dl>
    </Collapsible>
  );
}

function Collapsible({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="mt-4 border-t border-border pt-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground"
      >
        {title}
        <ChevronDown className={`size-3.5 transition-transform ${open ? "" : "-rotate-90"}`} />
      </button>
      {open ? <div className="mt-2">{children}</div> : null}
    </section>
  );
}
