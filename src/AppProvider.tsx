import React, { ReactNode, createContext, useContext, useState } from 'react';
import { INITIAL_CONTEXT_DATA } from './constant';

interface EditorContextData {
  language: string;
  theme: string;
  fontSize: number;
}
interface TextContextData {
  background: string;
  color: string;
  fontSize: number;
  borderRadius: string;
}

interface AppContextProps {
  background: string;
  editor: EditorContextData;
  text: TextContextData;
  onUpdateEditorData: (value: EditorContextData) => void;
  onUpdateTextData: (value: TextContextData) => void;
  onUpdateBackground: (value: string) => void;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [editorContextData, setEditorContextData] = useState<EditorContextData>(
    INITIAL_CONTEXT_DATA.editor
  );
  const [textContextData, setTextContextData] = useState<TextContextData>(
    INITIAL_CONTEXT_DATA.text
  );
  const [background, setBackground] = useState<string>(
    'linear-gradient(337deg, rgb(101, 78, 163), rgb(218, 152, 180))'
  );

  const handleUpdateEditorData = (updatedData: EditorContextData) =>
    setEditorContextData(updatedData);
  const handleUpdateTextData = (updatedData: TextContextData) =>
    setTextContextData(updatedData);

  const handleUpdateBackground = (updatedData: string) =>
    setBackground(updatedData);

  return (
    <AppContext.Provider
      value={{
        editor: editorContextData,
        text: textContextData,
        background,
        onUpdateEditorData: handleUpdateEditorData,
        onUpdateTextData: handleUpdateTextData,
        onUpdateBackground: handleUpdateBackground,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppProvider = () => useContext(AppContext);
