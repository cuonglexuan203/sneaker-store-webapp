import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Product = {
  id: number;
  name: string;
  imageUrl: string;
};

export const productsApi = createApi({
  reducerPath: "productApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/sneaker-server/",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], null>({
      query: () => "products",
    }),
    getProductById: builder.query<Product, { id: string }>({
      query: ({ id }) => `products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
