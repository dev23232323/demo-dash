import { FC } from "react";
import Icon from "@IconWrapper";
import { IconProps } from "@/@types/IconType";

const UserIcon: FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </Icon>
  );
};
export default UserIcon;
