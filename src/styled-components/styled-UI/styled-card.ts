"use client";
import styled, { css } from "styled-components";
import { Typography } from "../styled-global";

export const StyledCardWrapper = styled.div`
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

export const StyledCardFooter = styled.div`
  margin-top: 5px;
`;

export const StyledCardContent = styled.div`
  margin-top: 2px;
  margin-bottom: 2px;
`;

export const StyledCardImage = styled.img`
  object-fit: cover;
  object-position: center;
  flex: 1;

  max-height: 10rem;

  box-sizing: border-box;
`;

export const StyledCardDetails = styled.div`
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

export const StyledCardDescription = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 90px;
  line-height: 18px;

  font-size: ${(props) => props.theme.fonts.size.small};
`;

export const StyledCardTypography = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 70px;
  line-height: 20px;

  font-weight: ${(props) => props.theme.fonts.weight.bold};
  font-size: ${(props) => props.theme.fonts.size.large};
`;
