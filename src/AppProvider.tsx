import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
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
import { CallBackProps, Step } from 'react-joyride';
import Tour from 'components/Tour';
import { useLocation } from 'react-router-dom';
import { getTourStepsByRoute } from 'utils/TourUtils';

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
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
      onStartTour: () => {
        setRunTour(true);
      },
    }),
    [selectedNode]
  );

  const [runTour, setRunTour] = useState<boolean>(false);
  const [tourSteps, setTourSteps] = useState<Step[]>([]);

  const handleTourCallback = (data: CallBackProps) => {
    const { action } = data;

    if (action === 'reset') {
      setRunTour(false);
    }
  };

  useEffect(() => {
    setTourSteps(getTourStepsByRoute(location.pathname));
  }, [location.pathname]);

  return (
    <AppContext.Provider value={contextValues}>
      <Tour run={runTour} steps={tourSteps} callback={handleTourCallback} />
      {isMobileScreen ? <MobileViewMessage /> : children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppProvider = () => useContext(AppContext);
