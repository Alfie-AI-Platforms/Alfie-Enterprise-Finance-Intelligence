import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, Bot, Check, ChevronDown, Circle, Download, Lock, MoreHorizontal, Paperclip, Share2, ShieldAlert, Sparkle, Upload } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AlfieChip, AlfieMark, AlfiePanelHeader, ReviewBar } from "@/components/alfie-ui";
import { DocumentSheet } from "@/components/document-view";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlfieComposer, AttachmentChip, FileGlyph, fileExt, type Attachment } from "@/components/alfie-composer";
import { EntryStatusBadge, PriorityBadge } from "@/components/accounting-badges";
import { entryPrompts, entryWorkflow, erpName, flagshipEntryId, flagshipIssue, flagshipMissingItems, flagshipPrompt, flagshipReviewBar, flagshipRouteNext, getEntry, money, newEntryDefaults, seedAudit, type AuditEvent, type EntryEvidence } from "@/lib/accounting-data";

export const Route = createFileRoute("/accounting/$entryId")({
  head: ({ params }) => ({ meta: [{ title: `Entry ${params.entryId} | Alfie Enterprise Finance` }, { name: "description", content: `Review evidence and work with Alfie on journal entry ${params.entryId}.` }, { property: "og:title", content: `Entry ${params.entryId} | Alfie Enterprise Finance` }, { property: "og:description", content: "AI-assisted journal entry workspace with lines, evidence, and audit trail." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: EntryWorkspace,
  notFoundComponent: () => <div className="p-10">Entry not found.</div>,
});

type Reply = { intro: string; items?: string[]; fields?: [string, string][]; next?: string; confidence?: string; sources?: string[] | undefined; note?: string };
type Msg = { id: string; role: "user" | "alfie"; text?: string; files?: Attachment[]; reply?: Reply; actions?: string[]; attached?: boolean };

const standardActions = ["Add Note", "Add Evidence", "Request Information", "Prepare Approval Summary", "Generate Report", "Escalate Entry"];

function EntryWorkspace() {
  const { entryId } = Route.useParams();
  const entry = getEntry(entryId) ?? { ...getEntry(flagshipEntryId)!, id: entryId };
  const isFlagship = entry.id === flagshipEntryId;
  const mainAnalysis: Reply = { intro: entry.analysis.intro, ...(entry.analysis.items.length ? { items: entry.analysis.items } : {}), next: entry.analysis.next, confidence: entry.analysis.confidence, ...(entry.analysis.sources.length ? { sources: entry.analysis.sources } : {}) };
  const totalDebits = entry.lines.reduce((sum, l) => sum + l.debit, 0);
  const totalCredits = entry.lines.reduce((sum, l) => sum + l.credit, 0);
  const balanced = entry.lines.length > 0 && totalDebits === totalCredits;
  const currentStep = entry.status === "Posted" ? 5 : 3;

  const [tab, setTab] = useState<"file" | "activity">("file");
  const [messages, setMessages] = useState<Msg[]>([{ id: "m0", role: "alfie", reply: { intro: "I've reviewed the available information for this entry. I can explain the analysis, walk through the lines, check the entry against approval policy, and prepare summaries for review." } }]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [pending, setPending] = useState<Attachment[]>([]);
  const [evidence, setEvidence] = useState<EntryEvidence[]>(entry.evidence);
  const [preview, setPreview] = useState<EntryEvidence | null>(null);
  const [confirm, setConfirm] = useState<Msg | null>(null);
  const [audit, setAudit] = useState<AuditEvent[]>(seedAudit);
  const [notice, setNotice] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [messages, thinking]);

  const now = () => new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false });
  const log = (e: Omit<AuditEvent, "time">) => setAudit((a) => [{ time: now(), ...e }, ...a]);
  const flash = (t: string) => { setNotice(t); setTimeout(() => setNotice(""), 3500); };

  const replyFor = (q: string, files: Attachment[]): { reply: Reply; actions: string[] } => {
    const p = q.toLowerCase();
    if (files.length) return { reply: { intro: "I found the following relevant information:", fields: [["Entry", entry.id], ["Amount", money(entry.amount)], ["Period", entry.period], ["Prepared by", entry.preparedBy], ["Reviewer", entry.reviewer], ["Potential issue", isFlagship ? flagshipIssue : "None identified in the uploaded material."]], confidence: "High", sources: files.map((f) => f.name), note: "Uploaded files are used in this conversation only and have not been added to the entry record." }, actions: ["View Source", "Add to Entry", "Ask Follow-up"] };
    if (p.includes("lines") || p.includes("walk")) return { reply: { intro: `This entry has ${entry.lines.length} line${entry.lines.length === 1 ? "" : "s"} and ${balanced ? "balances" : "does not balance yet"}.`, items: [...entry.lines.map((l) => `${l.debit ? `Debit ${money(l.debit)}` : `Credit ${money(l.credit)}`} to ${l.accountName} (${l.account}), ${l.entity}. ${l.memo}.`), `Total debits ${money(totalDebits)}; total credits ${money(totalCredits)}.`], next: entry.analysis.next, confidence: "High", sources: [`${entry.id} entry lines`] }, actions: ["Review Evidence", "Ask Follow-up", "Prepare Approval Summary"] };
    if (p.includes("policy") || p.includes("threshold")) return { reply: { intro: "Summary of the approval policy for this entry (FIN-AP-02):", fields: [["Post-close threshold", "$10,000: CFO approval required above this amount"], ["This entry", `${money(entry.amount)} · ${entry.period}`], ["Separation of duties", `Preparer (${entry.preparedBy}) differs from reviewer (${entry.reviewer})`], ["Evidence", `${evidence.length} documents attached`]], next: isFlagship ? flagshipRouteNext : entry.analysis.next, confidence: "High", sources: ["Approval Policy FIN-AP-02", "Close Policy"] }, actions: ["Review Evidence", "Ask Follow-up"] };
    if (p.includes("missing") || p.includes("attention")) return { reply: { intro: "The following items are outstanding on this entry:", items: isFlagship ? flagshipMissingItems : [`Review by ${entry.reviewer} is outstanding.`, "No other information is missing; the entry is fully evidenced."], next: "Complete the review in this file, then route for approval.", confidence: "High", sources: ["Entry checklist ACC-01", "Approval Policy FIN-AP-02"] }, actions: ["Prepare Approval Summary", "Ask Follow-up"] };
    if (p.includes("summary")) return { reply: { intro: `Summary of ${entry.id} for the CFO (draft, for your review):`, fields: [["Item", entry.title], ["Amount", money(entry.amount)], ["Entity", entry.entity], ["Period", entry.period], ["Prepared by", entry.preparedBy], ["Status", entry.status]], next: entry.analysis.next, confidence: "High", sources: entry.analysis.sources }, actions: ["Prepare Approval Summary", "Ask Follow-up"] };
    if (p.includes("evidence")) return { reply: { intro: "The supporting evidence attached to this entry:", items: evidence.map((e) => `${e.label} (${e.size}): attached and read by Alfie.`), next: "Open any document to read it in place.", confidence: "High", sources: evidence.map((e) => e.label) }, actions: ["Review Evidence", "Ask Follow-up"] };
    return { reply: mainAnalysis, actions: ["Review Evidence", "Ask Follow-up", "Prepare Approval Summary"] };
  };

  const send = (text: string, files: Attachment[] = []) => {
    const q = text || (files.length ? "Analyze these attachments." : "");
    if (!q) return;
    setInput(""); setPending([]);
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", text: q, files }]);
    if (files.length) log({ actor: newEntryDefaults.preparedBy, actorType: "User", action: "Documents uploaded to conversation", source: files.map((f) => f.name).join(", "), result: "Conversation only, not in entry record" });
    setThinking(true);
    setTimeout(() => {
      const { reply, actions } = replyFor(q, files);
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "alfie", reply, actions }]);
      log({ actor: "Alfie", actorType: "Alfie", action: files.length ? "Analyzed uploaded material" : "Answered entry question", source: reply.sources?.join(", ") ?? "Entry record", result: reply.next ?? "Response provided" });
      setThinking(false);
    }, 900);
  };

  const runAction = (a: string) => {
    if (a === "Review Evidence" || a === "View Source") { setPreview(evidence[0] ?? null); return; }
    if (a === "Ask Follow-up" || a === "Ask Alfie") { document.querySelector<HTMLTextAreaElement>("textarea")?.focus(); return; }
    if (a === "Walk Through Lines") { send("Walk me through the entry lines."); return; }
    if (a === "Add to Entry") { const last = [...messages].reverse().find((m) => m.role === "user" && m.files?.length && !m.attached); if (last) setConfirm(last); else flash("No conversation uploads to attach."); return; }
    if (a === "Prepare Approval Summary") {
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "alfie", reply: { intro: "Draft approval summary prepared for human review:", fields: [["Entry", `${entry.id} · ${entry.title}`], ["Amount", money(entry.amount)], ["Decision needed", entry.analysis.next], ["Evidence", `${evidence.length} documents attached`]], note: "This is a draft. Alfie cannot approve or post entries. Approval remains with the reviewer and, above the threshold, the CFO.", sources: entry.analysis.sources } }]);
      log({ actor: "Alfie", actorType: "Alfie", action: "Approval summary prepared", source: "Entry analysis", result: "Awaiting human approval" });
      return;
    }
    log({ actor: newEntryDefaults.preparedBy, actorType: "User", action: a, source: "Entry actions", result: a === "Escalate Entry" ? "Escalated to CFO office" : "Completed" });
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "alfie", reply: { intro: `${a}: done. ${a.startsWith("Prepare") || a === "Generate Report" ? "A draft is ready for your review before anything is sent." : "Logged to the audit trail."}` } }]);
  };

  const attachToEntry = (msg: Msg) => {
    const files = msg.files ?? [];
    setEvidence((e) => [...e, ...files.map((f) => ({ id: f.id, name: f.name, label: fileExt(f.name), size: `${Math.round(f.size / 1000)} KB`, summary: `Added from conversation by ${newEntryDefaults.preparedBy}.`, sections: [] }))]);
    setMessages((m) => m.map((x) => (x.id === msg.id ? { ...x, attached: true } : x)));
    log({ actor: newEntryDefaults.preparedBy, actorType: "User", action: "Evidence added to entry record", source: files.map((f) => f.name).join(", "), result: "Confirmed by user" });
    setConfirm(null);
    flash(`${files.length} file${files.length > 1 ? "s" : ""} added to entry evidence.`);
  };

  const download = (e: EntryEvidence) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([`${e.label}\n\n${e.summary}`], { type: "text/plain" }));
    a.download = `${e.name}.txt`;
    a.click();
  };
  const attachEvidence = (e: EntryEvidence) => { setPending((p) => (p.some((x) => x.id === e.id) ? p : [...p, { id: e.id, name: e.name, size: 200000, type: "", isImage: false }])); setPreview(null); };

  const alfieRail = <aside className="scrollbar-thin hidden w-[360px] shrink-0 flex-col border-l border-border bg-panel xl:flex">
    <div className="border-b border-border p-4"><AlfiePanelHeader context={`Entry ${entry.id} · ${entry.type}`} /></div>
    <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-4">
      {messages.map((m) => m.role === "user" ? <div key={m.id} className="flex flex-col items-end gap-2">
          {m.files?.length ? <><div className="flex flex-wrap justify-end gap-2">{m.files.map((f) => <AttachmentChip key={f.id} file={f} />)}</div><div className="flex items-center gap-2 text-[12px] text-muted-foreground"><Paperclip className="size-3" />{m.files.length} attachment{m.files.length > 1 ? "s" : ""} ready for analysis · Use in this conversation{m.attached ? <span className="text-positive">· Attached to entry</span> : <Button size="sm" variant="ghost" className="h-6 px-2 text-[12px]" onClick={() => setConfirm(m)}><Upload className="size-3" />Attach to Entry</Button>}</div></> : null}
          <div className="max-w-[80%] rounded-2xl bg-ink px-4 py-2.5 text-sm text-ink-foreground">{m.text}</div>
        </div> : <div key={m.id} className="flex gap-3"><AlfieMark /><div className="min-w-0 flex-1 text-sm leading-6">
          {m.reply ? <ReplyView reply={m.reply} /> : null}
          {m.actions?.length ? <div className="mt-3 flex flex-wrap gap-2">{m.actions.map((a) => <Button key={a} size="sm" variant="secondary" onClick={() => runAction(a)}>{a}</Button>)}</div> : null}
          {m.id === "m0" ? <div className="mt-4 flex flex-wrap gap-2">{entryPrompts.map((p) => <Button key={p} size="sm" variant="secondary" className="max-w-full font-normal" onClick={() => send(p)}><Sparkle className="size-3 shrink-0 text-primary" /><span className="truncate">{p}</span></Button>)}</div> : null}
        </div></div>)}
        {thinking ? <div className="flex items-center gap-3 text-xs text-muted-foreground"><AlfieMark /><span className="animate-pulse">Reviewing entry lines and evidence…</span></div> : null}
        <div ref={endRef} />
    </div>
    <div className="border-t border-border p-4"><AlfieComposer value={input} onChange={setInput} onSend={send} pending={pending} placeholder="Ask Alfie about this entry…" /><p className="mt-2 text-[12px] leading-4 text-muted-foreground">Alfie prepares entries and analysis. Approval and posting decisions remain with authorized finance staff.</p></div>
  </aside>;

  return <AppShell rightPanel={alfieRail}><div className="flex h-full flex-col">
    <div className="border-b border-border px-5 py-4 lg:px-8">
      <Link to="/accounting" className="mb-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3" />Accounting</Link>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h1 className="text-xl font-semibold">Journal entry {entry.id}</h1><p className="mt-1 text-sm text-muted-foreground">{entry.title} · {entry.entity}</p><div className="mt-2 flex items-center gap-3 text-[13px] text-muted-foreground"><span className="flex items-center gap-1.5">Status <EntryStatusBadge status={entry.status} /></span><span className="flex items-center gap-1.5">Priority <PriorityBadge priority={entry.priority} /></span></div></div>
        <div className="flex items-center gap-1">
          <DropdownMenu><DropdownMenuTrigger asChild><Button variant="secondary" size="sm">Actions<ChevronDown className="size-3.5" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel className="text-[12px] uppercase tracking-wider text-muted-foreground">Entry actions</DropdownMenuLabel>
              {standardActions.map((a) => <DropdownMenuItem key={a} onSelect={() => a === "Add Evidence" ? document.querySelector<HTMLButtonElement>('[aria-label="Add attachment"]')?.click() : runAction(a)}>{a}</DropdownMenuItem>)}
              <DropdownMenuSeparator /><DropdownMenuLabel className="text-[12px] uppercase tracking-wider text-muted-foreground">Governed actions</DropdownMenuLabel>
              <DropdownMenuItem onSelect={() => runAction("Prepare Approval Summary")} className="flex-col items-start gap-0.5"><span>Prepare Approval Request</span><span className="flex items-center gap-1 text-[12px] text-warning"><ShieldAlert className="size-3" />Human approval required</span></DropdownMenuItem>
              <DropdownMenuItem disabled className="flex-col items-start gap-0.5"><span>Post to {erpName}</span><span className="flex items-center gap-1 text-[12px]"><Lock className="size-3" />Permission required · Controller</span></DropdownMenuItem>
            </DropdownMenuContent></DropdownMenu>
          <Button variant="ghost" size="sm" onClick={() => { void navigator.clipboard?.writeText(window.location.href); flash("Link copied to clipboard."); }}><Share2 className="size-3.5" />Share</Button>
          <Button variant="ghost" size="sm" onClick={() => { download({ id: "x", name: `${entry.id}-summary`, label: `Entry ${entry.id}`, size: "", summary: `${entry.title} · ${entry.entity}\nPeriod ${entry.period}\nAmount ${money(entry.amount)}`, sections: [] }); log({ actor: newEntryDefaults.preparedBy, actorType: "User", action: "Exported entry", source: "Entry workspace", result: "Summary downloaded" }); }}><Download className="size-3.5" />Export</Button>
          <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="size-8" aria-label="More"><MoreHorizontal className="size-4" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end"><DropdownMenuItem onSelect={() => setTab("activity")}>View activity</DropdownMenuItem><DropdownMenuItem onSelect={() => runAction("Add Note")}>Add note</DropdownMenuItem><DropdownMenuItem asChild><Link to="/accounting">Back to register</Link></DropdownMenuItem></DropdownMenuContent></DropdownMenu>
        </div>
      </div>
      <div className="mt-4 flex gap-1">{(["file", "activity"] as const).map((t) => <Button key={t} size="sm" variant={tab === t ? "soft" : "ghost"} className={tab === t ? "text-foreground" : ""} onClick={() => setTab(t)}>{t === "file" ? "Entry file" : `Activity · ${audit.length}`}</Button>)}</div>
    </div>
    {notice ? <div className="mx-5 mt-3 rounded-lg border border-border bg-secondary px-3 py-2 text-xs lg:mx-8">{notice}</div> : null}

    {tab === "activity" ? <div className="flex-1 px-5 py-5 lg:px-8"><p className="mb-3 text-xs text-muted-foreground">Complete audit trail of user, Alfie, and system activity on this entry.</p><div className="overflow-x-auto rounded-xl border border-border bg-card"><table className="w-full min-w-[680px] text-left text-xs"><thead><tr className="border-b border-border text-[12px] uppercase tracking-wider text-muted-foreground">{["Timestamp", "Actor", "Action", "Source", "Result"].map((h) => <th key={h} className="px-3 py-2.5 font-medium">{h}</th>)}</tr></thead><tbody>{audit.map((e, i) => <tr key={i} className="border-b border-border last:border-0"><td className="whitespace-nowrap px-3 py-2.5 text-muted-foreground">{e.time}</td><td className="px-3 py-2.5"><span className="flex items-center gap-1.5 font-medium">{e.actorType === "Alfie" ? <Bot className="size-3.5 text-primary" /> : null}{e.actor}</span></td><td className="px-3 py-2.5">{e.action}</td><td className="px-3 py-2.5 text-muted-foreground">{e.source}</td><td className="px-3 py-2.5">{e.result}</td></tr>)}</tbody></table></div></div> :
    <div className="px-5 py-5 lg:px-8"><div className="mx-auto max-w-3xl">
      {entry.status === "Posted" ? <ReviewBar status="Posted" title={`${money(entry.amount)} posted to ${erpName}`} detail="This entry posted in the October close and is read-only here. Corrections go through a new adjustment entry.">
        <Button size="sm" variant="secondary" onClick={() => runAction("Generate Report")}>Generate report</Button>
      </ReviewBar> : isFlagship ? <ReviewBar status={`Controller review · Step ${currentStep + 1} of ${entryWorkflow.length}`} title={flagshipReviewBar.title} detail={flagshipReviewBar.detail}>
        <Button size="sm" variant="secondary" onClick={() => runAction("Escalate Entry")}>Escalate</Button>
        <Button size="sm" onClick={() => runAction("Prepare Approval Summary")}>Prepare approval summary</Button>
      </ReviewBar> : <ReviewBar status={`${entry.status} · ${entry.period}`} title={`${entry.title} · ${money(entry.amount)}`} detail={entry.analysis.next}>
        <Button size="sm" variant="secondary" onClick={() => runAction("Escalate Entry")}>Escalate</Button>
        <Button size="sm" onClick={() => runAction("Prepare Approval Summary")}>Prepare approval summary</Button>
      </ReviewBar>}
      <section className="mt-8">
        <div className="mb-3 flex flex-wrap items-center gap-2"><AlfieChip label="Alfie draft" /><span className="text-xs text-muted-foreground">Entry analysis for reviewer. Not an approval or posting decision.</span></div>
        <div className="rounded-xl border border-border bg-card p-5"><ReplyView reply={mainAnalysis} />
          <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">{["Review Evidence", "Ask Follow-up", "Prepare Approval Summary"].map((a) => <Button key={a} size="sm" variant="secondary" onClick={() => runAction(a)}>{a}</Button>)}</div>
        </div>
      </section>
      <Section title="Entry details">
        <dl className="grid grid-cols-2 gap-x-3 gap-y-3 text-xs md:grid-cols-4">
          {([["Entry", entry.id], ["Entity", entry.entity], ["Type", entry.type], ["Period", entry.period], ["Entry Date", entry.entryDate], ["Amount", money(entry.amount)], ["Prepared By", entry.preparedBy], ["Reviewer", entry.reviewer], ["Source", entry.source]] as const).map(([k, v]) => <div key={k}><dt className="text-[12px] text-muted-foreground">{k}</dt><dd className="mt-0.5 font-medium">{v}</dd></div>)}
          <div><dt className="text-[12px] text-muted-foreground">Status</dt><dd className="mt-1"><EntryStatusBadge status={entry.status} /></dd></div>
          <div><dt className="text-[12px] text-muted-foreground">Priority</dt><dd className="mt-1"><PriorityBadge priority={entry.priority} /></dd></div>
        </dl>
      </Section>
      <Section title={`Entry lines · ${entry.lines.length}`}>
        {entry.lines.length ? <div className="overflow-x-auto rounded-xl border border-border bg-card"><table className="w-full min-w-[720px] text-left text-xs">
          <thead><tr className="border-b border-border text-[12px] uppercase tracking-wider text-muted-foreground">{["Account", "Account Name", "Entity", "Memo"].map((h) => <th key={h} className="px-3 py-2.5 font-medium">{h}</th>)}<th className="px-3 py-2.5 text-right font-medium">Debit</th><th className="px-3 py-2.5 text-right font-medium">Credit</th></tr></thead>
          <tbody>{entry.lines.map((l, i) => <tr key={i} className="border-b border-border last:border-0"><td className="px-3 py-2.5 font-medium">{l.account}</td><td className="px-3 py-2.5">{l.accountName}</td><td className="px-3 py-2.5 text-muted-foreground">{l.entity}</td><td className="px-3 py-2.5 text-muted-foreground">{l.memo}</td><td className="px-3 py-2.5 text-right font-medium">{l.debit ? money(l.debit) : <span className="text-muted-foreground">–</span>}</td><td className="px-3 py-2.5 text-right font-medium">{l.credit ? money(l.credit) : <span className="text-muted-foreground">–</span>}</td></tr>)}
          <tr className="bg-secondary/50 font-semibold"><td className="px-3 py-2.5" colSpan={4}>Totals</td><td className="px-3 py-2.5 text-right">{money(totalDebits)}</td><td className="px-3 py-2.5 text-right">{money(totalCredits)}</td></tr></tbody>
        </table></div> : null}
        <p className="mt-2 px-1 text-[12px] leading-4 text-muted-foreground">{entry.lines.length === 0 ? "No lines yet. Add lines before routing this entry for review." : balanced ? "Debits equal credits. The entry balances and can post once approved." : "Debits and credits differ. The entry cannot post until it balances."}</p>
      </Section>
      <Section title={`Evidence · ${evidence.length}`}>
        <div className="space-y-1.5">{evidence.map((e) => <button key={e.id} onClick={() => setPreview(e)} className="flex w-full items-center gap-2.5 rounded-lg border border-border bg-card p-2 text-left hover:bg-secondary"><div className="flex size-8 items-center justify-center rounded-md bg-secondary text-muted-foreground"><FileGlyph name={e.name} /></div><div className="min-w-0"><p className="text-xs font-medium">{e.label}</p><p className="truncate text-[12px] text-muted-foreground">{fileExt(e.name)} · {e.name}</p></div></button>)}</div>
      </Section>
      <Section title="Analysis">
        {([["Balance Check", balanced ? "Balanced" : "Not balanced", balanced ? "text-positive" : "text-warning", "Walk me through the entry lines."], [entry.type === "Intercompany" ? "FX Trace" : "Source Check", "Complete", "text-positive", isFlagship ? flagshipPrompt : "Analyze this entry."], ["Approval Policy", entry.period.includes("Post-close") && entry.amount > 10000 ? "CFO approval required" : "Standard review", entry.period.includes("Post-close") && entry.amount > 10000 ? "text-warning" : "text-foreground", "Check this entry against policy."], ["Supporting Evidence", `${evidence.length} documents`, "text-foreground", "Show me the supporting evidence."]] as const).map(([k, v, tone, prompt]) => <button key={k} onClick={() => send(prompt)} className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs hover:bg-secondary"><span>{k}</span><span className={`font-medium ${tone}`}>{v}</span></button>)}
        <p className="mt-2 px-2 text-[12px] leading-4 text-muted-foreground">Analysis opens in the Alfie rail. AI analysis supports reviewer judgment. It is not an approval or posting decision.</p>
      </Section>
      <Section title="Workflow">
        <ol className="space-y-0.5">{entryWorkflow.map((step, i) => <li key={step} className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 text-xs ${i === currentStep ? "bg-primary/10 font-semibold text-primary" : i < currentStep ? "text-foreground" : "text-muted-foreground"}`}>{i < currentStep ? <Check className="size-3.5 text-positive" /> : i === currentStep ? <ChevronDown className="size-3.5 -rotate-90" /> : <Circle className="size-3" />}{step}{i === currentStep ? <span className="ml-auto text-[12px] font-medium">Current</span> : null}</li>)}</ol>
      </Section>
    </div></div>}
    <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}><DialogContent className="max-w-2xl">{preview ? <><DialogHeader><DialogTitle>{preview.label}</DialogTitle><DialogDescription>{fileExt(preview.name)} · {preview.name} · {preview.size}</DialogDescription></DialogHeader>
      <DocumentSheet summary={preview.summary} sections={preview.sections} />
      <DialogFooter className="flex-wrap gap-2 sm:justify-start"><Button size="sm" variant="secondary" onClick={() => download(preview)}><Download className="size-3.5" />Download</Button><Button size="sm" variant="secondary" onClick={() => { const e = preview; setPreview(null); send(`Analyze ${e.label}.`, [{ id: e.id, name: e.name, size: 200000, type: "", isImage: false }]); }}><Sparkle className="size-3.5" />Analyze with Alfie</Button><Button size="sm" variant="secondary" onClick={() => attachEvidence(preview)}><Paperclip className="size-3.5" />Attach to conversation</Button></DialogFooter></> : null}</DialogContent></Dialog>

    <Dialog open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)}><DialogContent><DialogHeader><DialogTitle>Attach to entry record?</DialogTitle><DialogDescription>These files will be added to the permanent evidence record for {entry.id} and logged in the audit trail. This cannot be undone from the conversation.</DialogDescription></DialogHeader>
      <div className="flex flex-wrap gap-2">{confirm?.files?.map((f) => <AttachmentChip key={f.id} file={f} />)}</div>
      <DialogFooter><Button variant="secondary" onClick={() => setConfirm(null)}>Keep in conversation only</Button><Button onClick={() => confirm && attachToEntry(confirm)}>Attach to Entry</Button></DialogFooter></DialogContent></Dialog>
  </div></AppShell>;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return <section className="mt-6 border-t border-border pt-5"><h3 className="mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{title}</h3>{children}</section>;
}

function ReplyView({ reply }: { reply: Reply }) {
  return <div className="space-y-3 font-display text-[15px] leading-7">
    <p>{reply.intro}</p>
    {reply.items ? <ol className="list-decimal space-y-1.5 pl-5">{reply.items.map((i) => <li key={i}>{i}</li>)}</ol> : null}
    {reply.fields ? <dl className="divide-y divide-border rounded-xl border border-border">{reply.fields.map(([k, v]) => <div key={k} className="grid grid-cols-[150px_1fr] gap-3 px-3 py-2 text-xs"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>)}</dl> : null}
    {reply.note ? <p className="text-xs text-muted-foreground">{reply.note}</p> : null}
    {reply.next || reply.confidence ? <div className="flex flex-wrap gap-4 text-xs">{reply.next ? <p><span className="text-muted-foreground">Recommended next step: </span><span className="font-semibold">{reply.next}</span></p> : null}{reply.confidence ? <p><span className="text-muted-foreground">Confidence: </span><span className="font-semibold">{reply.confidence}</span></p> : null}</div> : null}
    {reply.sources ? <div className="flex flex-wrap items-center gap-1.5"><span className="text-[12px] uppercase tracking-wider text-muted-foreground">Sources</span>{reply.sources.map((s) => <span key={s} className="rounded-full border border-border bg-background px-2 py-0.5 text-[13px]">{s}</span>)}</div> : null}
  </div>;
}
