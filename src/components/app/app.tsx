import MainScreen from '../main-screen/main-screen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../constants';
import ErrorPage from '../error-page/error-page';
import FilmsCard from '../films-card/films-card';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import PrivateRoute from '../../route/private-route';
import Layout from '../../route/layout';

type AppScreenProps = {
  title: string;
  genre: string;
  date: string;
};

function App({ title, genre, date }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout />}>
          <Route
            index
            element={<MainScreen title={title} genre={genre} date={date} />}
          />
          <Route path={AppRoute.Login} element={<SignIn />} />
          <Route
            path={AppRoute.List}
            element={
              <PrivateRoute authStatus={AuthStatus.NoAuth}>
                <MyList />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Film}>
            <Route index element={<FilmsCard />} />
            <Route path={AppRoute.Review} element={<AddReview />} />
          </Route>

          <Route path={AppRoute.Player} element={<Player />} />
        </Route>
        <Route path={AppRoute.Any} element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
