import { createSlice } from "@reduxjs/toolkit";
import {
  getReceiptImportList,
  deleteReceiptImport,
  getReceiptImportInfo,
} from "./thunk";

export const initialState = {
  data: [],
  pagination: {},
  error: {},
  receiptInfo: {},
  receiptItems: [],
};

const ReceiptSlice = createSlice({
  name: "ReceiptImport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get list
    builder.addCase(
      getReceiptImportList.fulfilled,
      (state: any, action: any) => {
        if (!action.payload) return;
        state.data = action.payload?.data;
        state.pagination = action.payload?.metadata;
      }
    );
    // get info
    builder.addCase(
      getReceiptImportInfo.fulfilled,
      (state: any, action: any) => {
        if (!action.payload) return;
        state.receiptInfo = action.payload?.receipt;
        state.receiptItems = action.payload?.items;
      }
    );
    // delete
    builder.addCase(
      deleteReceiptImport.fulfilled,
      (state: any, action: any) => {
        if (!action.payload) return;

        state.data = state.data.filter(
          (item: any) => item.id.toString() !== action.payload.toString()
        );
      }
    );
  },
});

export default ReceiptSlice.reducer;
