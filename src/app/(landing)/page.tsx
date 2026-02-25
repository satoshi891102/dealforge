"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Zap,
  X,
  Check,
  Package,
  FileText,
  Handshake,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { seedTestimonials, revenueTickerItems } from "@/lib/seed-data";

const spring = { type: "spring" as const, stiffness: 300, damping: 24 };

// ─── HERO ───

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const floatingStats = [
    { label: "closed", value: "$1.2M+", delay: 0.4 },
    { label: "proposals sent", value: "2,400+", delay: 0.6 },
    { label: "AI agencies", value: "340+", delay: 0.8 },
  ];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,oklch(0.25_0.08_145),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,oklch(0.18_0.04_286),transparent)]" />
      </div>
      <div className="bg-noise absolute inset-0" />

      <div ref={containerRef} className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, ...spring }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm"
        >
          <Zap className="h-3.5 w-3.5 text-accent-primary" />
          Built for AI consultants & agencies
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, ...spring }}
          className="mx-auto max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Your AI Expertise Deserves
          <br />
          <span className="text-gradient-hero">Better Than Cold Emails</span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, ...spring }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          Package it. Price it. Close it. DealForge turns AI builders into deal
          closers.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, ...spring }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/dashboard"
            className="animate-pulse-glow inline-flex items-center gap-2 rounded-xl bg-accent-primary px-8 py-3.5 text-base font-semibold text-accent-primary-foreground transition-opacity hover:opacity-90"
          >
            Start Closing Deals
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-accent"
          >
            See How It Works
          </a>
        </motion.div>

        {/* 3D Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <div className="animate-float-3d rounded-2xl border border-border/50 bg-card/80 p-4 shadow-2xl shadow-accent-primary/5 backdrop-blur-sm">
            {/* Mini kanban preview */}
            <div className="mb-3 flex items-center gap-2 border-b border-border/50 pb-3">
              <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-warning/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-success/60" />
              <span className="ml-2 text-xs text-muted-foreground">
                Deal Pipeline
              </span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {(["Lead", "Qualified", "Proposal", "Won"] as const).map(
                (col, i) => (
                  <div key={col} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">
                        {col}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground/60">
                        {[1, 1, 2, 2][i]}
                      </span>
                    </div>
                    {Array.from({ length: [1, 1, 2, 2][i] }).map((_, j) => (
                      <div
                        key={j}
                        className="rounded-lg border border-border/30 bg-background/50 p-2.5"
                      >
                        <div className="h-2 w-3/4 rounded bg-muted" />
                        <div className="mt-1.5 h-1.5 w-1/2 rounded bg-muted/60" />
                        <div className="mt-2 flex items-center justify-between">
                          <div className="h-1.5 w-10 rounded bg-accent-primary/30" />
                          <div className="h-1.5 w-6 rounded bg-muted/40" />
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* Floating stats */}
        <div className="mt-16 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
          {floatingStats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: stat.delay, ...spring }}
              className="text-center"
            >
              <span className="font-mono text-2xl font-bold text-foreground">
                {stat.value}
              </span>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROBLEM-SOLUTION ───

const painPoints = [
  "Pricing your services is guesswork",
  "Proposals take hours to write",
  "No idea which deals will close",
  "Clients ghost after the first call",
];

const solutions = [
  "Tiered pricing templates for every service",
  "Generate proposals in 60 seconds flat",
  "Pipeline analytics show win probability",
  "Automated follow-ups keep deals alive",
];

function ProblemSolutionSection() {
  return (
    <SectionWrapper className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Sound Familiar?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every AI consultant hits the same walls. We built the bulldozer.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Pain points */}
          <div className="space-y-5">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-destructive">
              The Problem
            </h3>
            {painPoints.map((point, i) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ...spring }}
                className="flex items-start gap-4 rounded-xl border border-destructive/10 bg-destructive/5 p-4"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/15">
                  <X className="h-3.5 w-3.5 text-destructive" />
                </div>
                <span className="text-sm text-foreground/80">{point}</span>
              </motion.div>
            ))}
          </div>

          {/* Solutions */}
          <div className="space-y-5">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-success">
              The DealForge Way
            </h3>
            {solutions.map((solution, i) => (
              <motion.div
                key={solution}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2, ...spring }}
                className="flex items-start gap-4 rounded-xl border border-success/10 bg-success/5 p-4"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/15">
                  <Check className="h-3.5 w-3.5 text-success" />
                </div>
                <span className="text-sm text-foreground/80">{solution}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Connecting line (desktop) */}
        <div className="mt-4 hidden items-center justify-center lg:flex">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-px w-40 origin-left bg-gradient-to-r from-destructive/30 via-muted-foreground/20 to-success/30"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

// ─── HOW IT WORKS ───

const steps = [
  {
    number: "01",
    title: "Package",
    description: "Define your AI services with pricing tiers and deliverables.",
    icon: Package,
  },
  {
    number: "02",
    title: "Propose",
    description: "Generate professional proposals in 60 seconds flat.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Close",
    description: "Track every deal from first lead to signed revenue.",
    icon: Handshake,
  },
];

function HowItWorksSection() {
  return (
    <SectionWrapper id="how-it-works" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Three Steps to Revenue
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From service catalog to closed deal in record time.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute left-[16.66%] right-[16.66%] top-16 hidden h-px origin-left bg-gradient-to-r from-accent-primary/40 via-accent-primary/20 to-accent-primary/40 lg:block"
          />

          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, ...spring }}
                whileHover={{ y: -4, boxShadow: "0 20px 40px -12px oklch(0 0 0 / 0.3)" }}
                className="relative rounded-2xl border border-border bg-card p-8 text-center transition-shadow"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-primary/10">
                  <step.icon className="h-6 w-6 text-accent-primary" />
                </div>
                <span className="font-mono text-xs text-accent-primary">
                  {step.number}
                </span>
                <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

// ─── SOCIAL PROOF ───

function SocialProofSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % seedTestimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SectionWrapper
      id="testimonials"
      className="bg-card/50 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Revenue ticker */}
        <div className="mb-16 overflow-hidden rounded-xl border border-border/50 bg-background/50 py-3">
          <div className="animate-ticker flex whitespace-nowrap">
            {[...revenueTickerItems, ...revenueTickerItems].map((item, i) => (
              <div
                key={`${item.label}-${i}`}
                className="mx-8 inline-flex items-center gap-3"
              >
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </span>
                <span className="font-mono text-sm font-semibold text-accent-primary">
                  {item.amount}
                </span>
                <span
                  className={`text-xs ${item.type === "won" ? "text-success" : "text-info"}`}
                >
                  {item.type === "won" ? "CLOSED" : "PIPELINE"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by AI Builders
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real results from real agencies using DealForge.
          </p>
        </div>

        {/* Testimonial carousel */}
        <div className="relative mx-auto mt-12 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={spring}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <p className="text-base leading-relaxed text-foreground/80">
                &ldquo;{seedTestimonials[active].quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-primary/15 text-sm font-bold text-accent-primary">
                  {seedTestimonials[active].avatarInitials}
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {seedTestimonials[active].name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {seedTestimonials[active].role},{" "}
                    {seedTestimonials[active].company}
                  </p>
                </div>
                <div className="ml-auto rounded-lg bg-accent-primary/10 px-3 py-1">
                  <span className="font-mono text-xs font-semibold text-accent-primary">
                    {seedTestimonials[active].revenue}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() =>
                setActive(
                  (active - 1 + seedTestimonials.length) %
                    seedTestimonials.length
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-accent transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {seedTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-accent-primary" : "w-2 bg-muted"}`}
                />
              ))}
            </div>
            <button
              onClick={() =>
                setActive((active + 1) % seedTestimonials.length)
              }
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-accent transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

// ─── ROI TEASER ───

function ROITeaserSection() {
  const [deals, setDeals] = useState(8);
  const [dealSize, setDealSize] = useState(15000);

  const monthlyRevenue = deals * dealSize * 0.35;
  const annualRevenue = monthlyRevenue * 12;

  return (
    <SectionWrapper id="roi" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Calculate Your Revenue Potential
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what DealForge could mean for your bottom line.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-border bg-card p-8">
          {/* Deals per month slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Deals Per Month</label>
              <span className="font-mono text-sm font-semibold text-accent-primary">
                {deals}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              value={deals}
              onChange={(e) => setDeals(Number(e.target.value))}
              className="w-full accent-[oklch(0.60_0.17_145)]"
            />
          </div>

          {/* Average deal size slider */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Average Deal Size</label>
              <span className="font-mono text-sm font-semibold text-accent-primary">
                ${dealSize.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={1000}
              max={100000}
              step={1000}
              value={dealSize}
              onChange={(e) => setDealSize(Number(e.target.value))}
              className="w-full accent-[oklch(0.60_0.17_145)]"
            />
          </div>

          {/* Results */}
          <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-8">
            <div>
              <p className="text-sm text-muted-foreground">Monthly Revenue</p>
              <p className="mt-1 font-mono text-2xl font-bold text-accent-primary">
                <AnimatedCounter
                  value={Math.round(monthlyRevenue)}
                  prefix="$"
                />
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Annual Revenue</p>
              <p className="mt-1 font-mono text-2xl font-bold text-accent-primary">
                <AnimatedCounter
                  value={Math.round(annualRevenue)}
                  prefix="$"
                />
              </p>
            </div>
          </div>

          <Link
            href="/roi"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-medium hover:bg-accent transition-colors"
          >
            See Full Calculator
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}

// ─── FINAL CTA ───

function FinalCTASection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,oklch(0.25_0.08_145),transparent)]" />
      <div className="bg-noise absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        >
          Stop Leaving Money
          <br />
          <span className="text-gradient-hero">on the Table</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg text-muted-foreground"
        >
          Join hundreds of AI consultants who&apos;ve transformed their sales
          process.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, ...spring }}
          className="mt-10"
        >
          <Link
            href="/dashboard"
            className="animate-pulse-glow inline-flex items-center gap-2 rounded-xl bg-accent-primary px-10 py-4 text-base font-semibold text-accent-primary-foreground transition-opacity hover:opacity-90"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FOOTER ───

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-primary">
            <Zap className="h-3.5 w-3.5 text-accent-primary-foreground" />
          </div>
          <span className="text-sm font-semibold">DealForge</span>
        </div>
        <div className="flex gap-6">
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link href="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Services
          </Link>
          <Link href="/roi" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ROI Calculator
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">
          Built for builders who close.
        </p>
      </div>
    </footer>
  );
}

// ─── LANDING PAGE ───

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ProblemSolutionSection />
      <HowItWorksSection />
      <SocialProofSection />
      <ROITeaserSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
