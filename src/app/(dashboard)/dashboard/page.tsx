"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  FileText,
  Target,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  GripVertical,
} from "lucide-react";
import Link from "next/link";
import { useDealStore, useActivityStore } from "@/lib/store";
import { formatCurrency, formatCompactCurrency } from "@/lib/utils";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import type { DealStage, ActivityType } from "@/types";

const spring = { type: "spring" as const, stiffness: 300, damping: 24 };

const stageConfig: Record<
  DealStage,
  { label: string; color: string }
> = {
  lead: { label: "Lead", color: "text-muted-foreground" },
  qualified: { label: "Qualified", color: "text-info" },
  proposal: { label: "Proposal", color: "text-warning" },
  negotiation: { label: "Negotiation", color: "text-accent-primary" },
  won: { label: "Won", color: "text-success" },
  lost: { label: "Lost", color: "text-destructive" },
};

const kanbanStages: DealStage[] = ["lead", "qualified", "proposal", "negotiation"];

const activityIcons: Record<ActivityType, { icon: typeof Clock; variant: "success" | "warning" | "destructive" | "info" | "default" }> = {
  deal_created: { icon: Target, variant: "info" },
  deal_moved: { icon: ArrowUpRight, variant: "default" },
  deal_won: { icon: DollarSign, variant: "success" },
  deal_lost: { icon: ArrowDownRight, variant: "destructive" },
  proposal_sent: { icon: FileText, variant: "warning" },
  proposal_viewed: { icon: FileText, variant: "info" },
  proposal_accepted: { icon: FileText, variant: "success" },
  note_added: { icon: FileText, variant: "default" },
  follow_up_scheduled: { icon: Clock, variant: "default" },
};

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays > 30) return `${Math.floor(diffDays / 30)}mo ago`;
  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  return "just now";
}

export default function DashboardPage() {
  const deals = useDealStore((s) => s.deals);
  const activities = useActivityStore((s) => s.activities);

  const totalPipeline = deals
    .filter((d) => d.stage !== "won" && d.stage !== "lost")
    .reduce((sum, d) => sum + d.value, 0);
  const totalWon = deals
    .filter((d) => d.stage === "won")
    .reduce((sum, d) => sum + d.value, 0);
  const activeDeals = deals.filter(
    (d) => d.stage !== "won" && d.stage !== "lost"
  ).length;
  const proposalsSent = deals.filter(
    (d) => d.proposalId !== null
  ).length;

  const stats = [
    {
      label: "Pipeline Value",
      value: formatCompactCurrency(totalPipeline),
      change: "+12.3% from last month",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
    {
      label: "Revenue Closed",
      value: formatCompactCurrency(totalWon),
      change: "+8.1% from last month",
      changeType: "positive" as const,
      icon: DollarSign,
    },
    {
      label: "Active Deals",
      value: String(activeDeals),
      change: "+2 new this week",
      changeType: "positive" as const,
      icon: Target,
    },
    {
      label: "Proposals Sent",
      value: String(proposalsSent),
      change: "3 pending review",
      changeType: "neutral" as const,
      icon: FileText,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
      >
        <h1 className="text-2xl font-bold tracking-tight">
          Good morning, Alex
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          You have {activeDeals} active deals worth{" "}
          <span className="font-mono font-medium text-foreground">
            {formatCurrency(totalPipeline)}
          </span>{" "}
          in your pipeline.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} index={i} />
        ))}
      </div>

      {/* Kanban + Activity */}
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        {/* Kanban Pipeline */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Deal Pipeline</h2>
            <span className="text-sm text-muted-foreground">
              {deals.filter((d) => d.stage !== "won" && d.stage !== "lost").length}{" "}
              active deals
            </span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {kanbanStages.map((stage) => {
              const stageDeals = deals.filter((d) => d.stage === stage);
              const stageTotal = stageDeals.reduce(
                (sum, d) => sum + d.value,
                0
              );
              return (
                <div key={stage} className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl bg-accent/50 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${stageConfig[stage].color}`}
                      >
                        {stageConfig[stage].label}
                      </span>
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-background text-xs font-medium">
                        {stageDeals.length}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {formatCompactCurrency(stageTotal)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {stageDeals.map((deal, i) => (
                      <motion.div
                        key={deal.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, ...spring }}
                      >
                        <Link
                          href={`/deals/${deal.id}`}
                          className="group block rounded-xl border border-border bg-card p-3.5 transition-all hover:border-accent-primary/30 hover:shadow-sm"
                        >
                          <div className="mb-2 flex items-start justify-between">
                            <GripVertical className="mt-0.5 h-3.5 w-3.5 text-muted-foreground/30 opacity-0 transition-opacity group-hover:opacity-100" />
                            <Badge
                              variant={
                                deal.priority === "high"
                                  ? "destructive"
                                  : deal.priority === "medium"
                                    ? "warning"
                                    : "default"
                              }
                            >
                              {deal.priority}
                            </Badge>
                          </div>
                          <h3 className="text-sm font-medium leading-snug">
                            {deal.title}
                          </h3>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {deal.clientCompany}
                          </p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="font-mono text-sm font-semibold text-accent-primary">
                              {formatCurrency(deal.value)}
                            </span>
                            <span className="font-mono text-xs text-muted-foreground">
                              {deal.probability}%
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                    {stageDeals.length === 0 && (
                      <div className="rounded-xl border border-dashed border-border/50 p-4 text-center">
                        <p className="text-xs text-muted-foreground">
                          No deals
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity Feed */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
          <div className="space-y-1">
            {activities.slice(0, 8).map((activity, i) => {
              const config = activityIcons[activity.type];
              const IconComp = config.icon;
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, ...spring }}
                  className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-accent/50"
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent">
                    <IconComp className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-snug text-foreground/80">
                      {activity.description}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {timeAgo(activity.timestamp)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
