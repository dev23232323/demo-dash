import { IconProps } from "@/@types/IconType";
import React, { FC } from "react";
import Icon from "../Icon";

export const Search: FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </Icon>
  );
};
