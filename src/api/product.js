import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const productApi=createApi({
    reducerPath:'product',
    tagTypes:['Product'],
    baseQuery:fetchBaseQuery({baseUrl:'https://ecommerce-poly-be.onrender.com/api'}),
    endpoints:(builder)=>({
        getProducts:builder.query({
            query:({page,raiting,sortPrice,minPrice,maxPrice,valueSearch,categoryId})=>{
                return `/products?price[gte]=${minPrice?minPrice:0}&${maxPrice?`price[lte]=${maxPrice}`:''}&sort=${sortPrice?sortPrice:'createdAt'}&limit=4&page=${page}&raitings[gte]=${raiting?raiting:0}&${valueSearch?`search=${valueSearch}`:""}&${categoryId?`categoryId=${categoryId}`:""}`
            }
        }),
        getOneProduct:builder.query({
            query:(id)=>`/products/${id}`
        })
    })
})
export const {useGetProductsQuery,useGetOneProductQuery}=productApi
export default productApi