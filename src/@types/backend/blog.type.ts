// This is what it will be returned from the backend when fetching all the user
// Don't change it until it is changed in the backend

import { PaginationType } from "./pagination.type";

export interface PartialBlog {
  id: string;
  shortDesc: string;
  imageUrl: string;
  slug: string;
  title: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  html: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  imageName: string;
  shortDesc: string;
}

export type ResponseBlogPagination = PaginationType<PartialBlog[]>;
