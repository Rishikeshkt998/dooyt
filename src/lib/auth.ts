// ──────────────────────────────────────────────
// API key authentication helper
// ──────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";

const VALID_API_KEY = "dooyt-demo-key-2026";

export function requireAuth(request: NextRequest): NextResponse | null {
  const apiKey = request.headers.get("X-Api-Key");

  if (!apiKey || apiKey !== VALID_API_KEY) {
    return NextResponse.json(
      { error: "Unauthorized", details: "Missing or invalid X-Api-Key header" },
      { status: 401 }
    );
  }

  return null; // Auth passed
}
