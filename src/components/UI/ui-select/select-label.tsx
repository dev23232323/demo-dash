import { StyledSelectLabel } from "@/styled-components/styled-UI/styled-select";
import React, { forwardRef } from "react";

interface SelectLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const SelectLabel = forwardRef<HTMLLabelElement, SelectLabelProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledSelectLabel ref={ref} {...props}>
        {children}
      </StyledSelectLabel>
    );
  }
);

SelectLabel.displayName = "select label";
