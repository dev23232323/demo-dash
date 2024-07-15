import Icon from "@IconWrapper";
import { IconProps } from "@/@types/IconType";

const PencilLine = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      <path d="m15 5 3 3" />
    </Icon>
  );
};
export default PencilLine;
