import { createSlice } from "@reduxjs/toolkit";
import {
  getProductList,
  addProductList,
  updateProductList,
  deleteProductList,
} from "./thunk";

export const initialState = {
  productList: [],
  pagination: {},
  error: {},
};

const ProductSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get list
    builder.addCase(getProductList.fulfilled, (state: any, action: any) => {
      if (!action.payload) return;
      state.productList = action.payload?.data;
      state.pagination = action.payload?.metadata;
    });
    builder.addCase(getProductList.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });
    // add
    builder.addCase(addProductList.fulfilled, (state: any, action: any) => {
      if (action.payload) {
        state.productList.unshift(action.payload);
      }
    });
    builder.addCase(addProductList.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });
    // update
    builder.addCase(updateProductList.fulfilled, (state: any, action: any) => {
      if (!action.payload) return;

      state.productList = state.productList.map((product: any) =>
        product.id === action.payload.id
          ? { ...product, ...action.payload }
          : product,
      );
    });
    builder.addCase(updateProductList.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });
    // delete
    builder.addCase(deleteProductList.fulfilled, (state: any, action: any) => {
      if (!action.payload) return;

      state.productList = state.productList.filter(
        (product: any) =>
          product.id.toString() !== action.payload.toString(),
      );
    });
    builder.addCase(deleteProductList.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });
  },
});

export default ProductSlice.reducer;
