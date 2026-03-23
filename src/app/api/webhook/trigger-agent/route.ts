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

    const n8nUrl = process.env.N8N_WEBHOOK_URL;
    
    // Fallback to mock behavior if n8n is not configured yet
    if (!n8nUrl) {
      console.warn("N8N_WEBHOOK_URL is not set. Running in Mock Mode.");
      return NextResponse.json({
        success: true,
        message: "Agent triggered in mock mode (n8n URL not configured).",
        timestamp: new Date().toISOString()
      });
    }

    console.log(`Triggering n8n workflow at ${n8nUrl}...`);
    
    try {
      // Send the payload to the local n8n instance
      const n8nResponse = await fetch(n8nUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platforms: platforms || ["linkedin", "internshala", "wellfound"],
          keywords: keywords || ["React", "Full Stack", "Frontend"],
          jobTypes: jobTypes || ["full-time", "internship"]
        }),
      });

      if (!n8nResponse.ok) {
        throw new Error(`n8n responded with status: ${n8nResponse.status}`);
      }
      
      return NextResponse.json({
        success: true,
        message: "Successfully triggered n8n automation agent.",
        timestamp: new Date().toISOString()
      });
      
    } catch (n8nError) {
      console.error("Failed to reach n8n webhook:", n8nError);
      return NextResponse.json(
        { error: "Could not reach the local n8n instance. Is it running?" },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("Error triggering agent:", error);
    return NextResponse.json(
      { error: "Failed to trigger agent" },
      { status: 500 }
    );
  }
}
