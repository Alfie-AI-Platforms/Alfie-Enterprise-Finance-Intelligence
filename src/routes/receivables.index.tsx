import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowDown, ArrowDownRight, ArrowUp, ArrowUpRight, Plus, Search, Sparkle, X } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AlfieMark } from "@/components/alfie-ui";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlfieComposer, AttachmentChip, type Attachment } from "@/components/alfie-composer";
import { CustomerStatusBadge } from "@/components/receivables-badges";
import { customers as seed, customerSegments, customerStatuses, entities, entityShortNames, erpName, fmt, newCustomerDefaults, priorityCustomerIds, receivablesAnswers, receivablesMetrics, slowingCustomerIds, type ArCustomer, type CustomerStatus } from "@/lib/receivables-data";

export const Route = createFileRoute("/receivables/")({
  head: () => ({ meta: [{ title: "Receivables | Alfie Enterprise Finance" }, { name: "description", content: "Track customer balances, aging, and collections with Alfie." }, { property: "og:title", content: "Receivables | Alfie Enterprise Finance" }, { property: "og:description", content: "An AI-powered receivables workspace for aging, credit, and collections." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: ReceivablesPage,
});

const examples = ["Which customers are over 60 days?", "Who should be on credit hold?", "Show me the largest open balances.", "Summarize receivables by entity.", "Which customers are slowing down?", "What should collections do this week?"];
const columns: readonly (readonly [string, keyof ArCustomer])[] = [["Customer", "name"], ["Entity", "entity"], ["Segment", "segment"], ["Open Balance", "openBalance"], ["Over 60", "over60"], ["Oldest Invoice", "oldestInvoiceDays"], ["Credit Limit", "creditLimit"], ["Status", "status"]];

type Answer = { prompt: string; files: Attachment[]; intro: string; rows: ArCustomer[]; note: string };
function answerFor(prompt: string, all: ArCustomer[]): Omit<Answer, "prompt" | "files"> {
  const p = prompt.toLowerCase();
  if (p.includes("60")) return { intro: receivablesAnswers.over60.intro, rows: all.filter((c) => c.over60 > 0), note: receivablesAnswers.over60.note };
  if (p.includes("hold")) return { intro: receivablesAnswers.hold.intro, rows: all.filter((c) => c.status === "Credit Hold Recommended"), note: receivablesAnswers.hold.note };
  if (p.includes("largest") || p.includes("balance")) return { intro: receivablesAnswers.largest.intro, rows: [...all].sort((a, b) => b.openBalance - a.openBalance).slice(0, 4), note: receivablesAnswers.largest.note };
  if (p.includes("entity")) { const byEntity = [...new Set(all.map((c) => c.entity))].map((e) => { const rows = all.filter((c) => c.entity === e); return `${e}: ${rows.length} customers shown, ${fmt(rows.reduce((s, c) => s + c.openBalance, 0), rows[0]?.currency ?? "CAD")} open`; }); return { intro: "Open receivables by selling entity:", rows: all.slice(0, 4), note: byEntity.join(". ") + "." }; }
  if (p.includes("slowing")) return { intro: receivablesAnswers.slowing.intro, rows: all.filter((c) => slowingCustomerIds.includes(c.id)), note: receivablesAnswers.slowing.note };
  return { intro: receivablesAnswers.fallback.intro, rows: all.filter((c) => priorityCustomerIds.includes(c.id)), note: receivablesAnswers.fallback.note };
}

function ReceivablesPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<ArCustomer[]>(seed);
  const [tab, setTab] = useState<"All" | CustomerStatus>("All");
  const [search, setSearch] = useState("");
  const [entity, setEntity] = useState(""); const [segment, setSegment] = useState(""); const [owner, setOwner] = useState(""); const [range, setRange] = useState("");
  const [sort, setSort] = useState<{ key: keyof ArCustomer; dir: 1 | -1 }>({ key: "openBalance", dir: -1 });
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [thinking, setThinking] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [form, setForm] = useState({ name: "", entity: entities[0]!, segment: customerSegments[0]!, limit: "" });

  const uniq = (k: keyof ArCustomer) => [...new Set(rows.map((r) => String(r[k])))];
  const inRange = (v: number) => !range || (range === "lt50" ? v < 50000 : range === "50to100" ? v >= 50000 && v <= 100000 : v > 100000);
  const filtered = useMemo(() => rows
    .filter((c) => (tab === "All" || c.status === tab) && (!entity || c.entity === entity) && (!segment || c.segment === segment) && (!owner || c.owner === owner) && inRange(c.openBalance) && (!search || `${c.id} ${c.name} ${c.segment} ${c.entity}`.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => { const av = a[sort.key], bv = b[sort.key]; return (av > bv ? 1 : av < bv ? -1 : 0) * sort.dir; }),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [rows, tab, entity, segment, owner, range, search, sort]);
  const anyFilter = tab !== "All" || entity || segment || owner || range || search;

  const ask = (text: string, files: Attachment[] = []) => {
    const q = text || "Analyze the attached files.";
    setPrompt(""); setThinking(true);
    setTimeout(() => { setAnswers((a) => [{ prompt: q, files, ...answerFor(q, rows) }, ...a]); setThinking(false); }, 700);
  };
  const create = () => {
    const id = `CUS-${newCustomerDefaults.firstNumber + rows.length - seed.length}`;
    setRows((r) => [{ id, name: form.name || "New Customer", entity: form.entity, segment: form.segment, status: "Current", currency: form.entity === newCustomerDefaults.usdEntity ? "USD" : "CAD", openBalance: 0, current: 0, days1to30: 0, days31to60: 0, over60: 0, creditLimit: Number(form.limit) || 50000, terms: "Net 30", owner: newCustomerDefaults.owner, contact: "To be confirmed", oldestInvoiceDays: 0, lastPayment: "None yet", lastPaymentAmount: 0, creditNote: "New account. Alfie will build a payment profile as invoices are issued and paid.", invoices: [], payments: [] }, ...r]);
    setNewOpen(false); setForm({ name: "", entity: entities[0]!, segment: customerSegments[0]!, limit: "" });
  };
  const sel = "select-chevron h-8 rounded-lg border border-border bg-background pl-2.5 text-xs text-foreground outline-none focus:border-ring";

  return <AppShell><div className="mx-auto max-w-7xl px-5 pb-12 pt-8 lg:px-10">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-2xl font-semibold tracking-tight">Receivables</h1><p className="mt-2 text-sm text-muted-foreground">Track customer balances, aging, and collections with Alfie.</p></div><Button onClick={() => setNewOpen(true)}><Plus className="size-4" />New Customer</Button></div>

    <div className="relative mt-6"><Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && search.trim().split(" ").length > 3) { ask(search); setSearch(""); } }} placeholder="Search customers, segments, entities, or ask Alfie…" aria-label="Search customers" className="h-11 w-full rounded-xl border border-border bg-secondary/50 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-ring" /></div>

    <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-5">{receivablesMetrics.map(([label, value, trend, up]) => <div key={label} className="bg-card p-4"><p className="text-[13px] font-medium text-muted-foreground">{label}</p><p className="mt-1.5 text-2xl font-semibold">{value}</p><p className="mt-1 flex items-center gap-0.5 text-[12px] text-muted-foreground">{up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}{trend}</p></div>)}</div>

    <section className="mt-6 rounded-2xl border border-border bg-panel p-4">
      <div className="mb-3 flex items-center gap-2"><AlfieMark /><h2 className="text-sm font-semibold">Ask Alfie about receivables</h2></div>
      <AlfieComposer value={prompt} onChange={setPrompt} onSend={ask} placeholder="Ask Alfie about receivables…" />
      <div className="mt-3 flex flex-wrap gap-2">{examples.map((ex) => <Button key={ex} variant="secondary" size="sm" className="h-auto whitespace-normal py-1.5 text-left font-normal" onClick={() => ask(ex)}><Sparkle className="size-3 shrink-0 text-primary" />{ex}</Button>)}</div>
      {thinking ? <p className="mt-4 animate-pulse text-xs text-muted-foreground">Alfie is reviewing the receivables ledger…</p> : null}
      {answers.map((a, i) => <div key={i} className="mt-4 rounded-xl border border-border bg-card p-4">
        <div className="flex items-start justify-between gap-3"><p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">You:</span> {a.prompt}</p><button aria-label="Dismiss" onClick={() => setAnswers((x) => x.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-foreground"><X className="size-3.5" /></button></div>
        {a.files.length ? <div className="mt-2 flex flex-wrap gap-2">{a.files.map((f) => <AttachmentChip key={f.id} file={f} />)}</div> : null}
        <p className="mt-3 text-sm">{a.intro}</p>
        <div className="mt-3 divide-y divide-border rounded-lg border border-border">{a.rows.map((c) => <Link key={c.id} to="/receivables/$customerId" params={{ customerId: c.id }} className="flex items-center gap-3 px-3 py-2 text-xs hover:bg-secondary"><span className="font-semibold">{c.id}</span><span className="text-muted-foreground">{c.name} · {c.segment}</span><span className="ml-auto hidden sm:inline">{fmt(c.openBalance, c.currency)} open</span><CustomerStatusBadge status={c.status} /></Link>)}</div>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">{a.note}</p>
      </div>)}
    </section>

    <section className="mt-8">
      <div className="flex items-center justify-between"><h2 className="text-sm font-semibold">Customer accounts</h2><span className="text-xs text-muted-foreground">{filtered.length} customers</span></div>
      <div className="scrollbar-none mt-3 flex gap-1 overflow-x-auto">{(["All", ...customerStatuses] as const).map((s) => <Button key={s} size="sm" variant={tab === s ? "soft" : "ghost"} onClick={() => setTab(s)} className={tab === s ? "text-foreground" : ""}>{s}</Button>)}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        <select aria-label="Entity" className={sel} value={entity} onChange={(e) => setEntity(e.target.value)}><option value="">Entity: Any</option>{uniq("entity").map((x) => <option key={x}>{x}</option>)}</select>
        <select aria-label="Segment" className={sel} value={segment} onChange={(e) => setSegment(e.target.value)}><option value="">Segment: Any</option>{uniq("segment").map((x) => <option key={x}>{x}</option>)}</select>
        <select aria-label="Owner" className={sel} value={owner} onChange={(e) => setOwner(e.target.value)}><option value="">Owner: Anyone</option>{uniq("owner").map((x) => <option key={x}>{x}</option>)}</select>
        <select aria-label="Balance range" className={sel} value={range} onChange={(e) => setRange(e.target.value)}><option value="">Balance: Any</option><option value="lt50">Under $50K</option><option value="50to100">$50K to $100K</option><option value="gt100">Over $100K</option></select>
        {anyFilter ? <Button size="sm" variant="ghost" onClick={() => { setTab("All"); setEntity(""); setSegment(""); setOwner(""); setRange(""); setSearch(""); }}>Clear filters</Button> : null}
      </div>
      <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-card"><table className="w-full min-w-[960px] text-left text-sm">
        <thead><tr className="border-b border-border text-[13px] uppercase tracking-wider text-muted-foreground">{columns.map(([h, k]) => <th key={h} className="px-4 py-3 font-medium"><button className="inline-flex items-center gap-1 uppercase hover:text-foreground" onClick={() => setSort((s) => ({ key: k, dir: s.key === k ? (s.dir === 1 ? -1 : 1) : 1 }))} aria-label={`Sort by ${h}`}>{h}{sort.key === k ? sort.dir === 1 ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" /> : null}</button></th>)}</tr></thead>
        <tbody>{filtered.map((c) => <tr key={c.id} onClick={() => navigate({ to: "/receivables/$customerId", params: { customerId: c.id } })} className="cursor-pointer border-b border-border last:border-0 hover:bg-secondary/60">
          <td className="px-4 py-3"><Link to="/receivables/$customerId" params={{ customerId: c.id }} onClick={(e) => e.stopPropagation()} className="font-semibold hover:text-primary">{c.name}</Link></td>
          <td className="px-4 py-3 text-muted-foreground">{entityShortNames[c.entity] ?? c.entity}</td><td className="px-4 py-3 text-muted-foreground">{c.segment}</td><td className="px-4 py-3 tabular-nums">{fmt(c.openBalance, c.currency)}</td><td className="px-4 py-3 tabular-nums">{c.over60 ? fmt(c.over60, c.currency) : "—"}</td><td className="px-4 py-3 text-muted-foreground">{c.oldestInvoiceDays ? `${c.oldestInvoiceDays} days` : "—"}</td><td className="px-4 py-3 tabular-nums text-muted-foreground">{fmt(c.creditLimit, c.currency)}</td><td className="px-4 py-3"><CustomerStatusBadge status={c.status} /></td>
        </tr>)}{filtered.length === 0 ? <tr><td colSpan={8} className="px-4 py-10 text-center text-sm text-muted-foreground">No customers match these filters.</td></tr> : null}</tbody>
      </table></div>
      <p className="mt-3 text-[12px] leading-4 text-muted-foreground">Sample data shown for illustration. Balances and aging run on local state until {erpName} and the bank feeds are connected through Data Sources.</p>
    </section>

    <Dialog open={newOpen} onOpenChange={setNewOpen}><DialogContent><DialogHeader><DialogTitle>New customer</DialogTitle><DialogDescription>Add a customer account. Alfie will start an aging and payment profile as invoices are issued.</DialogDescription></DialogHeader>
      <div className="grid gap-3">
        <label className="text-xs font-medium">Customer name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-ring" /></label>
        <label className="text-xs font-medium">Credit limit ($)<input value={form.limit} onChange={(e) => setForm({ ...form, limit: e.target.value })} className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-ring" /></label>
        <label className="text-xs font-medium">Selling entity<select value={form.entity} onChange={(e) => setForm({ ...form, entity: e.target.value })} className="select-chevron mt-1 h-9 w-full rounded-lg border border-border bg-background pl-2.5 text-sm">{entities.map((x) => <option key={x}>{x}</option>)}</select></label>
        <label className="text-xs font-medium">Segment<select value={form.segment} onChange={(e) => setForm({ ...form, segment: e.target.value })} className="select-chevron mt-1 h-9 w-full rounded-lg border border-border bg-background pl-2.5 text-sm">{customerSegments.map((x) => <option key={x}>{x}</option>)}</select></label>
      </div>
      <DialogFooter><Button variant="secondary" onClick={() => setNewOpen(false)}>Cancel</Button><Button onClick={create}>Create customer</Button></DialogFooter></DialogContent></Dialog>
  </div></AppShell>;
}
