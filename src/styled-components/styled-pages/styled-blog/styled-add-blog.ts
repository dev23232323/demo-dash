"use client";
import styled from "styled-components";

export const StyledAddBlogWrapper = styled.section<{ $gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$gap || "50px"};
`;
