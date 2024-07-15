"use client";
import { theme } from "@/styled-components/styled-theme";
import React, { FC } from "react";
import { ThemeProvider } from "styled-components";

interface StyledThemeProviderProps {
  children: React.ReactNode;
}

export const StyledThemeProvider: FC<StyledThemeProviderProps> = ({
  children,
}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
