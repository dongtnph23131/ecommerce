import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const token = JSON.parse(localStorage.getItem('token'))

const orderApi = createApi({
    reducerPath: 'order',
    tagTypes: ['Order'],
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ecommerce-poly-be.onrender.com/api' }),
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: '/orders',
                method: 'post',
                body: order,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['Order']
        }),
        getAllOrder: builder.query({
            query: () => '/orders',
            providesTags: ['Order']
        }),
        getDetailOrder: builder.query({
            query: (id) => `/orders/${id}`,
            providesTags: ['Order']
        }),
        updateOrder: builder.mutation({
            query: (order) => ({
                url: `/orders/${order._id}`,
                body: order,
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags:['Order']
        })
    })
})
export const { useCreateOrderMutation, useGetAllOrderQuery, useGetDetailOrderQuery,useUpdateOrderMutation } = orderApi

export default orderApi