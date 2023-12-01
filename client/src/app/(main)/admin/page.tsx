"use client";
import React from "react";
import Image from "next/image";
import { type Sneaker } from "../_store/services/productsApi";
import Link from "next/link";

const Dashboard = () => {
  // Use your hooks and logic here

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">All products</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add new product
        </button>
      </div>
      <div className="bg-white shadow-md rounded my-6">
        <table className="text-left w-full border-collapse">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                PRODUCT NAME
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                SIZE
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                SIZE
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                COLOR
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                QUANTITY
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                PRICE
              </th>
              {/* Add other headers */}
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-grey-lighter">
              <td className="py-4 px-6 border-b border-grey-light">
                Education Dashboard
              </td>
              <td className="py-4 px-6 border-b border-grey-light">Angular</td>
              {/* Add other columns */}
            </tr>
            {/* Repeat for other products */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
