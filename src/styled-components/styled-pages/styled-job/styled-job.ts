"use client";
import Select from "@/components/UI/ui-select";
import styled, { css } from "styled-components";

// Main Jobs page
export const StyledJobAccordionWrapper = styled.section`
  overflow: hidden;
  border-radius: ${(props) => props.theme.style.borderRadius};
  margin-top: 15px;
`;

// Filter header
export const StyledJobFiltersHeader = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};

  padding: 10px 15px;
  font-weight: ${(props) => props.theme.fonts.weight.bold};

  /* display: flex; */
  /* align-items: center;
  justify-content: space-between; */
`;

export const StyledJobSelect = styled(Select)`
  margin: 0;
  width: fit-content;
`;

// Other styles

export const StyledShowCount = styled.div`
  color: inherit;
  min-width: fit-content;
`;
