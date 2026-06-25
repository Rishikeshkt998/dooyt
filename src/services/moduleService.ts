import seedData from "../data/seed.json";
import type { Module } from "@/types";

// ── Deep-clone seed so mutations never touch the original ──
const modules: Module[] = JSON.parse(JSON.stringify(seedData.modules));

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

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

export function createModule(data: Omit<Module, "id">): Module {
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
