export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  skills: string[];
  education: EducationEntry[];
  experience: ExperienceEntry[];
  resumeUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface JobPreferences {
  uid: string;
  platforms: Platform[];
  jobTypes: JobType[];
  keywords: string[];
  locations: string[];
  salaryRange?: { min: number; max: number };
  updatedAt: string;
}

export type Platform = "linkedin" | "internshala" | "wellfound" | "unstop";
export type JobType = "full-time" | "internship" | "part-time" | "remote" | "contract";
export type ApplicationStatus = "Applied" | "Pending" | "Failed";

export interface Application {
  id: string;
  uid: string;
  company: string;
  role: string;
  platform: Platform;
  status: ApplicationStatus;
  appliedAt: string;
  jobUrl?: string;
  coverLetter?: string;
  salary?: string;
  location?: string;
}

export interface DashboardStats {
  appliedToday: number;
  appliedThisWeek: number;
  platformsActive: number;
  totalApplications: number;
  recentApplications: Application[];
  weeklyTrend: { day: string; count: number }[];
}
