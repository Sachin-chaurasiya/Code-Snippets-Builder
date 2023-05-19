import * as React from 'react';
import {
  Box,
  ChakraProvider,
  theme,
  useColorModeValue,
} from '@chakra-ui/react';
import LeftSidebar from './components/Sidebar/LeftSideBar';
import AppRoutes from './AppRoutes';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box
      color="#2d3748"
      minH="100vh"
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <LeftSidebar />
      <Box ml={60} p="4">
        <AppRoutes />
      </Box>
    </Box>
  </ChakraProvider>
);
