import { Application, DashboardStats, Platform } from "./types";

const companies = [
  "Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix",
  "Flipkart", "Razorpay", "Zerodha", "CRED", "Swiggy", "PhonePe",
  "Atlassian", "Adobe", "Salesforce", "Shopify", "Stripe", "Notion",
  "Figma", "Vercel", "Supabase", "PlanetScale", "Linear", "Clerk"
];

const roles = [
  "Frontend Developer", "Full Stack Developer", "Software Engineer",
  "Backend Developer", "React Developer", "SDE Intern",
  "ML Engineer", "Data Analyst", "DevOps Engineer",
  "Product Designer", "UI/UX Designer", "Mobile Developer",
  "Cloud Engineer", "Security Engineer", "Technical Writer"
];

const platforms: Platform[] = ["linkedin", "internshala", "wellfound", "unstop"];
const statuses: ("Applied" | "Pending" | "Failed")[] = ["Applied", "Pending", "Failed"];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateCoverLetter(company: string, role: string): string {
  return `Dear Hiring Manager,

I am writing to express my strong interest in the ${role} position at ${company}. With my experience in modern web technologies and a passion for building exceptional user experiences, I believe I would be a valuable addition to your team.

Throughout my career, I have developed expertise in React, Next.js, TypeScript, and Node.js, enabling me to build scalable and performant applications. I am particularly drawn to ${company}'s commitment to innovation and would love to contribute to your mission.

I am confident that my technical skills, combined with my ability to collaborate effectively with cross-functional teams, make me an ideal candidate for this role.

Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to ${company}'s continued success.

Best regards,
ApplyMate AI User`;
}

export function generateMockApplications(count: number = 25): Application[] {
  const apps: Application[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(Math.random() * 14);
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    const company = randomFrom(companies);
    const role = randomFrom(roles);

    apps.push({
      id: `app-${i + 1}`,
      uid: "demo-user",
      company,
      role,
      platform: randomFrom(platforms),
      status: randomFrom(statuses),
      appliedAt: date.toISOString(),
      coverLetter: generateCoverLetter(company, role),
      salary: `₹${Math.floor(Math.random() * 30 + 5)}L - ₹${Math.floor(Math.random() * 30 + 35)}L`,
      location: randomFrom(["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Remote"]),
    });
  }

  return apps.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
}

export function generateMockStats(): DashboardStats {
  const apps = generateMockApplications(30);
  const now = new Date();
  const todayStr = now.toDateString();
  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const appliedToday = apps.filter(
    (a) => new Date(a.appliedAt).toDateString() === todayStr && a.status === "Applied"
  ).length;

  const appliedThisWeek = apps.filter(
    (a) => new Date(a.appliedAt) >= weekAgo && a.status === "Applied"
  ).length;

  const platformsActive = new Set(apps.map((a) => a.platform)).size;

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeklyTrend = days.map((day) => ({
    day,
    count: Math.floor(Math.random() * 8) + 1,
  }));

  return {
    appliedToday,
    appliedThisWeek,
    platformsActive,
    totalApplications: apps.length,
    recentApplications: apps.slice(0, 5),
    weeklyTrend,
  };
}
