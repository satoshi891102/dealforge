import { create } from "zustand";
import type {
  Deal,
  DealStage,
  ServicePackage,
  Proposal,
  ActivityItem,
  ROIInputs,
  ROIResults,
  UserProfile,
  BrandSettings,
  NotificationSettings,
} from "@/types";
import {
  seedDeals,
  seedServices,
  seedProposals,
  seedActivities,
} from "@/lib/seed-data";

// ─── Deal Store ───

interface DealStore {
  deals: Deal[];
  moveDeal: (dealId: string, newStage: DealStage) => void;
  updateDeal: (dealId: string, updates: Partial<Deal>) => void;
  getDealsByStage: (stage: DealStage) => Deal[];
  getDealById: (id: string) => Deal | undefined;
  totalPipelineValue: () => number;
  totalWonValue: () => number;
}

export const useDealStore = create<DealStore>((set, get) => ({
  deals: seedDeals,
  moveDeal: (dealId, newStage) =>
    set((state) => ({
      deals: state.deals.map((d) =>
        d.id === dealId
          ? {
              ...d,
              stage: newStage,
              updatedAt: new Date().toISOString(),
              closedAt:
                newStage === "won" || newStage === "lost"
                  ? new Date().toISOString()
                  : d.closedAt,
              probability:
                newStage === "won"
                  ? 100
                  : newStage === "lost"
                    ? 0
                    : d.probability,
            }
          : d
      ),
    })),
  updateDeal: (dealId, updates) =>
    set((state) => ({
      deals: state.deals.map((d) =>
        d.id === dealId
          ? { ...d, ...updates, updatedAt: new Date().toISOString() }
          : d
      ),
    })),
  getDealsByStage: (stage) => get().deals.filter((d) => d.stage === stage),
  getDealById: (id) => get().deals.find((d) => d.id === id),
  totalPipelineValue: () =>
    get()
      .deals.filter(
        (d) => d.stage !== "won" && d.stage !== "lost"
      )
      .reduce((sum, d) => sum + d.value, 0),
  totalWonValue: () =>
    get()
      .deals.filter((d) => d.stage === "won")
      .reduce((sum, d) => sum + d.value, 0),
}));

// ─── Service Store ───

interface ServiceStore {
  services: ServicePackage[];
  toggleService: (id: string) => void;
  getServiceById: (id: string) => ServicePackage | undefined;
  getActiveServices: () => ServicePackage[];
}

export const useServiceStore = create<ServiceStore>((set, get) => ({
  services: seedServices,
  toggleService: (id) =>
    set((state) => ({
      services: state.services.map((s) =>
        s.id === id ? { ...s, isActive: !s.isActive } : s
      ),
    })),
  getServiceById: (id) => get().services.find((s) => s.id === id),
  getActiveServices: () => get().services.filter((s) => s.isActive),
}));

// ─── Proposal Store ───

interface ProposalStore {
  proposals: Proposal[];
  getProposalById: (id: string) => Proposal | undefined;
  getProposalByDealId: (dealId: string) => Proposal | undefined;
}

export const useProposalStore = create<ProposalStore>((set, get) => ({
  proposals: seedProposals,
  getProposalById: (id) => get().proposals.find((p) => p.id === id),
  getProposalByDealId: (dealId) =>
    get().proposals.find((p) => p.dealId === dealId),
}));

// ─── Activity Store ───

interface ActivityStore {
  activities: ActivityItem[];
}

export const useActivityStore = create<ActivityStore>(() => ({
  activities: seedActivities,
}));

// ─── ROI Calculator Store ───

interface ROIStore {
  inputs: ROIInputs;
  setInputs: (inputs: Partial<ROIInputs>) => void;
  getResults: () => ROIResults;
}

export const useROIStore = create<ROIStore>((set, get) => ({
  inputs: {
    dealsPerMonth: 8,
    averageDealSize: 15000,
    closeRate: 35,
    hoursPerProposal: 3,
  },
  setInputs: (updates) =>
    set((state) => ({ inputs: { ...state.inputs, ...updates } })),
  getResults: () => {
    const { dealsPerMonth, averageDealSize, closeRate, hoursPerProposal } =
      get().inputs;
    const closedDeals = dealsPerMonth * (closeRate / 100);
    const monthlyRevenue = closedDeals * averageDealSize;
    const annualRevenue = monthlyRevenue * 12;
    const hoursSaved = dealsPerMonth * (hoursPerProposal - 0.5) * 4;
    const revenueIncrease = ((closeRate + 15) / closeRate - 1) * 100;
    return { monthlyRevenue, annualRevenue, hoursSaved, revenueIncrease };
  },
}));

// ─── Settings Store ───

interface SettingsStore {
  profile: UserProfile;
  brand: BrandSettings;
  notifications: NotificationSettings;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateBrand: (updates: Partial<BrandSettings>) => void;
  updateNotifications: (updates: Partial<NotificationSettings>) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  profile: {
    name: "Alex Morgan",
    email: "alex@forgeai.studio",
    company: "Forge AI Studio",
    role: "Founder & AI Consultant",
    avatarUrl: null,
  },
  brand: {
    primaryColor: "oklch(0.60 0.17 145)",
    logoUrl: null,
    companyName: "Forge AI Studio",
    tagline: "Building the future with intelligent systems",
  },
  notifications: {
    emailOnDealWon: true,
    emailOnProposalViewed: true,
    emailOnDealStageChange: true,
    weeklyDigest: true,
  },
  updateProfile: (updates) =>
    set((state) => ({ profile: { ...state.profile, ...updates } })),
  updateBrand: (updates) =>
    set((state) => ({ brand: { ...state.brand, ...updates } })),
  updateNotifications: (updates) =>
    set((state) => ({
      notifications: { ...state.notifications, ...updates },
    })),
}));
