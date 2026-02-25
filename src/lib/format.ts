import type { DealStage, ProposalStatus, ServiceTier } from "@/types";

// ─── Proposal Formatting ───

export function formatProposalNumber(id: string): string {
  const num = id.replace("prop-", "");
  return `PRO-${num.padStart(4, "0")}`;
}

export function formatDealNumber(id: string): string {
  const num = id.replace("deal-", "");
  return `DEAL-${num.padStart(4, "0")}`;
}

export function formatServiceNumber(id: string): string {
  const num = id.replace("svc-", "");
  return `SVC-${num.padStart(4, "0")}`;
}

// ─── Duration Formatting ───

export function formatDuration(hours: number): string {
  if (hours < 1) return `${Math.round(hours * 60)}min`;
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

export function formatHoursSaved(hours: number): string {
  if (hours >= 160) {
    const weeks = Math.round(hours / 40);
    return `${weeks} work weeks`;
  }
  if (hours >= 40) {
    const days = Math.round(hours / 8);
    return `${days} work days`;
  }
  return `${Math.round(hours)} hours`;
}

// ─── Price Formatting ───

export function formatPriceWithUnit(price: number, unit: "project" | "month" | "hour"): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  const unitLabels: Record<string, string> = {
    project: "",
    month: "/mo",
    hour: "/hr",
  };

  return `${formatted}${unitLabels[unit]}`;
}

// ─── Pipeline Stage Formatting ───

export function formatPipelineSummary(deals: { stage: DealStage; value: number }[]): string {
  const active = deals.filter((d) => d.stage !== "won" && d.stage !== "lost");
  const totalValue = active.reduce((sum, d) => sum + d.value, 0);
  const count = active.length;

  if (count === 0) return "No active deals";

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalValue);

  return `${count} deal${count === 1 ? "" : "s"} worth ${formatted}`;
}

// ─── Status Badge Text ───

export function formatStatusText(status: ProposalStatus): string {
  const texts: Record<ProposalStatus, string> = {
    draft: "Draft",
    sent: "Awaiting Response",
    viewed: "Client Viewing",
    accepted: "Accepted",
    rejected: "Declined",
    expired: "Expired",
  };
  return texts[status];
}

// ─── Tier Badge Text ───

export function formatTierLabel(tier: ServiceTier): string {
  const labels: Record<ServiceTier, string> = {
    starter: "Starter",
    professional: "Pro",
    enterprise: "Enterprise",
  };
  return labels[tier];
}

// ─── Probability Display ───

export function formatProbability(probability: number): string {
  return `${probability}%`;
}

export function getProbabilityLabel(probability: number): string {
  if (probability >= 80) return "Very Likely";
  if (probability >= 60) return "Likely";
  if (probability >= 40) return "Possible";
  if (probability >= 20) return "Unlikely";
  return "Long Shot";
}

// ─── Revenue Formatting ───

export function formatRevenueChange(current: number, previous: number): string {
  if (previous === 0) return "+100%";
  const change = ((current - previous) / previous) * 100;
  return `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`;
}

// ─── Date Range Formatting ───

export function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const sameMonth = startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear();

  if (sameMonth) {
    return `${startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${endDate.getDate()}, ${endDate.getFullYear()}`;
  }

  return `${startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
}

// ─── Validity Formatting ───

export function formatValidUntil(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.ceil((date.getTime() - now.getTime()) / 86_400_000);

  if (diffDays < 0) return "Expired";
  if (diffDays === 0) return "Expires today";
  if (diffDays === 1) return "Expires tomorrow";
  if (diffDays <= 7) return `Expires in ${diffDays} days`;
  return `Valid until ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
}
