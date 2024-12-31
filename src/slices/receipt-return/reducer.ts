import { createSlice } from "@reduxjs/toolkit";
import {
  getReceiptReturnList,
  deleteReceiptReturn,
  getReceiptReturnInfo,
} from "./thunk";

export const initialState = {
  data: [],
  pagination: {},
  error: {},
  receiptInfo: {},
  receiptItems: [],
};

const ReceiptSlice = createSlice({
  name: "ReceiptReturn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get list
    builder.addCase(
      getReceiptReturnList.fulfilled,
      (state: any, action: any) => {
        if (!action.payload) return;
        state.data = action.payload?.data;
        state.pagination = action.payload?.metadata;
      }
    );
    // get info
    builder.addCase(
      getReceiptReturnInfo.fulfilled,
      (state: any, action: any) => {
        if (!action.payload) return;
        state.receiptInfo = action.payload?.receipt;
        state.receiptItems = action.payload?.items;
      }
    );
    // delete
    builder.addCase(
      deleteReceiptReturn.fulfilled,
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
