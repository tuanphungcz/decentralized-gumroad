import { createContext, useState } from "react";

const initialValues: any = {};

const AppContext = createContext(initialValues);

type AppContextProps = {
  children: any;
};

const AppProvider = ({ children }: AppContextProps) => {
  const [tabKey, setTabKey] = useState(0);
  const [lastTx, setLastTx] = useState({ state: null, txhash: "" });

  return (
    <AppContext.Provider
      value={{
        setTabKey,
        tabKey,
        lastTx,
        setLastTx,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
