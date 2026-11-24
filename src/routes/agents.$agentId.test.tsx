import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AlertTriangle, Bot, CheckCircle2, Send } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { agentTestScenario } from "@/lib/agents-data";

export const Route = createFileRoute("/agents/$agentId/test")({
  head: () => ({ meta: [{ title: "Test Agent | Alfie Enterprise Finance" }, { name: "description", content: "Safely test a finance AI agent configuration." }, { property: "og:title", content: "Test Agent | Alfie Enterprise Finance" }, { property: "og:description", content: "Safely test a finance AI agent configuration." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: TestAgent,
});

function TestAgent() {
  const { agentId } = Route.useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState(agentTestScenario.prompt);
  const [ran, setRan] = useState(false);
  const traceItems = agentTestScenario.trace;
  return <AppShell><div className="mx-auto flex min-h-full max-w-5xl flex-col px-5 py-8 lg:px-10">
    <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-medium text-primary">Safe test environment</p><h1 className="mt-1 text-2xl font-semibold">You are testing the {agentTestScenario.agentName}.</h1><p className="mt-2 text-sm text-muted-foreground">Test runs use read-only sample data and cannot modify production records.</p></div><Button variant="secondary" onClick={() => navigate({ to: "/agents/$agentId", params: { agentId } })}>Exit test</Button></div>
    <div className="mt-7 grid flex-1 gap-5 lg:grid-cols-[1fr_260px]"><section className="flex min-h-[620px] flex-col rounded-md border border-border bg-card"><div className="border-b border-border px-5 py-4"><div className="flex items-center gap-2 text-sm font-semibold"><Bot className="size-4 text-primary" />{agentTestScenario.agentName}</div></div><div className="flex-1 space-y-5 p-5">{ran ? <><div className="ml-auto max-w-lg rounded-md bg-primary px-4 py-3 text-sm text-primary-foreground">{agentTestScenario.prompt}</div><div className="max-w-2xl"><div className="mb-2 flex items-center gap-2 text-xs font-semibold"><Bot className="size-4 text-primary" />{agentTestScenario.agentName}</div><div className="space-y-3 text-sm leading-6"><p>{agentTestScenario.intro}</p><ol className="list-decimal space-y-2 pl-5">{agentTestScenario.points.map((point) => <li key={point.lead}><strong>{point.lead}</strong> {point.text}</li>)}</ol><div className="rounded-md border border-warning/40 bg-warning/5 p-3"><div className="flex items-center gap-2 font-semibold"><AlertTriangle className="size-4 text-warning" />Human approval required</div><p className="mt-1 text-xs text-muted-foreground">A controller must approve any correcting entry. No production data was modified.</p></div></div></div></> : <div className="flex h-full flex-col items-center justify-center text-center"><Bot className="size-8 text-primary" /><p className="mt-3 text-sm font-semibold">Ready to test this agent</p><p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">Submit a realistic task to inspect the agent’s reasoning, evidence, tools, and approval boundaries.</p></div>}</div><div className="border-t border-border p-4"><div className="flex gap-2 rounded-md border border-input p-2 focus-within:border-ring"><textarea value={input} onChange={(event) => setInput(event.target.value)} rows={2} className="flex-1 resize-none bg-transparent px-2 text-sm outline-none" /><Button size="icon" onClick={() => setRan(true)} aria-label="Run test"><Send className="size-4" /></Button></div></div></section>
      <aside className="space-y-4"><h2 className="text-sm font-semibold">Test trace</h2>{traceItems.map(({ icon: Icon, title, copy }) => <div key={title} className="rounded-md border border-border bg-card p-4"><Icon className="size-4 text-primary" /><p className="mt-2 text-xs font-semibold">{title}</p><p className="mt-1 text-[13px] leading-5 text-muted-foreground">{copy}</p>{ran ? <CheckCircle2 className="mt-2 size-3.5 text-positive" /> : null}</div>)}</aside></div>
  </div></AppShell>;
}