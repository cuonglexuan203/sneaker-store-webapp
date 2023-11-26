import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Sneaker } from "../services/productsApi";

export interface SelectedItems {
    lineItems: LineItem[]
}

export interface LineItem {
    color: string,
    size: number,
    quantity: number,
    product: Sneaker,
}

export interface IndexedLineItem extends LineItem {
    id: number
}

const initialState: SelectedItems = {
    lineItems: [
            {
                color: "BLUE",
                size: 44,
                quantity: 1,
                product: {
                    id: 1,
                    brand: "Nike",
                    name: "Nike Air Max 1 SC Light Bone Violet Dust",
                    ean: "FB9660-002",
                    price: 126,
                    releaseDate: "2023-08-01",
                    categories: ["Men"],
                    description:
                        "This new rendition of Nike's classic Air Max 1 model showcases a neutral color scheme of cream, purple, and tan...",
                    imageUrl: "/images/sneakers/1.png",
                },
            },
            {
                color: "GREY",
                size: 45,
                quantity: 3,
                product: {
                    id: 2,
                    brand: "Nike",
                    name: "Nike Air Max 97 Multi-Corduroy (Women's)",
                    ean: "FB8454-300",
                    price: 153.5,
                    releaseDate: "2023-10-09",
                    categories: ["Women"],
                    description:
                        "The Nike Air Max 97 is a running shoe that debuted in 1997...",
                    imageUrl: "/images/sneakers/2.png",
                },
            },
            {
                color: "BLACK",
                size: 40,
                quantity: 5,
                product: {
                    id: 3,
                    name: "Rivalry 86 Low 'Class of '86'",
                    brand: "adidas",
                    ean: "IE7160",
                    price: 196.4,
                    releaseDate: "2023-11-03",
                    categories: ["Men"],
                    description:
                        "An iconic silhouette that gained traction in the mid-80's basketball scene, the Adidas Rivalry Low Consortium...",
                    imageUrl: "/images/sneakers/8.png",
                },
            },
            {
                color: "BLACK",
                size: 40,
                quantity: 5,
                product: {
                    id: 4,
                    name: "Air Jordan 5 Retro SE TD 'Midnight Navy'",
                    brand: "Jordan",
                    ean: "FN5454-400",
                    price: 500,
                    releaseDate:"2023-01-10",
                    categories: ["Infant"],
                    description:
                        "Following in its predecessors' footsteps, the iconic Air Jordan 5 is joining in on the 'Craft' pack...",
                    imageUrl: "/images/sneakers/5.png",
                },
            },
            {
                color: "BLACK",
                size: 40,
                quantity: 1,
                product: {
                    id: 5,
                    name: "The Apartment x 576 Made in England 'Evergreen'",
                    brand: "New Balance",
                    ean: "OU576AME",
                    price: 243.5,
                    releaseDate: "2023-06-10",
                    categories: ["Men"],
                    description:
                        "Following in its predecessors' footsteps, the iconic Air Jordan 6 is joining in on the 'Craft' pack...",
                    imageUrl: "/images/sneakers/6.png",
                },
            },
        ],
    }

// used to save selected line items
export const selectedItemsSlice = createSlice({
    name: "tempCart",
    initialState,
    reducers: {
        updateSelectedItems: (state, action: PayloadAction<SelectedItems>) => {
            state.lineItems = action.payload.lineItems;
        },
        clearSelectedItems: (state) => {
            state.lineItems = initialState.lineItems;
        },
        addLineItem: (state, action: PayloadAction<LineItem>) => {
            const idx = state.lineItems.findIndex(i => i.color === action.payload.color && i.size === action.payload.size && i.product.id === action.payload.product.id);
            if (idx >= 0) {
                state.lineItems.at(idx)!.quantity += action.payload.quantity;
            } else {
                state.lineItems.push(action.payload);
            }
        },
        removeLineItem: (state, action: PayloadAction<LineItem>) => {

            const deletedItemIdx = state.lineItems.findIndex(i => i.color === action.payload.color && i.size === action.payload.size && i.product.id === action.payload.product.id);
            if (deletedItemIdx >= 0) {
                state.lineItems.splice(deletedItemIdx, 1);
            }
        }
    }
})

export const { updateSelectedItems, clearSelectedItems, addLineItem, removeLineItem } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;