"use client";

import { useRouter } from "next/navigation";
import { FormEvent, MouseEvent, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { signOut, signIn } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "../_store/hooks";
import { RootState } from "../_store/store";
import {
    toggleIsNotificationOpen,
    toggleIsUserMenuOpen,
    toggleIsSearching,
} from "../_store/features/navBarSlice";
import { UserInfo, removeUser, updateUser } from "../_store/features/userSlice";
import {
    signOut as signOuter,
    signIn as signInter,
    Auth,
} from "../_store/features/authSlice";
import Link from "next/link";
import QuantityCart from "./QuantityCart";
//
const NavBar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const router = useRouter();
    //
    const dispatch = useAppDispatch();
    const isNotificationOpen = useAppSelector(
        (state: RootState) => state.navbar.isNotificationOpen
    );
    const isUserMenuOpen = useAppSelector(
        (state: RootState) => state.navbar.isUserMenuOpen
    );

    const authData: Auth = useAppSelector((state) => state.auth);
    const userInfo: UserInfo = useAppSelector((state) => state.user.info);
    //
    const { data: session } = useSession();
    useEffect(() => {
        //* Update user information by session
        if (session) {
            dispatch(
                updateUser({
                    user: {
                        name: session?.user?.name!,
                        email: session?.user?.email!,
                        image: session?.user?.image!,
                    },
                    expires: session?.expires || "",
                })
            );
        }
        //* Validate isLogging state
        // if (
        //     userInfo.firstName === null ||
        //     userInfo.firstName === undefined ||
        //     userInfo.firstName === ""
        // ) {
        //     dispatch(
        //         signInter({
        //             accountId: 0,
        //             isLogging: false,
        //             isOAuth: false,
        //             isAccount: false,
        //         })
        //     );
        // }
    }, [session]);
    //
    const handleSearchSubmit = (
        e: FormEvent<HTMLFormElement> | MouseEvent<HTMLDivElement>
    ) => {
        e.preventDefault();
        router.push(`/search?q=${searchQuery}`);
    };

    const handleCloseNotification = () => {
        if (isNotificationOpen) {
            dispatch(toggleIsNotificationOpen());
        }
    };
    const handleCloseUserMenu = () => {
        if (isUserMenuOpen) {
            dispatch(toggleIsUserMenuOpen());
        }
    };

    return (
        <nav
            className="sticky top-0 z-[1000] w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
            onClick={() => {
                handleCloseNotification();
                handleCloseUserMenu();
            }}
        >
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between relative">
                    {/* Logo part */}
                    <div className="flex items-center justify-start">
                        {/* Mobile Menu logo */}
                        <button
                            id="toggleSidebarMobile"
                            aria-expanded="true"
                            aria-controls="sidebar"
                            className="p-2 text-gray-600 rounded cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            onClick={() => setIsMobileMenuOpen((s) => !s)}
                        >
                            <svg
                                id="toggleSidebarMobileHamburger"
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <svg
                                id="toggleSidebarMobileClose"
                                className="hidden w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                        {/* Logo & Page name */}
                        <Link href="/" className="flex ml-2 md:mr-24">
                            <Image
                                alt="Logo"
                                src="/images/logo/logo.svg"
                                height={32}
                                width={32}
                                className="mr-4"
                            />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                Sneaker Store
                            </span>
                        </Link>
                        {/* Search bar */}
                        <form
                            onSubmit={handleSearchSubmit}
                            action="#"
                            method="GET"
                            className={`absolute -bottom-4 left-1/2 z-10 ${isSearchBarOpen ? "opacity-100 -translate-x-1/2 translate-y-full" : "opacity-0 -translate-x-0 translate-y-0"} transition-all duration-100 lg:opacity-100 lg:static lg:block lg:pl-3.5 select-none`}
                        >
                            <label htmlFor="topbar-search" className="sr-only">
                                Search
                            </label>
                            <div className="relative mt-1 lg:w-72 xl:w-96">
                                <div
                                    className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer"
                                    onClick={handleSearchSubmit}
                                >
                                    <FaMagnifyingGlass />
                                </div>
                                <input
                                    type="text"
                                    id="topbar-search"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Search"
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                            </div>
                        </form>
                    </div>
                    {/* Menu part */}
                    <div
                        className={`${!isMobileMenuOpen ? "hidden " : ""} absolute w-screen left-0 bottom-1 right-0 translate-y-full -translate-x-3 sm:w-auto sm:bottom-0 sm:translate-y-0 sm:translate-x-0 md:flex md:relative md:ml-2 items-center justify-start z-50`}
                    >
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 md:rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link
                                    href="/"
                                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                                    aria-current="page"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="group relative">
                                <button
                                    id="dropdownNavbarLink"
                                    data-dropdown-toggle="dropdownNavbar"
                                    className="flex place-items-center w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                                >
                                    News{" "}
                                    <svg
                                        className="w-2.5 h-2.5 ms-2.5"
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
                                            d="m1 1 4 4 4-4"
                                        />
                                    </svg>
                                </button>
                                {/* News Dropdown */}
                                <div
                                    id="dropdownNavbar"
                                    className="group-hover:block absolute z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                                >
                                    <ul
                                        className="py-2 text-sm text-gray-700 dark:text-gray-400"
                                        aria-labelledby="dropdownLargeButton"
                                    >
                                        <li>
                                            <Link
                                                href="/search?q=&sort=newest"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Latest
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/#trending"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Trending
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className="py-1">
                                        <a
                                            href="/#others"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                                        >
                                            Others
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/help_center"
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                >
                                    Help
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* User part */}
                    <div className="flex items-center gap-2 z-20">
                        {/* Search Icon */}
                        <button
                            id="toggleSidebarMobileSearch"
                            type="button"
                            onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}
                            className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <span className="sr-only">Search</span>
                            <FaMagnifyingGlass />
                        </button>
                        {/* Notification */}
                        <button
                            className={`hidden xl:block relative p-2 ${isNotificationOpen
                                ? "bg-sky-500 text-white"
                                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                                } rounded-lg`}
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch(toggleIsNotificationOpen());
                            }}
                        >
                            <div>
                                <span className="sr-only">
                                    View notifications
                                </span>
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                                </svg>
                            </div>
                            {/* Notification dropdown */}
                            <div
                                className={`transition-all duration-150 ease-out h-0 absolute z-50  w-96 -translate-x-1/2 my-4 overflow-hidden text-base text-left list-none bg-white divide-y divide-gray-100 rounded shadow-lg dark:divide-gray-600 dark:bg-gray-700 ${isNotificationOpen
                                    ? "h-auto translate-y-0"
                                    : "-translate-y-8"
                                    }`}
                            >
                                <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    Notifications
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="flex px-4 py-3 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                                    >
                                        <div className="flex-shrink-0">
                                            <Image
                                                width={0}
                                                height={0}
                                                className="rounded-full w-11 h-11"
                                                src="/images/logo/logo.svg"
                                                alt="Jese image"
                                            />
                                            <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 border border-white rounded-full bg-primary-700 dark:border-gray-700">
                                                <svg
                                                    className="w-3 h-3 text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                                                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="w-full pl-3">
                                            <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                                New message from{" "}
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    Bonnie Green
                                                </span>
                                                :&quot;Hey, what&apos;s up? All
                                                set for the presentation?&quot;
                                            </div>
                                            <div className="text-xs font-medium text-blue-700 dark:text-primary-400">
                                                a few moments ago
                                            </div>
                                        </div>
                                    </a>
                                    <a
                                        href="#"
                                        className="flex px-4 py-3 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                                    >
                                        <div className="flex-shrink-0">
                                            <Image
                                                width={0}
                                                height={0}
                                                className="rounded-full w-11 h-11"
                                                src="/images/logo/logo.svg"
                                                alt="Jese image"
                                            />
                                            <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-gray-900 border border-white rounded-full dark:border-gray-700">
                                                <svg
                                                    className="w-3 h-3 text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="w-full pl-3">
                                            <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    Jese leos
                                                </span>{" "}
                                                and{" "}
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    5 others
                                                </span>{" "}
                                                started following you.
                                            </div>
                                            <div className="text-xs font-medium text-blue-700 dark:text-primary-400">
                                                10 minutes ago
                                            </div>
                                        </div>
                                    </a>
                                    <a
                                        href="#"
                                        className="flex px-4 py-3 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                                    >
                                        <div className="flex-shrink-0">
                                            <Image
                                                width={0}
                                                height={0}
                                                className="rounded-full w-11 h-11"
                                                src="/images/logo/logo.svg"
                                                alt="Jese image"
                                            />
                                            <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-red-600 border border-white rounded-full dark:border-gray-700">
                                                <svg
                                                    className="w-3 h-3 text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="w-full pl-3">
                                            <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    Joseph Mcfall
                                                </span>{" "}
                                                and{" "}
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    141 others
                                                </span>{" "}
                                                love your story. See it and view
                                                more stories.
                                            </div>
                                            <div className="text-xs font-medium text-blue-700 dark:text-primary-400">
                                                44 minutes ago
                                            </div>
                                        </div>
                                    </a>
                                    <a
                                        href="#"
                                        className="flex px-4 py-3 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                                    >
                                        <div className="flex-shrink-0">
                                            <Image
                                                width={0}
                                                height={0}
                                                className="rounded-full w-11 h-11"
                                                src="/images/logo/logo.svg"
                                                alt="Jese image"
                                            />
                                            <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-green-400 border border-white rounded-full dark:border-gray-700">
                                                <svg
                                                    className="w-3 h-3 text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="w-full pl-3">
                                            <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    Leslie Livingston
                                                </span>{" "}
                                                mentioned you in a comment:{" "}
                                                <span className="font-medium text-primary-700 dark:text-primary-500">
                                                    @bonnie.green
                                                </span>{" "}
                                                what do you say?
                                            </div>
                                            <div className="text-xs font-medium text-blue-700 dark:text-primary-400">
                                                1 hour ago
                                            </div>
                                        </div>
                                    </a>
                                    <a
                                        href="#"
                                        className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600"
                                    >
                                        <div className="flex-shrink-0">
                                            <Image
                                                width={0}
                                                height={0}
                                                className="rounded-full w-11 h-11"
                                                src="/images/logo/logo.svg"
                                                alt="Jese image"
                                            />
                                            <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-purple-500 border border-white rounded-full dark:border-gray-700">
                                                <svg
                                                    className="w-3 h-3 text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="w-full pl-3">
                                            <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    Robert Brown
                                                </span>{" "}
                                                posted a new video:
                                                Glassmorphism - learn how to
                                                implement the new design trend.
                                            </div>
                                            <div className="text-xs font-medium text-blue-700 dark:text-primary-400">
                                                3 hours ago
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <a
                                    href="#"
                                    className="block py-2 text-base font-normal text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline"
                                >
                                    <div className="inline-flex items-center ">
                                        <svg
                                            className="w-5 h-5 mr-2"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                            <path
                                                fillRule="evenodd"
                                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        View all
                                    </div>
                                </a>
                            </div>
                        </button>
                        {/* Cart */}
                        <Link
                            href={"/cart"}
                            className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            <span className="sr-only">View notifications</span>
                            <QuantityCart isLogging={authData.isAccount} userId={userInfo.id} />

                        </Link>
                        {/* Theme toggle */}
                        <button
                            className="hidden xl:block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 
                            hover:text-gray-900 dark:hover:text-white rounded-lg text-sm p-1 sm:p-2.5"
                            onClick={() => setIsDarkMode(!isDarkMode)}
                        >
                            {isDarkMode ? (
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                </svg>
                            ) : (
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            )}
                        </button>
                        {/* Theme tip */}
                        <div
                            id="tooltip-toggle"
                            role="tooltip"
                            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip"
                        >
                            Toggle dark mode
                            <div
                                className="tooltip-arrow"
                                data-popper-arrow
                            ></div>
                        </div>
                        {/* User */}
                        {authData.isLogging || authData.isOAuth ? (
                            <div className="relative flex items-center ml-3">
                                {/* Avatar */}
                                <div>
                                    <button
                                        type="button"
                                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                        id="user-menu-button-2"
                                        aria-expanded="false"
                                        data-dropdown-toggle="dropdown-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(toggleIsUserMenuOpen());
                                        }}
                                    >
                                        <span className="sr-only">
                                            Open user menu
                                        </span>
                                        <img
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                            src={
                                                userInfo.imageUrl ||
                                                "/images/auth/unknown_user.jpg"
                                            }
                                            alt="user photo"
                                        />
                                    </button>
                                </div>
                                {/* User dropdown */}
                                <div
                                    className={`${isUserMenuOpen
                                        ? "h-fit translate-y-5"
                                        : ""
                                        } h-0 transition-all duration-150 ease-out absolute top-0 overflow-hidden right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                            id="dropdown-2`}
                                >
                                    <div className="px-4 py-3" role="none">
                                        <p
                                            className="text-sm text-gray-900 dark:text-white font-bold"
                                            role="none"
                                        >
                                            {userInfo.firstName +
                                                userInfo.lastName
                                                ? userInfo.firstName
                                                : ""}
                                        </p>
                                        <p
                                            className="text-sm font-medium text-sky-600 truncate dark:text-gray-300"
                                            role="none"
                                        >
                                            {userInfo.email}
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <Link
                                                href="/user/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/orders"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Order History
                                            </Link>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Dash Board
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                onClick={() => {
                                                    if (authData.isOAuth) {
                                                        signOut();
                                                    }
                                                    dispatch(removeUser());
                                                    dispatch(signOuter());
                                                }}
                                            >
                                                Sign out
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <button
                                type="button"
                                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-2 text-center"
                                onClick={() => signIn()}
                            >
                                Sign In/Up
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
