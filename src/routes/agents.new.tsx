import { createFileRoute } from "@tanstack/react-router";
import { AgentBuilder } from "@/components/agent-builder";

export const Route = createFileRoute("/agents/new")({
  head: () => ({ meta: [{ title: "Create Agent | Alfie Enterprise Finance" }, { name: "description", content: "Configure a specialized finance AI agent." }, { property: "og:title", content: "Create Agent | Alfie Enterprise Finance" }, { property: "og:description", content: "Configure a specialized finance AI agent." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <AgentBuilder />,
});