import { createSlice } from "@reduxjs/toolkit";

interface NavBarState {
    isNotificationOpen: boolean;
    isUserMenuOpen: boolean;
    isSearching: boolean;
}


const initialState: NavBarState = {
    isNotificationOpen: false,
    isUserMenuOpen: false,
    isSearching: false,
}

export const navBarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        toggleIsNotificationOpen: (state) => {
            state.isNotificationOpen = !state.isNotificationOpen
        },
        toggleIsUserMenuOpen: (state) => {
            state.isUserMenuOpen = !state.isUserMenuOpen
        },
        toggleIsSearching: (state) => {
            state.isSearching = !state.isSearching
        }
    }
})


export const { toggleIsNotificationOpen, toggleIsUserMenuOpen, toggleIsSearching } = navBarSlice.actions;
export default navBarSlice.reducer;