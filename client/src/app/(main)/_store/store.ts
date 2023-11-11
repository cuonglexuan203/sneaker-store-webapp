import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import { userApi } from "./services/userApi";
import { productsApi } from "./services/productsApi";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [userApi.reducerPath]: userApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare()
            .concat(userApi.middleware)
            .concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
