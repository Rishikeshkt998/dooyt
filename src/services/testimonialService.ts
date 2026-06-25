import seedData from "../data/seed.json";
import type { Testimonial } from "@/types";

interface SeedTestimonial {
  id: string;
  name?: string;
  author?: string;
  role: string;
  company?: string;
  avatar?: string;
  rating?: number;
  quote: string;
}

const testimonials: Testimonial[] = (seedData.testimonials as unknown as SeedTestimonial[]).map((t) => ({
  id: t.id,
  quote: t.quote,
  author: t.name || t.author || "",
  role: t.role,
  company: t.company || "",
  avatar: t.avatar || (t.name || t.author || "").split(" ").map((n: string) => n[0]).join(""),
  rating: t.rating || 5,
}));

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

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

export function createTestimonial(data: Omit<Testimonial, "id">): Testimonial {
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
