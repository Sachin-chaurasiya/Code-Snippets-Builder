import * as React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import LeftSidebar from './components/Sidebar/LeftSideBar';
import AppRoutes from './AppRoutes';
import { APP_TEXT_COLOR } from 'constants/common';

export const App = () => (
  <Box
    color={APP_TEXT_COLOR}
    minH="100vh"
    bg={useColorModeValue('gray.100', 'gray.900')}
  >
    <LeftSidebar />
    <Box ml={60} p="4">
      <AppRoutes />
    </Box>
  </Box>
);
