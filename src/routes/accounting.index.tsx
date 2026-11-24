import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Plus, Search, Sparkle, X } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AlfieMark } from "@/components/alfie-ui";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlfieComposer, AttachmentChip, type Attachment } from "@/components/alfie-composer";
import { EntryStatusBadge, PriorityBadge } from "@/components/accounting-badges";
import { accountingAnswers, accountingExamples, accountingMetrics, entries as seedEntries, entryStatuses, entities, flagshipEntryId, flagshipKeywords, money, newEntryDefaults, type EntryStatus, type JournalEntry } from "@/lib/accounting-data";

export const Route = createFileRoute("/accounting/")({
  head: () => ({ meta: [{ title: "Accounting | Alfie Enterprise Finance" }, { name: "description", content: "Review, approve, and post journal entries with Alfie." }, { property: "og:title", content: "Accounting | Alfie Enterprise Finance" }, { property: "og:description", content: "An AI-powered journal entry workspace for review, approval, and posting." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: AccountingPage,
});

type Answer = { prompt: string; files: Attachment[]; intro: string; rows: JournalEntry[]; note: string };

function answerFor(prompt: string, all: JournalEntry[]): Omit<Answer, "prompt" | "files"> {
  const p = prompt.toLowerCase();
  const open = all.filter((e) => e.status !== "Posted");
  if (flagshipKeywords.some((k) => p.includes(k))) return { intro: accountingAnswers.flagship.intro, rows: all.filter((e) => e.id === flagshipEntryId), note: accountingAnswers.flagship.note };
  if (p.includes("approval") || p.includes("waiting")) return { intro: accountingAnswers.approval.intro, rows: open.filter((e) => e.status === "Awaiting Approval" || e.id === flagshipEntryId), note: accountingAnswers.approval.note };
  if (p.includes("post-close") || p.includes("post close")) return { intro: accountingAnswers.postClose.intro, rows: open.filter((e) => e.period.includes("Post-close")), note: accountingAnswers.postClose.note };
  return { intro: accountingAnswers.attention.intro, rows: open.filter((e) => e.status === "Needs Review").slice(0, 3), note: accountingAnswers.attention.note };
}

function AccountingPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<JournalEntry[]>(seedEntries);
  const [tab, setTab] = useState<"All" | EntryStatus>("All");
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [type, setType] = useState("");
  const [entity, setEntity] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [date, setDate] = useState("");
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [thinking, setThinking] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [form, setForm] = useState({ title: "", type: "Accrual", entity: entities[0] ?? "", amount: "" });

  const types = [...new Set(rows.map((e) => e.type))];
  const reviewers = [...new Set(rows.map((e) => e.reviewer))];
  const filtered = useMemo(() => rows.filter((e) => (tab === "All" || e.status === tab) && (!priority || e.priority === priority) && (!type || e.type === type) && (!entity || e.entity === entity) && (!reviewer || e.reviewer === reviewer) && (!date || e.updatedDays <= Number(date)) && (!search || `${e.id} ${e.title} ${e.entity} ${e.type} ${e.lines.map((l) => `${l.account} ${l.accountName}`).join(" ")}`.toLowerCase().includes(search.toLowerCase()))), [rows, tab, priority, type, entity, reviewer, date, search]);

  const ask = (text: string, files: Attachment[] = []) => {
    const q = text || "Analyze the attached files.";
    setPrompt("");
    setThinking(true);
    setTimeout(() => { setAnswers((a) => [{ prompt: q, files, ...answerFor(q, rows) }, ...a]); setThinking(false); }, 700);
  };
  const searchSubmit = () => { if (search.trim().split(" ").length > 3) { ask(search); setSearch(""); } };
  const createEntry = () => {
    const id = `JE-2026-${String(newEntryDefaults.firstNumber + rows.length - seedEntries.length).padStart(4, "0")}`;
    setRows((r) => [{ id, title: form.title || "New journal entry", type: form.type, entity: form.entity, status: "In Preparation", priority: "Medium", preparedBy: newEntryDefaults.preparedBy, reviewer: newEntryDefaults.reviewer, updated: "Just now", updatedDays: 0, period: "November 2026", entryDate: "November 30, 2026", amount: Number(form.amount) || 0, source: "Manual entry", lines: [], evidence: [], analysis: { intro: "This entry was created manually and has no Alfie analysis yet.", items: [], next: "Complete the entry lines and route for review.", confidence: "Low", sources: [] } }, ...r]);
    setNewOpen(false);
    setForm({ title: "", type: "Accrual", entity: entities[0] ?? "", amount: "" });
  };
  const selectCls = "select-chevron h-8 rounded-lg border border-border bg-background pl-2.5 text-xs text-foreground outline-none focus:border-ring";

  return <AppShell><div className="mx-auto max-w-7xl px-5 pb-12 pt-8 lg:px-10">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-2xl font-semibold tracking-tight">Accounting</h1><p className="mt-2 text-sm text-muted-foreground">Review, approve, and post journal entries with Alfie.</p></div><Button onClick={() => setNewOpen(true)}><Plus className="size-4" />New Entry</Button></div>

    <div className="relative mt-6"><Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && searchSubmit()} placeholder="Search entries, accounts, entities, or ask Alfie…" aria-label="Search entries" className="h-11 w-full rounded-xl border border-border bg-secondary/50 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-ring" /></div>

    <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-5">{accountingMetrics.map(([label, value, trend, up]) => <div key={label} className="bg-card p-4"><p className="text-[13px] font-medium text-muted-foreground">{label}</p><p className="mt-1.5 text-2xl font-semibold">{value}</p><p className="mt-1 flex items-center gap-0.5 text-[12px] text-muted-foreground">{up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}{trend}</p></div>)}</div>

    <section className="mt-6 rounded-2xl border border-border bg-panel p-4">
      <div className="mb-3 flex items-center gap-2"><AlfieMark /><h2 className="text-sm font-semibold">Ask Alfie about your entries</h2></div>
      <AlfieComposer value={prompt} onChange={setPrompt} onSend={ask} placeholder="Ask Alfie about your entries…" />
      <div className="mt-3 flex flex-wrap gap-2">{accountingExamples.map((ex) => <Button key={ex} variant="secondary" size="sm" className="h-auto whitespace-normal py-1.5 text-left font-normal" onClick={() => ask(ex)}><Sparkle className="size-3 shrink-0 text-primary" />{ex}</Button>)}</div>
      {thinking ? <p className="mt-4 animate-pulse text-xs text-muted-foreground">Alfie is reviewing the journal register…</p> : null}
      {answers.map((a, i) => <div key={i} className="mt-4 rounded-xl border border-border bg-card p-4">
        <div className="flex items-start justify-between gap-3"><p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">You:</span> {a.prompt}</p><button aria-label="Dismiss" onClick={() => setAnswers((x) => x.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-foreground"><X className="size-3.5" /></button></div>
        {a.files.length ? <div className="mt-2 flex flex-wrap gap-2">{a.files.map((f) => <AttachmentChip key={f.id} file={f} />)}</div> : null}
        <p className="mt-3 text-sm">{a.intro}</p>
        <div className="mt-3 divide-y divide-border rounded-lg border border-border">{a.rows.map((e) => <Link key={e.id} to="/accounting/$entryId" params={{ entryId: e.id }} className="flex items-center gap-3 px-3 py-2 text-xs hover:bg-secondary"><span className="font-semibold">{e.id}</span><span className="text-muted-foreground">{e.title} · {e.entity}</span><span className="ml-auto hidden sm:inline">{money(e.amount)}</span><PriorityBadge priority={e.priority} /></Link>)}</div>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">{a.note}</p>
      </div>)}
    </section>

    <section className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-sm font-semibold">Journal entry register</h2><span className="text-xs text-muted-foreground">{filtered.length} entries</span></div>
      <div className="scrollbar-none mt-3 flex gap-1 overflow-x-auto">{(["All", ...entryStatuses] as const).map((s) => <Button key={s} size="sm" variant={tab === s ? "soft" : "ghost"} onClick={() => setTab(s)} className={tab === s ? "text-foreground" : ""}>{s}</Button>)}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        <select aria-label="Priority" className={selectCls} value={priority} onChange={(e) => setPriority(e.target.value)}><option value="">Priority: Any</option>{["High", "Medium", "Low"].map((x) => <option key={x}>{x}</option>)}</select>
        <select aria-label="Entry type" className={selectCls} value={type} onChange={(e) => setType(e.target.value)}><option value="">Entry type: Any</option>{types.map((x) => <option key={x}>{x}</option>)}</select>
        <select aria-label="Entity" className={selectCls} value={entity} onChange={(e) => setEntity(e.target.value)}><option value="">Entity: Any</option>{entities.map((x) => <option key={x}>{x}</option>)}</select>
        <select aria-label="Reviewer" className={selectCls} value={reviewer} onChange={(e) => setReviewer(e.target.value)}><option value="">Reviewer: Anyone</option>{reviewers.map((x) => <option key={x}>{x}</option>)}</select>
        <select aria-label="Date" className={selectCls} value={date} onChange={(e) => setDate(e.target.value)}><option value="">Updated: Any time</option><option value="0">Today</option><option value="1">Last 2 days</option><option value="7">Last 7 days</option></select>
        <select aria-label="Status" className={selectCls} value={tab} onChange={(e) => setTab(e.target.value as "All" | EntryStatus)}><option value="All">Status: All</option>{entryStatuses.map((x) => <option key={x}>{x}</option>)}</select>
        {priority || type || entity || reviewer || date || tab !== "All" || search ? <Button size="sm" variant="ghost" onClick={() => { setPriority(""); setType(""); setEntity(""); setReviewer(""); setDate(""); setTab("All"); setSearch(""); }}>Clear filters</Button> : null}
      </div>
      <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-card"><table className="w-full min-w-[900px] text-left text-sm">
        <thead><tr className="border-b border-border text-[13px] uppercase tracking-wider text-muted-foreground">{["Entry", "Description", "Entity", "Status", "Priority"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}<th className="px-4 py-3 text-right font-medium">Amount</th>{["Reviewer", "Last Updated"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr></thead>
        <tbody>{filtered.map((e) => <tr key={e.id} onClick={() => navigate({ to: "/accounting/$entryId", params: { entryId: e.id } })} className="cursor-pointer border-b border-border last:border-0 hover:bg-secondary/60">
          <td className="px-4 py-3"><Link to="/accounting/$entryId" params={{ entryId: e.id }} className="font-semibold hover:text-primary" onClick={(ev) => ev.stopPropagation()}>{e.id}</Link></td>
          <td className="px-4 py-3">{e.title}</td><td className="px-4 py-3 text-muted-foreground">{e.entity}</td><td className="px-4 py-3"><EntryStatusBadge status={e.status} /></td><td className="px-4 py-3"><PriorityBadge priority={e.priority} /></td>
          <td className="px-4 py-3 text-right font-medium">{money(e.amount)}</td>
          <td className="px-4 py-3">{e.reviewer}</td><td className="px-4 py-3 text-muted-foreground">{e.updated}</td>
        </tr>)}{filtered.length === 0 ? <tr><td colSpan={8} className="px-4 py-10 text-center text-sm text-muted-foreground">No entries match these filters.</td></tr> : null}</tbody>
      </table></div>
    </section>

    <Dialog open={newOpen} onOpenChange={setNewOpen}><DialogContent><DialogHeader><DialogTitle>New journal entry</DialogTitle><DialogDescription>Create a draft entry. Alfie will check the lines for balance and policy once they are added.</DialogDescription></DialogHeader>
      <div className="grid gap-3">{([["Description", "title"], ["Amount ($)", "amount"]] as const).map(([label, key]) => <label key={key} className="text-xs font-medium">{label}<input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-ring" /></label>)}
        <label className="text-xs font-medium">Entity<select value={form.entity} onChange={(e) => setForm({ ...form, entity: e.target.value })} className="select-chevron mt-1 h-9 w-full rounded-lg border border-border bg-background pl-2.5 text-sm">{entities.map((x) => <option key={x}>{x}</option>)}</select></label>
        <label className="text-xs font-medium">Entry type<select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="select-chevron mt-1 h-9 w-full rounded-lg border border-border bg-background pl-2.5 text-sm">{["Accrual", "Prepaid", "Depreciation", "Revenue", "Payroll", "Intercompany", "Reclassification"].map((x) => <option key={x}>{x}</option>)}</select></label></div>
      <DialogFooter><Button variant="secondary" onClick={() => setNewOpen(false)}>Cancel</Button><Button onClick={createEntry}>Create entry</Button></DialogFooter></DialogContent></Dialog>
  </div></AppShell>;
}
