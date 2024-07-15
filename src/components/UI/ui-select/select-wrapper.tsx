import { StyledSelectWrapper } from "@/styled-components/styled-UI/styled-select";
import React, { FC } from "react";

interface SelectProps {
  children: React.ReactNode;
}

export const SelectWrapper: FC<SelectProps> = ({ children }) => {
  return <StyledSelectWrapper>{children}</StyledSelectWrapper>;
};
