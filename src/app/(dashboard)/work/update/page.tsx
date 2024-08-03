import WorkUpdatePage from "@/components/pages/page-work/work-update-page";
import React, { FC, Suspense } from "react";

interface PageProps {}
const Page: FC<PageProps> = ({}) => {
  return (
    <Suspense>
      <WorkUpdatePage />
    </Suspense>
  );
};
export default Page;
