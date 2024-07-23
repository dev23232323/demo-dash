import { PaginationType } from "./pagination.type";

export interface Country {
  countryCode: string;
  name: string;
}

export interface PartialCountry {
  id: string;
  name: string;
  countryCode: string;
  title: string;
  description: string;
  bannerImageUrl: string;
  bannerImageName: string;
  overlayImageUrl: string;
  overlayImageName: string;
}

export interface CountryType {
  id: string;
  name: string;
  countryCode: string;
  title: string;
  description: string;
  bannerImageUrl: string;
  bannerImageName: "Screenshot 2024-05-24 142045.png";
  overlayImageUrl: string;
  overlayImageName: string;
}

export interface PartialWork {
  id: string;
  title: string;
  slug: string;
  countryId: string;
  createdAt: string;
  imageUrl: string;
  imageName: string;
  shortDesc: string;
  country: {
    name: string;
  };
}

export interface CountryWork {
  [key: string]: PartialWork[];
}

export interface Work {
  id: string;
  title: string;
  html: string;
  slug: string;
  countryId: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  imageName: string;
  shortDesc: string;
}

export type ResponseWorkPagination = PaginationType<PartialWork[]>;
export type ResponseCountryPagination = PaginationType<PartialCountry[]>;
