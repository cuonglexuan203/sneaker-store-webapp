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
    const { data: session, status } = useSession();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signInTrigger, { data, isLoading, error }] = useSignInMutation();
    const dispatch = useAppDispatch();
    const router = useRouter();
    //
    const isLogging = useAppSelector((state) => state.auth.isLogging);

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
                dispatch(updateUser(signInResponse.user));
                dispatch(
                    signInter({
                        accountId: signInResponse.accountId,
                        isLogging: true,
                        isOAuth: false,
                        isAccount: true,
                    })
                );
            }
        } catch (err) {
            console.error(err);
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
    return (
        <div className="w-full bg-white flex justify-center items-center flex-1">
            {error ? (
                "Error!"
            ) : isLoading ? (
                "Loading..."
            ) : (
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
                                    &nbsp;Sign In here
                                </span>
                            </p>
                            {/* Sign In button */}
                            <button className="mt-1 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
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
            )}
        </div>
    );
}
