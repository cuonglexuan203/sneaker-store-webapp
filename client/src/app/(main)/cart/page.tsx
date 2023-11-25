import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"

import { LineItemTable } from "../_components/cart_page_components/LineItemsTable"

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "A shopping cart build using Tanstack Table.",
}

const lineItems = [
        {
            "id": 1,
            "color": "BLUE",
            "size": 44,
            "quantity": 20,
            "product": {
                "id": 1,
                "brand": "Nike",
                "name": "Nike Air Max 1 SC Light Bone Violet Dust",
                "ean": "FB9660-002",
                "price": 126.5,
                "releaseDate": "2022-11-09",
                "categories": [
                    "Men"
                ],
                "description": "This new rendition of Nike's classic Air Max 1 model showcases a neutral color scheme of cream, purple, and tan...",
                "imageUrl": "/images/sneakers/1.png"
            }
        }
]

export default async function CartPage() {

  return (
    <>
          <LineItemTable data={lineItems}/>
    </>
  )
}

