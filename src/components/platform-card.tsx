"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { Platform } from "@/lib/types";

interface PlatformCardProps {
  platform: Platform;
  selected: boolean;
  onToggle: (platform: Platform) => void;
}

const platformConfig: Record<
  Platform,
  { name: string; color: string; gradient: string; description: string; icon: string }
> = {
  linkedin: {
    name: "LinkedIn",
    color: "text-blue-600",
    gradient: "from-blue-500 to-blue-700",
    description: "Professional networking & jobs",
    icon: "in",
  },
  internshala: {
    name: "Internshala",
    color: "text-sky-500",
    gradient: "from-sky-400 to-blue-500",
    description: "Internships & fresher jobs",
    icon: "IS",
  },
  wellfound: {
    name: "Wellfound",
    color: "text-orange-500",
    gradient: "from-orange-400 to-red-500",
    description: "Startup jobs & equity",
    icon: "W",
  },
  unstop: {
    name: "Unstop",
    color: "text-indigo-500",
    gradient: "from-indigo-500 to-purple-600",
    description: "Competitions & hiring challenges",
    icon: "U",
  },
};

export function PlatformCard({ platform, selected, onToggle }: PlatformCardProps) {
  const config = platformConfig[platform];

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onToggle(platform)}
      className={cn(
        "group relative flex w-full flex-col items-center gap-4 rounded-2xl border-2 p-6 text-center transition-all duration-300",
        selected
          ? "border-blue-500/50 bg-blue-500/5 shadow-lg shadow-blue-500/10"
          : "border-border/50 bg-card hover:border-border hover:shadow-md"
      )}
    >
      {/* Selection indicator */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500"
        >
          <Check className="h-3.5 w-3.5 text-white" />
        </motion.div>
      )}

      {/* Platform Icon */}
      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white font-bold text-xl shadow-lg transition-shadow",
          config.gradient,
          selected ? "shadow-lg" : "shadow-md"
        )}
      >
        {config.icon}
      </div>

      <div>
        <h3 className={cn("text-lg font-semibold", config.color)}>
          {config.name}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">{config.description}</p>
      </div>

      {/* Status pill */}
      <div
        className={cn(
          "rounded-full px-3 py-1 text-xs font-medium transition-colors",
          selected
            ? "bg-blue-500/15 text-blue-600"
            : "bg-muted text-muted-foreground"
        )}
      >
        {selected ? "Active" : "Inactive"}
      </div>
    </motion.button>
  );
}
