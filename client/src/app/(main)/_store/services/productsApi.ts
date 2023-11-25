import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResponseData } from "../../_utils/responseData";
import { IndexedLineItem } from "../features/selectedItemsSlice";

export interface Cart {
    id: number,
    lineItems: IndexedLineItem[]
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

export interface UpdateLineItemQuantityRequestBody {
    lineItemId: number,
    quantity: number
}


export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/sneaker-server/",
        credentials: "include",
    }),
    refetchOnReconnect: true,
    tagTypes: ["products", "product", "cart", "lineItem"],
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
            query: (userId) => `cart?userId=${userId}`,
            providesTags: ["cart"]
        }),
        addToCart: builder.mutation<ResponseData, AddToCartRequestBody>({
            query: (body) => ({
                url: "/cart",
                body: body,
                method: "POST",
                headers: { "Content-Type": "application/json" },
            }),
            invalidatesTags: ["cart"]
        }),
        removeFromCart: builder.mutation<ResponseData, number>({
            query: (lineItemId) => ({
                url: `/lineitems/${lineItemId}`,
                method: "DELETE",
                headers: { "Content-Type": "application/plain" },
            }),
            invalidatesTags: ['cart']
        }),
        emptyCart: builder.mutation<ResponseData, number>({
            query: (userId) => (
                {
                    url: `/cart?userId=${userId}`,
                    method: "DELETE",
                    headers: { "Content-Type": "application/plain" },
                }
            ),
            invalidatesTags: ["cart"]
        }),
        getLineItemById: builder.query<IndexedLineItem, number>({
            query: (id) => `/lineitems/${id}`,
            providesTags: ["lineItem"]
        }),
        updateLineItemQuantity: builder.mutation<ResponseData, UpdateLineItemQuantityRequestBody>({
            query: (body) => ({
                url: `/lineitems/${body.lineItemId}`,
                body,
                method: "POST",
                headers: { "Content-Type": "application/json" }
            }),
            invalidatesTags: ["cart", "lineItem"]
        }),

    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetProductBySearchQuery, useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation, useEmptyCartMutation, useGetLineItemByIdQuery, useUpdateLineItemQuantityMutation } = productsApi;
