import { TOrder, TQueryParam, TResponseRedux } from '../../../types';
import { baseApi } from '../../api/baseApi';

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (body) => ({
        url: '/orders/create-order',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),
    getMyOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/orders/my-orders',
          method: 'GET',
          params,
        };
      },
      providesTags: ['Order'],
      transformResponse: (response: TResponseRedux<TOrder[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    // Get all orders (admin only)
    getAllOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/orders',
          method: 'GET',
          params,
        };
      },
      providesTags: ['Order'],
      transformResponse: (response: TResponseRedux<TOrder[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'GET',
      }),
      providesTags: ['Order'],
      transformResponse: (response: TResponseRedux<TOrder>) => {
        return response.data;
      },
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/orders/${id}/status`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Order'],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Order'],
    }),
    verifyPayment: builder.query({
      query: (orderId) => ({
        url: `/orders/verify?order_id=${orderId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
  useVerifyPaymentQuery,
} = orderApi;
