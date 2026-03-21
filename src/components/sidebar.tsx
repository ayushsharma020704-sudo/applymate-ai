"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  UserCircle,
  Settings2,
  ClipboardList,
  Rocket,
  X,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview & stats",
  },
  {
    label: "Profile",
    href: "/onboarding",
    icon: UserCircle,
    description: "Your story",
  },
  {
    label: "Preferences",
    href: "/preferences",
    icon: Settings2,
    description: "Job settings",
  },
  {
    label: "Applications",
    href: "/applications",
    icon: ClipboardList,
    description: "Track history",
  },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white transition-transform duration-300 ease-in-out lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/25 transition-shadow group-hover:shadow-blue-500/40">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">ApplyMate</h1>
              <p className="text-[10px] font-medium tracking-widest text-blue-400 uppercase">
                AI Powered
              </p>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-white/50 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/30">
            Navigation
          </p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-blue-600/20 to-violet-600/10 text-white shadow-sm"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg transition-all",
                    isActive
                      ? "bg-gradient-to-br from-blue-500 to-violet-600 shadow-md shadow-blue-500/20"
                      : "bg-white/5 group-hover:bg-white/10"
                  )}
                >
                  <item.icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p>{item.label}</p>
                  <p
                    className={cn(
                      "text-[11px] transition-colors",
                      isActive ? "text-blue-300/80" : "text-white/30"
                    )}
                  >
                    {item.description}
                  </p>
                </div>
                {isActive && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-blue-400 shadow-sm shadow-blue-400/50" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-white/10 p-4">
          <div className="rounded-xl bg-gradient-to-br from-blue-600/20 to-violet-600/10 p-4">
            <p className="text-xs font-semibold text-white/90">
              🚀 Auto-Apply Active
            </p>
            <p className="mt-1 text-[11px] text-white/50">
              Scanning jobs across 4 platforms
            </p>
            <div className="mt-3 flex gap-1">
              {[75, 90, 60, 85].map((width, i) => (
                <div
                  key={i}
                  className="h-1 flex-1 rounded-full bg-blue-500/30"
                >
                  <div
                    className="h-full rounded-full bg-blue-400 animate-pulse"
                    style={{
                      width: `${width}%`,
                      animationDelay: `${(i + 1) * 0.2}s`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
