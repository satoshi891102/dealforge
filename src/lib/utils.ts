import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { DealStage, DealPriority, ProposalStatus, ServiceTier, ServiceCategory, ActivityType } from "@/types";

// ─── Class Name Merge ───

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ─── Currency Formatting ───

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompactCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return `$${value}`;
}

export function formatPercentage(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
}

// ─── Number Formatting ───

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatCompactNumber(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toString();
}

// ─── Deal Stage Helpers ───

export function getDealStageLabel(stage: DealStage): string {
  const labels: Record<DealStage, string> = {
    lead: "Lead",
    qualified: "Qualified",
    proposal: "Proposal",
    negotiation: "Negotiation",
    won: "Won",
    lost: "Lost",
  };
  return labels[stage];
}

export function getDealStageColor(stage: DealStage): string {
  const colors: Record<DealStage, string> = {
    lead: "text-muted-foreground",
    qualified: "text-info",
    proposal: "text-warning",
    negotiation: "text-accent-primary",
    won: "text-success",
    lost: "text-destructive",
  };
  return colors[stage];
}

export function getDealStageBgColor(stage: DealStage): string {
  const colors: Record<DealStage, string> = {
    lead: "bg-muted-foreground/15",
    qualified: "bg-info/15",
    proposal: "bg-warning/15",
    negotiation: "bg-accent-primary/15",
    won: "bg-success/15",
    lost: "bg-destructive/15",
  };
  return colors[stage];
}

// ─── Deal Priority Helpers ───

export function getDealPriorityLabel(priority: DealPriority): string {
  const labels: Record<DealPriority, string> = {
    low: "Low",
    medium: "Medium",
    high: "High",
  };
  return labels[priority];
}

export function getDealPriorityColor(priority: DealPriority): string {
  const colors: Record<DealPriority, string> = {
    low: "text-muted-foreground",
    medium: "text-warning",
    high: "text-destructive",
  };
  return colors[priority];
}

// ─── Proposal Status Helpers ───

export function getProposalStatusLabel(status: ProposalStatus): string {
  const labels: Record<ProposalStatus, string> = {
    draft: "Draft",
    sent: "Sent",
    viewed: "Viewed",
    accepted: "Accepted",
    rejected: "Rejected",
    expired: "Expired",
  };
  return labels[status];
}

export function getProposalStatusColor(status: ProposalStatus): string {
  const colors: Record<ProposalStatus, string> = {
    draft: "text-muted-foreground",
    sent: "text-info",
    viewed: "text-warning",
    accepted: "text-success",
    rejected: "text-destructive",
    expired: "text-muted-foreground",
  };
  return colors[status];
}

// ─── Service Helpers ───

export function getServiceTierLabel(tier: ServiceTier): string {
  const labels: Record<ServiceTier, string> = {
    starter: "Starter",
    professional: "Professional",
    enterprise: "Enterprise",
  };
  return labels[tier];
}

export function getServiceTierColor(tier: ServiceTier): string {
  const colors: Record<ServiceTier, string> = {
    starter: "text-muted-foreground",
    professional: "text-accent-primary",
    enterprise: "text-warning",
  };
  return colors[tier];
}

export function getServiceCategoryLabel(category: ServiceCategory): string {
  const labels: Record<ServiceCategory, string> = {
    consulting: "Consulting",
    development: "Development",
    training: "Training",
    audit: "Audit",
    integration: "Integration",
    support: "Support",
  };
  return labels[category];
}

// ─── Activity Helpers ───

export function getActivityIcon(type: ActivityType): "success" | "warning" | "destructive" | "info" | "default" {
  const map: Record<ActivityType, "success" | "warning" | "destructive" | "info" | "default"> = {
    deal_created: "info",
    deal_moved: "warning",
    deal_won: "success",
    deal_lost: "destructive",
    proposal_sent: "info",
    proposal_viewed: "warning",
    proposal_accepted: "success",
    note_added: "default",
    follow_up_scheduled: "info",
  };
  return map[type];
}

// ─── Date Helpers ───

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

// ─── Probability to Weighted Value ───

export function getWeightedValue(value: number, probability: number): number {
  return Math.round(value * (probability / 100));
}

// ─── String Helpers ───

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// ─── Animation Presets ───

export const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 24,
};

export const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: springTransition,
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: springTransition,
};
