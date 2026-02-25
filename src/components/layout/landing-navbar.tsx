"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { motion } from "framer-motion";

export function LandingNavbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-primary">
            <Zap className="h-4 w-4 text-accent-primary-foreground" />
          </div>
          <span className="text-base font-semibold tracking-tight">
            DealForge
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Testimonials
          </a>
          <a href="#roi" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ROI
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl bg-accent-primary px-4 py-2 text-sm font-medium text-accent-primary-foreground hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
