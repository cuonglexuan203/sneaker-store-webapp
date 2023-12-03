import React, { FormEvent, ChangeEvent, useState } from "react";

import {
  AdminSneaker,
  ProductInventory,
  Sneaker,
  useAddAdminProductMutation,
} from "../_store/services/productsApi";

const ProductDetailsModal = ({
  closeModal,
  initialPattern,
}: {
  closeModal: () => void;
  initialPattern: AdminSneaker;
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

  const [adđConfirmed, setAddConfirmed] = useState(false);

  const [newProduct, setNewProduct] = useState(initialPattern);
  const [id, setId] = useState(newProduct.product.id);
  const [brand, setBrand] = useState(newProduct.product.brand);
  const [categoriesString, setCategoriesString] = useState(
    initialPattern.product.categories.join(", ")
  );
  const [description, setDescription] = useState(
    newProduct.product.description
  );
  const [ean, setEan] = useState(newProduct.product.ean);
  const [imageURL, setImageURL] = useState(newProduct.product.imageUrl);
  const [name, setName] = useState(newProduct.product.name);
  const [price, setPrice] = useState(newProduct.product.price);
  const [releaseDate, setReleaseDate] = useState(
    newProduct.product.releaseDate
  );
  const [idInventory, setIdInventory] = useState(Number);
  const [size, setSize] = useState(String);
  const [color, setColor] = useState(String);
  const [quantity, setQuantity] = useState(Number);

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
    );
  };

  const addInventoryItem = () => {
    const newInventoryItem: ProductInventory = {
      id: idInventory,
      productAmount: quantity,
      size: parseInt(size),
      color: color,
    };

    setNewProduct((prevState) => ({
      ...prevState,
      productInventories: [...prevState.productInventories, newInventoryItem],
    }));

    // Reset input fields
    setSize("");
    setColor("");
    setQuantity(0);
  };

  //handle
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const answer = confirm("Are you sure you want to add this product?");
    event.preventDefault();
    const categoriesArray = categoriesString
      .split(",")
      .map((cat) => cat.trim()); // Chuyển chuỗi thành mảng

    const Pattern: AdminSneaker = {
      product: {
        id: id,
        brand: brand,
        name: name,
        ean: ean,
        price: price,
        releaseDate: releaseDate,
        categories: categoriesArray,
        description: description,
        imageUrl: imageURL,
      },
      productInventories: [
        {
          id: idInventory,
          productAmount: quantity,
          color: color,
          size: parseInt(size),
        },
      ],
      // ... any other required properties
    };

    try {
      const response = await addProduct(Pattern).unwrap();
      console.log("Product added successfully", response);
      setAddConfirmed(true);
      closeModal();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please check your input.");
    }

    setAddConfirmed(true); // Update your confirmation state
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "brand":
        setBrand(value);
        break;
      // Các trường hợp khác...
      case "categories":
        setCategoriesString(value);
        break;
      // Không quên các trường hợp khác
    }
  };

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
            onChange={handleInputChange}
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
