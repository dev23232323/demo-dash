import { Logo, Menu } from "@/components/UI/ui-icons";
import { StyledNavbar } from "@/styled-components/styled-shared/styled-navbar";
import Link from "next/link";
import React, { FC } from "react";

interface NavbarProps {
  onClick: () => void;
}

export const Navbar: FC<NavbarProps> = ({ onClick }) => {
  return (
    <StyledNavbar>
      <Menu onClick={onClick} />
      <Link href={"/"}>
        <Logo />
      </Link>
    </StyledNavbar>
  );
};
