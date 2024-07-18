import { IconProps } from "@/@types/IconType";
import Icon from "@IconWrapper";

export const ChevronUpDown = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </Icon>
  );
};
