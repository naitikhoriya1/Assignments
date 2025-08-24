export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const getPaginationOptions = (query: any): PaginationOptions => {
  return {
    page: parseInt(query.page as string) || 1,
    limit: Math.min(parseInt(query.limit as string) || 10, 50), // Max 50 items per page
    sortBy: query.sortBy || "createdAt",
    sortOrder: (query.sortOrder as "asc" | "desc") || "desc",
  };
};

export const createPaginatedResponse = <T>(
  data: T[],
  total: number,
  options: PaginationOptions
): PaginatedResponse<T> => {
  const { page = 1, limit = 10 } = options;
  const pages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      pages,
      hasNext: page < pages,
      hasPrev: page > 1,
    },
  };
};
