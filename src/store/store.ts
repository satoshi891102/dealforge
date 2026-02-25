import { create } from "zustand";
import type {
  Deal,
  DealStage,
  ServicePackage,
  Proposal,
  ProposalLineItem,
  ProposalStatus,
  ActivityItem,
  ActivityType,
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
  addDeal: (deal: Deal) => void;
  getDealsByStage: (stage: DealStage) => Deal[];
  getDealById: (id: string) => Deal | undefined;
  totalPipelineValue: () => number;
  totalWonValue: () => number;
  activeDealsCount: () => number;
  winRate: () => number;
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

  addDeal: (deal) =>
    set((state) => ({ deals: [...state.deals, deal] })),

  getDealsByStage: (stage) => get().deals.filter((d) => d.stage === stage),

  getDealById: (id) => get().deals.find((d) => d.id === id),

  totalPipelineValue: () =>
    get()
      .deals.filter((d) => d.stage !== "won" && d.stage !== "lost")
      .reduce((sum, d) => sum + d.value, 0),

  totalWonValue: () =>
    get()
      .deals.filter((d) => d.stage === "won")
      .reduce((sum, d) => sum + d.value, 0),

  activeDealsCount: () =>
    get().deals.filter((d) => d.stage !== "won" && d.stage !== "lost").length,

  winRate: () => {
    const deals = get().deals;
    const won = deals.filter((d) => d.stage === "won").length;
    const closed = deals.filter(
      (d) => d.stage === "won" || d.stage === "lost"
    ).length;
    return closed > 0 ? Math.round((won / closed) * 100) : 0;
  },
}));

// ─── Service Store ───

interface ServiceStore {
  services: ServicePackage[];
  toggleService: (id: string) => void;
  updateService: (id: string, updates: Partial<ServicePackage>) => void;
  addService: (service: ServicePackage) => void;
  getServiceById: (id: string) => ServicePackage | undefined;
  getActiveServices: () => ServicePackage[];
  getServicesByCategory: (category: string) => ServicePackage[];
}

export const useServiceStore = create<ServiceStore>((set, get) => ({
  services: seedServices,

  toggleService: (id) =>
    set((state) => ({
      services: state.services.map((s) =>
        s.id === id ? { ...s, isActive: !s.isActive } : s
      ),
    })),

  updateService: (id, updates) =>
    set((state) => ({
      services: state.services.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    })),

  addService: (service) =>
    set((state) => ({ services: [...state.services, service] })),

  getServiceById: (id) => get().services.find((s) => s.id === id),

  getActiveServices: () => get().services.filter((s) => s.isActive),

  getServicesByCategory: (category) =>
    get().services.filter((s) => s.category === category),
}));

// ─── Proposal Store ───

interface ProposalStore {
  proposals: Proposal[];
  addProposal: (proposal: Proposal) => void;
  updateProposal: (id: string, updates: Partial<Proposal>) => void;
  updateProposalStatus: (id: string, status: ProposalStatus) => void;
  getProposalById: (id: string) => Proposal | undefined;
  getProposalByDealId: (dealId: string) => Proposal | undefined;
  getProposalsByStatus: (status: ProposalStatus) => Proposal[];
}

export const useProposalStore = create<ProposalStore>((set, get) => ({
  proposals: seedProposals,

  addProposal: (proposal) =>
    set((state) => ({ proposals: [...state.proposals, proposal] })),

  updateProposal: (id, updates) =>
    set((state) => ({
      proposals: state.proposals.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    })),

  updateProposalStatus: (id, status) =>
    set((state) => ({
      proposals: state.proposals.map((p) =>
        p.id === id
          ? {
              ...p,
              status,
              sentAt:
                status === "sent" && !p.sentAt
                  ? new Date().toISOString()
                  : p.sentAt,
            }
          : p
      ),
    })),

  getProposalById: (id) => get().proposals.find((p) => p.id === id),

  getProposalByDealId: (dealId) =>
    get().proposals.find((p) => p.dealId === dealId),

  getProposalsByStatus: (status) =>
    get().proposals.filter((p) => p.status === status),
}));

// ─── Activity Store ───

interface ActivityStore {
  activities: ActivityItem[];
  addActivity: (activity: ActivityItem) => void;
  getActivitiesByDeal: (dealId: string) => ActivityItem[];
  getRecentActivities: (count: number) => ActivityItem[];
}

export const useActivityStore = create<ActivityStore>((set, get) => ({
  activities: seedActivities,

  addActivity: (activity) =>
    set((state) => ({
      activities: [activity, ...state.activities],
    })),

  getActivitiesByDeal: (dealId) =>
    get().activities.filter((a) => a.dealId === dealId),

  getRecentActivities: (count) =>
    [...get().activities]
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, count),
}));

// ─── ROI Calculator Store ───

interface ROIStore {
  inputs: ROIInputs;
  setInputs: (inputs: Partial<ROIInputs>) => void;
  resetInputs: () => void;
  getResults: () => ROIResults;
}

const DEFAULT_ROI_INPUTS: ROIInputs = {
  dealsPerMonth: 8,
  averageDealSize: 15000,
  closeRate: 35,
  hoursPerProposal: 3,
};

export const useROIStore = create<ROIStore>((set, get) => ({
  inputs: DEFAULT_ROI_INPUTS,

  setInputs: (updates) =>
    set((state) => ({ inputs: { ...state.inputs, ...updates } })),

  resetInputs: () => set({ inputs: DEFAULT_ROI_INPUTS }),

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
  resetSettings: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: "Alex Morgan",
  email: "alex@forgeai.studio",
  company: "Forge AI Studio",
  role: "Founder & AI Consultant",
  avatarUrl: null,
};

const DEFAULT_BRAND: BrandSettings = {
  primaryColor: "oklch(0.60 0.17 145)",
  logoUrl: null,
  companyName: "Forge AI Studio",
  tagline: "Building the future with intelligent systems",
};

const DEFAULT_NOTIFICATIONS: NotificationSettings = {
  emailOnDealWon: true,
  emailOnProposalViewed: true,
  emailOnDealStageChange: true,
  weeklyDigest: true,
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  profile: DEFAULT_PROFILE,
  brand: DEFAULT_BRAND,
  notifications: DEFAULT_NOTIFICATIONS,

  updateProfile: (updates) =>
    set((state) => ({ profile: { ...state.profile, ...updates } })),

  updateBrand: (updates) =>
    set((state) => ({ brand: { ...state.brand, ...updates } })),

  updateNotifications: (updates) =>
    set((state) => ({
      notifications: { ...state.notifications, ...updates },
    })),

  resetSettings: () =>
    set({
      profile: DEFAULT_PROFILE,
      brand: DEFAULT_BRAND,
      notifications: DEFAULT_NOTIFICATIONS,
    }),
}));

// ─── Proposal Wizard Store ───

interface ProposalWizardStore {
  step: number;
  selectedServiceIds: string[];
  scopeNotes: string;
  discount: number;
  validDays: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  toggleServiceSelection: (serviceId: string) => void;
  setScopeNotes: (notes: string) => void;
  setDiscount: (discount: number) => void;
  setValidDays: (days: number) => void;
  reset: () => void;
  getSelectedTotal: () => number;
  getDiscountedTotal: () => number;
}

export const useProposalWizardStore = create<ProposalWizardStore>(
  (set, get) => ({
    step: 1,
    selectedServiceIds: [],
    scopeNotes: "",
    discount: 0,
    validDays: 30,

    setStep: (step) => set({ step }),
    nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 3) })),
    prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),

    toggleServiceSelection: (serviceId) =>
      set((state) => ({
        selectedServiceIds: state.selectedServiceIds.includes(serviceId)
          ? state.selectedServiceIds.filter((id) => id !== serviceId)
          : [...state.selectedServiceIds, serviceId],
      })),

    setScopeNotes: (notes) => set({ scopeNotes: notes }),
    setDiscount: (discount) => set({ discount }),
    setValidDays: (days) => set({ validDays: days }),

    reset: () =>
      set({
        step: 1,
        selectedServiceIds: [],
        scopeNotes: "",
        discount: 0,
        validDays: 30,
      }),

    getSelectedTotal: () => {
      const services = useServiceStore.getState().services;
      return get().selectedServiceIds.reduce((total, id) => {
        const service = services.find((s) => s.id === id);
        return total + (service?.price ?? 0);
      }, 0);
    },

    getDiscountedTotal: () => {
      const subtotal = get().getSelectedTotal();
      const discount = get().discount;
      return Math.round(subtotal * (1 - discount / 100));
    },
  })
);

// ─── UI Store (sidebar, modals, etc.) ───

interface UIStore {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  sidebarCollapsed: false,

  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
}));
