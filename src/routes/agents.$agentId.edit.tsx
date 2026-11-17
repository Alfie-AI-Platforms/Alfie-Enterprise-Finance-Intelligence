import { createFileRoute } from "@tanstack/react-router";
import { AgentBuilder } from "@/components/agent-builder";

export const Route = createFileRoute("/agents/$agentId/edit")({
  head: () => ({ meta: [{ title: "Edit Agent | Alfie Enterprise Finance" }, { name: "description", content: "Update a finance AI agent configuration." }, { property: "og:title", content: "Edit Agent | Alfie Enterprise Finance" }, { property: "og:description", content: "Update a finance AI agent configuration." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <AgentBuilder editing />,
});