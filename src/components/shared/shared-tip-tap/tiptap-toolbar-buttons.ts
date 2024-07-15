import { IconProps } from "@/@types/IconType";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Quote,
  StrikeThrough,
  Link,
  UnLink,
} from "@/components/UI/ui-icons";
import type { Editor } from "@tiptap/react";
import { FC, useState } from "react";

interface _toolbarButtonsType {
  function: () => any;
  arialLabel: string;
  icon: FC<IconProps>;
  name: string;
  isActive: () => boolean;
}

interface _toolbarButtonsProps {
  editor: Editor;
}

export const _toolbarButtons = ({
  editor,
}: _toolbarButtonsProps): _toolbarButtonsType[] => {
  const [linkArialLabel, setLinkArialLabel] = useState("link");

  const listToolObject: _toolbarButtonsType = {
    arialLabel: linkArialLabel,
    function: getLinkPrompt,
    icon: editor.isActive("link") ? UnLink : Link,
    isActive: () => editor.isActive("link"),
    name: "link",
  };

  function getLinkPrompt() {
    const previousUrl = editor.getAttributes("link").href;

    if (previousUrl) {
      editor.chain().extendMarkRange("link").unsetLink().focus().run();
      return;
    }

    const link = window.prompt("LINK:");
    if (link && link != "") {
      setLinkArialLabel(link);
      editor.chain().extendMarkRange("link").setLink({ href: link }).run();
    }

    if (document) {
      document.querySelectorAll(".tiptap a").forEach((link) => {
        link.setAttribute("title", link.getAttribute("href")!);
      });
    }
  }

  function toggleTextAlign(
    editor: Editor,
    alignment: "left" | "right" | "center" | "justify"
  ) {
    if (editor.isActive({ textAlign: alignment })) {
      editor.chain().unsetTextAlign().focus().run();
    } else {
      editor.chain().setTextAlign(alignment).focus().run();
    }
  }

  return [
    {
      function: () => editor.chain().toggleBold().focus().run(),
      name: "bold",
      icon: Bold,
      arialLabel: "bold",
      isActive: () => editor.isActive("bold"),
    },
    {
      function: () => editor.chain().toggleItalic().focus().run(),
      name: "italic",
      icon: Italic,
      arialLabel: "italic",
      isActive: () => editor.isActive("italic"),
    },
    {
      function: () => editor.chain().toggleStrike().focus().run(),
      name: "strike",
      icon: StrikeThrough,
      arialLabel: "strike",
      isActive: () => editor.isActive("strike"),
    },
    {
      function: () => editor.chain().toggleHeading({ level: 1 }).focus().run(),
      name: "heading",
      icon: Heading1,
      arialLabel: "heading",
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      function: () => editor.chain().toggleHeading({ level: 2 }).focus().run(),
      name: "h2",
      icon: Heading2,
      arialLabel: "heading",
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      function: () => editor.chain().toggleBulletList().focus().run(),
      name: "bulletList",
      icon: List,
      arialLabel: "bulletList",
      isActive: () => editor.isActive("bulletList"),
    },
    {
      function: () => editor.chain().toggleOrderedList().focus().run(),
      name: "orderedList",
      icon: ListOrdered,
      arialLabel: "orderedList",
      isActive: () => editor.isActive("orderedList"),
    },
    {
      function: () => editor.chain().toggleCodeBlock().focus().run(),
      name: "codeBlock",
      icon: Code,
      arialLabel: "codeBlock",
      isActive: () => editor.isActive("codeBlock"),
    },
    {
      function: () => editor.chain().toggleBlockquote().focus().run(),
      name: "blockquote",
      icon: Quote,
      arialLabel: "blockquote",
      isActive: () => editor.isActive("blockquote"),
    },
    {
      function: () => toggleTextAlign(editor, "center"),
      name: "align",
      icon: AlignCenter,
      arialLabel: "Align-Center",
      isActive: () => editor.isActive({ textAlign: "center" }),
    },
    {
      function: () => toggleTextAlign(editor, "justify"),
      name: "align",
      icon: AlignJustify,
      arialLabel: "Align-Justify",
      isActive: () => editor.isActive({ textAlign: "justify" }),
    },
    {
      function: () => toggleTextAlign(editor, "left"),
      name: "align",
      icon: AlignLeft,
      arialLabel: "Align-Left",
      isActive: () => editor.isActive({ textAlign: "left" }),
    },
    {
      function: () => toggleTextAlign(editor, "right"),
      name: "align",
      icon: AlignRight,
      arialLabel: "Align-Right",
      isActive: () => editor.isActive({ textAlign: "right" }),
    },
    {
      ...listToolObject,
    },
  ];
};
