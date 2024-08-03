"use client";
import { FC, Suspense } from "react";
import CountryPage from "@/components/pages/page-work/page-country/country-page";
import WorkPageHeader from "@/components/pages/page-work/work-page-header";

interface PageProps {}
const Page: FC<PageProps> = ({}) => {
  return (
    <section>
      <Suspense>
        <WorkPageHeader showFilter={false} />
        <CountryPage />
      </Suspense>
    </section>
  );
};
export default Page;
