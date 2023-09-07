import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const token = JSON.parse(localStorage.getItem('token'))
const productApi=createApi({
    reducerPath:'product',
    tagTypes:['Product'],
    baseQuery:fetchBaseQuery({baseUrl:'https://ecommerce-poly-be.onrender.com/api'}),
    endpoints:(builder)=>({
        getProducts:builder.query({
            query:({page,raiting,sortPrice,minPrice,maxPrice,valueSearch,categoryId})=>{
                return `/products?price[gte]=${minPrice?minPrice:0}&${maxPrice?`price[lte]=${maxPrice}`:''}&sort=${sortPrice?sortPrice:'createdAt'}&limit=4&page=${page}&raitings[gte]=${raiting?raiting:0}&${valueSearch?`search=${valueSearch}`:""}&${categoryId?`categoryId=${categoryId}`:""}`
            },
            providesTags:['Product']
        }),
        getOneProduct:builder.query({
            query:(id)=>`/products/${id}`,
            providesTags:['Product']
        }),
        getProductsAdmin:builder.query({
            query:({raiting,sortPrice,minPrice,maxPrice,valueSearch,categoryId})=>{
                return `/admin/products?price[gte]=${minPrice?minPrice:0}&${maxPrice?`price[lte]=${maxPrice}`:''}&sort=${sortPrice?sortPrice:'createdAt'}&raitings[gte]=${raiting?raiting:0}&${valueSearch?`search=${valueSearch}`:""}&${categoryId?`categoryId=${categoryId}`:""}`
            },
            providesTags:['Product']
        }),
        addProduct:builder.mutation({
            query:(product)=>({
                url:'/products',
                body:product,
                method:'post',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags:['Product']
        }),
        removeProduct:builder.mutation({
            query:(id)=>({
                url:`/products/${id}`,
                method:'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags:['Product']
        }),
        updateProduct:builder.mutation({
            query:(product)=>({
                url:`/products/${product.id}`,
                body:product,
                method:'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags:['Product']
        }),
    })
})
export const {useGetProductsQuery,useGetOneProductQuery,useGetProductsAdminQuery,useAddProductMutation,useRemoveProductMutation,useUpdateProductMutation}=productApi
export default productApi