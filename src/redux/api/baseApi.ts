import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { toast } from 'sonner';
import { logout, setUser } from '../features/auth/authSlice';
import { config } from '../../config/env.config';

const baseQuery = fetchBaseQuery({
  baseUrl: config.api.baseUrl,
  credentials: 'include',
  prepareHeaders: (headers: Headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  // Check if this is a payment verification request
  const isPaymentVerification =
    typeof args === 'object' && args.url
      ? args.url.includes('/orders/verify')
      : false;

  // Only show error toasts for non-payment verification requests
  if (
    (result.error?.status === 404 || result.error?.status === 403) &&
    !isPaymentVerification
  ) {
    toast.error((result.error?.data as { message: string }).message);
  }

  // Check if the result contains an error status of 401 (Unauthorized)
  if (result.error?.status === 401) {
    try {
      const res = await fetch(`${config.api.baseUrl}/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await res.json();

      if (data?.data?.accessToken) {
        const user = (api.getState() as RootState).auth.user;
        api.dispatch(setUser({ user, token: data?.data?.accessToken }));

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['User', 'Profile', 'Book', 'Cart', 'Order', 'Review'],
  endpoints: () => ({}),
});
