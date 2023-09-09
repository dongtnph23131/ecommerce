import { combineReducers } from "redux";
import apiCategory from "../api/category";
import { configureStore } from "@reduxjs/toolkit";
import authApi from "../api/auth";
import productApi from "../api/product";
import storage from 'redux-persist/lib/storage';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist';
import cartSlice from "../slices/cart";
import orderApi from "../api/order";
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}
const rootReducer = combineReducers({
    [apiCategory.reducerPath]: apiCategory.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    'cart': cartSlice.reducer,
    [orderApi.reducerPath]: orderApi.reducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(apiCategory.middleware).concat(authApi.middleware).concat(productApi.middleware).concat(orderApi.middleware),
})
const persistor = persistStore(store);
export { store, persistor };