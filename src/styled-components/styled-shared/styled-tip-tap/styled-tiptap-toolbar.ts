"use client";
import styled from "styled-components";

export const StyledToolbarIconsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 8px 10px;
  background-color: ${(props) => props.theme.colors.primary[900]};
  border-top-right-radius: ${(props) => props.theme.style.borderRadius};
  border-top-left-radius: ${(props) => props.theme.style.borderRadius};

  position: sticky;
  top: -30px;
  z-index: 2;
`;
