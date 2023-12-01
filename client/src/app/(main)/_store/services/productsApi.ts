import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResponseData } from "../../_utils/responseData";
import { IndexedLineItem, LineItem } from "../features/selectedItemsSlice";
import { Address } from "../../_utils/types";

export interface Cart {
    id: number,
    lineItems: IndexedLineItem[]
}
export interface Invoice {
    id: number,
    status: string,
    paymentTime: string,
    address: Address,
    deliveryStatus: string,
    totalAmount: number,
    lineItems: IndexedLineItem[]
}
export interface Sneaker {
    id: number;
    brand: string;
    name: string;
    ean: string;
    price: number;
    releaseDate: string;
    categories: string[];
    description: string;
    imageUrl: string;
};

export interface ProductInventory {
    id: number;
    productAmount: number;
    color: string;
    size: number;
}

export interface GetProductByIdResponseBody {
    product: Sneaker,
    productInventories: ProductInventory[];
}

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

export interface RemoveManyFromCartRequestBody {
    lineItemIds: number[];
}

export interface PurchaseRequestBody {
    lineItems: IndexedLineItem[];
    creditCardNumber: string;
    shippingEmail: string;
    cardHolder: string;
    address: Address;
    userId: number;
}

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/sneaker-server/",
        credentials: "include",
    }),
    refetchOnReconnect: true,
    tagTypes: ["products", "product", "cart", "lineItem", "invoices"],
    endpoints: (builder) => ({
        getProducts: builder.query<Sneaker[], null>({
            query: () => "products",
            providesTags: ["products"]
        }),
        getProductById: builder.query<GetProductByIdResponseBody, number>({
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
        //*
        removeManyFromCart: builder.mutation<ResponseData, RemoveManyFromCartRequestBody>({
            query: (body) => ({
                url: `/lineitems/0`,
                method: "DELETE",
                body,
                headers: { "Content-Type": "application/json" },
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
            invalidatesTags: ["lineItem", "cart"]
        }),
        purchase: builder.mutation<ResponseData, PurchaseRequestBody>({
            query: (body) => ({
                url: "purchase",
                method: "POST",
                body,
                headers: {
                    "Content-Type": "application/json"
                }
            }),
            invalidatesTags: ["cart", "invoices"]
        }),
        getInvoices: builder.query<Invoice[], number>({
            query: (userId) => `invoices?userId=${userId}`,
            providesTags: ['invoices'],
        })

    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetProductBySearchQuery, useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation, useRemoveManyFromCartMutation, useEmptyCartMutation, useGetLineItemByIdQuery, useUpdateLineItemQuantityMutation, usePurchaseMutation, useGetInvoicesQuery } = productsApi;
