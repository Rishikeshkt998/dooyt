// GET /api/plans — public (billing filter)
// POST /api/plans — protected (create)

import { NextRequest, NextResponse } from "next/server";
import { getPlans, createPlan } from "@/lib/store";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const billing = searchParams.get("billing") as "monthly" | "annual" | null;

  const data = getPlans(billing === "annual" ? "annual" : "monthly");
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();

    if (!body.name || body.monthlyPrice === undefined || !body.features) {
      return NextResponse.json(
        { error: "name, monthlyPrice, and features are required" },
        { status: 400 }
      );
    }

    const plan = createPlan({
      name: body.name,
      monthlyPrice: body.monthlyPrice,
      description: body.description || "",
      features: body.features,
      highlighted: body.highlighted || false,
    });

    return NextResponse.json(plan, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
