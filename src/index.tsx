import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { commentsMock } from './mocks/commentsMock';
import { store } from './store';
import { checkAuthStatus, fetchMoviesAction } from './store/api-action';
import ErrorMessage from './components/error-message';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchMoviesAction());
store.dispatch(checkAuthStatus());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App reviews={commentsMock} />
    </Provider>
  </React.StrictMode>
);
