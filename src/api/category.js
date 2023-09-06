import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const token = JSON.parse(localStorage.getItem('token'))
const apiCategory = createApi({
    reducerPath: 'category',
    tagTypes: ['category'],
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ecommerce-poly-be.onrender.com/api' }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `/categories`,
            providesTags: ['category']
        }),
        addCategory: builder.mutation({
            query: (category) => ({
                url: '/categories',
                method: 'POST',
                body: category,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['category']
        }),
        removeCategory: builder.mutation({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['category']
        }),
        updateCategory: builder.mutation({
            query: (category) => ({
                url: `/categories/${category.id}`,
                method: 'PATCH',
                body: category,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['category']
        }),
        getOneCategory: builder.query({
            query: (id) => {
                return {
                    url: `/categories/${id}`
                }
                // console.log(id);
                // return `/categories/${id}`
            },
        }),
    })
})
export const { useGetCategoriesQuery, useAddCategoryMutation, useRemoveCategoryMutation, useUpdateCategoryMutation, useGetOneCategoryQuery } = apiCategory
export default apiCategory