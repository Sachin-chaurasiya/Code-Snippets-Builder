import * as React from 'react';
import {
  Box,
  ChakraProvider,
  theme,
  useColorModeValue,
} from '@chakra-ui/react';
import CodeEditor from './components/CodeEditor/CodeEditor';
import Sidebar from './components/Sidebar/Sidebar';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Sidebar />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <CodeEditor />
      </Box>
    </Box>
  </ChakraProvider>
);
