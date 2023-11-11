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
import { Models } from 'appwrite';
import { API_CLIENT } from 'api';

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [isMobileScreen] = useMediaQuery('(max-width: 1024px)');

  const [isFetchingUser, setIsFetchingUser] = useState<boolean>(false);

  const [loggedInUser, setLoggedInUser] =
    useState<Models.User<Models.Preferences>>();

  const [selectedNode, setSelectedNode] = useState<Node<NodeData>>();

  const handleUpdateSelectedNode = (selectedNode?: Node<NodeData>) => {
    setSelectedNode(selectedNode);
  };

  const [session, setSession] = useState(Cookies.get(SESSION_KEY));

  const handleUpdateSession = (updatedSession: string | undefined) => {
    setSession(updatedSession);
  };

  const handleUpdateLoggedInUser = (
    payload: Models.User<Models.Preferences>
  ) => {
    setLoggedInUser(payload);
  };

  const contextValues: AppContextProps = useMemo(
    () => ({
      selectedNode,

      onUpdateSelectedNode: handleUpdateSelectedNode,

      session,
      loggedInUser,
      isFetchingUser,
      onUpdateSession: handleUpdateSession,
      onStartTour: () => {
        setRunTour(true);
      },
      handleUpdateLoggedInUser,
    }),
    [selectedNode, loggedInUser, isFetchingUser]
  );

  const [runTour, setRunTour] = useState<boolean>(false);
  const [tourSteps, setTourSteps] = useState<Step[]>([]);

  const handleTourCallback = (data: CallBackProps) => {
    const { action } = data;

    if (action === 'reset') {
      setRunTour(false);
    }
  };

  const fetchCurrentUserData = async () => {
    if (loggedInUser) return;

    try {
      setIsFetchingUser(true);
      const user = await API_CLIENT.getLoggedInUser();
      handleUpdateLoggedInUser(user);
    } catch (error) {
      // handle error
    } finally {
      setIsFetchingUser(false);
    }
  };

  useEffect(() => {
    setTourSteps(getTourStepsByRoute(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    fetchCurrentUserData();
  }, []);

  return (
    <AppContext.Provider value={contextValues}>
      <Tour run={runTour} steps={tourSteps} callback={handleTourCallback} />
      {isMobileScreen ? <MobileViewMessage /> : children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppProvider = () => useContext(AppContext);
