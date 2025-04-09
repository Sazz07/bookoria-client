import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hook';
import {
  selectCurrentUser,
  selectUserProfile,
  setProfile,
} from '../../redux/features/auth/authSlice';
import { useGetMyProfileQuery } from '../../redux/features/profile/profile.api';
import Loading from '../shared/Loading';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  const profile = useAppSelector(selectUserProfile);
  const dispatch = useAppDispatch();
  const [isInitializing, setIsInitializing] = useState(true);

  const { data, isLoading, isError } = useGetMyProfileQuery(undefined, {
    skip: !user || !!profile,
  });

  useEffect(() => {
    if (!user || (data && profile) || isError) {
      setIsInitializing(false);
    }
  }, [user, data, profile, isError]);

  useEffect(() => {
    if (data && !profile) {
      dispatch(
        setProfile({
          name: data?.data.name,
          image: data?.data.image,
          fullName: data?.data.fullName,
        })
      );
      setIsInitializing(false);
    }
  }, [data, profile, dispatch]);

  if (isInitializing && user && !profile && isLoading) {
    return <Loading fullScreen />;
  }

  return <>{children}</>;
};

export default AuthProvider;
