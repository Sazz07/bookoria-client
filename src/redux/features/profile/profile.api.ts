import { baseApi } from '../../api/baseApi';

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => ({
        url: '/users/my-profile',
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),
    editMyProfile: builder.mutation({
      query: (body) => ({
        url: '/users/my-profile',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const { useGetMyProfileQuery, useEditMyProfileMutation } = profileApi;
