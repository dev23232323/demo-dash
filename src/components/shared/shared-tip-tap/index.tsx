"use client";
import { FC, useMemo, forwardRef, useImperativeHandle } from "react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import { useEditor } from "@tiptap/react";
import TextAlign from "@tiptap/extension-text-align";
import { TipTapToolbar } from "./tiptap-toolbar";
import Link from "@tiptap/extension-link";
import { StyledEditorContent } from "@/styled-components/styled-shared/styled-tip-tap/styled-tiptap-editor";
import { stripEmptyHtmlTags } from "@/utils/utils";
import { Typography as StyledTypography } from "@/styled-components/styled-global";
import ResizableImageExtension from "./tip-tap-image/tiptap-image-extension";

interface TipTapProps {
  value?: string;
  onBlur?: (event: any) => any;
  onChange?: (event: any) => any;
  error?: string;
}

const TipTap: FC<TipTapProps> = forwardRef(
  ({ value = "", onBlur, onChange, error }, ref) => {
    const extensions = useMemo(
      () => [
        StarterKit,
        Typography,
        Link.configure({
          validate: (href) => /^https?:\/\//.test(href),
        }),
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        ResizableImageExtension,
      ],
      []
    );

    const editorProps = useMemo(
      () => ({
        attributes: {
          spellcheck: "true",
        },
      }),
      []
    );

    const editor = useEditor({
      extensions,
      editorProps,
      content: value,
      onUpdate({ editor }) {
        const htmlContent = editor.getHTML().trim();
        const filteredHtml = stripEmptyHtmlTags(htmlContent);
        if (onChange) {
          onChange(filteredHtml);
        }
      },
      onBlur({ event, ...rest }) {
        console.log(event, rest);
        if (onBlur) {
          onBlur(event);
        }
      },
      autofocus: "all",
    });

    useImperativeHandle(
      ref,
      () => ({
        getEditor: () => editor,
      }),
      [editor]
    );

    if (!editor) {
      return null;
    }

    return (
      <div>
        <TipTapToolbar editor={editor} />
        <StyledEditorContent editor={editor} />
        <StyledTypography
          $color="danger"
          $size="sm"
          style={{ margin: "10px 0" }}
        >
          {error}
        </StyledTypography>
      </div>
    );
  }
);

TipTap.displayName = "TipTap Editor";
export default TipTap;
