"use client";
import {
  StyledFilterSelect,
  StyledFiltersHeader,
  StyledUserListFilterWrapper,
} from "@/styled-components/styled-pages/styled-user/styled-users-list";
import { StyledFlexWrapper } from "@/styled-components/styled-global";
import { FC, useEffect, useRef } from "react";
import { UsersAccordionList } from "./user-accordion";
import { ResponseUserPagination } from "@/@types/backend/user.type";
import { useQuery } from "react-query";
import axiosInstance from "@/utils/utils";
import Pagination from "@/components/shared/shared-pagination";
import { SelectOptions, SelectWrapper } from "@/components/UI/ui-select";
import TextField from "@/components/UI/ui-text-field";
import { usePage } from "@/hooks/hook-page";

interface UserListProps {}

const UserList: FC<UserListProps> = ({}) => {
  const {
    debouncedSearchTerm,
    filter,
    handleFilterChange,
    jumpToPage,
    onPaginationClicked,
    setSearchTerm,
    page,
    pageSize,
    search,
    searchTerm,
  } = usePage({});

  const searchInputRef = useRef<HTMLInputElement | null>(null);

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
    if (search != "" && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [search]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  if (!data?.content) return <div>No user found!</div>;

  return (
    <section>
      <TextField
        ref={searchInputRef}
        placeholder="Search..."
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
