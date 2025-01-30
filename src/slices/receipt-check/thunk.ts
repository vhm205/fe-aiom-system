import { createAsyncThunk } from "@reduxjs/toolkit";

import type { IHttpResponse } from "types";
import { request } from "helpers/axios";
import { convertObjToQueryString } from "helpers/utils";

const TYPE_PREFIX = "ReceiptCheck";

export const getReceiptCheckList = createAsyncThunk(
  `${TYPE_PREFIX}/getReceiptCheckList`,
  async (payload?: any) => {
    const query = convertObjToQueryString(payload);
    const response: IHttpResponse = await request.get(
      `/receipt-check?${query}`
    );

    if (
      (response.statusCode && response.statusCode !== 200) ||
      !response.success
    ) {
      throw new Error(response.message);
    }

    return {
      data: response.data,
      metadata: response.metadata,
    };
  }
);

export const getReceiptCheckInfo = createAsyncThunk(
  `${TYPE_PREFIX}/getReceiptCheckInfo`,
  async (id: string) => {
    const response: IHttpResponse = await request.get(`/receipt-check/${id}`);

    if (
      (response.statusCode && response.statusCode !== 200) ||
      !response.success
    ) {
      throw new Error(response.message);
    }

    const { receipt, items } = response.data;

    return {
      receipt,
      items,
    };
  }
);

export const deleteReceiptCheck = createAsyncThunk(
  `${TYPE_PREFIX}/deleteReceiptCheck`,
  async (id: string) => {
    const response: IHttpResponse = await request.delete(
      `/receipt-check/${id}`
    );

    if (typeof response === "string") {
      throw new Error(response);
    }

    if (
      (response.statusCode && response.statusCode !== 204) ||
      !response.success
    ) {
      throw new Error(response.message);
    }

    return id;
  }
);

export const getReceiptCheckByReceiptNumber = createAsyncThunk(
  `${TYPE_PREFIX}/getReceiptCheckByReceiptNumber`,
  async (receiptNumber: string) => {
    const response: IHttpResponse = await request.get(
      `/receipt-check/receipt-items/${receiptNumber}`
    );

    if (
      (response.statusCode && response.statusCode !== 200) ||
      !response.success
    ) {
      throw new Error(response.message);
    }

    const { receipt, items } = response.data;

    return {
      receipt,
      items,
    };
  }
);
