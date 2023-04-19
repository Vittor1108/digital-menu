import React from "react";
import { IContext, InfoType } from "./interfaces/IAppContext";

const DEFAULT_VALUE = {
  state: {
    screens: [],
    nameUser: ""
  },
  setState: () => {},
};

export const AppContext = React.createContext<IContext>(DEFAULT_VALUE);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [state, setState] = React.useState<InfoType>(DEFAULT_VALUE.state);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};
