import Button from "@/components/UI/ui-button";
import { ImagesPlus, Link } from "@/components/UI/ui-icons";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/UI/ui-modal";
import { StyledFlexWrapper } from "@/styled-components/styled-global";
import { FC, useState } from "react";
import ImageAddModal from "./image-add-modal";
import TiptapImageGrid from "./tiptap-image-grid";
import { Editor } from "@tiptap/react";
import ImageLinkModal from "./image-link-modal";

interface ImageModalProps {
  editor: Editor;
}

export const ImageModal: FC<ImageModalProps> = ({ editor }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [childModalOpen, setChildModalOpen] = useState<
    "upload" | "url" | false
  >(false);

  function handleOpenModal(type: "modal" | typeof childModalOpen) {
    if (type === "modal") {
      setModalOpen(true);
    } else {
      setModalOpen(false);
      setChildModalOpen(type);
    }
  }

  function handleCloseModal(type: "modal" | typeof childModalOpen) {
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
            <StyledFlexWrapper $gap="0" $responsive={false}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleOpenModal("upload")}
                title="Upload image"
              >
                <ImagesPlus />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleOpenModal("url")}
                title="Add image link"
              >
                <Link />
              </Button>
            </StyledFlexWrapper>
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
        open={childModalOpen === "upload"}
        onClose={() => handleCloseModal("upload")}
        editor={editor}
      />
      <ImageAddModal
        open={childModalOpen === "upload"}
        onClose={() => handleCloseModal("upload")}
        editor={editor}
      />
      <ImageLinkModal
        open={childModalOpen === "url"}
        onClose={() => handleCloseModal("url")}
        editor={editor}
      />
    </>
  );
};
