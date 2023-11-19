import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"

import { LineItemTable } from "../_components/cart_page_components/line-items-table"

export const metadata: Metadata = {
  title: "Line Items",
  description: "A shopping cart build using Tanstack Table.",
}

// Simulate a database read for tasks.
//async function getTasks() {
async function getLineItems() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/(main)/_components/cart_page_components/data/lineItems.json")
  )
  return JSON.parse(data.toString())
}

export default async function CartPage() {

  const lineItems = await getLineItems()
  return (
    <>
          <LineItemTable data={lineItems}/>
    </>
  )
}

