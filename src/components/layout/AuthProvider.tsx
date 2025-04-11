import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hook';
import {
  selectCurrentUser,
  setProfile,
} from '../../redux/features/auth/authSlice';
import { useGetMyProfileQuery } from '../../redux/features/profile/profile.api';
import Loading from '../shared/Loading';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [isInitializing, setIsInitializing] = useState(true);
  const [isAuthChanging, setIsAuthChanging] = useState(false);

  useEffect(() => {
    setIsAuthChanging(true);
    const timer = setTimeout(() => {
      setIsAuthChanging(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [user?.userId]);

  const { data, isLoading, isError } = useGetMyProfileQuery(undefined, {
    skip: !user,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (!user) {
      dispatch(setProfile(null));
      setIsInitializing(false);
    } else if (data?.data) {
      dispatch(
        setProfile({
          name: data.data.name,
          image: data.data.image,
          fullName: data.data.fullName,
        })
      );
      setIsInitializing(false);
    } else if (isError) {
      setIsInitializing(false);
    }
  }, [user, data, isError, dispatch]);

  if (isInitializing && user && isLoading) {
    return <Loading fullScreen />;
  }

  if (isAuthChanging) {
    return <Loading fullScreen />;
  }

  return <>{children}</>;
};

export default AuthProvider;
