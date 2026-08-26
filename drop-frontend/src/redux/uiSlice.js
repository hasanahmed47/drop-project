import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCartOpen: false,
  checkoutItems: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    setCheckoutItems: (state, action) => {
      state.checkoutItems = action.payload;
    },
    clearCheckoutItems: (state) => {
      state.checkoutItems = [];
    },
  },
});

export const { openCart, closeCart, toggleCart, setCheckoutItems, clearCheckoutItems } =
  uiSlice.actions;

export const selectIsCartOpen = (state) => state.ui.isCartOpen;
export const selectCheckoutItems = (state) => state.ui.checkoutItems;

export default uiSlice.reducer;
