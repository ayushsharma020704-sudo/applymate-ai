import type { Metadata } from "next";
import { Dancing_Script } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { Toaster } from "@/components/ui/sonner";

const cursive = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ApplyMate AI — Your Job Application Autopilot",
  description:
    "AI-powered job application automation dashboard. Track, manage, and automate your job search across LinkedIn, Internshala, Wellfound, and Unstop.",
  keywords: ["job application", "automation", "AI", "career", "LinkedIn", "Internshala"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cursive.variable} font-sans antialiased bg-white text-slate-900`}>
        <AuthProvider>
          {children}
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
