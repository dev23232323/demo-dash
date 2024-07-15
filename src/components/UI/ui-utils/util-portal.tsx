/* 
  This component creates a react portal for any node to render 
  which is not the part of the DOM 
  e.g. Modal, Popup, Context Menu etc.
*/

import * as React from "react";
import ReactDOM from "react-dom";

interface UtilPortalProps {
  children: React.ReactNode;
}

const UtilPortal: React.FC<UtilPortalProps> = ({ children }) => {
  const [container] = React.useState(() => document.createElement("div"));

  React.useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
};

export default UtilPortal;
