import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { TProfile, TUser } from '../../../types';

type TAuthState = {
  user: TUser | null;
  token: string | null;
  profile: TProfile | null;
};

const initialState: TAuthState = {
  user: null,
  token: null,
  profile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.profile = null;
    },
  },
});

export const { setUser, setProfile, logout } = authSlice.actions;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectUserProfile = (state: RootState) => state.auth.profile;

export default authSlice.reducer;
