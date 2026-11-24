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
import { PlanningHeader, SampleDataNote } from "@/components/planning-nav";
import {
  planningAnalysisContext,
  planningAnalysisFollowUps,
  planningAnalysisPatterns,
  planningAnalysisReply,
  planningAudit,
  planningDataSources,
  type AnalysisReply,
} from "@/lib/planning-data";
import { activeWorkspace } from "@/lib/workspace";

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

type Reply = AnalysisReply;
type Msg = { id: string; role: "user" | "alfie"; text?: string; files?: Attachment[]; reply?: Reply };

const followUps = planningAnalysisFollowUps;
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
function AnalysisWorkspace() {
  const { q } = Route.useSearch();
  const first = q ?? planningAnalysisContext.firstQuestion;
  const [messages, setMessages] = useState<Msg[]>(() => [
    { id: "u0", role: "user", text: first },
    { id: "a0", role: "alfie", reply: planningAnalysisReply(first, [], 0) },
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
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    end.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  const send = (text: string, files: Attachment[] = []) => {
    const t = text || "Analyze the attached files.";
    setInput("");
    if (files.length) setLastFiles(files);
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", text: t, files }]);
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "alfie", reply: planningAnalysisReply(t, files, m.length) }]);
      setThinking(false);
      if (planningAnalysisPatterns.scenario.test(t)) setStage((s) => Math.max(s, 4));
      else if (planningAnalysisPatterns.review.test(t)) setStage((s) => Math.max(s, 5));
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
      <Group title="Analysis Details" rows={planningAnalysisContext.details} />
      <Group title="Group Information" rows={planningAnalysisContext.groupInfo} />
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
          {planningAnalysisContext.keyFindings.map((f) => (
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
      <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col px-5 pt-8 lg:px-10">
        <PlanningHeader
          title="Planning Analysis"
          subtitle="Analyze performance against the budget and the rolling forecast with Alfie, with the evidence attached. Analysis is read-only: it never changes the forecast, the budget or a forecast review."
        />
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
          <header className="flex flex-wrap items-start justify-between gap-3 py-5">
            <div>
              <h2 className="text-xl font-semibold">{planningAnalysisContext.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {planningAnalysisContext.subtitle}
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
                      actor: activeWorkspace.userName,
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
