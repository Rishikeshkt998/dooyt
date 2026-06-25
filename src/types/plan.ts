// Plan types
export interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  description: string;
  features: string[];
  highlighted: boolean;
}

export interface PlanResponse extends Omit<Plan, "monthlyPrice"> {
  price: number;
  billing: "monthly" | "annual";
  originalPrice?: number;
}
