import { EnhancedStore, configureStore } from "@reduxjs/toolkit";
import navBarReducer from "./features/navBarSlice"
import { productsApi } from "./services/productsApi";

export const store: EnhancedStore = configureStore({
    reducer: {
        navbar: navBarReducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare()
            .concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
