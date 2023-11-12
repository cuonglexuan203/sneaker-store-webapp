"use client";

import {
    decrement,
    increment,
    reset,
} from "@/app/(main)/_store/features/counterSlice";
import { useAppDispatch, useAppSelector } from "@/app/(main)/_store/hooks";
import { useGetUsersQuery } from "./_store/services/userApi";
import { useGetProductsQuery } from "./_store/services/productsApi";

export default function Home() {
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();

    const {
        isLoading,
        isFetching,
        data: users = [],
        error,
    } = useGetUsersQuery(null);

    const {
        isLoading: isProductsLoading,
        isFetching: isProductsFetching,
        data: products = [],
        error: productsError,
    } = useGetProductsQuery(null);

    return (
        <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
            <div style={{ marginBottom: "4rem", textAlign: "center" }}>
                <h4 style={{ marginBottom: 16 }}>{count}</h4>
                <button onClick={() => dispatch(increment())}>increment</button>
                <button
                    onClick={() => dispatch(decrement())}
                    style={{ marginInline: 16 }}
                >
                    decrement
                </button>
                <button onClick={() => dispatch(reset())}>reset</button>
            </div>

            {error ? (
                <p>Oh no, there was an error</p>
            ) : isLoading || isFetching ? (
                <p>Loading...</p>
            ) : users ? (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr",
                        gap: 20,
                    }}
                >
                    {users.map((user) => (
                        <div
                            key={user.id}
                            style={{
                                border: "1px solid #ccc",
                                textAlign: "center",
                            }}
                        >
                            <img
                                src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
                                alt={user.name}
                                style={{ height: 180, width: 180 }}
                            />
                            <h3>{user.name}</h3>
                        </div>
                    ))}
                </div>
            ) : null}
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
