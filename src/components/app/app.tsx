import MainScreen from '../main-screen/main-screen';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../constants';
import ErrorPage from '../error-page/error-page';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import AddReview from '../add-review/add-review';
import PrivateRoute from '../../route/private-route';
import Layout from '../../route/layout';
import Movie from '../movie/movie';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../history-route/browser-history';
import Player from '../player/player';

function App(): JSX.Element {
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />}>
          <Route index element={<MainScreen />} />
          <Route path={AppRoute.Login} element={<SignIn />} />
          <Route
            path={AppRoute.List}
            element={
              <PrivateRoute>
                <MyList />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Film}>
            <Route index element={<Movie />} />
            <Route
              path={AppRoute.Review}
              element={
                <PrivateRoute>
                  <AddReview />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path={AppRoute.Player} element={<Player />} />
        </Route>
        <Route path={AppRoute.Any} element={<ErrorPage />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
