import React, { ReactNode, createContext, useContext, useState } from 'react';
import { INITIAL_CONTEXT_DATA } from './constants/common';
import { useMediaQuery } from '@chakra-ui/react';
import MobileViewMessage from 'components/MobileViewMessage';
import { DEFAULT_EDITOR_BG_COLOR } from 'constants/editor';

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
interface ImageContextData {
  borderRadius: string;
}

interface AppContextProps {
  background: string;
  editor: EditorContextData;
  text: TextContextData;
  image: ImageContextData;
  onUpdateEditorData: (value: EditorContextData) => void;
  onUpdateTextData: (value: TextContextData) => void;
  onUpdateImageData: (value: ImageContextData) => void;
  onUpdateBackground: (value: string) => void;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isMobileScreen] = useMediaQuery('(max-width: 1024px)');

  const [editorContextData, setEditorContextData] = useState<EditorContextData>(
    INITIAL_CONTEXT_DATA.editor
  );
  const [textContextData, setTextContextData] = useState<TextContextData>(
    INITIAL_CONTEXT_DATA.text
  );
  const [imageContextData, setImageContextData] = useState<ImageContextData>(
    INITIAL_CONTEXT_DATA.text
  );
  const [background, setBackground] = useState<string>(DEFAULT_EDITOR_BG_COLOR);

  const handleUpdateEditorData = (updatedData: EditorContextData) =>
    setEditorContextData(updatedData);
  const handleUpdateTextData = (updatedData: TextContextData) =>
    setTextContextData(updatedData);
  const handleUpdateImageData = (updatedData: ImageContextData) =>
    setImageContextData(updatedData);

  const handleUpdateBackground = (updatedData: string) =>
    setBackground(updatedData);

  return (
    <AppContext.Provider
      value={{
        editor: editorContextData,
        text: textContextData,
        image: imageContextData,
        background,
        onUpdateEditorData: handleUpdateEditorData,
        onUpdateTextData: handleUpdateTextData,
        onUpdateImageData: handleUpdateImageData,
        onUpdateBackground: handleUpdateBackground,
      }}
    >
      {isMobileScreen ? <MobileViewMessage /> : children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppProvider = () => useContext(AppContext);
