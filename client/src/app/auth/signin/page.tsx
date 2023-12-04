"use client";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { useSignInMutation } from "@/app/(main)/_store/services/userApi";
import { type Account } from "@/app/(main)/_store/services/userApi";
import { useAppDispatch, useAppSelector } from "@/app/(main)/_store/hooks";
import { updateUser } from "@/app/(main)/_store/features/userSlice";
import { signIn as signInter } from "@/app/(main)/_store/features/authSlice";
import OAuthButton from "@/app/(main)/_components/OAuthButton";
import { motion } from "framer-motion";
import Link from "next/link";

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

export default function SignIn() {
    const { data: session } = useSession();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSuccessfulToastVisible, setIsSuccessfulToastVisible] =
        useState(false);
    const [isFailedToastVisible, setIsFailedToastVisible] = useState(false);
    const [signInTrigger, { data, isLoading, error, isSuccess, status }] = useSignInMutation();
    const dispatch = useAppDispatch();
    const router = useRouter();
    //
    const isLogging = useAppSelector((state) => state.auth.isLogging);
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

    //
    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const inputedLogInData: Account = {
            username,
            password,
        };
        //
        try {
            const signInResponse = await signInTrigger(
                inputedLogInData
            ).unwrap();
            //
            if (signInResponse) {
                setIsSuccessfulToastVisible(true);
                dispatch(updateUser(signInResponse.user));
                dispatch(
                    signInter({
                        accountId: signInResponse.accountId,
                        isLogging: true,
                        isOAuth: false,
                        isAccount: true,
                        isAdmin: signInResponse.role === "ADMIN"
                    })
                );
            }
        } catch (err) {
            console.error(err);
            setIsFailedToastVisible(true);
        }
    };
    const authForm = (
        <div className="w-full flex-1 mt-8">
            <div className="mx-auto max-w-xs">
                <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
        </div>
    );

    //
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
                <p className="text-xs font-medium">Incorrect username or password</p>
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
        <section className="w-full bg-white flex justify-center items-center flex-1">

            <div className="p-6 lg:m-4 lg:rounded-2xl sm:p-12 shadow-xl flex flex-col gap-4">
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
                            Don&apos;t have an account?
                            <span
                                className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                                onClick={() =>
                                    router.replace("/auth/signup")
                                }
                            >
                                &nbsp;Sign Up here
                            </span>
                        </p>
                        {/* Sign In button */}
                        <button disabled={isLoading || isFailedToastVisible} className={`${isLoading || isFailedToastVisible ? "bg-gray-500" : "bg-indigo-500 hover:bg-indigo-700"} mt-1 tracking-wide font-semibold text-gray-100 w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}>
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
                            <span className="ml-3">Sign&nbsp;In</span>
                        </button>
                    </div>
                </form>
                {/* OAuth */}
                <ul className=" flex flex-col items-center justify-center gap-3">
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
}
