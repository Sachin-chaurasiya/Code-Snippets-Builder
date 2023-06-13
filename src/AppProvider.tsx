import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { SESSION_KEY } from './constants/common';
import { useMediaQuery } from '@chakra-ui/react';
import MobileViewMessage from 'components/MobileViewMessage/MobileViewMessage';
import { AppContextProps } from 'interfaces/AppProvider.interface';
import Cookies from 'js-cookie';
import { Node } from 'reactflow';
import { NodeData } from 'interfaces/Editor.interface';

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isMobileScreen] = useMediaQuery('(max-width: 1024px)');

  const [selectedNode, setSelectedNode] = useState<Node<NodeData>>();

  const handleUpdateSelectedNode = (selectedNode?: Node<NodeData>) => {
    setSelectedNode(selectedNode);
  };

  const [session, setSession] = useState(Cookies.get(SESSION_KEY));

  const handleUpdateSession = (updatedSession: string | undefined) => {
    setSession(updatedSession);
  };

  const contextValues: AppContextProps = useMemo(
    () => ({
      selectedNode,

      onUpdateSelectedNode: handleUpdateSelectedNode,

      session,
      onUpdateSession: handleUpdateSession,
    }),
    [selectedNode]
  );

  return (
    <AppContext.Provider value={contextValues}>
      {isMobileScreen ? <MobileViewMessage /> : children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppProvider = () => useContext(AppContext);
