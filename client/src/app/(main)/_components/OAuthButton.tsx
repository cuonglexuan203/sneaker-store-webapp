import Image from "next/image";
import { signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import { signIn as signInter } from "../_store/features/authSlice";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
//
const OAuthButton = ({
    name,
    imgUrl,
    callbackUrl = "/",
}: {
    name: string;
    imgUrl: string;
    callbackUrl: string;
}) => {
    const dispatch = useDispatch();
    const { data: session, status } = useSession();

    return (
        <button
            className="group w-full h-12 px-6 border-2 border-gray-300 rounded-3xl transition duration-300 
         hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
            onClick={async () => {
                await signIn(name, { callbackUrl: callbackUrl });
                dispatch(
                    signInter({
                        accountId: 0,
                        isLogging: true,
                        isOAuth: true,
                        isAccount: false,
                    })
                );
            }}
        >
            <div className="relative flex items-center space-x-4 justify-center">
                <Image
                    alt=""
                    width={0}
                    height={0}
                    sizes="100%"
                    src={imgUrl}
                    className="left-0 w-5"
                />
                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                    Continue with <span className="capitalize">{name}</span>
                </span>
            </div>
        </button>
    );
};

export default OAuthButton;
