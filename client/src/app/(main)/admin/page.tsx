"use client";
import React, { FormEvent, useState } from "react";
import Image from "next/image";
import Product from "../_components/Product";
import {
  AdminSneaker,
  ProductInventory,
  Sneaker,
  useAddAdminProductMutation,
  useGetAdminProductsQuery,
} from "../_store/services/productsApi";
import { FaThumbsUp } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../_store/hooks";
import { RootState } from "../_store/store";
import { hideLoading, showLoading } from "../_store/features/statusSlice";
import ProductDetailsModal from "../_components/ProductDetailsModal";
import AdminLineItem from "../_components/AdminLineItem";
import EditProductDetailModal from "../_components/EditProductDetailModal";
import { AuthRequiredError } from "../lib/exception";


export type ModalData = {
  product: Sneaker,
  productInventory: ProductInventory
}

const Dashboard = () => {


  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  //


  const initialModalData: ModalData = {
    product: {
      id: 0,
      name: "",
      brand: "",
      ean: "",
      price: 0,
      description: "",
      imageUrl: "",
      releaseDate: "",
      categories: [],
    }, productInventory: {
      id: 0,
      color: "",
      productAmount: 0,
      size: 0
    }
  }
  const [modalData, setModalData] = useState(initialModalData);
  //
  const {
    isLoading,
    isFetching,
    data: adminProducts = [],
    isSuccess,
    error,
  } = useGetAdminProductsQuery(null);

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);
  const isAdmin: boolean = useAppSelector(state => state.auth.isAdmin);

  if (!isAdmin) {
    throw new AuthRequiredError();
  }
  //
  if (isLoading || isFetching) {
    dispatch(showLoading());
    return <div className="h-[50vh] text-center mt-16">Loading...</div>
  } else if (isSuccess) {
    setInterval(() => {
      dispatch(hideLoading());
    }, 500);
  }

  const itemsPerPage = 1;
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = adminProducts.slice(firstItemIndex, lastItemIndex);

  const totalPages = Math.ceil(adminProducts.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  const closeAddModal = () => setIsAddModalOpen(false);
  const closeEditModal = () => setIsEditModalOpen(false);
  //add item

  //create popup to add new product
  const initialPattern: AdminSneaker = {
    product: {
      id: 0,
      name: "",
      brand: "",
      ean: "",
      price: 0,
      description: "",
      imageUrl: "",
      releaseDate: "",
      categories: [],
    },
    productInventories: [
    ],
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

  //   if (name in newProduct.product) {
  //     // Update product details
  //     setNewProduct((prevState) => ({
  //       ...prevState,
  //       product: {
  //         ...prevState.product,
  //         [name]: value,
  //       },
  //     }));
  //   } else {
  //     // Handle updates for inventory items, assuming a naming convention like "inventory-0-color"
  //     const [field, indexStr, property] = name.split("-");

  //     if (field === "inventory") {
  //       const index = parseInt(indexStr, 10); // Convert string index to a number

  //       setNewProduct((prevState) => {
  //         const newInventories = [...prevState.productInventories];
  //         if (newInventories[index]) {
  //           newInventories[index] = {
  //             ...newInventories[index],
  //             [property]: value,
  //           };
  //         }

  //         return {
  //           ...prevState,
  //           productInventories: newInventories,
  //         };
  //       });
  //     }
  //   }
  // };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">All products</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
          onClick={() => setIsAddModalOpen(true)}
        >
          Add new product
        </button>
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
          <tbody>
            {currentItems.map((p, idx) => (
              p.productInventories.map((pi, idx) => (
                <tr key={pi.id}>
                  <AdminLineItem product={p.product} productInventory={pi} setModalData={setModalData} setIsEditModalOpen={setIsEditModalOpen} />
                </tr>
              ))
            ))}
          </tbody>

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
      {isAddModalOpen && (
        <ProductDetailsModal
          closeModal={closeAddModal}
          initialPattern={initialPattern}
        />
      )}
      {
        isEditModalOpen && (
          <EditProductDetailModal modalData={modalData} closeModal={closeEditModal} />
        )
      }
    </div>
  );
};

export default Dashboard;
