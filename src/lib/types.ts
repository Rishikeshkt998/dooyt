// ──────────────────────────────────────────────
// Shared TypeScript types for Dooyt
// ──────────────────────────────────────────────

export interface Module {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  icon: string;
}

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

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface DemoRequest {
  id: string;
  fullName: string;
  email: string;
  company?: string;
  phone?: string;
  planId?: string;
  message?: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
}

export interface ApiError {
  error: string;
  details?: string;
}
