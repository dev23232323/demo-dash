import { StyledOption } from "@/styled-components/styled-UI/styled-select";
import React, { forwardRef } from "react";

export interface StyledOptionProps
  extends React.OptionHTMLAttributes<HTMLOptionElement> {
  children: React.ReactNode;
}

export const SelectOptions = forwardRef<HTMLOptionElement, StyledOptionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <StyledOption {...rest} ref={ref}>
        {children}
      </StyledOption>
    );
  }
);

SelectOptions.displayName = "select options";
