"use client";
import Select, { SelectWrapper } from "@/components/UI/ui-select";
import TextField from "@/components/UI/ui-text-field";
import styled from "styled-components";

export const StyledBlogHeaderWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

export const StyledBlogHeaderHeading = styled.h1`
  font-size: ${(props) => props.theme.fonts.size.heading1};
  color: ${(props) => props.theme.colors.primary[900]};
`;

export const StyledBlogSelect = styled(Select)`
  width: fit-content;
  margin: 0;
`;

export const StyledBlogTextField = styled(TextField)`
  margin: 0;
`;
