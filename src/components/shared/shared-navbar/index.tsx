"use client";
import { useSidebarContext } from "@/context/context-sidebar/context";
import { Navbar as NavbarComponent } from "./navbar";

const Navbar = () => {
  const { isClose, setIsClose } = useSidebarContext();

  function onClick() {
    setIsClose(!isClose);
  }

  return <NavbarComponent onClick={onClick}></NavbarComponent>;
};

export default Navbar;
