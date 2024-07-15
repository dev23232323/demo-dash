import { FC } from "react";

import { StyledToolbarIconsWrapper } from "@/styled-components/styled-shared/styled-tip-tap/styled-tiptap-toolbar";
import { _toolbarButtons } from "./tiptap-toolbar-buttons";
import { Button } from "@/components/UI/ui-button";

import type { Editor } from "@tiptap/react";
import { ImageModal } from "./tip-tap-image/image-modal";

interface ToolbarProps {
  editor: Editor;
}

export const TipTapToolbar: FC<ToolbarProps> = ({ editor }) => {
  const toolbarButtons = _toolbarButtons({ editor });
  return (
    <StyledToolbarIconsWrapper>
      {toolbarButtons.map((button, i) => (
        <Button
          type="button"
          isActive={button.isActive()}
          key={i.toString() + button.arialLabel}
          title={button.arialLabel}
          onClick={button.function}
        >
          <button.icon color="#fff" />
        </Button>
      ))}
      <ImageModal editor={editor} />
    </StyledToolbarIconsWrapper>
  );
};
