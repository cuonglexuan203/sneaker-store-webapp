"use client";
import Image from "next/image";
import { useRouter, redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/(main)/_store/hooks";
import OAuthButton from "@/app/(main)/_components/OAuthButton";
import { Account } from "@/app/(main)/_store/services/userApi";

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

const SignInPage = () => {
    const { data: session } = useSession();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [repeatPw, setRepeatPw] = useState("");
    const router = useRouter();
    //
    const dispatch = useAppDispatch();
    const isLogging = useAppSelector((state) => state.auth.isLogging);

    if (session || isLogging) {
        // dispatch action along with session changes here
        redirect("/");
    }

    //
    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const inputedLogInData: Account = {
            id: 0,
            username,
            password,
        };
        //
        // const signInResponse = await signInTrigger(inputedLogInData).unwrap();
        // //
        // if (signInResponse) {
        //     dispatch(updateUser(signInResponse.user));
        //     dispatch(
        //         signInter({
        //             accountId: signInResponse.id,
        //             isLogging: true,
        //             isOAuth: false,
        //             isAccount: true,
        //         })
        //     );
        // }
    };
    const authForm = (
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
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
            <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Address
                </label>
                <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    type="text"
                    placeholder="Washington"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>

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
    );
    return (
        <div className="bg-white flex justify-center items-center flex-1">
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
                            className="mt-1 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                            onClick={() => {}}
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
                        {/* OAuth */}
                    </div>
                </form>
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
        </div>
    );
};

export default SignInPage;