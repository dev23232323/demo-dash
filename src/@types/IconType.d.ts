import { SVGProps } from "react";
import { CustomThemeTypes } from "@/styled-components/styled-theme";
import { DefaultTheme } from "styled-components";

export interface IconProps extends SVGProps<SVGSVGElement> {
  children?: React.ReactNode | React.ReactNode[];
  color?: string;
  stroke?: string | "primary";
  size?: number;
  viewBox?: string;
  styles?: {
    root?: string;
  };
}
