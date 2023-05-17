import React, { ReactNode, createContext, useContext, useState } from 'react';
import { INITIAL_CONTEXT_DATA } from './constant';

interface AppContextData {
  language: string;
  theme: string;
  fontSize: number;
}

interface AppContextProps {
  data: AppContextData;
  onUpdate: (value: AppContextData) => void;
}

export const AppContext = createContext<AppContextProps>(INITIAL_CONTEXT_DATA);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [contextData, setContextData] = useState<AppContextData>(
    INITIAL_CONTEXT_DATA.data
  );

  const handleUpdate = (updatedData: AppContextData) =>
    setContextData(updatedData);

  return (
    <AppContext.Provider value={{ data: contextData, onUpdate: handleUpdate }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppProvider = () => useContext(AppContext);
