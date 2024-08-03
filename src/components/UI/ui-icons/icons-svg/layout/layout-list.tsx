import { IconProps } from "@/@types/IconType";
import React, { FC } from "react";
import Icon from "@IconWrapper";

export const LayoutList: FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
      <path d="M14 4h7" />
      <path d="M14 9h7" />
      <path d="M14 15h7" />
      <path d="M14 20h7" />
    </Icon>
  );
};
