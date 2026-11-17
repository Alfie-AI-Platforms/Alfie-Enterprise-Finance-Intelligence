import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Building2, ChevronRight, CircleDollarSign, ClipboardCheck, FileBarChart, FileText, Landmark, Plus, Receipt, Sparkle, TrendingUp, X, Zap, type LucideIcon } from "lucide-react";
import { useState, type ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { AlfieComposer } from "@/components/alfie-composer";
import { AlfieChip, AlfieMark, SectionLabel } from "@/components/alfie-ui";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Alfie Enterprise Finance AI | Finance Workspace" }, { name: "description", content: "Your AI-native workspace for accounting, close, payables, receivables, treasury and planning." }, { property: "og:title", content: "Alfie Enterprise Finance AI" }, { property: "og:description", content: "Understand, analyze, and act across your finance operations with Alfie." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Index,
});

const metrics = [
  ["Cash Position", "$18.4M", "6 accounts · CAD equivalent", "text-positive"],
  ["November Close", "18 of 64", "Early tasks under way", "text-warning"],
  ["AP Due This Week", "$1.26M", "23 bills scheduled", "text-warning"],
  ["AR Over 60 Days", "$842K", "4 customers to chase", "text-warning"],
];
const prompts = ["Why did gross margin move in October?", "Which bills are waiting on my approval?", "Show me the intercompany differences.", "What does the 13 week cash forecast say?"];
const promptActions: readonly (readonly [string, LucideIcon])[] = [["Analyze", Sparkle], ["Summarize", FileText], ["Create Report", FileBarChart], ["Take Action", Zap]];

type FileLink = { to: "/accounting/$entryId"; params: { entryId: string } } | { to: "/planning/reviews" | "/payables" | "/close" | "/receivables" | "/reports"; params?: undefined };
type QueueItem = { icon: LucideIcon; title: string; detail: string; chip: string; chipTone: string; linkLabel: string; link: FileLink };

function NavLink({ link, className, children }: { link: FileLink; className?: string; children: ReactNode }) {
  return link.params ? <Link to="/accounting/$entryId" params={link.params} className={className}>{children}</Link> : <Link to={link.to} className={className}>{children}</Link>;
}
const queue: QueueItem[] = [
  { icon: BookOpen, title: "Entry JE-2026-1087: intercompany difference of $18,400", detail: "Alfie traced the gap between Manufacturing and Logistics to a missing October 31 FX revaluation and prepared the correcting entry. Post-close adjustments above $10,000 need CFO approval after your review.", chip: "CFO approval", chipTone: "bg-status-paused text-status-paused-foreground", link: { to: "/accounting/$entryId", params: { entryId: "JE-2026-1087" } }, linkLabel: "Open entry file" },
  { icon: TrendingUp, title: "Forecast review FR-2026-011: Q4 forecast update", detail: "Grace Liu has submitted the updated Q4 forecast. Revenue holds at $102.6M YTD pace, with steel costs running above budget in Manufacturing.", chip: "Awaiting approval", chipTone: "bg-status-paused text-status-paused-foreground", link: { to: "/planning/reviews" }, linkLabel: "Open forecast review" },
  { icon: Receipt, title: "Payables: a duplicate bill was held for you", detail: "Alfie held BILL-2219 from Northgate Office Supply because it duplicates BILL-2207, same invoice number and amount. BILL-2214 from Great Lakes Steel, $86,400, is ready for your approval.", chip: "Decisions needed", chipTone: "bg-secondary text-secondary-foreground", link: { to: "/payables" }, linkLabel: "Open payables" },
  { icon: ClipboardCheck, title: "November close: early tasks under way", detail: "18 of 64 tasks are complete. Subledger cutoffs start November 28, and the payroll clearing exception of $3,215 is the one reconciliation item Alfie cannot clear on its own.", chip: "In progress", chipTone: "bg-status-active text-status-active-foreground", link: { to: "/close" }, linkLabel: "Open close checklist" },
];

const recentFiles: readonly { icon: LucideIcon; title: string; meta: string; link: FileLink }[] = [
  { icon: BookOpen, title: "Entry JE-2026-1087", meta: "Intercompany · Meridian Manufacturing", link: { to: "/accounting/$entryId", params: { entryId: "JE-2026-1087" } } },
  { icon: Receipt, title: "Payables queue", meta: "Bills, approvals and duplicates", link: { to: "/payables" } },
  { icon: CircleDollarSign, title: "Receivables", meta: "$842K over 60 days", link: { to: "/receivables" } },
  { icon: FileBarChart, title: "Reports library", meta: "Board, lender and audit reports", link: { to: "/reports" } },
];

const activities: readonly (readonly [LucideIcon, string, string])[] = [[FileBarChart, "October margin analysis completed", "Manufacturing · 22 minutes ago"], [Landmark, "Reconciled 19 of 24 bank accounts", "Treasury · 1 hour ago"], [Sparkle, "Flagged 7 anomalies in October actuals", "Accounting · 3 hours ago"]];
const contextItems: readonly (readonly [string, string, LucideIcon])[] = [["Current context", "Finance", Building2], ["Active workspace", "Accounting", BookOpen]];

function Index() {
  const [prompt, setPrompt] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [rightPanel, setRightPanel] = useState(true);
  const now = new Date();
  const dateLabel = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const submit = (text: string) => { if (!text.trim()) return; setSubmitted(text.trim()); setPrompt(""); };

  const contextPanel = <aside className={`${rightPanel ? "flex" : "hidden"} absolute inset-y-16 right-0 z-20 w-[300px] flex-col border-l border-border bg-panel p-5 shadow-workspace xl:relative xl:inset-auto xl:flex xl:shadow-none`}>
    <div className="mb-6 flex items-center justify-between"><h2 className="text-sm font-semibold">Workspace context</h2><Button variant="ghost" size="icon" onClick={() => setRightPanel(false)} className="xl:hidden" aria-label="Close context panel"><X className="size-4" /></Button></div>
    <div className="grid grid-cols-2 gap-2">{contextItems.map(([label, value, Icon]) => <div key={label} className="rounded-md border border-border bg-background p-3"><p className="text-[12px] text-muted-foreground">{label}</p><div className="mt-2 flex items-center gap-2 text-xs font-semibold"><Icon className="size-3.5 text-primary" />{value}</div></div>)}</div>
    <div className="mt-7"><SectionLabel>Quick actions</SectionLabel>{["Prepare a Journal Entry", "Review Bills for Approval", "Run Close Checklist", "Generate Report", "View Cash Forecast"].map((item) => <Button key={item} variant="ghost" onClick={() => setPrompt(item)} className="mt-1 w-full justify-start px-2 text-xs"><Plus className="size-3.5" />{item}</Button>)}</div>
    <div className="mt-auto border-t border-border pt-4"><div className="flex items-start gap-2"><AlfieMark className="size-5 rounded-md" /><p className="text-[12px] leading-4 text-muted-foreground">Alfie uses approved enterprise data sources and respects your access permissions.</p></div></div>
  </aside>;

  return <AppShell rightPanel={contextPanel}><div className="mx-auto flex min-h-full max-w-5xl flex-col px-5 pb-10 pt-8 lg:px-10 lg:pt-10">
    <section>
      <div className="flex items-end justify-between gap-4"><div><p className="mb-1 text-xs font-medium text-muted-foreground">{dateLabel}</p><h1 className="text-3xl font-semibold tracking-tight">{greeting}, Elena</h1><p className="mt-2 text-sm text-muted-foreground">Your queue is first. Alfie has already done the analysis behind each item.</p></div><Button variant="secondary" size="sm" className="hidden sm:inline-flex"><FileBarChart className="size-3.5" />Daily briefing</Button></div>
      <div className="mt-8 grid grid-cols-2 border-y border-border lg:grid-cols-4">{metrics.map(([label, value, note, tone], index) => <div key={label} className={`py-4 ${index % 2 === 0 ? "pr-4" : "pl-4"} ${index > 1 ? "border-t border-border lg:border-t-0" : ""} lg:border-r lg:px-5 lg:first:pl-0 lg:last:border-r-0`}><p className="text-[13px] font-medium text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-semibold">{value}</p><p className={`mt-1 text-[12px] font-medium ${tone}`}>{note}</p></div>)}</div>
    </section>

    <section className="mt-10">
      <div className="mb-5 flex flex-col items-center text-center"><AlfieMark className="size-11 rounded-2xl" /><h2 className="mt-3 text-xl font-semibold">What can Alfie help you with?</h2><p className="mt-1 text-sm text-muted-foreground">Ask across accounting, close, payables, receivables, treasury and planning.</p></div>
      {submitted ? <div className="mx-auto mb-4 flex max-w-3xl items-center gap-3 rounded-xl border border-border bg-secondary/60 px-4 py-3 text-sm"><AlfieChip /><span><span className="mr-2 font-semibold">You asked:</span>{submitted}</span></div> : null}
      <div className="mx-auto w-full max-w-3xl">
        <AlfieComposer value={prompt} onChange={setPrompt} onSend={(text) => submit(text)} placeholder="Ask Alfie anything about your finance operations…" />
        <div className="mt-3 flex flex-wrap items-center gap-1">{promptActions.map(([action, Icon]) => <Button key={action} variant="ghost" size="sm" onClick={() => setPrompt(`${action}: `)}><Icon className="size-3.5" />{action}</Button>)}</div>
      </div>
      <div className="mx-auto mt-6 w-full max-w-3xl"><div className="mb-2 flex items-center justify-between"><SectionLabel>Suggested prompts</SectionLabel><span className="text-[12px] text-muted-foreground">Tailored to your role</span></div><div className="grid gap-2 sm:grid-cols-2">{prompts.map((item) => <Button key={item} variant="secondary" onClick={() => setPrompt(item)} className="h-auto min-h-10 justify-start whitespace-normal px-3 py-2 text-left text-xs font-normal"><Sparkle className="size-3.5 shrink-0 text-primary" />{item}</Button>)}</div></div>
    </section>

    <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_300px]">
      <div>
        <div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-semibold">Your queue</h3><span className="text-[13px] text-muted-foreground">{queue.length} items need you</span></div>
        <div className="divide-y divide-border rounded-xl border border-border bg-card">
          {queue.map((item) => <div key={item.title} className="flex items-start gap-3 p-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground"><item.icon className="size-4" strokeWidth={1.7} /></div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2"><p className="text-sm font-medium leading-5">{item.title}</p><span className={`rounded-full px-2 py-0.5 text-[12px] font-medium ${item.chipTone}`}>{item.chip}</span></div>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.detail}</p>
              <NavLink link={item.link} className="mt-1.5 inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs font-medium hover:bg-secondary">{item.linkLabel}<ArrowRight className="size-3.5" /></NavLink>
            </div>
          </div>)}
        </div>
      </div>
      <div>
        <div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-semibold">Recent files</h3></div>
        <div className="space-y-1">
          {recentFiles.map((file) => <NavLink key={file.title} link={file.link} className="flex w-full items-center gap-3 rounded-md px-2 py-2.5 hover:bg-secondary"><span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card"><file.icon className="size-4 text-muted-foreground" strokeWidth={1.7} /></span><span className="min-w-0 flex-1 text-left"><span className="block truncate text-xs font-medium">{file.title}</span><span className="block truncate text-[12px] text-muted-foreground">{file.meta}</span></span><ChevronRight className="size-3.5 text-muted-foreground" /></NavLink>)}
        </div>
        <div className="mt-6 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2"><AlfieChip /><span className="text-xs font-semibold">Working on your queue</span></div>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">Alfie keeps the analysis behind each queue item inside its file, so opening one starts with the work already done.</p>
        </div>
      </div>
    </section>

    <section className="mt-10 border-t border-border pt-5"><div className="mb-3 flex items-center justify-between"><h3 className="text-xs font-semibold">Recent activity</h3><Button variant="ghost" size="sm">View all</Button></div><div className="grid gap-2 md:grid-cols-3">{activities.map(([Icon, title, meta]) => <Button key={title} variant="secondary" className="h-auto min-h-20 items-start justify-start gap-3 whitespace-normal p-3 text-left font-normal"><div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded bg-secondary"><Icon className="size-3.5" /></div><span><span className="block text-xs font-medium leading-5">{title}</span><span className="mt-1 block text-[12px] text-muted-foreground">{meta}</span></span></Button>)}</div></section>
  </div></AppShell>;
}
