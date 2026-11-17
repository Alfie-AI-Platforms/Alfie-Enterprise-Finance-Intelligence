import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, Bot, Download, MoreHorizontal, Paperclip, Share2, ShieldAlert, Sparkle, Upload } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AlfieChip, AlfieMark, AlfiePanelHeader, ReviewBar } from "@/components/alfie-ui";
import { DocumentSheet, type DocSection } from "@/components/document-view";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlfieComposer, AttachmentChip, FileGlyph, fileExt, type Attachment } from "@/components/alfie-composer";
import { CustomerStatusBadge, InvoiceStatusBadge } from "@/components/receivables-badges";
import { customers, fmt, getCustomer, seedCustomerAudit, type ArAuditEvent, type ArCustomer } from "@/lib/receivables-data";

export const Route = createFileRoute("/receivables/$customerId")({
  head: ({ params }) => ({ meta: [{ title: `Customer ${params.customerId} | Alfie Enterprise Finance` }, { name: "description", content: `Open invoices, aging, payment history, and collection drafts for customer ${params.customerId}.` }, { property: "og:title", content: `Customer ${params.customerId} | Alfie Enterprise Finance` }, { property: "og:description", content: "AI-assisted receivables workspace with aging, credit recommendations, and a full audit trail." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: CustomerWorkspace,
});

type Doc = { id: string; name: string; label: string; date: string; summary: string };
type Reply = { intro: string; items?: string[]; fields?: [string, string][]; next?: string; verdict?: string; confidence?: string; sources?: string[] | undefined; note?: string; draft?: string };
type Msg = { id: string; role: "user" | "alfie"; text?: string; files?: Attachment[]; reply?: Reply; actions?: string[]; attached?: boolean };
type Tab = "details" | "history";
const detailTabs = ["Overview", "Open Invoices", "Aging and Credit", "Payment History", "Documents"] as const;
type DetailTab = (typeof detailTabs)[number];
const prompts = ["Summarize this account.", "What is overdue?", "Draft a collection note.", "Recommend a credit action.", "How has payment behaviour changed?", "Prepare a statement of account."];

const oldestOverdue = (c: ArCustomer) => c.invoices.filter((i) => i.status === "Overdue").sort((a, b) => b.ageDays - a.ageDays)[0];

function collectionDraft(c: ArCustomer): string {
  const oldest = oldestOverdue(c);
  if (c.id === "CUS-2201") return `Subject: Payment timing for invoice INV-90214 and the open balance of $214,300\n\nHello Danielle,\n\nI am writing about invoice INV-90214 for $62,400, issued September 15 and due October 15, which is still open, alongside three further invoices bringing the account to $214,300. Thank you for the payment received on October 20.\n\nSo we can keep deliveries on schedule, could you confirm a payment date for INV-90214 this week, and a plan for the remaining balance? If it helps, we can split the remaining balance across two payments in November.\n\nThank you,\nElena Brooks, VP Finance, Meridian Group Inc.`;
  if (!oldest) return `Subject: Statement of account, ${c.name}\n\nHello ${c.contact.split(",")[0]},\n\nYour account is current at ${fmt(c.openBalance, c.currency)} on ${c.terms} terms. A statement of account is attached for your records. Thank you for keeping the account in good standing.\n\nElena Brooks, VP Finance, Meridian Group Inc.`;
  return `Subject: Payment timing for invoice ${oldest.id} and the open balance of ${fmt(c.openBalance, c.currency)}\n\nHello ${c.contact.split(",")[0]},\n\nInvoice ${oldest.id} for ${fmt(oldest.amount, c.currency)} was due ${oldest.due} and is still open. The total balance on the account is ${fmt(c.openBalance, c.currency)}. Could you confirm when payment will be made, or let me know if anything is holding it up?\n\nThank you,\nElena Brooks, VP Finance, Meridian Group Inc.`;
}

function assessment(c: ArCustomer): Reply {
  const overdue = c.invoices.filter((i) => i.status === "Overdue");
  if (c.id === "CUS-2201") return {
    intro: "Northern Build Supplies owes $214,300 across 4 invoices. The account is not in distress, but it is drifting:",
    items: ["INV-90214 for $62,400 is 32 days past due; it is the largest single invoice and the oldest at 62 days.", "Days to pay has lengthened across the last three payments: 31, then 33, then 36 days.", "The October 20 payment of $48,900 shows the customer is paying, just more slowly."],
    verdict: "Send a firm reminder now; do not place a credit hold yet.",
    next: "Review the drafted collection note to Danielle Roy, then reassess if INV-90214 is unpaid by November 27.",
    confidence: "High",
    sources: ["Open invoices", "Payment history", "Credit file"],
  };
  if (c.status === "Credit Hold Recommended") return {
    intro: `${c.name} owes ${fmt(c.openBalance, c.currency)}, which is above its ${fmt(c.creditLimit, c.currency)} credit limit:`,
    items: [`The oldest invoice is ${c.oldestInvoiceDays} days old, with ${fmt(c.over60, c.currency)} over 60 days.`, "Two payment promises made for November were not kept, and the last payment was partial.", "New orders continue to be placed against an account that is already over its limit."],
    verdict: "Place the account on credit hold until the over 60 day balance is cleared.",
    next: "Approve the hold, then Alfie will draft the customer notification for your review.",
    confidence: "High",
    sources: ["Open invoices", "Credit file", "Payment history"],
  };
  return {
    intro: `${c.name} owes ${fmt(c.openBalance, c.currency)} across ${c.invoices.length} open invoice${c.invoices.length === 1 ? "" : "s"}. ${overdue.length ? `${overdue.length} invoice${overdue.length === 1 ? " is" : "s are"} past due, the oldest at ${c.oldestInvoiceDays} days.` : "Nothing is past due."}`,
    items: c.creditNote ? [c.creditNote] : [],
    verdict: c.status === "On Hold" ? "Credit hold is in place. Escalate with a final demand." : c.status === "Current" ? "No action needed. The account is in good standing." : "Monitor, with a reminder this week.",
    confidence: "High",
    sources: ["Open invoices", "Payment history", "Credit file"],
  };
}

function reviewFor(c: ArCustomer): { status: string; title: string; detail: string } {
  const oldest = oldestOverdue(c);
  if (c.id === "CUS-2201") return { status: "Collection review · 32 days past due", title: "INV-90214 for $62,400 is unpaid past its October 15 due date", detail: "Alfie drafted a collection note to Danielle Roy at Northern Build Supplies. Payment behaviour has slowed over two quarters, but the account is within its $250,000 credit limit and paid $48,900 in October, so Alfie does not recommend a credit hold yet." };
  if (c.status === "Credit Hold Recommended") return { status: "Credit review · Hold recommended", title: `Alfie recommends a credit hold for ${c.name}`, detail: `The balance of ${fmt(c.openBalance, c.currency)} is above the ${fmt(c.creditLimit, c.currency)} credit limit and the oldest invoice is ${c.oldestInvoiceDays} days old. Two November payment promises were not kept.` };
  if (c.status === "On Hold") return { status: "Credit hold in place", title: "This account has been on credit hold since October 6", detail: `No payment has been received since ${c.lastPayment}, and the full balance of ${fmt(c.openBalance, c.currency)} is over 60 days. Alfie recommends a final demand before the balance is considered for write-off.` };
  if (oldest) return { status: "Collection review", title: `${oldest.id} for ${fmt(oldest.amount, c.currency)} is past due`, detail: `The oldest invoice on this account is ${oldest.ageDays} days old. Alfie has a collection draft ready for your review.` };
  return { status: "Account in good standing", title: `Open balance ${fmt(c.openBalance, c.currency)}, nothing past due`, detail: "Alfie is monitoring aging and payment behaviour. No action is needed on this account today." };
}

function docsFor(c: ArCustomer): { docs: Doc[]; sections: Record<string, DocSection[]> } {
  const docs: Doc[] = [
    { id: "s1", name: `statement_${c.id}.pdf`, label: "November Statement of Account", date: "Nov 14, 2026", summary: `Statement of account for ${c.name} at November 14, 2026: open balance ${fmt(c.openBalance, c.currency)} across ${c.invoices.length} invoices, oldest ${c.oldestInvoiceDays} days.` },
    { id: "s2", name: `credit_file_${c.id}.pdf`, label: "Credit Application and Terms", date: "On file", summary: `Credit file for ${c.name}: limit ${fmt(c.creditLimit, c.currency)}, terms ${c.terms}, contact ${c.contact}. Approved by the Controller at account opening and reviewed annually.` },
    { id: "s3", name: `master_agreement_${c.id}.pdf`, label: "Master Supply Agreement", date: "On file", summary: `Master supply agreement between ${c.entity} and ${c.name}, covering pricing, delivery, and payment terms of ${c.terms} from invoice date.` },
    { id: "s4", name: `correspondence_${c.id}.pdf`, label: "Collection Correspondence", date: "Oct 16, 2026", summary: `Correspondence log for ${c.name}: statements and reminders sent, and replies received from ${c.contact}.` },
  ];
  const sections: Record<string, DocSection[]> = {
    s1: [
      { heading: "Open invoices", body: c.invoices.map((i) => `${i.id}: ${fmt(i.amount, c.currency)}, issued ${i.issued}, due ${i.due}`).join(". ") + "." },
      { heading: "Aging", body: `Current ${fmt(c.current, c.currency)}; 1 to 30 days ${fmt(c.days1to30, c.currency)}; 31 to 60 days ${fmt(c.days31to60, c.currency)}; over 60 days ${fmt(c.over60, c.currency)}. Total open ${fmt(c.openBalance, c.currency)}.` },
    ],
    s2: [
      { heading: "Approved terms", body: `Credit limit ${fmt(c.creditLimit, c.currency)} on ${c.terms} terms. Balances above the limit or past 60 days trigger a credit review under the receivables policy.` },
      { heading: "Account contacts", body: `Customer contact: ${c.contact}. Meridian account owner: ${c.owner}.` },
    ],
    s3: [
      { heading: "Payment terms", body: `Invoices are payable ${c.terms.toLowerCase()} from the invoice date. Overdue balances may result in shipments being held until the account is brought current.` },
    ],
    s4: [
      { heading: "Recent correspondence", body: c.id === "CUS-2201" ? "October 16: first reminder for INV-90214 sent by Daniel Okafor. October 20: payment of $48,900 received against INV-90188 with a note that INV-90214 would follow. It has not yet been paid." : "Statements are issued monthly. Reminders follow the standard sequence at 7, 21 and 35 days past due, each approved by a person before sending." },
    ],
  };
  return { docs, sections };
}

function buildAudit(c: ArCustomer): ArAuditEvent[] {
  if (c.id === "CUS-2201") return seedCustomerAudit;
  const events: ArAuditEvent[] = [
    { time: "Nov 16, 09:48", actor: "Alfie", actorType: "Alfie", action: "Collection assessment updated", source: "Aging and payment history", approval: "Not required", next: c.status === "Credit Hold Recommended" ? "Credit hold recommended" : c.status === "On Hold" ? "Final demand recommended" : "Monitoring" },
    { time: "Nov 14, 15:02", actor: "Alfie", actorType: "Alfie", action: "Statement of account prepared", source: "Open invoices at Nov 14", approval: "Not required", next: "Ready for review" },
    ...c.payments.slice(0, 2).map((p): ArAuditEvent => ({ time: p.date, actor: "System", actorType: "System", action: "Payment received", source: "Bank feed", approval: "Not required", next: `${p.appliedTo} paid · ${fmt(p.amount, c.currency)}` })),
  ];
  if (c.status === "On Hold") events.splice(1, 0, { time: "Oct 6, 11:30", actor: "Marcus Webb", actorType: "User", action: "Credit hold placed", source: "Credit review", approval: "Approved", prev: "Watch", next: "On Hold" });
  return events;
}

function replyFor(q: string, files: Attachment[], c: ArCustomer): { reply: Reply; actions: string[] } {
  const p = q.toLowerCase();
  const overdue = c.invoices.filter((i) => i.status === "Overdue");
  if (files.length) return { reply: { intro: `I reviewed the ${files.length === 1 ? "uploaded file" : `${files.length} uploaded files`} against this customer account. Nothing in it changes the open balance or aging.`, note: "Uploaded files are used in this conversation only and have not been added to the customer record.", sources: files.map((f) => f.name) }, actions: ["Ask Follow-up"] };
  if (p.includes("draft") || p.includes("collection note") || p.includes("reminder")) return { reply: { intro: `Draft collection note to ${c.contact}, for your review before sending:`, draft: collectionDraft(c), note: "Nothing has been sent. Sending requires your approval, and the sent note is logged to the account history.", sources: ["Open invoices", "Correspondence log"] }, actions: ["Approve and Send Reminder", "Ask Follow-up"] };
  if (p.includes("overdue")) return { reply: { intro: overdue.length ? `${overdue.length} invoice${overdue.length === 1 ? " is" : "s are"} past due on this account:` : "No invoices are past due on this account.", fields: overdue.map((i) => [i.id, `${fmt(i.amount, c.currency)} · due ${i.due} · ${i.ageDays} days old`]), verdict: overdue.length ? `${fmt(overdue.reduce((s, i) => s + i.amount, 0), c.currency)} is past due of the ${fmt(c.openBalance, c.currency)} open balance.` : "The account is current.", confidence: "High", sources: ["Open invoices"] }, actions: ["Draft a collection note.", "Ask Follow-up"] };
  if (p.includes("credit") || p.includes("hold")) return { reply: { intro: "Credit assessment for this account:", fields: [["Open balance", fmt(c.openBalance, c.currency)], ["Credit limit", fmt(c.creditLimit, c.currency)], ["Utilization", `${Math.round((c.openBalance / c.creditLimit) * 100)}%`], ["Over 60 days", fmt(c.over60, c.currency)], ["Oldest invoice", `${c.oldestInvoiceDays} days`]], note: c.creditNote, verdict: c.status === "Credit Hold Recommended" ? "Place the account on credit hold." : c.status === "On Hold" ? "Hold already in place. Escalate with a final demand." : "No credit hold recommended at this time.", confidence: "High", sources: ["Credit file", "Aging"] }, actions: c.status === "Credit Hold Recommended" ? ["Place Credit Hold", "Ask Follow-up"] : ["Ask Follow-up"] };
  if (p.includes("behaviour") || p.includes("behavior") || p.includes("paid") || p.includes("payment")) return { reply: { intro: "Recent payment behaviour:", fields: c.payments.map((pay) => [pay.date, `${fmt(pay.amount, c.currency)} · ${pay.appliedTo} · ${pay.note}`]), note: c.id === "CUS-2201" ? "The trend is consistent: each payment lands a few days later than the one before, and the oldest open invoice is now 32 days past due." : "Payment timing is drawn from the bank feed matched to invoices.", confidence: "High", sources: ["Payment history", "Bank feed"] }, actions: ["Ask Follow-up"] };
  if (p.includes("statement")) return { reply: { intro: "The November statement of account is ready in Documents.", fields: [["Open balance", fmt(c.openBalance, c.currency)], ["Invoices listed", `${c.invoices.length}`], ["Prepared", "November 14, 2026"]], note: "Review it in the Documents tab. Sending it to the customer is a separate, approved step.", sources: ["Statement of account"] }, actions: ["Review Documents", "Ask Follow-up"] };
  return { reply: assessment(c), actions: ["Draft a collection note.", "Recommend a credit action.", "Ask Follow-up"] };
}

function CustomerWorkspace() {
  const { customerId } = Route.useParams();
  const cust = getCustomer(customerId) ?? { ...customers[0]!, id: customerId };
  const { docs: seedDocs, sections: docSections } = docsFor(cust);
  const review = reviewFor(cust);
  const main = assessment(cust);
  const [tab, setTab] = useState<Tab>("details");
  const [detail, setDetail] = useState<DetailTab>("Overview");
  const [hold, setHold] = useState(cust.status === "On Hold");
  const [messages, setMessages] = useState<Msg[]>([{ id: "m0", role: "alfie", reply: { intro: "I've loaded this customer account with its open invoices, aging, and payment history. I can summarize the account, explain what is overdue, draft collection outreach, and recommend credit actions." } }]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [pending, setPending] = useState<Attachment[]>([]);
  const [docs, setDocs] = useState(seedDocs);
  const [preview, setPreview] = useState<Doc | null>(null);
  const [confirm, setConfirm] = useState<Msg | null>(null);
  const [audit, setAudit] = useState<ArAuditEvent[]>(() => buildAudit(cust));
  const [notice, setNotice] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [messages, thinking]);

  const displayStatus = hold ? "On Hold" : cust.status;
  const now = () => new Date().toLocaleString("en-US", { month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false });
  const log = (e: Omit<ArAuditEvent, "time">) => setAudit((a) => [{ time: now(), ...e }, ...a]);
  const flash = (t: string) => { setNotice(t); setTimeout(() => setNotice(""), 3500); };
  const say = (reply: Reply, actions?: string[]) => setMessages((m) => [...m, { id: crypto.randomUUID(), role: "alfie", reply, ...(actions ? { actions } : {}) }]);

  const send = (text: string, files: Attachment[] = []) => {
    const q = text || (files.length ? "Analyze these attachments." : "");
    if (!q) return;
    setInput(""); setPending([]);
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", text: q, files }]);
    if (files.length) log({ actor: "Elena Brooks", actorType: "User", action: "Documents uploaded to conversation", source: files.map((f) => f.name).join(", "), approval: "Not required", next: "Conversation only" });
    setThinking(true);
    setTimeout(() => {
      const { reply, actions } = replyFor(q, files, cust);
      say(reply, actions);
      log({ actor: "Alfie", actorType: "Alfie", action: "Alfie analysis performed", source: reply.sources?.join(", ") ?? "Customer account", approval: "Not required" });
      setThinking(false);
    }, 900);
  };

  const placeHold = () => {
    setHold(true);
    log({ actor: "Elena Brooks", actorType: "User", action: "Credit hold placed", source: "Collections workspace", approval: "Approved", prev: cust.status, next: "On Hold" });
    say({ intro: `Credit hold placed on ${cust.name}. New orders will be blocked at order entry until the hold is released. Alfie can draft the customer notification for your review.` });
    flash(`Credit hold placed on ${cust.name}.`);
  };

  const runAction = (a: string) => {
    if (a === "Review collection note" || a === "Draft a collection note." || a === "Draft final demand") { send(a === "Draft final demand" ? "Draft a collection note." : "Draft a collection note."); return; }
    if (a === "Recommend a credit action.") { send("Recommend a credit action."); return; }
    if (a === "Approve and Send Reminder") {
      log({ actor: "Elena Brooks", actorType: "User", action: "Collection note sent", source: "Alfie draft, approved by VP Finance", approval: "Approved", next: `Sent to ${cust.contact}` });
      say({ intro: `Collection note sent to ${cust.contact} and logged to the account history. Alfie will watch for a reply and flag any payment promise with its date.` });
      flash("Collection note sent and logged.");
      return;
    }
    if (a === "Place Credit Hold" || a === "Place credit hold") { placeHold(); return; }
    if (a === "Review Documents") { setTab("details"); setDetail("Documents"); return; }
    if (a === "Review Open Invoices") { setTab("details"); setDetail("Open Invoices"); return; }
    if (a === "Review account") { setTab("details"); setDetail("Aging and Credit"); return; }
    if (a === "Ask Follow-up") { document.querySelector<HTMLTextAreaElement>("textarea")?.focus(); }
  };

  const attachToRecord = (msg: Msg) => {
    const files = msg.files ?? [];
    setDocs((d) => [...d, ...files.map((f) => ({ id: f.id, name: f.name, label: f.isImage ? "Uploaded image" : fileExt(f.name), date: "Today", summary: "Added from conversation by Elena Brooks." }))]);
    setMessages((m) => m.map((x) => (x.id === msg.id ? { ...x, attached: true } : x)));
    log({ actor: "Elena Brooks", actorType: "User", action: "Documents uploaded", source: "Conversation", approval: "Not required", next: files.map((f) => f.name).join(", ") });
    setConfirm(null); flash(`${files.length} file${files.length > 1 ? "s" : ""} attached to the customer record.`);
  };
  const download = (d: Doc) => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([`${d.label}\n\n${d.summary}`], { type: "text/plain" })); a.download = `${d.name}.txt`; a.click(); };
  const toAttachment = (d: Doc): Attachment => ({ id: d.id, name: d.name, size: 120000, type: "", isImage: false });

  const panel = <aside className="scrollbar-thin hidden w-[360px] shrink-0 flex-col border-l border-border bg-panel xl:flex">
    <div className="border-b border-border p-4"><AlfiePanelHeader context={`Customer ${cust.id} · ${cust.segment}`} /></div>
    <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-4">
      {messages.map((m) => m.role === "user" ? <div key={m.id} className="flex flex-col items-end gap-2">
          {m.files?.length ? <><div className="flex flex-wrap justify-end gap-2">{m.files.map((f) => <AttachmentChip key={f.id} file={f} />)}</div><div className="flex items-center gap-2 text-[12px] text-muted-foreground"><Paperclip className="size-3" />{m.files.length} attachment{m.files.length > 1 ? "s" : ""} ready for analysis · Use in this conversation{m.attached ? <span className="text-positive">· Attached to record</span> : <Button size="sm" variant="ghost" className="h-6 px-2 text-[12px]" onClick={() => setConfirm(m)}><Upload className="size-3" />Attach to Record</Button>}</div></> : null}
          <div className="max-w-[80%] rounded-2xl bg-ink px-4 py-2.5 text-sm text-ink-foreground">{m.text}</div>
        </div> : <div key={m.id} className="flex gap-3"><AlfieMark /><div className="min-w-0 flex-1 text-sm leading-6">
          {m.reply ? <ReplyView reply={m.reply} /> : null}
          {m.actions?.length ? <div className="mt-3 flex flex-wrap gap-2">{m.actions.map((a) => <Button key={a} size="sm" variant="secondary" onClick={() => runAction(a)}>{a}</Button>)}</div> : null}
          {m.id === "m0" ? <div className="mt-4 flex flex-wrap gap-2">{prompts.map((p) => <Button key={p} size="sm" variant="secondary" className="max-w-full font-normal" onClick={() => send(p)}><Sparkle className="size-3 shrink-0 text-primary" /><span className="truncate">{p}</span></Button>)}</div> : null}
        </div></div>)}
        {thinking ? <div className="flex items-center gap-3 text-xs text-muted-foreground"><AlfieMark /><span className="animate-pulse">Reviewing aging and payment history…</span></div> : null}
        <div ref={endRef} />
    </div>
    <div className="border-t border-border p-4"><AlfieComposer value={input} onChange={setInput} onSend={send} pending={pending} placeholder="Ask Alfie about this customer…" /><p className="mt-2 text-[12px] leading-4 text-muted-foreground">Alfie drafts collection outreach and recommends credit actions. Sending, credit holds, and write-offs require authorized human approval.</p></div>
  </aside>;

  return <AppShell rightPanel={panel}><div className="flex h-full flex-col">
    <div className="border-b border-border px-5 py-4 lg:px-8">
      <Link to="/receivables" className="mb-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3" />Receivables</Link>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h1 className="text-xl font-semibold">{cust.name}</h1><p className="mt-1 text-sm text-muted-foreground">{cust.entity} · {cust.segment}</p><div className="mt-2 flex items-center gap-1.5 text-[13px] text-muted-foreground">Status <CustomerStatusBadge status={displayStatus} /></div></div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => { void navigator.clipboard?.writeText(window.location.href); flash("Link copied to clipboard."); }}><Share2 className="size-3.5" />Share</Button>
          <Button variant="ghost" size="sm" onClick={() => { download({ id: "x", name: `${cust.id}-statement`, label: `Statement of account ${cust.id}`, date: "", summary: `${cust.name} · ${cust.entity}\nOpen balance ${fmt(cust.openBalance, cust.currency)}\nOver 60 days ${fmt(cust.over60, cust.currency)}\nCredit limit ${fmt(cust.creditLimit, cust.currency)}` }); log({ actor: "Elena Brooks", actorType: "User", action: "Exported statement", source: "Customer workspace", approval: "Not required" }); }}><Download className="size-3.5" />Export</Button>
          <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="size-8" aria-label="More"><MoreHorizontal className="size-4" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end"><DropdownMenuItem onSelect={() => setTab("history")}>View history</DropdownMenuItem><DropdownMenuItem onSelect={() => send("Draft a collection note.")}>Draft collection note</DropdownMenuItem><DropdownMenuItem onSelect={() => runAction("Place Credit Hold")} disabled={hold} className="flex-col items-start gap-0.5"><span>Place credit hold</span><span className="flex items-center gap-1 text-[12px] text-warning"><ShieldAlert className="size-3" />Human approval required</span></DropdownMenuItem><DropdownMenuItem asChild><Link to="/receivables">Back to customers</Link></DropdownMenuItem></DropdownMenuContent></DropdownMenu>
        </div>
      </div>
      <div className="mt-4 flex gap-1 overflow-x-auto">{(["details", "history"] as const).map((t) => <Button key={t} size="sm" variant={tab === t ? "soft" : "ghost"} className={tab === t ? "text-foreground" : ""} onClick={() => setTab(t)}>{t === "details" ? "Customer details" : `History · ${audit.length}`}</Button>)}</div>
    </div>
    {notice ? <div className="mx-5 mt-3 rounded-lg border border-border bg-secondary px-3 py-2 text-xs lg:mx-8">{notice}</div> : null}

    {tab === "history" ? <div className="flex-1 px-5 py-5 lg:px-8"><p className="mb-3 text-xs text-muted-foreground">Every payment, reminder, hold, and Alfie assessment on this account, with its approval state.</p>
      <div className="overflow-x-auto rounded-xl border border-border bg-card"><table className="w-full min-w-[900px] text-left text-xs"><thead><tr className="border-b border-border text-[12px] uppercase tracking-wider text-muted-foreground">{["Timestamp", "Actor", "Action", "Previous Value", "New Value", "Source", "Approval"].map((h) => <th key={h} className="px-3 py-2.5 font-medium">{h}</th>)}</tr></thead><tbody>{audit.map((e, i) => <tr key={i} className="border-b border-border last:border-0"><td className="whitespace-nowrap px-3 py-2.5 text-muted-foreground">{e.time}</td><td className="px-3 py-2.5"><span className="flex items-center gap-1.5 font-medium">{e.actorType === "Alfie" ? <Bot className="size-3.5 text-primary" /> : null}{e.actor}</span></td><td className="px-3 py-2.5">{e.action}</td><td className="px-3 py-2.5 text-muted-foreground">{e.prev ?? "—"}</td><td className="px-3 py-2.5">{e.next ?? "—"}</td><td className="px-3 py-2.5 text-muted-foreground">{e.source}</td><td className="px-3 py-2.5"><span className={`rounded-full px-2 py-0.5 text-[12px] ${e.approval === "Approved" ? "bg-status-active text-status-active-foreground" : e.approval === "Pending" ? "bg-status-paused text-status-paused-foreground" : "bg-secondary text-muted-foreground"}`}>{e.approval}</span></td></tr>)}</tbody></table></div></div>

    : <div className="flex-1 px-5 py-5 lg:px-8"><div className="mx-auto max-w-4xl">
      <div className="mb-5"><ReviewBar status={review.status} title={review.title} detail={review.detail}>
        {cust.status === "Credit Hold Recommended" && !hold ? <><Button size="sm" variant="secondary" onClick={() => runAction("Review account")}>Review account</Button><Button size="sm" onClick={() => runAction("Place Credit Hold")}>Place credit hold</Button></>
        : cust.status === "On Hold" || hold ? <><Button size="sm" variant="secondary" onClick={() => runAction("Review Open Invoices")}>Review open invoices</Button><Button size="sm" onClick={() => runAction("Draft final demand")}>Draft final demand</Button></>
        : <><Button size="sm" variant="secondary" onClick={() => runAction("Review Open Invoices")}>Review open invoices</Button><Button size="sm" onClick={() => runAction("Review collection note")}>Review collection note</Button></>}
      </ReviewBar></div>
      <div className="scrollbar-none flex gap-1 overflow-x-auto border-b border-border pb-2">{detailTabs.map((d) => <Button key={d} size="sm" variant={detail === d ? "soft" : "ghost"} className={detail === d ? "text-foreground" : ""} onClick={() => setDetail(d)}>{d}</Button>)}</div>
      <div className="mt-5 text-sm">{detail === "Overview" ? <><KV rows={[["Customer", cust.name], ["Selling entity", cust.entity], ["Segment", cust.segment], ["Open balance", fmt(cust.openBalance, cust.currency)], ["Terms", cust.terms], ["Credit limit", fmt(cust.creditLimit, cust.currency)], ["Oldest invoice", cust.oldestInvoiceDays ? `${cust.oldestInvoiceDays} days` : "None open"], ["Last payment", cust.lastPaymentAmount ? `${cust.lastPayment} · ${fmt(cust.lastPaymentAmount, cust.currency)}` : cust.lastPayment], ["Customer contact", cust.contact], ["Account owner", cust.owner]]} />
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">{([["Current", cust.current], ["1 to 30 days", cust.days1to30], ["31 to 60 days", cust.days31to60], ["Over 60 days", cust.over60]] as const).map(([k, v]) => <div key={k} className="rounded-xl border border-border bg-card p-4"><p className="text-[13px] text-muted-foreground">{k}</p><p className={`mt-1 text-xl font-semibold ${k === "Over 60 days" && v > 0 ? "text-destructive" : ""}`}>{fmt(v, cust.currency)}</p></div>)}</div>
        <section className="mt-6">
          <div className="mb-3 flex flex-wrap items-center gap-2"><AlfieChip label="Alfie assessment" /><span className="text-xs text-muted-foreground">Collection assessment for reviewer decision. Outreach is drafted, never sent, without approval.</span></div>
          <div className="rounded-xl border border-border bg-card p-5"><ReplyView reply={main} />
            <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4"><Button size="sm" variant="secondary" onClick={() => runAction("Review collection note")}>Review collection note</Button><Button size="sm" variant="secondary" onClick={() => send("Recommend a credit action.")}>Recommend a credit action</Button></div>
          </div>
        </section></>
        : detail === "Open Invoices" ? <div className="overflow-hidden rounded-xl border border-border bg-card"><table className="w-full min-w-[720px] text-left text-xs"><thead><tr className="border-b border-border bg-secondary/50 text-[12px] uppercase tracking-wider text-muted-foreground">{["Invoice", "Description", "Issued", "Due", "Amount", "Age", "Status"].map((h) => <th key={h} className="px-3 py-2.5 font-medium">{h}</th>)}</tr></thead><tbody>{cust.invoices.map((i) => <tr key={i.id} className="border-b border-border last:border-0"><td className="px-3 py-2.5 font-semibold">{i.id}</td><td className="px-3 py-2.5 text-muted-foreground">{i.description}</td><td className="whitespace-nowrap px-3 py-2.5">{i.issued}</td><td className="whitespace-nowrap px-3 py-2.5">{i.due}</td><td className="px-3 py-2.5 tabular-nums">{fmt(i.amount, cust.currency)}</td><td className="px-3 py-2.5">{i.ageDays} days</td><td className="px-3 py-2.5"><InvoiceStatusBadge status={i.status} /></td></tr>)}{cust.invoices.length === 0 ? <tr><td colSpan={7} className="px-3 py-8 text-center text-muted-foreground">No open invoices.</td></tr> : null}</tbody></table></div>
        : detail === "Aging and Credit" ? <><div className="overflow-hidden rounded-xl border border-border bg-card"><table className="w-full text-left text-xs"><thead><tr className="border-b border-border bg-secondary/50 text-[12px] uppercase tracking-wider text-muted-foreground">{["Aging bucket", "Amount", "Share of balance"].map((h) => <th key={h} className="px-3 py-2.5 font-medium">{h}</th>)}</tr></thead><tbody>{([["Current", cust.current], ["1 to 30 days", cust.days1to30], ["31 to 60 days", cust.days31to60], ["Over 60 days", cust.over60]] as const).map(([k, v]) => <tr key={k} className="border-b border-border last:border-0"><td className="px-3 py-2.5 font-medium">{k}</td><td className="px-3 py-2.5 tabular-nums">{fmt(v, cust.currency)}</td><td className="px-3 py-2.5 text-muted-foreground">{cust.openBalance ? `${Math.round((v / cust.openBalance) * 100)}%` : "0%"}</td></tr>)}</tbody></table></div>
          <div className="mt-5"><KV rows={[["Credit limit", fmt(cust.creditLimit, cust.currency)], ["Open balance", fmt(cust.openBalance, cust.currency)], ["Available credit", fmt(Math.max(0, cust.creditLimit - cust.openBalance), cust.currency)], ["Utilization", `${Math.round((cust.openBalance / cust.creditLimit) * 100)}%`], ["Terms", cust.terms], ["Account status", displayStatus]]} />
          <div className="mt-4 rounded-xl border border-border bg-secondary/40 p-4"><div className="mb-2 flex items-center gap-2"><AlfieChip /><span className="text-xs font-semibold">Credit recommendation</span></div><p className="text-xs leading-5 text-muted-foreground">{cust.creditNote}</p>{cust.status === "Credit Hold Recommended" && !hold ? <Button size="sm" className="mt-3" onClick={() => runAction("Place Credit Hold")}>Place credit hold</Button> : null}</div></div></>
        : detail === "Payment History" ? <div className="overflow-hidden rounded-xl border border-border bg-card"><table className="w-full min-w-[640px] text-left text-xs"><thead><tr className="border-b border-border bg-secondary/50 text-[12px] uppercase tracking-wider text-muted-foreground">{["Date", "Amount", "Method", "Applied to", "Note"].map((h) => <th key={h} className="px-3 py-2.5 font-medium">{h}</th>)}</tr></thead><tbody>{cust.payments.map((p) => <tr key={`${p.date}-${p.appliedTo}`} className="border-b border-border last:border-0"><td className="whitespace-nowrap px-3 py-2.5">{p.date}</td><td className="px-3 py-2.5 tabular-nums">{fmt(p.amount, cust.currency)}</td><td className="px-3 py-2.5">{p.method}</td><td className="px-3 py-2.5 font-medium">{p.appliedTo}</td><td className="px-3 py-2.5 text-muted-foreground">{p.note}</td></tr>)}{cust.payments.length === 0 ? <tr><td colSpan={5} className="px-3 py-8 text-center text-muted-foreground">No payments recorded yet.</td></tr> : null}</tbody></table></div>
        : <div className="grid gap-2 sm:grid-cols-2">{docs.map((d) => <button key={d.id} onClick={() => setPreview(d)} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-left hover:bg-secondary"><FileGlyph name={d.name} className="size-5 text-muted-foreground" /><div className="min-w-0"><p className="text-xs font-medium">{d.label}</p><p className="truncate text-[12px] text-muted-foreground">{fileExt(d.name)} · {d.name} · {d.date}</p></div></button>)}</div>}</div>
    </div></div>}

    <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}><DialogContent className="max-w-2xl">{preview ? <><DialogHeader><DialogTitle>{preview.label}</DialogTitle><DialogDescription>{fileExt(preview.name)} · {preview.name} · {preview.date}</DialogDescription></DialogHeader>
      <DocumentSheet summary={preview.summary} sections={docSections[preview.id] ?? []} />
      <DialogFooter className="flex-wrap gap-2 sm:justify-start"><Button size="sm" variant="secondary" onClick={() => download(preview)}><Download className="size-3.5" />Download</Button><Button size="sm" variant="secondary" onClick={() => { setPreview(null); send("Summarize this account."); }}><Sparkle className="size-3.5" />Analyze with Alfie</Button><Button size="sm" variant="secondary" onClick={() => { const d = preview; setPending((p) => (p.some((x) => x.id === d.id) ? p : [...p, toAttachment(d)])); setPreview(null); }}><Paperclip className="size-3.5" />Attach to Conversation</Button></DialogFooter></> : null}</DialogContent></Dialog>

    <Dialog open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)}><DialogContent><DialogHeader><DialogTitle>Attach to customer record?</DialogTitle><DialogDescription>These files will be added to the permanent record for {cust.id} and logged in the account history.</DialogDescription></DialogHeader>
      <div className="flex flex-wrap gap-2">{confirm?.files?.map((f) => <AttachmentChip key={f.id} file={f} />)}</div>
      <DialogFooter><Button variant="secondary" onClick={() => setConfirm(null)}>Use in this Conversation only</Button><Button onClick={() => confirm && attachToRecord(confirm)}>Attach to Record</Button></DialogFooter></DialogContent></Dialog>
  </div></AppShell>;
}

function KV({ rows }: { rows: (readonly [string, string])[] }) {
  return <dl className="divide-y divide-border rounded-xl border border-border bg-card">{rows.map(([k, v]) => <div key={k} className="grid grid-cols-[180px_1fr] gap-3 px-3 py-2 text-xs"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>)}</dl>;
}

function ReplyView({ reply }: { reply: Reply }) {
  return <div className="space-y-3 font-display text-[15px] leading-7">
    <p>{reply.intro}</p>
    {reply.items ? <ol className="list-decimal space-y-1.5 pl-5">{reply.items.map((i) => <li key={i}>{i}</li>)}</ol> : null}
    {reply.fields ? <dl className="divide-y divide-border rounded-xl border border-border">{reply.fields.map(([k, v]) => <div key={k} className="grid grid-cols-[150px_1fr] gap-3 px-3 py-2 text-xs"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>)}</dl> : null}
    {reply.draft ? <div className="whitespace-pre-line rounded-xl border border-border bg-card p-4 text-sm leading-6">{reply.draft}</div> : null}
    {reply.note ? <p className="text-xs text-muted-foreground">{reply.note}</p> : null}
    {reply.verdict || reply.next || reply.confidence ? <div className="space-y-1 text-xs">{reply.verdict ? <p><span className="text-muted-foreground">Assessment: </span><span className="font-semibold">{reply.verdict}</span></p> : null}{reply.next ? <p><span className="text-muted-foreground">Recommended next step: </span><span className="font-semibold">{reply.next}</span></p> : null}{reply.confidence ? <p><span className="text-muted-foreground">Confidence: </span><span className="font-semibold">{reply.confidence}</span></p> : null}</div> : null}
    {reply.sources ? <div className="flex flex-wrap items-center gap-1.5"><span className="text-[12px] uppercase tracking-wider text-muted-foreground">Sources</span>{reply.sources.map((s) => <span key={s} className="rounded-full border border-border bg-background px-2 py-0.5 text-[13px]">{s}</span>)}</div> : null}
  </div>;
}
