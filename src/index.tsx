import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { moviesMock } from './mocks/moviesMock';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App movies={moviesMock} />
  </React.StrictMode>
);
