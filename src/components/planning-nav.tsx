import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Info } from "lucide-react";

const tabs = [
  ["Overview", "/planning"],
  ["Planning Analysis", "/planning/analysis"],
  ["Scenario Modeling", "/planning/scenarios"],
  ["Forecast Reviews", "/planning/reviews"],
  ["Reports", "/planning/reports"],
] as const;

export function PlanningNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav
      aria-label="Planning and FP&A sections"
      className="scrollbar-none -mx-1 flex gap-1 overflow-x-auto border-b border-border px-1"
    >
      {tabs.map(([label, to]) => {
        const active =
          to === "/planning" ? path === "/planning" || path === "/planning/" : path.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            className={`whitespace-nowrap border-b-2 px-3 pb-2.5 pt-1 text-sm transition-colors ${active ? "border-primary font-medium text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function SampleDataNote({ children }: { children?: ReactNode }) {
  return (
    <p className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
      <Info className="size-3 shrink-0" />
      {children ??
        "Illustrative sample data, not verified financial data until connected to your systems."}
    </p>
  );
}

export function PlanningHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle: string;
  actions?: ReactNode;
}) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          {title !== "Planning & FP&A" ? (
            <p className="text-xs font-medium text-muted-foreground">Planning & FP&A</p>
          ) : null}
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
      <PlanningNav />
    </div>
  );
}

export const card = "rounded-2xl border border-border bg-card";
export const selectCls =
  "select-chevron h-8 rounded-lg border border-border bg-background pl-2.5 text-xs text-foreground outline-none focus:border-ring";
