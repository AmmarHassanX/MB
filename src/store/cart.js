import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartData: null,
  isLoading: false,
  localCartData: null,
  openDrawer: false,
  allowLocalCartData: false,
};
export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartQuantity: (state, action) => {
      state.cartData = action.payload;
    },
    setCartLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCartData: (state, action) => {
      state.cartData = action.payload;
    },
    setLocalCartData: (state, action) => {
      state.localCartData = action.payload;
    },
    toggleOpenDrawer: (state, action) => {
      state.openDrawer = action.payload;
    },
  },
});
export const {
  // AddToCart,
  // setCartPrice,
  setCartQuantity,
  setCartData,
  setCartLoading,
  setLocalCartData,
  toggleOpenDrawer,
} = CartSlice.actions;

export default CartSlice.reducer;
