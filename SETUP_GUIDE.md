# ApplyMate AI - Full Project Setup & Architecture Guide

Welcome to ApplyMate AI! This document covers every major and minor detail about this project—how it works, what it solves, its current state, and how to set it up securely.

---

## 1. What is ApplyMate AI? 💡

**The Problem It Solves:**
Job hunting is incredibly tedious. Candidates spend hours every week searching for jobs that match their skills, writing personalized cover letters for each distinct role, and manually typing the exact same resume details into repetitive application forms.

**What The App Does:**
ApplyMate AI is an automated digital assistant designed to find jobs and apply to them for you. You set your preferences once, and the app does the heavy lifting every day.

**Type of Project:**
This is a **Full-Stack SaaS Web Application** containing elements of:
1.  **Software Development:** A complete React/Next.js website where users log in, manage settings, and view a dashboard.
2.  **Generative AI:** Designed to use AI to write hyper-personalized cover letters.
3.  **Automation/Web Scraping:** Designed to use background scripts and API calls to find jobs online and submit your resume.

---

## 2. Current Project State: Prototype vs. Production ⚠️

**Does this project fetch real-time jobs from LinkedIn right now?**
No, not yet. If you check `src/lib/mock-data.ts` and `src/app/api/webhook/trigger-agent/route.ts`, you will see that the current repository is **Phase 1: The Dashboard Prototype**. 

Currently, the app uses **Simulated Data (Mock Data)** to populate the dashboard. It generates fake applications for companies like Google, Microsoft, and Amazon to show you exactly what the UI looks like and how the user flow works. 

**Why didn't you need an OpenAI or Gemini API Key?**
Because the AI cover letter generation and the web scrapers (for LinkedIn, Wellfound, Internshala, Unstop) are currently built as placeholders. The actual "Engine" that browses LinkedIn and calls OpenAI has not been integrated into this specific codebase yet. 

**How the Production version will work:**
To make this real, you will attach an automation backend (like a Python web scraper using Selenium/Playwright, or an n8n workflow) to the `/api/webhook/trigger-agent` endpoint. That external agent will:
1. Talk to the LinkedIn/Internshala APIs or scrape them.
2. Send the job description to OpenAI/Gemini.
3. Automatically click "Apply" on those websites.
4. Send the successful application result back to your Supabase/Firestore Database.

---

## 3. How the Dashboard Works (The User Flow) ⚙️

Here is the step-by-step lifecycle of how ApplyMate AI works from the user's perspective:

1.  **Sign Up:** You create an account and log in using **Firebase Authentication**.
2.  **Onboarding & Profile Creation:** You fill out a profile with your resume details, skills, and job preferences. This data is saved to a secure database (**Supabase / Firestore**).
3.  **The Daily Engine (Automated Job Hunting):** Every day, a background automated script (a `cron` job) wakes up. This relies on the `CRON_SECRET` to prevent unauthorized triggers.
4.  **AI Personalization (Future):** The system securely sends the job description to an AI model to write a unique cover letter.
5.  **Submission (Future):** The background tools submit the customized cover letter and your resume to the employer.
6.  **Daily Reporting:** The server uses **Resend** to send you a clean email summarizing the jobs applied to that day.

---

## 4. Safety and Security 🔒

You entered several API keys and passwords into your `.env.local` file. It's completely normal to wonder if they are safe! 

**Are your APIs secure? Yes! Here is why:**
*   **GitHub is Safe:** Next.js projects include a file called `.gitignore`. One of the rules explicitly tells Git to **never** upload any `.env` files. Your passwords stay on your computer and will not reach the internet.
*   **Vercel is Safe:** When you deploy this to Vercel, you manually copy those keys into Vercel's secure "Environment Variables" dashboard. Vercel uses bank-level encryption.
*   **Public vs Private Keys:** Keys starting with `NEXT_PUBLIC_` (like your Supabase URL or Firebase config) are visible to the browser to let your website talk to the database. **This is completely safe and normal!** Proper security happens through database permissions, not by hiding these routing keys.
*   **Admin Keys:** Your server-side keys (like `FIREBASE_ADMIN_PRIVATE_KEY` and `CRON_SECRET`) do *not* have `NEXT_PUBLIC_`. Next.js automatically hides these from the browser so nobody can ever see them.

---

## 5. Technology Stack 🧰
*   **Frontend & Backend:** Next.js 16 (React Framework)
*   **Authentication:** Firebase Auth
*   **Database:** Supabase (PostgreSQL) / Firestore (NoSQL)
*   **Email Service:** Resend
*   **Styling:** Tailwind CSS & Shadcn UI Components
