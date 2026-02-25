"use client";

import { use } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Building2,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  ChevronRight,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { useDealStore, useProposalStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { DealStage } from "@/types";

const spring = { type: "spring" as const, stiffness: 300, damping: 24 };

const stageConfig: Record<
  DealStage,
  { label: string; variant: "default" | "info" | "warning" | "success" | "destructive" }
> = {
  lead: { label: "Lead", variant: "default" },
  qualified: { label: "Qualified", variant: "info" },
  proposal: { label: "Proposal", variant: "warning" },
  negotiation: { label: "Negotiation", variant: "info" },
  won: { label: "Won", variant: "success" },
  lost: { label: "Lost", variant: "destructive" },
};

const stageFlow: DealStage[] = [
  "lead",
  "qualified",
  "proposal",
  "negotiation",
  "won",
];

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function DealDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const getDealById = useDealStore((s) => s.getDealById);
  const getProposalByDealId = useProposalStore((s) => s.getProposalByDealId);

  const deal = getDealById(id);
  const proposal = deal?.proposalId
    ? getProposalByDealId(deal.id)
    : undefined;

  if (!deal) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <h2 className="text-xl font-semibold">Deal not found</h2>
        <Link
          href="/dashboard"
          className="mt-4 text-sm text-accent-primary hover:underline"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const config = stageConfig[deal.stage];
  const stageIndex = stageFlow.indexOf(deal.stage);

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Pipeline
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="flex items-start justify-between"
      >
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">
              {deal.title}
            </h1>
            <Badge variant={config.variant}>{config.label}</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {deal.clientCompany}
          </p>
        </div>
        <div className="text-right">
          <span className="font-mono text-3xl font-bold text-accent-primary">
            {formatCurrency(deal.value)}
          </span>
          <p className="mt-1 text-sm text-muted-foreground">
            <span className="font-mono">{deal.probability}%</span> probability
          </p>
        </div>
      </motion.div>

      {/* Stage pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, ...spring }}
        className="rounded-2xl border border-border bg-card p-6"
      >
        <h3 className="mb-4 text-sm font-semibold">Deal Progress</h3>
        <div className="flex items-center gap-2">
          {stageFlow.map((stage, i) => {
            const isActive = i <= stageIndex && deal.stage !== "lost";
            const isCurrent = stage === deal.stage;
            return (
              <div key={stage} className="flex flex-1 items-center">
                <div
                  className={`flex h-8 flex-1 items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                    isCurrent
                      ? "bg-accent-primary text-accent-primary-foreground"
                      : isActive
                        ? "bg-accent-primary/20 text-accent-primary"
                        : "bg-accent text-muted-foreground/50"
                  }`}
                >
                  {stageConfig[stage].label}
                </div>
                {i < stageFlow.length - 1 && (
                  <ChevronRight className="mx-1 h-4 w-4 shrink-0 text-muted-foreground/30" />
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Client info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, ...spring }}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <h3 className="mb-4 text-sm font-semibold">Client Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-primary/15 text-sm font-bold text-accent-primary">
                {deal.clientName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="text-sm font-semibold">{deal.clientName}</p>
                <p className="text-xs text-muted-foreground">
                  {deal.clientCompany}
                </p>
              </div>
            </div>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                {deal.clientEmail}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" />
                {deal.clientCompany}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                Created {formatDate(deal.createdAt)}
              </div>
              {deal.nextFollowUp && (
                <div className="flex items-center gap-2 text-warning">
                  <Clock className="h-3.5 w-3.5" />
                  Follow-up {formatDate(deal.nextFollowUp)}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Proposal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ...spring }}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <h3 className="mb-4 text-sm font-semibold">Proposal</h3>
          {proposal ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{proposal.title}</p>
                  <Badge
                    variant={
                      proposal.status === "accepted"
                        ? "success"
                        : proposal.status === "viewed"
                          ? "warning"
                          : proposal.status === "rejected"
                            ? "destructive"
                            : "info"
                    }
                  >
                    {proposal.status}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2 border-t border-border pt-3">
                {proposal.lineItems.map((item) => (
                  <div
                    key={item.serviceId}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground">
                      {item.serviceName}
                    </span>
                    <span className="font-mono font-medium">
                      {formatCurrency(item.total)}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between border-t border-border pt-2">
                  <span className="font-medium">Total</span>
                  <span className="font-mono text-lg font-bold text-accent-primary">
                    {formatCurrency(proposal.total)}
                  </span>
                </div>
              </div>
              {proposal.sentAt && (
                <p className="text-xs text-muted-foreground">
                  Sent on {formatDate(proposal.sentAt)}
                </p>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center py-8 text-center">
              <FileText className="h-8 w-8 text-muted-foreground/30" />
              <p className="mt-2 text-sm text-muted-foreground">
                No proposal created yet
              </p>
              <Link
                href="/proposals"
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent-primary hover:underline"
              >
                Create Proposal
                <DollarSign className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </motion.div>

        {/* Notes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, ...spring }}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <h3 className="mb-4 text-sm font-semibold">Notes</h3>
          <div className="space-y-4">
            <div className="rounded-xl bg-accent/50 p-4">
              <div className="flex items-start gap-2">
                <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <p className="text-sm leading-relaxed text-foreground/80">
                  {deal.notes}
                </p>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Updated {formatDate(deal.updatedAt)}
              </p>
            </div>
            <textarea
              rows={3}
              placeholder="Add a note..."
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/50"
            />
            <button className="rounded-xl bg-accent px-4 py-2 text-sm font-medium hover:bg-accent/80 transition-colors">
              Save Note
            </button>
          </div>
        </motion.div>
      </div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, ...spring }}
        className="rounded-2xl border border-border bg-card p-6"
      >
        <h3 className="mb-6 text-sm font-semibold">Deal Timeline</h3>
        <div className="space-y-0">
          {[
            {
              date: deal.createdAt,
              label: "Deal created",
              detail: `${deal.clientName} added as ${stageConfig[deal.stage].label}`,
            },
            ...(deal.proposalId
              ? [
                  {
                    date: proposal?.createdAt ?? deal.createdAt,
                    label: "Proposal created",
                    detail: proposal?.title ?? "Proposal drafted",
                  },
                ]
              : []),
            ...(proposal?.sentAt
              ? [
                  {
                    date: proposal.sentAt,
                    label: "Proposal sent",
                    detail: `Sent to ${deal.clientEmail}`,
                  },
                ]
              : []),
            {
              date: deal.updatedAt,
              label: "Last updated",
              detail: deal.notes.slice(0, 60) + (deal.notes.length > 60 ? "..." : ""),
            },
          ]
            .sort(
              (a, b) =>
                new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .map((event, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-accent-primary/60" />
                  {i < 3 && (
                    <div className="w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="pb-6">
                  <p className="text-sm font-medium">{event.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {event.detail}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground/60">
                    {formatDate(event.date)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </motion.div>
    </div>
  );
}
