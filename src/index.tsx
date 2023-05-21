import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from 'App';
import 'index.css';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from 'AppProvider';
import ErrorBoundaryComponent from 'ErrorBoundary/ErrorBoundary';
import { ReactFlowProvider } from 'reactflow';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundaryComponent>
      <BrowserRouter>
        <ReactFlowProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </ReactFlowProvider>
      </BrowserRouter>
    </ErrorBoundaryComponent>
  </React.StrictMode>
);
