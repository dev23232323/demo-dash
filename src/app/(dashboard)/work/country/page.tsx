"use client";
import { FC } from "react";
import CountryPage from "@/components/pages/page-work/page-country/country-page";
import WorkPageHeader from "@/components/pages/page-work/work-page-header";

interface PageProps {}
const Page: FC<PageProps> = ({}) => {
  return (
    <section>
      <WorkPageHeader showFilter={false} />
      <CountryPage />
    </section>
  );
};
export default Page;
