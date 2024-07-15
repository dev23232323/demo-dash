import { FC } from "react";
import { Logo, UserIcon } from "@/components/UI/ui-icons";
import {
  SideBarWrapper,
  StyledSidebarHeader,
  StyledSidebarLinks,
  UserIconWrapper,
} from "@/styled-components/styled-shared/styled-sidebar";
import { SidebarLinksTypes } from "./SidebarLinks";
import Link from "next/link";

interface SidebarProps {
  links: SidebarLinksTypes[];
  path: string;
  isClose: boolean;
}

export const Sidebar: FC<SidebarProps> = ({ links, path, isClose }) => {
  return (
    <SideBarWrapper $isClose={isClose}>
      <div>
        <StyledSidebarHeader>
          <Link href={"/"}>
            <Logo id="logo" />
          </Link>
        </StyledSidebarHeader>

        <ul id="links">
          {links.map(({ icon: Icon, ...link }) => (
            <Link href={link.path} key={link.name + link.path}>
              <StyledSidebarLinks
                icon={Icon}
                iconAlign="start"
                isActive={link.path === path}
              >
                <span>{link.name}</span>
              </StyledSidebarLinks>
            </Link>
          ))}
        </ul>
      </div>
      <UserIconWrapper>
        <UserIcon />
      </UserIconWrapper>
    </SideBarWrapper>
  );
};
