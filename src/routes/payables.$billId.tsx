import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AlertTriangle, ArrowLeft, Bot, Check, ChevronDown, Circle, Download, FileText, HelpCircle, Lock, MoreHorizontal, Paperclip, Share2, ShieldAlert, Sparkle, Upload } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AlfieChip, AlfieMark, AlfiePanelHeader, ReviewBar } from "@/components/alfie-ui";
import { DocumentSheet } from "@/components/document-view";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlfieComposer, AttachmentChip, FileGlyph, fileExt, type Attachment } from "@/components/alfie-composer";
import { BillStatusBadge, MatchBadge } from "@/components/payables-badges";
import { approverFor, billAuditFor, billPrompts, billReplyFor, bills, detailForBill, duplicateOutcome, fmt, getBill, treasurerName, type Bill, type BillAuditEvent, type BillStatus } from "@/lib/payables-data";
import { activeWorkspace } from "@/lib/workspace";

export const Route = createFileRoute("/payables/$billId")({
  head: ({ params }) => ({ meta: [{ title: `Bill ${params.billId} | Alfie Enterprise Finance` }, { name: "description", content: `Review bill ${params.billId} with Alfie: invoice, three-way match, approval policy, and audit trail.` }, { property: "og:title", content: `Bill ${params.billId} | Alfie Enterprise Finance` }, { property: "og:description", content: "AI-assisted payables workspace with three-way matching and human approval gates." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: BillWorkspace,
});

type Doc = { id: string; name: string; label: string; size: string; summary: string };
type Reply = { intro: string; items?: string[]; fields?: [string, string][]; next?: string; verdict?: string; confidence?: string; sources?: string[] | undefined; note?: string; draft?: string };
type Msg = { id: string; role: "user" | "alfie"; text?: string; files?: Attachment[]; reply?: Reply; actions?: string[]; attached?: boolean };
type Tab = "file" | "payment" | "activity";
const workflow = ["Bill Received", "Invoice Captured", "Three-Way Match", "Exception Review", "Approval", "Payment Scheduled", "Paid"];
const standardActions = ["Request Corrected Invoice", "Message Vendor", "Place Bill On Hold", "Reassign Approver", "Add AP Note", "Escalate Bill"];

function BillWorkspace() {
  const { billId } = Route.useParams();
  const bill = getBill(billId) ?? { ...bills[0]!, id: billId };
  const detail = detailForBill(bill);
  const [tab, setTab] = useState<Tab>("file");
  const [status, setStatus] = useState<BillStatus>(bill.status);
  const [messages, setMessages] = useState<Msg[]>([{ id: "m0", role: "alfie", reply: { intro: "I've captured this bill and run the duplicate check and three-way match. I can explain any exception, show the approval route, and prepare vendor messages or approval summaries." } }]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [pending, setPending] = useState<Attachment[]>([]);
  const [docs, setDocs] = useState(detail.docs);
  const [preview, setPreview] = useState<Doc | null>(null);
  const [confirm, setConfirm] = useState<Msg | null>(null);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [audit, setAudit] = useState<BillAuditEvent[]>(() => billAuditFor(bill));
  const [notice, setNotice] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [messages, thinking]);

  const now = () => new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false });
  const log = (e: Omit<BillAuditEvent, "time">) => setAudit((a) => [{ time: now(), ...e }, ...a]);
  const flash = (t: string) => { setNotice(t); setTimeout(() => setNotice(""), 3500); };
  const say = (reply: Reply, actions?: string[]) => setMessages((m) => [...m, { id: crypto.randomUUID(), role: "alfie", reply, ...(actions ? { actions } : {}) }]);

  const send = (text: string, files: Attachment[] = []) => {
    const q = text || (files.length ? "Analyze these attachments." : "");
    if (!q) return;
    setInput(""); setPending([]);
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", text: q, files }]);
    if (files.length) log({ actor: activeWorkspace.userName, actorType: "User", action: "Documents uploaded to conversation", source: files.map((f) => f.name).join(", "), result: "Conversation only, not in bill file" });
    setThinking(true);
    setTimeout(() => {
      const { reply, actions } = billReplyFor(q, files.map((f) => f.name), bill, detail);
      say(reply, actions);
      log({ actor: "Alfie", actorType: "Alfie", action: "Alfie analysis performed", source: reply.sources?.join(", ") ?? "Bill file", result: reply.verdict ?? reply.next ?? "Response provided" });
      setThinking(false);
    }, 900);
  };

  const approveBill = (matchedOnly: boolean) => {
    const amount = matchedOnly ? detail.matchedAmount : bill.amount;
    setStatus("Approved");
    log({ actor: activeWorkspace.userName, actorType: "User", action: matchedOnly ? "Bill approved at matched amount" : "Bill approved", source: "AP Approval Policy §3.2", result: `${fmt(amount, bill.currency)} approved${matchedOnly && detail.heldAmount ? `; ${fmt(detail.heldAmount, bill.currency)} held` : ""}` });
    const fields: [string, string][] = [["Approved", fmt(amount, bill.currency)]];
    if (matchedOnly && detail.heldAmount) fields.push(["Held", `${fmt(detail.heldAmount, bill.currency)} pending goods receipt`]);
    fields.push(["Next step", "Joins the next Friday payment run; release stays with the Treasurer"]);
    say({ intro: `Bill approved${matchedOnly ? " at the matched amount" : ""}.`, fields, note: "The approval and amounts are recorded in the bill's audit trail." });
    flash(`Bill approved${matchedOnly ? " at the matched amount" : ""}.`);
  };

  const runAction = (a: string) => {
    if (a === "Approve Bill") { approveBill(false); return; }
    if (a === "Approve Matched Amount") { approveBill(true); return; }
    if (a === "Ask Follow-up") { document.querySelector<HTMLTextAreaElement>("textarea")?.focus(); return; }
    if (a === "Show me the three-way match." || a === "What approvals are required?" || a === "Explain the quantity variance.") { send(a); return; }
    if (a === "Confirm Duplicate") {
      log({ actor: activeWorkspace.userName, actorType: "User", action: "Duplicate confirmed", source: "Original bill comparison", result: "Bill rejected from the payment queue" });
      say({ intro: duplicateOutcome(bill) });
      flash("Duplicate confirmed. This bill will not be paid.");
      return;
    }
    if (a === "Release Hold") {
      setStatus("Needs Review");
      log({ actor: activeWorkspace.userName, actorType: "User", action: "Hold released", source: "Bill workspace", result: "Bill returned to the review queue" });
      flash("Hold released. The bill is back in the review queue.");
      return;
    }
    if (a === "Place Bill On Hold") {
      setStatus("On Hold");
      log({ actor: activeWorkspace.userName, actorType: "User", action: "Bill placed on hold", source: "Bill workspace", result: "Removed from payment runs until released" });
      flash("Bill placed on hold.");
      return;
    }
    log({ actor: activeWorkspace.userName, actorType: "User", action: a, source: "Payables actions", result: a.startsWith("Request") || a.startsWith("Message") ? "Draft prepared for review before sending" : "Logged to the audit trail" });
    say({ intro: `${a}: done. ${a.startsWith("Request") || a.startsWith("Message") ? `A draft to ${bill.vendor} is ready for your review before anything is sent.` : "Logged to the audit trail."}` });
  };

  const attachToFile = (msg: Msg) => {
    const files = msg.files ?? [];
    setDocs((d) => [...d, ...files.map((f) => ({ id: f.id, name: f.name, label: f.isImage ? "Uploaded photo" : fileExt(f.name), size: `${Math.round(f.size / 1000)} KB`, summary: `Added from conversation by ${activeWorkspace.userName}.` }))]);
    setMessages((m) => m.map((x) => (x.id === msg.id ? { ...x, attached: true } : x)));
    log({ actor: activeWorkspace.userName, actorType: "User", action: "Documents added to bill file", source: files.map((f) => f.name).join(", "), result: "Confirmed by user" });
    setConfirm(null); flash(`${files.length} file${files.length > 1 ? "s" : ""} added to bill documents.`);
  };
  const download = (d: Doc) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([`${d.label}\n\n${d.summary}`], { type: "text/plain" }));
    a.download = `${d.name}.txt`; a.click();
  };
  const toAttachment = (d: Doc): Attachment => ({ id: d.id, name: d.name, size: 120000, type: "", isImage: false });

  const panel = <aside className="scrollbar-thin hidden w-[360px] shrink-0 flex-col border-l border-border bg-panel xl:flex">
    <div className="border-b border-border p-4"><AlfiePanelHeader context={`Bill ${bill.id} · ${bill.vendor}`} /></div>
    <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-4">
      {messages.map((m) => m.role === "user" ? <div key={m.id} className="flex flex-col items-end gap-2">
          {m.files?.length ? <><div className="flex flex-wrap justify-end gap-2">{m.files.map((f) => <AttachmentChip key={f.id} file={f} />)}</div><div className="flex items-center gap-2 text-[12px] text-muted-foreground"><Paperclip className="size-3" />{m.files.length} attachment{m.files.length > 1 ? "s" : ""} ready for analysis · Use in this conversation{m.attached ? <span className="text-positive">· Added to bill</span> : <Button size="sm" variant="ghost" className="h-6 px-2 text-[12px]" onClick={() => setConfirm(m)}><Upload className="size-3" />Add to Bill</Button>}</div></> : null}
          <div className="max-w-[80%] rounded-2xl bg-ink px-4 py-2.5 text-sm text-ink-foreground">{m.text}</div>
        </div> : <div key={m.id} className="flex gap-3"><AlfieMark /><div className="min-w-0 flex-1 text-sm leading-6">
          {m.reply ? <ReplyView reply={m.reply} /> : null}
          {m.actions?.length ? <div className="mt-3 flex flex-wrap gap-2">{m.actions.map((a) => <Button key={a} size="sm" variant="secondary" onClick={() => runAction(a)}>{a}</Button>)}</div> : null}
          {m.id === "m0" ? <div className="mt-4 flex flex-wrap gap-2">{billPrompts.map((p) => <Button key={p} size="sm" variant="secondary" className="max-w-full font-normal" onClick={() => send(p)}><Sparkle className="size-3 shrink-0 text-primary" /><span className="truncate">{p}</span></Button>)}</div> : null}
        </div></div>)}
        {thinking ? <div className="flex items-center gap-3 text-xs text-muted-foreground"><AlfieMark /><span className="animate-pulse">Checking the invoice, purchase order and receipt…</span></div> : null}
        <div ref={endRef} />
    </div>
    <div className="border-t border-border p-4"><AlfieComposer value={input} onChange={setInput} onSend={send} pending={pending} placeholder="Ask Alfie about this bill…" /><p className="mt-2 text-[12px] leading-4 text-muted-foreground">Alfie captures, matches and prepares bills. Approvals follow the AP approval policy, and payment release stays with the Treasurer.</p></div>
  </aside>;

  return <AppShell rightPanel={panel}><div className="flex h-full flex-col">
    <div className="border-b border-border px-5 py-4 lg:px-8">
      <Link to="/payables" className="mb-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3" />Payables</Link>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h1 className="text-xl font-semibold">Bill {bill.id}</h1><p className="mt-1 text-sm text-muted-foreground">{bill.vendor} · {bill.entity}</p><div className="mt-2 flex items-center gap-3 text-[13px] text-muted-foreground"><span className="flex items-center gap-1.5">Status <BillStatusBadge status={status} /></span><span className="flex items-center gap-1.5">Match <MatchBadge match={bill.match} /></span></div></div>
        <div className="flex items-center gap-1">
          <DropdownMenu><DropdownMenuTrigger asChild><Button variant="secondary" size="sm">Actions<ChevronDown className="size-3.5" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel className="text-[12px] uppercase tracking-wider text-muted-foreground">Payables actions</DropdownMenuLabel>
              {standardActions.map((a) => <DropdownMenuItem key={a} onSelect={() => runAction(a)}>{a}</DropdownMenuItem>)}
              <DropdownMenuSeparator /><DropdownMenuLabel className="text-[12px] uppercase tracking-wider text-muted-foreground">Governed actions</DropdownMenuLabel>
              <DropdownMenuItem onSelect={() => runAction("Approve Bill")} className="flex-col items-start gap-0.5" disabled={["Paid", "Approved", "Scheduled", "On Hold"].includes(status)}><span>Approve Bill</span><span className="flex items-center gap-1 text-[12px] text-warning"><ShieldAlert className="size-3" />{approverFor(bill.amount)} approval · recorded in audit</span></DropdownMenuItem>
              <DropdownMenuItem disabled className="flex-col items-start gap-0.5"><span>Release Payment</span><span className="flex items-center gap-1 text-[12px]"><Lock className="size-3" />Permission required · Treasurer ({treasurerName})</span></DropdownMenuItem>
            </DropdownMenuContent></DropdownMenu>
          <Button variant="ghost" size="sm" onClick={() => { void navigator.clipboard?.writeText(window.location.href); flash("Link copied to clipboard."); }}><Share2 className="size-3.5" />Share</Button>
          <Button variant="ghost" size="sm" onClick={() => { download({ id: "x", name: `${bill.id}-summary`, label: `Bill ${bill.id}`, size: "", summary: `${bill.vendor} · ${bill.entity}\nInvoice ${bill.invoiceNumber}\nAmount ${fmt(bill.amount, bill.currency)}\nMatch: ${bill.match}` }); log({ actor: activeWorkspace.userName, actorType: "User", action: "Exported bill", source: "Bill workspace", result: "Summary downloaded" }); }}><Download className="size-3.5" />Export</Button>
          <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="size-8" aria-label="More"><MoreHorizontal className="size-4" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end"><DropdownMenuItem onSelect={() => setTab("activity")}>View activity</DropdownMenuItem><DropdownMenuItem onSelect={() => setTab("payment")}>Open payment</DropdownMenuItem><DropdownMenuItem onSelect={() => runAction("Add AP Note")}>Add note</DropdownMenuItem><DropdownMenuItem asChild><Link to="/payables">Back to queue</Link></DropdownMenuItem></DropdownMenuContent></DropdownMenu>
        </div>
      </div>
      <div className="mt-4 flex gap-1">{(["file", "payment", "activity"] as const).map((t) => <Button key={t} size="sm" variant={tab === t ? "soft" : "ghost"} className={tab === t ? "text-foreground" : ""} onClick={() => setTab(t)}>{t === "file" ? "Bill file" : t === "payment" ? "Payment" : `Activity · ${audit.length}`}</Button>)}</div>
    </div>
    {notice ? <div className="mx-5 mt-3 rounded-lg border border-border bg-secondary px-3 py-2 text-xs lg:mx-8">{notice}</div> : null}

    {tab === "activity" ? <div className="flex-1 px-5 py-5 lg:px-8"><p className="mb-3 text-xs text-muted-foreground">Complete audit trail of user, Alfie, and system activity on this bill.</p><div className="overflow-x-auto rounded-xl border border-border bg-card"><table className="w-full min-w-[680px] text-left text-xs"><thead><tr className="border-b border-border text-[12px] uppercase tracking-wider text-muted-foreground">{["Timestamp", "Actor", "Action", "Source", "Result"].map((h) => <th key={h} className="px-3 py-2.5 font-medium">{h}</th>)}</tr></thead><tbody>{audit.map((e, i) => <tr key={i} className="border-b border-border last:border-0"><td className="whitespace-nowrap px-3 py-2.5 text-muted-foreground">{e.time}</td><td className="px-3 py-2.5"><span className="flex items-center gap-1.5 font-medium">{e.actorType === "Alfie" ? <Bot className="size-3.5 text-primary" /> : null}{e.actor}</span></td><td className="px-3 py-2.5">{e.action}</td><td className="px-3 py-2.5 text-muted-foreground">{e.source}</td><td className="px-3 py-2.5">{e.result}</td></tr>)}</tbody></table></div></div>

    : tab === "payment" ? <div className="flex-1 px-5 py-6 lg:px-8"><div className="mx-auto max-w-3xl">
      <div className="grid gap-3 sm:grid-cols-3"><div className="rounded-xl border border-border bg-card p-4"><p className="text-[13px] text-muted-foreground">Bill Total</p><p className="mt-1 text-2xl font-semibold">{fmt(bill.amount, bill.currency)}</p></div><div className="rounded-xl border border-border bg-card p-4"><p className="text-[13px] text-muted-foreground">Matched Amount</p><p className="mt-1 text-2xl font-semibold">{fmt(detail.matchedAmount, bill.currency)}</p>{detail.heldAmount ? <p className="mt-1 text-[13px] text-warning">{fmt(detail.heldAmount, bill.currency)} held</p> : null}</div><div className="rounded-xl border border-border bg-card p-4"><p className="text-[13px] text-muted-foreground">Payment Status</p><p className="mt-1 text-2xl font-semibold">{status === "Approved" || status === "Scheduled" ? "In payment run" : status === "Paid" ? "Paid" : status === "On Hold" ? "On hold" : "Awaiting approval"}</p></div></div>
      <h3 className="mb-2 mt-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Payment detail</h3>
      <div className="divide-y divide-border rounded-xl border border-border bg-card">{([["Method", "EFT to verified vendor banking"], ["Due date", bill.due], ["Payment runs", "Fridays · entity operating account"], ["Approver required", approverFor(bill.amount)], ["Release", `Treasurer (${treasurerName}), after approval`]] as const).map(([k, v]) => <div key={k} className="flex items-center gap-3 px-4 py-3 text-sm"><span className="w-36 font-medium">{k}</span><span className="flex-1 text-xs text-muted-foreground">{v}</span></div>)}</div>
      <div className="mt-4 flex flex-wrap gap-2"><Button onClick={() => runAction(detail.heldAmount ? "Approve Matched Amount" : "Approve Bill")} disabled={["Paid", "Approved", "Scheduled", "On Hold"].includes(status)}><Sparkle className="size-3.5" />{detail.heldAmount ? "Approve Matched Amount" : "Approve Bill"}</Button><Button variant="secondary" onClick={() => send("Draft a message to the vendor.")}>Message Vendor</Button></div>
      <p className="mt-4 text-[13px] leading-5 text-muted-foreground">Approving a bill records who approved it and for how much. Releasing the payment is a separate step held by the Treasurer, so no single person can approve and pay the same bill.</p>
    </div></div>

    : <div className="px-5 py-5 lg:px-8"><div className="mx-auto max-w-3xl">
      <ReviewBar status={detail.review.status} title={detail.review.title} detail={detail.review.detail}>
        {bill.match === "Duplicate held" ? <><Button size="sm" variant="secondary" onClick={() => runAction("Release Hold")}>Release hold</Button><Button size="sm" onClick={() => runAction("Confirm Duplicate")}>Confirm duplicate</Button></>
        : detail.heldAmount && bill.match === "Variance" ? <><Button size="sm" variant="secondary" onClick={() => runAction("Request Corrected Invoice")}>Request corrected invoice</Button><Button size="sm" onClick={() => runAction("Approve Matched Amount")}>Approve matched amount</Button></>
        : <><Button size="sm" variant="secondary" onClick={() => runAction("Message Vendor")}>Message vendor</Button><Button size="sm" onClick={() => runAction("Approve Bill")} disabled={["Paid", "Approved", "Scheduled"].includes(status)}>Approve bill</Button></>}
      </ReviewBar>
      <section className="mt-8">
        <div className="mb-3 flex flex-wrap items-center gap-2"><AlfieChip label="Alfie analysis" /><span className="text-xs text-muted-foreground">Capture, duplicate check and three-way match for reviewer decision. Not an approval or a payment.</span></div>
        <div className="rounded-xl border border-border bg-card p-5"><ReplyView reply={detail.analysis} />
          <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">{["Show me the three-way match.", "What approvals are required?"].map((a) => <Button key={a} size="sm" variant="secondary" onClick={() => send(a)}>{a.replace(/\.$/, "")}</Button>)}</div>
        </div>
      </section>
      <Section title="Bill details">
        <dl className="grid grid-cols-2 gap-x-3 gap-y-3 text-xs md:grid-cols-4">
          {([["Bill", bill.id], ["Vendor", bill.vendor], ["Entity", bill.entity], ["Invoice Number", bill.invoiceNumber], ["Category", bill.category], ["Amount", fmt(bill.amount, bill.currency)], ["Due Date", bill.due], ["Purchase Order", bill.poNumber ?? "None"]] as const).map(([k, v]) => <div key={k}><dt className="text-[12px] text-muted-foreground">{k}</dt><dd className="mt-0.5 font-medium">{v}</dd></div>)}
          <div><dt className="text-[12px] text-muted-foreground">Status</dt><dd className="mt-1"><BillStatusBadge status={status} /></dd></div>
          <div><dt className="text-[12px] text-muted-foreground">Owner</dt><dd className="mt-0.5 font-medium">{bill.owner}</dd></div>
        </dl>
      </Section>
      <Section title="Three-way match">
        <div className="overflow-hidden rounded-xl border border-border bg-card"><table className="w-full text-left text-xs"><thead><tr className="border-b border-border bg-secondary/50 text-[12px] uppercase tracking-wider text-muted-foreground">{["Line", "Invoiced", "Ordered (PO)", "Received (GR)", "Result"].map((h) => <th key={h} className="px-3 py-2.5 font-medium">{h}</th>)}</tr></thead><tbody>{detail.matchRows.map((r) => <tr key={r.label} className="border-b border-border last:border-0"><td className="px-3 py-2.5 font-medium">{r.label}</td><td className="px-3 py-2.5 tabular-nums">{r.invoiced}</td><td className="px-3 py-2.5">{r.ordered}</td><td className="px-3 py-2.5">{r.received}</td><td className="px-3 py-2.5">{r.state === "ok" ? <span className="flex items-center gap-1 text-positive"><Check className="size-3.5" />Matched</span> : <span className="flex items-center gap-1 text-warning"><AlertTriangle className="size-3.5" />Variance</span>}</td></tr>)}</tbody></table></div>
        <p className="mt-2 text-[12px] leading-4 text-muted-foreground">Matched {fmt(detail.matchedAmount, bill.currency)} of {fmt(bill.amount, bill.currency)}{detail.heldAmount ? `; ${fmt(detail.heldAmount, bill.currency)} held` : ""}.</p>
      </Section>
      <Section title={`Documents · ${docs.length}`}>
        <div className="space-y-1.5">{docs.map((d) => <button key={d.id} onClick={() => setPreview(d)} className="flex w-full items-center gap-2.5 rounded-lg border border-border bg-card p-2 text-left hover:bg-secondary"><div className="flex size-8 items-center justify-center rounded-md bg-secondary text-muted-foreground"><FileGlyph name={d.name} /></div><div className="min-w-0"><p className="text-xs font-medium">{d.label}</p><p className="truncate text-[12px] text-muted-foreground">{fileExt(d.name)} · {d.name} · {d.size}</p></div></button>)}</div>
      </Section>
      <Section title="Approval policy">
        <div className="space-y-1">{detail.policyRows.map(([k, st, v]) => <div key={k} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs">{st === "ok" ? <Check className="size-3.5 text-positive" /> : st === "warn" ? <AlertTriangle className="size-3.5 text-warning" /> : <HelpCircle className="size-3.5 text-muted-foreground" />}<span className="flex-1">{k}</span><span className={`text-[13px] ${st === "warn" ? "text-warning" : "text-muted-foreground"}`}>{v}</span></div>)}
          <Button size="sm" variant="ghost" className="mt-1 w-full justify-start" onClick={() => setPolicyOpen(true)}><FileText className="size-3.5" />View AP Approval Policy</Button></div>
      </Section>
      <Section title="Assessment">
        {([["Three-Way Match", bill.match === "Matched" ? "Matched" : bill.match, bill.match === "Matched" ? "text-positive" : "text-warning", "Show me the three-way match."], ["Duplicate Check", bill.match === "Duplicate held" ? "Duplicate held" : "Clear", bill.match === "Duplicate held" ? "text-destructive" : "text-positive", "Is this bill a duplicate?"], ["Approval Required", approverFor(bill.amount), "text-warning", "What approvals are required?"], ["Open Exceptions", `${bill.issues} Item${bill.issues === 1 ? "" : "s"}`, bill.issues ? "text-warning" : "text-positive", "Summarize this bill."], ["Payment Timing", `Due ${bill.due}`, "text-primary", "When should this bill be paid?"]] as const).map(([k, v, tone, q]) => <button key={k} onClick={() => send(q)} className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs hover:bg-secondary"><span>{k}</span><span className={`font-medium ${tone}`}>{v}</span></button>)}
        <p className="mt-2 px-2 text-[12px] leading-4 text-muted-foreground">Assessment opens in the Alfie rail. Alfie prepares the bill for a decision. It does not approve or pay it.</p>
      </Section>
      <Section title="Workflow">
        <ol className="space-y-0.5">{workflow.map((step, i) => <li key={step} className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 text-xs ${i === detail.current ? "bg-primary/10 font-semibold text-primary" : i < detail.current ? "text-foreground" : "text-muted-foreground"}`}>{i < detail.current ? <Check className="size-3.5 text-positive" /> : i === detail.current ? <ChevronDown className="size-3.5 -rotate-90" /> : <Circle className="size-3" />}{step}{i === detail.current ? <span className="ml-auto text-[12px] font-medium">Current</span> : null}</li>)}</ol>
        <p className="mt-2 px-2 text-[12px] leading-4 text-muted-foreground">Alfie completed the capture and matching steps. The decision-ready bill is with the approver.</p>
      </Section>
    </div></div>}
    <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}><DialogContent className="max-w-2xl">{preview ? <><DialogHeader><DialogTitle>{preview.label}</DialogTitle><DialogDescription>{fileExt(preview.name)} · {preview.name} · {preview.size}</DialogDescription></DialogHeader>
      <DocumentSheet summary={preview.summary} sections={detail.docSections[preview.id] ?? []} />
      <DialogFooter className="flex-wrap gap-2 sm:justify-start"><Button size="sm" variant="secondary" onClick={() => download(preview)}><Download className="size-3.5" />Download</Button><Button size="sm" variant="secondary" onClick={() => { const d = preview; setPreview(null); send(`Analyze the ${d.label}.`); }}><Sparkle className="size-3.5" />Analyze with Alfie</Button><Button size="sm" variant="secondary" onClick={() => { const d = preview; setPending((p) => (p.some((x) => x.id === d.id) ? p : [...p, toAttachment(d)])); setPreview(null); }}><Paperclip className="size-3.5" />Attach to conversation</Button></DialogFooter></> : null}</DialogContent></Dialog>

    <Dialog open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)}><DialogContent><DialogHeader><DialogTitle>Add to bill file?</DialogTitle><DialogDescription>These files will be added to the permanent document record for {bill.id} and logged in the audit trail.</DialogDescription></DialogHeader>
      <div className="flex flex-wrap gap-2">{confirm?.files?.map((f) => <AttachmentChip key={f.id} file={f} />)}</div>
      <DialogFooter><Button variant="secondary" onClick={() => setConfirm(null)}>Keep in conversation only</Button><Button onClick={() => confirm && attachToFile(confirm)}>Add to Bill</Button></DialogFooter></DialogContent></Dialog>

    <Dialog open={policyOpen} onOpenChange={setPolicyOpen}><DialogContent className="max-w-xl"><DialogHeader><DialogTitle>AP approval policy</DialogTitle><DialogDescription>AP Approval Policy v3.1 · effective January 1, 2026. Rules Alfie applied to this bill.</DialogDescription></DialogHeader>
      <div className="divide-y divide-border rounded-lg border border-border">{detail.policyRows.map(([k, s, , g]) => <div key={k} className="flex items-start gap-2 px-3 py-2.5 text-xs">{s === "ok" ? <Check className="mt-0.5 size-3.5 text-positive" /> : s === "warn" ? <AlertTriangle className="mt-0.5 size-3.5 text-warning" /> : <HelpCircle className="mt-0.5 size-3.5 text-muted-foreground" />}<div><p className="font-medium">{k}</p><p className="text-muted-foreground">{g}</p></div></div>)}</div>
</DialogContent></Dialog>
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
    {reply.draft ? <div className="whitespace-pre-line rounded-xl border border-border bg-card p-4 text-sm leading-6">{reply.draft}</div> : null}
    {reply.note ? <p className="text-xs text-muted-foreground">{reply.note}</p> : null}
    {reply.verdict || reply.next || reply.confidence ? <div className="space-y-1 text-xs">{reply.verdict ? <p><span className="text-muted-foreground">Assessment: </span><span className="font-semibold">{reply.verdict}</span></p> : null}{reply.next ? <p><span className="text-muted-foreground">Recommended next step: </span><span className="font-semibold">{reply.next}</span></p> : null}{reply.confidence ? <p><span className="text-muted-foreground">Confidence: </span><span className="font-semibold">{reply.confidence}</span></p> : null}</div> : null}
    {reply.sources ? <div className="flex flex-wrap items-center gap-1.5"><span className="text-[12px] uppercase tracking-wider text-muted-foreground">Sources</span>{reply.sources.map((s) => <span key={s} className="rounded-full border border-border bg-background px-2 py-0.5 text-[13px]">{s}</span>)}</div> : null}
  </div>;
}
