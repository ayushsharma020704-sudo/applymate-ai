import { NextRequest, NextResponse } from "next/server";

// POST /api/webhook/trigger-agent — Trigger job search automation
export async function POST(request: NextRequest) {
  try {
    // Verify authentication (API key or Firebase token)
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    // Allow requests with valid CRON_SECRET or in demo mode
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { platforms, keywords, jobTypes } = body as {
      platforms?: string[];
      keywords?: string[];
      jobTypes?: string[];
    };

    // In production: This endpoint would trigger your automation agent
    // Options include:
    // 1. Call an external job aggregator API
    // 2. Trigger an n8n/Make webhook for browser automation
    // 3. Run a serverless function that scrapes job listings
    // 4. Interface with an AI agent that manages applications

    // Demo response showing what the agent would do
    const agentResponse = {
      success: true,
      timestamp: new Date().toISOString(),
      agent: {
        status: "completed",
        jobsFound: Math.floor(Math.random() * 20) + 5,
        jobsMatched: Math.floor(Math.random() * 10) + 2,
        applicationsQueued: Math.floor(Math.random() * 5) + 1,
      },
      config: {
        platforms: platforms || ["linkedin", "internshala", "wellfound", "unstop"],
        keywords: keywords || ["React", "Full Stack", "Frontend"],
        jobTypes: jobTypes || ["full-time", "internship"],
      },
      message:
        "Agent scan completed. Matching jobs have been queued for application.",
    };

    return NextResponse.json(agentResponse);
  } catch (error) {
    console.error("Error triggering agent:", error);
    return NextResponse.json(
      { error: "Failed to trigger agent" },
      { status: 500 }
    );
  }
}
