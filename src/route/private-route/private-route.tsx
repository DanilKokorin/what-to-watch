import { Navigate, RouteProps } from 'react-router';
import { AppRoute, AuthStatus } from '../../constants';

type PrivateRouteProps = RouteProps & {
  authStatus: AuthStatus;
  children: JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { authStatus, children } = props;

  return authStatus === AuthStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
