"use client";
import { useAppSelector } from "../_store/hooks";
import {
    useEmptyCartMutation,
    useGetCartQuery,
} from "../_store/services/productsApi";
import LineItem from "../_components/LineItem";
//



const CartPage = () => {
    const userId = useAppSelector((state) => state.user.info.id);
    const {
        data: cart,
        isLoading: isCartLoading,
        isFetching: isCartFetching,
        error: cartError,
    } = useGetCartQuery(userId);
    const [emptyCartTrigger, { isLoading, error, data }] =
        useEmptyCartMutation();
    //
    if (cartError) {
        return "Error!";
    }
    if (isCartLoading || isCartFetching) {
        return "Loading...";
    }
    //
    const products = cart?.lineItems || [];
    let sortedProducts = [...products].sort((a, b) => b.id - a.id);
    const emptycart = async () => {
        const response = await emptyCartTrigger(userId).unwrap();

        if (data?.statusCode === 200) {
            console.log(data?.message);
        } else {
            console.error(data?.message);
        }
    };

    // -------Total Product Incart and Total Price of cart
    const cartTotalQty = sortedProducts?.reduce((acc, i) => acc + i.quantity, 0);
    const cartTotalAmount = sortedProducts?.reduce(
        (acc, i) => acc + i.product.price * i.quantity,
        0
    );

    return (
        <div className="container mx-auto mt-10">
            <div className="flex shadow-md my-10">
                <div className=" bg-white px-1 py-3 w-3/4">
                    <div className="hidden h-full flex-1 flex-col space-y-8 p-5 md:flex">
                        <div className="flex flex-col h-screen">
                            <div className="flex-grow overflow-auto">
                                {sortedProducts?.length === 0 ? (
                                    <table className="bg-transparent cart-table mb-0">
                                        <tbody>
                                            <tr>
                                                <td colSpan={8}>
                                                    <div className="cart-empty">
                                                        <i className="fa fa-shopping-cart"></i>
                                                        <p>
                                                            Your Cart Is empty
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ) : (
                                    <table className="relative border">
                                        <thead>
                                            <tr>
                                                <th className="sticky top-0 px-6 py-3 text-white bg-black">
                                                    Product&nbsp;
                                                    <span className="text-base">{`${sortedProducts?.length} available`}</span>
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
                                                        onClick={() =>
                                                            emptycart()
                                                        }
                                                    >
                                                        <i className="fa fa-trash-alt"></i>
                                                    </button>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {/* <tbody className="absolute flex flex-col overflow-y-scroll" style={{height: '50vh'}}> */}
                                            {sortedProducts?.map((i) => (
                                                <tr key={i.id}>
                                                    <LineItem
                                                        lineItem={i}
                                                    />
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
                <div id="summary" className="w-2/4 px-8 py-10">
                    <h1 className="font-semibold text-2xl border-b pb-8">
                        Order Summary
                    </h1>
                    <div className="flex justify-between space-x-3 mt-10 mb-5">
                        <span className="font-semibold text-sm uppercase">
                            Subtotal (
                            <span className=" font-light">{cartTotalQty} </span>
                            items)
                        </span>
                        <span className="font-light text-sm">
                            {cartTotalAmount}$
                        </span>
                    </div>
                    <div className="flex justify-between mt-10 mb-5">
                        <span className="font-semibold text-sm uppercase">
                            Shipping & Handling
                        </span>
                        <span className="font-semibold text-sm">20$</span>
                    </div>
                    <div className="flex justify-between mt-10 mb-5">
                        <span className="font-semibold text-sm uppercase">
                            Sales Tax
                        </span>
                        <span className="font-semibold text-sm">5$</span>
                    </div>
                    <div className="border-t mt-8">
                        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                            <span>Grand Total</span>
                            <span>${cartTotalAmount || 0 + 20 + 5}</span>
                        </div>
                        <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CartPage;
