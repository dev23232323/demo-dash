"use client";
import styled from "styled-components";
import { css } from "styled-components";

export const HomeLayoutWrapper = styled.section`
  display: flex;
  height: 100vh;

  position: relative;

  background-color: ${(props) => props.theme.colors.primary[200]};

  @media screen and (max-width: ${(props) => props.theme.sizes.md}) {
    flex-direction: column;
  }
`;

export const StyledSection = styled.div`
  /* display: flex;
  flex-direction: column; */
  flex-grow: 1;

  padding: 30px 10px;
  background-color: ${(prop) => prop.theme.colors.primary[200]};

  max-height: 100%;
  overflow-y: scroll;
`;

export const StyledHeading = styled.h2<{
  $textAlign?: "left" | "center" | "right" | "justify";
}>`
  font-size: ${(props) => props.theme.fonts.size.heading2};
  color: ${(props) => props.theme.colors.primary[900]};

  /* display: flex;
  align-items: center; */
  gap: 20px;

  letter-spacing: 0.5px;

  ${({ $textAlign }) =>
    $textAlign &&
    css`
      text-align: ${$textAlign};
    `}

  &::first-letter {
    text-transform: uppercase;
  }
`;

interface TypographyProps {
  $isBold?: boolean;
  $isItalic?: boolean;
  $isHighlighted?: boolean;
  $color?: "white" | "black" | "primary" | "danger" | "success";
  $size?: "md" | "sm" | "lg";
  $textAlign?: "left" | "center" | "right" | "justify";
  $margin?: string | MarginProps;
}

// Explicitly type the styled component
export const Typography = styled.p<TypographyProps>`
  margin: 0;
  padding: 0;

  ${({ $isBold }) =>
    $isBold &&
    css`
      font-weight: bold;
    `}

  ${({ $isItalic }) =>
    $isItalic &&
    css`
      font-style: italic;
    `}

  ${({ $isHighlighted }) =>
    $isHighlighted &&
    css`
      background-color: yellow;
    `}

  ${({ $color, theme }) => {
    if ($color === "black") {
      return css`
        color: ${theme.colors.black};
      `;
    } else if ($color === "danger") {
      return css`
        color: ${theme.colors.danger};
      `;
    } else if ($color === "primary") {
      return css`
        color: ${theme.colors.primary[900]};
      `;
    } else if ($color === "success") {
      return css`
        color: ${theme.colors.success};
      `;
    } else if ($color === "white") {
      return css`
        color: ${theme.colors.white};
      `;
    } else {
      return css`
        color: ${$color};
      `;
    }
  }}

  ${({ $size }) => {
    if ($size === "lg") {
      return css`
        font-size: ${(props) => props.theme.fonts.size.large};
      `;
    } else if ($size === "md") {
      return css`
        font-size: ${(props) => props.theme.fonts.size.medium};
      `;
    } else if ($size === "sm") {
      return css`
        font-size: ${(props) => props.theme.fonts.size.small};
      `;
    }
  }}

  margin: ${(props) =>
    typeof props.$margin === "string" ? props.$margin : "0"};
  margin-left: ${(props) =>
    getMarginValue(props, "$marginLeft") ||
    getMarginValue(props, "$marginX") ||
    (typeof props.$margin === "string" ? props.$margin : "0")};
  margin-right: ${(props) =>
    getMarginValue(props, "$marginRight") ||
    getMarginValue(props, "$marginX") ||
    (typeof props.$margin === "string" ? props.$margin : "0")};
  margin-top: ${(props) =>
    getMarginValue(props, "$marginTop") ||
    getMarginValue(props, "$marginY") ||
    (typeof props.$margin === "string" ? props.$margin : "0")};
  margin-bottom: ${(props) =>
    getMarginValue(props, "$marginBottom") ||
    getMarginValue(props, "$marginY") ||
    (typeof props.$margin === "string" ? props.$margin : "0")};

  ${({ $textAlign }) =>
    $textAlign &&
    css`
      text-align: ${$textAlign};
    `}
`;
interface MarginProps {
  $marginX?: string;
  $marginY?: string;
  $marginTop?: string;
  $marginBottom?: string;
  $marginLeft?: string;
  $marginRight?: string;
}

interface FlexWrapperProps {
  $gap?: string;
  $alignItems?: string;
  $justifyContent?: string;
  $flexDirection?: string;
  $flexWrap?: string;
  $flexGrow?: string;
  $flexShrink?: string;
  $flexBasis?: string;
  $responsive?: boolean; // Default to true in the styled component
  $margin?: string | MarginProps;
  theme?: {
    colors: {
      primary: {
        [key: number]: string;
      };
    };
    sizes: {
      md: string;
    };
  };
}

const getMarginValue = (props: FlexWrapperProps, type: keyof MarginProps) => {
  if (typeof props.$margin === "object" && props.$margin !== null) {
    return props.$margin[type];
  }
  return undefined;
};

export const StyledFlexWrapper = styled.div<FlexWrapperProps>`
  display: flex;
  gap: ${(props) => props.$gap || "10px"};
  align-items: ${(props) => props.$alignItems || "center"};
  justify-content: ${(props) => props.$justifyContent || "flex-start"};
  flex-direction: ${(props) => props.$flexDirection || "row"};
  flex-wrap: ${(props) => props.$flexWrap || "nowrap"};
  flex-grow: ${(props) => props.$flexGrow || "0"};
  flex-shrink: ${(props) => props.$flexShrink || "1"};
  flex-basis: ${(props) => props.$flexBasis || "auto"};

  margin: ${(props) =>
    typeof props.$margin === "string" ? props.$margin : "0"};
  margin-left: ${(props) =>
    getMarginValue(props, "$marginLeft") ||
    getMarginValue(props, "$marginX") ||
    (typeof props.$margin === "string" ? props.$margin : "0")};
  margin-right: ${(props) =>
    getMarginValue(props, "$marginRight") ||
    getMarginValue(props, "$marginX") ||
    (typeof props.$margin === "string" ? props.$margin : "0")};
  margin-top: ${(props) =>
    getMarginValue(props, "$marginTop") ||
    getMarginValue(props, "$marginY") ||
    (typeof props.$margin === "string" ? props.$margin : "0")};
  margin-bottom: ${(props) =>
    getMarginValue(props, "$marginBottom") ||
    getMarginValue(props, "$marginY") ||
    (typeof props.$margin === "string" ? props.$margin : "0")};

  color: ${(props) => props.theme.colors.primary[900]};

  ${(props) =>
    (props.$responsive ?? true) &&
    css`
      @media screen and (max-width: ${props.theme.sizes.md}) {
        flex-direction: column;
      }
    `}
`;

export const StyledCardGrid = styled.section`
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
