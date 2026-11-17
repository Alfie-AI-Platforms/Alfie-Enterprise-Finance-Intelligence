import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/receivables")({ component: () => <Outlet /> });
