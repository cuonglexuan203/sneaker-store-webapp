"use client"
import { useState } from "react";

interface LineItemTableProps {
  data:any,
  
}

export function LineItemTable({data}:LineItemTableProps){
    const [products, SetProducts] = useState(data);
    // -----Increment Event------
    const increaseQuantity = (i: any) => {
        SetProducts((preValue: any[]) =>
            preValue.map((data, o) => {
                if (i === o) {
                     return { ...data, quantity: data.quantity + 1 };
                }
                console.log(data.quantity)
                return data;
            })
        );
    };

    // -----Decrement Event------
    const decreaseQuantity = (i: number) => {
        SetProducts((preValue: any[]) =>
            preValue.map((data, o) => {
                if (i === o) {
                    if (data.quantity > 1) {
                        return { ...data, quantity: data.quantity - 1 };
                    } else {
                        return data;
                    }
                }
                return data;
            })
        );
    };



    // -----Remove Event------
    const removeFromCart = (i: any) => {
        if (window.confirm("Are you sure you want to remove into your cart?")) {
            SetProducts((prevCart: any[]) =>
                prevCart.filter((item, o) => {
                    return i !== o;
                })
            );
           
        } else {
            // alert('No');
        }
    };


    // -empty-cart--------
    const emptycart = () => {
        if (window.confirm("Remove all items into your cart?")) {
            SetProducts([]);
        } else {
            // alert('No');
        }
    }

    // -------Total Product Incart and Total Price of cart
    const cartTotalQty = products.reduce((acc: number, data: { quantity: any; }) => acc + data.quantity, 0);
    const cartTotalAmount = products.reduce((acc: number, data: { product: any; quantity: any; }) => acc + data.product.price * data.quantity, 0);
    
    // ------Hancle quanity change

      const handleQuantityChange = (i: number,e: Event | undefined) => {
        SetProducts((preValue: any[]) =>
            preValue.map((data, o) => {
                if (i === o) {
                    console.log(e.target.value)
                    if (data.quanity > -1) {
                        return { ...data, quantity: Number(e.target.value)};
                    } else {
                        return data;
                    }
                }
                return data;
            })
        );
    };

   
    return(
            <div className="container mx-auto mt-10">
    <div className="flex shadow-md my-10">
      <div className=" bg-white px-1 py-3 w-3/4">
        <div className="hidden h-full flex-1 flex-col space-y-8 p-5 md:flex">
                <div className="flex flex-col h-screen">
                                    <div className="flex-grow overflow-auto">
                                {
                                    products.length === 0 ? 
                                    <table className="mb-4 bg-transparent cart-table mb-0">
                                        <tbody>
                                            <tr>
                                                <td colSpan={8}>
                                                    <div className="cart-empty">
                                                        <i className="fa fa-shopping-cart"></i>
                                                        <p>Your Cart Is empty</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table> :
                                        <table className="relative border">
                                            <thead>
                                                <tr>
                                                    <th className="sticky top-0 px-6 py-3 text-white bg-black">Product ({products.length > 0 ? `${products.length} available` : ''})</th>
                                                    <th className="sticky top-0 px-6 py-3 text-white bg-black">Name</th>
                                                    <th className="sticky top-0 px-6 py-3 text-white bg-black">Size</th>
                                                    <th className="sticky top-0 px-6 py-3 text-white bg-black">Color</th>
                                                    <th className="sticky top-0 px-6 py-3 text-white bg-black">Price</th>
                                                    <th className="sticky top-0 px-6 py-3 text-white bg-black">Quanity</th>
                                                    <th className="text-center sticky top-0 px-6 py-3 text-white bg-black"><span id="amount" className="amount text-white bg-black">Total Amount</span></th>
                                                    <th className="sticky top-0 px-6 py-3 bg-black">{products.length > 0 ? <button className=" w-10 h-10 rounded text-[15px] border-[none] inline-block select-none border font-normal whitespace-no-wrap rounded  no-underline bg-red-600 text-white hover:bg-red-700 mt-0 py-2 px-2 leading-tight text-xs " onClick={() => emptycart()}><i className="fa fa-trash-alt"></i></button> : ''}</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y">
                                            {/* <tbody className="absolute flex flex-col overflow-y-scroll" style={{height: '50vh'}}> */}
                                                {
                                                    products.map((data, index) => {
                                                       // const { id, image, name, price, qty } = data;
                                                        const { id, color, size, quantity, product } = data; 
                                                        return (
                                                            <tr key={index}>
                                                                <td className="px-6 py-4"><div className="product-img"><img src={product.imageUrl} alt="" /></div></td>
                                                                <td className="px-6 py-4"><div className="product-name"><p>{product.name}</p></div></td>
                                                                <td className="px-6 py-4"><div className="product-size"><p>{size}</p></div></td>
                                                                <td className="px-6 py-4"><div className="product-color"><p>{color}</p></div></td>
                                                                <td className="px-6 py-4"><div className="product-price">${Number(product.price)}</div></td>
                                                                <td>
                                                                    <div className="prdct-qty-container">
                                                                        <button className="prdct-qty-btn" type="button" onClick={() => decreaseQuantity(index)}>
                                                                            <i className="fa fa-minus"></i>
                                                                        </button>
                                                                        <input type="text" onChange={()=> handleQuantityChange(index,event)} name="qty" className="qty-input-box" value={quantity}  />
                                                                        <button className="prdct-qty-btn" type="button" onClick={() => increaseQuantity(index)}>
                                                                            <i className="fa fa-plus"></i>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                                <td className="text-justify px-6 py-4">${(Number(quantity) * Number(product.price)).toFixed(0)}</td>
                                                                <td className="px-6 py-4"><button className="prdct-delete" onClick={() => removeFromCart(index)}><i className="fa fa-trash-alt"></i></button></td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                            
                                            <tfoot>
                                            </tfoot>
                                        </table>
                                }
                            </div>
                        </div>
          </div>
      </div>
      <div id="summary" className="w-2/4 px-8 py-10">
        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
        <div className="flex justify-between space-x-3 mt-10 mb-5">
          <span className="font-semibold text-sm uppercase">Subtotal (<span className=" font-light">{cartTotalQty} </span>items)</span>
          <span className="font-light text-sm">{cartTotalAmount}$</span>
        </div>
        <div className="flex justify-between mt-10 mb-5">
          <span className="font-semibold text-sm uppercase">Shipping & Handling</span>
          <span className="font-semibold text-sm">20$</span>
        </div>
        <div className="flex justify-between mt-10 mb-5">
          <span className="font-semibold text-sm uppercase">Sales Tax</span>
          <span className="font-semibold text-sm">5$</span>
        </div>
        <div className="border-t mt-8">
          <div className="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Grand Total</span>
            <span>${cartTotalAmount + 20 + 5}</span>
          </div>
          <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
        </div>
      </div>
    </div>
    </div>
)};