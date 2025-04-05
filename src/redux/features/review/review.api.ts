import { TQueryParam, TResponseRedux, TReview } from '../../../types';
import { baseApi } from '../../api/baseApi';

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviewsByBook: builder.query({
      query: ({ bookId, args }) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: `/reviews/book/${bookId}`,
          method: 'GET',
          params,
        };
      },
      providesTags: ['Review'],
      transformResponse: (response: TResponseRedux<TReview[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getMyReviews: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/reviews/my-reviews',
          method: 'GET',
          params,
        };
      },
      providesTags: ['Review'],
      transformResponse: (response: TResponseRedux<TReview[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createReview: builder.mutation({
      query: ({ bookId, body }) => ({
        url: `/reviews/book/${bookId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Review', 'Book'],
    }),
    updateReview: builder.mutation({
      query: ({ id, body }) => ({
        url: `/reviews/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Review', 'Book'],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Review', 'Book'],
    }),
  }),
});

export const {
  useGetReviewsByBookQuery,
  useGetMyReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
