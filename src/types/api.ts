// Shared generic API types
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
