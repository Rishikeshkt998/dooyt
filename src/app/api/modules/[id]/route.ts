// PUT /api/modules/[id] — protected (update)
// DELETE /api/modules/[id] — protected (delete)

import { NextRequest, NextResponse } from "next/server";
import { updateModule, deleteModule, getModuleById } from "@/lib/store";
import { requireAuth } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request);
  if (authError) return authError;

  const { id } = await params;

  if (!getModuleById(id)) {
    return NextResponse.json({ error: "Module not found" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const updated = updateModule(id, body);
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

  if (!deleteModule(id)) {
    return NextResponse.json({ error: "Module not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Deleted" });
}
