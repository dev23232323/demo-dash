"use client";
import Button from "@/components/UI/ui-button";
import { VideoIcon } from "@/components/UI/ui-icons";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/UI/ui-modal";
import TextField from "@/components/UI/ui-text-field";
import { Editor } from "@tiptap/react";
import React, { FC, useRef, useState } from "react";

interface TiptapYoutubeModalProps {
  editor: Editor;
}
const TiptapYoutubeModal: FC<TiptapYoutubeModalProps> = ({ editor }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string>("");

  function handleSubmit() {
    if (inputRef.current) {
      let value = inputRef.current.value.trim();
      if (!value || value === "") {
        setError("Please enter a link");
        return;
      }
      editor.commands.setYoutubeVideo({
        src: value,
      });
      setModalOpen(false);
    } else {
      setError("Please reopen the modal");
    }
  }

  return (
    <>
      <Button
        type="button"
        title={"Youtube Embed"}
        onClick={() => setModalOpen(true)}
      >
        <VideoIcon />
      </Button>
      <Modal onClose={() => setModalOpen(false)} open={isModalOpen}>
        <ModalHeader>Youtube embed</ModalHeader>
        <ModalBody>
          <TextField
            ref={inputRef}
            label="Video Link"
            description="https://youtube.com/embed/..."
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
export default TiptapYoutubeModal;
