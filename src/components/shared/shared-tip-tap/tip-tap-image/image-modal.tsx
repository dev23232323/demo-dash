import Button from "@/components/UI/ui-button";
import { ImagesPlus } from "@/components/UI/ui-icons";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/UI/ui-modal/modal";
import { StyledFlexWrapper } from "@/styled-components/styled-global";
import { FC, useState } from "react";
import ImageAddModal from "./image-add-modal";
import TiptapImageGrid from "./tiptap-image-grid";
import { Editor } from "@tiptap/react";

interface ImageModalProps {
  editor: Editor;
}

export const ImageModal: FC<ImageModalProps> = ({ editor }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [childModalOpen, setChildModalOpen] = useState<boolean>(false);

  function handleOpenModal(type: "modal" | "child") {
    if (type === "modal") {
      setModalOpen(true);
    } else {
      setModalOpen(false);
      setChildModalOpen(true);
    }
  }

  function handleCloseModal(type: "modal" | "child") {
    if (type === "modal") {
      setModalOpen(false);
    } else {
      setModalOpen(true);
      setChildModalOpen(false);
    }
  }

  return (
    <>
      <Button
        type="button"
        title={"Inset Image"}
        onClick={() => handleOpenModal("modal")}
      >
        <ImagesPlus color="#fff" />
      </Button>

      <Modal onClose={() => handleCloseModal("modal")} open={modalOpen}>
        <ModalHeader>
          <StyledFlexWrapper
            $justifyContent="space-between"
            $responsive={false}
          >
            Manage Images
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleOpenModal("child")}
            >
              <ImagesPlus />
            </Button>
          </StyledFlexWrapper>
        </ModalHeader>
        <ModalBody>
          <TiptapImageGrid />
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => handleCloseModal("modal")}>Close</Button>
        </ModalFooter>
      </Modal>
      <ImageAddModal
        open={childModalOpen}
        onClose={() => handleCloseModal("child")}
        editor={editor}
      />
    </>
  );
};
