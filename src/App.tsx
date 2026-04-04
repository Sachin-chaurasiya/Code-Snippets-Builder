import { Box } from '@chakra-ui/react';
import LeftSidebar from './components/Sidebar/LeftSideBar';
import AppRoutes from './AppRoutes';
import { Navbar } from 'components/Navbar/Navbar';
import { useAppProvider } from 'AppProvider';

const SIDEBAR_WIDTH = '240px';
const SIDEBAR_COLLAPSED_WIDTH = '72px';

export const App = () => {
  const { session, isSidebarCollapsed } = useAppProvider();

  if (!session) {
    return (
      <Box minHeight="100vh" bg="gray.50">
        <Navbar />
        <Box as="main">
          <AppRoutes />
        </Box>
      </Box>
    );
  }

  return (
    <Box minHeight="100vh" bg="gray.50">
      <LeftSidebar />
      <Box
        as="main"
        ml={{
          base: 0,
          md: isSidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
        }}
        transition="margin-left 0.2s ease">
        <AppRoutes />
      </Box>
    </Box>
  );
};
