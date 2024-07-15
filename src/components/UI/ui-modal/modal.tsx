import * as React from "react";
import UtilPortal from "../ui-utils/util-portal";
import UtilFocusTrap from "../ui-utils/utils-focus-trap";
import {
  ModalContent,
  ModalWrapper,
} from "@/styled-components/styled-UI/styled-modal";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  React.useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <UtilPortal>
      <ModalWrapper>
        <UtilFocusTrap open={open}>
          <ModalContent ref={modalRef}>{children}</ModalContent>
        </UtilFocusTrap>
      </ModalWrapper>
    </UtilPortal>
  );
};
