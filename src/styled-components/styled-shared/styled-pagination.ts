"use client";
import styled from "styled-components";

interface StyledPaginationWrapperProps {
  $align: "left" | "right";
}
export const StyledPaginationWrapper = styled.div<StyledPaginationWrapperProps>`
  width: 100%;

  display: flex;
  justify-content: ${(props) => props.$align};
  align-items: center;
  padding: 20px 0;
`;

export const StyledPaginationButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  width: fit-content;
`;
