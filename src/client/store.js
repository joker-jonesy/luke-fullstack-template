import { configureStore } from "@reduxjs/toolkit";
import { api } from "./reducers/api";
import authReducer from './reducers/auth'
import dataReducer from './reducers/api'

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
        data:dataReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export default store;
