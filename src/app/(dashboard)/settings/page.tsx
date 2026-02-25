"use client";

import { motion } from "framer-motion";
import {
  User,
  Palette,
  Bell,
  CreditCard,
  Save,
} from "lucide-react";
import { useState } from "react";
import { useSettingsStore } from "@/lib/store";

const spring = { type: "spring" as const, stiffness: 300, damping: 24 };

type SettingsTab = "profile" | "branding" | "notifications" | "billing";

const tabs: { id: SettingsTab; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "branding", label: "Branding", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const profile = useSettingsStore((s) => s.profile);
  const brand = useSettingsStore((s) => s.brand);
  const notifications = useSettingsStore((s) => s.notifications);
  const updateProfile = useSettingsStore((s) => s.updateProfile);
  const updateBrand = useSettingsStore((s) => s.updateBrand);
  const updateNotifications = useSettingsStore((s) => s.updateNotifications);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account and preferences.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[200px_1fr]">
        {/* Tabs */}
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent/50"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={spring}
          className="rounded-2xl border border-border bg-card p-6"
        >
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Profile</h2>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-primary/15 text-xl font-bold text-accent-primary">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <button className="rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors">
                  Change Avatar
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => updateProfile({ name: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => updateProfile({ email: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Company</label>
                  <input
                    type="text"
                    value={profile.company}
                    onChange={(e) =>
                      updateProfile({ company: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Role</label>
                  <input
                    type="text"
                    value={profile.role}
                    onChange={(e) => updateProfile({ role: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                  />
                </div>
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl bg-accent-primary px-4 py-2.5 text-sm font-medium text-accent-primary-foreground hover:opacity-90 transition-opacity">
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          )}

          {activeTab === "branding" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Branding</h2>
              <p className="text-sm text-muted-foreground">
                Customize how your proposals and documents appear to clients.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Company Name</label>
                  <input
                    type="text"
                    value={brand.companyName}
                    onChange={(e) =>
                      updateBrand({ companyName: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Tagline</label>
                  <input
                    type="text"
                    value={brand.tagline}
                    onChange={(e) =>
                      updateBrand({ tagline: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Primary Color</label>
                  <div className="mt-1 flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-lg border border-border"
                      style={{ backgroundColor: "oklch(0.60 0.17 145)" }}
                    />
                    <input
                      type="text"
                      value={brand.primaryColor}
                      onChange={(e) =>
                        updateBrand({ primaryColor: e.target.value })
                      }
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 font-mono text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Logo</label>
                  <div className="mt-1 flex h-10 items-center rounded-xl border border-dashed border-border px-4">
                    <span className="text-sm text-muted-foreground">
                      Upload logo...
                    </span>
                  </div>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl bg-accent-primary px-4 py-2.5 text-sm font-medium text-accent-primary-foreground hover:opacity-90 transition-opacity">
                <Save className="h-4 w-4" />
                Save Branding
              </button>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <p className="text-sm text-muted-foreground">
                Choose when you want to be notified.
              </p>
              <div className="space-y-4">
                {(
                  [
                    {
                      key: "emailOnDealWon" as const,
                      label: "Deal Won",
                      desc: "Get notified when a deal is marked as won",
                    },
                    {
                      key: "emailOnProposalViewed" as const,
                      label: "Proposal Viewed",
                      desc: "Get notified when a client views your proposal",
                    },
                    {
                      key: "emailOnDealStageChange" as const,
                      label: "Deal Stage Change",
                      desc: "Get notified when a deal moves to a new stage",
                    },
                    {
                      key: "weeklyDigest" as const,
                      label: "Weekly Digest",
                      desc: "Receive a weekly summary of your pipeline",
                    },
                  ] as const
                ).map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between rounded-xl border border-border p-4"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        updateNotifications({
                          [item.key]: !notifications[item.key],
                        })
                      }
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        notifications[item.key]
                          ? "bg-accent-primary"
                          : "bg-muted"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                          notifications[item.key]
                            ? "translate-x-5.5"
                            : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Billing</h2>
              <div className="rounded-xl border border-accent-primary/30 bg-accent-primary/5 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Pro Plan</p>
                    <p className="text-xs text-muted-foreground">
                      Unlimited deals, proposals, and services
                    </p>
                  </div>
                  <span className="font-mono text-2xl font-bold text-accent-primary">
                    $49
                    <span className="text-sm font-normal text-muted-foreground">
                      /mo
                    </span>
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-border p-4">
                  <div>
                    <p className="text-sm font-medium">Payment Method</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      Visa ending in 4242
                    </p>
                  </div>
                  <button className="text-sm font-medium text-accent-primary hover:underline">
                    Update
                  </button>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border p-4">
                  <div>
                    <p className="text-sm font-medium">Next Billing Date</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      March 1, 2026
                    </p>
                  </div>
                  <button className="text-sm font-medium text-destructive hover:underline">
                    Cancel Plan
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
