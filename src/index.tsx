import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from 'App';
import 'index.css';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from 'AppProvider';
import ErrorBoundaryComponent from 'components/ErrorBoundary/ErrorBoundary';
import { ReactFlowProvider } from 'reactflow';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

const theme = extendTheme({
  colors: {
    brand: {
      50: '#EEF0FC',
      100: '#E0E4FA',
      200: '#BDC6F4',
      300: '#9FABEF',
      400: '#7C8CE9',
      500: '#5E71E4',
      600: '#2540DA',
      700: '#1C31A6',
      800: '#12206D',
      900: '#0A1139',
      950: '#04081A',
    },
  },
  components: {
    Button: {
      sizes: {
        xl: {
          h: '56px',
          fontSize: 'lg',
          px: '32px',
        },
      },
    },
  },
});

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
