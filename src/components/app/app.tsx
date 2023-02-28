import MainScreen from '../main-screen/main-screen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../constants';
import ErrorPage from '../error-page/error-page';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import PrivateRoute from '../../route/private-route';
import Layout from '../../route/layout';
import Movie from '../movie/movie';
import { Comments } from '../../mocks/commentType';

type AppScreenProps = {
  reviews: Comments;
};

function App({ reviews }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />}>
          <Route index element={<MainScreen />} />
          <Route path={AppRoute.Login} element={<SignIn />} />
          <Route
            path={AppRoute.List}
            element={
              <PrivateRoute authStatus={AuthStatus.Auth}>
                <MyList />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Film}>
            <Route index element={<Movie reviews={reviews} />} />
            <Route
              path={AppRoute.Review}
              element={
                <PrivateRoute authStatus={AuthStatus.Auth}>
                  <AddReview />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path={AppRoute.Player} element={<Player />} />
        </Route>
        <Route path={AppRoute.Any} element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
