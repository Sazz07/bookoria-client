import { TQueryParam, TResponseRedux, TUser } from '../../../types';
import { baseApi } from '../../api/baseApi';

const adminUserManagement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/admin/users',
          method: 'GET',
          params,
        };
      },
      providesTags: ['User'],
      transformResponse: (response: TResponseRedux<TUser[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/users/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    blockUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}/block`,
        method: 'PATCH',
      }),
      invalidatesTags: ['User'],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useBlockUserMutation,
  useDeleteUserMutation,
} = adminUserManagement;
