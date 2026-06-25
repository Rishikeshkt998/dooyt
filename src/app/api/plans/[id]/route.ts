// PUT /api/plans/[id] — protected (update)
// DELETE /api/plans/[id] — protected (delete)

import { NextRequest, NextResponse } from "next/server";
import { updatePlan, deletePlan, getPlanById } from "@/lib/store";
import { requireAuth } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request);
  if (authError) return authError;

  const { id } = await params;

  if (!getPlanById(id)) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const updated = updatePlan(id, body);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request);
  if (authError) return authError;

  const { id } = await params;

  if (!deletePlan(id)) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Deleted" });
}
