import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, UserInfo } from "../features/userSlice";


export interface Account {
    id: number,
    username: string,
    password: string
}
export interface AuthResponse {
    id: number,
    role: string,
    user: UserInfo
}

export const userApi = createApi({
    reducerPath: 'userApi',
    tagTypes: ['user', 'account'],
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
        signUp: builder.mutation<AuthResponse, User>({
            query: (user) => ({
                url: "users",
                method: "POST",
                body: user,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }),
            invalidatesTags: ["account"]
        }),
        signIn: builder.mutation<AuthResponse, Account>({
            query: ({ id, ...rest }) => ({
                url: "auth/signin",
                method: "POST",
                body: rest,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }),
            invalidatesTags: ["account"]
        })
    })
})

export const { useGetUserQuery, useSignUpMutation, useSignInMutation } = userApi;