"use client";
import { Button } from "@/components/UI/ui-button";
import { Plus } from "@/components/UI/ui-icons";
import { SelectOptions } from "@/components/UI/ui-select";
import { useDebounce } from "@/hooks/hook-debounce";
import { StyledFlexWrapper } from "@/styled-components/styled-global";
import {
  StyledBlogHeaderHeading,
  StyledBlogHeaderWrapper,
  StyledBlogSelect,
  StyledBlogTextField,
} from "@/styled-components/styled-pages/styled-blog/styled-blog-header";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";

interface BlogHeaderProps {}
export const BlogHeader: FC<BlogHeaderProps> = ({}) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const filter = searchParams.get("filter") || "";
  const search = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(search);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    function debounce() {
      params.set("search", debouncedSearchTerm);
      params.set("page", "1");
      replace(`${pathname}?${params.toString()}`);
    }
    debounce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, replace, pathname]);

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleFilterChange(e: ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    const FilterValue = e.target.value;
    params.set("filter", FilterValue);

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <section>
      <StyledFlexWrapper $responsive={false}>
        <>
          <StyledBlogSelect onChange={handleFilterChange} defaultValue={filter}>
            <SelectOptions value={"desc"}>Newest</SelectOptions>
            <SelectOptions value={"asc"}>Oldest</SelectOptions>
          </StyledBlogSelect>
        </>
        <StyledBlogTextField
          type="search"
          ref={searchInputRef}
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </StyledFlexWrapper>
      <StyledBlogHeaderWrapper>
        <StyledBlogHeaderHeading>Blogs</StyledBlogHeaderHeading>
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
