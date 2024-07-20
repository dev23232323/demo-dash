"use client";
import { SelectOptions } from "@/components/UI/ui-select";
import TextField from "@/components/UI/ui-text-field";
import { usePage } from "@/hooks/hook-page";
import { StyledFlexWrapper } from "@/styled-components/styled-global";
import { StyledBlogSelect } from "@/styled-components/styled-pages/styled-blog/styled-blog-header";
import React, { FC, useEffect, useRef } from "react";

interface WorkPageHeaderProps {
  showFilter?: boolean;
}

const WorkPageHeader: FC<WorkPageHeaderProps> = ({ showFilter = true }) => {
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
      {showFilter && (
        <StyledBlogSelect onChange={handleFilterChange} defaultValue={filter}>
          <SelectOptions value={"desc"}>Newest</SelectOptions>
          <SelectOptions value={"asc"}>Oldest</SelectOptions>
        </StyledBlogSelect>
      )}

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
export default WorkPageHeader;
