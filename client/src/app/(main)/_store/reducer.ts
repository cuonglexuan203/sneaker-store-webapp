import { combineReducers } from "@reduxjs/toolkit";
import navBarReducer from "./features/navBarSlice"
import userReducer from "./features/userSlice";
import authReducer from "./features/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { productsApi } from "./services/productsApi";
import { userApi } from "./services/userApi";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const rootPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'auth'],
    version: 1,
    // stateReconciler: autoMergeLevel2
}

const rootReducer = combineReducers({
    navbar: navBarReducer,
    user: userReducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [userApi.reducerPath]: userApi.reducer
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;