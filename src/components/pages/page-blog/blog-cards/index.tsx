"use client";
import { FC } from "react";
import { BlogCard } from "./blog-card";
import { StyledBlogCardGrid } from "@/styled-components/styled-pages/styled-blog/styled-blog-card";
import { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import axiosInstance from "@/utils/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ResponseBlogPagination } from "@/@types/backend/blog.type";
import Pagination from "@/components/shared/shared-pagination";
import { Typography } from "@/styled-components/styled-global";

interface BlogCardProps {}
const BlogCards: FC<BlogCardProps> = ({}) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || 10;
  const filter = searchParams.get("filter") || "";
  const search = searchParams.get("search") || "";

  const fetchBlogs = async (page: number, pageSize: number) => {
    const response = await axiosInstance.get<ResponseBlogPagination>(
      `/blog/get-all?page=${page}&pageSize=${pageSize}&filter=${filter}&search=${search}`
    );
    return response.data;
  };

  const { data, isLoading, isError } = useQuery(
    ["blogs", page, pageSize, filter, search],
    () => fetchBlogs(page, pageSize),
    {
      staleTime: Infinity, // Don't refetch until data becomes stale
      cacheTime: Infinity, // Cache the data infinitely
    }
  );

  useEffect(() => {
    if (search != "" && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [search]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  if (!data?.content) return <div>No user found!</div>;
  if (data?.content.length <= 0)
    return (
      <Typography $textAlign="center" $size="lg" $isBold $color="primary">
        No blog found!
        {search && ` with title of \`${search}\``}
      </Typography>
    );

  function onPaginationClicked(button: "next" | "previous") {
    if (button === "previous") {
      params.set("page", String(page - 1));
    } else {
      params.set("page", String(page + 1));
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const jumpToPage = (page: number | "first" | "last") => {
    if (page === "first") {
      params.set("page", "1");
    } else if (page === "last") {
      params.set("page", String(data.totalPages));
    } else {
      params.set("page", String(page));
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <StyledBlogCardGrid>
        {data.content.map((blog, i) => (
          <BlogCard key={String(i) + blog.slug} {...blog} />
        ))}
      </StyledBlogCardGrid>
      <Pagination
        jumpToPage={jumpToPage}
        onButtonClick={onPaginationClicked}
        {...data}
      />
    </>
  );
};
export default BlogCards;
