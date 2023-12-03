"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import Image from "next/image";
import Product from "./_components/Product";
import { useGetProductsQuery } from "./_store/services/productsApi";
import { FaThumbsUp } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "./_store/hooks";
import { RootState } from "./_store/store";
import {
    toggleIsNotificationOpen,
    toggleIsUserMenuOpen,
} from "./_store/features/navBarSlice";
import { showToast, hideToast, showLoading, hideLoading } from "./_store/features/statusSlice";
import { AuthRequiredError } from "./lib/exception";
import TrendingProduct from "./_components/TrendingProduct";
import Link from "next/link";
//
const slides = ["1.jpg", "2.jpg", "3.jpg", "4.png", "5.png", "6.png", "7.png"];
const essentials = [{
    name: "men",
    value: ["men"]
}, {
    name: "women",
    value: ["women"]
}, {
    name: "kid",
    value: ["younger boy", "younger girl"]
}]
export default function Home() {

    const {
        isLoading,
        isFetching,
        data: products = [],
        isSuccess,
        error,
    } = useGetProductsQuery(null);
    const dispatch = useAppDispatch();
    const isNotificationOpen = useAppSelector(
        (state: RootState) => state.navbar.isNotificationOpen
    );
    const isUserMenuOpen = useAppSelector(
        (state: RootState) => state.navbar.isUserMenuOpen
    );
    const user = useAppSelector((state) => state.user);
    const authlog = useAppSelector((state) => state.auth);
    //
    if (isLoading || isFetching) {
        dispatch(showLoading());
    }
    else if (isSuccess) {
        setInterval(() => {
            dispatch(hideLoading())
        }, 500);
    }

    const trendingProducts = products.slice(0, 10);
    //
    return (
        <main
            className="min-h-screen container mx-auto"
            onClick={(e) => {
                e.stopPropagation();
                if (isUserMenuOpen) {
                    dispatch(toggleIsUserMenuOpen());
                }
                if (isNotificationOpen) {
                    dispatch(toggleIsNotificationOpen());
                }
            }}
        >
            {/* Slider */}
            <Swiper
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                loop={true}
                spaceBetween={0}
                modules={[Autoplay]}
            >
                {slides.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="select-none aspect-video">
                            <Image
                                src={"/images/slider/" + slide}
                                className="w-full aspect-video object-fill"
                                width={0}
                                height={0}
                                sizes="100vw"
                                alt="slide"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* Trending */}
            <section>
                <div className="mt-16">
                    <h2 id="trending" className="capitalize text-2xl font-semibold dark:text-white ">
                        Trending
                        <FaThumbsUp className="inline text-blue-400 -translate-y-[3px]" />
                    </h2>
                    <div className="relative w-full flex gap-6 snap-x snap-mandatory overflow-x-auto pb-14 mt-8">
                        {error ? (
                            <p>Error!</p>
                        ) : isLoading || isFetching ? (
                            <p>Loading...</p>
                        ) : (
                            trendingProducts.map((p, idx) => {

                                return (
                                    idx % 3 === 0 ? (<TrendingProduct key={p.id} product={p} borderColor={`border-blue-400`} bgColor={`bg-blue-200`} />) :
                                        idx % 3 === 1 ? (
                                            <TrendingProduct key={p.id} product={p} borderColor={`border-purple-400`} bgColor={`bg-purple-200`} />
                                        ) : (
                                            <TrendingProduct key={p.id} product={p} borderColor={`border-yellow-400`} bgColor={`bg-yellow-200`} />
                                        )
                                )
                            })
                        )}
                    </div>
                </div>
                {/* The essentitals */}
                <div className="mt-16">
                    <h2 id="essentials" className="capitalize text-2xl font-semibold dark:text-white ">
                        The essentials{" "}
                    </h2>
                    <div className="flex gap-3 mt-4 xl:basis-1/3 basis-full flex-col md:flex-row flex-grow">
                        {essentials.map(i => (
                            <div className="relative" key={i.name}>
                                <Link href={i.name === "kid" ? `/search?q=&kids=${encodeURIComponent(i.value.join(","))}` : `/search?q=&genders=${encodeURIComponent(i.value.join(","))}`}>
                                    <Image
                                        className="w-full h-[33rem]"
                                        width={0}
                                        height={0}
                                        sizes="100%"
                                        src={`/images/home/${i.name}.png`}
                                        alt={`${i.name} image`}
                                    />
                                    <button className="capitalize absolute px-4 py-2 bg-white opacity-70 text-md font-semibold rounded-3xl left-10 bottom-10 hover:bg-gray-500 hover:text-white">{i.name}&apos;s</button>
                                </Link>
                            </div>
                        ))}


                    </div>
                </div>
                {/* Products */}
                <div className="mt-16">
                    <h2 id="others" className="capitalize text-2xl font-semibold dark:text-white ">
                        Recommended for You{" "}
                        <FaThumbsUp className="inline text-blue-400 -translate-y-[3px]" />
                    </h2>
                    <div className="grid grid-cols-1 gap-8 mt-8 md:gap-6 md:grid-cols-3 lg:gap-y-16 lg:grid-cols-4">
                        {error ? (
                            <p>Error!</p>
                        ) : isLoading || isFetching ? (
                            <p>Loading...</p>
                        ) : (
                            products.map((p) => (
                                <Product key={p.id} product={p} />
                            ))
                        )}
                    </div>
                </div>

            </section>
        </main>
    );
}
