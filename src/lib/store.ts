// ──────────────────────────────────────────────
// In-memory data store — loads seed.json once
// ──────────────────────────────────────────────

import seedData from "../../seed.json";
import type {
  Module,
  Industry,
  Plan,
  PlanResponse,
  Testimonial,
  FAQ,
  DemoRequest,
} from "@/types";

// ── Deep-clone seed so mutations never touch the original ──
const modules: Module[] = JSON.parse(JSON.stringify(seedData.modules));
const industries: Industry[] = JSON.parse(JSON.stringify(seedData.industries));
const plans: Plan[] = JSON.parse(JSON.stringify(seedData.plans));
const testimonials: Testimonial[] = (seedData.testimonials as any[]).map((t) => ({
  id: t.id,
  quote: t.quote,
  author: t.name || t.author || "",
  role: t.role,
  company: t.company || "",
  avatar: t.avatar || (t.name || t.author || "").split(" ").map((n: string) => n[0]).join(""),
  rating: t.rating || 5,
}));
const faqs: FAQ[] = JSON.parse(JSON.stringify(seedData.faqs));
const demoRequests: DemoRequest[] = [];

// ── Helpers ──

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

// ── Modules ──

export function getModules(search?: string, category?: string): Module[] {
  let result = [...modules];
  if (category) {
    result = result.filter(
      (m) => m.category.toLowerCase() === category.toLowerCase()
    );
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
    );
  }
  return result;
}

export function getModuleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

export function createModule(
  data: Omit<Module, "id">
): Module {
  const mod: Module = { id: generateId("mod"), ...data };
  modules.push(mod);
  return mod;
}

export function updateModule(
  id: string,
  data: Partial<Omit<Module, "id">>
): Module | null {
  const idx = modules.findIndex((m) => m.id === id);
  if (idx === -1) return null;
  modules[idx] = { ...modules[idx], ...data };
  return modules[idx];
}

export function deleteModule(id: string): boolean {
  const idx = modules.findIndex((m) => m.id === id);
  if (idx === -1) return false;
  modules.splice(idx, 1);
  return true;
}

// ── Industries ──

export function getIndustries(): Industry[] {
  return [...industries];
}

// ── Plans ──

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

export function createPlan(
  data: Omit<Plan, "id">
): Plan {
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

// ── Testimonials ──

export function getTestimonials(
  page: number = 1,
  limit: number = 10
): { data: Testimonial[]; page: number; limit: number; total: number } {
  const total = testimonials.length;
  const start = (page - 1) * limit;
  const data = testimonials.slice(start, start + limit);
  return { data, page, limit, total };
}

export function getTestimonialById(id: string): Testimonial | undefined {
  return testimonials.find((t) => t.id === id);
}

export function createTestimonial(
  data: Omit<Testimonial, "id">
): Testimonial {
  const t: Testimonial = { id: generateId("test"), ...data };
  testimonials.push(t);
  return t;
}

export function updateTestimonial(
  id: string,
  data: Partial<Omit<Testimonial, "id">>
): Testimonial | null {
  const idx = testimonials.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  testimonials[idx] = { ...testimonials[idx], ...data };
  return testimonials[idx];
}

export function deleteTestimonial(id: string): boolean {
  const idx = testimonials.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  testimonials.splice(idx, 1);
  return true;
}

// ── FAQs ──

export function getFaqs(): FAQ[] {
  return [...faqs];
}

export function getFaqById(id: string): FAQ | undefined {
  return faqs.find((f) => f.id === id);
}

export function createFaq(data: Omit<FAQ, "id">): FAQ {
  const faq: FAQ = { id: generateId("faq"), ...data };
  faqs.push(faq);
  return faq;
}

export function updateFaq(
  id: string,
  data: Partial<Omit<FAQ, "id">>
): FAQ | null {
  const idx = faqs.findIndex((f) => f.id === id);
  if (idx === -1) return null;
  faqs[idx] = { ...faqs[idx], ...data };
  return faqs[idx];
}

export function deleteFaq(id: string): boolean {
  const idx = faqs.findIndex((f) => f.id === id);
  if (idx === -1) return false;
  faqs.splice(idx, 1);
  return true;
}

// ── Demo Requests ──

export function createDemoRequest(
  data: Omit<DemoRequest, "id" | "status" | "createdAt">
): DemoRequest {
  const dr: DemoRequest = {
    id: generateId("demo"),
    ...data,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  demoRequests.push(dr);
  return dr;
}

export function getDemoRequests(
  page: number = 1,
  limit: number = 10,
  status?: string
): { data: DemoRequest[]; page: number; limit: number; total: number } {
  let filtered = [...demoRequests];
  if (status) {
    filtered = filtered.filter((d) => d.status === status);
  }
  const total = filtered.length;
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);
  return { data, page, limit, total };
}

export function getDemoRequestById(id: string): DemoRequest | undefined {
  return demoRequests.find((d) => d.id === id);
}

export function updateDemoRequestStatus(
  id: string,
  status: "new" | "contacted" | "closed"
): DemoRequest | null {
  const idx = demoRequests.findIndex((d) => d.id === id);
  if (idx === -1) return null;
  demoRequests[idx].status = status;
  return demoRequests[idx];
}
