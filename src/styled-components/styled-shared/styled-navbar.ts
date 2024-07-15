"use client";
import styled from "styled-components";

export const StyledNavbar = styled.nav`
  display: flex;
  gap: 10px;

  background-color: ${(props) => props.theme.colors.primary[600]};
  padding: 20px 10px;

  @media screen and (min-width: ${(props) => props.theme.sizes.md}) {
    display: none;
  }

  z-index: 100;
`;
