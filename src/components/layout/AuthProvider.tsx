import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hook';
import {
  selectCurrentUser,
  selectUserProfile,
  setProfile,
} from '../../redux/features/auth/authSlice';
import { useGetUserProfileQuery } from '../../redux/features/auth/authApi';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  const profile = useAppSelector(selectUserProfile);
  const dispatch = useAppDispatch();

  const { data } = useGetUserProfileQuery(undefined, {
    skip: !user || !!profile,
  });

  useEffect(() => {
    if (data && !profile) {
      dispatch(
        setProfile({
          name: data?.data.name,
          image: data?.data.image,
          fullName: data?.data.fullName,
        })
      );
    }
  }, [data, profile, dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
