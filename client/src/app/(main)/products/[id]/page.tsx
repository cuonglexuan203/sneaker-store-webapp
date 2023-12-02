"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "../../_store/hooks";
import { useRouter } from "next/navigation";
import {
    AddToCartRequestBody,
    ProductInventory,
    useAddToCartMutation,
    useGetProductByIdQuery,
} from "../../_store/services/productsApi";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAppDispatch } from "../../_store/hooks";
import { LineItem, SelectedItems, updateSelectedItems } from "../../_store/features/selectedItemsSlice";
import { hideLoading, showLoading } from "../../_store/features/statusSlice";

// const colors = [
//     {
//         value: "WHITE",
//         bgColor: "bg-white",
//     },
//     {
//         value: "GRAY",
//         bgColor: "bg-gray-200",
//     },
//     {
//         value: "BLACK",
//         bgColor: "bg-black",
//     },
//     {
//         value: "YELLOW",
//         bgColor: "bg-yellow-200",
//     },
//     {
//         value: "RED",
//         bgColor: "bg-red-200",
//     },
//     {
//         value: "PURPLE",
//         bgColor: "bg-purple-200",
//     },
//     {
//         value: "ORANGE",
//         bgColor: "bg-orange-200",
//     },
//     {
//         value: "BLUE",
//         bgColor: "bg-blue-200",
//     },
// ];

// const sizes = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

const ProductDetail = ({ params }: { params: { id: number } }) => {
    const [isShippingOpen, setIsShippingOpen] = useState(false);
    const [isReturnOpen, setIsReturnOpen] = useState(false);
    const [color, setColor] = useState("");
    const [size, setSize] = useState(0);
    const [productCount, setProductCount] = useState(1);
    const [isLiked, setIsLiked] = useState(false);
    const [isSuccessfulToastVisible, setIsSuccessfulToastVisible] =
        useState(false);
    const [isFailedToastVisible, setIsFailedToastVisible] = useState(false);
    //
    const router = useRouter();
    //
    const [addToCart, { data, isLoading, error, isSuccess }] = useAddToCartMutation();
    const {
        isLoading: isProductLoading,
        isFetching: isProductFetching,
        isSuccess: isProductSuccess,
        data: productResponse,
        error: productError,
    } = useGetProductByIdQuery(params.id);
    const dispatch = useAppDispatch();
    //
    const isLogging = useAppSelector((state) => state.auth.isLogging);
    const userId = useAppSelector((state) => state.user.info.id);
    //
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isSuccessfulToastVisible) {
                setIsSuccessfulToastVisible(false);
            }
            if (isFailedToastVisible) {
                setIsFailedToastVisible(false);
            }
        }, 2500);
        return () => {
            clearTimeout(timeout);
        };
    }, [isSuccessfulToastVisible, isFailedToastVisible]);
    // check response status
    // mutation
    if (isLoading) {
        dispatch(showLoading());
    }
    else if (isSuccess) {
        dispatch(hideLoading())
    }
    // query
    if (isProductLoading || isProductFetching) {
        dispatch(showLoading());
        return <div className="h-screen"></div>
    }
    else if (isProductSuccess) {
        setInterval(() => {
            dispatch(hideLoading())
        }, 500);
    }
    // extract data
    const { product, productInventories } = productResponse!;
    const colors = productInventories.map((p: ProductInventory) => {
        let bgColor = `bg-${p.color.toLowerCase()}`;
        if (p.color !== "BLACK" && p.color !== "WHITE") {
            bgColor += "-200";
        }
        return ({
            value: p.color,
            bgColor
        })
    });
    const sizes = productInventories.map(p => p.size);
    //
    const handleAddToCart = async () => {
        if (!isLogging) {
            router.push("/auth/signin");
            return;
        }
        //
        const body: AddToCartRequestBody = {
            color,
            size,
            quantity: productCount,
            product: product!,
            userId,
        };
        try {
            const response = await addToCart(body).unwrap();
            //
            if (response.statusCode === 200 || response.statusCode === 201) {
                // console.log(response);
                setIsSuccessfulToastVisible(true);
            }
        } catch (err) {
            console.error(err);
            setIsFailedToastVisible(true);
        }
    };

    const handleBuyNow = () => {
        if (!isLogging) {
            router.push("/auth/signin");
            return;
        }
        //
        const buyNowProduct: LineItem = {
            color,
            size,
            quantity: productCount,
            product
        }
        const buyNowProducts: SelectedItems = {
            lineItems: [buyNowProduct]
        }
        dispatch(updateSelectedItems(buyNowProducts))
        //
        router.push("/checkout")
    }

    const successfulToast = (
        <motion.div
            initial={{
                translateX: 400,
            }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                duration: 1,
                delay: 0.5,
            }}
            animate={{
                translateX: 0,
            }}
            id="toast-default"
            className="flex items-center w-full mb-4 max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-xl dark:text-gray-400 dark:bg-gray-800"
            role="alert"
        >
            <div role="status">
                <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    className="w-8 h-8 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M512 469.333333m-426.666667 0a426.666667 426.666667 0 1 0 853.333334 0 426.666667 426.666667 0 1 0-853.333334 0Z"
                        fill="#FFF59D"
                    />
                    <path
                        d="M789.333333 469.333333c0-164.266667-140.8-294.4-309.333333-275.2-128 14.933333-230.4 117.333333-243.2 245.333334-10.666667 98.133333 29.866667 185.6 98.133333 241.066666 29.866667 25.6 49.066667 61.866667 49.066667 102.4v6.4h256v-2.133333c0-38.4 17.066667-76.8 46.933333-102.4 61.866667-51.2 102.4-128 102.4-215.466667z"
                        fill="#FBC02D"
                    />
                    <path
                        d="M652.8 430.933333l-64-42.666666c-6.4-4.266667-17.066667-4.266667-23.466667 0L512 422.4l-51.2-34.133333c-6.4-4.266667-17.066667-4.266667-23.466667 0l-64 42.666666c-4.266667 4.266667-8.533333 8.533333-8.533333 14.933334s0 12.8 4.266667 17.066666l81.066666 100.266667V789.333333h42.666667V554.666667c0-4.266667-2.133333-8.533333-4.266667-12.8l-70.4-87.466667 32-21.333333 51.2 34.133333c6.4 4.266667 17.066667 4.266667 23.466667 0l51.2-34.133333 32 21.333333-70.4 87.466667c-2.133333 4.266667-4.266667 8.533333-4.266667 12.8v234.666666h42.666667V563.2l81.066667-100.266667c4.266667-4.266667 6.4-10.666667 4.266666-17.066666s-4.266667-12.8-8.533333-14.933334z"
                        fill="#FFF59D"
                    />
                    <path
                        d="M512 938.666667m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
                        fill="#5C6BC0"
                    />
                    <path
                        d="M554.666667 960h-85.333334c-46.933333 0-85.333333-38.4-85.333333-85.333333v-106.666667h256v106.666667c0 46.933333-38.4 85.333333-85.333333 85.333333z"
                        fill="#9FA8DA"
                    />
                    <path
                        d="M640 874.666667l-247.466667 34.133333c6.4 14.933333 19.2 29.866667 34.133334 38.4l200.533333-27.733333c8.533333-12.8 12.8-27.733333 12.8-44.8zM384 825.6v42.666667L640 832v-42.666667z"
                        fill="#5C6BC0"
                    />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>

            <div className="ml-3 text-sm font-normal">
                <em className="text-amber-500">
                    Successfully add item into cart
                </em>
                <br />
                <Link
                    className="text-xs font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    href={"/cart"}
                >
                    View Your Cart Here
                </Link>
            </div>
            <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-default"
                aria-label="Close"
                onClick={() => setIsSuccessfulToastVisible(false)}
            >
                <span className="sr-only">Close</span>
                <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                </svg>
            </button>
        </motion.div>
    );
    const failedToast = (
        <motion.div
            initial={{
                translateX: 400,
            }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                duration: 1,
                delay: 0.5,
            }}
            animate={{
                translateX: 0,
            }}
            id="toast-default"
            className="flex items-center w-full mb-4 max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-xl dark:text-gray-400 dark:bg-gray-800"
            role="alert"
        >
            <div role="status">
                <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    className="w-8 h-8 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M512 469.333333m-426.666667 0a426.666667 426.666667 0 1 0 853.333334 0 426.666667 426.666667 0 1 0-853.333334 0Z"
                        fill="#FFF59D"
                    />
                    <path
                        d="M789.333333 469.333333c0-164.266667-140.8-294.4-309.333333-275.2-128 14.933333-230.4 117.333333-243.2 245.333334-10.666667 98.133333 29.866667 185.6 98.133333 241.066666 29.866667 25.6 49.066667 61.866667 49.066667 102.4v6.4h256v-2.133333c0-38.4 17.066667-76.8 46.933333-102.4 61.866667-51.2 102.4-128 102.4-215.466667z"
                        fill="#FBC02D"
                    />
                    <path
                        d="M652.8 430.933333l-64-42.666666c-6.4-4.266667-17.066667-4.266667-23.466667 0L512 422.4l-51.2-34.133333c-6.4-4.266667-17.066667-4.266667-23.466667 0l-64 42.666666c-4.266667 4.266667-8.533333 8.533333-8.533333 14.933334s0 12.8 4.266667 17.066666l81.066666 100.266667V789.333333h42.666667V554.666667c0-4.266667-2.133333-8.533333-4.266667-12.8l-70.4-87.466667 32-21.333333 51.2 34.133333c6.4 4.266667 17.066667 4.266667 23.466667 0l51.2-34.133333 32 21.333333-70.4 87.466667c-2.133333 4.266667-4.266667 8.533333-4.266667 12.8v234.666666h42.666667V563.2l81.066667-100.266667c4.266667-4.266667 6.4-10.666667 4.266666-17.066666s-4.266667-12.8-8.533333-14.933334z"
                        fill="#FFF59D"
                    />
                    <path
                        d="M512 938.666667m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
                        fill="#5C6BC0"
                    />
                    <path
                        d="M554.666667 960h-85.333334c-46.933333 0-85.333333-38.4-85.333333-85.333333v-106.666667h256v106.666667c0 46.933333-38.4 85.333333-85.333333 85.333333z"
                        fill="#9FA8DA"
                    />
                    <path
                        d="M640 874.666667l-247.466667 34.133333c6.4 14.933333 19.2 29.866667 34.133334 38.4l200.533333-27.733333c8.533333-12.8 12.8-27.733333 12.8-44.8zM384 825.6v42.666667L640 832v-42.666667z"
                        fill="#5C6BC0"
                    />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>

            <div className="ml-3 text-sm font-normal">
                <em className="text-red-500">Failed!</em>
                <br />
                <p className="text-xs font-medium">There are some problems.</p>
            </div>
            <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-default"
                aria-label="Close"
                onClick={() => setIsFailedToastVisible(false)}
            >
                <span className="sr-only">Close</span>
                <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                </svg>
            </button>
        </motion.div>
    );
    return (
        <section className="relative py-10 font-poppins dark:bg-gray-800">
            <div className="max-w-6xl px-4 mx-auto">
                {/* Product */}
                <div className="flex flex-wrap mb-24 -mx-4 gap-1 lg:gap-0">
                    {/* Image */}
                    <div className="w-full px-4 lg:mb-8 lg:w-1/2 md:mb-0">
                        <div className="lg:sticky top-32 lg:mt-6 overflow-hidden flex flex-col justify-center items-center lg:flex-row-reverse gap-5">
                            {/* Main image */}
                            <div className="relative lg:mb-10 lg:h-full flex items-center justify-center">
                                <a
                                    className="absolute left-0 transform lg:ml-2 top-1/2 translate-1/2"
                                    href="#"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="w-5 h-5 text-blue-500 bi bi-chevron-left dark:text-blue-200"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                                        ></path>
                                    </svg>
                                </a>
                                <Image
                                    className="object-fill rounded-lg w-full lg:h-[550px]"
                                    width={0}
                                    height={0}
                                    sizes="100%"
                                    src={`${product?.imageUrl}`}
                                    alt=""
                                />
                                <a
                                    className="absolute right-0 transform lg:mr-2 top-1/2 translate-1/2"
                                    href="#"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="w-5 h-5 text-blue-500 bi bi-chevron-right dark:text-blue-200"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                                        ></path>
                                    </svg>
                                </a>
                            </div>
                            {/* Subimages */}
                            <div className="flex flex-wrap -mx-2 lg:flex-col gap-2 items-center justify-center">
                                <div className="w-fit shadow-md rounded-lg ">
                                    <Link
                                        className="block hover: rounded-lg"
                                        href="#"
                                    >
                                        <Image
                                            width={0}
                                            height={0}
                                            sizes="100%"
                                            className="ml-4 h-20 w-20 aspect-square max-w-lg rounded-md"
                                            src={`${product.imageUrl}`}
                                            alt="image description"
                                        />
                                    </Link>
                                </div>

                                <div className="w-fit shadow-md rounded-lg ">
                                    <Link
                                        className="block hover: rounded-lg"
                                        href="#"
                                    >
                                        <Image
                                            width={0}
                                            height={0}
                                            sizes="100%"
                                            className="ml-4 h-20 w-20 aspect-square max-w-lg rounded-md"
                                            src={`${product.imageUrl}`}
                                            alt="image description"
                                        />
                                    </Link>
                                </div>
                                <div className="w-fit shadow-md rounded-lg ">
                                    <Link
                                        className="block hover: rounded-lg"
                                        href="#"
                                    >
                                        <Image
                                            width={0}
                                            height={0}
                                            sizes="100%"
                                            className="ml-4 h-20 w-20 aspect-square max-w-lg rounded-md"
                                            src={`${product.imageUrl}`}
                                            alt="image description"
                                        />
                                    </Link>
                                </div>
                                <div className="w-fit shadow-md rounded-lg ">
                                    <Link
                                        className="block hover: rounded-lg"
                                        href="#"
                                    >
                                        <Image
                                            width={0}
                                            height={0}
                                            sizes="100%"
                                            className="ml-4 h-20 w-20 aspect-square max-w-lg rounded-md"
                                            src={`${product.imageUrl}`}
                                            alt="image description"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Detail */}
                    <div className="w-full px-4 lg:w-1/2">
                        <div className="lg:pl-20">
                            {/* Info */}
                            <div className="mb-6 ">
                                {/* <span className="px-2.5 py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                                    New Arrival
                                </span> */}
                                <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                    {product?.name}
                                </h2>

                                <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                                    <span>{product?.price}$</span>
                                    <span className="ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400">
                                        986$
                                    </span>
                                </p>
                            </div>
                            {/* Color */}
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-900">
                                    Color
                                </h4>

                                <fieldset className="mt-4">
                                    <legend className="sr-only">
                                        Choose a color
                                    </legend>
                                    <ul className="flex items-center space-x-3 select-none">
                                        {colors.map((c, idx) => (
                                            <li key={c.value} className="">
                                                <label
                                                    className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ${color === c.value
                                                        ? "ring-blue-400 ring-2"
                                                        : ""
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        value={c.value}
                                                        className="sr-only"
                                                    />
                                                    <span
                                                        id="color-choice-0-label"
                                                        className="sr-only"
                                                    >
                                                        {c.value}
                                                    </span>
                                                    <span
                                                        onClick={() => {
                                                            setColor(c.value);
                                                        }}
                                                        aria-hidden="true"
                                                        className={`h-8 w-8 ${c.bgColor} rounded-full border border-black border-opacity-10 cursor-pointer`}
                                                    />
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </fieldset>
                            </div>
                            {/* Size */}
                            <div className="mt-10 mb-6">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-medium text-gray-900">
                                        Size
                                    </h4>
                                    <a
                                        href="#"
                                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Size guide
                                    </a>
                                </div>

                                <fieldset className="mt-4">
                                    <legend className="sr-only">
                                        Choose a size
                                    </legend>
                                    <div className="grid grid-cols-4 gap-4 select-none">
                                        {sizes.map((s) => (
                                            <div
                                                key={s}
                                                onClick={() => setSize(s)}
                                            >
                                                <label
                                                    className={`group relative flex items-center justify-center rounded-md border ${size === s
                                                        ? "border-black"
                                                        : ""
                                                        } py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="size-choice"
                                                        value={s}
                                                        className="sr-only"
                                                    />
                                                    <span>{s}</span>

                                                    <span
                                                        className="pointer-events-none absolute -inset-px rounded-md"
                                                        aria-hidden="true"
                                                    ></span>
                                                </label>
                                            </div>
                                        ))}

                                        <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-not-allowed bg-gray-50 text-gray-200">
                                            <input
                                                type="radio"
                                                name="size-choice"
                                                value="XXXL"
                                                disabled
                                                className="sr-only"
                                                aria-labelledby="size-choice-7-label"
                                            />
                                            <span id="size-choice-7-label">
                                                28
                                            </span>
                                            <span
                                                aria-hidden="true"
                                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                            >
                                                <svg
                                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                    viewBox="0 0 100 100"
                                                    preserveAspectRatio="none"
                                                    stroke="currentColor"
                                                >
                                                    <line
                                                        x1="0"
                                                        y1="100"
                                                        x2="100"
                                                        y2="0"
                                                        vectorEffect="non-scaling-stroke"
                                                    />
                                                </svg>
                                            </span>
                                        </label>
                                    </div>
                                </fieldset>
                                {size > 0 && color !== "" && (
                                    <div className="mt-2 text-xs text-blue-400">
                                        <span>{productInventories.find(p => p.color === color && p.size === size)?.productAmount}&nbsp;available in stock</span>
                                    </div>
                                )}
                            </div>
                            <div className="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                                <span className="text-base text-gray-600 dark:text-gray-400">
                                    In Stock
                                </span>
                                <p className="mt-2 text-sm text-blue-500 dark:text-blue-200">
                                    Ships from china.
                                    <span className="text-gray-600 dark:text-gray-400">
                                        Most customers receive within 3-31 days.
                                    </span>
                                </p>
                            </div>
                            <div className="mb-6 "></div>
                            <div className="flex flex-wrap items-center mb-6">
                                <div className="mb-4 mr-4 lg:mb-0">
                                    <div className="w-28">
                                        <div className="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                                            <button
                                                onClick={() =>
                                                    setProductCount(
                                                        productCount - 1
                                                    )
                                                }
                                                className="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300"
                                            >
                                                <span className="m-auto text-2xl font-thin">
                                                    -
                                                </span>
                                            </button>
                                            <input
                                                onChange={(e) =>
                                                    setProductCount(
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                                type="number"
                                                className="form-input border-none flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                                                value={productCount}
                                            />
                                            <button
                                                onClick={() =>
                                                    setProductCount(
                                                        productCount + 1
                                                    )
                                                }
                                                className="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-300"
                                            >
                                                <span className="m-auto text-2xl font-thin">
                                                    +
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4 lg:mb-0">
                                    <button
                                        onClick={() => setIsLiked(!isLiked)}
                                        className="hover:text-red-200 flex items-center justify-center w-11 h-10 p-2 mr-4 text-gray-700 lg:w-11 dark:text-gray-200"
                                    >
                                        <svg
                                            width="220px"
                                            height="220px"
                                            viewBox="-2.4 -2.4 28.80 28.80"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            stroke="#ffffff"
                                        >
                                            <g
                                                id="SVGRepo_bgCarrier"
                                                strokeWidth="0"
                                                transform="translate(0,0), scale(1)"
                                            >
                                                <rect
                                                    x="-2.4"
                                                    y="-2.4"
                                                    width="28.80"
                                                    height="28.80"
                                                    rx="14.4"
                                                    fill="#7ed0ec"
                                                    strokeWidth="0"
                                                ></rect>
                                            </g>
                                            <g
                                                id="SVGRepo_tracerCarrier"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></g>
                                            <g id="SVGRepo_iconCarrier">
                                                {" "}
                                                <path
                                                    d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                                                    fill={
                                                        isLiked
                                                            ? "#fe2a2a"
                                                            : "#f8f7f7"
                                                    }
                                                ></path>{" "}
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full px-4 py-3 text-center text-blue-600 bg-blue-100 border border-blue-600 dark:hover:bg-gray-900 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-700 hover:bg-blue-600 hover:text-gray-100 lg:w-1/2 rounded-xl"
                                >
                                    Add to cart
                                </button>
                            </div>
                            <div className="flex gap-4 mb-6">
                                <button
                                    onClick={handleBuyNow}
                                    className="w-full px-4 py-3 text-center text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl"
                                >
                                    Buy now
                                </button>
                            </div>
                            {/* Description */}
                            <div className="mt-12 text-justify">
                                <p>
                                    With supportive cushioning built for a
                                    smooth run, the Nike InfinityRN 4 is a
                                    brand-new take on a familiar favourite.
                                    It&apos;s made from our all-new Nike ReactX
                                    foam, which gives you 13% more energy return
                                    compared to Nike React foam, to help you
                                    stay fresh and bouncy. (What&apos;s more?
                                    Nike ReactX reduces its carbon footprint in
                                    a pair of midsoles by at least 43% compared
                                    with Nike React foam.*) This version has
                                    GORE-TEX fabric to help you stay dry for
                                    your miles. It&apos;s the kind of shoe that
                                    supports every step in style. *The carbon
                                    footprint of ReactX is based on a
                                    cradle-to-gate assessment reviewed by PRé
                                    Sustainability B.V. and Intertek China.
                                    Other midsole components such as airbags,
                                    plates or other foam formulations were not
                                    considered.
                                </p>
                                <button className="my-6 capitalize font-medium underline underline-offset-4">
                                    View Product Detail
                                </button>
                            </div>
                            {/* Details */}

                            <div>
                                <h2
                                    onClick={() =>
                                        setIsShippingOpen(!isShippingOpen)
                                    }
                                >
                                    <button
                                        className="flex items-center justify-between w-full py-5 text-xl font-medium rtl:text-right border-b border-gray-200 dark:border-gray-700 gap-3"
                                        aria-expanded="true"
                                        aria-controls="accordion-flush-body-1"
                                    >
                                        <span>Shipping</span>
                                        <svg
                                            className={`w-3 h-3 rotate-180 shrink-0 transition-all duration-200 ease-in-out ${isShippingOpen ? "rotate-0" : ""
                                                }`}
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5 5 1 1 5"
                                            />
                                        </svg>
                                    </button>
                                </h2>
                                <div
                                    className={`${isShippingOpen ? "" : "hidden"
                                        } p-6`}
                                    aria-labelledby="accordion-flush-heading-1"
                                >
                                    <ul className="list-disc list-inside">
                                        <li>
                                            Free shipping on orders over $300
                                        </li>
                                        <li>
                                            International shipping available
                                        </li>
                                        <li>Expedited shipping options</li>
                                        <li>ignature required upon delivery</li>
                                    </ul>
                                </div>
                                <h2
                                    onClick={() =>
                                        setIsReturnOpen(!isReturnOpen)
                                    }
                                >
                                    <button
                                        className="flex items-center justify-between w-full py-5 text-xl font-medium rtl:text-right border-b border-gray-200 dark:border-gray-700 gap-3"
                                        aria-expanded="true"
                                        aria-controls="accordion-flush-body-1"
                                    >
                                        <span>Return</span>
                                        <svg
                                            className={`w-3 h-3 rotate-180 shrink-0 transition-all duration-200 ease-in-out ${isReturnOpen ? "rotate-0" : ""
                                                }`}
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5 5 1 1 5"
                                            />
                                        </svg>
                                    </button>
                                </h2>
                                <div
                                    className={`${isReturnOpen ? "" : "hidden"
                                        } p-6`}
                                    aria-labelledby="accordion-flush-heading-1"
                                >
                                    <ul className="list-disc list-inside">
                                        <li>
                                            Free shipping on orders over $300
                                        </li>
                                        <li>
                                            International shipping available
                                        </li>
                                        <li>Expedited shipping options</li>
                                        <li>ignature required upon delivery</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Review */}
                <div className="mt-16 flex flex-col justify-start items-start w-full space-y-8">
                    <div className="flex justify-start items-start">
                        <p className="text-2xl lg:text-3xl font-semibold leading-7 lg:leading-9 text-gray-800 dark:text-white ">
                            Reviews
                        </p>
                    </div>
                    <div className="w-full flex justify-start items-start flex-col bg-gray-50 dark:bg-gray-800 p-8 rounded-3xl">
                        <div className="flex flex-col md:flex-row justify-between w-full">
                            <div className="flex flex-row justify-between items-start">
                                <p className="text-xl md:text-2xl font-medium leading-normal text-gray-800 dark:text-white">
                                    Beautiful addition to the theme
                                </p>
                                <button className="ml-4 md:hidden">
                                    <svg
                                        id="closeIcon"
                                        className="hidden"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15 12.5L10 7.5L5 12.5"
                                            stroke="currentColor"
                                            strokeWidth="1.25"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <svg
                                        id="openIcon"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M5 7.5L10 12.5L15 7.5"
                                            stroke="currentColor"
                                            strokeWidth="1.25"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="cursor-pointer mt-2 md:mt-0">
                                <svg
                                    className="dark:text-white"
                                    width="152"
                                    height="24"
                                    viewBox="0 0 152 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0)">
                                        <path
                                            d="M17.5598 24.4285C17.3999 24.4291 17.2422 24.3914 17.0998 24.3185L11.9998 21.6485L6.89982 24.3185C6.73422 24.4056 6.5475 24.4444 6.3609 24.4307C6.1743 24.4169 5.9953 24.3511 5.84425 24.2407C5.6932 24.1303 5.57616 23.9797 5.50644 23.8061C5.43671 23.6324 5.4171 23.4427 5.44982 23.2585L6.44982 17.6285L2.32982 13.6285C2.20128 13.5002 2.1101 13.3394 2.06605 13.1632C2.02201 12.987 2.02677 12.8022 2.07982 12.6285C2.13778 12.4508 2.2444 12.2928 2.38757 12.1726C2.53075 12.0525 2.70475 11.9748 2.88982 11.9485L8.58982 11.1185L11.0998 5.98849C11.1817 5.81942 11.3096 5.67683 11.4687 5.57706C11.6279 5.47729 11.812 5.42438 11.9998 5.42438C12.1877 5.42438 12.3717 5.47729 12.5309 5.57706C12.6901 5.67683 12.8179 5.81942 12.8998 5.98849L15.4398 11.1085L21.1398 11.9385C21.3249 11.9648 21.4989 12.0425 21.6421 12.1626C21.7852 12.2828 21.8919 12.4408 21.9498 12.6185C22.0029 12.7922 22.0076 12.977 21.9636 13.1532C21.9196 13.3294 21.8284 13.4902 21.6998 13.6185L17.5798 17.6185L18.5798 23.2485C18.6155 23.436 18.5968 23.6297 18.526 23.8069C18.4551 23.9841 18.335 24.1374 18.1798 24.2485C17.9987 24.3754 17.7807 24.4387 17.5598 24.4285V24.4285Z"
                                            fill="currentColor"
                                        />
                                    </g>
                                    <g clipPath="url(#clip1)">
                                        <path
                                            d="M49.5598 24.4285C49.3999 24.4291 49.2422 24.3914 49.0998 24.3185L43.9998 21.6485L38.8998 24.3185C38.7342 24.4056 38.5475 24.4444 38.3609 24.4307C38.1743 24.4169 37.9953 24.3511 37.8443 24.2407C37.6932 24.1303 37.5762 23.9797 37.5064 23.8061C37.4367 23.6324 37.4171 23.4427 37.4498 23.2585L38.4498 17.6285L34.3298 13.6285C34.2013 13.5002 34.1101 13.3394 34.0661 13.1632C34.022 12.987 34.0268 12.8022 34.0798 12.6285C34.1378 12.4508 34.2444 12.2928 34.3876 12.1726C34.5307 12.0525 34.7047 11.9748 34.8898 11.9485L40.5898 11.1185L43.0998 5.98849C43.1817 5.81942 43.3096 5.67683 43.4687 5.57706C43.6279 5.47729 43.812 5.42438 43.9998 5.42438C44.1877 5.42438 44.3717 5.47729 44.5309 5.57706C44.6901 5.67683 44.8179 5.81942 44.8998 5.98849L47.4398 11.1085L53.1398 11.9385C53.3249 11.9648 53.4989 12.0425 53.6421 12.1626C53.7852 12.2828 53.8919 12.4408 53.9498 12.6185C54.0029 12.7922 54.0076 12.977 53.9636 13.1532C53.9196 13.3294 53.8284 13.4902 53.6998 13.6185L49.5798 17.6185L50.5798 23.2485C50.6155 23.436 50.5968 23.6297 50.526 23.8069C50.4551 23.9841 50.335 24.1374 50.1798 24.2485C49.9987 24.3754 49.7807 24.4387 49.5598 24.4285V24.4285Z"
                                            fill="currentColor"
                                        />
                                    </g>
                                    <g clipPath="url(#clip2)">
                                        <path
                                            d="M81.5598 24.4285C81.3999 24.4291 81.2422 24.3914 81.0998 24.3185L75.9998 21.6485L70.8998 24.3185C70.7342 24.4056 70.5475 24.4444 70.3609 24.4307C70.1743 24.4169 69.9953 24.3511 69.8443 24.2407C69.6932 24.1303 69.5762 23.9797 69.5064 23.8061C69.4367 23.6324 69.4171 23.4427 69.4498 23.2585L70.4498 17.6285L66.3298 13.6285C66.2013 13.5002 66.1101 13.3394 66.0661 13.1632C66.022 12.987 66.0268 12.8022 66.0798 12.6285C66.1378 12.4508 66.2444 12.2928 66.3876 12.1726C66.5307 12.0525 66.7047 11.9748 66.8898 11.9485L72.5898 11.1185L75.0998 5.98849C75.1817 5.81942 75.3096 5.67683 75.4687 5.57706C75.6279 5.47729 75.812 5.42438 75.9998 5.42438C76.1877 5.42438 76.3717 5.47729 76.5309 5.57706C76.6901 5.67683 76.8179 5.81942 76.8998 5.98849L79.4398 11.1085L85.1398 11.9385C85.3249 11.9648 85.4989 12.0425 85.6421 12.1626C85.7852 12.2828 85.8919 12.4408 85.9498 12.6185C86.0029 12.7922 86.0076 12.977 85.9636 13.1532C85.9196 13.3294 85.8284 13.4902 85.6998 13.6185L81.5798 17.6185L82.5798 23.2485C82.6155 23.436 82.5968 23.6297 82.526 23.8069C82.4551 23.9841 82.335 24.1374 82.1798 24.2485C81.9987 24.3754 81.7807 24.4387 81.5598 24.4285V24.4285Z"
                                            fill="currentColor"
                                        />
                                    </g>
                                    <g clipPath="url(#clip3)">
                                        <path
                                            d="M113.56 24.4285C113.4 24.4291 113.242 24.3914 113.1 24.3185L108 21.6485L102.9 24.3185C102.734 24.4056 102.548 24.4444 102.361 24.4307C102.174 24.4169 101.995 24.3511 101.844 24.2407C101.693 24.1303 101.576 23.9797 101.506 23.8061C101.437 23.6324 101.417 23.4427 101.45 23.2585L102.45 17.6285L98.3298 13.6285C98.2013 13.5002 98.1101 13.3394 98.0661 13.1632C98.022 12.987 98.0268 12.8022 98.0798 12.6285C98.1378 12.4508 98.2444 12.2928 98.3876 12.1726C98.5307 12.0525 98.7047 11.9748 98.8898 11.9485L104.59 11.1185L107.1 5.98849C107.182 5.81942 107.31 5.67683 107.469 5.57706C107.628 5.47729 107.812 5.42438 108 5.42438C108.188 5.42438 108.372 5.47729 108.531 5.57706C108.69 5.67683 108.818 5.81942 108.9 5.98849L111.44 11.1085L117.14 11.9385C117.325 11.9648 117.499 12.0425 117.642 12.1626C117.785 12.2828 117.892 12.4408 117.95 12.6185C118.003 12.7922 118.008 12.977 117.964 13.1532C117.92 13.3294 117.828 13.4902 117.7 13.6185L113.58 17.6185L114.58 23.2485C114.616 23.436 114.597 23.6297 114.526 23.8069C114.455 23.9841 114.335 24.1374 114.18 24.2485C113.999 24.3754 113.781 24.4387 113.56 24.4285V24.4285Z"
                                            fill="currentColor"
                                        />
                                    </g>
                                    <g clipPath="url(#clip4)">
                                        <path
                                            d="M135.146 16.911L131.052 12.9355L136.734 12.1081L137.256 12.032L137.488 11.558L139.998 6.42798L139.998 6.42798L140 6.42443L140.004 6.4329L142.544 11.5529L142.777 12.0225L143.296 12.0981L148.978 12.9255L144.883 16.901L144.502 17.2708L144.595 17.7934L145.595 23.4234L145.595 23.4234L145.597 23.4356L145.605 23.4463L145.56 24.4285L145.556 23.4474L145.564 23.4326L140.464 20.7626L140 20.5197L139.536 20.7626L134.436 23.4326L134.434 23.4334L135.434 17.8034L135.527 17.2808L135.146 16.911Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0">
                                            <rect
                                                width="24"
                                                height="24"
                                                fill="white"
                                            />
                                        </clipPath>
                                        <clipPath id="clip1">
                                            <rect
                                                width="24"
                                                height="24"
                                                fill="white"
                                                transform="translate(32)"
                                            />
                                        </clipPath>
                                        <clipPath id="clip2">
                                            <rect
                                                width="24"
                                                height="24"
                                                fill="white"
                                                transform="translate(64)"
                                            />
                                        </clipPath>
                                        <clipPath id="clip3">
                                            <rect
                                                width="24"
                                                height="24"
                                                fill="white"
                                                transform="translate(96)"
                                            />
                                        </clipPath>
                                        <clipPath id="clip4">
                                            <rect
                                                width="24"
                                                height="24"
                                                fill="white"
                                                transform="translate(128)"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        <div id="menu" className="md:block">
                            <p className="mt-3 text-base leading-normal text-gray-600 dark:text-white w-full md:w-9/12 xl:w-5/6">
                                When you want to decorate your home, the idea of
                                choosing a decorative theme can seem daunting.
                                Some themes seem to have an endless amount of
                                pieces, while others can feel hard to accomplish
                            </p>
                            <div className="hidden md:flex mt-6 flex-row justify-start items-start space-x-4">
                                <div>
                                    <img
                                        src="https://i.ibb.co/QXzVpHp/vincent-wachowiak-8g-Cm-EBVl6a-I-unsplash-1.png"
                                        alt="chair-1"
                                    />
                                </div>
                                <div>
                                    <img
                                        src="https://i.ibb.co/znYKsbc/vincent-wachowiak-z-P316-KSOX0-E-unsplash-1.png"
                                        alt="chair-2"
                                    />
                                </div>
                                <div className="hidden md:block">
                                    <img
                                        src="https://i.ibb.co/QXzVpHp/vincent-wachowiak-8g-Cm-EBVl6a-I-unsplash-1.png"
                                        alt="chair-3"
                                    />
                                </div>
                                <div className="hidden md:block">
                                    <img
                                        src="https://i.ibb.co/znYKsbc/vincent-wachowiak-z-P316-KSOX0-E-unsplash-1.png"
                                        alt="chair-4"
                                    />
                                </div>
                            </div>
                            <div
                                className="md:hidden carousel pt-8 cursor-none"
                                data-flickity='{ "wrapAround": true,"pageDots": false }'
                            >
                                <div className="carousel-cell">
                                    <div className="md:w-full h-full relative">
                                        <img
                                            src="https://i.ibb.co/QXzVpHp/vincent-wachowiak-8g-Cm-EBVl6a-I-unsplash-1.png"
                                            alt="bag"
                                            className="w-full h-full object-fit object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="carousel-cell">
                                    <div className="md:w-full h-full relative">
                                        <img
                                            src="https://i.ibb.co/znYKsbc/vincent-wachowiak-z-P316-KSOX0-E-unsplash-1.png"
                                            alt="shoes"
                                            className="w-full h-full object-fit object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="carousel-cell">
                                    <div className="md:w-full h-full relative">
                                        <img
                                            src="https://i.ibb.co/QXzVpHp/vincent-wachowiak-8g-Cm-EBVl6a-I-unsplash-1.png"
                                            alt="wallet"
                                            className="w-full h-full object-fit object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="carousel-cell">
                                    <div className="md:w-full h-full relative">
                                        <img
                                            src="https://i.ibb.co/znYKsbc/vincent-wachowiak-z-P316-KSOX0-E-unsplash-1.png"
                                            alt="wallet"
                                            className="w-full h-full object-fit object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="carousel-cell">
                                    <div className="md:w-full h-full relative">
                                        <img
                                            src="https://i.ibb.co/QXzVpHp/vincent-wachowiak-8g-Cm-EBVl6a-I-unsplash-1.png"
                                            alt="wallet"
                                            className="w-full h-full object-fit object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="carousel-cell">
                                    <div className="md:w-full h-full relative">
                                        <img
                                            src="https://i.ibb.co/znYKsbc/vincent-wachowiak-z-P316-KSOX0-E-unsplash-1.png"
                                            alt="wallet"
                                            className="w-full h-full object-fit object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="carousel-cell"></div>
                            </div>
                            <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
                                <div>
                                    <img
                                        src="https://i.ibb.co/QcqyrVG/Mask-Group.png"
                                        alt="girl-avatar"
                                    />
                                </div>
                                <div className="flex flex-col justify-start items-start space-y-2">
                                    <p className="text-base font-medium leading-none text-gray-800 dark:text-white">
                                        Anna Kendrick
                                    </p>
                                    <p className="text-sm leading-none text-gray-600 dark:text-white">
                                        14 July 2021
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex justify-start items-start flex-col bg-gray-50 dark:bg-gray-800 md:px-8 py-8">
                            <div className="flex flex-col md:flex-row justify-between w-full">
                                <div className="flex flex-row justify-between items-start">
                                    <p className="text-xl md:text-2xl font-medium leading-normal text-gray-800 dark:text-white">
                                        Comfortable and minimal, just how I like
                                        it!
                                    </p>
                                    <button className="ml-4 md:hidden">
                                        <svg
                                            id="closeIcon2"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M15 12.5L10 7.5L5 12.5"
                                                stroke="currentColor"
                                                strokeWidth="1.25"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <svg
                                            id="openIcon2"
                                            className="hidden"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M5 7.5L10 12.5L15 7.5"
                                                stroke="currentColor"
                                                strokeWidth="1.25"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="cursor-pointer mt-2 md:mt-0">
                                    <svg
                                        className="dark:text-white"
                                        width="152"
                                        height="24"
                                        viewBox="0 0 152 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0)">
                                            <path
                                                d="M17.5598 24.4285C17.3999 24.4291 17.2422 24.3914 17.0998 24.3185L11.9998 21.6485L6.89982 24.3185C6.73422 24.4056 6.5475 24.4444 6.3609 24.4307C6.1743 24.4169 5.9953 24.3511 5.84425 24.2407C5.6932 24.1303 5.57616 23.9797 5.50644 23.8061C5.43671 23.6324 5.4171 23.4427 5.44982 23.2585L6.44982 17.6285L2.32982 13.6285C2.20128 13.5002 2.1101 13.3394 2.06605 13.1632C2.02201 12.987 2.02677 12.8022 2.07982 12.6285C2.13778 12.4508 2.2444 12.2928 2.38757 12.1726C2.53075 12.0525 2.70475 11.9748 2.88982 11.9485L8.58982 11.1185L11.0998 5.98849C11.1817 5.81942 11.3096 5.67683 11.4687 5.57706C11.6279 5.47729 11.812 5.42438 11.9998 5.42438C12.1877 5.42438 12.3717 5.47729 12.5309 5.57706C12.6901 5.67683 12.8179 5.81942 12.8998 5.98849L15.4398 11.1085L21.1398 11.9385C21.3249 11.9648 21.4989 12.0425 21.6421 12.1626C21.7852 12.2828 21.8919 12.4408 21.9498 12.6185C22.0029 12.7922 22.0076 12.977 21.9636 13.1532C21.9196 13.3294 21.8284 13.4902 21.6998 13.6185L17.5798 17.6185L18.5798 23.2485C18.6155 23.436 18.5968 23.6297 18.526 23.8069C18.4551 23.9841 18.335 24.1374 18.1798 24.2485C17.9987 24.3754 17.7807 24.4387 17.5598 24.4285V24.4285Z"
                                                fill="currentColor"
                                            />
                                        </g>
                                        <g clipPath="url(#clip1)">
                                            <path
                                                d="M49.5598 24.4285C49.3999 24.4291 49.2422 24.3914 49.0998 24.3185L43.9998 21.6485L38.8998 24.3185C38.7342 24.4056 38.5475 24.4444 38.3609 24.4307C38.1743 24.4169 37.9953 24.3511 37.8443 24.2407C37.6932 24.1303 37.5762 23.9797 37.5064 23.8061C37.4367 23.6324 37.4171 23.4427 37.4498 23.2585L38.4498 17.6285L34.3298 13.6285C34.2013 13.5002 34.1101 13.3394 34.0661 13.1632C34.022 12.987 34.0268 12.8022 34.0798 12.6285C34.1378 12.4508 34.2444 12.2928 34.3876 12.1726C34.5307 12.0525 34.7047 11.9748 34.8898 11.9485L40.5898 11.1185L43.0998 5.98849C43.1817 5.81942 43.3096 5.67683 43.4687 5.57706C43.6279 5.47729 43.812 5.42438 43.9998 5.42438C44.1877 5.42438 44.3717 5.47729 44.5309 5.57706C44.6901 5.67683 44.8179 5.81942 44.8998 5.98849L47.4398 11.1085L53.1398 11.9385C53.3249 11.9648 53.4989 12.0425 53.6421 12.1626C53.7852 12.2828 53.8919 12.4408 53.9498 12.6185C54.0029 12.7922 54.0076 12.977 53.9636 13.1532C53.9196 13.3294 53.8284 13.4902 53.6998 13.6185L49.5798 17.6185L50.5798 23.2485C50.6155 23.436 50.5968 23.6297 50.526 23.8069C50.4551 23.9841 50.335 24.1374 50.1798 24.2485C49.9987 24.3754 49.7807 24.4387 49.5598 24.4285V24.4285Z"
                                                fill="currentColor"
                                            />
                                        </g>
                                        <g clipPath="url(#clip2)">
                                            <path
                                                d="M81.5598 24.4285C81.3999 24.4291 81.2422 24.3914 81.0998 24.3185L75.9998 21.6485L70.8998 24.3185C70.7342 24.4056 70.5475 24.4444 70.3609 24.4307C70.1743 24.4169 69.9953 24.3511 69.8443 24.2407C69.6932 24.1303 69.5762 23.9797 69.5064 23.8061C69.4367 23.6324 69.4171 23.4427 69.4498 23.2585L70.4498 17.6285L66.3298 13.6285C66.2013 13.5002 66.1101 13.3394 66.0661 13.1632C66.022 12.987 66.0268 12.8022 66.0798 12.6285C66.1378 12.4508 66.2444 12.2928 66.3876 12.1726C66.5307 12.0525 66.7047 11.9748 66.8898 11.9485L72.5898 11.1185L75.0998 5.98849C75.1817 5.81942 75.3096 5.67683 75.4687 5.57706C75.6279 5.47729 75.812 5.42438 75.9998 5.42438C76.1877 5.42438 76.3717 5.47729 76.5309 5.57706C76.6901 5.67683 76.8179 5.81942 76.8998 5.98849L79.4398 11.1085L85.1398 11.9385C85.3249 11.9648 85.4989 12.0425 85.6421 12.1626C85.7852 12.2828 85.8919 12.4408 85.9498 12.6185C86.0029 12.7922 86.0076 12.977 85.9636 13.1532C85.9196 13.3294 85.8284 13.4902 85.6998 13.6185L81.5798 17.6185L82.5798 23.2485C82.6155 23.436 82.5968 23.6297 82.526 23.8069C82.4551 23.9841 82.335 24.1374 82.1798 24.2485C81.9987 24.3754 81.7807 24.4387 81.5598 24.4285V24.4285Z"
                                                fill="currentColor"
                                            />
                                        </g>
                                        <g clipPath="url(#clip3)">
                                            <path
                                                d="M113.56 24.4285C113.4 24.4291 113.242 24.3914 113.1 24.3185L108 21.6485L102.9 24.3185C102.734 24.4056 102.548 24.4444 102.361 24.4307C102.174 24.4169 101.995 24.3511 101.844 24.2407C101.693 24.1303 101.576 23.9797 101.506 23.8061C101.437 23.6324 101.417 23.4427 101.45 23.2585L102.45 17.6285L98.3298 13.6285C98.2013 13.5002 98.1101 13.3394 98.0661 13.1632C98.022 12.987 98.0268 12.8022 98.0798 12.6285C98.1378 12.4508 98.2444 12.2928 98.3876 12.1726C98.5307 12.0525 98.7047 11.9748 98.8898 11.9485L104.59 11.1185L107.1 5.98849C107.182 5.81942 107.31 5.67683 107.469 5.57706C107.628 5.47729 107.812 5.42438 108 5.42438C108.188 5.42438 108.372 5.47729 108.531 5.57706C108.69 5.67683 108.818 5.81942 108.9 5.98849L111.44 11.1085L117.14 11.9385C117.325 11.9648 117.499 12.0425 117.642 12.1626C117.785 12.2828 117.892 12.4408 117.95 12.6185C118.003 12.7922 118.008 12.977 117.964 13.1532C117.92 13.3294 117.828 13.4902 117.7 13.6185L113.58 17.6185L114.58 23.2485C114.616 23.436 114.597 23.6297 114.526 23.8069C114.455 23.9841 114.335 24.1374 114.18 24.2485C113.999 24.3754 113.781 24.4387 113.56 24.4285V24.4285Z"
                                                fill="currentColor"
                                            />
                                        </g>
                                        <g clipPath="url(#clip4)">
                                            <path
                                                d="M135.146 16.911L131.052 12.9355L136.734 12.1081L137.256 12.032L137.488 11.558L139.998 6.42798L139.998 6.42798L140 6.42443L140.004 6.4329L142.544 11.5529L142.777 12.0225L143.296 12.0981L148.978 12.9255L144.883 16.901L144.502 17.2708L144.595 17.7934L145.595 23.4234L145.595 23.4234L145.597 23.4356L145.605 23.4463L145.56 24.4285L145.556 23.4474L145.564 23.4326L140.464 20.7626L140 20.5197L139.536 20.7626L134.436 23.4326L134.434 23.4334L135.434 17.8034L135.527 17.2808L135.146 16.911Z"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect
                                                    width="24"
                                                    height="24"
                                                    fill="white"
                                                />
                                            </clipPath>
                                            <clipPath id="clip1">
                                                <rect
                                                    width="24"
                                                    height="24"
                                                    fill="white"
                                                    transform="translate(32)"
                                                />
                                            </clipPath>
                                            <clipPath id="clip2">
                                                <rect
                                                    width="24"
                                                    height="24"
                                                    fill="white"
                                                    transform="translate(64)"
                                                />
                                            </clipPath>
                                            <clipPath id="clip3">
                                                <rect
                                                    width="24"
                                                    height="24"
                                                    fill="white"
                                                    transform="translate(96)"
                                                />
                                            </clipPath>
                                            <clipPath id="clip4">
                                                <rect
                                                    width="24"
                                                    height="24"
                                                    fill="white"
                                                    transform="translate(128)"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                            <div id="menu2" className="hidden md:block">
                                <p className="mt-3 text-base leading-normal text-gray-600 dark:text-white w-full md:w-9/12 xl:w-5/6">
                                    This style relies more on neutral colors
                                    with little to no embellishment on
                                    furniture. Lighter fabrics, such as silk and
                                    cotton, are popular, as are lighter colors
                                    in wood and metal.
                                </p>
                                <div className="mt-6 flex flex-row justify-start items-start space-x-4">
                                    <div className="py-4 px-8 bg-gray-100">
                                        <img
                                            src="https://i.ibb.co/xfg5T5T/sam-moqadam-kvmds-Tr-GOBM-unsplash-removebg-preview-1.png"
                                            alt="chair-5"
                                        />
                                    </div>
                                    <div className="py-4 px-8 bg-gray-100">
                                        <img
                                            src="https://i.ibb.co/54F7vvV/Group-1855.png"
                                            alt="chair-6"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
                                    <div>
                                        <img
                                            src="https://i.ibb.co/RCTGZTc/Mask-Group-1.png"
                                            alt="girl-avatar"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-start items-start space-y-2">
                                        <p className="text-base font-medium leading-none text-gray-800 dark:text-white">
                                            James Schofield
                                        </p>
                                        <p className="text-sm leading-none text-gray-600 dark:text-white">
                                            23 June 2021
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Toasts */}
            <div className="bottom-8 right-8 fixed">
                {isSuccessfulToastVisible && successfulToast}
                {isFailedToastVisible && failedToast}
            </div>
        </section>
    );
};

export default ProductDetail;
