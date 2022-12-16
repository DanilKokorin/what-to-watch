import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const Settings = {
  TITLE: 'The Grand Budapest Hotel',
  GENRE: 'Drama',
  DATE: '2014',
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App title={Settings.TITLE} genre={Settings.GENRE} date={Settings.DATE} />
  </React.StrictMode>
);
