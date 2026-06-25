// PUT /api/faqs/[id] — protected (update)
// DELETE /api/faqs/[id] — protected (delete)

import { NextRequest, NextResponse } from "next/server";
import { updateFaq, deleteFaq, getFaqById } from "@/services/faqService";
import { requireAuth } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request);
  if (authError) return authError;

  const { id } = await params;

  if (!getFaqById(id)) {
    return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const updated = updateFaq(id, body);
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

  if (!deleteFaq(id)) {
    return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Deleted" });
}
