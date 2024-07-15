import { IconProps } from "@/@types/IconType";
import React, { FC } from "react";
import Icon from "@IconWrapper";

export const Underline: FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M6 4v6a6 6 0 0 0 12 0V4" />
      <line x1="4" x2="20" y1="20" y2="20" />
    </Icon>
  );
};

export default Underline;
