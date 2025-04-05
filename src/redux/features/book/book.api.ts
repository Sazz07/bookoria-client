import { TBook, TQueryParam, TResponseRedux } from '../../../types';
import { baseApi } from '../../api/baseApi';

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: '/books',
          method: 'GET',
          params,
        };
      },
      providesTags: ['Book'],
      transformResponse: (response: TResponseRedux<TBook[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getBook: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'GET',
      }),
      providesTags: ['Book'],
    }),
    createBook: builder.mutation({
      query: (body) => ({
        url: '/books',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Book'],
    }),
    createBulkBook: builder.mutation({
      query: (body) => ({
        url: '/books/bulk',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Book'],
    }),
    editBook: builder.mutation({
      query: ({ id, body }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Book'],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useCreateBulkBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
} = bookApi;
