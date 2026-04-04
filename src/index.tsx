import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from 'App';
import './index.css';
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
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    // eslint-disable-next-line prettier/prettier
    heading:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    // eslint-disable-next-line prettier/prettier
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
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
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
        lineHeight: 'tall',
      },
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
      variants: {
        brand: {
          bg: 'brand.500',
          color: 'white',
          borderRadius: 'full',
          fontWeight: '600',
          _hover: {
            bg: 'brand.600',
            transform: 'translateY(-1px)',
            boxShadow: 'lg',
          },
          _active: {
            bg: 'brand.700',
            transform: 'translateY(0)',
          },
          transition: 'all 0.2s',
        },
        ghost: {
          _hover: {
            bg: 'gray.100',
          },
        },
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'brand.500',
      },
      variants: {
        outline: {
          field: {
            borderRadius: 'lg',
            borderColor: 'gray.200',
            _hover: {
              borderColor: 'gray.300',
            },
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          overflow: 'hidden',
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: '700',
        letterSpacing: '-0.02em',
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
