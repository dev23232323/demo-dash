/* 
  This component is used to trap the keyboard focus
*/

import * as React from "react";

interface UtilFocusTrapProps {
  open: boolean;
  children: React.ReactNode;
}

const UtilFocusTrap: React.FC<UtilFocusTrapProps> = ({ open, children }) => {
  const focusTrapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open || !focusTrapRef.current) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        const focusableElements =
          focusTrapRef.current!.querySelectorAll<HTMLElement>(
            "a[href], button, textarea, input, select"
          );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div style={{ margin: "25px" }} ref={focusTrapRef}>
      {children}
    </div>
  );
};

export default UtilFocusTrap;
