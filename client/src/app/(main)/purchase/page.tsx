"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAppSelector } from "../_store/hooks";
import { IndexedLineItem, LineItem } from "../_store/features/selectedItemsSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { Address } from "../_utils/types";
import { PurchaseRequestBody, RemoveManyFromCartRequestBody, usePurchaseMutation, useRemoveFromCartMutation, useRemoveManyFromCartMutation } from "../_store/services/productsApi";
import { UserInfo } from "../_store/features/userSlice";

// Dummy handler for the confirm button
const handleConfirmClick = () => {
  console.log("Purchase confirmed");
  // Here, you would typically send the order details to your backend and navigate to a success page
};

let shipCost: number = 8.0;


const Checkout = () => {
  const selectedItems: IndexedLineItem[] = useAppSelector((state) => state.tempCart.lineItems);
  const userInfo: UserInfo = useAppSelector((state) => state.user.info);
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  //
  const [removeManyTrigger, { isLoading, error, data }] =
    useRemoveManyFromCartMutation();
  const [purchaseTrigger, { isLoading: isPurchasing, error: purchaseError, data: puchaseData }] = usePurchaseMutation();
  //
  const creditCardNumber = searchParams.get("creditCardNumber");
  const shippingEmail = searchParams.get("shippingEmail");
  const cardHolder = searchParams.get("cardHolder");
  const addressStr = searchParams.get("address");
  const [country, city, district] = addressStr!.split(',');
  const address = { country, city, district }

  //
  const isValidAddress = (aressStr: string) => {
    if (aressStr) {
      const [country, city, district] = aressStr.split(",");
      const aress: Address = { country, city, district };
      //
      if (aress) {
        if (aress.country && aress.city && aress.district) {
          if (aress.country.trim() === "" || aress.city.trim() === "" || aress.district.trim() === "") {
            return false;
          }
          return true;
        }
      }
    }

    return false;
  }
  const isValidEmail = (email: string) => {
    return email && email.trim() !== "" && email.includes("@") && email.includes(".");
  }
  const isValidCheckoutInfo = (creditCardNumber?.length || 0 > 0) && isValidEmail(shippingEmail as string) && (cardHolder?.length || 0 > 0) && isValidAddress(addressStr as string);
  //
  if (!isValidCheckoutInfo || selectedItems.length <= 0) {
    router.replace("/");
    return <div className="min-h-screen"></div>
  }
  //
  const total = selectedItems.reduce((accumulator: number, item: LineItem) => {
    return accumulator + item.product.price * item.quantity;
  }, 0);
  const handleConfirmClick = async () => {
    const answer = confirm("Are you sure you want to purchase?");
    if (answer) {
      // Remove purchased line items in cart by client
      // const deleteManyBody: RemoveManyFromCartRequestBody = {
      //   lineItemIds: selectedItems.map(i => i.id)
      // };
      // if (deleteManyBody.lineItemIds.length > 0) {
      //   await removeManyTrigger(deleteManyBody).unwrap();
      //   setPurchaseConfirmed(true);
      // }
      //
      const purchaseBody: PurchaseRequestBody = {
        lineItems: selectedItems,
        creditCardNumber: creditCardNumber!,
        shippingEmail: shippingEmail!,
        cardHolder: cardHolder!,
        address,
        userId: userInfo.id,
      }
      await purchaseTrigger(purchaseBody).unwrap();
      //
      if (purchaseError) {
        console.error(purchaseError);
      }
      else if (isPurchasing) {
        console.log("Purchasing...");
      }
      //
      setPurchaseConfirmed(true);
    }
  };
  //
  if (selectedItems == null || selectedItems.length <= 0) {
    router.replace("/");
    return <div className="min-h-screen"></div>;
  }
  //

  if (purchaseConfirmed) {
    return (
      <div className="container mx-auto p-4 text-center min-h-[60vh]">
        <h1 className="text-2xl font-bold py-4">Thank you for your order!</h1>
        <div className="flex justify-center">
          <button
            className="bg-gray-900 text-white py-3 px-6 font-bold rounded hover:bg-gray-700"
            onClick={() => router.push("/")}
          >
            Continue Shopping
          </button>
        </div>
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
              <span className="text-gray-700">
                {addressStr}
              </span>
              <span className="text-gray-700">
                {" "}
                {addressStr}
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold">Payment Method</h2>
              <p className="text-gray-700">Email: {shippingEmail}</p>
              <p className="text-gray-700">Card Method: Credit Card</p>
              <p className="text-gray-700">
                Card Number: {creditCardNumber}
              </p>
            </div>
            <div className="mb-6 py-2">
              <h2 className="text-xl font-semibold">Shipping Method</h2>
              <span className="mt-2 text-gray-500">Fedex Delivery</span>
              <p className="text-slate-500 text-sm leading-6">
                Delivery: 2-4 Days
              </p>
            </div>
          </div>
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="mb-6">
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 overflow-y-auto max-h-96">
              {selectedItems.map((item: LineItem, index: number) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center rounded-lg bg-white"
                >
                  <div className="m-2 h-24 w-28 flex-shrink-0">
                    <Image
                      width={0}
                      height={0}
                      sizes="100%"
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
              Total: ${(total + shipCost).toFixed(2)}
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
