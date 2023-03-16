import Logo from '../logo/logo';
import { FormEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthStatus, NameSpace } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-action';
import { AuthData } from '../../types/data';
import { setUser } from '../../store/user-process/user-process';

function SignIn(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authStatus = useAppSelector(
    (state) => state[NameSpace.user].authStatus
  );

  useEffect(() => {
    loginRef.current?.focus();
  }, []);

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    evt.stopPropagation();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        identifier: loginRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch(setUser(loginRef.current.value));
      navigate(AppRoute.Main);
    }
  };

  useEffect(() => {
    if (authStatus === AuthStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authStatus, navigate]);

  return (
    <>
      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo />

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="" className="sign-in__form" onSubmit={handleSubmit}>
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input
                  ref={loginRef}
                  className="sign-in__input"
                  // type="email"
                  type="text"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"
                />
                <label
                  className="sign-in__label visually-hidden"
                  htmlFor="user-email"
                >
                  Email address
                </label>
              </div>
              <div className="sign-in__field">
                <input
                  ref={passwordRef}
                  className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"
                />
                <label
                  className="sign-in__label visually-hidden"
                  htmlFor="user-password"
                >
                  Password
                </label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">
                Sign in
              </button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
export default SignIn;
