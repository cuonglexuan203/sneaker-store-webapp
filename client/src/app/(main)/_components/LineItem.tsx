import { useState } from "react";
import { IndexedLineItem } from "../_store/features/selectedItemsSlice";
import {
    useUpdateLineItemQuantityMutation,
    useRemoveFromCartMutation,
} from "../_store/services/productsApi";

const LineItem = ({ lineItem }: { lineItem: IndexedLineItem }) => {
    const [quantity, setQuantity] = useState(lineItem.quantity);
    const [updateQuantityTrigger, { isLoading, error, data }] =
        useUpdateLineItemQuantityMutation();
    const [
        removeLineItemTrigger,
        { isLoading: isRemoveLoading, error: removeError, data: removeData },
    ] = useRemoveFromCartMutation();
    //
    const product = lineItem.product;
    const handleUpdateQuantity = async (num: number) => {
        const response = await updateQuantityTrigger({
            lineItemId: lineItem.id,
            quantity: num,
        }).unwrap();
        if (data?.statusCode === 200) {
            setQuantity(num);
            console.log(data.message);
        } else {
            console.error(data?.message);
        }
    };
    const handleIncreaseQuantity = async () => {
        const num = quantity + 1;
        await handleUpdateQuantity(num);
    };
    const handleDecreaseQuantity = async () => {
        const num = quantity - 1;
        if (num > 0) {
            await handleUpdateQuantity(num);
        }
    };
    const handleRemoveFromCart = async () => {
        const response = await removeLineItemTrigger(lineItem.id).unwrap();
        if (removeData?.statusCode === 200) {
            console.log(removeData.message);
        } else {
            console.error(removeData?.message);
        }
    };
    //
    return (
        <>
            <td className="px-6 py-4">
                <div className="product-img">
                    <img src={product.imageUrl} alt="" />
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="product-name">
                    <p>{product.name}</p>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="product-size">
                    <p>{lineItem.size}</p>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="product-color">
                    <p>{lineItem.color}</p>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="product-price">${Number(product.price)}</div>
            </td>
            <td>
                <div className="prdct-qty-container">
                    <button
                        className="prdct-qty-btn"
                        type="button"
                        onClick={handleDecreaseQuantity}
                    >
                        <i className="fa fa-minus"></i>
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                            handleUpdateQuantity(parseInt(e.target.value))
                        }
                        name="qty"
                        className="qty-input-box"
                    />
                    <button
                        className="prdct-qty-btn"
                        type="button"
                        onClick={handleIncreaseQuantity}
                    >
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
            </td>
            <td className="text-justify px-6 py-4">
                $
                {(Number(lineItem.quantity) * Number(product.price)).toFixed(0)}
            </td>
            <td className="px-6 py-4">
                <button className="prdct-delete" onClick={handleRemoveFromCart}>
                    <i className="fa fa-trash-alt"></i>
                </button>
            </td>
        </>
    );
};

export default LineItem;
