import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
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
                body: category
            }),
            invalidatesTags: ['category']
        })
    })
})
export const { useGetCategoriesQuery, useAddCategoryMutation } = apiCategory
export default apiCategory