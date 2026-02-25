"use client";

import { motion } from "framer-motion";
import {
  Package,
  Plus,
  Pencil,
  Clock,
  DollarSign,
  Check,
} from "lucide-react";
import { useServiceStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { ServiceCategory, ServiceTier } from "@/types";

const spring = { type: "spring" as const, stiffness: 300, damping: 24 };

const categoryLabels: Record<ServiceCategory, string> = {
  consulting: "Consulting",
  development: "Development",
  training: "Training",
  audit: "Audit",
  integration: "Integration",
  support: "Support",
};

const tierVariants: Record<ServiceTier, "default" | "info" | "success"> = {
  starter: "default",
  professional: "info",
  enterprise: "success",
};

export default function ServicesPage() {
  const services = useServiceStore((s) => s.services);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Service Catalog
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {services.length} service packages configured
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-accent-primary px-4 py-2.5 text-sm font-medium text-accent-primary-foreground hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" />
          Add Service
        </button>
      </div>

      {/* Services grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, ...spring }}
            className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent-primary/30 hover:shadow-md"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-primary/10">
                <Package className="h-5 w-5 text-accent-primary" />
              </div>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg opacity-0 transition-opacity hover:bg-accent group-hover:opacity-100">
                <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>

            {/* Name & category */}
            <h3 className="mt-4 text-base font-semibold">{service.name}</h3>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant={tierVariants[service.tier]}>{service.tier}</Badge>
              <Badge variant="outline">
                {categoryLabels[service.category]}
              </Badge>
            </div>

            {/* Description */}
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
              {service.description}
            </p>

            {/* Price & duration */}
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <div className="flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-mono text-lg font-semibold text-accent-primary">
                  {formatCurrency(service.price)}
                </span>
                <span className="text-xs text-muted-foreground">
                  /{service.unit}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {service.estimatedDuration}
              </div>
            </div>

            {/* Features */}
            <div className="mt-4 space-y-1.5">
              {service.features.slice(0, 3).map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Check className="h-3 w-3 shrink-0 text-accent-primary" />
                  <span className="text-xs text-muted-foreground">
                    {feature}
                  </span>
                </div>
              ))}
              {service.features.length > 3 && (
                <p className="pl-5 text-xs text-muted-foreground/60">
                  +{service.features.length - 3} more
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
