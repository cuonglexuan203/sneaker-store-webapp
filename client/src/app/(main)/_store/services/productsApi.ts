import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Sneaker = {
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

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/sneaker-server/",
        credentials: "include",
    }),
    refetchOnReconnect: true,
    tagTypes: ["products", "product"],
    endpoints: (builder) => ({
        getProducts: builder.query<Sneaker[], null>({
            query: () => "products",
            providesTags: ["products"]
        }),
        getProductById: builder.query<Sneaker, { id: string }>({
            query: ({ id }) => `products/${id}`,
            providesTags: ["product"]
        }),
        getProductBySearch: builder.query<Sneaker[], string>({
            query: (query) => `search?${query}`,
            providesTags: ["product"]
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetProductBySearchQuery } = productsApi;
