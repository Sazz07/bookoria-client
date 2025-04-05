import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hook';
import { useCurrentToken } from '../../redux/features/auth/authSlice';

type UnauthenticatedOnlyRouteProps = {
  children: React.ReactNode;
};

const UnauthenticatedOnlyRoute = ({
  children,
}: UnauthenticatedOnlyRouteProps) => {
  const token = useAppSelector(useCurrentToken);

  // If user is already logged in, redirect to home page
  if (token) {
    return <Navigate to='/' replace={true} />;
  }

  return <>{children}</>;
};

export default UnauthenticatedOnlyRoute;
