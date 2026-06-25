// GET /api/industries — public

import { NextResponse } from "next/server";
import { getIndustries } from "@/services/industryService";

export async function GET() {
  const data = getIndustries();
  return NextResponse.json({ data });
}
