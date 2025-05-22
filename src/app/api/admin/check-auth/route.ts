import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // In a real app, you would verify a JWT token or session cookie here
    // For this demo, we'll check for a simple auth cookie from the request
    const authCookie = request.cookies.get("admin-auth");

    if (authCookie?.value === "authenticated") {
      return NextResponse.json({ authenticated: true }, { status: 200 });
    }

    // Not authenticated
    return NextResponse.json(
      { authenticated: false, message: "Not authenticated" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { authenticated: false, message: "Authentication check failed" },
      { status: 500 }
    );
  }
}
