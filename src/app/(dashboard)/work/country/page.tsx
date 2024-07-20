"use client";
import { ResponseCountryPagination } from "@/@types/backend/work.types";
import { usePage } from "@/hooks/hook-page";
import axiosInstance from "@/utils/utils";
import { FC, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import CountryPage from "@/components/pages/page-work/page-country/country-page";
import Pagination from "@/components/shared/shared-pagination";
import {
  StyledFlexWrapper,
  Typography,
} from "@/styled-components/styled-global";
import TextField from "@/components/UI/ui-text-field";

interface PageProps {}
const Page: FC<PageProps> = ({}) => {
  const { page, pageSize, search, filter, jumpToPage, onPaginationClicked } =
    usePage({});

  const fetchBlogs = async (page: number, pageSize: number) => {
    const response = await axiosInstance.get<ResponseCountryPagination>(
      `/work/country/get-all?page=${page}&pageSize=${pageSize}&filter=${filter}&search=${search}`
    );
    return response.data;
  };

  const { data, isLoading, isError } = useQuery(
    ["works", page, pageSize, filter, search],
    () => fetchBlogs(page, pageSize),
    {
      staleTime: Infinity, // Don't refetch until data becomes stale
      cacheTime: Infinity, // Cache the data infinitely
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  if (!data?.content) return <div>No work found!</div>;

  return (
    <section>
      <CountryPageHeader />
      <StyledFlexWrapper $justifyContent="space-between" $responsive={false}>
        <Typography $isBold $size="lg">
          All Countries
        </Typography>
        Total countries: {data.totalResult}
      </StyledFlexWrapper>
      <CountryPage data={data.content} />
      <Pagination
        jumpToPage={jumpToPage}
        onButtonClick={onPaginationClicked}
        {...data}
      />
    </section>
  );
};
export default Page;

const CountryPageHeader = () => {
  const { search, searchTerm, setSearchTerm } = usePage({});
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (searchInputRef.current && searchTerm != "") {
      searchInputRef.current.focus();
    }
  }, [searchInputRef, searchTerm]);

  return (
    <StyledFlexWrapper $responsive={false} $margin={{ $marginBottom: "20px" }}>
      <TextField
        ref={searchInputRef}
        type="search"
        placeholder="Search..."
        value={searchTerm}
        defaultValue={search}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </StyledFlexWrapper>
  );
};
