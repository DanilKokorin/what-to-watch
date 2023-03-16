import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../constants';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { logoutAction } from '../../store/api-action';
import Logo from '../logo/logo';

function Header(): JSX.Element {
  const { authStatus, user } = useAppSelector(({ user }) => user);

  const isAuthorized = authStatus === AuthStatus.Auth;

  const navigate = useNavigate();

  return (
    <header className="page-header film-card__head">
      <Logo />

      <ul className="user-block">
        {isAuthorized ? (
          <>
            <li className="user-block__item">
              <div
                className="user-block__avatar"
                onClick={() => navigate(AppRoute.List)}
              >
                <img
                  src="img/avatar.jpg"
                  alt="User avatar"
                  width="63"
                  height="63"
                />
              </div>
            </li>
            <li className="user-block__item">{user}</li>
            <li className="user-block__item">
              <Link
                className="user-block__link"
                onClick={(evt: any) => {
                  evt.preventDefault();
                  store.dispatch(logoutAction());
                }}
                to="/"
              >
                Sign out
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="user-block__item">
              <Link className="user-block__link" to={AppRoute.Login}>
                Sign in
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
