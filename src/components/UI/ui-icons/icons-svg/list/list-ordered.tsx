import { IconProps } from "@/@types/IconType";
import React, { FC } from "react";
import Icon from "@IconWrapper";

export const ListOrdered: FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </Icon>
  );
};

export default ListOrdered;
