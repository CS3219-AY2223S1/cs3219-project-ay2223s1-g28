import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ThemeWrapper from './components/ThemeWrapper';
import { AlertContextProvider } from './context/alert-context';
import { UserContextProvider } from './context/user-context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeWrapper>
    <AlertContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </AlertContextProvider>
  </ThemeWrapper>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
