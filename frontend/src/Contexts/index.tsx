import React from "react";

import { AppContextProvider } from "./AppContext";

export const GlobalContext = ({ children }: { children: React.ReactNode }) => {
  return <AppContextProvider>{children}</AppContextProvider>;
};
