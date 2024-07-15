"use client";
import { FC, ReactNode, useState } from "react";
import { SidebarContext, SidebarContextProps } from "./context";

export const SidebarContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isClose, setIsClose] = useState<boolean>(false);

  const payload: SidebarContextProps = {
    isClose,
    setIsClose,
  };

  return (
    <SidebarContext.Provider value={payload}>
      {children}
    </SidebarContext.Provider>
  );
};
