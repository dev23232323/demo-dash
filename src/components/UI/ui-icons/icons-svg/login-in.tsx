import React, { FC } from "react";
import Icon from "@IconWrapper";
import { IconProps } from "@/@types/IconType";

export const LoginIcon: FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </Icon>
  );
};
export default LoginIcon;
