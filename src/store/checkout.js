import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ActiveStep: 0,
  selectedBillingAddress: null,
  SelectedStore: {},
  selectedShippingAddress: null,
  storeCredits: null,
  states: null,
  paymentOptions: [],
  shippingOptions: [],
  selectedShipping: null,
  showShipping: false,
  discountCoupons: [],
};

export const Checkoutslice = createSlice({
  name: "Checkout",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.ActiveStep = action.payload;
    },
    // setShippingInfo: (state, action) => {
    //   state.shippingInfo = action.payload;
    // },
    // paymentInfo: (state, action) => {
    //   state.paymentInfo = action.payload;
    // },
    setShippingOptions: (state, action) => {
      state.shippingOptions = action.payload;
    },
    setpaymentOptions: (state, action) => {
      state.paymentOptions = action.payload;
    },
    setBillingAddress: (state, action) => {
      state.selectedBillingAddress = action.payload;
    },
    setStore: (state, action) => {
      state.SelectedStore = action.payload;
    },
    setShippingAddress: (state, action) => {
      state.selectedShippingAddress = action.payload;
    },
    setStates: (state, action) => {
      state.states = action.payload;
    },
    setselectedShipping: (state, action) => {
      state.selectedShipping = action.payload;
    },
    setShowShipping: (state, action) => {
      state.showShipping = action.payload;
    },
    setStoreCredits: (state, action) => {
      state.storeCredits = action.payload;
    },
    setDiscountCoupons: (state, action) => {
      state.discountCoupons = action.payload;
    },
  },
});
export const {
  setCurrentStep,
  // setShippingInfo,
  // paymentInfo,
  setStoreCredits,
  setBillingAddress,
  setShippingAddress,
  setStates,
  setShippingOptions,
  setpaymentOptions,
  setselectedShipping,
  setShowShipping,
  setStore,
  setDiscountCoupons,
} = Checkoutslice.actions;

export default Checkoutslice.reducer;
