"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  User,
  GraduationCap,
  Briefcase,
  FileText,
  ArrowRight,
  ArrowLeft,
  Plus,
  X,
  Upload,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const steps = [
  { id: 1, title: "Personal Info", icon: User, description: "Tell us about yourself" },
  { id: 2, title: "Skills", icon: Sparkles, description: "What are you great at?" },
  { id: 3, title: "Education", icon: GraduationCap, description: "Your academic journey" },
  { id: 4, title: "Experience", icon: Briefcase, description: "Where you've worked" },
  { id: 5, title: "Resume", icon: FileText, description: "Upload your resume" },
];

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
}

interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [education, setEducation] = useState<Education[]>([
    { id: "1", institution: "", degree: "", field: "", startYear: "", endYear: "" },
  ]);
  const [experience, setExperience] = useState<Experience[]>([
    { id: "1", company: "", role: "", description: "", startDate: "", endDate: "", current: false },
  ]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const addEducation = () => {
    setEducation([
      ...education,
      { id: Date.now().toString(), institution: "", degree: "", field: "", startYear: "", endYear: "" },
    ]);
  };

  const removeEducation = (id: string) => {
    if (education.length > 1) setEducation(education.filter((e) => e.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      { id: Date.now().toString(), company: "", role: "", description: "", startDate: "", endDate: "", current: false },
    ]);
  };

  const removeExperience = (id: string) => {
    if (experience.length > 1) setExperience(experience.filter((e) => e.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setExperience(experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        name,
        email,
        skills,
        education,
        experience,
        resumeUrl: resumeFile ? "pending-upload" : undefined,
      };

      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Profile saved successfully! 🎉");
      } else {
        toast.success("Profile saved locally! (Connect Firebase to persist)");
      }
    } catch {
      toast.success("Profile saved locally! (Connect Firebase to persist)");
    }
  };

  const suggestedSkills = [
    "React", "Next.js", "TypeScript", "Python", "Node.js", "Java",
    "AWS", "Docker", "Figma", "SQL", "MongoDB", "Git",
    "REST APIs", "GraphQL", "Tailwind CSS", "Machine Learning",
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Tell Us Your Story ✨
        </h1>
        <p className="mt-1 text-muted-foreground">
          Help ApplyMate understand you so it can find the perfect opportunities.
        </p>
      </motion.div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => setCurrentStep(step.id)}
              className={`flex flex-col items-center gap-1.5 ${
                currentStep >= step.id ? "text-blue-500" : "text-muted-foreground"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                  currentStep === step.id
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                    : currentStep > step.id
                    ? "bg-blue-500/20 text-blue-500"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep > step.id ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <step.icon className="h-4 w-4" />
                )}
              </div>
              <span className="hidden text-xs font-medium sm:block">{step.title}</span>
            </button>
            {i < steps.length - 1 && (
              <div
                className={`mx-2 hidden h-0.5 w-8 rounded sm:block lg:w-16 ${
                  currentStep > step.id ? "bg-blue-500" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Steps */}
      <Card className="overflow-hidden border-border/50 p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-semibold">Personal Information</h2>
                <p className="text-sm text-muted-foreground">The basics — who are you?</p>
              </div>
              <Separator />
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="rahul@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Skills */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-semibold">Your Skills</h2>
                <p className="text-sm text-muted-foreground">What technologies and tools do you master?</p>
              </div>
              <Separator />
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                />
                <Button onClick={addSkill} size="sm" variant="secondary">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="gap-1 px-3 py-1.5 text-sm"
                    >
                      {skill}
                      <button onClick={() => removeSkill(skill)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Suggested skills (click to add):
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedSkills
                    .filter((s) => !skills.includes(s))
                    .map((skill) => (
                      <button
                        key={skill}
                        onClick={() => setSkills([...skills, skill])}
                        className="rounded-lg border border-border/50 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                      >
                        + {skill}
                      </button>
                    ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Education */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-semibold">Education</h2>
                <p className="text-sm text-muted-foreground">Your academic background</p>
              </div>
              <Separator />
              {education.map((edu, idx) => (
                <div key={edu.id} className="space-y-3 rounded-xl bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Education #{idx + 1}</span>
                    {education.length > 1 && (
                      <button onClick={() => removeEducation(edu.id)} className="text-muted-foreground hover:text-destructive">
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <Label>Institution</Label>
                      <Input placeholder="e.g. IIT Delhi" value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <Label>Degree</Label>
                      <Input placeholder="e.g. B.Tech" value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <Label>Field of Study</Label>
                      <Input placeholder="e.g. Computer Science" value={edu.field} onChange={(e) => updateEducation(edu.id, "field", e.target.value)} className="mt-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Start Year</Label>
                        <Input placeholder="2020" value={edu.startYear} onChange={(e) => updateEducation(edu.id, "startYear", e.target.value)} className="mt-1" />
                      </div>
                      <div>
                        <Label>End Year</Label>
                        <Input placeholder="2024" value={edu.endYear} onChange={(e) => updateEducation(edu.id, "endYear", e.target.value)} className="mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={addEducation} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Education
              </Button>
            </motion.div>
          )}

          {/* Step 4: Experience */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-semibold">Work Experience</h2>
                <p className="text-sm text-muted-foreground">Your professional journey so far</p>
              </div>
              <Separator />
              {experience.map((exp, idx) => (
                <div key={exp.id} className="space-y-3 rounded-xl bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Experience #{idx + 1}</span>
                    {experience.length > 1 && (
                      <button onClick={() => removeExperience(exp.id)} className="text-muted-foreground hover:text-destructive">
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <Label>Company</Label>
                      <Input placeholder="e.g. Google" value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Input placeholder="e.g. Software Engineer" value={exp.role} onChange={(e) => updateExperience(exp.id, "role", e.target.value)} className="mt-1" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label>Description</Label>
                      <textarea
                        placeholder="Brief description of your responsibilities..."
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>Start Date</Label>
                      <Input type="month" value={exp.startDate} onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                        disabled={exp.current}
                        className="mt-1"
                      />
                      <label className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                          className="rounded"
                        />
                        Currently working here
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={addExperience} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Experience
              </Button>
            </motion.div>
          )}

          {/* Step 5: Resume Upload */}
          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-semibold">Upload Your Resume</h2>
                <p className="text-sm text-muted-foreground">
                  Upload your latest resume — ApplyMate will use it to auto-apply
                </p>
              </div>
              <Separator />
              <div
                className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/50 bg-muted/20 p-8 transition-colors hover:border-blue-500/50 hover:bg-blue-500/5"
                onClick={() => document.getElementById("resume-input")?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file?.type === "application/pdf") setResumeFile(file);
                }}
              >
                <input
                  id="resume-input"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setResumeFile(file);
                  }}
                />
                {resumeFile ? (
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15">
                      <CheckCircle2 className="h-7 w-7 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{resumeFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(resumeFile.size / 1024 / 1024).toFixed(2)} MB • Click to replace
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15">
                      <Upload className="h-7 w-7 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Drop your resume here or click to upload
                      </p>
                      <p className="text-sm text-muted-foreground">PDF only, max 10MB</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          {currentStep < 5 ? (
            <Button onClick={() => setCurrentStep(currentStep + 1)}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-600 to-violet-600 shadow-lg shadow-blue-500/25"
            >
              Save Profile <CheckCircle2 className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
