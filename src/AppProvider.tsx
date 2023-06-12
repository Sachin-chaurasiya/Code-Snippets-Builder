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
  ProfileContextData,
} from 'interfaces/AppProvider.interface';
import Cookies from 'js-cookie';
import { Node } from 'reactflow';
import { NodeData } from 'interfaces/Editor.interface';

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isMobileScreen] = useMediaQuery('(max-width: 1024px)');

  const [hideWaterMark, setIsWaterMarkVisible] = useState<boolean>(
    INITIAL_CONTEXT_DATA.hideWaterMark
  );
  const [profileContextData, setProfileContextData] =
    useState<ProfileContextData>(INITIAL_CONTEXT_DATA.profile);
  const [background, setBackground] = useState<string>(DEFAULT_EDITOR_BG_COLOR);

  const [selectedNode, setSelectedNode] = useState<Node<NodeData>>();

  const handleUpdateSelectedNode = (selectedNode?: Node<NodeData>) => {
    setSelectedNode(selectedNode);
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

  const contextValues: AppContextProps = useMemo(
    () => ({
      profile: profileContextData,
      hideWaterMark,
      background,
      selectedNode,
      onUpdateBackground: handleUpdateBackground,
      onUpdateProfileData: handleUpdateProfileData,
      onUpdateWaterMark: handleUpdateWaterMark,
      onUpdateSelectedNode: handleUpdateSelectedNode,

      session,
      onUpdateSession: handleUpdateSession,
    }),
    [background, profileContextData, hideWaterMark, selectedNode]
  );

  return (
    <AppContext.Provider value={contextValues}>
      {isMobileScreen ? <MobileViewMessage /> : children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppProvider = () => useContext(AppContext);
