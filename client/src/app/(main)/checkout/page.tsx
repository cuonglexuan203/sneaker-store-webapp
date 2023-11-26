"use client";

import Link from "next/link";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import Product from "../_components/Product";
import { LineItem } from "../_store/features/selectedItemsSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../_store/hooks";
import { updateUser } from "../_store/features/userSlice";

// const selectedItems = [
//     {
//         id: 1,
//         color: "BLUE",
//         size: 44,
//         quantity: 1,
//         product: {
//             id: 1,
//             brand: "Nike",
//             name: "Nike Air Max 1 SC Light Bone Violet Dust",
//             ean: "FB9660-002",
//             price: 126.5,
//             releaseDate: "2022-11-09",
//             categories: ["Men"],
//             description:
//                 "This new rendition of Nike's classic Air Max 1 model showcases a neutral color scheme of cream, purple, and tan...",
//             imageUrl: "/images/sneakers/1.png",
//         },
//     },
//     {
//         id: 2,
//         color: "GREY",
//         size: 45,
//         quantity: 3,
//         product: {
//             id: 2,
//             brand: "Nike",
//             name: "Nike Air Max 97 Multi-Corduroy (Women's)",
//             ean: "FB8454-300",
//             price: 153.5,
//             releaseDate: "2023-10-09",
//             categories: ["Women"],
//             description:
//                 "The Nike Air Max 97 is a running shoe that debuted in 1997...",
//             imageUrl: "/images/sneakers/2.png",
//         },
//     },
//     {
//         id: 3,
//         color: "BLACK",
//         size: 40,
//         quantity: 5,
//         product: {
//             id: 3,
//             name: "Rivalry 86 Low 'Class of '86'",
//             brand: "adidas",
//             ean: "IE7160",
//             price: 196.4,
//             releaseDate: "2023-11-03",
//             categories: ["Men"],
//             description:
//                 "An iconic silhouette that gained traction in the mid-80's basketball scene, the Adidas Rivalry Low Consortium...",
//             imageUrl: "/images/sneakers/8.png",
//         },
//     },
//     {
//         id: 4,
//         color: "BLACK",
//         size: 40,
//         quantity: 5,
//         product: {
//             id: 3,
//             name: "Air Jordan 5 Retro SE TD 'Midnight Navy'",
//             brand: "Jordan",
//             ean: "FN5454-400",
//             price: 500,
//             releaseDate: "2023-01-10",
//             categories: ["Infant"],
//             description:
//                 "Following in its predecessors' footsteps, the iconic Air Jordan 5 is joining in on the 'Craft' pack...",
//             imageUrl: "/images/sneakers/5.png",
//         },
//     },
//     {
//         id: 5,
//         color: "BLACK",
//         size: 40,
//         quantity: 1,
//         product: {
//             id: 3,
//             name: "The Apartment x 576 Made in England 'Evergreen'",
//             brand: "New Balance",
//             ean: "OU576AME",
//             price: 243.5,
//             releaseDate: "2023-06-10",
//             categories: ["Men"],
//             description:
//                 "Following in its predecessors' footsteps, the iconic Air Jordan 6 is joining in on the 'Craft' pack...",
//             imageUrl: "/images/sneakers/6.png",
//         },
//     },
// ];

let shipCost: number = 8.0;

const Checkout = () => {
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.info);
  const selectedItems = useAppSelector((state) => state.tempCart.lineItems);
  const total = selectedItems.reduce((accumulator: number, item: LineItem) => {
    return accumulator + item.product.price * item.quantity;
  }, 0);
  const router = useRouter();
  return (
    <section>
      <>
        <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:justify-center lg:px-20 xl:px-32">
          <div className="py-2 text-xs sm:text-base">
            <div className="relative">
              <ul className="flex items-center justify-center space-x-2 sm:space-x-4">
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </a>
                  <span className="font-semibold text-gray-900">Shop</span>
                </li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                    href="#"
                  >
                    2
                  </a>
                  <span className="font-semibold text-gray-900">
                    Payment & Shipping
                  </span>
                </li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                    href="#"
                  >
                    3
                  </a>
                  <span className="font-semibold text-gray-500">
                    Confirm Purchase
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">
              Check your items. And select a suitable shipping method.
            </p>
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 overflow-y-auto max-h-96">
              {selectedItems.map((item: LineItem, index: number) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center rounded-lg bg-white"
                >
                  <div className="m-2 h-24 w-28 flex-shrink-0">
                    <img
                      className="h-full object-contain w-full rounded-md border"
                      src={item.product.imageUrl}
                      alt={item.product.name}
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-4 py-2">
                    <span className="font-semibold">{item.product.name}</span>
                    <div className="mt-1 flex space-x-4">
                      <span className="flex-1 text-sm text-gray-400">
                        Size: {item.size}
                      </span>
                      <span className="flex-1 text-sm text-gray-400">
                        Color: {item.color}
                      </span>
                      <span className="flex-1 text-sm text-gray-400">
                        Quantity: {item.quantity}
                      </span>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-md font-bold text-gray-500">
                        ${item.product.price.toFixed(2)}
                      </p>
                      <p className="text-lg font-bold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-lg font-medium">Shipping Methods</p>
            <form className="mt-5 grid gap-6">
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_1"
                  type="radio"
                  name="radio"
                  defaultChecked={true}
                />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
                <label
                  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_1"
                >
                  <img
                    className="w-14 object-contain"
                    src="/images/naorrAeygcJzX0SyNI4Y0.png"
                    alt=""
                  />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">DHL Delivery</span>
                    <p className="text-slate-500 text-sm leading-6">
                      Delivery: 2-4 Days
                    </p>
                  </div>
                </label>
              </div>
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_2"
                  type="radio"
                  name="radio"
                  defaultChecked={false}
                />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
                <label
                  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_2"
                >
                  <img
                    className="w-14 object-contain"
                    src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                    alt=""
                  />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Fedex Delivery</span>
                    <p className="text-slate-500 text-sm leading-6">
                      Delivery: 2-4 Days
                    </p>
                  </div>
                </label>
              </div>
            </form>
          </div>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">
              Complete your order by providing your payment details.
            </p>
            <div className="">
              <label
                htmlFor="email"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@gmail.com"
                  value={user.email}
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>
              <label
                htmlFor="card-holder"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Card Holder
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="card-holder"
                  name="card-holder"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your full name here"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                    />
                  </svg>
                </div>
              </div>
              <label
                htmlFor="card-no"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Card Details
              </label>
              <div className="flex">
                <div className="relative w-7/12 flex-shrink-0">
                  <input
                    type="text"
                    id="card-no"
                    name="card-no"
                    className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    value={creditCardNumber}
                    onChange={(e) => {
                      setCreditCardNumber(e.target.value);
                    }}
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg
                      className="h-4 w-4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                      <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                    </svg>
                  </div>
                </div>
                <input
                  type="text"
                  name="credit-expiry"
                  className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="MM/YY"
                />
                <input
                  type="text"
                  name="credit-cvc"
                  className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="CVC"
                />
              </div>
              <label
                htmlFor="billing-address"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Billing Address
              </label>
              <div className="flex flex-col sm:flex-row">
                <div className="relative flex-shrink-0 sm:w-7/12">
                  <input
                    type="text"
                    id="billing-address"
                    name="billing-address"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Street Address"
                    value={
                      user.address.district +
                      " " +
                      user.address.city +
                      " " +
                      user.address.country
                    }
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <img
                      className="h-4 w-4 object-contain"
                      src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                      alt=""
                    />
                  </div>
                </div>
                <select
                  name="billing-state"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="State">State</option>
                </select>
                <input
                  type="text"
                  name="billing-zip"
                  className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="ZIP"
                />
              </div>
              {/* Total */}
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="font-semibold text-gray-900">
                    ${total.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Shipping</p>
                  <p className="font-semibold text-gray-900">
                    ${shipCost.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${(total + shipCost).toFixed(2)}
                </p>
              </div>
            </div>
            <button
              className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
              onClick={() => {
                dispatch(updateUser({ ...user, creditCardNumber }));
                router.push("/purchase");
              }}
            >
              Place Order
            </button>
          </div>
        </div>
      </>
    </section>
  );
};

export default Checkout;
