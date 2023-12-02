"use client";
import React, { FormEvent, useState } from "react";
import Image from "next/image";
import Product from "../_components/Product";
import { Sneaker, useGetProductsQuery } from "../_store/services/productsApi";
import { FaThumbsUp } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../_store/hooks";
import { RootState } from "../_store/store";
import { hideLoading, showLoading } from "../_store/features/statusSlice";
import ProductDetailsModal from "../_components/ProductDetailsModal";
import AdminLineItem from "../_components/AdminLineItem";

const Dashboard = () => {
  const {
    isLoading,
    isFetching,
    data: products = [],
    isSuccess,
    error,
  } = useGetProductsQuery(null);
  const dispatch = useAppDispatch();
  const isNotificationOpen = useAppSelector(
    (state: RootState) => state.navbar.isNotificationOpen
  );
  const isUserMenuOpen = useAppSelector(
    (state: RootState) => state.navbar.isUserMenuOpen
  );
  const user = useAppSelector((state) => state.user);
  const authlog = useAppSelector((state) => state.auth);
  //
  if (isLoading || isFetching) {
    dispatch(showLoading());
  } else if (isSuccess) {
    setInterval(() => {
      dispatch(hideLoading());
    }, 500);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = products.slice(firstItemIndex, lastItemIndex);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  //create popup to add new product
  const initialPattern: Sneaker = {
    id: 0,
    name: "",
    brand: "",
    ean: "",
    price: 0,
    description: "",
    imageUrl: "",
    releaseDate: "",
    categories: [],
  };

  const [newProduct, setNewProduct] = useState(initialPattern);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement; // Type assertion here
    const { name, value } = target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted", newProduct);
    setNewProduct({
      id: 0,
      name: "",
      brand: "",
      ean: "",
      price: 0,
      description: "",
      imageUrl: "",
      releaseDate: "",
      categories: [],
    });
    closeModal();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">All products</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
          onClick={openModal}
        >
          Add new product
        </button>

        {isModalOpen && (
          <ProductDetailsModal
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            newProduct={newProduct}
            handleInputChange={handleInputChange}
          />
        )}
      </div>
      <div className="bg-white shadow-md rounded my-6 overflow-scroll">
        <table className="text-left w-full border-collapse">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light w-1/4 max-w-xs">
                PRODUCT NAME
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light w-1/6 max-w-xs">
                SIZE
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light w-1/6 max-w-xs">
                COLOR
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light w-1/6 max-w-xs">
                QUANTITY
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light w-1/6 max-w-xs">
                PRICE
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light w-1/6 max-w-xs">
                ACTIONS
              </th>
            </tr>
          </thead>

          {currentItems.map((p, idx) => (
            <AdminLineItem key={idx} p={p} openModal={openModal} />
          ))}
        </table>
      </div>
      <div className="pagination flex items-center justify-center space-x-2 my-4">
        <button
          onClick={() => paginate(1)}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          First
        </button>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`py-2 px-4 rounded ${i + 1 === currentPage
                ? "bg-blue-700 text-white"
                : "bg-blue-500 text-white hover:bg-blue-700"
              }`}
          >
            {i + 1}
          </button>
        )).slice(
          Math.max(0, currentPage - 3),
          Math.min(currentPage + 2, totalPages)
        )}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
        <button
          onClick={() => paginate(totalPages)}
          disabled={currentPage === totalPages}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
