import seedData from "../data/seed.json";
import type { Plan, PlanResponse } from "@/types";

interface SeedPlan {
  id: string;
  name: string;
  tagline?: string;
  description?: string;
  monthlyPrice: number;
  features: string[];
  isPopular?: boolean;
  highlighted?: boolean;
}

const plans: Plan[] = (seedData.plans as unknown as SeedPlan[]).map((p) => ({
  id: p.id,
  name: p.name,
  monthlyPrice: p.monthlyPrice,
  description: p.tagline || p.description || "",
  features: p.features,
  highlighted: p.isPopular || p.highlighted || false,
}));

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function getPlans(billing: "monthly" | "annual" = "monthly"): PlanResponse[] {
  return plans.map((p) => {
    const price =
      billing === "annual"
        ? Math.round(p.monthlyPrice * 0.85 * 100) / 100
        : p.monthlyPrice;

    const response: PlanResponse = {
      id: p.id,
      name: p.name,
      description: p.description,
      features: p.features,
      highlighted: p.highlighted,
      price,
      billing,
    };

    if (billing === "annual") {
      response.originalPrice = p.monthlyPrice;
    }

    return response;
  });
}

export function getPlanById(id: string): Plan | undefined {
  return plans.find((p) => p.id === id);
}

export function createPlan(data: Omit<Plan, "id">): Plan {
  const plan: Plan = { id: generateId("plan"), ...data };
  plans.push(plan);
  return plan;
}

export function updatePlan(
  id: string,
  data: Partial<Omit<Plan, "id">>
): Plan | null {
  const idx = plans.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  plans[idx] = { ...plans[idx], ...data };
  return plans[idx];
}

export function deletePlan(id: string): boolean {
  const idx = plans.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  plans.splice(idx, 1);
  return true;
}
