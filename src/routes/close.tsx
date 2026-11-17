import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Info, ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AlfieChip, PageHeader } from "@/components/alfie-ui";
import { Button } from "@/components/ui/button";
import {
  closeGroups,
  closePeriod,
  closeRoles,
  closeTasks,
  entityCloseStatus,
  octoberClose,
  postCloseAdjustment,
  type CloseTask,
  type CloseTaskStatus,
} from "@/lib/close-data";

export const Route = createFileRoute("/close")({
  head: () => ({
    meta: [
      { title: "Close | Alfie Enterprise Finance" },
      {
        name: "description",
        content:
          "Run the monthly close as a controlled process: checklist by group, entity status, approvals and the open post-close adjustment.",
      },
      { property: "og:title", content: "Close | Alfie Enterprise Finance" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ClosePage,
});

const card = "rounded-2xl border border-border bg-card";

const good = new Set(["Complete", "Approved", "Reconciled"]);
const warn = new Set(["Blocked"]);
const info = new Set(["In Progress", "Pending", "Awaiting approval"]);

function Badge({ status }: { status: string }) {
  const tone = good.has(status)
    ? "bg-status-active text-status-active-foreground"
    : warn.has(status)
      ? "bg-destructive/10 text-destructive"
      : info.has(status)
        ? "bg-status-paused text-status-paused-foreground"
        : "bg-secondary text-muted-foreground";
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-[13px] font-medium ${tone}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function SampleDataNote() {
  return (
    <p className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
      <Info className="size-3 shrink-0" />
      Illustrative sample data, not verified financial records until connected to your systems.
    </p>
  );
}

function ClosePage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<CloseTask[]>(closeTasks);
  const [group, setGroup] = useState<string>("All groups");
  const open = (q: string) => navigate({ to: "/planning/analysis", search: { q } });

  const complete = tasks.filter((t) => t.status === "Complete").length;
  const blocked = tasks.filter((t) => t.status === "Blocked").length;
  const pendingApprovals = tasks.filter((t) => t.approval === "Pending").length;
  const visible = useMemo(
    () => (group === "All groups" ? tasks : tasks.filter((t) => t.group === group)),
    [tasks, group],
  );

  const advance = (task: CloseTask) =>
    setTasks((current) =>
      current.map((t) =>
        t.id === task.id
          ? {
              ...t,
              status: (t.status === "Not Started" ? "In Progress" : "Complete") as CloseTaskStatus,
              approval: t.status === "In Progress" ? "Pending" : t.approval,
            }
          : t,
      ),
    );

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-8 lg:px-10">
        <PageHeader
          eyebrow="Work"
          title="Close"
          description="Month end close for Meridian Group, managed as a controlled process with owners, due dates, approvals and reconciliation status across all three entities."
        />
        <div className="mt-4">
          <SampleDataNote />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-5">
          {[
            ["Current period", closePeriod.period],
            ["Close status", "In progress"],
            ["Tasks complete", `${complete} of ${tasks.length}`],
            ["Blocked tasks", `${blocked}`],
            ["Pending approvals", `${pendingApprovals}`],
          ].map(([label, value]) => (
            <div key={label} className="bg-card p-4">
              <p className="text-[13px] font-medium text-muted-foreground">{label}</p>
              <p className="mt-1.5 text-xl font-semibold">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-2 rounded-full bg-primary transition-all"
            style={{ width: `${Math.round((complete / tasks.length) * 100)}%` }}
          />
        </div>
        <p className="mt-2 text-[13px] text-muted-foreground">
          {closePeriod.target}. {closePeriod.note}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              open("Summarize our November close progress and identify the incomplete and blocked tasks.")
            }
          >
            Summarize close progress with Alfie
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => open("Which reconciliations are still open before we can close November?")}
          >
            Find open reconciliations
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => open("Prepare variance explanations for the November close.")}
          >
            Prepare variance explanations
          </Button>
        </div>

        <section className={`${card} mt-4 p-4`}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold">
                  Open post-close adjustment, {octoberClose.period}
                </h3>
                <Badge status={postCloseAdjustment.status} />
              </div>
              <p className="mt-1.5 max-w-3xl text-[13px] leading-5 text-muted-foreground">
                {postCloseAdjustment.detail}
              </p>
              <p className="mt-1.5 text-[13px] leading-5 text-muted-foreground">
                {postCloseAdjustment.approvals} {postCloseAdjustment.preparedBy}.
              </p>
            </div>
            <div className="text-right">
              <p className="text-[13px] font-medium text-muted-foreground">Amount</p>
              <p className="mt-0.5 text-xl font-semibold">{postCloseAdjustment.amount}</p>
              <Button asChild size="sm" className="mt-2">
                <Link to="/accounting/$entryId" params={{ entryId: postCloseAdjustment.entryId }}>
                  Open {postCloseAdjustment.entryId}
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {entityCloseStatus.map((e) => (
            <section key={e.entity} className={`${card} p-4`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold">{e.entity}</h3>
                  <p className="text-[13px] text-muted-foreground">
                    {e.detail} · Owner {e.owner}
                  </p>
                </div>
                <Badge status={e.status} />
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${Math.round((e.complete / e.total) * 100)}%` }}
                />
              </div>
              <p className="mt-2 text-[13px] text-muted-foreground">
                {e.complete} of {e.total} entity tasks complete
              </p>
              <p className="mt-2 text-[13px] leading-5 text-muted-foreground">{e.note}</p>
            </section>
          ))}
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-xl border border-border bg-panel p-3 text-xs leading-5">
          <ShieldAlert className="mt-0.5 size-4 shrink-0 text-primary" />
          <p>
            Closing a period is a controlled, authorized action. It stays unavailable until every
            task is complete and the VP Finance sign-off is recorded. {octoberClose.period}{" "}
            {octoberClose.closedIn.toLowerCase()} against the {octoberClose.target.toLowerCase()},
            on {octoberClose.closedOn}. {octoberClose.note}
          </p>
        </div>

        <section className={`${card} mt-4 overflow-hidden`}>
          <div className="flex flex-wrap items-center gap-2 p-4 pb-3">
            <h3 className="text-sm font-semibold">Close checklist, {closePeriod.period}</h3>
            <span className="ml-auto flex flex-wrap gap-1">
              {["All groups", ...closeGroups].map((g) => (
                <button
                  key={g}
                  onClick={() => setGroup(g)}
                  className={`rounded-full px-2.5 py-1 text-[13px] font-medium ${group === g ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                >
                  {g}
                </button>
              ))}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead>
                <tr className="border-t border-border text-left text-[13px] text-muted-foreground">
                  {["#", "Task", "Group", "Owner", "Due", "Status", "Approval", "Action"].map(
                    (h) => (
                      <th key={h} className="px-4 py-2 font-medium">
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {visible.map((t) => (
                  <tr key={t.id} className="border-t border-border hover:bg-secondary/50">
                    <td className="px-4 py-2.5 text-muted-foreground">{t.id.slice(2)}</td>
                    <td className="px-4 py-2.5">
                      <span className="font-medium">{t.task}</span>
                      {t.note ? (
                        <span className="block text-[13px] text-muted-foreground">{t.note}</span>
                      ) : null}
                    </td>
                    <td className="px-4 py-2.5">{t.group}</td>
                    <td className="px-4 py-2.5">{t.owner}</td>
                    <td className="px-4 py-2.5">{t.due}</td>
                    <td className="px-4 py-2.5">
                      <Badge status={t.status} />
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">{t.approval}</td>
                    <td className="px-4 py-2.5">
                      {t.status === "Not Started" || t.status === "In Progress" ? (
                        <Button variant="outline" size="sm" onClick={() => advance(t)}>
                          {t.status === "Not Started" ? "Start" : "Mark complete"}
                        </Button>
                      ) : t.status === "Blocked" ? (
                        <Link
                          to="/reconciliations"
                          className="text-[13px] font-medium text-primary hover:underline"
                        >
                          View in Reconciliations
                        </Link>
                      ) : (
                        <span className="text-[13px] text-muted-foreground">Done</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center gap-3 border-t border-border p-4">
            <Button disabled={complete < tasks.length}>Close Reporting Period</Button>
            <p className="text-[13px] text-muted-foreground">
              {complete < tasks.length
                ? `Available after all ${tasks.length} tasks are complete and sign-off is recorded. ${tasks.length - complete} tasks remain.`
                : "All tasks complete. Closing still requires VP Finance authorization."}
            </p>
          </div>
        </section>

        <section className={`${card} mt-4 p-4`}>
          <div className="flex items-center gap-2">
            <AlfieChip />
            <h3 className="text-sm font-semibold">How Alfie is helping this close</h3>
          </div>
          <p className="mt-2 max-w-3xl text-[13px] leading-5 text-muted-foreground">
            Alfie prepares the recurring entries, drafts the accruals and keeps the reconciliation
            exceptions in one queue, so the team's time goes to review and judgment. Nothing Alfie
            prepares posts without the approvals shown on this page, and every action is written to
            the audit history.
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {closeRoles.map((r) => (
              <div key={r.role} className="rounded-xl border border-border p-3.5">
                <h4 className="text-xs font-semibold">{r.role}</h4>
                <p className="mt-1.5 text-[13px] leading-5 text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[13px] leading-5 text-muted-foreground">
            Audit trail: every material close action records the user or agent responsible, the
            action, date and time, the record affected, original and proposed values, data source,
            approval status and final result. Alfie never bypasses configured approval thresholds.
          </p>
        </section>
      </div>
    </AppShell>
  );
}
