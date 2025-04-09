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

  const { data, isLoading, isError } = useGetMyProfileQuery(undefined, {
    skip: !user,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (!user) {
      dispatch(setProfile(null));
      setIsInitializing(false);
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (data?.data && user) {
      dispatch(
        setProfile({
          name: data.data.name,
          image: data.data.image,
          fullName: data.data.fullName,
        })
      );
      setIsInitializing(false);
    }
  }, [data, dispatch, user]);

  useEffect(() => {
    if (isError) {
      setIsInitializing(false);
    }
  }, [isError]);

  if (isInitializing && user && isLoading) {
    return <Loading fullScreen />;
  }

  return <>{children}</>;
};

export default AuthProvider;
