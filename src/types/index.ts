import type { LucideIcon } from "lucide-react";

// ─── Deal Pipeline ───

export type DealStage = "lead" | "qualified" | "proposal" | "negotiation" | "won" | "lost";

export type DealPriority = "low" | "medium" | "high";

export interface Deal {
  id: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  title: string;
  value: number;
  stage: DealStage;
  priority: DealPriority;
  probability: number;
  serviceIds: string[];
  proposalId: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
  closedAt: string | null;
  nextFollowUp: string | null;
}

// ─── Services ───

export type ServiceTier = "starter" | "professional" | "enterprise";

export type ServiceCategory =
  | "consulting"
  | "development"
  | "training"
  | "audit"
  | "integration"
  | "support";

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  tier: ServiceTier;
  price: number;
  unit: "project" | "month" | "hour";
  features: string[];
  deliverables: string[];
  estimatedDuration: string;
  isActive: boolean;
}

// ─── Proposals ───

export type ProposalStatus = "draft" | "sent" | "viewed" | "accepted" | "rejected" | "expired";

export interface ProposalLineItem {
  serviceId: string;
  serviceName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  notes: string;
}

export interface Proposal {
  id: string;
  dealId: string;
  clientName: string;
  clientCompany: string;
  title: string;
  status: ProposalStatus;
  lineItems: ProposalLineItem[];
  subtotal: number;
  discount: number;
  total: number;
  validUntil: string;
  scopeNotes: string;
  createdAt: string;
  sentAt: string | null;
}

// ─── Activity Feed ───

export type ActivityType =
  | "deal_created"
  | "deal_moved"
  | "deal_won"
  | "deal_lost"
  | "proposal_sent"
  | "proposal_viewed"
  | "proposal_accepted"
  | "note_added"
  | "follow_up_scheduled";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  dealId: string;
  dealTitle: string;
  description: string;
  timestamp: string;
}

// ─── Dashboard Stats ───

export interface DashboardStat {
  label: string;
  value: number;
  formattedValue: string;
  change: number;
  icon: LucideIcon;
  prefix?: string;
  suffix?: string;
}

// ─── Kanban ───

export interface KanbanColumn {
  id: DealStage;
  title: string;
  deals: Deal[];
}

// ─── ROI Calculator ───

export interface ROIInputs {
  dealsPerMonth: number;
  averageDealSize: number;
  closeRate: number;
  hoursPerProposal: number;
}

export interface ROIResults {
  monthlyRevenue: number;
  annualRevenue: number;
  hoursSaved: number;
  revenueIncrease: number;
}

// ─── Settings ───

export interface UserProfile {
  name: string;
  email: string;
  company: string;
  role: string;
  avatarUrl: string | null;
}

export interface BrandSettings {
  primaryColor: string;
  logoUrl: string | null;
  companyName: string;
  tagline: string;
}

export interface NotificationSettings {
  emailOnDealWon: boolean;
  emailOnProposalViewed: boolean;
  emailOnDealStageChange: boolean;
  weeklyDigest: boolean;
}

// ─── Navigation ───

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

// ─── Testimonial ───

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  revenue: string;
  avatarInitials: string;
}
