import seedData from "../data/seed.json";
import { industryImages } from "../lib/constants";
import type { Industry } from "@/types";

interface SeedIndustry {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const industries: Industry[] = (seedData.industries as unknown as SeedIndustry[]).map((ind) => ({
  ...ind,
  image: industryImages[ind.id] || "/images/solar.png",
}));

export function getIndustries(): Industry[] {
  return [...industries];
}
