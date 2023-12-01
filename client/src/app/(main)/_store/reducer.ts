import { combineReducers } from "@reduxjs/toolkit";
import navBarReducer from "./features/navBarSlice"
import userReducer from "./features/userSlice";
import authReducer from "./features/authSlice";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/es/storage/session";
import { persistReducer } from "redux-persist";
import { productsApi } from "./services/productsApi";
import { userApi } from "./services/userApi";
import selectedItemsReducer from "./features/selectedItemsSlice";
import statusReducer from "./features/statusSlice";


const rootPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'auth', 'tempCart'],
    version: 1,
}

const tempCartPersistConfig = {
    key: 'tempCart',
    storage: sessionStorage,
    version: 1,
}

const rootReducer = combineReducers({
    navbar: navBarReducer,
    user: userReducer,
    auth: authReducer,
    status: statusReducer,
    tempCart: persistReducer(tempCartPersistConfig, selectedItemsReducer),
    [productsApi.reducerPath]: productsApi.reducer,
    [userApi.reducerPath]: userApi.reducer
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;