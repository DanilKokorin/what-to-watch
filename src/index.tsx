import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { moviesMock } from './mocks/moviesMock';
import { commentsMock } from './mocks/commentsMock';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App movies={moviesMock} reviews={commentsMock} />
    </Provider>
  </React.StrictMode>
);
