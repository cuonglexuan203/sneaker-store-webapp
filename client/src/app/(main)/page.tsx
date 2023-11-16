"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import Image from "next/image";
import Product from "./_components/Product";
import { useGetProductsQuery } from "./_store/services/productsApi";
import { FaThumbsUp } from "react-icons/fa6";
//
const slides = ["1.jpg", "2.jpg", "3.jpg", "4.png", "5.png", "6.png", "7.png"];

export default function Home() {
    const {
        isLoading,
        isFetching,
        data: products = [],
        error,
    } = useGetProductsQuery(null);
    return (
        <main className="min-h-screen container mx-auto">
            {/* Slider */}
            <Swiper
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                loop={true}
                spaceBetween={50}
                modules={[Autoplay]}
            >
                {slides.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="select-none">
                            <Image
                                src={"/images/slider/" + slide}
                                className="w-full h-[40vh] lg:h-[90vh] object-fill"
                                width={0}
                                height={0}
                                sizes="100vw"
                                alt="slide"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* Products */}
            <section>
                <div className="mt-16">
                    <h2 className="capitalize text-2xl font-semibold dark:text-white ">
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
