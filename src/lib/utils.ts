import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "applied":
      return "bg-emerald-500/15 text-emerald-600 border-emerald-500/20";
    case "pending":
      return "bg-amber-500/15 text-amber-600 border-amber-500/20";
    case "failed":
      return "bg-red-500/15 text-red-600 border-red-500/20";
    default:
      return "bg-gray-500/15 text-gray-600 border-gray-500/20";
  }
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}
