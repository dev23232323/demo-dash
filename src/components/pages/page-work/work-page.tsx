"use client";
import {
  CountryWork,
  ResponseWorkPagination,
} from "@/@types/backend/work.types";
import { SharedCard } from "@/components/shared/shared-card";
import Pagination from "@/components/shared/shared-pagination";
import { SelectOptions } from "@/components/UI/ui-select";
import TextField from "@/components/UI/ui-text-field";
import { usePage } from "@/hooks/hook-page";
import {
  StyledCardGrid,
  StyledFlexWrapper,
  Typography,
} from "@/styled-components/styled-global";
import { StyledBlogSelect } from "@/styled-components/styled-pages/styled-blog/styled-blog-header";
import axiosInstance from "@/utils/utils";
import { FC, useEffect, useRef } from "react";
import { useQuery } from "react-query";

interface WorkPageProps {}
const WorkPage: FC<WorkPageProps> = ({}) => {
  const { page, pageSize, search, filter, jumpToPage, onPaginationClicked } =
    usePage({});

  const countryWork: CountryWork = {};

  const fetchBlogs = async (page: number, pageSize: number) => {
    const response = await axiosInstance.get<ResponseWorkPagination>(
      `/work/get-all?page=${page}&pageSize=${pageSize}&filter=${filter}&search=${search}`
    );
    return response.data;
  };

  const { data, isLoading, isError, refetch } = useQuery(
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

  data.content.map((work) => {
    if (countryWork[work.country.name] === undefined) {
      countryWork[work.country.name] = [{ ...work }];
    } else {
      countryWork[work.country.name].push({ ...work });
    }
  });

  return (
    <section>
      <WorkPageHeader />

      {data?.content.length <= 0 ? (
        <Typography $textAlign="center" $size="lg" $isBold $color="primary">
          No work found!
          {search && ` with title of \`${search}\``}
        </Typography>
      ) : (
        Object.keys(countryWork).map((key) => (
          <div key={key}>
            <Typography
              $isBold
              $size="lg"
              $margin={{ $marginY: "20px", $marginX: "5px" }}
            >
              {key}
            </Typography>
            <StyledCardGrid>
              {countryWork[key].map((work, i) => (
                <SharedCard
                  key={String(i) + work.slug}
                  {...work}
                  refetch={refetch}
                  imageAlt={work.shortDesc}
                  deleteUrl="Todo: add delete url"
                  updateUrl="Todo: add update url"
                />
              ))}
            </StyledCardGrid>
          </div>
        ))
      )}
      <Pagination
        jumpToPage={jumpToPage}
        onButtonClick={onPaginationClicked}
        {...data}
      />
    </section>
  );
};
export default WorkPage;

const WorkPageHeader = () => {
  const { search, searchTerm, setSearchTerm, handleFilterChange, filter } =
    usePage({});
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (searchInputRef.current && searchTerm != "") {
      searchInputRef.current.focus();
    }
  }, [searchInputRef, searchTerm]);

  return (
    <StyledFlexWrapper $responsive={false} $margin={{ $marginBottom: "20px" }}>
      <StyledBlogSelect onChange={handleFilterChange} defaultValue={filter}>
        <SelectOptions value={"desc"}>Newest</SelectOptions>
        <SelectOptions value={"asc"}>Oldest</SelectOptions>
      </StyledBlogSelect>

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
