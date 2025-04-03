import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { logout, useCurrentToken } from '../../redux/features/auth/authSlice';
import { verifyToken } from '../../utils/verifyToken';
import { Navigate } from 'react-router-dom';
import { TUser, TUserRole } from '../../types';

type ProtectedLayoutProps = {
  children: React.ReactNode;
  allowedRoles?: TUserRole[] | undefined;
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedLayoutProps) => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  if (!token) {
    return <Navigate to='/login' replace={true} />;
  }

  const user = verifyToken(token) as TUser | null;

  if (
    !user ||
    (allowedRoles &&
      allowedRoles.length > 0 &&
      !allowedRoles.includes(user.role))
  ) {
    dispatch(logout());
    return <Navigate to='/login' replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
