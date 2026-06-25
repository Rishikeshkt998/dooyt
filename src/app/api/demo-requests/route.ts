// POST /api/demo-requests — public (create a lead)

import { NextRequest, NextResponse } from "next/server";
import { createDemoRequest } from "@/services/demoRequestService";
import { getPlanById } from "@/services/planService";
import { validateDemoRequest } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = validateDemoRequest(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 422 }
      );
    }

    // Check if planId is provided and exists
    if (validation.data.planId) {
      const plan = getPlanById(validation.data.planId);
      if (!plan) {
        return NextResponse.json(
          { error: "Unknown plan", details: `Plan "${validation.data.planId}" does not exist` },
          { status: 422 }
        );
      }
    }

    const demoRequest = createDemoRequest(validation.data);
    return NextResponse.json(demoRequest, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
