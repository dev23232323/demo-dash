import WorkPage from "@/components/pages/page-work/work-page";
import WorkPageHeader from "@/components/pages/page-work/work-page-header";
import React, { FC } from "react";

interface PageProps {}
const Page: FC<PageProps> = ({}) => {
  return (
    <>
      <WorkPageHeader />
      <WorkPage />
    </>
  );
};
export default Page;
