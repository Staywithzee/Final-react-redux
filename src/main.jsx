import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { store } from './app/store';
import { LanguageProvider } from './context/LanguageContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MotionConfig reducedMotion="user">
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </MotionConfig>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
