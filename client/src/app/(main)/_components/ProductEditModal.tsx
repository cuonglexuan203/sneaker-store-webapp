import React, { FormEvent, ChangeEvent, useState } from "react";

import {
  AdminSneaker,
  ProductInventory,
  Sneaker,
  useUpdateAdminProductMutation,
} from "../_store/services/productsApi";

const ProductDetailsModal = ({
  closeModal,
  initialPattern,
  inventoryId,
}: {
  closeModal: () => void;
  initialPattern: AdminSneaker;
  inventoryId: number;
}) => {
  const [
    EditProduct,
    {
      isLoading: isEditting,
      error: editError,
      data: editData,
      isSuccess: iseditSuccess,
    },
  ] = useUpdateAdminProductMutation();

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

  const inventoryItem = initialPattern.productInventories.find(
    (inventory) => inventory.id === inventoryId
  );

  const [size, setSize] = useState(inventoryItem ? inventoryItem.size : 0);
  const [color, setColor] = useState(inventoryItem ? inventoryItem.color : "");
  const [quantity, setQuantity] = useState(
    inventoryItem ? inventoryItem.productAmount : 0
  );

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

  //handle
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const answer = confirm("Are you sure you want to add this product?");
    event.preventDefault();
    const categoriesArray = categoriesString
      .split(",")
      .map((cat) => cat.trim()); // Chuyển chuỗi thành mảng
    const isUpdatingProduct = id !== 0;
    const productPayload = {
      id: id, // Đảm bảo rằng 'id' này là ID của sản phẩm bạn muốn cập nhật
      brand: brand,
      name: name,
      ean: ean,
      price: price,
      releaseDate: releaseDate,
      categories: categoriesArray,
      description: description,
      imageUrl: imageURL,
    };

    try {
      const response = await EditProduct({
        product: productPayload,
        productInventoryId: inventoryId,
        productInventoryQty: quantity,
      }).unwrap();
      console.log("Product updated successfully", response);
      setAddConfirmed(true);
      closeModal();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please check your input.");
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
              const newValue = e.target.value;
              if (newValue.trim() !== "" && !isNaN(Number(newValue))) {
                setSize(Number(newValue)); // Convert the string to a number and set it
              } else {
                setSize(0); // Set to a default value or keep the previous value if the input is not a valid number
              }
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
