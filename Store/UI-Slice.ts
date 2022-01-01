import {createSlice} from "@reduxjs/toolkit";

interface uiState {
    isLoading: boolean;
    isSideMenuOpen: boolean;
    isDarkMode: boolean;
    isSearchBarOn: boolean;
}

const initialState: uiState = {
    isLoading: false,
    isSideMenuOpen: false,
    isDarkMode: false,
    isSearchBarOn: false,
};
const UISlice = createSlice({
    name: "ui",
    initialState: initialState,
    reducers: {
        openSideMenu: (state) => {
            state.isSideMenuOpen = true;
        },
        closeSideMenu: (state) => {
            state.isSideMenuOpen = false;
        },
        toggleSideMenu: (state) => {
            state.isSideMenuOpen = !state.isSideMenuOpen;
        },
        toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
        },
        openSearchBar: (state) => {
            state.isSearchBarOn = true;
        },
        closeSearchBar: (state) => {
            state.isSearchBarOn = false;
        },
    }
})
export const UIActions = UISlice.actions;

export default UISlice.reducer;
