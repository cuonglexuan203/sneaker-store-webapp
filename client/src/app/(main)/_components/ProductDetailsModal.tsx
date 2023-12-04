import React, { FormEvent, ChangeEvent, useState } from "react";

import {
  AdminSneaker,
  ProductInventory,
  Sneaker,
  useAddAdminProductMutation,
} from "../_store/services/productsApi";

const ProductDetailsModal = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const [
    addProduct,
    {
      isLoading: isAdding,
      error: addError,
      data: addData,
      isSuccess: isAddSuccess,
    },
  ] = useAddAdminProductMutation();


  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [categoriesString, setCategoriesString] = useState("");
  const [description, setDescription] = useState("");
  const [ean, setEan] = useState("");
  const [imageURL, setImageURL] = useState("/images/sneakers/");
  const [price, setPrice] = useState(0);
  const [releaseDate, setReleaseDate] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(0);

  const isFormComplete = () => {
    return (
      name.trim() !== "" &&
      brand.trim() !== "" &&
      ean.trim() !== "" &&
      price !== 0 &&
      description.trim() !== "" &&
      imageURL.trim() !== "" &&
      releaseDate.trim() !== "" &&
      categoriesString.length > 0
      && size.trim() !== "" && color.trim() !== "" && quantity >= 0
    );
  };

  //handle
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const answer = confirm("Are you sure you want to add this product?");
    event.preventDefault();
    const categoriesArray = categoriesString
      .split(", ")
      .map((cat) => cat.trim());

    const pattern: AdminSneaker = {
      product: {
        id: 0,
        brand,
        name,
        ean,
        price,
        releaseDate,
        categories: categoriesArray,
        description,
        imageUrl: imageURL,
      },
      productInventories: [
        {
          id: 0,
          productAmount: quantity,
          color: color,
          size: parseInt(size),
        },
      ],
    };

    try {
      const response = await addProduct(pattern).unwrap();
      console.log("Product added successfully", response);
      closeModal();
      // reset 
      setName("");
      setBrand("");
      setCategoriesString("");
      setImageURL("");
      setReleaseDate("");
      setDescription("");
      setEan("");
      setPrice(0)
      setSize("");
      setColor("");
      setQuantity(0);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please check your input.");
    }
  };

  return (
    <div className="modal-backdrop">
      <div
        className="modal-content max-h-[90vh] overflow-y-auto"
      >
        <div className="modal-header">
          <div className="container mx-auto">
            <p className="text-center text-xl">Add New Product/ Edit Product</p>
          </div>

          <button onClick={closeModal}>&times;</button>
        </div>
        <form
          onSubmit={handleSubmit}
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
            value={price.toString()}
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
            onChange={e => setCategoriesString(e.target.value)}
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
            type="text"
            placeholder="Size"
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
            }}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            disabled={!isFormComplete()}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
