"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CoverLetterModal } from "@/components/cover-letter-modal";
import { generateMockApplications } from "@/lib/mock-data";
import { formatDate, getStatusColor } from "@/lib/utils";
import type { Application } from "@/lib/types";
import {
  ClipboardList,
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";

const ITEMS_PER_PAGE = 10;

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApps, setFilteredApps] = useState<Application[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setApplications(generateMockApplications(40));
  }, []);

  useEffect(() => {
    let filtered = [...applications];

    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.company.toLowerCase().includes(term) ||
          app.role.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    if (platformFilter !== "all") {
      filtered = filtered.filter((app) => app.platform === platformFilter);
    }

    setFilteredApps(filtered);
    setCurrentPage(1);
  }, [applications, search, statusFilter, platformFilter]);

  const totalPages = Math.ceil(filteredApps.length / ITEMS_PER_PAGE);
  const paginatedApps = filteredApps.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openModal = (app: Application) => {
    setSelectedApp(app);
    setModalOpen(true);
  };

  const exportCSV = () => {
    const headers = "Company,Role,Platform,Date,Status\n";
    const rows = filteredApps
      .map(
        (app) =>
          `${app.company},${app.role},${app.platform},${formatDate(app.appliedAt)},${app.status}`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "applymate-applications.csv";
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-blue-500" />
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Application History
            </h1>
          </div>
          <p className="mt-1 text-muted-foreground">
            Track every application ApplyMate has sent on your behalf.
          </p>
        </div>
        <Button onClick={exportCSV} variant="outline" className="gap-2 w-fit">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-md border border-input bg-background pl-9 pr-8 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring appearance-none cursor-pointer"
          >
            <option value="all">All Platforms</option>
            <option value="linkedin">LinkedIn</option>
            <option value="internshala">Internshala</option>
            <option value="wellfound">Wellfound</option>
            <option value="unstop">Unstop</option>
          </select>
        </div>
      </motion.div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {paginatedApps.length} of {filteredApps.length} applications
      </p>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="overflow-hidden rounded-xl border border-border/50 bg-card"
      >
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold">Company</TableHead>
              <TableHead className="font-semibold">Role</TableHead>
              <TableHead className="font-semibold hidden sm:table-cell">Platform</TableHead>
              <TableHead className="font-semibold hidden md:table-cell">Date</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedApps.map((app, i) => (
              <motion.tr
                key={app.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="group cursor-pointer border-b border-border/30 transition-colors hover:bg-muted/30"
                onClick={() => openModal(app)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-xs font-bold text-blue-500">
                      {app.company.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="font-medium text-foreground">{app.company}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{app.role}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="secondary" className="capitalize text-xs">
                    {app.platform}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                  {formatDate(app.appliedAt)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getStatusColor(app.status)}`}
                  >
                    {app.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(app);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-9"
                >
                  {page}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Cover Letter Modal */}
      <CoverLetterModal
        application={selectedApp}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
