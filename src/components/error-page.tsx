import { Link } from 'react-router-dom';
import Logo from './logo';

function ErrorPage() {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
      </header>

      <div className="sign-in user-page__content">
        <h1 className="sign-in__label">404. Ошибка.</h1>
        <Link to="/" className="page-title user-page__title">
          Вернуться на главную страницу.
        </Link>
      </div>

      <footer className="page-footer">
        <Logo />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default ErrorPage;
