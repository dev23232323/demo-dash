// This is what it will be returned from the backend when fetching all the user

import { PaginationType } from "./pagination.type";

// Don't change it until it is changed in the backend
export interface PartialUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  hasSubscription: boolean;
  isVerified: boolean;
}

export type ResponseUserPagination = PaginationType<PartialUser[]>;
