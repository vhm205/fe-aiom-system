import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import type { IHttpResponse } from "types";
import { request } from "helpers/axios";
import { convertObjToQueryString } from "helpers/utils";

const TYPE_PREFIX = "ReceiptImport";

export const getReceiptImportList = createAsyncThunk(
  `${TYPE_PREFIX}/getReceiptImportList`,
  async (event?: any) => {
    try {
      const query = convertObjToQueryString(event);
      const response: IHttpResponse = await request.get(
        `/receipt-imports?${query}`
      );

      if (
        (response.statusCode && response.statusCode !== 200) ||
        !response.success
      ) {
        toast.error(response.message);
        return null;
      }

      return {
        data: response.data,
        metadata: response.metadata,
      };
    } catch (error: any) {
      toast.error(error.message, { autoClose: 2000 });
      return null;
    }
  }
);

export const getReceiptImportInfo = createAsyncThunk(
  `${TYPE_PREFIX}/getReceiptImportInfo`,
  async (event?: any) => {
    try {
      const response: IHttpResponse = await request.get(
        `/receipt-imports/${event}`
      );

      if (
        (response.statusCode && response.statusCode !== 200) ||
        !response.success
      ) {
        toast.error(response.message);
        return null;
      }

      const { receipt, items } = response.data;

      return {
        receipt,
        items,
      };
    } catch (error: any) {
      toast.error(error.message, { autoClose: 2000 });
      return null;
    }
  }
);

export const deleteReceiptImport = createAsyncThunk(
  `${TYPE_PREFIX}/deleteReceiptImport`,
  async (event: any) => {
    try {
      const response: IHttpResponse = await request.delete(
        `/receipt-imports/${event}`
      );

      if (typeof response === "string") {
        toast.warn(response);
        return null;
      }

      if (
        (response.statusCode && response.statusCode !== 204) ||
        !response.success
      ) {
        toast.error(response.message);
        return null;
      }

      toast.success("Xóa phiếu thành công", { autoClose: 2000 });
      return event;
    } catch (error: any) {
      toast.error(error.message, { autoClose: 2000 });
      return null;
    }
  }
);

export const getReceiptImportByReceiptNumber = createAsyncThunk(
  `${TYPE_PREFIX}/getReceiptImportByReceiptNumber`,
  async (event?: any) => {
    try {
      const response: IHttpResponse = await request.get(
        `/receipt-imports/receipt-items/${event}`
      );

      if (
        (response.statusCode && response.statusCode !== 200) ||
        !response.success
      ) {
        toast.error(response.message);
        return null;
      }

      const { receipt, items } = response.data;

      return {
        receipt,
        items,
      };
    } catch (error: any) {
      toast.error(error.message, { autoClose: 2000 });
      return null;
    }
  }
);