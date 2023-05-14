import * as React from 'react';
import {
  Box,
  ChakraProvider,
  theme,
  useColorModeValue,
} from '@chakra-ui/react';
import LeftSidebar from './components/Sidebar/LeftSideBar';
import AppRoutes from './AppRoutes';
import RightSidebar from './components/Sidebar/RightSidebar';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <LeftSidebar />
      <Box ml={60} mr={80} p="4">
        <AppRoutes />
      </Box>
      <RightSidebar />
    </Box>
  </ChakraProvider>
);
