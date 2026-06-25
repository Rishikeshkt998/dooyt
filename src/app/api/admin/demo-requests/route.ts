// GET /api/admin/demo-requests — protected (paginated + filterable)

import { NextRequest, NextResponse } from "next/server";
import { getDemoRequests } from "@/services/demoRequestService";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "10", 10)));
  const status = searchParams.get("status") || undefined;

  const result = getDemoRequests(page, limit, status);
  return NextResponse.json(result);
}
