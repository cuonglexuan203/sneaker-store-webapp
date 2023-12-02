"use client";

import { useCallback, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import FilterAccordion from "../_components/FilterAccordion";
import { type Accordion } from "../_components/FilterAccordion";
import { useGetProductBySearchQuery } from "../_store/services/productsApi";
import { usePathname, useSearchParams } from "next/navigation";
import Product from "../_components/Product";
import Link from "next/link";
import { useAppDispatch } from "../_store/hooks";
import { hideLoading, showLoading } from "../_store/features/statusSlice";
//

const sortOptions = [
    {
        name: "Newest",
        param: "sort",
        value: "newest",
    },
    {
        name: "Price: High - Low",
        param: "sort",
        value: "desc",
    },
    {
        name: "Price: Low - High",
        param: "sort",
        value: "asc",
    },
];

const accordions: Accordion[] = [
    {
        name: "Gender",
        param: "genders",
        compartments: [
            {
                name: "Men",
                value: "men",
            },
            {
                name: "Women",
                value: "women",
            },
        ],
    },
    {
        name: "Kid",
        param: "kids",
        compartments: [
            {
                name: "Boys",
                value: "younger boy"
            },
            {
                name: "Girls",
                value: "younger girl"
            }
        ]
    },
    {
        name: "Price",
        param: "prices",
        compartments: [
            {
                name: "Under 100$",
                value: "0-99",
            },
            {
                name: "100$ - 200$",
                value: "100-199",
            },
            {
                name: "200$ - 300$",
                value: "200-299",
            },
            {
                name: "300$ - 400$",
                value: "300-399",
            },
            {
                name: "400$ - 500$",
                value: "400-499",
            },
            {
                name: "Over 500$",
                value: "500-999999",
            },
        ],
    },
    {
        name: "Sale & Offers",
        param: "sales",
        compartments: [
            {
                name: "Flash Sale",
                value: "FLASH_SALE",
            },
            {
                name: "Black Friday",
                value: "BLACK_FRIDAY",
            },
        ],
    },
    {
        name: "Color",
        param: "colors",
        compartments: [
            {
                name: "Blue",
                value: "blue",
            },
            {
                name: "Red",
                value: "red",
            },
            {
                name: "Purple",
                value: "purple",
            },
            {
                name: "Yellow",
                value: "yellow",
            },
            {
                name: "White",
                value: "white",
            },
            {
                name: "Black",
                value: "black",
            },
            {
                name: "Orange",
                value: "orange",
            },
            {
                name: "Green",
                value: "green",
            },
            {
                name: "Pink",
                value: "pink",
            },
            {
                name: "Brown",
                value: "brown",
            },
            {
                name: "Gray",
                value: "gray",
            },
        ],
    },
    {
        name: "Years",
        param: "years",
        compartments: [
            {
                name: "2018",
                value: "2018",
            },
            {
                name: "2019",
                value: "2019",
            },
            {
                name: "2020",
                value: "2020",
            },
            {
                name: "2021",
                value: "2021",
            },
            {
                name: "2022",
                value: "2022",
            },
            {
                name: "2023",
                value: "2023",
            },
        ],
    },
];
const queryOptions = ["q", "sort", "prices", "years"];

const Search = () => {
    const [isSortByOpen, setIsSortByOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    //
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const {
        isLoading,
        isFetching,
        isSuccess,
        data: products,
        error,
    } = useGetProductBySearchQuery(
        new URLSearchParams(searchParams).toString()
    );
    if (error) {
        console.error(error);
    }
    else if (isLoading) {
        dispatch(showLoading());
    }
    else if (isSuccess) {
        setInterval(() => {
            dispatch(hideLoading())
        }, 500);
    }
    const handleSortHref = (param: string, value: string) =>
        pathname + "?" + createQueryString(param, value);
    //
    return (
        <section className="mx-auto min-h-screen mt-12">
            {/* Search for */}
            <div className="sticky top-16 pt-2 mx-12 z-30 bg-white">
                <header className="flex relative justify-between">
                    <h1 className="font-semibold text-2xl">
                        <span className="absolute font-medium top-0 -translate-y-6 text-sm text-secondary-600">
                            Search results for
                        </span>
                        <div className="relative max-w-xl flex items-center">
                            <span className="line-clamp-1">
                                {searchParams.get("q")}&nbsp;
                            </span>
                            <span className="">({products?.length})</span>
                        </div>
                    </h1>
                    <nav className="flex gap-8 place-items-center select-none">
                        <button
                            className="capitalize space-x-1 p-2"
                            onClick={() => setIsFilterOpen((s) => !s)}
                        >
                            <span>
                                {isFilterOpen ? "Hide" : "Show"} Filters
                            </span>
                            <svg
                                className="inline"
                                aria-hidden="true"
                                focusable="false"
                                viewBox="0 0 24 24"
                                role="img"
                                width="24px"
                                height="24px"
                                fill="none"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    d="M21 8.25H10m-5.25 0H3"
                                ></path>
                                <path
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    d="M7.5 6v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                                    clipRule="evenodd"
                                ></path>
                                <path
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    d="M3 15.75h10.75m5 0H21"
                                ></path>
                                <path
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    d="M16.5 13.5v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                        <div
                            className="hidden md:block relative cursor-pointer"
                            onClick={() => setIsSortByOpen((s) => !s)}
                        >
                            <div className="space-x-1 p-2">
                                <span>Sort By</span>
                                <FaChevronDown
                                    className={`inline transition-all duration-500 ease-out ${isSortByOpen ? " rotateX-all" : ""
                                        }`}
                                />
                            </div>
                            <ul
                                dir="rtl"
                                className={`w-36 flex flex-col shadow-lg rounded-lg box-content absolute bottom-0 right-0 translate-y-full gap-4 bg-white transition-all duration-100 ease-out h-0 overflow-hidden ${isSortByOpen ? "p-4 h-auto" : ""
                                    }`}
                            >
                                {sortOptions.map((i, idx) => {
                                    const href = handleSortHref(
                                        i.param,
                                        i.value
                                    );
                                    return (
                                        <li
                                            key={idx}
                                            className="hover:text-gray-600"
                                        >
                                            <Link href={href}>{i.name}</Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </nav>
                </header>
            </div>
            {/* Result */}
            <div className="mt-2 flex relative">
                {/* Filter bar */}
                <div
                    className={`fixed w-full h-[87vh] overscroll-none pl-12 pr-12 bg-white md:pr-0 md:sticky md:w-80 md:h-[80vh] hide-scrollbar overflow-y-scroll top-28 z-10 transition-all duration-300 ease-in-out ${isFilterOpen ? "-ml-0" : "-ml-96 md:-ml-80"
                        }`}
                >
                    {accordions.map((acc, idx) => (
                        <FilterAccordion key={idx} accordion={acc} />
                    ))}
                </div>
                {/* Products */}
                <div className=" mx-auto md:mx-16 w-full grid grid-cols-1 gap-8 md:gap-6 md:grid-cols-2 lg:gap-y-16 lg:grid-cols-3">
                    {error
                        ? "Error!"
                        : isLoading || isFetching
                            ? "Loading..."
                            : products?.map((p) => (
                                <Product key={p.id} product={p} />
                            ))}
                </div>
            </div>
        </section>
    );
};

export default Search;
