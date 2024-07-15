"use client";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";

export interface SidebarContextProps {
  isClose: boolean;
  setIsClose: (isClose: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  const pathname = usePathname();

  if (!context) {
    throw new Error(
      "useSidebarContext must be used within a SidebarContextProvider"
    );
  }
  useEffect(() => {
    //* This will close the sidebar whenever the pathname i.e. the url changes
    context.setIsClose(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return context;
};
