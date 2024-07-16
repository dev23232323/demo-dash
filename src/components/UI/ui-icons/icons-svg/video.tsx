import Icon from "@IconWrapper";
import { IconProps } from "@/@types/IconType";

export const VideoIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </Icon>
  );
};
