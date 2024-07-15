"use client";
import { IconProps } from "@/@types/IconType";
import { theme } from "@/styled-components/styled-theme";
import React from "react";
import styled from "styled-components";

type Size = "sm" | "md" | "lg" | number;

export const sizeWrapper = {
  sm: "18px",
  md: "24px",
  lg: "30px",
};

interface StyledIconProps {
  size: Size;
  color: string;
  stroke: string;
  styles?: string;
  fill?: string;
  width: string | number;
  height: string | number;
}

export const StyledIcon = styled.svg<StyledIconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  stroke: ${({ stroke }) =>
    stroke === "currentColor" ? "currentColor" : stroke};
  stroke-width: 2px;

  font-size: ${({ size }) => {
    if (typeof size === "number") return `${size}px`;

    return sizeWrapper[size];
  }};

  color: ${({ color }) => (color === "inherit" ? "inherit" : color)};

  fill: ${({ fill }) => (fill ? fill : "none")};

  ${({ styles }) => styles};
`;

// export interface Props extends SVGProps<SVGSVGElement> {
//   children?: React.ReactNode | React.ReactNode[];
//   color?: Color;
//   size?: Size;
//   viewBox?: string;
//   styles?: {
//     root?: string;
//   };
// }

export const Icon: React.FC<IconProps & React.SVGProps<SVGElement>> = (
  props: IconProps
) => {
  const {
    children,
    styles,
    color = "inherit",
    stroke = "currentColor",
    size = "md",
    viewBox = "0 0 24 24",
    width = "24",
    height = "24",
    xmlns = "http://www.w3.org/2000/svg",
    ...rest
  } = props;

  return (
    <StyledIcon
      width={width}
      height={height}
      viewBox={viewBox}
      stroke={stroke === "primary" ? theme.colors.primary[900] : stroke}
      color={color}
      size={size}
      styles={styles?.root}
      {...rest}
    >
      {children}
    </StyledIcon>
  );
};

export type IconType = typeof Icon;
export default Icon;
