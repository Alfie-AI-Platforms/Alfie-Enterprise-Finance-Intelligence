import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Plus, Search, Sparkle, X } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AlfieMark } from "@/components/alfie-ui";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlfieComposer, AttachmentChip, type Attachment } from "@/components/alfie-composer";
import { BillStatusBadge, BillPriorityBadge, MatchBadge } from "@/components/payables-badges";
import { bills as seed, billStatuses, entities, entityShortNames, erpName, fmt, newBillDefaults, payablesAnswers, payablesExamples, payablesMetrics, payablesVendorKeywords, payablesVendorName, type Bill, type BillStatus } from "@/lib/payables-data";

export const Route = createFileRoute("/payables/")({
  head: () => ({ meta: [{ title: "Payables | Alfie Enterprise Finance" }, { name: "description", content: "Capture vendor bills, run three-way matching, and route approvals with Alfie." }, { property: "og:title", content: "Payables | Alfie Enterprise Finance" }, { property: "og:description", content: "An AI-powered payables workspace for bill capture, matching, and approval." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: PayablesPage,
});

type Answer = { prompt: string; files: Attachment[]; intro: string; rows: Bill[]; note: string };

function answerFor(prompt: string, all: Bill[]): Omit<Answer, "prompt" | "files"> {
  const p = prompt.toLowerCase();
  const open = all.filter((b) => !["Paid"].includes(b.status));
  if (p.includes("approval") || p.includes("approve")) return { intro: payablesAnswers.approval.intro, rows: open.filter((b) => b.status === "Awaiting Approval" || (b.status === "Needs Review" && b.amount > 50_000)), note: payablesAnswers.approval.note };
  if (p.includes("due")) return { intro: payablesAnswers.due.intro, rows: open.filter((b) => b.dueDays >= 0 && b.dueDays <= 6 && b.status !== "On Hold"), note: payablesAnswers.due.note };
  if (p.includes("exception") || p.includes("match")) return { intro: payablesAnswers.exception.intro, rows: open.filter((b) => b.match !== "Matched"), note: payablesAnswers.exception.note };
  if (p.includes("hold") || p.includes("held")) return { intro: payablesAnswers.hold.intro, rows: all.filter((b) => b.status === "On Hold"), note: payablesAnswers.hold.note };
  if (p.includes("entity")) { const byEntity = [...new Set(all.map((b) => b.entity))].map((e) => { const rows = open.filter((b) => b.entity === e); return `${e}: ${rows.length} open bills, ${fmt(rows.reduce((s, b) => s + b.amount, 0), rows[0]?.currency ?? "CAD")}`; }); return { intro: "Open payables by entity:", rows: open.slice(0, 5), note: byEntity.join(". ") + ". Amounts are shown in each entity's operating currency; consolidated reporting converts to CAD." }; }
  if (payablesVendorKeywords.some((k) => p.includes(k))) return { intro: payablesAnswers.vendor.intro, rows: open.filter((b) => b.vendor === payablesVendorName), note: payablesAnswers.vendor.note };
  return { intro: payablesAnswers.fallback.intro, rows: open.filter((b) => b.priority === "High" && b.status !== "On Hold").slice(0, 3), note: payablesAnswers.fallback.note };
}

function PayablesPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Bill[]>(seed);
  const [tab, setTab] = useState<"All" | BillStatus>("All");
  const [search, setSearch] = useState("");
  const [vendor, setVendor] = useState("");
  const [entity, setEntity] = useState("");
  const [owner, setOwner] = useState("");
  const [due, setDue] = useState("");
  const [received, setReceived] = useState("");
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [thinking, setThinking] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [form, setForm] = useState({ vendor: "", entity: entities[0]!, invoiceNumber: "", amount: "" });

  const uniq = (k: keyof Bill) => [...new Set(rows.map((r) => String(r[k])))];
  const filtered = useMemo(() => rows.filter((b) => (tab === "All" || b.status === tab) && (!vendor || b.vendor === vendor) && (!entity || b.entity === entity) && (!owner || b.owner === owner) && (!due || b.dueMonth === due) && (!received || b.receivedDays <= Number(received)) && (!search || `${b.id} ${b.vendor} ${b.invoiceNumber} ${b.category} ${b.entity}`.toLowerCase().includes(search.toLowerCase()))), [rows, tab, vendor, entity, owner, due, received, search]);
  const anyFilter = tab !== "All" || vendor || entity || owner || due || received || search;

  const ask = (text: string, files: Attachment[] = []) => {
    const q = text || "Analyze the attached files.";
    setPrompt(""); setThinking(true);
    setTimeout(() => { setAnswers((a) => [{ prompt: q, files, ...answerFor(q, rows) }, ...a]); setThinking(false); }, 700);
  };
  const create = () => {
    const id = `BILL-${newBillDefaults.firstNumber + rows.length - seed.length}`;
    setRows((r) => [{ id, vendor: form.vendor || "New Vendor", entity: form.entity, category: "General", invoiceNumber: form.invoiceNumber || "Pending", status: "New", priority: "Medium", owner: newBillDefaults.owner, received: "Just now", receivedDays: 0, due: "Dec 15, 2026", dueMonth: "Dec 2026", dueDays: 29, amount: Number(form.amount) || 0, currency: form.entity === newBillDefaults.usdEntity ? "USD" : "CAD", match: "No PO", issues: 1 }, ...r]);
    setNewOpen(false); setForm({ vendor: "", entity: entities[0]!, invoiceNumber: "", amount: "" });
  };
  const sel = "select-chevron h-8 rounded-lg border border-border bg-background pl-2.5 text-xs text-foreground outline-none focus:border-ring";

  return <AppShell><div className="mx-auto max-w-7xl px-5 pb-12 pt-8 lg:px-10">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-2xl font-semibold tracking-tight">Payables</h1><p className="mt-2 text-sm text-muted-foreground">Capture vendor bills, run three-way matching, and route approvals with Alfie.</p></div><Button onClick={() => setNewOpen(true)}><Plus className="size-4" />New Bill</Button></div>

    <div className="relative mt-6"><Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && search.trim().split(" ").length > 3) { ask(search); setSearch(""); } }} placeholder="Search bills, vendors, invoice numbers, or ask Alfie…" aria-label="Search bills" className="h-11 w-full rounded-xl border border-border bg-secondary/50 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-ring" /></div>

    <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-5">{payablesMetrics.map(([label, value, trend, up]) => <div key={label} className="bg-card p-4"><p className="text-[13px] font-medium text-muted-foreground">{label}</p><p className="mt-1.5 text-2xl font-semibold">{value}</p><p className="mt-1 flex items-center gap-0.5 text-[12px] text-muted-foreground">{up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}{trend}</p></div>)}</div>

    <section className="mt-6 rounded-2xl border border-border bg-panel p-4">
      <div className="mb-3 flex items-center gap-2"><AlfieMark /><h2 className="text-sm font-semibold">Ask Alfie about payables</h2></div>
      <AlfieComposer value={prompt} onChange={setPrompt} onSend={ask} placeholder="Ask Alfie about payables…" />
      <div className="mt-3 flex flex-wrap gap-2">{payablesExamples.map((ex) => <Button key={ex} variant="secondary" size="sm" className="h-auto whitespace-normal py-1.5 text-left font-normal" onClick={() => ask(ex)}><Sparkle className="size-3 shrink-0 text-primary" />{ex}</Button>)}</div>
      {thinking ? <p className="mt-4 animate-pulse text-xs text-muted-foreground">Alfie is reviewing the bill queue…</p> : null}
      {answers.map((a, i) => <div key={i} className="mt-4 rounded-xl border border-border bg-card p-4">
        <div className="flex items-start justify-between gap-3"><p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">You:</span> {a.prompt}</p><button aria-label="Dismiss" onClick={() => setAnswers((x) => x.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-foreground"><X className="size-3.5" /></button></div>
        {a.files.length ? <div className="mt-2 flex flex-wrap gap-2">{a.files.map((f) => <AttachmentChip key={f.id} file={f} />)}</div> : null}
        <p className="mt-3 text-sm">{a.intro}</p>
        <div className="mt-3 divide-y divide-border rounded-lg border border-border">{a.rows.map((b) => <Link key={b.id} to="/payables/$billId" params={{ billId: b.id }} className="flex items-center gap-3 px-3 py-2 text-xs hover:bg-secondary"><span className="font-semibold">{b.id}</span><span className="text-muted-foreground">{b.vendor} · {b.invoiceNumber}</span><span className="ml-auto hidden sm:inline">{fmt(b.amount, b.currency)}</span><BillPriorityBadge priority={b.priority} /></Link>)}</div>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">{a.note}</p>
      </div>)}
    </section>

    <section className="mt-8">
      <div className="flex items-center justify-between"><h2 className="text-sm font-semibold">Bill work queue</h2><span className="text-xs text-muted-foreground">{filtered.length} bills</span></div>
      <div className="scrollbar-none mt-3 flex gap-1 overflow-x-auto">{(["All", ...billStatuses] as const).map((s) => <Button key={s} size="sm" variant={tab === s ? "soft" : "ghost"} onClick={() => setTab(s)} className={tab === s ? "text-foreground" : ""}>{s}</Button>)}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        <select aria-label="Vendor" className={sel} value={vendor} onChange={(e) => setVendor(e.target.value)}><option value="">Vendor: Any</option>{uniq("vendor").map((x) => <option key={x}>{x}</option>)}</select>
        <select aria-label="Entity" className={sel} value={entity} onChange={(e) => setEntity(e.target.value)}><option value="">Entity: Any</option>{uniq("entity").map((x) => <option key={x}>{x}</option>)}</select>
        <select aria-label="Owner" className={sel} value={owner} onChange={(e) => setOwner(e.target.value)}><option value="">Owner: Anyone</option>{uniq("owner").map((x) => <option key={x}>{x}</option>)}</select>
        <select aria-label="Due date" className={sel} value={due} onChange={(e) => setDue(e.target.value)}><option value="">Due: Any</option>{uniq("dueMonth").map((x) => <option key={x}>{x}</option>)}</select>
        <select aria-label="Received date" className={sel} value={received} onChange={(e) => setReceived(e.target.value)}><option value="">Received: Any time</option><option value="0">Today</option><option value="1">Last 2 days</option><option value="7">Last 7 days</option></select>
        {anyFilter ? <Button size="sm" variant="ghost" onClick={() => { setTab("All"); setVendor(""); setEntity(""); setOwner(""); setDue(""); setReceived(""); setSearch(""); }}>Clear filters</Button> : null}
      </div>
      <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-card"><table className="w-full min-w-[900px] text-left text-sm">
        <thead><tr className="border-b border-border text-[13px] uppercase tracking-wider text-muted-foreground">{["Bill", "Vendor", "Entity", "Invoice", "Status", "Match", "Amount", "Due"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr></thead>
        <tbody>{filtered.map((b) => <tr key={b.id} onClick={() => navigate({ to: "/payables/$billId", params: { billId: b.id } })} className="cursor-pointer border-b border-border last:border-0 hover:bg-secondary/60">
          <td className="px-4 py-3"><Link to="/payables/$billId" params={{ billId: b.id }} onClick={(e) => e.stopPropagation()} className="font-semibold hover:text-primary">{b.id}</Link></td>
          <td className="px-4 py-3">{b.vendor}</td><td className="px-4 py-3 text-muted-foreground">{entityShortNames[b.entity] ?? b.entity}</td><td className="px-4 py-3 text-muted-foreground">{b.invoiceNumber}</td><td className="px-4 py-3"><BillStatusBadge status={b.status} /></td><td className="px-4 py-3"><MatchBadge match={b.match} /></td>
          <td className="px-4 py-3 tabular-nums">{fmt(b.amount, b.currency)}</td><td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{b.due}</td>
        </tr>)}{filtered.length === 0 ? <tr><td colSpan={8} className="px-4 py-10 text-center text-sm text-muted-foreground">No bills match these filters.</td></tr> : null}</tbody>
      </table></div>
      <p className="mt-3 text-[12px] leading-4 text-muted-foreground">Sample data shown for illustration. Bills, matches and approvals run on local state until {erpName} and the bank feeds are connected through Data Sources.</p>
    </section>

    <Dialog open={newOpen} onOpenChange={setNewOpen}><DialogContent><DialogHeader><DialogTitle>New bill</DialogTitle><DialogDescription>Log a vendor bill. Alfie will capture the invoice, run the duplicate check, and start the three-way match.</DialogDescription></DialogHeader>
      <div className="grid gap-3">
        <label className="text-xs font-medium">Vendor<input value={form.vendor} onChange={(e) => setForm({ ...form, vendor: e.target.value })} className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-ring" /></label>
        <label className="text-xs font-medium">Invoice number<input value={form.invoiceNumber} onChange={(e) => setForm({ ...form, invoiceNumber: e.target.value })} className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-ring" /></label>
        <label className="text-xs font-medium">Amount ($)<input value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-ring" /></label>
        <label className="text-xs font-medium">Entity<select value={form.entity} onChange={(e) => setForm({ ...form, entity: e.target.value })} className="select-chevron mt-1 h-9 w-full rounded-lg border border-border bg-background pl-2.5 text-sm">{entities.map((x) => <option key={x}>{x}</option>)}</select></label>
      </div>
      <DialogFooter><Button variant="secondary" onClick={() => setNewOpen(false)}>Cancel</Button><Button onClick={create}>Create bill</Button></DialogFooter></DialogContent></Dialog>
  </div></AppShell>;
}
