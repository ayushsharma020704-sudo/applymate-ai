import { NextRequest, NextResponse } from "next/server";

// GET /api/cron/daily-report — Vercel Cron Job (runs at 9 PM IST daily)
// Configured in vercel.json with schedule: "30 15 * * *" (15:30 UTC = 9:00 PM IST)
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret to prevent unauthorized access
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userEmail = process.env.USER_EMAIL;
    const resendApiKey = process.env.RESEND_API_KEY;

    // In production: Fetch today's stats from Firestore
    // const { adminDb } = await import("@/lib/firebase-admin");
    // const today = new Date().toISOString().split("T")[0];
    // const snapshot = await adminDb.collection("applications")
    //   .where("appliedAt", ">=", today)
    //   .get();

    // Demo stats
    const todayStats = {
      totalApplied: Math.floor(Math.random() * 8) + 3,
      platforms: {
        linkedin: Math.floor(Math.random() * 4) + 1,
        internshala: Math.floor(Math.random() * 3),
        wellfound: Math.floor(Math.random() * 2),
        unstop: Math.floor(Math.random() * 2),
      },
      topCompanies: ["Google", "Microsoft", "Flipkart", "Razorpay", "CRED"],
      topRoles: [
        "Frontend Developer",
        "Full Stack Developer",
        "SDE Intern",
        "React Developer",
      ],
    };

    // Send email via Resend
    if (resendApiKey && userEmail) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendApiKey);
      const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

      await resend.emails.send({
        from: `ApplyMate AI <${fromEmail}>`,
        to: userEmail,
        subject: `📊 Daily Report — ${todayStats.totalApplied} Applications Sent Today`,
        html: generateEmailHTML(todayStats),
      });

      return NextResponse.json({
        success: true,
        message: `Daily report sent to ${userEmail}`,
        stats: todayStats,
      });
    }

    // Demo mode without email
    return NextResponse.json({
      success: true,
      message: "Daily report generated (email not configured)",
      stats: todayStats,
    });
  } catch (error) {
    console.error("Error sending daily report:", error);
    return NextResponse.json(
      { error: "Failed to send daily report" },
      { status: 500 }
    );
  }
}

function generateEmailHTML(stats: {
  totalApplied: number;
  platforms: Record<string, number>;
  topCompanies: string[];
  topRoles: string[];
}): string {
  const date = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0f172a;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background:linear-gradient(135deg,#3b82f6,#8b5cf6);padding:12px 20px;border-radius:16px;margin-bottom:16px;">
        <span style="color:white;font-size:24px;font-weight:bold;">🚀 ApplyMate AI</span>
      </div>
      <h1 style="color:white;font-size:28px;margin:16px 0 4px;">Daily Application Report</h1>
      <p style="color:#94a3b8;font-size:14px;margin:0;">${date}</p>
    </div>
    
    <!-- Main Stats -->
    <div style="background:#1e293b;border-radius:16px;padding:24px;margin-bottom:20px;border:1px solid rgba(255,255,255,0.1);">
      <div style="text-align:center;">
        <p style="color:#94a3b8;font-size:14px;margin:0 0 8px;">Total Applications Today</p>
        <p style="color:#3b82f6;font-size:48px;font-weight:bold;margin:0;">${stats.totalApplied}</p>
      </div>
    </div>
    
    <!-- Platform Breakdown -->
    <div style="background:#1e293b;border-radius:16px;padding:24px;margin-bottom:20px;border:1px solid rgba(255,255,255,0.1);">
      <h2 style="color:white;font-size:18px;margin:0 0 16px;">Platform Breakdown</h2>
      ${Object.entries(stats.platforms)
        .map(
          ([platform, count]) => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
          <span style="color:#e2e8f0;text-transform:capitalize;">${platform}</span>
          <span style="color:#3b82f6;font-weight:bold;">${count} applied</span>
        </div>`
        )
        .join("")}
    </div>
    
    <!-- Companies Applied To -->
    <div style="background:#1e293b;border-radius:16px;padding:24px;margin-bottom:20px;border:1px solid rgba(255,255,255,0.1);">
      <h2 style="color:white;font-size:18px;margin:0 0 16px;">Companies Applied To</h2>
      <div>
        ${stats.topCompanies
          .map(
            (company) =>
              `<span style="display:inline-block;background:rgba(59,130,246,0.15);color:#93c5fd;padding:6px 14px;border-radius:20px;font-size:13px;margin:4px;">${company}</span>`
          )
          .join("")}
      </div>
    </div>
    
    <!-- Footer -->
    <div style="text-align:center;padding-top:20px;">
      <p style="color:#64748b;font-size:12px;">
        Sent with ❤️ by ApplyMate AI • Your job search is on autopilot
      </p>
    </div>
  </div>
</body>
</html>`;
}
