"use client";
import Image from "next/image";
import { useRouter, redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/(main)/_store/hooks";
import OAuthButton from "@/app/(main)/_components/OAuthButton";
import {
    SignUpRequestBody,
    useSignUpMutation,
} from "@/app/(main)/_store/services/userApi";
import React from "react";
import { updateUser } from "@/app/(main)/_store/features/userSlice";
import { signIn as signInter } from "@/app/(main)/_store/features/authSlice";
import { motion } from "framer-motion";
import Link from "next/link";
import { hideLoading, showLoading } from "@/app/(main)/_store/features/statusSlice";

const oAuthOptions = [
    {
        name: "google",
        callbackUrl: "/",
        imgUrl: "/images/auth/google.svg",
    },
    {
        name: "facebook",
        callbackUrl: "/",
        imgUrl: "/images/auth/facebook.svg",
    },
    {
        name: "github",
        callbackUrl: "/",
        imgUrl: "/images/auth/github.svg",
    },
];

const countries = ["United States", "Canada", "France", "Germany"];

const countryCities: { [country: string]: string[] } = {
    "United States": ["New York", "Los Angeles", "Chicago"],
    Canada: ["Toronto", "Vancouver", "Montreal"],
    France: ["Paris", "Lyon", "Marseille"],
    Germany: ["Berlin", "Munich", "Frankfurt"],
};

const SignInPage = () => {
    const { data: session } = useSession();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [repeatPw, setRepeatPw] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [isSuccessfulToastVisible, setIsSuccessfulToastVisible] =
        useState(false);
    const [isFailedToastVisible, setIsFailedToastVisible] = useState(false);
    //
    const [signUpTrigger, { data, isLoading, error }] = useSignUpMutation();

    const router = useRouter();
    //
    const dispatch = useAppDispatch();
    const isLogging = useAppSelector((state: any) => state.auth.isLogging);

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
    //

    if (session || isLogging) {
        // dispatch action along with session changes here
        redirect("/");
    }
    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = e.target.value;
        setCountry(selectedOption);
    };

    const cities = countryCities[country] || [];

    //
    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const signUpRequestBody: SignUpRequestBody = {
            user: {
                firstName,
                lastName,
                email,
                gender: gender === "male",
                birthday,
                phoneNumber,
                address: {
                    country,
                    city,
                    district,
                },
            },
            account: {
                username,
                password,
            },
        };
        //
        try {
            const signUpResponse = await signUpTrigger(
                signUpRequestBody
            ).unwrap();
            //
            if (signUpResponse) {
                setIsSuccessfulToastVisible(true);
                dispatch(updateUser(signUpResponse.user));
                dispatch(
                    signInter({
                        accountId: signUpResponse.accountId,
                        isLogging: true,
                        isOAuth: false,
                        isAccount: true,
                    })
                );
            }
        } catch (err) {
            console.error(err);
            setIsFailedToastVisible(true);
        }
    };
    const authForm = (
        <div className="grid grid-cols-1 gap-6 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        First Name
                    </label>
                    <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        type="text"
                        placeholder="John"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Last name
                    </label>
                    <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        type="text"
                        placeholder="Snow"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Birthday
                    </label>
                    <input
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                        type="date"
                        className="block w-full px-5 py-3 mt-2 bg-white border border-gray-200 rounded-md"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Gender
                    </label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                        className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    >
                        <option
                            value=""
                            disabled
                            hidden
                            selected
                            style={{ color: "#4a5568" }} // Tailwind's text-gray-700
                        >
                            Select Gender
                        </option>

                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        {/* Additional gender options can be added here */}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Email
                    </label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        type="email"
                        placeholder="johnsnow@example.com"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Phone number
                    </label>
                    <input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        type="tel"
                        placeholder="XXX-XX-XXXX-XXX"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Address Fields */}
                <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Country
                    </label>
                    <select
                        value={country}
                        onChange={handleCountryChange}
                        required
                        className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    >
                        <option value="" disabled selected>
                            Select a country
                        </option>
                        {countries.map((countryName, index) => (
                            <option key={index} value={countryName}>
                                {countryName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* City select dropdown */}
                <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        City
                    </label>
                    <select
                        value={city}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setCity(e.target.value)
                        }
                        required
                        disabled={country.length === 0}
                        className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    >
                        <option value="">
                            {country.length > 0
                                ? "Select a city"
                                : "Select countries first"}
                        </option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        District
                    </label>
                    <input
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        required
                        type="text"
                        placeholder="7597 Jessica Mountains "
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Username
                    </label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        type="text"
                        placeholder="jhonsnow12"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Password
                    </label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        type="password"
                        placeholder="Enter your password"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>

                <div className="relative">
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Confirm password
                    </label>
                    <input
                        onChange={(e) => setRepeatPw(e.target.value)}
                        required
                        type="password"
                        placeholder="Enter your password"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {password === repeatPw || (
                        <p className="absolute bottom-0 text-sm text-red-500 translate-y-full">
                            Both passwords don&apos;t match
                        </p>
                    )}
                </div>
            </div>
        </div>
    );

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
                <span className="sr-only">Successfully</span>
            </div>

            <div className="ml-3 text-sm font-normal">
                <em className="text-amber-500">
                    Successfully
                </em>
                <br />
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
                <p className="text-xs font-medium">There are some problems. Maybe your username already exists!</p>
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
    //
    return (
        <section className="bg-white flex justify-center items-center flex-1">
            <div className="p-6 lg:m-4 lg:rounded-2xl sm:p-12 shadow-xl flex flex-col gap-4 items-center">
                <div>
                    <Image
                        alt=""
                        width={0}
                        height={0}
                        sizes="100%"
                        src="/images/logo/logo.svg"
                        className="w-32 mx-auto"
                    />
                </div>
                <h1 className="text-2xl xl:text-3xl font-extrabold text-center">
                    Sneaker Store
                </h1>
                <form
                    className="flex flex-col items-center"
                    onSubmit={handleFormSubmit}
                >
                    {/*  */}
                    <div className="flex flex-col gap-4">
                        {/* Sign In */}
                        {authForm}
                        {/* Term */}
                        <p className="mt-2 text-xs text-gray-600 text-center">
                            I agree to abide by templatana&apos;s&nbsp;
                            <a
                                href="#"
                                className="border-b border-gray-500 border-dotted"
                            >
                                Terms of Service&nbsp;
                            </a>
                            and its&nbsp;
                            <a
                                href="#"
                                className="border-b border-gray-500 border-dotted"
                            >
                                Privacy Policy
                            </a>
                        </p>
                        {/* Toggle Sign In */}
                        <p className="text-center text-sm text-gray-600">
                            Already have an account?
                            <span
                                className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                                onClick={() => router.replace("/auth/signin")}
                            >
                                &nbsp;Sign In here
                            </span>
                        </p>
                        {/* Sign In button */}
                        <button
                            disabled={isLoading || password !== repeatPw}
                            className={`${isLoading || isFailedToastVisible || password !== repeatPw || password.trim().length < 1 ? "bg-gray-500" : "bg-indigo-500 hover:bg-indigo-700"} mt-1 tracking-wide font-semibold text-gray-100 w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
                            onClick={() => { }}
                        >
                            <svg
                                className="w-6 h-6 -ml-2"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span className="ml-3">Sign&nbsp;Up</span>
                        </button>
                    </div>
                </form>
                {/* OAuth */}
                <ul className="w-full flex flex-col flex-1 items-center justify-center gap-3">
                    {oAuthOptions.map((i) => (
                        <li key={i.name} className="w-full">
                            <OAuthButton
                                name={i.name}
                                callbackUrl={i.callbackUrl}
                                imgUrl={i.imgUrl}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bottom-8 right-8 fixed">
                {isSuccessfulToastVisible && successfulToast}
                {isFailedToastVisible && failedToast}
            </div>
        </section>
    );
};

export default SignInPage;
