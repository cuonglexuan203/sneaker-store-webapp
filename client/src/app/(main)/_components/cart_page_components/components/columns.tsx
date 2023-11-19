"use client"

import { ColumnDef, Sorting } from "@tanstack/react-table"

import { Badge } from "@/app/(main)/_components/shadcn/core/ui_components/badge"
import { Checkbox } from "@/app/(main)/_components/shadcn/core/ui_components/checkbox"

import { labels, priorities, statuses } from "../data/data"
//import {   id, product_name, imageURL, size, color, price, quanity, } from "../data/data"
//import { Task } from "../data/schema"
import { LineItem } from "../data/lineItemSchema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { useEffect, useRef, useState } from "react"
import { number } from "zod"

// export const columns: ColumnDef<Task>[] = [
export const columns: ColumnDef<LineItem>[] = [
{
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "product_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("product_name")}</div>,
  },
  {
    accessorKey: "imageURL",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title=" " />
    ),
    cell: ({ row }) => {
            return ( <div className="flex space-x-2">
             <img src={row.getValue("imageURL")} className="max-w-[500px] truncate font-medium"></img>
         </div>)
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "size",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("size")}</div>,
  },
  {
    accessorKey: "color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Color" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("color")}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("price")}</div>,
  },
  {
    accessorKey: "quanity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quanity" />
    ),
    cell: ({ row }) => {
      let initQuanity = Number(row.getValue("quanity"))
      const [quanity, setQuanity] = useState(initQuanity)
      const incrementRef = useRef(null) ;
      const decrementRef = useRef(null);
      const inputRef = useRef(null);
      useEffect(() =>
      { 
          function decrement(e: { stopImmediatePropagation: () => void; target: { parentNode: { parentElement: { querySelector: (arg0: string) => any } } } }) {
            e.stopImmediatePropagation();
    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);
    value--;
    target.value = value;
    setQuanity(quanity => ({ ...quanity, value}));
  }

  function increment(e: { stopImmediatePropagation: () => void; target: { parentNode: { parentElement: { querySelector: (arg0: string) => any } } } }) {
    e.stopImmediatePropagation();
    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);
    value++;
    target.value = value;
    setQuanity(quanity => ({ ...quanity, value}));
  }

  decrementRef.current.addEventListener("click", decrement);


  incrementRef.current.addEventListener("click", increment);    
},[quanity])
      return (
          <>
          <div className="custom-number-input h-10 w-32">
          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
            <button ref={decrementRef} data-action="decrement" className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
              <span className="m-auto text-2xl font-thin">−</span>
            </button>
            <input ref={inputRef} type="number" className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" defaultValue={initQuanity}></input>
            <button ref={incrementRef} data-action="increment" className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
              <span className="m-auto text-2xl font-thin">+</span>
            </button>
          </div>  </div></>
        
        )
       } ,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "price",
    header: ({column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
     
    cell: ({ row }) => <div className="w-[80px]" >{((Number(row.getValue("price")) * Number(  row.getValue("quanity"))))}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Task" />
  //   ),
  //   cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: "title",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="title" />
  //   ),
  //   cell: ({ row }) => {
  //     const label = labels.find((label) => label.value === row.original.label)

  //     return (
  //       <div className="flex space-x-2">
  //         {label && <Badge variant="outline">{label.label}</Badge>}
  //         <span className="max-w-[500px] truncate font-medium">
  //           {row.getValue("title")}
  //         </span>
  //       </div>
  //     )
  //   },
  // },
  //  {
  //   accessorKey: "status",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (status) => status.value === row.getValue("status")
  //     )

  //     if (!status) {
  //       return null
  //     }

  //     return (
  //       <div className="flex w-[100px] items-center">
  //         {status.icon && (
  //           <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{status.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  // {
  //   accessorKey: "priority",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Priority" />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue("priority")
  //     )

  //     if (!priority) {
  //       return null
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && (
  //           <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
]
