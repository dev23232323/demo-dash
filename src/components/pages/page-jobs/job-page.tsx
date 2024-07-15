"use client";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { JobAccordionList } from "./job-accordion/job-accordion-list";
import Pagination from "@/components/shared/shared-pagination";
import {
  StyledJobAccordionWrapper,
  StyledJobFiltersHeader,
  StyledJobSelect,
  StyledShowCount,
} from "@/styled-components/styled-pages/styled-job/styled-job";
import { SelectOptions, SelectWrapper } from "@/components/UI/ui-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/hook-debounce";
import axiosInstance from "@/utils/utils";
import { ResponseJobPagination } from "@/@types/backend/job.type";
import { useQuery } from "react-query";
import TextField from "@/components/UI/ui-text-field";
import { StyledFlexWrapper } from "@/styled-components/styled-global";

interface JobPageProps {}
const JobPage: FC<JobPageProps> = ({}) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || 10;
  const filter = searchParams.get("filter") || "";
  const search = searchParams.get("search") || "";
  const refresh = Boolean(searchParams.get("refresh")) || false;

  const [searchTerm, setSearchTerm] = useState(search);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

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
    function debounce() {
      params.set("search", debouncedSearchTerm);
      params.set("page", "1"); // Reset to the first page on new search
      replace(`${pathname}?${params.toString()}`);
    }
    debounce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, replace, pathname]);

  useEffect(() => {
    if (search != "" && searchInputRef.current) {
      searchInputRef.current.focus();
    }

    if (refresh === true) {
      refetch();
      params.delete("refresh");
      replace(`${pathname}?${params.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, refresh, replace, search]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  if (!data?.content) return <div>No jobs application found!</div>;

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

  function handleFilterChange(e: ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    const FilterValue = e.target.value;
    params.set("filter", FilterValue);

    replace(`${pathname}?${params.toString()}`);
  }

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  return (
    <section>
      <TextField
        ref={searchInputRef}
        placeholder="Search..."
        type="search"
        value={searchTerm}
        onChange={handleSearchChange}
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
