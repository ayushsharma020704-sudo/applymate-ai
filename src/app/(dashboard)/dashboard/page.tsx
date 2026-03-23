"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { StatsCard } from "@/components/stats-card";
import { Badge } from "@/components/ui/badge";
import { formatDate, getStatusColor } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import type { DashboardStats } from "@/lib/types";
import {
  Send,
  CalendarDays,
  Globe,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    async function fetchDashboardStats() {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && !error) {
        // Compute real stats from the live database rows!
        const total = data.length;
        
        // Filter for "today"
        const today = new Date();
        today.setHours(0,0,0,0);
        const appliedToday = data.filter(r => new Date(r.created_at) >= today).length;
        
        // Filter for "this week"
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        const appliedThisWeek = data.filter(r => new Date(r.created_at) >= lastWeek).length;

        const mappedRecent = data.slice(0, 5).map(row => ({
          id: row.id.toString(),
          uid: row.user_id || "anonymous",
          company: row.company_name || "Unknown",
          role: row.job_title || "Unknown",
          platform: "linkedin" as const,
          appliedAt: row.created_at || new Date().toISOString(),
          status: "Applied" as const,
          resumeUrl: null,
          jobDescription: "",
          coverLetter: row.cover_letter || "",
        }));

        setStats({
          totalApplications: total,
          appliedToday: appliedToday,
          appliedThisWeek: appliedThisWeek,
          platformsActive: 4,
          recentApplications: mappedRecent,
          weeklyTrend: [
            { day: "Mon", count: 2 },
            { day: "Tue", count: 4 },
            { day: "Wed", count: 1 },
            { day: "Thu", count: 5 },
            { day: "Fri", count: 2 },
            { day: "Sat", count: 3 },
            { day: "Sun", count: 0 },
          ], // Static for now
        });
      } else {
        // Fallback or empty state
        setStats({
           totalApplications: 0, appliedToday: 0, appliedThisWeek: 0, 
           platformsActive: 0, recentApplications: [], weeklyTrend: []
        });
      }
    }
    fetchDashboardStats();
  }, []);

  if (!stats) return null;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-1"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Your Journey Today
          </h1>
        </div>
        <p className="text-muted-foreground">
          Here&apos;s how your job search is progressing. ApplyMate is working for you 24/7.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Applied Today"
          value={stats.appliedToday}
          subtitle="Applications sent"
          icon={Send}
          gradient="bg-gradient-to-br from-blue-500 to-blue-700"
          delay={0}
        />
        <StatsCard
          title="This Week"
          value={stats.appliedThisWeek}
          subtitle="Weekly applications"
          icon={CalendarDays}
          gradient="bg-gradient-to-br from-violet-500 to-purple-700"
          delay={0.1}
        />
        <StatsCard
          title="Platforms Active"
          value={stats.platformsActive}
          subtitle="Connected sources"
          icon={Globe}
          gradient="bg-gradient-to-br from-emerald-500 to-teal-700"
          delay={0.2}
        />
        <StatsCard
          title="Total Applied"
          value={stats.totalApplications}
          subtitle="All time"
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-amber-500 to-orange-700"
          delay={0.3}
        />
      </div>

      {/* Weekly Trend + Recent Applications */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Weekly Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 rounded-2xl border border-border/50 bg-card p-6 shadow-sm lg:col-span-2"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Weekly Trend</h3>
            <Badge variant="secondary" className="text-xs">
              Last 7 days
            </Badge>
          </div>
          <div className="flex items-end gap-2 h-40">
            {stats.weeklyTrend.map((item, i) => (
              <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.count / 10) * 100}%` }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.05 }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400 min-h-[8px]"
                />
                <span className="text-[10px] font-medium text-muted-foreground">
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4 rounded-2xl border border-border/50 bg-card p-6 shadow-sm lg:col-span-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Recent Applications</h3>
            <Link
              href="/applications"
              className="flex items-center gap-1 text-xs font-medium text-blue-500 hover:text-blue-400 transition-colors"
            >
              View All <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {stats.recentApplications.map((app, i) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="flex items-center justify-between rounded-xl bg-muted/30 p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-xs font-bold text-blue-500">
                    {app.company.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {app.role}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {app.company} • {formatDate(app.appliedAt)}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`shrink-0 text-xs ${getStatusColor(app.status)}`}
                >
                  {app.status}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Platform Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm"
      >
        <h3 className="font-semibold text-foreground mb-4">Platform Activity</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "LinkedIn", apps: 12, color: "from-blue-500 to-blue-700", icon: "in" },
            { name: "Internshala", apps: 8, color: "from-sky-400 to-blue-500", icon: "IS" },
            { name: "Wellfound", apps: 5, color: "from-orange-400 to-red-500", icon: "W" },
            { name: "Unstop", apps: 3, color: "from-indigo-500 to-purple-600", icon: "U" },
          ].map((platform) => (
            <div
              key={platform.name}
              className="flex items-center gap-3 rounded-xl bg-muted/30 p-4 transition-colors hover:bg-muted/50"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${platform.color} text-white text-sm font-bold`}
              >
                {platform.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{platform.name}</p>
                <p className="text-xs text-muted-foreground">{platform.apps} applications</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
