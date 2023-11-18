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
    reducerPath: "productApi",
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: "http://192.168.1.5:8080/sneaker-server/",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<Sneaker[], null>({
            query: () => "products",
        }),
        getProductById: builder.query<Sneaker, { id: string }>({
            query: ({ id }) => `products/${id}`,
        }),
        getProductBySearch: builder.query<Sneaker[], string>({
            query: (query) => `search?${query}`,
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetProductBySearchQuery } = productsApi;
