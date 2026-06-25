import seedData from "../data/seed.json";
import type { FAQ } from "@/types";

const faqs: FAQ[] = JSON.parse(JSON.stringify(seedData.faqs));

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

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
