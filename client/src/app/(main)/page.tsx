"use client";

import { useAppDispatch, useAppSelector } from "@/app/(main)/_store/hooks";
import { useGetProductsQuery } from "./_store/services/productsApi";

export default function Home() {
    const dispatch = useAppDispatch();

    const {
        isLoading: isProductsLoading,
        isFetching: isProductsFetching,
        data: products = [],
        error: productsError,
    } = useGetProductsQuery(null);

    return (
        <main>
            {productsError ? (
                <p>Wait a minute</p>
            ) : isProductsLoading || isProductsFetching ? (
                <p>is loading</p>
            ) : products ? (
                products.map((p) => (
                    <img width={200} key={p.id} src={p.imageUrl} />
                ))
            ) : (
                <p>Nothing</p>
            )}
        </main>
    );
}
