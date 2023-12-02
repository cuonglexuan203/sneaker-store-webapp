import React, { FormEvent, useState } from "react";
import { Sneaker } from "../_store/services/productsApi";



const AdminLineItem = ({
  p,
  openModal,
}: {
  p: Sneaker;
  openModal: () => void;
}) => {


  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("Product deleted:", p.name);
    } else {
      console.log("Product deletion cancelled");
    }
  };

  return (
    <tbody>
      <tr className="hover:bg-grey-lighter">
        <td className="py-4 px-6 border-b border-grey-light">{p.name}</td>
        <td className="py-4 px-6 border-b border-grey-light">{p.ean}</td>
        <td className="py-4 px-6 border-b border-grey-light">{p.ean}</td>
        <td className="py-4 px-6 border-b border-grey-light">{p.ean}</td>
        <td className="py-4 px-6 border-b border-grey-light">{p.ean}</td>
        {/* Add other columns */}
        <td className="py-4 px-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-24 rounded mr-4"
            onClick={openModal}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 w-24 rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        </td>
      </tr>
      {/* Repeat for other products */}
    </tbody>
  );
};

export default AdminLineItem;
