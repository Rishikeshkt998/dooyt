// GET /api/industries — public

import { NextResponse } from "next/server";
import { getIndustries } from "@/lib/store";

export async function GET() {
  const data = getIndustries();
  return NextResponse.json({ data });
}
