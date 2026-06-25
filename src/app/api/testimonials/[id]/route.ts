// PUT /api/testimonials/[id] — protected (update)
// DELETE /api/testimonials/[id] — protected (delete)

import { NextRequest, NextResponse } from "next/server";
import {
  updateTestimonial,
  deleteTestimonial,
  getTestimonialById,
} from "@/lib/store";
import { requireAuth } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request);
  if (authError) return authError;

  const { id } = await params;

  if (!getTestimonialById(id)) {
    return NextResponse.json(
      { error: "Testimonial not found" },
      { status: 404 }
    );
  }

  try {
    const body = await request.json();
    const updated = updateTestimonial(id, body);
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

  if (!deleteTestimonial(id)) {
    return NextResponse.json(
      { error: "Testimonial not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Deleted" });
}
