"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon: LucideIcon;
  gradient: string;
  delay?: number;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient,
  delay = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-border"
    >
      {/* Gradient background */}
      <div
        className={cn(
          "absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-30",
          gradient
        )}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <motion.p
            className="mt-2 text-4xl font-bold tracking-tight text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: delay + 0.2 }}
          >
            {value}
          </motion.p>
          {subtitle && (
            <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            gradient
          )}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="mt-4 flex items-center gap-2">
        <div className="h-1.5 flex-1 rounded-full bg-muted">
          <motion.div
            className={cn("h-full rounded-full", gradient)}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(value * 10, 100)}%` }}
            transition={{ duration: 1, delay: delay + 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
