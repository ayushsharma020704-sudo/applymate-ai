"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Rocket, ArrowRight, Zap, Shield, BarChart3, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Glowing orbs */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-violet-500/10 blur-[128px]" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400"
          >
            <Zap className="h-4 w-4" />
            <span>AI-Powered Job Application Automation</span>
          </motion.div>

          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
            Your Career on{" "}
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
              Autopilot
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            ApplyMate AI automatically finds and applies to the best job
            opportunities across LinkedIn, Internshala, Wellfound & Unstop — while
            you focus on what matters. Get daily reports delivered to your inbox.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-violet-600 px-8 text-base font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
              >
                Open Dashboard
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 px-8 text-base text-white hover:bg-white/10 hover:text-white"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              icon: Rocket,
              title: "Auto Apply",
              description: "Automatically applies to latest jobs matching your profile daily",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              icon: BarChart3,
              title: "Smart Dashboard",
              description: "Real-time stats on applications, platforms, and success rates",
              gradient: "from-violet-500 to-purple-500",
            },
            {
              icon: Mail,
              title: "Daily Reports",
              description: "Get a detailed email report every night at 9 PM IST",
              gradient: "from-amber-500 to-orange-500",
            },
            {
              icon: Shield,
              title: "Secure & Private",
              description: "Your data is encrypted and API keys never leave the server",
              gradient: "from-emerald-500 to-teal-500",
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient}`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20 text-center text-sm text-white/30"
        >
          Built with Next.js, Firebase, Supabase & AI • © 2026 ApplyMate AI
        </motion.p>
      </div>
    </div>
  );
}
