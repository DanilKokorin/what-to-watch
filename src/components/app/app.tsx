import MainScreen from '../main-screen/main-screen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../constants';
import ErrorPage from '../error-page/error-page';
import MoviePageDetails from '../movie-page-details/movie-page-details';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import PrivateRoute from '../../route/private-route';
import Layout from '../../route/layout';
import { Movies } from '../../mocks/movieType';

type AppScreenProps = {
  movies: Movies;
};

function App({ movies }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />}>
          <Route index element={<MainScreen movies={movies} />} />
          <Route path={AppRoute.Login} element={<SignIn />} />
          <Route
            path={AppRoute.List}
            element={
              <PrivateRoute authStatus={AuthStatus.Auth}>
                <MyList movies={movies} />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Film}>
            <Route index element={<MoviePageDetails />} />
            <Route
              path={AppRoute.Review}
              element={
                <PrivateRoute authStatus={AuthStatus.Auth}>
                  <AddReview movies={movies} />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path={AppRoute.Player} element={<Player movies={movies} />} />
        </Route>
        <Route path={AppRoute.Any} element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
