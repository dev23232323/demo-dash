import BlogUpdate from "@/components/pages/page-blog/blog-update";
import React, { FC, Suspense } from "react";

interface PageProps {}
const Page: FC<PageProps> = ({}) => {
  return (
    <Suspense fallback={"loading..."}>
      <BlogUpdate />
    </Suspense>
  );
};
export default Page;
