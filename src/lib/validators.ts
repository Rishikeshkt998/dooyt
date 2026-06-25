// ──────────────────────────────────────────────
// Request body validation helpers
// ──────────────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export interface DemoRequestBody {
  fullName: string;
  email: string;
  company?: string;
  phone?: string;
  planId?: string;
  message?: string;
}

export function validateDemoRequest(
  body: Record<string, unknown>
): { valid: true; data: DemoRequestBody } | { valid: false; error: string } {
  if (!body.fullName || typeof body.fullName !== "string" || body.fullName.trim() === "") {
    return { valid: false, error: "fullName is required" };
  }

  if (!body.email || typeof body.email !== "string" || body.email.trim() === "") {
    return { valid: false, error: "email is required" };
  }

  if (!validateEmail(body.email as string)) {
    return { valid: false, error: "Invalid email format" };
  }

  return {
    valid: true,
    data: {
      fullName: (body.fullName as string).trim(),
      email: (body.email as string).trim(),
      company: body.company ? String(body.company).trim() : undefined,
      phone: body.phone ? String(body.phone).trim() : undefined,
      planId: body.planId ? String(body.planId).trim() : undefined,
      message: body.message ? String(body.message).trim() : undefined,
    },
  };
}

export function validateStatus(
  status: unknown
): status is "new" | "contacted" | "closed" {
  return (
    typeof status === "string" &&
    ["new", "contacted", "closed"].includes(status)
  );
}
