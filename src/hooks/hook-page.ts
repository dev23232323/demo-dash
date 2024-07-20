// Note: This hook will contain all the essential function and utility for the pagination, cards and search
// Note: As this hook will only be used in pages directory i.e. its name is hook-page

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "./hook-debounce";

interface usePageProps {}

export const usePage = ({}: usePageProps) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const page = Number(searchParams.get("page")) || 1;

  const pageSize = Number(searchParams.get("size")) || 10;
  const filter = searchParams.get("filter") || "";
  const search = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState<string>(search);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  function handleFilterChange(e: ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    const FilterValue = e.target.value;
    params.set("filter", FilterValue);
    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    function debounce() {
      if (search != debouncedSearchTerm) {
        params.set("search", debouncedSearchTerm);
        params.set("page", "1");
        replace(`${pathname}?${params.toString()}`);
      }
    }
    debounce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  function onPaginationClicked(button: "next" | "previous") {
    if (button === "previous") {
      params.set("page", String(page - 1));
    } else {
      params.set("page", String(page + 1));
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const jumpToPage = (page: number) => {
    params.set("page", String(page));
    replace(`${pathname}?${params.toString()}`);
  };

  return {
    handleFilterChange,
    replace,
    onPaginationClicked,
    jumpToPage,
    setSearchTerm,

    searchTerm,
    debouncedSearchTerm,
    pageSize,
    filter,
    page,
    searchParams,
    search,
    pathname,
    params,
  };
};
