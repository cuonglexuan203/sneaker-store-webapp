import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { useGetCartQuery } from '../_store/services/productsApi';

const QuantityCart = ({ userId, isLogging }: { userId: number, isLogging: boolean }) => {

    const {
        data: cart,
        isLoading: isCartLoading,
        isFetching: isCartFetching,
        isSuccess: isCartSuccess,
        error: cartError,
    } = useGetCartQuery(userId);

    if (!isLogging) {
        return <FaShoppingCart className="h-6 w-6" />
    }

    if (cartError) {
        return <FaShoppingCart className="h-6 w-6" />
    }

    if (isCartLoading || isCartFetching) {
        return <FaShoppingCart className="h-6 w-6" />
    }
    //
    return (
        <i className="relative">
            <FaShoppingCart className="h-6 w-6" />
            {cart && cart.lineItems.length > 0 && <div className="font-semibold text-xs not-italic absolute flex items-center justify-center rounded-full p-2 -top-2 -right-2 w-4 h-4 bg-sky-500 text-white">{cart.lineItems.length}</div>}
        </i>
    )
}

export default QuantityCart