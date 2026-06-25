// GET /api/faqs — public
// POST /api/faqs — protected (create)

import { NextRequest, NextResponse } from "next/server";
import { getFaqs, createFaq } from "@/lib/store";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  const data = getFaqs();
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();

    if (!body.question || !body.answer) {
      return NextResponse.json(
        { error: "question and answer are required" },
        { status: 400 }
      );
    }

    const faq = createFaq({
      question: body.question,
      answer: body.answer,
    });

    return NextResponse.json(faq, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
