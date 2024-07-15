import { IconProps } from "@/@types/IconType";
import React, { FC } from "react";
import Icon from "@IconWrapper";

export const AlignJustify: FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <line x1="3" x2="21" y1="6" y2="6" />
      <line x1="3" x2="21" y1="12" y2="12" />
      <line x1="3" x2="21" y1="18" y2="18" />
    </Icon>
  );
};

export default AlignJustify;
