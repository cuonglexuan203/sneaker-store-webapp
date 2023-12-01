import { useEffect, useState } from "react";
import { IndexedLineItem } from "../_store/features/selectedItemsSlice";
import {
    useUpdateLineItemQuantityMutation,
    useRemoveFromCartMutation,
} from "../_store/services/productsApi";
import Image from "next/image";
import { useAppDispatch } from "../_store/hooks";
import { addLineItem, removeLineItem } from "../_store/features/selectedItemsSlice";
import { hideLoading, showLoading } from "../_store/features/statusSlice";

const LineItem = ({ lineItem, isChecked: isCheckedAll }: { lineItem: IndexedLineItem, isChecked: boolean }) => {
    const [quantity, setQuantity] = useState(lineItem.quantity);
    const [isChecked, setIsChecked] = useState(isCheckedAll);
    const [updateQuantityTrigger, { isLoading, error, data, isSuccess }] =
        useUpdateLineItemQuantityMutation();
    const [
        removeLineItemTrigger,
        { isLoading: isRemoving, error: removeError, data: removeData, isSuccess: isRemoveSuccess },
    ] = useRemoveFromCartMutation();
    //
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isChecked) {
            dispatch(addLineItem(lineItem));
        }
        else {
            dispatch(removeLineItem(lineItem));
        }
    }, [isChecked])
    //


    const product = lineItem.product;
    const handleUpdateQuantity = (num: number) => {
        updateQuantityTrigger({
            lineItemId: lineItem.id,
            quantity: num,
        }).unwrap()
            .then(payload => {
                console.log(payload.statusCode, payload.message);
            })
            .catch(err => {
                console.error(err);
                setQuantity(q => q - 1);
            });
        setQuantity(num);
    };
    const handleIncreaseQuantity = () => {
        const num = quantity + 1;
        handleUpdateQuantity(num);
    };
    const handleDecreaseQuantity = () => {
        const num = quantity - 1;
        if (num > 0) {
            handleUpdateQuantity(num);
        }
    };
    const handleRemoveFromCart = () => {
        removeLineItemTrigger(lineItem.id).unwrap();
        if (removeData?.statusCode === 200) {
            console.log(removeData.message);
        } else {
            console.error(removeData?.message);
        }
    };
    //


    return (
        <>
            <td className="px-3">
                <input type="checkbox" className="form-checkbox rounded bg-gray-300 border-none text-pink-500 focus:ring-0 focus:border-none w-4 h-4" checked={isChecked || isCheckedAll} onChange={(e) => { setIsChecked(e.target.checked) }} />
            </td>
            <td className="px-6 py-4">
                <div className="w-full h-full">
                    <Image sizes="100%" width={0} height={0} className="w-full block rounded-xl" src={product.imageUrl} alt="sneaker image" />
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="product-name line-clamp-4">
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
            <td className="px-6 py-4 font-semibold">
                $
                {lineItem.quantity * product.price}
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
