import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Auth {
    accountId: number,
    isLogging: boolean,
    isOAuth: boolean,
    isAccount: boolean,
}

const initialState : Auth = {
    accountId: 0,
    isLogging: false,
    isOAuth: false,
    isAccount: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state,action: PayloadAction<Auth>) => {
            state.accountId = action.payload.accountId;
            state.isLogging = action.payload.isLogging;
            state.isOAuth = action.payload.isOAuth;
            state.isAccount = action.payload.isAccount;
        },
        signOut: (state) =>{
            state.accountId = initialState.accountId;
            state.isLogging = initialState.isLogging;
            state.isOAuth = initialState.isOAuth;
            state.isAccount = initialState.isAccount;
        }
    }
})

export const {signIn, signOut} = authSlice.actions;
export default authSlice.reducer;