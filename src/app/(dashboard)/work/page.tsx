import WorkPage from "@/components/pages/page-work/work-page";
import WorkPageHeader from "@/components/pages/page-work/work-page-header";
import React, { FC, Suspense } from "react";

interface PageProps {}
const Page: FC<PageProps> = ({}) => {
  return (
    <Suspense>
      <WorkPageHeader />
      <WorkPage />
    </Suspense>
  );
};
export default Page;
