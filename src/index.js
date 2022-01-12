import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {ToastProvider} from 'react-toast-notifications';
import { AuthProvider } from './providers/AuthProvider';
ReactDOM.render(
  <React.StrictMode>
    <ToastProvider 
      autoDismiss autoDismissTimeout={2000} 
      placement='top-right'>
        <AuthProvider>
          <App/>
        </AuthProvider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
