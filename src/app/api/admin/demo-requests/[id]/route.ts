// PATCH /api/admin/demo-requests/[id] — protected (update status)

import { NextRequest, NextResponse } from "next/server";
import { updateDemoRequestStatus, getDemoRequestById } from "@/lib/store";
import { requireAuth } from "@/lib/auth";
import { validateStatus } from "@/lib/validators";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request);
  if (authError) return authError;

  const { id } = await params;

  if (!getDemoRequestById(id)) {
    return NextResponse.json(
      { error: "Demo request not found" },
      { status: 404 }
    );
  }

  try {
    const body = await request.json();

    if (!validateStatus(body.status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be one of: new, contacted, closed" },
        { status: 422 }
      );
    }

    const updated = updateDemoRequestStatus(id, body.status);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
