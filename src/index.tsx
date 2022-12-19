import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { DATE, GENRE, TITLE } from './constants';

const Settings = {
  TITLE,
  GENRE,
  DATE,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App title={Settings.TITLE} genre={Settings.GENRE} date={Settings.DATE} />
  </React.StrictMode>
);
