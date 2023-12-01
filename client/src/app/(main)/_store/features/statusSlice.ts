import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Status {
    spinner: boolean,
    toast: {
        show: boolean,
        title: string,
        content: string
    }
}

export interface ToastPayload {
    title: string,
    content: string,

}

const initialState: Status = {
    spinner: false,
    toast: {
        show: false,
        title: "",
        content: "",
    },
}


const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        showLoading: state => {
            state.spinner = true;
        },
        hideLoading: state => {
            state.spinner = false;
        },
        showToast: (state, action: PayloadAction<ToastPayload>) => {
            state.toast.show = true;
            state.toast.title = action.payload.title;
            state.toast.content = action.payload.content;
        },
        hideToast: state => {
            state.toast.show = false;
        }


    }
})

export const { showLoading, hideLoading, showToast, hideToast } = statusSlice.actions;
export default statusSlice.reducer;