"use client";
import { Button } from "@/components/UI/ui-button";
import { Plus } from "@/components/UI/ui-icons";
import { SelectOptions } from "@/components/UI/ui-select";
import TextField from "@/components/UI/ui-text-field";
import { usePage } from "@/hooks/hook-page";
import { StyledFlexWrapper } from "@/styled-components/styled-global";
import {
  StyledBlogHeaderHeading,
  StyledBlogHeaderWrapper,
  StyledBlogSelect,
} from "@/styled-components/styled-pages/styled-blog/styled-blog-header";
import Link from "next/link";
import { FC } from "react";

interface BlogHeaderProps {
  totalBlogs: number;
}

export const BlogHeader: FC<BlogHeaderProps> = ({ totalBlogs }) => {
  const { filter, handleFilterChange, setSearchTerm, searchTerm } = usePage({});

  return (
    <section>
      <StyledFlexWrapper $responsive={false}>
        <StyledBlogSelect onChange={handleFilterChange} defaultValue={filter}>
          <SelectOptions value={"desc"}>Newest</SelectOptions>
          <SelectOptions value={"asc"}>Oldest</SelectOptions>
        </StyledBlogSelect>

        <TextField
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </StyledFlexWrapper>
      <StyledBlogHeaderWrapper>
        <StyledFlexWrapper
          $flexDirection="column"
          $responsive={false}
          $alignItems="start"
        >
          <StyledBlogHeaderHeading>Blogs</StyledBlogHeaderHeading>
          Total Blogs: {totalBlogs}
        </StyledFlexWrapper>
        <Link href={"/blog/addBlog"}>
          <Button icon={Plus} iconAlign="end">
            Add Blog
          </Button>
        </Link>
      </StyledBlogHeaderWrapper>
    </section>
  );
};
export default BlogHeader;
