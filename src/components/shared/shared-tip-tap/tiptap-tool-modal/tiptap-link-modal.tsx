"use client";
import Button from "@/components/UI/ui-button";
import { Link, UnLink } from "@/components/UI/ui-icons";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/UI/ui-modal";
import TextField from "@/components/UI/ui-text-field";
import { isValidUrl } from "@/utils/utils";
import { Editor } from "@tiptap/react";
import React, { FC, useEffect, useRef, useState } from "react";

interface TiptapLinkModalProps {
  editor: Editor;
}

const TiptapLinkModal: FC<TiptapLinkModalProps> = ({ editor }) => {
  const [linkArialLabel, setLinkArialLabel] = useState<string>("link");
  const previousUrl = editor.getAttributes("link").href;
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setError("");
    if (previousUrl) {
      setLinkArialLabel("Unlink");
    }
  }, [previousUrl]);

  function handleSubmit() {
    if (inputRef.current) {
      let value = inputRef.current.value.trim();
      if (!value || value === "") {
        setError("Please enter a link");
        return;
      }
      const isValid = isValidUrl(value);

      if (!isValid) {
        setError("Please enter a valid link");
        return;
      }

      const protocolRegex = /^(http:\/\/|https:\/\/)/;
      if (!protocolRegex.test(value)) {
        value = "https://" + value;
      }

      editor.chain().extendMarkRange("link").setLink({ href: value }).run();

      if (document) {
        document.querySelectorAll(".tiptap a").forEach((link) => {
          link.setAttribute("title", link.getAttribute("href")!);
        });
      }
      setError("");
      setModalOpen(false);
    } else {
      setError("Please reopen the modal");
    }
  }

  function handleOpenModal() {
    if (previousUrl) {
      editor.chain().extendMarkRange("link").unsetLink().focus().run();
      return;
    }
    setModalOpen(true);
  }

  return (
    <>
      <Button
        type="button"
        isActive={editor.isActive("link")}
        title={linkArialLabel}
        onClick={handleOpenModal}
      >
        {editor.isActive("link") ? <UnLink /> : <Link />}
      </Button>
      <Modal onClose={() => setModalOpen(false)} open={isModalOpen}>
        <ModalHeader>Add Link</ModalHeader>
        <ModalBody>
          <TextField
            ref={inputRef}
            label="Link"
            description="https://example.com"
            error={error}
            styles={{
              root: { minWidth: "300px" },
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            role="button"
            type="button"
            onClick={() => setModalOpen(false)}
          >
            Close
          </Button>
          <Button role="button" type="button" onClick={handleSubmit}>
            Done
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default TiptapLinkModal;
