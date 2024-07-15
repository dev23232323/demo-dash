// This is what it will be returned from the backend when fetching all the user

import { PaginationType } from "./pagination.type";

// Don't change it until it is changed in the backend
export interface JobData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
  email: string;
}

export interface PartialJobData {
  id: string;
  createdAt: string;
  fileName: string;
  fileUrl: string;
  message: string;
}

export interface Jobs {
  other: PartialJobData;
  job: JobData;
}

export type ResponseJobPagination = PaginationType<Jobs[]>;
