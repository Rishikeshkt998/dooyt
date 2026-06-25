// Demo Request type
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
