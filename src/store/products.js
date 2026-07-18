import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsId: null,
  page: 0,
  loadedData: {
    loadedProducts: [],
    loadedPage: 0,
    loadedCategoryId: null,
    loadedBrandId: null,
    loadedTotalProducts: null,
  },
};

export const ProductSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setProductsId: (state, action) => {
      state.productsId = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLoadedData: (state, action) => {
      state.loadedData.loadedCategoryId = action.payload.path.includes("/products") ? action.payload.id : null;
      state.loadedData.loadedBrandId = action.payload.path.includes("/brand") ? action.payload.id : null;
      state.loadedData.loadedPage = action.payload.page;
      state.loadedData.loadedProducts = action.payload.products;
      state.loadedData.loadedTotalProducts = action.payload.totalProducts;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProductsId, setPage, setLoadedData } = ProductSlice.actions;

export default ProductSlice.reducer;