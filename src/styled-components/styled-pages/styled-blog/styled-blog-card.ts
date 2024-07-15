"use client";
import { Typography } from "@/styled-components/styled-global";
import styled from "styled-components";

export const StyledBlogCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;

  width: 100%;
  height: 100%;
  transition: all ease-in-out 0.2s;
  padding-bottom: 20px;
  border-radius: ${(props) => props.theme.style.borderRadius};
  overflow: hidden;
  /* color: ${(props) => props.theme.colors.primary[900]}; */

  &:hover {
    scale: 1.01;
    box-shadow: 2px 5px 10px ${(props) => props.theme.colors.black};
  }

  background-color: ${(props) => props.theme.colors.primary[400]};
  max-width: ${(props) => props.theme.sizes.xs};
`;

export const StyledBlogCardImage = styled.img`
  object-fit: cover;
  object-position: center;
  flex: 1;

  max-height: 10rem;

  box-sizing: border-box;
`;

export const StyledBlogCardDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
  padding: 5px 15px;
  flex: 1;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const StyledBlogCardDescription = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 90px;
  line-height: 18px;

  font-size: ${(props) => props.theme.fonts.size.small};
`;

export const StyledBlogCardGrid = styled.section`
  display: grid;
  grid-gap: 20px;

  place-items: center;
  grid-template-columns: 1fr;

  ${({ theme }) => `
    @media (min-width: ${theme.sizes.md}) {
      grid-template-columns: repeat(2, 1fr); /* 2 columns for medium screens */
    }

    @media (min-width: ${theme.sizes.lg}) {
      grid-template-columns: repeat(3, 1fr); /* 3 columns for large screens */
    }

    @media (min-width: ${theme.sizes["2xl"]}) {
      grid-template-columns: repeat(4, 1fr); /* 4 columns for extra large screens */
    }
  `}
`;

export const BlogTypography = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 70px;
  line-height: 20px;
`;
