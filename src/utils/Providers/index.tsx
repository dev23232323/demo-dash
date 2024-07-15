"use client";
import React, { FC } from "react";
import { StyledThemeProvider } from "./provider-styled-theme";
import StyledComponentsRegistry from "./provider-styled-component-registry";
import { SidebarContextProvider } from "@/context/context-sidebar/provider";
import ReactQueryProvider from "./provider-react-query";
import ReactReduxProvider from "./provider-react-redux";
import AuthProvider from "./provider-auth";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <ReactReduxProvider>
        <AuthProvider>
          <StyledComponentsRegistry>
            <StyledThemeProvider>
              <SidebarContextProvider>{children}</SidebarContextProvider>
            </StyledThemeProvider>
          </StyledComponentsRegistry>
        </AuthProvider>
      </ReactReduxProvider>
    </ReactQueryProvider>
  );
};
export default Providers;
