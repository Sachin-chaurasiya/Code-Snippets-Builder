import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from 'App';
import 'index.css';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from 'AppProvider';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
