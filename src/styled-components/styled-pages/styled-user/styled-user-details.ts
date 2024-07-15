"use client";
import styled from "styled-components";

export const StyledUserDetailsWrapper = styled.section<{ $gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$gap || "50px"};
`;

export const StyledUserDetailInputWrapper = styled.div`
  display: grid;
  gap: 10px;
  margin: 10px 0;
  margin-top: 30px;

  @media screen and (min-width: 741px) {
    grid-template-columns: 1fr 1fr;
  }
`;
