"use client";

import { motion } from "framer-motion";
import { Calculator, TrendingUp, Clock, Percent } from "lucide-react";
import { useROIStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

const spring = { type: "spring" as const, stiffness: 300, damping: 24 };

export default function ROIPage() {
  const inputs = useROIStore((s) => s.inputs);
  const setInputs = useROIStore((s) => s.setInputs);
  const getResults = useROIStore((s) => s.getResults);
  const results = getResults();

  const sliders = [
    {
      label: "Deals Per Month",
      key: "dealsPerMonth" as const,
      min: 1,
      max: 50,
      step: 1,
      value: inputs.dealsPerMonth,
      format: (v: number) => String(v),
    },
    {
      label: "Average Deal Size",
      key: "averageDealSize" as const,
      min: 1000,
      max: 200000,
      step: 1000,
      value: inputs.averageDealSize,
      format: (v: number) => formatCurrency(v),
    },
    {
      label: "Close Rate",
      key: "closeRate" as const,
      min: 5,
      max: 80,
      step: 5,
      value: inputs.closeRate,
      format: (v: number) => `${v}%`,
    },
    {
      label: "Hours Per Proposal (current)",
      key: "hoursPerProposal" as const,
      min: 1,
      max: 10,
      step: 0.5,
      value: inputs.hoursPerProposal,
      format: (v: number) => `${v}h`,
    },
  ];

  const resultCards = [
    {
      label: "Monthly Revenue",
      value: formatCurrency(results.monthlyRevenue),
      icon: TrendingUp,
      highlight: true,
    },
    {
      label: "Annual Revenue",
      value: formatCurrency(results.annualRevenue),
      icon: Calculator,
      highlight: true,
    },
    {
      label: "Hours Saved / Month",
      value: `${Math.round(results.hoursSaved)}h`,
      icon: Clock,
      highlight: false,
    },
    {
      label: "Revenue Increase",
      value: `+${results.revenueIncrease.toFixed(0)}%`,
      icon: Percent,
      highlight: false,
    },
  ];

  // Gauge calculation
  const gaugePercent = Math.min(
    (results.annualRevenue / 2000000) * 100,
    100
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">ROI Calculator</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          See how DealForge impacts your bottom line.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Sliders */}
        <div className="space-y-6 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Your Numbers</h2>
          {sliders.map((slider) => (
            <div key={slider.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">{slider.label}</label>
                <span className="font-mono text-sm font-semibold text-accent-primary">
                  {slider.format(slider.value)}
                </span>
              </div>
              <input
                type="range"
                min={slider.min}
                max={slider.max}
                step={slider.step}
                value={slider.value}
                onChange={(e) =>
                  setInputs({ [slider.key]: Number(e.target.value) })
                }
                className="w-full accent-[oklch(0.60_0.17_145)]"
              />
              <div className="flex justify-between text-xs text-muted-foreground/60">
                <span>{slider.format(slider.min)}</span>
                <span>{slider.format(slider.max)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Gauge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={spring}
            className="flex flex-col items-center rounded-2xl border border-border bg-card p-6"
          >
            <h2 className="mb-6 text-lg font-semibold">Annual Revenue Gauge</h2>
            <div className="relative h-40 w-64">
              <svg viewBox="0 0 200 120" className="h-full w-full">
                {/* Background arc */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="oklch(0.24 0.006 286)"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                {/* Active arc */}
                <motion.path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="oklch(0.60 0.17 145)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: gaugePercent / 100 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
                <span className="font-mono text-2xl font-bold text-accent-primary">
                  {formatCurrency(results.annualRevenue)}
                </span>
                <span className="text-xs text-muted-foreground">/ year</span>
              </div>
            </div>
          </motion.div>

          {/* Result cards */}
          <div className="grid grid-cols-2 gap-4">
            {resultCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, ...spring }}
                className={`rounded-2xl border border-border p-5 ${card.highlight ? "bg-accent-primary/5" : "bg-card"}`}
              >
                <div className="flex items-center gap-2">
                  <card.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {card.label}
                  </span>
                </div>
                <p
                  className={`mt-2 font-mono text-xl font-bold ${card.highlight ? "text-accent-primary" : "text-foreground"}`}
                >
                  {card.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Comparison */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold">With vs Without DealForge</h3>
            <div className="space-y-3">
              {[
                {
                  label: "Proposal time",
                  without: `${inputs.hoursPerProposal}h`,
                  with: "~5 min",
                },
                {
                  label: "Close rate",
                  without: `${inputs.closeRate}%`,
                  with: `${Math.min(inputs.closeRate + 15, 90)}%`,
                },
                {
                  label: "Monthly revenue",
                  without: formatCurrency(
                    inputs.dealsPerMonth *
                      inputs.averageDealSize *
                      (inputs.closeRate / 100)
                  ),
                  with: formatCurrency(
                    inputs.dealsPerMonth *
                      inputs.averageDealSize *
                      (Math.min(inputs.closeRate + 15, 90) / 100)
                  ),
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-3 items-center text-sm"
                >
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="text-center font-mono text-muted-foreground/60">
                    {row.without}
                  </span>
                  <span className="text-right font-mono font-semibold text-accent-primary">
                    {row.with}
                  </span>
                </div>
              ))}
              <div className="grid grid-cols-3 border-t border-border pt-2 text-xs text-muted-foreground/50">
                <span />
                <span className="text-center">Current</span>
                <span className="text-right">With DealForge</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
