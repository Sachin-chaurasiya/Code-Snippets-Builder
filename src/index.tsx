import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from 'App';
import 'index.css';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from 'AppProvider';
import ErrorBoundaryComponent from 'ErrorBoundary/ErrorBoundary';
import { ReactFlowProvider } from 'reactflow';
import { ChakraProvider, theme } from '@chakra-ui/react';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ErrorBoundaryComponent>
        <BrowserRouter>
          <ReactFlowProvider>
            <AppProvider>
              <App />
            </AppProvider>
          </ReactFlowProvider>
        </BrowserRouter>
      </ErrorBoundaryComponent>
    </ChakraProvider>
  </React.StrictMode>
);
