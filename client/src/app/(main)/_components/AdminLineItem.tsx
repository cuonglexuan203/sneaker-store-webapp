import React, { FormEvent, useState, ChangeEvent } from "react";
import {
  AdminSneaker,
  useDeleteAdminProductMutation,
} from "../_store/services/productsApi";
import ProductDetailsModal from "./ProductDetailsModal";
import ProductEditModal from "./ProductEditModal";

const AdminLineItem = ({
  p,
  openModal,
  isEditModalOpen,
  closeModal,
}: {
  p: AdminSneaker;
  openModal: () => void;
  isEditModalOpen: boolean;
  closeModal: () => void;
}) => {
  const [deleteAdminProduct] = useDeleteAdminProductMutation();

  const handleDelete = async (inventoryId: number) => {
    if (
      window.confirm("Are you sure you want to delete this inventory item?")
    ) {
      try {
        // Gọi API để xóa `productInventory` dựa trên `inventoryId`
        await deleteAdminProduct(inventoryId).unwrap();
        console.log(`Product inventory ${inventoryId} deleted successfully`);
        // Cập nhật UI ở đây nếu cần, ví dụ như cập nhật lại state để loại bỏ item đã xóa
      } catch (error) {
        console.error(
          `Error deleting product inventory ${inventoryId}:`,
          error
        );
        // Xử lý lỗi tại đây
      }
    }
  };

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <tbody>
      <React.Fragment key={""}>
        {p.productInventories.map((inventory, inventoryIndex) => (
          <tr
            key={`inventory-${inventoryIndex}`}
            className="hover:bg-grey-lighter"
          >
            {/* Product Name */}
            {inventoryIndex === 0 ? (
              <td
                className="py-4 px-6 border-b border-grey-light"
                rowSpan={p.productInventories.length}
              >
                {p.product.name}
              </td>
            ) : null}

            {/* Size */}
            <td className="py-4 px-6 border-b border-grey-light">
              {inventory.size}
            </td>

            {/* Color */}
            <td className="py-4 px-6 border-b border-grey-light">
              {inventory.color}
            </td>

            {/* Quantity */}
            <td className="py-4 px-6 border-b border-grey-light">
              {inventory.productAmount}
            </td>

            {/* Price */}
            {/* Include your logic for displaying the price here */}
            <td className="py-4 px-6 border-b border-grey-light">
              {p.product.price}
            </td>

            {/* Actions */}
            <td className="py-4 px-6 border-b border-grey-light">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-24 rounded mr-4"
                onClick={openModal}
              >
                Edit
              </button>
              {isEditModalOpen && (
                <ProductEditModal
                  closeModal={closeModal}
                  initialPattern={p}
                  inventoryId={p.productInventories[inventory.id].id}
                />
              )}
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 w-24 rounded"
                onClick={() => handleDelete(inventory.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </React.Fragment>
    </tbody>
  );
};

export default AdminLineItem;
