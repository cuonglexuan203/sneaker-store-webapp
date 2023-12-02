"use client";
import { useAppSelector } from "../_store/hooks";
import {
  useEmptyCartMutation,
  useGetCartQuery,
} from "../_store/services/productsApi";
import LineItem from "../_components/LineItem";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../_store/hooks";
import {
  updateSelectedItems,
  clearSelectedItems,
  SelectedItems,
} from "../_store/features/selectedItemsSlice";
import { redirect, useRouter } from "next/navigation";
import { hideLoading, showLoading } from "../_store/features/statusSlice";
import { useSession } from "next-auth/react";
import { AuthRequiredError } from "../lib/exception";
//

const CartPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const userId = useAppSelector((state) => state.user.info.id);
  const selectedItems: SelectedItems = useAppSelector(
    (state) => state.tempCart
  );
  const {
    data: cart,
    isLoading: isCartLoading,
    isFetching: isCartFetching,
    isSuccess: isCartSuccess,
    error: cartError,
  } = useGetCartQuery(userId);
  const [emptyCartTrigger, { isLoading, error, data, isSuccess }] =
    useEmptyCartMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  //
  const { data: session, status } = useSession();
  const isLogging = useAppSelector((state) => state.auth.isLogging);
  if (!session && !isLogging) {
    // dispatch action along with session changes here
    throw new AuthRequiredError();
  }
  //
  const products = cart?.lineItems || [];
  let sortedProducts = [...products].sort((a, b) => b.id - a.id);
  //
  useEffect(() => {
    if (isChecked) {
      dispatch(
        updateSelectedItems({
          lineItems: sortedProducts,
        })
      );
    } else {
      dispatch(clearSelectedItems());
    }
  }, [isChecked]);
  //
  if (cartError) {
    return "Error!";
  }
  if (isCartLoading || isCartFetching || isLoading) {
    dispatch(showLoading());
  } else if (isCartSuccess || isSuccess) {
    setInterval(() => {
      dispatch(hideLoading());
    }, 500);
  }
  //
  const emptycart = async () => {
    const response = await emptyCartTrigger(userId).unwrap();

    if (data?.statusCode === 200) {
      console.log(data?.message);
    } else {
      console.error(data?.message);
    }
  };
  const shippingPrice = sortedProducts.length > 0 ? 8 : 0;
  const tax = sortedProducts.length > 0 ? 5 : 0;
  // -------Total Product Incart and Total Price of cart
  const cartTotalQty = sortedProducts?.reduce((acc, i) => acc + i.quantity, 0);
  const cartTotalAmount =
    sortedProducts?.reduce((acc, i) => acc + i.product.price * i.quantity, 0) ||
    0;

  return (
    <div className="container mx-auto mt-10 rounded-xl">
      <div className="grid grid-col-1 lg:flex gap-2 my-10 rounded-xl">
        <div className=" bg-white w-screen py-3 md:w-3/4">
          <div className="h-full flex-1 flex-col px-2 space-y-8 md:flex rounded-xl">
            <div className="flex flex-col md:h-screen rounded-xl">
              <div className="flex-grow overflow-auto rounded-xl">
                {sortedProducts?.length === 0 ? (
                  <table className="bg-transparent cart-table mb-0 flex items-center justify-center">
                    <tbody>
                      <tr>
                        <td colSpan={8}>
                          <div className="cart-empty">
                            <i className="fa fa-shopping-cart"></i>
                            <p className="capitalize select-none">
                              Your Cart is empty!
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <table className="relative border">
                    <thead>
                      <tr className="text-left">
                        <th className="sticky top-0 px-3 py-3 text-white bg-black">
                          <input
                            type="checkbox"
                            className="form-checkbox rounded border-none text-pink-500 focus:ring-0 focus:border-none w-4 h-4"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                          />
                        </th>
                        <th className="sticky top-0 px-6 py-3 text-white bg-black">
                          Product&nbsp;(&nbsp;
                          <span className="text-base">{`${sortedProducts?.length} available`}</span>
                          )
                        </th>
                        <th className="sticky top-0 px-6 py-3 text-white bg-black">
                          Name
                        </th>
                        <th className="sticky top-0 px-6 py-3 text-white bg-black">
                          Size
                        </th>
                        <th className="sticky top-0 px-6 py-3 text-white bg-black">
                          Color
                        </th>
                        <th className="sticky top-0 px-6 py-3 text-white bg-black">
                          Price
                        </th>
                        <th className="sticky top-0 px-6 py-3 text-white bg-black">
                          Quanity
                        </th>
                        <th className="text-center sticky top-0 px-6 py-3 text-white bg-black">
                          <span
                            id="amount"
                            className="amount text-white bg-black"
                          >
                            Total Amount
                          </span>
                        </th>
                        <th className="sticky top-0 px-6 py-3 bg-black">
                          <button
                            className=" w-10 h-10 text-[15px] border-[none] inline-block select-none border font-normal whitespace-no-wrap rounded  no-underline bg-red-600 text-white hover:bg-red-700 mt-0 py-2 px-2 leading-tight text-xs "
                            onClick={() => emptycart()}
                          >
                            <i className="fa fa-trash-alt"></i>
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {sortedProducts?.map((i) => (
                        <tr key={i.id}>
                          <LineItem isChecked={isChecked} lineItem={i} />
                        </tr>
                      ))}
                    </tbody>

                    <tfoot></tfoot>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
        <div id="summary" className="flex-1 px-2 py-3">
          <h1 className="font-bold text-2xl border-b pb-8">Order Summary</h1>
          <div className="flex justify-between space-x-3 mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              Subtotal (
              <span className="font-bold text-blue-500">{cartTotalQty} </span>
              items)
            </span>
            <span className="font-medium text-sm">
              ${cartTotalAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              Shipping & Handling
            </span>
            <span className="font-semibold text-sm">
              ${shippingPrice.toFixed(2)}
            </span>
          </div>

          <div className="border-t mt-8">
            <div className="flex font-bold items-end justify-between py-4 text-sm uppercase">
              <span>Grand Total</span>
              <span className="text-2xl">
                ${(cartTotalAmount + shippingPrice).toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => {
                router.push("/checkout");
              }}
              disabled={selectedItems.lineItems.length <= 0}
              className={`text-center block w-full rounded-xl font-semibold ${selectedItems.lineItems?.length <= 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-500  hover:bg-indigo-600"
                } py-3 text-sm text-white uppercase`}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
