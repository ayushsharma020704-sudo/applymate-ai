"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Building2, MapPin, Calendar, DollarSign, FileText } from "lucide-react";
import { formatDate, getStatusColor } from "@/lib/utils";
import type { Application } from "@/lib/types";

interface CoverLetterModalProps {
  application: Application | null;
  open: boolean;
  onClose: () => void;
}

export function CoverLetterModal({
  application,
  open,
  onClose,
}: CoverLetterModalProps) {
  if (!application) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Application Details</DialogTitle>
        </DialogHeader>

        {/* Job Info */}
        <div className="rounded-xl bg-muted/50 p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {application.role}
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" />
                  {application.company}
                </span>
                {application.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {application.location}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(application.appliedAt)}
                </span>
                {application.salary && (
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5" />
                    {application.salary}
                  </span>
                )}
              </div>
            </div>
            <Badge
              variant="outline"
              className={getStatusColor(application.status)}
            >
              {application.status}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Cover Letter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-4 w-4 text-blue-500" />
            <h4 className="font-semibold text-foreground">Cover Letter</h4>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-5">
            <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-line">
              {application.coverLetter || "No cover letter generated for this application."}
            </p>
          </div>
        </div>

        {/* Platform Badge */}
        <div className="flex items-center justify-between pt-2">
          <Badge variant="secondary" className="capitalize">
            {application.platform}
          </Badge>
          {application.jobUrl && (
            <a
              href={application.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline"
            >
              View Original Posting →
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
