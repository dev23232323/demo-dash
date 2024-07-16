import { FC } from "react";

import { StyledToolbarIconsWrapper } from "@/styled-components/styled-shared/styled-tip-tap/styled-tiptap-toolbar";
import { ToolbarButtons } from "./tiptap-toolbar-buttons";
import { Button } from "@/components/UI/ui-button";

import type { Editor } from "@tiptap/react";
import { ImageModal } from "./tiptap-tool-modal/tip-tap-image/image-modal";
import TiptapLinkModal from "./tiptap-tool-modal/tiptap-link-modal";
import TiptapYoutubeModal from "./tiptap-tool-modal/tiptap-youtube-modal";

interface ToolbarProps {
  editor: Editor;
}

export const TipTapToolbar: FC<ToolbarProps> = ({ editor }) => {
  const toolbarButtons = ToolbarButtons({ editor });
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
      <TiptapLinkModal editor={editor} />
      <TiptapYoutubeModal editor={editor} />
    </StyledToolbarIconsWrapper>
  );
};
