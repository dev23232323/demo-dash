// This is what it will be returned from the backend when fetching all the user
// Don't change it until it is changed in the backend

export interface PaginationType<T> {
  hasNext: boolean;
  hasPrevious: boolean;
  page: number;
  pageSize: number;
  totalPages: number;
  totalResult: number;
  content: T;
}
