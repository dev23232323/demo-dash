"use client";
import { EditorContent } from "@tiptap/react";
import styled from "styled-components";

export const StyledEditorContent = styled(EditorContent)`
  .tiptap {
    padding: 8px 10px;
    background-color: ${(props) => props.theme.colors.primary[400]};
    border-bottom-left-radius: ${(props) => props.theme.style.borderRadius};
    border-bottom-right-radius: ${(props) => props.theme.style.borderRadius};

    min-height: 300px;
  }
`;
