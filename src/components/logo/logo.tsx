import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';

function Logo() {
  return (
    <Link to={AppRoute.Main}>
      <div className="logo">
        <a className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>
    </Link>
  );
}

export default Logo;
