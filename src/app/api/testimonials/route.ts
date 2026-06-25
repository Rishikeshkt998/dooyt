// GET /api/testimonials — public (paginated)
// POST /api/testimonials — protected (create)

import { NextRequest, NextResponse } from "next/server";
import { getTestimonials, createTestimonial } from "@/services/testimonialService";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "10", 10)));

  const result = getTestimonials(page, limit);
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();

    if (!body.quote || !body.author || !body.role || !body.company) {
      return NextResponse.json(
        { error: "quote, author, role, and company are required" },
        { status: 400 }
      );
    }

    const testimonial = createTestimonial({
      quote: body.quote,
      author: body.author,
      role: body.role,
      company: body.company,
      avatar: body.avatar || body.author.split(" ").map((n: string) => n[0]).join(""),
      rating: body.rating || 5,
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
