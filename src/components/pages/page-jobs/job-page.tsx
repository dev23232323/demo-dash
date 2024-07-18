"use client";
import { FC, useEffect, useRef } from "react";
import { JobAccordionList } from "./job-accordion/job-accordion-list";
import Pagination from "@/components/shared/shared-pagination";
import {
  StyledJobAccordionWrapper,
  StyledJobFiltersHeader,
  StyledJobSelect,
  StyledShowCount,
} from "@/styled-components/styled-pages/styled-job/styled-job";
import { SelectOptions, SelectWrapper } from "@/components/UI/ui-select";
import axiosInstance from "@/utils/utils";
import { ResponseJobPagination } from "@/@types/backend/job.type";
import { useQuery } from "react-query";
import TextField from "@/components/UI/ui-text-field";
import { StyledFlexWrapper } from "@/styled-components/styled-global";
import { usePage } from "@/hooks/hook-page";

interface JobPageProps {}
const JobPage: FC<JobPageProps> = ({}) => {
  const {
    debouncedSearchTerm,
    filter,
    handleFilterChange,
    jumpToPage,
    onPaginationClicked,
    page,
    pageSize,
    params,
    pathname,
    replace,
    search,
    searchParams,
    searchTerm,
    setSearchTerm,
  } = usePage({});

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const refresh = Boolean(searchParams.get("refresh")) || false;

  const fetchJobs = async (page: number, pageSize: number) => {
    const response = await axiosInstance.get<ResponseJobPagination>(
      `/jobs/get-all?page=${page}&pageSize=${pageSize}&filter=${filter}&search=${debouncedSearchTerm}`
    );
    return response.data;
  };

  const { data, isLoading, isError, refetch } = useQuery(
    ["jobs", page, pageSize, filter, debouncedSearchTerm, refresh],
    () => fetchJobs(page, pageSize)
  );

  useEffect(() => {
    if (refresh === true) {
      refetch();
      params.delete("refresh");
      replace(`${pathname}?${params.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, refresh, replace, search]);

  useEffect(() => {
    if (search != "" && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [search]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  if (!data?.content) return <div>No jobs application found!</div>;

  return (
    <section>
      <TextField
        ref={searchInputRef}
        placeholder="Search..."
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <StyledJobAccordionWrapper>
        <StyledJobFiltersHeader>
          <StyledFlexWrapper $responsive={false}>
            Filter:
            <SelectWrapper>
              <StyledJobSelect
                onChange={handleFilterChange}
                defaultValue={filter}
              >
                <SelectOptions value={"asc"}>A-Z</SelectOptions>
                <SelectOptions value={"desc"}>Z-A</SelectOptions>
                <SelectOptions value={"newest"}>Newest</SelectOptions>
                <SelectOptions value={"oldest"}>Oldest</SelectOptions>
              </StyledJobSelect>
            </SelectWrapper>
            <StyledShowCount>Total Result: {data.totalResult}</StyledShowCount>
          </StyledFlexWrapper>
        </StyledJobFiltersHeader>
        <JobAccordionList jobs={data.content} />
      </StyledJobAccordionWrapper>
      <Pagination
        jumpToPage={jumpToPage}
        onButtonClick={onPaginationClicked}
        {...data}
      />
    </section>
  );
};
export default JobPage;
