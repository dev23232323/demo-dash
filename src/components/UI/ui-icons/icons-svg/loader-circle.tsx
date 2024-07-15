import { IconProps } from "@/@types/IconType";
import React, { FC } from "react";
import Icon from "@IconWrapper";

const LoaderCircle: FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </Icon>
  );
};
export default LoaderCircle;
