import React, { FormEvent } from "react";
import { Sneaker } from "../_store/services/productsApi";

const ProductDetailsModal = ({
  closeModal,
  handleSubmit,
  newProduct,
  handleInputChange,
}: {
  closeModal: () => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  newProduct: Sneaker;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Product/ Edit Product</h2>
          <button onClick={closeModal}>&times;</button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto p-8 space-y-4 bg-white shadow-lg rounded-lg"
        >
          <input
            name="name"
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            name="brand"
            type="text"
            placeholder="Product Brand"
            value={newProduct.brand}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            name="ean"
            type="text"
            placeholder="EAN"
            value={newProduct.ean}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            name="price"
            type="text"
            placeholder="Product Price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            name="releaseDate"
            type="date"
            placeholder="Release Date"
            value={newProduct.releaseDate}
            onChange={handleInputChange}
            className="block w-full px-5 py-3 mt-2 bg-white border border-gray-200 rounded-md"
          />
          <input
            name="price"
            type="text"
            placeholder="Categories"
            value={newProduct.categories}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.imageUrl}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
