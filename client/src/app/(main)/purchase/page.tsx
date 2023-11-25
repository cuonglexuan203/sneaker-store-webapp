"use client";

import Link from "next/link";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import Product from "../_components/Product";

const selectedItems = [
  {
    id: 1,
    color: "BLUE",
    size: 44,
    quantity: 1,
    product: {
      id: 1,
      brand: "Nike",
      name: "Nike Air Max 1 SC Light Bone Violet Dust",
      ean: "FB9660-002",
      price: 126.5,
      releaseDate: "2022-11-09",
      categories: ["Men"],
      description:
        "This new rendition of Nike's classic Air Max 1 model showcases a neutral color scheme of cream, purple, and tan...",
      imageUrl: "/images/sneakers/1.png",
    },
  },
  {
    id: 2,
    color: "GREY",
    size: 45,
    quantity: 3,
    product: {
      id: 2,
      brand: "Nike",
      name: "Nike Air Max 97 Multi-Corduroy (Women's)",
      ean: "FB8454-300",
      price: 153.5,
      releaseDate: "2023-10-09",
      categories: ["Women"],
      description:
        "The Nike Air Max 97 is a running shoe that debuted in 1997...",
      imageUrl: "/images/sneakers/2.png",
    },
  },
  {
    id: 3,
    color: "BLACK",
    size: 40,
    quantity: 5,
    product: {
      id: 3,
      name: "Rivalry 86 Low 'Class of '86'",
      brand: "adidas",
      ean: "IE7160",
      price: 196.4,
      releaseDate: "2023-11-03",
      categories: ["Men"],
      description:
        "An iconic silhouette that gained traction in the mid-80's basketball scene, the Adidas Rivalry Low Consortium...",
      imageUrl: "/images/sneakers/8.png",
    },
  },
  {
    id: 4,
    color: "BLACK",
    size: 40,
    quantity: 5,
    product: {
      id: 3,
      name: "Air Jordan 5 Retro SE TD 'Midnight Navy'",
      brand: "Jordan",
      ean: "FN5454-400",
      price: 500,
      releaseDate: "2023-01-10",
      categories: ["Infant"],
      description:
        "Following in its predecessors' footsteps, the iconic Air Jordan 5 is joining in on the 'Craft' pack...",
      imageUrl: "/images/sneakers/5.png",
    },
  },
  {
    id: 5,
    color: "BLACK",
    size: 40,
    quantity: 1,
    product: {
      id: 3,
      name: "The Apartment x 576 Made in England 'Evergreen'",
      brand: "New Balance",
      ean: "OU576AME",
      price: 243.5,
      releaseDate: "2023-06-10",
      categories: ["Men"],
      description:
        "Following in its predecessors' footsteps, the iconic Air Jordan 6 is joining in on the 'Craft' pack...",
      imageUrl: "/images/sneakers/6.png",
    },
  },
];

const total = selectedItems.reduce((accumulator, item) => {
  return accumulator + item.product.price * item.quantity;
}, 0);

// Dummy handler for the confirm button
const handleConfirmClick = () => {
  console.log("Purchase confirmed");
  // Here, you would typically send the order details to your backend and navigate to a success page
};

let shipCost: number = 8.0;

const dummyShippingInfo = {
  address: "123 Main St",
  city: "Anytown",
  zip: "12345",
  country: "USA",
};

const dummyPaymentInfo = {
  email: "johnsnow@gmail.com",
  method: "Credit Card",
  cardNumber: "**** **** **** 1234", // Only display the last 4 digits for security
};

const Checkout = () => {
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);

  const handleConfirmClick = () => {
    console.log("Purchase confirmed");
    // Handle the purchase confirmation logic here
    setPurchaseConfirmed(true); // Update the state to indicate purchase is confirmed
  };

  if (purchaseConfirmed) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold py-4">Thank you for your order!</h1>
      </div>
    );
  }
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
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
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
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                    href="#"
                  >
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
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
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                    href="#"
                  >
                    3
                  </a>
                  <span className="font-semibold text-gray-900">
                    Confirm Purchase
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center py-4 sm:flex-row sm:justify-center lg:px-20 xl:px-32">
          <h1 className="text-2xl font-bold mb-4">Confirm Your Purchase</h1>
        </div>
        <div className="container mx-auto p-4">
          <div className="gap-4">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Shipping Information</h2>
              <span className="text-gray-700">{dummyShippingInfo.address}</span>
              <span className="text-gray-700">
                {dummyShippingInfo.city}, {dummyShippingInfo.zip},
              </span>
              <span className="text-gray-700">
                {" "}
                {dummyShippingInfo.country}
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold">Payment Method</h2>
              <p className="text-gray-700">Email: {dummyPaymentInfo.email}</p>
              <p className="text-gray-700">
                Card Method: {dummyPaymentInfo.method}
              </p>
              <p className="text-gray-700">
                Card Number: {dummyPaymentInfo.cardNumber}
              </p>
            </div>
            <div className="mb-6 py-2">
              <h2 className="text-xl font-semibold">Shipping Method</h2>
              <span className="mt-2 font-semibold">Fedex Delivery</span>
              <p className="text-slate-500 text-sm leading-6">
                Delivery: 2-4 Days
              </p>
            </div>
          </div>
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="mb-6">
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 overflow-y-auto max-h-96">
              {selectedItems.map((item, index) => (
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
            <h1 className="text-2xl font-semibold mb-4 py-4">
              Total: ${total.toFixed(2)}
            </h1>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-gray-900 text-white py-3 px-6 font-bold rounded hover:bg-gray-700"
              onClick={handleConfirmClick}
            >
              Confirm Purchase
            </button>
          </div>
        </div>
      </>
    </section>
  );
};

export default Checkout;
