import { createSlice } from "@reduxjs/toolkit";
import {
  getProductList,
  addProductList,
  updateProductList,
  deleteProductList,
  getCategories,
  getSuppliers,
  getUnits,
} from "./thunk";

export const initialState = {
  productList: [],
  pagination: {},
  categoryList: [],
  supplierList: [],
  unitList: [],
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
        (product: any) => product.id.toString() !== action.payload.toString(),
      );
    });
    builder.addCase(deleteProductList.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });
    // get category
    builder.addCase(getCategories.fulfilled, (state: any, action: any) => {
      if (!action.payload) return;
      state.categoryList = action.payload?.data;
    });
    // get suppliers
    builder.addCase(getSuppliers.fulfilled, (state: any, action: any) => {
      if (!action.payload) return;
      state.supplierList = action.payload?.data;
    });
    // get units
    builder.addCase(getUnits.fulfilled, (state: any, action: any) => {
      if (!action.payload) return;
      state.unitList = action.payload?.data;
    });
  },
});

export default ProductSlice.reducer;
