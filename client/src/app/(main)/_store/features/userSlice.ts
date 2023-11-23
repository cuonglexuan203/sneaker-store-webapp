import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface User {
    info: UserInfo
}

export interface OAuthPayload {
    user: {
        name: string,
        email: string,
        image: string
    },
    expires: string,
}

export interface UserInfo {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    gender: boolean,
    birthday: string,
    phoneNumber: string,
    address: string,
    imageUrl: string
}

const initialInfo = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    gender: false,
    birthday: "2023-11-21",
    phoneNumber: "",
    address: "",
    imageUrl: ""
}


const initialState: User = {
    info: initialInfo,
}

function isOAuthPayload(user: UserInfo | OAuthPayload): user is OAuthPayload {
    return (user as OAuthPayload).expires !== undefined;
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<UserInfo | OAuthPayload>) => {
            if (isOAuthPayload(action.payload)) {
                state.info = { ...initialInfo };
                state.info.firstName = action.payload.user.name;
                state.info.email = action.payload.user.email;
                state.info.imageUrl = action.payload.user.image;
            }
            else {
                state.info = action.payload;
            }
        },
        removeUser: (state) => {
            state.info = initialInfo
        }
    }
})

export const { updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;