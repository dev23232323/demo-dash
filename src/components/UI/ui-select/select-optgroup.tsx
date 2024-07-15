import { StyledOptgroup } from "@/styled-components/styled-UI/styled-select";
import React, { forwardRef } from "react";

interface SelectOptgroupProps
  extends React.OptgroupHTMLAttributes<HTMLOptGroupElement> {
  children: React.ReactNode;
}

export const SelectOptgroup = forwardRef<
  HTMLOptGroupElement,
  SelectOptgroupProps
>(({ children, ...rest }, ref) => {
  return (
    <StyledOptgroup {...rest} ref={ref}>
      {children}
    </StyledOptgroup>
  );
});

SelectOptgroup.displayName = "optgroup";
