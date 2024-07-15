"use client";
import {
  StyledFilterSelect,
  StyledFiltersHeader,
  StyledUserListFilterWrapper,
} from "@/styled-components/styled-pages/styled-user/styled-users-list";
import { StyledFlexWrapper } from "@/styled-components/styled-global";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { UsersAccordionList } from "./user-accordion";
import { ResponseUserPagination } from "@/@types/backend/user.type";
import { useQuery } from "react-query";
import axiosInstance from "@/utils/utils";
import Pagination from "@/components/shared/shared-pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SelectOptions, SelectWrapper } from "@/components/UI/ui-select";
import TextField from "@/components/UI/ui-text-field";
import { useDebounce } from "@/hooks/hook-debounce";

interface UserListProps {}

const UserList: FC<UserListProps> = ({}) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || 10;
  const filter = searchParams.get("filter") || "";
  const search = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(search);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchUsers = async (page: number, pageSize: number) => {
    const response = await axiosInstance.get<ResponseUserPagination>(
      `/user/get-all?page=${page}&pageSize=${pageSize}&filter=${filter}&search=${debouncedSearchTerm}`
    );
    return response.data;
  };

  const { data, isLoading, isError } = useQuery(
    ["users", page, pageSize, filter, debouncedSearchTerm],
    () => fetchUsers(page, pageSize),
    {
      staleTime: Infinity, // Don't refetch until data becomes stale
      cacheTime: Infinity, // Cache the data infinitely
    }
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
  }, [search]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  if (!data?.content) return <div>No user found!</div>;

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
      <StyledUserListFilterWrapper>
        <StyledFiltersHeader>
          <StyledFlexWrapper $responsive={false}>
            Filter:
            <SelectWrapper>
              <StyledFilterSelect
                onChange={handleFilterChange}
                defaultValue={filter}
              >
                <SelectOptions value={"asc"}>A-Z</SelectOptions>
                <SelectOptions value={"desc"}>Z-A</SelectOptions>
                <SelectOptions value={"newest"}>Newest</SelectOptions>
                <SelectOptions value={"oldest"}>Oldest</SelectOptions>
                <SelectOptions value={"verified"}>Is Verified</SelectOptions>
                <SelectOptions value={"subscription"}>
                  Has Subscription
                </SelectOptions>
              </StyledFilterSelect>
            </SelectWrapper>
          </StyledFlexWrapper>
          <StyledFlexWrapper>Total Users: {data.totalResult}</StyledFlexWrapper>
        </StyledFiltersHeader>
        <UsersAccordionList users={data.content} />
      </StyledUserListFilterWrapper>
      <Pagination
        onButtonClick={onPaginationClicked}
        jumpToPage={jumpToPage}
        {...data}
      />
    </section>
  );
};

export default UserList;
