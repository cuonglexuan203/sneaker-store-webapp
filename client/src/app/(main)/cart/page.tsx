// import React from 'react'

// const Cart = () => {
//     return (
//         <section>
//             Cart
//         </section>
//     )
// }

// export default Cart

import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import { z } from "zod"

import { columns } from "../../../shadcn/example/tasks/components/columns"
import { DataTable } from "../../../shadcn/example/tasks/components/data-table"
import { taskSchema } from "../../../shadcn/example/tasks/data/schema"

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/shadcn/example/tasks/data/tasks.json")
  )


  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

export default async function CartPage() {
  const tasks = await getTasks()

  return (
    <>
    <div className="container mx-auto mt-10">
    <div className="flex shadow-md my-10">
      <div className="w-3/4 bg-white px-10 py-10">
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <DataTable data={tasks} columns={columns} />
        </div>
      </div>
      <div id="summary" className="w-1/4 px-8 py-10">
        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
        <div className="flex justify-between mt-10 mb-5">
          <span className="font-semibold text-sm uppercase">Subtotal (... items)</span>
          <span className="font-semibold text-sm">600$</span>
        </div>
        <div className="flex justify-between mt-10 mb-5">
          <span className="font-semibold text-sm uppercase">Shipping & Handling</span>
          <span className="font-semibold text-sm">590$</span>
        </div>
        <div className="flex justify-between mt-10 mb-5">
          <span className="font-semibold text-sm uppercase">Sales Tax</span>
          <span className="font-semibold text-sm">20$</span>
        </div>
        <div className="border-t mt-8">
          <div className="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Grand Total</span>
            <span>$1000</span>
          </div>
          <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}
