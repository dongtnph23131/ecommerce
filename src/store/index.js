import { combineReducers } from "redux";
import apiCategory from "../api/category";
import { configureStore } from "@reduxjs/toolkit";
import authApi from "../api/auth";
import productApi from "../api/product";

const rootReducer = combineReducers({
    [apiCategory.reducerPath]: apiCategory.reducer,
    [authApi.reducerPath]:authApi.reducer,
    [productApi.reducerPath]:productApi.reducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiCategory.middleware).concat(authApi.middleware).concat(productApi.middleware),
})
export default store