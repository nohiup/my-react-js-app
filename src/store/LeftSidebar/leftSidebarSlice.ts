import TabName from "@/data/enum";
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isOpen: true,
  activeTab: TabName.None,
  isDarkMode: false,

}

const leftSidebarSlice = createSlice({
  name: "leftSidebar",
  initialState,
  reducers: {
    toggleSidebar: (state, value) => {
      if (value.payload === state.activeTab) {
        state.isOpen = !state.isOpen;
      }
      else if (state.isOpen === false) {
        state.isOpen = true;
      }
      else if (value.payload === "none") {
        state.isOpen = !state.isOpen;
      }

    },
    setActive: (state, value) => {
      if (value.payload !== state.activeTab) {
        state.activeTab = value.payload;
      }
    },

    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    }
  }
});

export const { toggleSidebar, setActive, toggleDarkMode } = leftSidebarSlice.actions;
export default leftSidebarSlice.reducer;

