"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PlatformCard } from "@/components/platform-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Settings2, Plus, X, Save, MapPin } from "lucide-react";
import type { Platform, JobType } from "@/lib/types";

const jobTypeConfig: Record<JobType, { label: string; emoji: string }> = {
  "full-time": { label: "Full-Time", emoji: "💼" },
  internship: { label: "Internship", emoji: "🎓" },
  "part-time": { label: "Part-Time", emoji: "⏰" },
  remote: { label: "Remote", emoji: "🌍" },
  contract: { label: "Contract", emoji: "📝" },
};

export default function PreferencesPage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([
    "linkedin",
    "internshala",
  ]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<JobType[]>([
    "full-time",
    "internship",
  ]);
  const [keywords, setKeywords] = useState<string[]>([
    "React",
    "Frontend",
    "Full Stack",
  ]);
  const [keywordInput, setKeywordInput] = useState("");
  const [locations, setLocations] = useState<string[]>(["Bangalore", "Remote"]);
  const [locationInput, setLocationInput] = useState("");

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const toggleJobType = (type: JobType) => {
    setSelectedJobTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const addLocation = () => {
    if (locationInput.trim() && !locations.includes(locationInput.trim())) {
      setLocations([...locations, locationInput.trim()]);
      setLocationInput("");
    }
  };

  const handleSave = () => {
    toast.success("Preferences saved! ApplyMate will use these settings.");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2">
          <Settings2 className="h-5 w-5 text-blue-500" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Job Preferences
          </h1>
        </div>
        <p className="mt-1 text-muted-foreground">
          Configure where and what ApplyMate should look for. The more specific, the better the matches.
        </p>
      </motion.div>

      {/* Platforms */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div>
          <h2 className="text-lg font-semibold text-foreground">Platforms</h2>
          <p className="text-sm text-muted-foreground">
            Select the job platforms you want ApplyMate to scan
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(["linkedin", "internshala", "wellfound", "unstop"] as Platform[]).map(
            (platform) => (
              <PlatformCard
                key={platform}
                platform={platform}
                selected={selectedPlatforms.includes(platform)}
                onToggle={togglePlatform}
              />
            )
          )}
        </div>
      </motion.div>

      <Separator />

      {/* Job Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <div>
          <h2 className="text-lg font-semibold text-foreground">Job Types</h2>
          <p className="text-sm text-muted-foreground">
            What kind of roles are you looking for?
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {(Object.entries(jobTypeConfig) as [JobType, { label: string; emoji: string }][]).map(
            ([type, config]) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleJobType(type)}
                className={`inline-flex items-center gap-2 rounded-xl border-2 px-5 py-3 text-sm font-medium transition-all ${
                  selectedJobTypes.includes(type)
                    ? "border-blue-500/50 bg-blue-500/10 text-foreground shadow-sm"
                    : "border-border/50 bg-card text-muted-foreground hover:border-border"
                }`}
              >
                <span>{config.emoji}</span>
                {config.label}
              </motion.button>
            )
          )}
        </div>
      </motion.div>

      <Separator />

      {/* Keywords */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <div>
          <h2 className="text-lg font-semibold text-foreground">Keywords</h2>
          <p className="text-sm text-muted-foreground">
            Skills and technologies to match in job listings
          </p>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Add a keyword..."
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
          />
          <Button onClick={addKeyword} variant="secondary">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword) => (
            <Badge
              key={keyword}
              variant="secondary"
              className="gap-1.5 px-3 py-1.5 text-sm"
            >
              {keyword}
              <button onClick={() => setKeywords(keywords.filter((k) => k !== keyword))}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </motion.div>

      <Separator />

      {/* Locations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <div>
            <h2 className="text-lg font-semibold text-foreground">Locations</h2>
            <p className="text-sm text-muted-foreground">Preferred work locations</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Add a location..."
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLocation())}
          />
          <Button onClick={addLocation} variant="secondary">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {locations.map((location) => (
            <Badge
              key={location}
              variant="outline"
              className="gap-1.5 px-3 py-1.5 text-sm"
            >
              📍 {location}
              <button onClick={() => setLocations(locations.filter((l) => l !== location))}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-end pt-4"
      >
        <Button
          onClick={handleSave}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-violet-600 px-8 shadow-lg shadow-blue-500/25"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Preferences
        </Button>
      </motion.div>
    </div>
  );
}
