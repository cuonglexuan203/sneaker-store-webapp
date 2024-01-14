import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, UserInfo } from "../features/userSlice";
import { ResponseData } from "../../_utils/responseData";


export interface Account {
    username: string,
    password: string
}
export interface AuthResponseBody {
    accountId: number,
    role: string,
    user: UserInfo
}

export interface SignUpRequestBody {
    user: {
        id?: string,
        firstName: string,
        lastName: string,
        email: string,
        gender: boolean,
        birthday: string,
        phoneNumber: string,
        address: {
            country: string,
            city: string,
            district: string,
        },
        imageUrl?: string
    },
    account: Account
}

export interface ChangePasswordRequestBody {
    userId: number,
    currentPassword: string,
    newPassword: string

}



export const userApi = createApi({
    reducerPath: 'userApi',
    tagTypes: ['user', 'account', "invoices"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/sneaker-server/",
        credentials: "include"
    }),
    refetchOnReconnect: true,
    endpoints: builder => ({
        getUser: builder.query<User, { id: number }>({
            query: (id) => `users/${id}`,
            providesTags: ['user'],
        }),
        updateUser: builder.mutation<ResponseData, UserInfo>({
            query: (userInfo) => ({
                url: `users`,
                method: 'PUT',
                body: userInfo,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }),
            invalidatesTags: ["account", "user"]
        }),
        signUp: builder.mutation<AuthResponseBody, SignUpRequestBody>({
            query: (body) => ({
                url: "auth/signup",
                method: "POST",
                body: body,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }),
            invalidatesTags: ["account", "user"]
        }),
        signIn: builder.mutation<AuthResponseBody, Account>({
            query: (account) => ({
                url: "auth/signin",
                method: "POST",
                body: account,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }),
            invalidatesTags: ["account", "user"]
        }),
        changePassword: builder.mutation<ResponseData, ChangePasswordRequestBody>({
            query: (body) => ({
                url: "changepassword",
                method: "PUT",
                body,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                }
            }),
            invalidatesTags: [],
        }),

    })
})

export const { useGetUserQuery, useUpdateUserMutation, useSignUpMutation, useSignInMutation, useChangePasswordMutation } = userApi;