import { configureStore } from "@reduxjs/toolkit";
import { api } from "./redux/api/api";
import authReducer from './redux/slices/authSlice'
import dataReducer from './redux/slices/dataSlice'
import socketReducer from './redux/socket'

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
        data:dataReducer,
        sockets: socketReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export default store;
