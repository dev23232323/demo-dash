"use client";
import Sidebar from "@/components/shared/shared-sidebar";
import "../../../public/tiptap.css";

import {
  HomeLayoutWrapper,
  StyledSection,
} from "@/styled-components/styled-global";
import React, { FC } from "react";
import Navbar from "@/components/shared/shared-navbar";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <HomeLayoutWrapper>
      <Navbar />
      <Sidebar />
      <StyledSection>{children}</StyledSection>
    </HomeLayoutWrapper>
  );
};
export default Layout;
