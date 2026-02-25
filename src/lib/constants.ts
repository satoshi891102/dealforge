import {
  LayoutDashboard,
  Package,
  FileText,
  Calculator,
  Settings,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  Send,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Timer,
  Box,
  FileCheck,
  Handshake,
  type LucideIcon,
} from "lucide-react";
import type { DealStage, ServiceCategory } from "@/types";

// ─── App Metadata ───

export const APP_NAME = "DealForge";
export const APP_TAGLINE = "Package it. Price it. Close it.";
export const APP_DESCRIPTION = "DealForge turns AI builders into deal closers.";

// ─── Navigation ───

export const DASHBOARD_NAV = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Services", href: "/services", icon: Package },
  { label: "Proposals", href: "/proposals", icon: FileText },
  { label: "ROI Calculator", href: "/roi", icon: Calculator },
  { label: "Settings", href: "/settings", icon: Settings },
] as const;

export const LANDING_NAV = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
] as const;

// ─── Kanban Pipeline ───

export const PIPELINE_STAGES: { id: DealStage; title: string }[] = [
  { id: "lead", title: "Leads" },
  { id: "qualified", title: "Qualified" },
  { id: "proposal", title: "Proposal" },
  { id: "negotiation", title: "Negotiation" },
];

export const ALL_STAGES: { id: DealStage; title: string }[] = [
  ...PIPELINE_STAGES,
  { id: "won", title: "Won" },
  { id: "lost", title: "Lost" },
];

// ─── How It Works Steps ───

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Package",
    description: "Define your AI services with pricing tiers.",
    icon: Box,
  },
  {
    step: 2,
    title: "Propose",
    description: "Generate professional proposals in 60 seconds.",
    icon: FileCheck,
  },
  {
    step: 3,
    title: "Close",
    description: "Track every deal from lead to revenue.",
    icon: Handshake,
  },
] as const;

// ─── Pain Points & Solutions ───

export const PAIN_POINTS = [
  "Pricing your services is guesswork",
  "Proposals take hours to write",
  "No idea which deals will close",
  "Clients ghost after the first call",
] as const;

export const SOLUTIONS = [
  "Tiered pricing templates built for AI services",
  "One-click proposal generation in 60 seconds",
  "AI-powered deal scoring and pipeline analytics",
  "Automated follow-up sequences and reminders",
] as const;

// ─── Hero Stats ───

export const HERO_STATS = [
  { label: "closed", value: "$2M+", delay: 0 },
  { label: "proposals sent", value: "2,400+", delay: 0.15 },
  { label: "AI agencies", value: "340+", delay: 0.3 },
] as const;

// ─── Proposal Status Icons ───

export const PROPOSAL_STATUS_ICONS: Record<string, LucideIcon> = {
  draft: FileText,
  sent: Send,
  viewed: Eye,
  accepted: ThumbsUp,
  rejected: ThumbsDown,
  expired: Timer,
};

// ─── Service Category Icons ───

export const SERVICE_CATEGORY_ICONS: Record<ServiceCategory, LucideIcon> = {
  consulting: Users,
  development: Package,
  training: Target,
  audit: AlertCircle,
  integration: Settings,
  support: Clock,
};

// ─── Dashboard Stat Icons ───

export const DASHBOARD_STAT_ICONS = {
  revenue: DollarSign,
  pipeline: TrendingUp,
  deals: Target,
  winRate: CheckCircle2,
  lost: XCircle,
  trending: TrendingUp,
  trendingDown: TrendingDown,
  arrowRight: ArrowRight,
} as const;

// ─── ROI Calculator Defaults ───

export const ROI_DEFAULTS = {
  dealsPerMonth: { min: 1, max: 30, step: 1, default: 8 },
  averageDealSize: { min: 1000, max: 100000, step: 1000, default: 15000 },
  closeRate: { min: 5, max: 80, step: 5, default: 35 },
  hoursPerProposal: { min: 0.5, max: 10, step: 0.5, default: 3 },
} as const;

export const ROI_BOOST_CLOSE_RATE = 15; // percentage points DealForge adds
export const ROI_PROPOSAL_TIME_WITH_FORGE = 0.5; // hours

// ─── Animation Durations ───

export const ANIMATION = {
  spring: { type: "spring" as const, stiffness: 300, damping: 24 },
  springBouncy: { type: "spring" as const, stiffness: 400, damping: 20 },
  springGentle: { type: "spring" as const, stiffness: 200, damping: 28 },
  duration: { fast: 0.15, normal: 0.3, slow: 0.5 },
  stagger: { fast: 0.04, normal: 0.06, slow: 0.1 },
} as const;

// ─── Breakpoints ───

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// ─── Sidebar ───

export const SIDEBAR_WIDTH = 240;
export const SIDEBAR_COLLAPSED_WIDTH = 64;
