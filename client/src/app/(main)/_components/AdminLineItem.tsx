import { Dispatch, SetStateAction } from "react"
import { ProductInventory, Sneaker, useDeleteAdminProductMutation } from "../_store/services/productsApi"
import { ModalData } from "../admin/page"
import { error } from "console";

const AdminLineItem = ({ product: p, productInventory: pi, setModalData, setIsEditModalOpen }: { product: Sneaker, productInventory: ProductInventory, setModalData: Dispatch<SetStateAction<ModalData>>, setIsEditModalOpen: Dispatch<SetStateAction<boolean>> }) => {
  const [deleteTrigger, { error, isSuccess }] = useDeleteAdminProductMutation();
  const handleDelete = async () => {
    const deletedId = pi.id;
    if (deletedId > 0) {
      const result = confirm("Are you sure you want to delete this product inventory?");
      if (result) {
        await deleteTrigger(deletedId).unwrap;
        if (error) {
          throw new Error("Failed to Delete Product Inventory");
        }
        else if (isSuccess) {
          console.log("Successfully Deleted Product Inventory!");
        }
      }
    }
  }
  return (
    <>
      <td className="border border-slate-300 px-6">{p.name}</td>
      <td className="border border-slate-300 px-6">{pi.size}</td>
      <td className="border border-slate-300 px-6">{pi.color}</td>
      <td className="border border-slate-300 px-6">{pi.productAmount}</td>
      <td className="border border-slate-300 px-6">{p.price}</td>
      <td className="border border-slate-300 px-6">
        <div className="flex flex-col items-center justify-center">
          <button onClick={() => {
            setModalData({
              product: p,
              productInventory: pi,
            })
            setIsEditModalOpen(true);
          }} className="w-20 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">Edit</button>
          <button onClick={handleDelete} className="w-20 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">Delete</button>
        </div>
      </td>


    </>

  )
}

export default AdminLineItem