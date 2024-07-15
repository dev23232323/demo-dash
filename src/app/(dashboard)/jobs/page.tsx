import JobPage from "@/components/pages/page-jobs/job-page";
import React, { FC, Suspense } from "react";

interface PageProps {}
const Page: FC<PageProps> = ({}) => {
  return (
    <Suspense fallback={"loading..."}>
      <JobPage />
    </Suspense>
  );
};
export default Page;
