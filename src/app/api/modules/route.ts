// GET /api/modules — public (search + category filter)
// POST /api/modules — protected (create)

import { NextRequest, NextResponse } from "next/server";
import { getModules, createModule } from "@/services/moduleService";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || undefined;
  const category = searchParams.get("category") || undefined;

  const data = getModules(search, category);
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();

    if (!body.name || !body.category || !body.description) {
      return NextResponse.json(
        { error: "name, category, and description are required" },
        { status: 400 }
      );
    }

    const mod = createModule({
      name: body.name,
      category: body.category,
      description: body.description,
      icon: body.icon || "box",
    });

    return NextResponse.json(mod, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
