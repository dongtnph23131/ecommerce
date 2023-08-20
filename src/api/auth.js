import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const authApi=createApi({
    reducerPath:'auth',
    baseQuery:fetchBaseQuery({baseUrl:'https://ecommerce-poly-be.onrender.com/api'}),
    endpoints:(builder)=>({
        signup:builder.mutation({
            query:(user)=>({
                url:'/signup',
                method:'POST',
                body:user
            })
        }),
        signin:builder.mutation({
            query:(user)=>({
                url:'/signin',
                method:'POST',
                body:user
            })
        })
    })
})
export const {useSignupMutation,useSigninMutation}=authApi
export default authApi