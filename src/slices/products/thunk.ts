import { createAsyncThunk } from "@reduxjs/toolkit";

import type { IHttpResponse } from "types";
import { request } from "helpers/axios";
import { convertObjToQueryString } from "helpers/utils";
import { ErrorHandler } from "helpers/error/error-handler";
import { HttpStatusCode } from "Common/constants/http-code-constant";

const TYPE_PREFIX = "products";

export const getProductList = createAsyncThunk(
  `${TYPE_PREFIX}/getProductList`,
  async (event?: any) => {
    const query = convertObjToQueryString(event);
    const response: IHttpResponse = await request.get(`/products?${query}`);
    const { isHasError, message } = ErrorHandler.checkResponse(
      response,
      HttpStatusCode.OK
    );

    if (isHasError) {
      throw new Error(message);
    }

    return {
      data: response.data,
      metadata: response.metadata,
    };
  }
);

export const addProductList = createAsyncThunk(
  `${TYPE_PREFIX}/addProductList`,
  async (event: any) => {
    const response: IHttpResponse = await request.post(`/products`, event);
    const { isHasError, message } = ErrorHandler.checkResponse(
      response,
      HttpStatusCode.CREATED
    );

    if (isHasError) {
      throw new Error(message);
    }

    return { ...event, ...response.data };
  }
);

export const updateProductList = createAsyncThunk(
  `${TYPE_PREFIX}/updateProductList`,
  async (event: any) => {
    const response: IHttpResponse = await request.put(
      `/products/${event.id}`,
      event
    );
    const { isHasError, message } = ErrorHandler.checkResponse(
      response,
      HttpStatusCode.OK
    );

    if (isHasError) {
      throw new Error(message);
    }

    return {
      ...event,
      ...response.data,
    };
  }
);

export const deleteProductList = createAsyncThunk(
  `${TYPE_PREFIX}/deleteProductList`,
  async (event: any) => {
    const response: IHttpResponse = await request.delete(`/products/${event}`);
    const { isHasError, message } = ErrorHandler.checkResponse(
      response,
      HttpStatusCode.NO_CONTENT
    );

    if (isHasError) {
      throw new Error(message);
    }
    return event;
  }
);

export const getCategories = createAsyncThunk(
  `${TYPE_PREFIX}/getCategories`,
  async () => {
    const response: IHttpResponse = await request.get("/categories");

    if (!response.success) {
      return [];
    }

    return {
      data: response.data,
    };
  }
);

export const getUnits = createAsyncThunk(
  `${TYPE_PREFIX}/getUnits`,
  async () => {
    const response: IHttpResponse = await request.get("/units");

    if (!response.success) {
      return [];
    }

    return {
      data: response.data,
    };
  }
);
