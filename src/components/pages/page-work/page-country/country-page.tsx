"use client";
import { PartialCountry } from "@/@types/backend/work.types";
import { FC } from "react";
import { FBB_BannerPreview } from "./country-add/banner-preview";

interface CountryPageProps {
  data: PartialCountry[];
}
const CountryPage: FC<CountryPageProps> = ({ data }) => {
  return data.map((country) => (
    <FBB_BannerPreview {...country} key={country.countryCode} />
  ));
};
export default CountryPage;
