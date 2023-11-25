import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResponseData } from "../../_utils/responseData";
import { LineItem } from "../features/selectedItemsSlice";

export interface Cart {
    id: number,
    lineItems: LineItem[]
}

export interface Sneaker {
    id: number;
    brand: string;
    name: string;
    ean: string;
    price: number;
    releaseDate: Date;
    categories: string[];
    description: string;
    imageUrl: string;
};

export interface AddToCartRequestBody {
    color: string,
    size: number,
    quantity: number,
    product: Sneaker,
    userId: number
}




export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/sneaker-server/",
        credentials: "include",
    }),
    refetchOnReconnect: true,
    tagTypes: ["products", "product", "cart"],
    endpoints: (builder) => ({
        getProducts: builder.query<Sneaker[], null>({
            query: () => "products",
            providesTags: ["products"]
        }),
        getProductById: builder.query<Sneaker, number>({
            query: (id) => `products/${id}`,
            providesTags: ["product"]
        }),
        getProductBySearch: builder.query<Sneaker[], string>({
            query: (query) => `search?${query}`,
            providesTags: ["product"]
        }),
        getCart: builder.query<Cart, number>({
            query: (userId) => `cart?id=${userId}`,
            providesTags: ["cart"]
        })
        ,
        addToCart: builder.mutation<ResponseData, AddToCartRequestBody>({
            query: (body) => ({
                url: "/cart",
                body: body,
                method: "POST",
                headers: { "Content-Type": "application/json" },
            }),
            invalidatesTags: ["cart"]
        })
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetProductBySearchQuery, useGetCartQuery, useAddToCartMutation } = productsApi;
