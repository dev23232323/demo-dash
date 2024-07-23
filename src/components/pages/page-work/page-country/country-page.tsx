"use client";
import { ResponseCountryPagination } from "@/@types/backend/work.types";
import { FC } from "react";
import { FBB_BannerPreview } from "./country-add/banner-preview";
import { usePage } from "@/hooks/hook-page";
import axiosInstance from "@/utils/utils";
import { useQuery } from "react-query";
import Pagination from "@/components/shared/shared-pagination";
import {
  StyledFlexWrapper,
  Typography,
} from "@/styled-components/styled-global";
import SharedCountryBanner from "@/components/shared/shared-country-banner";

interface CountryPageProps {}
const CountryPage: FC<CountryPageProps> = () => {
  const { page, pageSize, search, filter, jumpToPage, onPaginationClicked } =
    usePage({});

  const fetchBlogs = async (page: number, pageSize: number) => {
    const response = await axiosInstance.get<ResponseCountryPagination>(
      `/work/country/get-all?page=${page}&pageSize=${pageSize}&filter=${filter}&search=${search}`
    );
    return response.data;
  };

  const { data, isLoading, isError, refetch } = useQuery(
    ["counties", page, pageSize, filter, search],
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
    <>
      <StyledFlexWrapper $justifyContent="space-between" $responsive={false}>
        <Typography $isBold $size="lg">
          All Countries
        </Typography>
        Total Countries: {data.totalResult}
      </StyledFlexWrapper>
      {data.content.map((country) => (
        <SharedCountryBanner
          {...country}
          key={country.countryCode}
          deleteUrl={`/work/country/delete?id=${country.id}`}
          updateUrl={`/work/country/update?id=${country.id}`}
          refetch={refetch}
        />
      ))}
      <Pagination
        jumpToPage={jumpToPage}
        onButtonClick={onPaginationClicked}
        {...data}
      />
    </>
  );
};
export default CountryPage;
