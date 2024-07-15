import { StyledSelect } from "@/styled-components/styled-UI/styled-select";
import React, { forwardRef } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, ...rest }, ref) => {
    return (
      <StyledSelect {...rest} ref={ref}>
        {children}
      </StyledSelect>
    );
  }
);

Select.displayName = "Select";
