const { createSlice } = require("@reduxjs/toolkit");

const navbarStore = createSlice({
  name: "navbarStore",
  initialState: {
    navbarIsOpen: false,
  },
  reducers: {
    openNavbar(state, action) {
      state.navbarIsOpen = true;
    },
    closeNavbar(state, action) {
      state.navbarIsOpen = false;
    },
  },
});

export const { openNavbar, closeNavbar } = navbarStore.actions;

export default navbarStore.reducer;
