import { FC, Suspense } from "react";

import { StyledBlogPageWrapper } from "@/styled-components/styled-pages/styled-blog/styled-blog";
import BlogCards from "@/components/pages/page-blog/blog-cards";

interface PageProps {}
const Page: FC<PageProps> = ({}) => {
  return (
    <StyledBlogPageWrapper>
      <Suspense fallback={"loading..."}>
        <BlogCards />
      </Suspense>
    </StyledBlogPageWrapper>
  );
};
export default Page;
