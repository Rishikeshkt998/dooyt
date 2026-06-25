import type { DemoRequest } from "@/types";

const demoRequests: DemoRequest[] = [];

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

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
