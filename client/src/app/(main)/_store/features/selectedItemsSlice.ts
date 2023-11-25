import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SelectedItems {
    lineItems: LineItem[]
}

export interface LineItem {
    color: string,
    size: number,
    quantity: number,
    productId: number,
}

const initialState: SelectedItems = {
    lineItems: [],
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
            const idx = state.lineItems.findIndex(i => i.color === action.payload.color && i.size === action.payload.size && i.productId === action.payload.productId);
            if (idx >= 0) {
                state.lineItems.at(idx)!.quantity += action.payload.quantity;
            } else {
                state.lineItems.push(action.payload);
            }
        },
        removeLineItem: (state, action: PayloadAction<LineItem>) => {

            const deletedItemIdx = state.lineItems.findIndex(i => i.color === action.payload.color && i.size === action.payload.size && i.productId === action.payload.productId);
            if (deletedItemIdx >= 0) {
                state.lineItems.splice(deletedItemIdx, 1);
            }
        }
    }
})

export const { updateSelectedItems, clearSelectedItems, addLineItem } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;