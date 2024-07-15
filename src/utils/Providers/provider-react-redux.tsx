import { store } from "@/state/store";
import React, { FC } from "react";
import { Provider } from "react-redux";

interface ReactReduxProviderProps {
  children: React.ReactNode;
}

const ReactReduxProvider: FC<ReactReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
export default ReactReduxProvider;
