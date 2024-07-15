"use client";
import { PartialBlog } from "@/@types/backend/blog.type";
import { Button } from "@/components/UI/ui-button";
import { ExternalLink } from "@/components/UI/ui-icons";
import {
  StyledBlogCardWrapper,
  StyledBlogCardDescription,
  StyledBlogCardDetails,
  StyledBlogCardImage,
  BlogTypography,
} from "@/styled-components/styled-pages/styled-blog/styled-blog-card";
import { FC } from "react";

export const BlogCard: FC<PartialBlog> = (blog) => {
  return (
    <StyledBlogCardWrapper>
      <StyledBlogCardImage src={blog.imageUrl} alt="ssss" />
      <StyledBlogCardDetails>
        <div>
          <BlogTypography $isBold $size="lg">
            {blog.title}
          </BlogTypography>
          <StyledBlogCardDescription>
            {blog.shortDesc}
          </StyledBlogCardDescription>
        </div>
        <Button icon={ExternalLink} iconAlign="end">
          View
        </Button>
      </StyledBlogCardDetails>
    </StyledBlogCardWrapper>
  );
};
