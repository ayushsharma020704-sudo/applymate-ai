import { NextRequest, NextResponse } from "next/server";

// POST /api/profile — Create or update user profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, skills, education, experience, resumeUrl } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // In production: save to Firebase Firestore
    // const { adminDb } = await import("@/lib/firebase-admin");
    // await adminDb.collection("profiles").doc(uid).set({
    //   name,
    //   email,
    //   skills: skills || [],
    //   education: education || [],
    //   experience: experience || [],
    //   resumeUrl: resumeUrl || null,
    //   updatedAt: new Date().toISOString(),
    // }, { merge: true });

    // Demo mode response
    return NextResponse.json({
      success: true,
      message: "Profile saved successfully",
      data: {
        name,
        email,
        skills: skills || [],
        education: education || [],
        experience: experience || [],
        resumeUrl,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error saving profile:", error);
    return NextResponse.json(
      { error: "Failed to save profile" },
      { status: 500 }
    );
  }
}
