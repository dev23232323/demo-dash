"use client";
import React, { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

interface ReactQueryProviderProps {
  children: React.ReactNode;
}
const ReactQueryProvider: FC<ReactQueryProviderProps> = ({ children }) => {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
export default ReactQueryProvider;
