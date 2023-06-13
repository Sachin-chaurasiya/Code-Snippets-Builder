import { Box } from '@chakra-ui/react';
import LeftSidebar from './components/Sidebar/LeftSideBar';
import AppRoutes from './AppRoutes';
import { APP_TEXT_COLOR } from 'constants/common';
import { Navbar } from 'components/Navbar/Navbar';
import { useAppProvider } from 'AppProvider';

export const App = () => {
  const { session } = useAppProvider();

  if (!session) {
    return (
      <Box color={APP_TEXT_COLOR} bg={'gray.100'}>
        <Navbar />
        <Box as="main" css={{ height: 'calc(100% - 64px)' }}>
          <AppRoutes />
        </Box>
      </Box>
    );
  }

  return (
    <Box color={APP_TEXT_COLOR} minHeight="100vh" bg={'gray.100'}>
      <LeftSidebar />
      <Box as="main" ml={60} p="4">
        <AppRoutes />
      </Box>
    </Box>
  );
};
