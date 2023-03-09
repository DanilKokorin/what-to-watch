import { Navigate, RouteProps } from 'react-router';
import { AppRoute, AuthStatus } from '../constants';
import { useAppSelector } from '../hooks';

type PrivateRouteProps = RouteProps & {
  children: JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { authStatus } = useAppSelector((state) => state);

  return authStatus === AuthStatus.Auth ? (
    props.children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
