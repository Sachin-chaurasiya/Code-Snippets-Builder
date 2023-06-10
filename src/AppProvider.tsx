import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { INITIAL_CONTEXT_DATA, SESSION_KEY } from './constants/common';
import { useMediaQuery } from '@chakra-ui/react';
import MobileViewMessage from 'components/MobileViewMessage/MobileViewMessage';
import { DEFAULT_EDITOR_BG_COLOR } from 'constants/editor';
import {
  AppContextProps,
  EditorContextData,
  ImageContextData,
  ProfileContextData,
  TextContextData,
} from 'interfaces/AppProvider.interface';
import Cookies from 'js-cookie';

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
  const [hideWaterMark, setIsWaterMarkVisible] = useState<boolean>(
    INITIAL_CONTEXT_DATA.hideWaterMark
  );
  const [profileContextData, setProfileContextData] =
    useState<ProfileContextData>(INITIAL_CONTEXT_DATA.profile);
  const [background, setBackground] = useState<string>(DEFAULT_EDITOR_BG_COLOR);

  const handleUpdateEditorData = (updatedData: EditorContextData) => {
    setEditorContextData(updatedData);
  };
  const handleUpdateTextData = (updatedData: TextContextData) => {
    setTextContextData(updatedData);
  };
  const handleUpdateImageData = (updatedData: ImageContextData) => {
    setImageContextData(updatedData);
  };
  const handleUpdateProfileData = (updatedData: ProfileContextData) => {
    setProfileContextData(updatedData);
  };

  const handleUpdateBackground = (updatedData: string) => {
    setBackground(updatedData);
  };
  const handleUpdateWaterMark = (updatedData: boolean) => {
    setIsWaterMarkVisible(updatedData);
  };

  const [session, setSession] = useState(Cookies.get(SESSION_KEY));

  const handleUpdateSession = (updatedSession: string | undefined) => {
    setSession(updatedSession);
  };

  const contextValues = useMemo(
    () => ({
      editor: editorContextData,
      text: textContextData,
      image: imageContextData,
      profile: profileContextData,
      hideWaterMark,
      background,
      onUpdateEditorData: handleUpdateEditorData,
      onUpdateTextData: handleUpdateTextData,
      onUpdateImageData: handleUpdateImageData,
      onUpdateBackground: handleUpdateBackground,
      onUpdateProfileData: handleUpdateProfileData,
      onUpdateWaterMark: handleUpdateWaterMark,

      session,
      onUpdateSession: handleUpdateSession,
    }),
    [
      background,
      editorContextData,
      textContextData,
      imageContextData,
      profileContextData,
      hideWaterMark,
    ]
  );

  return (
    <AppContext.Provider value={contextValues}>
      {isMobileScreen ? <MobileViewMessage /> : children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppProvider = () => useContext(AppContext);
