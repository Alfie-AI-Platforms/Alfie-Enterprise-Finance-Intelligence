import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { PlanningHeader, SampleDataNote, card, selectCls } from "@/components/planning-nav";
import {
  DIRECTOR_FORECAST_AUTHORITY,
  boardRecord,
  canApproveForecast,
  canPublish,
  forecastAccuracy,
  forecastReviews,
  planningApprovalImpact,
  planningDataSources,
  planningExceptions,
  planningReviewDefaults,
  planningRoles,
  reviewStages,
  type ForecastReview,
  type PlanningRole,
} from "@/lib/planning-data";
import { activeWorkspace } from "@/lib/workspace";

export const Route = createFileRoute("/planning/reviews")({
  head: () => ({ meta: [{ title: "Forecast Reviews | Alfie Enterprise Finance" }] }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const [role, setRole] = useState<PlanningRole>("VP Finance");
  const [reviews, setReviews] = useState<ForecastReview[]>(forecastReviews);
  const [selectedId, setSelectedId] = useState(
    () => forecastReviews.find((r) => r.status === "Pending Approval")?.id ?? forecastReviews[0]!.id,
  );
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [comment, setComment] = useState("");
  const [actionNote, setActionNote] = useState<string | null>(null);

  const selected = reviews.find((r) => r.id === selectedId) ?? reviews[0]!;
  const filtered = reviews.filter(
    (r) => statusFilter === "All statuses" || r.status === statusFilter,
  );

  const approvable = selected.stage === 5;
  const canApprove = approvable && canApproveForecast(role, selected.proposedChangePct);
  const publishable = canPublish(role, selected.status);

  function approve() {
    setReviews((prev) =>
      prev.map((r) => (r.id === selected.id ? { ...r, stage: 6, status: "Approved" as const } : r)),
    );
    setActionNote(
      `${selected.id} approved by ${role} and moved to CFO Sign-off. Approval is not publication: the forecast changes in ${planningDataSources[0]!.name} only after CFO sign-off is recorded and the review is published.`,
    );
  }
  function publish() {
    setReviews((prev) =>
      prev.map((r) => (r.id === selected.id ? { ...r, stage: 7, status: "Published" as const } : r)),
    );
    setActionNote(
      `${selected.id} published. In production this state requires the CFO sign-off record; the review now moves to forecast accuracy monitoring against its published numbers.`,
    );
  }
  function addComment() {
    if (!comment.trim()) return;
    setReviews((prev) =>
      prev.map((r) =>
        r.id === selected.id
          ? {
              ...r,
              comments: [
                ...r.comments,
                { who: `${activeWorkspace.userName}, ${role}`, when: "Nov 16", text: comment.trim() },
              ],
            }
          : r,
      ),
    );
    setComment("");
  }
  function escalate(excId: string, segment: string, metric: string) {
    const id = `FR-2026-0${20 + reviews.length}`;
    const review: ForecastReview = {
      id,
      title: `${segment} forecast review, from exception ${excId}`,
      scope: planningReviewDefaults.groupScope,
      current: "See Planning Analysis",
      proposedChangePct: 0,
      changeSummary: "To be assessed",
      impactSummary: `Initiated from planning exception ${excId} (${metric}). The originating exception, its metric, threshold and period are linked as evidence.`,
      stage: 0,
      status: "Draft",
      owner: planningReviewDefaults.owner,
      comments: [
        {
          who: "Alfie",
          when: "Nov 16",
          text: `Initiated from planning exception ${excId}. The originating exception, its metric, threshold and period are linked as evidence.`,
        },
      ],
    };
    setReviews((prev) => [review, ...prev]);
    setSelectedId(id);
    setActionNote(
      `Forecast review ${id} initiated from ${excId}. It starts at Draft Prepared and cannot skip stages: data validation, variance analysis and the forecast update come before any proposal.`,
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-8 lg:px-10">
        <PlanningHeader
          title="Forecast Reviews"
          subtitle="The formal, traceable process for changing the forecast and the budget. Every review keeps its evidence, proposal, approvals and publication record in one place."
          actions={
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              Acting role
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as PlanningRole)}
                className={selectCls}
              >
                {planningRoles.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </label>
          }
        />
        <div className="mt-4">
          <SampleDataNote />
        </div>
        {actionNote ? (
          <p className="mt-3 flex items-start gap-1.5 rounded-xl bg-positive/10 p-3 text-xs font-medium leading-5 text-positive">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" /> {actionNote}
          </p>
        ) : null}

        <section className={`${card} mt-4 overflow-hidden`}>
          <div className="flex flex-wrap items-center gap-2 p-4 pb-2">
            <h2 className="text-sm font-semibold">Review register</h2>
            <span className="ml-auto flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={selectCls}
              >
                <option>All statuses</option>
                {["Draft", "In Review", "Pending Approval", "Approved", "Published", "Rejected"].map(
                  (s) => (
                    <option key={s}>{s}</option>
                  ),
                )}
              </select>
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="px-4 py-2 font-medium">Review</th>
                  <th className="px-4 py-2 font-medium">Scope</th>
                  <th className="px-4 py-2 font-medium">Proposed change</th>
                  <th className="px-4 py-2 font-medium">Stage</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                  <th className="px-4 py-2 font-medium">Owner</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setSelectedId(r.id)}
                    className={`cursor-pointer border-b border-border/60 last:border-0 ${selected.id === r.id ? "bg-primary/5" : "hover:bg-secondary/40"}`}
                  >
                    <td className="px-4 py-2.5">
                      <span className="block font-medium">{r.title}</span>
                      <span className="text-muted-foreground">{r.id}</span>
                    </td>
                    <td className="px-4 py-2.5">{r.scope}</td>
                    <td className="px-4 py-2.5">
                      {r.proposedChangePct >= 0 ? "+" : ""}
                      {r.proposedChangePct}%
                    </td>
                    <td className="px-4 py-2.5">{reviewStages[r.stage]}</td>
                    <td className="px-4 py-2.5">{r.status}</td>
                    <td className="px-4 py-2.5">{r.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {reviewStages.map((stage, i) => (
            <span key={stage} className="flex items-center gap-1.5">
              <span
                className={`rounded-full px-2.5 py-1 text-[12px] font-medium ${i === selected.stage ? "bg-primary text-primary-foreground" : i < selected.stage ? "bg-positive/15 text-positive" : "bg-secondary text-muted-foreground"}`}
              >
                {stage}
              </span>
              {i < reviewStages.length - 1 ? <span className="text-muted-foreground">→</span> : null}
            </span>
          ))}
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          <section className={`${card} p-5`}>
            <h2 className="text-sm font-semibold">{selected.title}</h2>
            <div className="mt-2.5 grid grid-cols-2 gap-2 text-xs">
              {[
                ["Review", selected.id],
                ["Current position", selected.current],
                [
                  "Proposed change",
                  `${selected.proposedChangePct >= 0 ? "+" : ""}${selected.proposedChangePct}%`,
                ],
                ["Change summary", selected.changeSummary],
                ["Scope", selected.scope],
                ["Owner", selected.owner],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-secondary/50 px-2.5 py-1.5">
                  <span className="block text-[12px] uppercase tracking-wide text-muted-foreground">
                    {k}
                  </span>
                  {v}
                </div>
              ))}
            </div>
            <h3 className="mt-4 text-xs font-semibold">Impact assessment</h3>
            <p className="mt-1.5 text-[13px] leading-5 text-muted-foreground">
              {selected.impactSummary}
            </p>
            {selected.id === planningApprovalImpact.reviewId ? (
              <table className="mt-2 w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="py-1.5 pr-2 font-medium">Metric</th>
                    <th className="py-1.5 pr-2 font-medium">Before</th>
                    <th className="py-1.5 font-medium">Proposed</th>
                  </tr>
                </thead>
                <tbody>
                  {planningApprovalImpact.rows.map(([metric, before, proposed], i) => (
                    <tr
                      key={metric}
                      className={
                        i < planningApprovalImpact.rows.length - 1
                          ? "border-b border-border/60"
                          : undefined
                      }
                    >
                      <td className="py-1.5 pr-2">{metric}</td>
                      <td className="py-1.5 pr-2">{before}</td>
                      <td className="py-1.5">{proposed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
            <p className="mt-2 text-[13px] leading-4 text-muted-foreground">
              Projections use the scenario engine and its stated assumptions. They are the
              proposal's expectations, and forecast accuracy monitoring compares actuals against
              them after publication.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
              <Button size="sm" disabled={!canApprove} onClick={approve}>
                Approve review
              </Button>
              <Button size="sm" variant="outline" disabled={!publishable} onClick={publish}>
                Publish forecast
              </Button>
            </div>
            <ul className="mt-2.5 space-y-1.5 text-[13px] leading-4 text-muted-foreground">
              <li className="flex gap-1.5">
                <Lock className="mt-0.5 size-3 shrink-0" /> Approval is available only at the
                Approval stage.{" "}
                {approvable
                  ? canApproveForecast(role, selected.proposedChangePct)
                    ? `As ${role}, you can approve this ${selected.proposedChangePct}% change.`
                    : `This ${selected.proposedChangePct}% change exceeds the FP&A Director's ${DIRECTOR_FORECAST_AUTHORITY}% authority, so it routes to the VP Finance or CFO.`
                  : `This review is at "${reviewStages[selected.stage]}", so approval is not yet available.`}
              </li>
              <li className="flex gap-1.5">
                <Lock className="mt-0.5 size-3 shrink-0" /> Publishing requires a role with publish
                rights (VP Finance or CFO) and a review that has completed CFO sign-off with status
                Approved.{" "}
                {selected.status === "Published"
                  ? "This review is published and is being monitored for accuracy."
                  : ""}
              </li>
            </ul>
          </section>

          <div className="space-y-4">
            {selected.id === boardRecord.review ? (
              <section className={`${card} p-5`}>
                <h2 className="text-sm font-semibold">Board submission</h2>
                <div className="mt-2.5 grid grid-cols-2 gap-2 text-xs">
                  {[
                    ["Package", boardRecord.package],
                    ["Meeting", boardRecord.meeting],
                    ["Submitted", boardRecord.submitted],
                    ["Status", boardRecord.status],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-lg bg-secondary/50 px-2.5 py-1.5">
                      <span className="block text-[12px] uppercase tracking-wide text-muted-foreground">
                        {k}
                      </span>
                      {v}
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-[13px] leading-4 text-muted-foreground">
                  {boardRecord.note}
                </p>
              </section>
            ) : null}
            {selected.id === forecastAccuracy.review ? (
              <section className={`${card} p-5`}>
                <h2 className="text-sm font-semibold">Forecast accuracy monitoring</h2>
                <p className="mt-1 text-[13px] text-muted-foreground">{forecastAccuracy.published}.</p>
                <table className="mt-2 w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="py-1.5 pr-2 font-medium">Metric</th>
                      <th className="py-1.5 pr-2 font-medium">Projected</th>
                      <th className="py-1.5 pr-2 font-medium">Actual</th>
                      <th className="py-1.5 font-medium">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {forecastAccuracy.rows.map((r) => (
                      <tr key={r.metric} className="border-b border-border/60 last:border-0">
                        <td className="py-1.5 pr-2 font-medium">{r.metric}</td>
                        <td className="py-1.5 pr-2">{r.projected}</td>
                        <td className="py-1.5 pr-2">{r.actual}</td>
                        <td className="py-1.5 text-muted-foreground">{r.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            ) : null}
            <section className={`${card} p-5`}>
              <h2 className="text-sm font-semibold">Comments and history</h2>
              <ul className="mt-2.5 space-y-2.5">
                {selected.comments.length ? (
                  selected.comments.map((c, i) => (
                    <li key={i} className="rounded-xl bg-secondary/50 p-3 text-xs leading-5">
                      <span className="font-semibold">{c.who}</span>{" "}
                      <span className="text-muted-foreground">· {c.when}</span>
                      <span className="block">{c.text}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-muted-foreground">
                    No comments yet. The full history, including revised proposals, approvals and
                    rejections, is preserved on the review.
                  </li>
                )}
              </ul>
              <div className="mt-3 flex gap-2">
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={`Add a comment as ${activeWorkspace.userName}`}
                  className="h-9 min-w-0 flex-1 rounded-lg border border-border bg-background px-2.5 text-xs outline-none focus:border-ring"
                />
                <Button size="sm" variant="outline" onClick={addComment}>
                  Add
                </Button>
              </div>
            </section>
            <section className={`${card} p-5`}>
              <h2 className="text-sm font-semibold">Planning exceptions that may need a review</h2>
              <ul className="mt-2.5 space-y-2.5">
                {planningExceptions.map((e) => (
                  <li key={e.id} className="rounded-xl bg-secondary/50 p-3 text-xs leading-5">
                    <p className="font-semibold">
                      {e.id}: {e.metric}, {e.observed}{" "}
                      <span className="ml-1 rounded-full bg-card px-2 py-0.5 text-[12px] font-medium text-muted-foreground">
                        {e.severity} · {e.status}
                      </span>
                    </p>
                    <p className="text-muted-foreground">
                      {e.segment} · {e.period} · Threshold: {e.threshold}. Owner {e.owner}.
                    </p>
                    <p className="text-muted-foreground">{e.detail}</p>
                    <p className="mt-1">
                      <span className="font-medium">Suggested investigation:</span> {e.investigation}
                    </p>
                    {e.status.startsWith("Escalated") ? null : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2"
                        onClick={() => escalate(e.id, e.segment, e.metric)}
                      >
                        Escalate to Forecast Review
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
