"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Plus,
  Check,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { useServiceStore, useProposalStore, useDealStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { ProposalStatus } from "@/types";

const spring = { type: "spring" as const, stiffness: 300, damping: 24 };

const statusConfig: Record<
  ProposalStatus,
  { label: string; variant: "default" | "info" | "warning" | "success" | "destructive" }
> = {
  draft: { label: "Draft", variant: "default" },
  sent: { label: "Sent", variant: "info" },
  viewed: { label: "Viewed", variant: "warning" },
  accepted: { label: "Accepted", variant: "success" },
  rejected: { label: "Rejected", variant: "destructive" },
  expired: { label: "Expired", variant: "default" },
};

type WizardStep = 1 | 2 | 3;

export default function ProposalsPage() {
  const proposals = useProposalStore((s) => s.proposals);
  const services = useServiceStore((s) => s.services);
  const deals = useDealStore((s) => s.deals);
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState<WizardStep>(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDeal, setSelectedDeal] = useState<string>("");

  const activeDeals = deals.filter(
    (d) => d.stage !== "won" && d.stage !== "lost"
  );

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const selectedTotal = services
    .filter((s) => selectedServices.includes(s.id))
    .reduce((sum, s) => sum + s.price, 0);

  const wizardSteps = [
    { number: 1, label: "Select Services" },
    { number: 2, label: "Customize Scope" },
    { number: 3, label: "Preview & Send" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Proposals</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {proposals.length} total proposals
          </p>
        </div>
        <button
          onClick={() => {
            setShowWizard(true);
            setWizardStep(1);
            setSelectedServices([]);
            setSelectedDeal("");
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-accent-primary px-4 py-2.5 text-sm font-medium text-accent-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" />
          New Proposal
        </button>
      </div>

      {/* Wizard modal */}
      <AnimatePresence>
        {showWizard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={spring}
              className="w-full max-w-2xl rounded-2xl border border-border bg-card p-8"
            >
              {/* Step indicator */}
              <div className="mb-8 flex items-center gap-4">
                {wizardSteps.map((step, i) => (
                  <div key={step.number} className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                        wizardStep >= step.number
                          ? "bg-accent-primary text-accent-primary-foreground"
                          : "bg-accent text-muted-foreground"
                      }`}
                    >
                      {wizardStep > step.number ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span
                      className={`hidden text-sm sm:block ${wizardStep >= step.number ? "font-medium" : "text-muted-foreground"}`}
                    >
                      {step.label}
                    </span>
                    {i < wizardSteps.length - 1 && (
                      <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground/40" />
                    )}
                  </div>
                ))}
              </div>

              {/* Step content */}
              <AnimatePresence mode="wait">
                {wizardStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={spring}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold">
                      Select services to include
                    </h3>
                    <div className="max-h-64 space-y-2 overflow-y-auto">
                      {services.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => toggleService(service.id)}
                          className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all ${
                            selectedServices.includes(service.id)
                              ? "border-accent-primary bg-accent-primary/5"
                              : "border-border hover:border-border/80"
                          }`}
                        >
                          <div>
                            <p className="text-sm font-medium">
                              {service.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {service.estimatedDuration}
                            </p>
                          </div>
                          <span className="font-mono text-sm font-semibold">
                            {formatCurrency(service.price)}
                          </span>
                        </button>
                      ))}
                    </div>
                    {selectedServices.length > 0 && (
                      <div className="flex items-center justify-between border-t border-border pt-4">
                        <span className="text-sm text-muted-foreground">
                          {selectedServices.length} services selected
                        </span>
                        <span className="font-mono text-lg font-semibold text-accent-primary">
                          {formatCurrency(selectedTotal)}
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}
                {wizardStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={spring}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold">Customize scope</h3>
                    <div>
                      <label className="text-sm font-medium">
                        Link to Deal
                      </label>
                      <select
                        value={selectedDeal}
                        onChange={(e) => setSelectedDeal(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                      >
                        <option value="">Select a deal...</option>
                        {activeDeals.map((deal) => (
                          <option key={deal.id} value={deal.id}>
                            {deal.title} ({deal.clientCompany})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Scope Notes
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Describe the project scope, timeline expectations, and any special requirements..."
                        className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground/50"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Valid Until
                      </label>
                      <input
                        type="date"
                        defaultValue="2026-03-25"
                        className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                      />
                    </div>
                  </motion.div>
                )}
                {wizardStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={spring}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold">
                      Proposal Preview
                    </h3>
                    <div className="rounded-xl border border-border bg-background p-6">
                      <div className="border-b border-border pb-4">
                        <h4 className="text-base font-semibold">
                          AI Services Proposal
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Forge AI Studio
                        </p>
                      </div>
                      <div className="mt-4 space-y-3">
                        {services
                          .filter((s) => selectedServices.includes(s.id))
                          .map((s) => (
                            <div
                              key={s.id}
                              className="flex items-center justify-between text-sm"
                            >
                              <span>{s.name}</span>
                              <span className="font-mono font-medium">
                                {formatCurrency(s.price)}
                              </span>
                            </div>
                          ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                        <span className="font-semibold">Total</span>
                        <span className="font-mono text-xl font-bold text-accent-primary">
                          {formatCurrency(selectedTotal)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => {
                    if (wizardStep === 1) {
                      setShowWizard(false);
                    } else {
                      setWizardStep((wizardStep - 1) as WizardStep);
                    }
                  }}
                  className="rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
                >
                  {wizardStep === 1 ? "Cancel" : "Back"}
                </button>
                <button
                  onClick={() => {
                    if (wizardStep === 3) {
                      setShowWizard(false);
                    } else {
                      setWizardStep((wizardStep + 1) as WizardStep);
                    }
                  }}
                  disabled={wizardStep === 1 && selectedServices.length === 0}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent-primary px-4 py-2 text-sm font-medium text-accent-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {wizardStep === 3 ? "Send Proposal" : "Continue"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Proposals list */}
      <div className="space-y-3">
        {proposals.map((proposal, i) => {
          const config = statusConfig[proposal.status];
          return (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, ...spring }}
              className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition-all hover:border-accent-primary/20"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{proposal.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {proposal.clientCompany} &middot;{" "}
                    {proposal.lineItems.length} items
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant={config.variant}>{config.label}</Badge>
                <span className="font-mono text-base font-semibold">
                  {formatCurrency(proposal.total)}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
