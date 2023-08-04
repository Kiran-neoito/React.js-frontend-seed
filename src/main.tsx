import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
