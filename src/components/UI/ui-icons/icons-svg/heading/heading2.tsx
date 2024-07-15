import { IconProps } from "@/@types/IconType";
import React, { FC } from "react";
import Icon from "@IconWrapper";

export const Heading2: FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M4 12h8" />
      <path d="M4 18V6" />
      <path d="M12 18V6" />
      <path d="M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1" />
    </Icon>
  );
};

export default Heading2;
