import { NextRequest, NextResponse } from "next/server";
import { generateMockApplications } from "@/lib/mock-data";

// GET /api/applications — Fetch application history
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get("platform");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // In production: fetch from Firebase Firestore
    // const { adminDb } = await import("@/lib/firebase-admin");
    // let query = adminDb.collection("applications")
    //   .where("uid", "==", uid)
    //   .orderBy("appliedAt", "desc");
    // if (platform) query = query.where("platform", "==", platform);
    // if (status) query = query.where("status", "==", status);
    // const snapshot = await query.limit(limit).offset((page - 1) * limit).get();

    // Demo mode: generate mock data
    let applications = generateMockApplications(50);

    // Apply filters
    if (platform && platform !== "all") {
      applications = applications.filter((app) => app.platform === platform);
    }
    if (status && status !== "all") {
      applications = applications.filter((app) => app.status === status);
    }

    // Paginate
    const total = applications.length;
    const paginated = applications.slice((page - 1) * limit, page * limit);

    return NextResponse.json({
      success: true,
      data: paginated,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
