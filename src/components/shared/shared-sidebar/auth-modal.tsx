"use client";
import Button from "@/components/UI/ui-button";
import { UserIcon } from "@/components/UI/ui-icons";
import Modal, { ModalBody } from "@/components/UI/ui-modal";
import TextField from "@/components/UI/ui-text-field";
import { logout } from "@/state/state-auth/auth-slice";
import { RootState } from "@/state/store";
import { UserIconWrapper } from "@/styled-components/styled-shared/styled-sidebar";
import {
  ModalFooter,
  ModalHeader,
} from "@/styled-components/styled-UI/styled-modal";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

interface AuthModalProps {}

const AuthModal: FC<AuthModalProps> = ({}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { email, id, role } = useSelector((state: RootState) => state.auth);

  if (!email || !id || !role) return null;

  async function handleLogout() {
    setOpenModal(false);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Logout",
    });

    if (result.isConfirmed) {
      dispatch(logout());
      router.replace("/login");
    } else if (result.isDenied || result.isDismissed) {
      setOpenModal(true);
    }
  }

  return (
    <>
      <UserIconWrapper onClick={() => setOpenModal(true)}>
        <UserIcon />
      </UserIconWrapper>
      <Modal onClose={() => setOpenModal(false)} open={openModal}>
        <ModalHeader>Manage Account</ModalHeader>
        <ModalBody>
          <TextField disabled label="Id" value={id} />
          <TextField disabled label="Role" value={role} />
          <TextField disabled label="Email" value={email} />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setOpenModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default AuthModal;
