"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../_store/hooks";
import { User, UserInfo, updateUser } from "../../_store/features/userSlice";
import { ChangePasswordRequestBody, useChangePasswordMutation, useUpdateUserMutation } from "../../_store/services/userApi";
import { useAppDispatch } from "../../_store/hooks";
import { hideLoading, showLoading } from "../../_store/features/statusSlice";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";

const UserProfile = () => {
  const user: UserInfo = useAppSelector((state) => state.user.info);
  //
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState({ ...user.address });
  const [phone, setPhone] = useState(user.phoneNumber);
  const [birthday, setBirthday] = useState(user.birthday);
  const [gender, setGender] = useState(user.gender);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditingMode, setIsEditingMode] = useState(false);
  //
  const [isSuccessfulToastVisible, setIsSuccessfulToastVisible] =
    useState(false);
  const [isFailedToastVisible, setIsFailedToastVisible] = useState(false);
  //
  const dispatch = useAppDispatch();
  //
  const [updateUserTrigger, { isLoading, isError, data, isSuccess }] =
    useUpdateUserMutation();
  const [changePasswordTrigger, { isLoading: isChangePasswordLoading, isError: isChangePasswordError, data: changePasswordData, isSuccess: isChangePasswordSuccess }] = useChangePasswordMutation();
  //
  const { data: session, status } = useSession();
  const isLogging = useAppSelector(state => state.auth.isLogging);
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
  if (!session && !isLogging) {
    // dispatch action along with session changes here
    redirect("/");
  }
  //
  if (isError) {

  }
  else if (isLoading || isChangePasswordLoading) {
    dispatch(showLoading());
  }
  else if (isSuccess || isChangePasswordSuccess) {
    setInterval(() => {
      dispatch(hideLoading())
    }, 500);
  }

  const handleSaveUserInfo = async () => {
    const updatedUserInfo: UserInfo = {
      id: user.id,
      firstName,
      lastName,
      email,
      address,
      phoneNumber: phone,
      birthday,
      gender,
      imageUrl: user.imageUrl,
    };
    try {
      const response = await updateUserTrigger(updatedUserInfo).unwrap();
      setIsSuccessfulToastVisible(true);
      setIsEditingMode(s => !s);
      dispatch(updateUser(updatedUserInfo));
    }
    catch (err) {
      setIsFailedToastVisible(true);
      console.error("Error updating user", err);

    }
  };
  const handleEdittingModeChange = () => {
    if (isEditingMode) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setAddress(user.address);
      setPhone(user.phoneNumber);
      setBirthday(user.birthday);
      setGender(user.gender);
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
    }
    setIsEditingMode(!isEditingMode);
  };

  const handlePasswordChange = async () => {
    const changePasswordReqBody: ChangePasswordRequestBody = {
      userId: user.id,
      currentPassword,
      newPassword: password,
    }
    try {

      const response = await changePasswordTrigger(changePasswordReqBody).unwrap();
      setIsSuccessfulToastVisible(true);
    }
    catch (err) {
      setIsFailedToastVisible(true);
      console.error("Error in updateing user password", err);
    }
  };
  //
  const maxLevel = 4;
  const isAtLeast6Letters = (str: string) => str.length >= 6;
  const isContainUpperLetter = (str: string) => str.search(/[A-Z]/) >= 0;
  const isContainLowerLetter = (str: string) => str.search(/[a-z]/) >= 0;
  const isContainNumber = (str: string) => str.search(/[0-9]/) >= 0;
  const isContainSpecialLetter = (str: string) =>
    str.search(/[^a-zA-Z0-9]/) >= 0;
  const getPasswordStrength = (pwd: string): number => {
    let level = 0;
    if (isAtLeast6Letters(pwd)) level++;
    if (isContainUpperLetter(pwd) && isContainLowerLetter(pwd)) level++;
    if (isContainSpecialLetter(pwd)) level++;
    if (isContainNumber(pwd)) level++;
    return level;
  };
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
          Successfully update user information
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
  //
  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
        <div className="mb-4 col-span-full xl:mb-2">
          <nav className="flex mb-5" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
              <li className="inline-flex items-center">
                <a
                  href="#"
                  className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"
                >
                  <svg
                    className="w-5 h-5 mr-2.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <a
                    href="#"
                    className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white"
                  >
                    Users
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span
                    className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500"
                    aria-current="page"
                  >
                    Profile
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              User Profile
            </h1>
            <button
              onClick={handleEdittingModeChange}
              className={`text-white ${isEditingMode
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-800 hover:bg-gray-900"
                }  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700`}
            >
              {isEditingMode ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>
        <div className="col-span-full xl:col-auto">
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
              <Image
                className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
                width={0}
                height={0}
                sizes="100%"
                src="/images/users/avatar.jpg"
                alt="Jese picture"
              />
              <div>
                <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                  Profile picture
                </h3>
                <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                  JPG, GIF or PNG. Max size of 800K
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    <svg
                      className="w-4 h-4 mr-2 -ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path>
                      <path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path>
                    </svg>
                    Upload picture
                  </button>
                  <button
                    type="button"
                    className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="flow-root">
              <h3 className="text-xl font-semibold dark:text-white">
                Social accounts
              </h3>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 dark:text-white"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="facebook-f"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path
                          fill="currentColor"
                          d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                        ></path>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-base font-semibold text-gray-900 truncate dark:text-white">
                        Facebook account
                      </span>
                      <a
                        href="#"
                        className="block text-sm font-normal truncate text-primary-700 hover:underline dark:text-primary-500"
                      >
                        www.facebook.com/themesberg
                      </a>
                    </div>
                    <div className="inline-flex items-center">
                      <a
                        href="#"
                        className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Disconnect
                      </a>
                    </div>
                  </div>
                </li>
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 dark:text-white"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="twitter"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                        ></path>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-base font-semibold text-gray-900 truncate dark:text-white">
                        Twitter account
                      </span>
                      <a
                        href="#"
                        className="block text-sm font-normal truncate text-primary-700 hover:underline dark:text-primary-500"
                      >
                        www.twitter.com/themesberg
                      </a>
                    </div>
                    <div className="inline-flex items-center">
                      <a
                        href="#"
                        className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Disconnect
                      </a>
                    </div>
                  </div>
                </li>
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 dark:text-white"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="github"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 496 512"
                      >
                        <path
                          fill="currentColor"
                          d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                        ></path>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-base font-semibold text-gray-900 truncate dark:text-white">
                        Github account
                      </span>
                      <span className="block text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                        Not connected
                      </span>
                    </div>
                    <div className="inline-flex items-center">
                      <a
                        href="#"
                        className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Connect
                      </a>
                    </div>
                  </div>
                </li>
                <li className="pt-4 pb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 dark:text-white"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="dribbble"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M256 8C119.252 8 8 119.252 8 256s111.252 248 248 248 248-111.252 248-248S392.748 8 256 8zm163.97 114.366c29.503 36.046 47.369 81.957 47.835 131.955-6.984-1.477-77.018-15.682-147.502-6.818-5.752-14.041-11.181-26.393-18.617-41.614 78.321-31.977 113.818-77.482 118.284-83.523zM396.421 97.87c-3.81 5.427-35.697 48.286-111.021 76.519-34.712-63.776-73.185-116.168-79.04-124.008 67.176-16.193 137.966 1.27 190.061 47.489zm-230.48-33.25c5.585 7.659 43.438 60.116 78.537 122.509-99.087 26.313-186.36 25.934-195.834 25.809C62.38 147.205 106.678 92.573 165.941 64.62zM44.17 256.323c0-2.166.043-4.322.108-6.473 9.268.19 111.92 1.513 217.706-30.146 6.064 11.868 11.857 23.915 17.174 35.949-76.599 21.575-146.194 83.527-180.531 142.306C64.794 360.405 44.17 310.73 44.17 256.323zm81.807 167.113c22.127-45.233 82.178-103.622 167.579-132.756 29.74 77.283 42.039 142.053 45.189 160.638-68.112 29.013-150.015 21.053-212.768-27.882zm248.38 8.489c-2.171-12.886-13.446-74.897-41.152-151.033 66.38-10.626 124.7 6.768 131.947 9.055-9.442 58.941-43.273 109.844-90.795 141.978z"
                        ></path>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-base font-semibold text-gray-900 truncate dark:text-white">
                        Dribbble account
                      </span>
                      <span className="block text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                        Not connected
                      </span>
                    </div>
                    <div className="inline-flex items-center">
                      <a
                        href="#"
                        className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Connect
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
              <div>
                {isEditingMode && (
                  <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Save all
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="flow-root">
              <h3 className="text-xl font-semibold dark:text-white">
                Other accounts
              </h3>
              <ul className="mb-6 divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-4">
                  <div className="flex justify-between xl:block 2xl:flex align-center 2xl:space-x-4">
                    <div className="flex space-x-4 xl:mb-4 2xl:mb-0">
                      <div>
                        <Image
                          width={0}
                          height={0}
                          sizes="100%"
                          className="w-6 h-6 rounded-full"
                          src="/images/users/1.jpg"
                          alt="Bonnie image"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-gray-900 leading-none truncate mb-0.5 dark:text-white">
                          Bonnie Green
                        </p>
                        <p className="mb-1 text-sm font-normal truncate text-primary-700 dark:text-primary-500">
                          New York, USA
                        </p>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Last seen: 1 min ago
                        </p>
                      </div>
                    </div>
                    <div className="inline-flex items-center w-auto xl:w-full 2xl:w-auto">
                      <a
                        href="#"
                        className="w-full px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Disconnect
                      </a>
                    </div>
                  </div>
                </li>
                <li className="py-4">
                  <div className="flex justify-between xl:block 2xl:flex align-center 2xl:space-x-4">
                    <div className="flex space-x-4 xl:mb-4 2xl:mb-0">
                      <div>
                        <Image
                          width={0}
                          height={0}
                          sizes="100%"
                          className="w-6 h-6 rounded-full"
                          src="/images/users/1.jpg"
                          alt="Jese image"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-gray-900 leading-none truncate mb-0.5 dark:text-white">
                          Jese Leos
                        </p>
                        <p className="mb-1 text-sm font-normal truncate text-primary-700 dark:text-primary-500">
                          California, USA
                        </p>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Last seen: 2 min ago
                        </p>
                      </div>
                    </div>
                    <div className="inline-flex items-center w-auto xl:w-full 2xl:w-auto">
                      <a
                        href="#"
                        className="w-full px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Disconnect
                      </a>
                    </div>
                  </div>
                </li>
                <li className="py-4">
                  <div className="flex justify-between xl:block 2xl:flex align-center 2xl:space-x-4">
                    <div className="flex space-x-4 xl:mb-4 2xl:mb-0">
                      <div>
                        <Image
                          width={0}
                          height={0}
                          sizes="100%"
                          className="w-6 h-6 rounded-full"
                          src="/images/users/1.jpg"
                          alt="Thomas image"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-gray-900 leading-none truncate mb-0.5 dark:text-white">
                          Thomas Lean
                        </p>
                        <p className="mb-1 text-sm font-normal truncate text-primary-700 dark:text-primary-500">
                          Texas, USA
                        </p>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Last seen: 1 hour ago
                        </p>
                      </div>
                    </div>
                    <div className="inline-flex items-center w-auto xl:w-full 2xl:w-auto">
                      <a
                        href="#"
                        className="w-full px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Disconnect
                      </a>
                    </div>
                  </div>
                </li>
                <li className="pt-4">
                  <div className="flex justify-between xl:block 2xl:flex align-center 2xl:space-x-4">
                    <div className="flex space-x-4 xl:mb-4 2xl:mb-0">
                      <div>
                        <Image
                          width={0}
                          height={0}
                          sizes="100%"
                          className="w-6 h-6 rounded-full"
                          src="/images/users/1.jpg"
                          alt="Lana image"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-gray-900 leading-none truncate mb-0.5 dark:text-white">
                          Lana Byrd
                        </p>
                        <p className="mb-1 text-sm font-normal truncate text-primary-700 dark:text-primary-500">
                          Texas, USA
                        </p>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Last seen: 1 hour ago
                        </p>
                      </div>
                    </div>
                    <div className="inline-flex items-center w-auto xl:w-full 2xl:w-auto">
                      <a
                        href="#"
                        className="w-full px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Disconnect
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
              <div>
                {isEditingMode && (
                  <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Save all
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">
              General information
            </h3>
            <form onSubmit={(e) => e.preventDefault()} action="#">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    disabled={!isEditingMode}
                    value={firstName}
                    onChange={(e) =>
                      setFirstName(e.target.value)
                    }
                    type="text"
                    name="first-name"
                    id="first-name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Bonnie"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    disabled={!isEditingMode}
                    value={lastName}
                    onChange={(e) =>
                      setLastName(e.target.value)
                    }
                    type="text"
                    name="last-name"
                    id="last-name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Green"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <input
                    disabled={!isEditingMode}
                    onChange={(e) => {
                      const [country, city, district] =
                        e.target.value.split(",");
                      setAddress({
                        country,
                        city,
                        district,
                      });
                    }}
                    value={Object.values(address).join(",")}
                    type="text"
                    name="address"
                    id="address"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="e.g. California"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    disabled={!isEditingMode}
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    type="email"
                    name="email"
                    id="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="example@company.com"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="phone-number"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    disabled={!isEditingMode}
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    type="text"
                    name="phone-number"
                    id="phone-number"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="e.g. +(12)3456 789"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="birthday"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Birthday
                  </label>
                  <input
                    disabled={!isEditingMode}
                    value={birthday}
                    onChange={(e) =>
                      setBirthday(e.target.value)
                    }
                    type="date"
                    name="birthday"
                    id="birthday"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="15/08/1990"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="genders"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Gender
                  </label>
                  <select
                    disabled={!isEditingMode}
                    value={
                      gender === true ? "male" : "female"
                    }
                    onChange={(e) =>
                      setGender(e.target.value === "male")
                    }
                    id="genders"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option disabled defaultChecked>
                      Select a gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-full">
                  {isEditingMode && (
                    <button
                      onClick={handleSaveUserInfo}
                      className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      type="submit"
                    >
                      Save all
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">
              Password information
            </h3>
            <div>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="current-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Current password
                  </label>
                  <input
                    disabled={!isEditingMode}
                    value={currentPassword}
                    onChange={(e) =>
                      setCurrentPassword(e.target.value)
                    }
                    type="text"
                    name="current-password"
                    id="current-password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New password
                  </label>
                  <input
                    disabled={!isEditingMode}
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    data-popover-target="popover-password"
                    data-popover-placement="bottom"
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="••••••••"
                    required
                  />
                  <div
                    data-popover
                    id="popover-password"
                    role="tooltip"
                    className={`absolute z-10 -bottom-4 translate-y-full inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm ${isEditingMode
                      ? ""
                      : "invisible opacity-0"
                      } w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400`}
                  >
                    <div className="p-3 space-y-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Must have at least 6 characters
                      </h3>
                      <ul className="grid grid-cols-4 gap-2">
                        {Array.from(
                          {
                            length: getPasswordStrength(
                              password
                            ),
                          },
                          (i, idx) => (
                            <li
                              key={idx}
                              className="h-1 bg-orange-300 dark:bg-orange-400"
                            ></li>
                          )
                        )}
                        {Array.from(
                          {
                            length:
                              maxLevel -
                              getPasswordStrength(
                                password
                              ),
                          },
                          (_, idx) => (
                            <li
                              key={4 + idx}
                              className="h-1 bg-gray-200 dark:bg-gray-600"
                            ></li>
                          )
                        )}
                      </ul>
                      <p>It’s better to have:</p>
                      <ul>
                        <li className="flex items-center mb-1">
                          {isContainUpperLetter(
                            password
                          ) &&
                            isContainUpperLetter(
                              password
                            ) ? (
                            <svg
                              className="w-4 h-4 mr-2 text-green-400 dark:text-green-500"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          )}
                          Upper & lower case letters
                        </li>
                        <li className="flex items-center mb-1">
                          {isContainSpecialLetter(
                            password
                          ) ? (
                            <svg
                              className="w-4 h-4 mr-2 text-green-400 dark:text-green-500"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          )}
                          A symbol (#$&)
                        </li>
                        <li className="flex items-center">
                          {isContainNumber(
                            password
                          ) ? (
                            <svg
                              className="w-4 h-4 mr-2 text-green-400 dark:text-green-500"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          )}
                          A number (0-9)
                        </li>
                      </ul>
                    </div>
                    <div data-popper-arrow></div>
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    disabled={!isEditingMode}
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="••••••••"
                    required
                  />
                  <p
                    className={`${password === confirmPassword
                      ? "invisible"
                      : ""
                      } text-sm font-light text-red-500`}
                  >
                    Not matching the new password
                  </p>
                </div>

                <div className="col-span-6 sm:col-full">
                  {isEditingMode && (
                    <button
                      onClick={handlePasswordChange}
                      disabled={
                        password !== confirmPassword ||
                        getPasswordStrength(password) <
                        maxLevel
                      }
                      className={`${password !== confirmPassword ||
                        getPasswordStrength(password) <
                        maxLevel
                        ? "bg-gray-300"
                        : "bg-primary-700 hover:bg-primary-800"
                        } text-white  focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                    >
                      Save all
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="flow-root">
              <h3 className="text-xl font-semibold dark:text-white">
                Sessions
              </h3>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-6 h-6 dark:text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          stroke-linejoin="round"
                          strokeWidth="2"
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
                        California 123.123.123.123
                      </p>
                      <p className="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                        Chrome on macOS
                      </p>
                    </div>
                    <div className="inline-flex items-center">
                      <a
                        href="#"
                        className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Revoke
                      </a>
                    </div>
                  </div>
                </li>
                <li className="pt-4 pb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-6 h-6 dark:text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          stroke-linejoin="round"
                          strokeWidth="2"
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
                        Rome 24.456.355.98
                      </p>
                      <p className="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                        Safari on iPhone
                      </p>
                    </div>
                    <div className="inline-flex items-center">
                      <a
                        href="#"
                        className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Revoke
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
              <div>
                <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  See more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 px-4 xl:grid-cols-2 xl:gap-4">
        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 xl:mb-0">
          <div className="flow-root">
            <h3 className="text-xl font-semibold dark:text-white">
              Alerts & Notifications
            </h3>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              You can set up Themesberg to get notifications
            </p>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="flex items-center justify-between py-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    Company News
                  </div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Get Themesberg news, announcements, and
                    product updates
                  </div>
                </div>
                <label
                  htmlFor="company-news"
                  className="relative flex items-center cursor-pointer"
                >
                  <input
                    disabled={!isEditingMode}
                    type="checkbox"
                    id="company-news"
                    className="sr-only"
                  />
                  <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
              <div className="flex items-center justify-between py-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    Account Activity
                  </div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Get important notifications about you or
                    activity you&apos;ve missed
                  </div>
                </div>
                <label
                  htmlFor="account-activity"
                  className="relative flex items-center cursor-pointer"
                >
                  <input
                    disabled={!isEditingMode}
                    type="checkbox"
                    id="account-activity"
                    className="sr-only"
                    checked
                  />
                  <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
              <div className="flex items-center justify-between py-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    Meetups Near You
                  </div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Get an email when a Dribbble Meetup is
                    posted close to my location
                  </div>
                </div>
                <label
                  htmlFor="meetups"
                  className="relative flex items-center cursor-pointer"
                >
                  <input
                    disabled={!isEditingMode}
                    type="checkbox"
                    id="meetups"
                    className="sr-only"
                    checked
                  />
                  <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    New Messages
                  </div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Get Themsberg news, announcements, and
                    product updates
                  </div>
                </div>
                <label
                  htmlFor="new-messages"
                  className="relative flex items-center cursor-pointer"
                >
                  <input
                    disabled={!isEditingMode}
                    type="checkbox"
                    id="new-messages"
                    className="sr-only"
                  />
                  <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
            </div>
            <div className="mt-6">
              {isEditingMode && (
                <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Save all
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 xl:mb-0">
          <div className="flow-root">
            <h3 className="text-xl font-semibold dark:text-white">
              Email Notifications
            </h3>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              You can set up Themesberg to get email notifications{" "}
            </p>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="flex items-center justify-between py-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    Rating reminders
                  </div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Send an email reminding me to rate an
                    item a week after purchase
                  </div>
                </div>
                <label
                  htmlFor="rating-reminders"
                  className="relative flex items-center cursor-pointer"
                >
                  <input
                    disabled={!isEditingMode}
                    type="checkbox"
                    id="rating-reminders"
                    className="sr-only"
                  />
                  <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
              <div className="flex items-center justify-between py-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    Item update notifications
                  </div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Send user and product notifications for
                    you
                  </div>
                </div>
                <label
                  htmlFor="item-update"
                  className="relative flex items-center cursor-pointer"
                >
                  <input
                    disabled={!isEditingMode}
                    type="checkbox"
                    id="item-update"
                    className="sr-only"
                    checked
                  />
                  <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
              <div className="flex items-center justify-between py-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    Item comment notifications
                  </div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Send me an email when someone comments
                    on one of my items
                  </div>
                </div>
                <label
                  htmlFor="item-comment"
                  className="relative flex items-center cursor-pointer"
                >
                  <input
                    disabled={!isEditingMode}
                    type="checkbox"
                    id="item-comment"
                    className="sr-only"
                    checked
                  />
                  <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    Buyer review notifications
                  </div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Send me an email when someone leaves a
                    review with their rating
                  </div>
                </div>
                <label
                  htmlFor="buyer-rev"
                  className="relative flex items-center cursor-pointer"
                >
                  <input
                    disabled={!isEditingMode}
                    type="checkbox"
                    id="buyer-rev"
                    className="sr-only"
                  />
                  <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
            </div>
            <div className="mt-6">
              {isEditingMode && (
                <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Save all
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Toasts */}
      <div className="bottom-8 right-8 fixed z-30" >
        {isSuccessfulToastVisible && successfulToast}
        {isFailedToastVisible && failedToast}
      </div >
    </section>
  );
};

export default UserProfile;
