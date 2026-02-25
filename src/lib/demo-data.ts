import {
  DollarSign,
  TrendingUp,
  Target,
  CheckCircle2,
} from "lucide-react";
import type {
  DashboardStat,
  Deal,
  ServicePackage,
  Proposal,
  ActivityItem,
  Testimonial,
  UserProfile,
  BrandSettings,
  NotificationSettings,
  ROIInputs,
} from "@/types";
import {
  seedDeals,
  seedServices,
  seedProposals,
  seedActivities,
  seedTestimonials,
  revenueTickerItems,
} from "@/lib/seed-data";
import { formatCurrency, formatCompactCurrency } from "@/lib/utils";

// ─── Re-exports for single-import convenience ───

export {
  seedDeals as deals,
  seedServices as services,
  seedProposals as proposals,
  seedActivities as activities,
  seedTestimonials as testimonials,
  revenueTickerItems,
};

// ─── Dashboard Stats ───

const totalWon = seedDeals
  .filter((d) => d.stage === "won")
  .reduce((sum, d) => sum + d.value, 0);

const totalPipeline = seedDeals
  .filter((d) => d.stage !== "won" && d.stage !== "lost")
  .reduce((sum, d) => sum + d.value, 0);

const activeDeals = seedDeals.filter(
  (d) => d.stage !== "won" && d.stage !== "lost"
).length;

const wonDeals = seedDeals.filter((d) => d.stage === "won").length;
const closedDeals = seedDeals.filter(
  (d) => d.stage === "won" || d.stage === "lost"
).length;
const winRate = closedDeals > 0 ? (wonDeals / closedDeals) * 100 : 0;

export const dashboardStats: DashboardStat[] = [
  {
    label: "Total Revenue",
    value: totalWon,
    formattedValue: formatCurrency(totalWon),
    change: 24.5,
    icon: DollarSign,
    prefix: "$",
  },
  {
    label: "Pipeline Value",
    value: totalPipeline,
    formattedValue: formatCurrency(totalPipeline),
    change: 12.3,
    icon: TrendingUp,
    prefix: "$",
  },
  {
    label: "Active Deals",
    value: activeDeals,
    formattedValue: activeDeals.toString(),
    change: 8.1,
    icon: Target,
  },
  {
    label: "Win Rate",
    value: winRate,
    formattedValue: `${winRate.toFixed(0)}%`,
    change: 5.2,
    icon: CheckCircle2,
    suffix: "%",
  },
];

// ─── Sparkline Bars (last 14 days of revenue activity) ───

export const revenueSparkline = [
  { value: 2200, positive: true },
  { value: 0, positive: true },
  { value: 4500, positive: true },
  { value: 1800, positive: false },
  { value: 3200, positive: true },
  { value: 0, positive: true },
  { value: 5100, positive: true },
  { value: 2800, positive: true },
  { value: 0, positive: true },
  { value: 3500, positive: true },
  { value: 1200, positive: false },
  { value: 4200, positive: true },
  { value: 6800, positive: true },
  { value: 3000, positive: true },
];

export const dealSparkline = [
  { value: 1, positive: true },
  { value: 0, positive: true },
  { value: 2, positive: true },
  { value: 1, positive: true },
  { value: 0, positive: true },
  { value: 1, positive: false },
  { value: 3, positive: true },
  { value: 1, positive: true },
  { value: 2, positive: true },
  { value: 0, positive: true },
  { value: 1, positive: true },
  { value: 2, positive: true },
  { value: 1, positive: true },
  { value: 1, positive: true },
];

// ─── Monthly Revenue Chart Data (recharts) ───

export const monthlyRevenueData = [
  { month: "Sep", revenue: 12000, deals: 2 },
  { month: "Oct", revenue: 28000, deals: 3 },
  { month: "Nov", revenue: 18500, deals: 2 },
  { month: "Dec", revenue: 35000, deals: 4 },
  { month: "Jan", revenue: 42000, deals: 5 },
  { month: "Feb", revenue: 63000, deals: 6 },
];

// ─── Pipeline Breakdown Chart Data ───

export const pipelineBreakdown = [
  { stage: "Lead", value: 45000, count: 1, fill: "var(--color-muted-foreground)" },
  { stage: "Qualified", value: 7500, count: 1, fill: "var(--color-info)" },
  { stage: "Proposal", value: 40500, count: 2, fill: "var(--color-warning)" },
  { stage: "Negotiation", value: 52000, count: 1, fill: "var(--color-accent-primary)" },
];

// ─── Deal Velocity Data ───

export const dealVelocityData = [
  { week: "W1", created: 2, closed: 1 },
  { week: "W2", created: 3, closed: 0 },
  { week: "W3", created: 1, closed: 2 },
  { week: "W4", created: 2, closed: 1 },
  { week: "W5", created: 1, closed: 1 },
  { week: "W6", created: 3, closed: 2 },
  { week: "W7", created: 2, closed: 1 },
  { week: "W8", created: 1, closed: 0 },
];

// ─── Service Revenue Breakdown ───

export const serviceRevenueData = [
  { name: "Custom LLM Integration", revenue: 60000, deals: 4 },
  { name: "Enterprise AI Platform", revenue: 52000, deals: 1 },
  { name: "Ongoing AI Support", revenue: 30000, deals: 3 },
  { name: "AI Infrastructure Audit", revenue: 11500, deals: 2 },
  { name: "AI Strategy Workshop", revenue: 9000, deals: 2 },
  { name: "AI Team Training", revenue: 6000, deals: 2 },
];

// ─── ROI Comparison Table ───

export interface ROIComparisonRow {
  metric: string;
  without: string;
  with: string;
  improvement: string;
}

export const roiComparisonData: ROIComparisonRow[] = [
  {
    metric: "Proposal Creation Time",
    without: "3 hours",
    with: "5 minutes",
    improvement: "-97%",
  },
  {
    metric: "Close Rate",
    without: "25%",
    with: "40%",
    improvement: "+60%",
  },
  {
    metric: "Time to First Proposal",
    without: "3 days",
    with: "Same day",
    improvement: "-90%",
  },
  {
    metric: "Monthly Revenue per Consultant",
    without: "$12,000",
    with: "$19,200",
    improvement: "+60%",
  },
  {
    metric: "Deals Tracked",
    without: "Spreadsheet chaos",
    with: "Full pipeline visibility",
    improvement: "Priceless",
  },
  {
    metric: "Follow-up Rate",
    without: "40%",
    with: "95%",
    improvement: "+138%",
  },
];

// ─── ROI Calculator Presets ───

export const roiPresets: { label: string; inputs: ROIInputs }[] = [
  {
    label: "Solo Consultant",
    inputs: {
      dealsPerMonth: 4,
      averageDealSize: 8000,
      closeRate: 30,
      hoursPerProposal: 4,
    },
  },
  {
    label: "Small Agency",
    inputs: {
      dealsPerMonth: 10,
      averageDealSize: 15000,
      closeRate: 35,
      hoursPerProposal: 3,
    },
  },
  {
    label: "Growth Agency",
    inputs: {
      dealsPerMonth: 20,
      averageDealSize: 25000,
      closeRate: 40,
      hoursPerProposal: 2.5,
    },
  },
];

// ─── Deal Detail Timeline Events ───

export interface TimelineEvent {
  id: string;
  dealId: string;
  type: "created" | "stage_change" | "note" | "proposal" | "follow_up" | "won" | "lost";
  title: string;
  description: string;
  timestamp: string;
}

export const dealTimelineEvents: TimelineEvent[] = [
  {
    id: "tl-001",
    dealId: "deal-001",
    type: "created",
    title: "Deal Created",
    description: "Enterprise AI Platform Build added to pipeline",
    timestamp: "2025-12-15T10:00:00Z",
  },
  {
    id: "tl-002",
    dealId: "deal-001",
    type: "stage_change",
    title: "Moved to Qualified",
    description: "Discovery call completed, budget confirmed at $50K+",
    timestamp: "2025-12-22T14:00:00Z",
  },
  {
    id: "tl-003",
    dealId: "deal-001",
    type: "proposal",
    title: "Proposal Sent",
    description: "Enterprise AI Platform Proposal sent to Sarah Chen",
    timestamp: "2026-01-12T09:00:00Z",
  },
  {
    id: "tl-004",
    dealId: "deal-001",
    type: "note",
    title: "Proposal Viewed",
    description: "Sarah Chen viewed the proposal for the first time",
    timestamp: "2026-01-14T11:30:00Z",
  },
  {
    id: "tl-005",
    dealId: "deal-001",
    type: "stage_change",
    title: "Moved to Negotiation",
    description: "Client requested scope adjustments and payment terms discussion",
    timestamp: "2026-01-28T10:00:00Z",
  },
  {
    id: "tl-006",
    dealId: "deal-001",
    type: "follow_up",
    title: "Follow-up Scheduled",
    description: "Call with CTO and legal team to review contract",
    timestamp: "2026-02-20T14:30:00Z",
  },
  {
    id: "tl-007",
    dealId: "deal-001",
    type: "note",
    title: "Note Added",
    description: "Waiting on legal review from Meridian. CTO is champion.",
    timestamp: "2026-02-20T15:00:00Z",
  },
  {
    id: "tl-008",
    dealId: "deal-004",
    type: "created",
    title: "Deal Created",
    description: "Fraud Detection Model Development added to pipeline",
    timestamp: "2025-11-20T10:00:00Z",
  },
  {
    id: "tl-009",
    dealId: "deal-004",
    type: "stage_change",
    title: "Moved to Qualified",
    description: "Technical requirements finalized with FinFlow engineering",
    timestamp: "2025-12-05T09:00:00Z",
  },
  {
    id: "tl-010",
    dealId: "deal-004",
    type: "proposal",
    title: "Proposal Sent",
    description: "Fraud Detection Model Proposal sent to James Okoro",
    timestamp: "2026-01-06T09:00:00Z",
  },
  {
    id: "tl-011",
    dealId: "deal-004",
    type: "stage_change",
    title: "Moved to Negotiation",
    description: "Proposal accepted in principle, final terms under review",
    timestamp: "2026-01-20T11:00:00Z",
  },
  {
    id: "tl-012",
    dealId: "deal-004",
    type: "won",
    title: "Deal Won",
    description: "Contract signed for $35,000. Kickoff March 1st.",
    timestamp: "2026-02-10T16:00:00Z",
  },
  {
    id: "tl-013",
    dealId: "deal-007",
    type: "created",
    title: "Deal Created",
    description: "Product Recommendation Engine added to pipeline",
    timestamp: "2025-10-05T10:00:00Z",
  },
  {
    id: "tl-014",
    dealId: "deal-007",
    type: "proposal",
    title: "Proposal Sent",
    description: "Recommendation Engine Proposal sent to Rachel Thompson",
    timestamp: "2025-10-16T09:00:00Z",
  },
  {
    id: "tl-015",
    dealId: "deal-007",
    type: "won",
    title: "Deal Won",
    description: "Delivered ahead of schedule. $28,000 closed.",
    timestamp: "2026-01-15T12:00:00Z",
  },
  {
    id: "tl-016",
    dealId: "deal-008",
    type: "created",
    title: "Deal Created",
    description: "AI Infrastructure Assessment added to pipeline",
    timestamp: "2025-12-01T11:00:00Z",
  },
  {
    id: "tl-017",
    dealId: "deal-008",
    type: "proposal",
    title: "Proposal Sent",
    description: "Infrastructure Assessment Proposal sent to Omar Hassan",
    timestamp: "2025-12-11T08:00:00Z",
  },
  {
    id: "tl-018",
    dealId: "deal-008",
    type: "lost",
    title: "Deal Lost",
    description: "Lost to competitor. Budget constraints cited.",
    timestamp: "2026-01-20T09:00:00Z",
  },
];

export function getTimelineForDeal(dealId: string): TimelineEvent[] {
  return dealTimelineEvents
    .filter((e) => e.dealId === dealId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

// ─── Default Settings ───

export const defaultProfile: UserProfile = {
  name: "Alex Morgan",
  email: "alex@forgeai.studio",
  company: "Forge AI Studio",
  role: "Founder & AI Consultant",
  avatarUrl: null,
};

export const defaultBrand: BrandSettings = {
  primaryColor: "oklch(0.60 0.17 145)",
  logoUrl: null,
  companyName: "Forge AI Studio",
  tagline: "Building the future with intelligent systems",
};

export const defaultNotifications: NotificationSettings = {
  emailOnDealWon: true,
  emailOnProposalViewed: true,
  emailOnDealStageChange: true,
  weeklyDigest: true,
};

// ─── Billing Plan Data ───

export interface BillingPlan {
  id: string;
  name: string;
  price: number;
  interval: "month" | "year";
  features: string[];
  isCurrent: boolean;
  isPopular: boolean;
}

export const billingPlans: BillingPlan[] = [
  {
    id: "plan-free",
    name: "Free",
    price: 0,
    interval: "month",
    features: [
      "Up to 5 active deals",
      "3 proposals per month",
      "Basic pipeline view",
      "Email support",
    ],
    isCurrent: false,
    isPopular: false,
  },
  {
    id: "plan-pro",
    name: "Pro",
    price: 49,
    interval: "month",
    features: [
      "Unlimited active deals",
      "Unlimited proposals",
      "Advanced analytics",
      "Custom branding",
      "Priority support",
      "ROI calculator",
    ],
    isCurrent: true,
    isPopular: true,
  },
  {
    id: "plan-team",
    name: "Team",
    price: 149,
    interval: "month",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Team pipeline views",
      "Role-based permissions",
      "API access",
      "Dedicated account manager",
    ],
    isCurrent: false,
    isPopular: false,
  },
];

// ─── Proposal Wizard Defaults ───

export interface ProposalWizardDefaults {
  step: number;
  selectedServiceIds: string[];
  scopeNotes: string;
  discount: number;
  validDays: number;
}

export const proposalWizardDefaults: ProposalWizardDefaults = {
  step: 1,
  selectedServiceIds: [],
  scopeNotes: "",
  discount: 0,
  validDays: 30,
};

// ─── Revenue Gauge Thresholds ───

export interface GaugeThreshold {
  label: string;
  min: number;
  max: number;
  color: string;
}

export const revenueGaugeThresholds: GaugeThreshold[] = [
  { label: "Low", min: 0, max: 50000, color: "var(--color-destructive)" },
  { label: "Growing", min: 50000, max: 150000, color: "var(--color-warning)" },
  { label: "Strong", min: 150000, max: 300000, color: "var(--color-info)" },
  { label: "Crushing It", min: 300000, max: 500000, color: "var(--color-success)" },
];

// ─── Dashboard Greeting ───

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function getDashboardSummary(deals: Deal[]): string {
  const active = deals.filter((d) => d.stage !== "won" && d.stage !== "lost");
  const urgent = active.filter((d) => d.priority === "high");
  const followUps = active.filter((d) => {
    if (!d.nextFollowUp) return false;
    const followUpDate = new Date(d.nextFollowUp);
    const today = new Date();
    const diffDays = Math.ceil(
      (followUpDate.getTime() - today.getTime()) / 86_400_000
    );
    return diffDays <= 2 && diffDays >= 0;
  });

  const parts: string[] = [];
  if (urgent.length > 0) {
    parts.push(`${urgent.length} high-priority deal${urgent.length === 1 ? "" : "s"}`);
  }
  if (followUps.length > 0) {
    parts.push(`${followUps.length} follow-up${followUps.length === 1 ? "" : "s"} due soon`);
  }
  if (parts.length === 0) {
    return "All caught up. Time to close some deals.";
  }
  return `You have ${parts.join(" and ")}.`;
}

// ─── Kanban Computed Helpers ───

export function getPipelineStageValues(deals: Deal[]) {
  const stages = ["lead", "qualified", "proposal", "negotiation"] as const;
  return stages.map((stage) => {
    const stageDeals = deals.filter((d) => d.stage === stage);
    return {
      stage,
      count: stageDeals.length,
      totalValue: stageDeals.reduce((sum, d) => sum + d.value, 0),
      weightedValue: stageDeals.reduce(
        (sum, d) => sum + Math.round(d.value * (d.probability / 100)),
        0
      ),
    };
  });
}

// ─── Landing Page Social Proof Numbers ───

export const socialProofCounters = [
  { label: "Revenue Closed", target: 2100000, prefix: "$", suffix: "+" },
  { label: "Proposals Sent", target: 2400, prefix: "", suffix: "+" },
  { label: "AI Agencies", target: 340, prefix: "", suffix: "+" },
] as const;

// ─── Feature Highlights (for landing) ───

export interface FeatureHighlight {
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
}

export const featureHighlights: FeatureHighlight[] = [
  {
    title: "Smart Pricing Engine",
    description:
      "Tiered pricing templates calibrated for AI services. No more guessing what to charge.",
    metric: "3x",
    metricLabel: "faster pricing",
  },
  {
    title: "One-Click Proposals",
    description:
      "Generate professional, branded proposals in 60 seconds. Customizable templates included.",
    metric: "60s",
    metricLabel: "to proposal",
  },
  {
    title: "Deal Intelligence",
    description:
      "AI-scored pipeline with probability tracking. Know which deals need attention.",
    metric: "+40%",
    metricLabel: "close rate",
  },
  {
    title: "Revenue Dashboard",
    description:
      "Real-time metrics, pipeline visualization, and revenue forecasting in one view.",
    metric: "$2M+",
    metricLabel: "tracked",
  },
];
