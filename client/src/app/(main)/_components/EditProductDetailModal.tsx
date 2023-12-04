import { useState } from "react";
import { ModalData } from "../admin/page";
import { UpdateAdminProductRequestBody, useUpdateAdminProductMutation } from "../_store/services/productsApi";

const EditProductDetailModal = ({ modalData, closeModal }: { modalData: ModalData, closeModal: () => void }) => {
    const product = modalData.product;
    const productInventory = modalData.productInventory;


    const [name, setName] = useState(product.name);
    const [brand, setBrand] = useState(product.brand);
    const [ean, setEan] = useState(product.ean);
    const [price, setPrice] = useState(product.price);
    const [releaseDate, setReleaseDate] = useState(
        product.releaseDate
    );
    const [categoriesString, setCategoriesString] = useState(
        product.categories.join(", ")
    );
    const [description, setDescription] = useState(
        product.description
    );
    const [imageURL, setImageURL] = useState(product.imageUrl);
    const [size, setSize] = useState(productInventory.size);
    const [color, setColor] = useState(productInventory.color);
    const [quantity, setQuantity] = useState(productInventory.productAmount);
    //
    const [updateTrigger, { error, isSuccess }] = useUpdateAdminProductMutation();

    const isFormComplete = () => {
        return (
            name.trim() !== "" &&
            brand.trim() !== "" &&
            ean.trim() !== "" &&
            price !== 0 &&
            description.trim() !== "" &&
            imageURL.trim() !== "" &&
            releaseDate.trim() !== "" &&
            categoriesString.length > 0 &&
            quantity >= 0
        );
    };

    const handleEditSubmit = async () => {
        const result = confirm("Are you sure you want to submit this product?");
        if (result) {
            const requestBody: UpdateAdminProductRequestBody = {
                product: {
                    id: product.id,
                    name,
                    brand,
                    ean,
                    price,
                    description,
                    imageUrl: imageURL,
                    releaseDate,
                    categories: categoriesString.split(", "),
                },
                productInventoryId: productInventory.id,
                productInventoryQty: quantity
            }
            await updateTrigger(requestBody).unwrap();
            //
            if (error) {
                throw new Error("Update Product Inventory failed");
            }
            else if (isSuccess) {
                console.log("Update Product Inventory Success");
            }
        }
    }
    return (
        <div className="modal-backdrop">
            <div
                className="modal-content"
                style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
                <div className="modal-header">
                    <div className="container mx-auto">
                        <p className="text-center text-xl">Add New Product/ Edit Product</p>
                    </div>

                    <button onClick={closeModal}>&times;</button>
                </div>
                <form
                    onSubmit={handleEditSubmit}
                    className="max-w-lg mx-auto p-8 space-y-4 bg-white shadow-lg rounded-lg overflow-scroll"
                >
                    <input
                        name="name"
                        type="text"
                        placeholder="Product Name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                        name="brand"
                        type="text"
                        placeholder="Product Brand"
                        value={brand}
                        onChange={(e) => {
                            setBrand(e.target.value);
                        }}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                        name="ean"
                        type="text"
                        placeholder="EAN"
                        value={ean}
                        onChange={(e) => {
                            setEan(e.target.value);
                        }}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                        name="id"
                        type="text"
                        placeholder="Price"
                        value={price.toString()} // Convert id to a string for rendering in the input field
                        onChange={(e) => {
                            const newValue = e.target.value;
                            if (newValue.trim() !== "" && !isNaN(Number(newValue))) {
                                setPrice(Number(newValue)); // Convert the string to a number and set it
                            } else {
                                setPrice(0); // Set to a default value or keep the previous value if the input is not a valid number
                            }
                        }}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <input
                        name="releaseDate"
                        type="date"
                        placeholder="Release Date"
                        value={releaseDate}
                        onChange={(e) => {
                            setReleaseDate(e.target.value);
                        }}
                        className="block w-full px-5 py-3 mt-2 bg-white border border-gray-200 rounded-md"
                    />
                    <input
                        name="categories"
                        type="text"
                        placeholder="Categories"
                        value={categoriesString}
                        onChange={(e) => {
                            setCategoriesString(e.target.value);
                        }}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={imageURL}
                        onChange={(e) => {
                            setImageURL(e.target.value);
                        }}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <input
                        disabled={true}
                        type="number"
                        placeholder="Size"
                        value={size}
                        onChange={(e) => {
                            setSize(Number.parseInt(e.target.value));
                        }}
                        className="bg-gray-200 text-gray-600 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                        disabled={true}
                        type="text"
                        placeholder="Color"
                        value={color}
                        onChange={(e) => {
                            setColor(e.target.value);
                        }}
                        className="bg-gray-200 text-gray-600 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                        type="text"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            if (newValue.trim() !== "" && !isNaN(Number(newValue))) {
                                setQuantity(Number(newValue)); // Convert the string to a number and set it
                            } else {
                                setQuantity(0); // Set to a default value or keep the previous value if the input is not a valid number
                            }
                        }}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        type="submit"
                        className={`${isFormComplete() ? "bg-blue-500 hover:bg-blue-600 cursor-pointer" : "bg-gray-500 hover:bg-gray-600 cursor-not-allowed"} w-full  text-white p-2 rounded-md`}
                        disabled={!isFormComplete()}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditProductDetailModal