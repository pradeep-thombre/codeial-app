import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {ToastProvider} from 'react-toast-notifications';
import { AuthProvider,PostsProvider } from './providers';
ReactDOM.render(
  <React.StrictMode>
    <ToastProvider 
      autoDismiss autoDismissTimeout={2000} 
      placement='top-right'>
        <AuthProvider>
          <PostsProvider>
            <App/>
          </PostsProvider>
          
        </AuthProvider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
