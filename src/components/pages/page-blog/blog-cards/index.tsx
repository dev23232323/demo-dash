"use client";
import { FC } from "react";
import { StyledCardGrid } from "@/styled-components/styled-global";
import { useQuery } from "react-query";
import axiosInstance from "@/utils/utils";
import { ResponseBlogPagination } from "@/@types/backend/blog.type";
import Pagination from "@/components/shared/shared-pagination";
import { Typography } from "@/styled-components/styled-global";
import { SharedCard } from "@/components/shared/shared-card";
import { usePage } from "@/hooks/hook-page";

interface BlogCardProps {}
const BlogCards: FC<BlogCardProps> = ({}) => {
  const { filter, jumpToPage, onPaginationClicked, page, pageSize, search } =
    usePage({});

  const fetchBlogs = async (page: number, pageSize: number) => {
    const response = await axiosInstance.get<ResponseBlogPagination>(
      `/blog/get-all?page=${page}&pageSize=${pageSize}&filter=${filter}&search=${search}`
    );
    return response.data;
  };

  const { data, isLoading, isError, refetch } = useQuery(
    ["blogs", page, pageSize, filter, search],
    () => fetchBlogs(page, pageSize),
    {
      staleTime: Infinity, // Don't refetch until data becomes stale
      cacheTime: Infinity, // Cache the data infinitely
    }
  );

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

  return (
    <>
      <StyledCardGrid>
        {data.content.map((blog, i) => (
          <SharedCard
            key={String(i) + blog.slug}
            {...blog}
            refetch={refetch}
            imageAlt={blog.shortDesc}
            deleteUrl={`/blog/delete?id=${blog.id}`}
            updateUrl="Todo: add update url"
          />
        ))}
      </StyledCardGrid>
      <Pagination
        jumpToPage={jumpToPage}
        onButtonClick={onPaginationClicked}
        {...data}
      />
    </>
  );
};
export default BlogCards;
