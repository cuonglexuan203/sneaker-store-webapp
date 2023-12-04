"use client";
import React from "react";
import { useGetInvoicesQuery } from "../_store/services/productsApi";
import { useAppSelector, useAppDispatch } from "../_store/hooks";
import { UserInfo } from "../_store/features/userSlice";
import { IndexedLineItem } from "../_store/features/selectedItemsSlice";
import LineItem from "../_components/LineItem";
import { hideLoading, showLoading } from "../_store/features/statusSlice";
import { useSession } from "next-auth/react";
import { AuthRequiredError } from "../lib/exception";
import Image from "next/image";

const Orders = () => {
  const userInfo: UserInfo = useAppSelector((state) => state.user.info);
  const { data: session } = useSession();
  const {
    isLoading,
    isFetching,
    data: invoices,
    error,
    isSuccess,
  } = useGetInvoicesQuery(userInfo.id);

  const dispatch = useAppDispatch();
  //
  const isLogging = useAppSelector((state) => state.auth.isLogging);
  if (!session && !isLogging) {
    // dispatch action along with session changes here
    throw new AuthRequiredError();
  }
  //
  if (error) {
    console.error(error);
  } else if (isLoading) {
    dispatch(showLoading());
  } else if (isSuccess) {
    setInterval(() => {
      dispatch(hideLoading());
    }, 500);
  }

  const formatDateTime = (dateTimeString: string): string => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const [datePart, timePart] = dateTimeString.split(" ");
    const [dayStr, monthStr, yearStr] = datePart.split("::");
    const [hourStr, minuteStr, secondStr] = timePart.split("::");

    const month = monthNames.indexOf(monthStr); // Convert month name to month number
    const day = parseInt(dayStr, 10);
    const year = parseInt(yearStr, 10);
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const second = parseInt(secondStr, 10);

    // Create a Date object
    const date = new Date(year, month, day);
    date.setHours(hour, minute, second);

    // Format the date and time
    const formattedDate = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${formattedDate} at ${formattedTime}`;
  };

  let shipCost: number = 8.0;
  if (error) {
    return <div>Error!</div>;
  }
  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }
  if (!invoices || invoices.length === 0) {
    return (
      <div className="h-[50vh] text-center font-bold mt-16">
        No invoices available.
      </div>
    ); // Handling empty invoices
  }

  const sortedInvoices = invoices.slice().sort((a, b) => a.id - b.id);

  return (
    <section className="container mx-auto">
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <p className="text-3xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800 text-center">

          Customer Purchase History
        </p>

        {sortedInvoices.map((invoice, index) => {
          let invoiceSubtotal = 0;

          return (
            <div
              key={index}
              className="mt-8 w-full space-y-3 rounded-lg border px-2 py-4 sm:px-6 "
            >
              <div className="flex justify-start item-start space-y-2 flex-col">
                <h1 className="text-2xl dark:text-white lg:text-2xl font-semibold leading-7 lg:leading-9 text-gray-800">
                  Order #{invoice.id}
                </h1>
                <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
                  Time Oder: {formatDateTime(invoice.paymentTime)}
                </p>
              </div>
              <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <details className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                  <summary>
                    <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                      <div className="mt-8 w-full space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 overflow-y-auto max-h-96">
                        {invoice.lineItems.map((item, lineItemIndex) => {
                          const lineItemTotal =
                            item.product.price * item.quantity;
                          invoiceSubtotal += lineItemTotal; // Accumulate the subtotal

                          return (
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
                                <span className="font-semibold">
                                  {item.product.name}
                                </span>
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
                                    $
                                    {(
                                      item.product.price * item.quantity
                                    ).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </summary>
                  <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8 border ">
                    <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                      <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                        Summary
                      </h3>
                      <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                        <div className="flex justify-between w-full">
                          <p className="text-base dark:text-white leading-4 text-gray-800">
                            Subtotal
                          </p>
                          <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                            ${invoiceSubtotal.toFixed(2)}
                          </p>
                        </div>

                        <div className="flex justify-between items-center w-full">
                          <p className="text-base dark:text-white leading-4 text-gray-800">
                            Shipping
                          </p>
                          <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                            $8.00
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                          Total
                        </p>
                        <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                          ${(invoiceSubtotal + shipCost).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                      <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                        Shipping
                      </h3>
                      <div className="flex justify-between items-start w-full">
                        <div className="flex justify-center items-center space-x-4">
                          <div className="w-8 h-8">
                            <Image
                              width={0}
                              height={0}
                              sizes="100%"
                              className="w-full h-full"
                              alt="logo"
                              src="/images/orders/DHL.png"
                            />
                          </div>
                          <div className="flex flex-col justify-start items-center">
                            <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                              DHL Delivery
                              <br />
                              <span className="font-normal">
                                Delivery with 24 Hours
                              </span>
                            </p>
                          </div>
                        </div>
                        <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">
                          $8.00
                        </p>
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Orders;
