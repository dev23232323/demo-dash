"use client";
import { usePathname } from "next/navigation";
import { Sidebar as SidebarElement } from "./sidebar";
import { SidebarLinks, WorkLinks } from "./SidebarLinks";
import { useSidebarContext } from "@/context/context-sidebar/context";

const Sidebar = () => {
  const path = usePathname();
  const splitPath = path.split("/")[1];
  const { isClose } = useSidebarContext();

  return (
    <SidebarElement
      // isTabletView={false}
      workLinks={WorkLinks}
      links={SidebarLinks}
      path={"/" + splitPath}
      isClose={isClose}
    />
  );
};

export default Sidebar;
