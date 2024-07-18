import { FC, useEffect, useState } from "react";
import { ChevronUpDown, Logo, UserIcon } from "@/components/UI/ui-icons";
import {
  SideBarWrapper,
  StyledSidebarHeader,
  StyledSidebarLinks,
  UserIconWrapper,
} from "@/styled-components/styled-shared/styled-sidebar";
import { SidebarLinksTypes } from "./SidebarLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  links: SidebarLinksTypes[];
  path: string;
  isClose: boolean;
  workLinks: SidebarLinksTypes[];
}

export const Sidebar: FC<SidebarProps> = ({
  links,
  path,
  isClose,
  workLinks,
}) => {
  const [expandLink, setExpand] = useState<"work" | null>(null);
  const pathname = usePathname();

  function toggleExpandLink(link: typeof expandLink) {
    setExpand((prev) => {
      if (prev === link) return null;
      else return link;
    });
  }

  // This will close the expanded links when ever the url changes
  useEffect(() => {
    setExpand(null);
    return () => {
      setExpand(null);
    };
  }, [pathname]);

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

          <StyledSidebarLinks
            icon={ChevronUpDown}
            iconAlign="start"
            isActive={expandLink === "work"}
            onClick={() => toggleExpandLink("work")}
          >
            <span>Work Links</span>
          </StyledSidebarLinks>

          {expandLink === "work" &&
            workLinks.map(({ icon: Icon, ...link }) => (
              <Link href={link.path} key={link.name + link.path}>
                <StyledSidebarLinks
                  icon={Icon}
                  iconAlign="start"
                  isActive={link.path === pathname}
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
