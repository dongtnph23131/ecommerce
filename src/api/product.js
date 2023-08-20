import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const productApi=createApi({
    reducerPath:'product',
    tagTypes:['Product'],
    baseQuery:fetchBaseQuery({baseUrl:'https://ecommerce-poly-be.onrender.com/api'}),
    endpoints:(builder)=>({
        getProducts:builder.query({
            query:({page,raiting,sortPrice,minPrice,maxPrice})=>{
                return `/products?price[gte]=${minPrice?minPrice:0}&${maxPrice?`price[lte]=${maxPrice}`:''}&sort=${sortPrice?sortPrice:'createAt'}&limit=8&page=${page}&raitings[gte]=${raiting?raiting:0}`
            }
        })
    })
})
export const {useGetProductsQuery}=productApi

export default productApi