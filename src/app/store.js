// we have to create a store to use the api this store is created using redux 

import { configureStore } from "@reduxjs/toolkit";
// connecting api to store 

import { cryptoApi } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";
import { cryptoExchangesApi } from "../services/cryptoExchangesApi";




export default configureStore({
    reducer:{
        [cryptoApi.reducerPath]:cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]:cryptoNewsApi.reducer,
        [cryptoExchangesApi.reducerPath]:cryptoExchangesApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware,cryptoNewsApi.middleware,cryptoExchangesApi.middleware),
    

    //NOTE: Without this line:RTK Query’s caching, subscriptions, and auto-refetching won’t work, and we'll  see the error:
})