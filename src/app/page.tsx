"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Rocket, ArrowRight, Zap, Shield, BarChart3, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Glowing orbs */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-[128px]" />

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
            className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-2xl text-orange-600 font-bold"
          >
            <Zap className="h-6 w-6" />
            <span>AI-Powered Job Application Automation</span>
          </motion.div>

          <h1 className="text-7xl font-bold tracking-tight text-slate-900 sm:text-9xl">
            Your Career on{" "}
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              Autopilot
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-3xl leading-relaxed text-slate-600 font-semibold">
            ApplyMate AI automatically finds and applies to the best job
            opportunities across LinkedIn, Internshala, Wellfound & Unstop — while
            you focus on what matters. Get daily reports delivered to your inbox.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-orange-500 to-amber-500 px-10 text-3xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow text-white rounded-full py-8"
              >
                Open Dashboard
                <ArrowRight className="ml-3 h-8 w-8 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button
                size="lg"
                variant="outline"
                className="border-orange-200 bg-white px-10 text-3xl text-orange-600 hover:bg-orange-50 hover:text-orange-700 rounded-full py-8 shadow-sm"
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
              gradient: "from-orange-400 to-amber-500",
            },
            {
              icon: BarChart3,
              title: "Smart Dashboard",
              description: "Real-time stats on applications, platforms, and success rates",
              gradient: "from-amber-400 to-orange-500",
            },
            {
              icon: Mail,
              title: "Daily Reports",
              description: "Get a detailed email report every night at 9 PM IST",
              gradient: "from-rose-400 to-orange-500",
            },
            {
              icon: Shield,
              title: "Secure & Private",
              description: "Your data is encrypted and API keys never leave the server",
              gradient: "from-orange-500 to-red-500",
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="group rounded-3xl border border-orange-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-orange-300 hover:shadow-md hover:shadow-orange-500/10"
            >
              <div
                className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-sm`}
              >
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800">{feature.title}</h3>
              <p className="mt-2 text-2xl leading-relaxed text-slate-600 font-medium">
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
          className="mt-20 text-center text-2xl text-slate-400 font-medium"
        >
          Built with Next.js, Firebase, Supabase & AI • © 2026 ApplyMate AI
        </motion.p>
      </div>
    </div>
  );
}
