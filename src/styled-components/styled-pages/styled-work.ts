"use client";
import styled from "styled-components";

export const StyledWorkWrapper = styled.section<{ $gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$gap || "50px"};
`;

export const StyledGridWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
