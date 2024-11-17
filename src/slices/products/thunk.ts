import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import type { IHttpResponse } from "types";
import { request } from "helpers/axios";
import { convertObjToQueryString } from "helpers/utils";

const TYPE_PREFIX = "products";

export const getProductList = createAsyncThunk(
  `${TYPE_PREFIX}/getProductList`,
  async (event?: any) => {
    try {
      const query = convertObjToQueryString(event);
      const response: IHttpResponse = await request.get(`/products?${query}`);

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
    } catch (error: any) {
      toast.error(error.message, { autoClose: 2000 });
      return null;
    }
  },
);

export const addProductList = createAsyncThunk(
  `${TYPE_PREFIX}/addProductList`,
  async (event: any) => {
    try {
      const response: IHttpResponse = await request.post(`/products`, event);

      if (
        (response.statusCode && response.statusCode !== 201) ||
        !response.success
      ) {
        throw new Error(response.message);
      }

      toast.success("Tạo sản phẩm thành công", { autoClose: 2000 });
      return { ...event, ...response.data };
    } catch (error: any) {
      toast.error(error.message, { autoClose: 2000 });
      return null;
    }
  },
);

export const updateProductList = createAsyncThunk(
  `${TYPE_PREFIX}/updateProductList`,
  async (event: any) => {
    try {
      const response: IHttpResponse = await request.put(
        `/products/${event.id}`,
        event,
      );

      if (
        (response.statusCode && response.statusCode !== 200) ||
        !response.success
      ) {
        throw new Error(response.message);
      }

      toast.success("Cập nhật sản phẩm thành công", { autoClose: 2000 });
      return {
        ...event,
        ...response.data,
      };
    } catch (error: any) {
      toast.error(error.message, { autoClose: 2000 });
      return null;
    }
  },
);

export const deleteProductList = createAsyncThunk(
  `${TYPE_PREFIX}/deleteProductList`,
  async (event: any) => {
    try {
      const response: IHttpResponse = await request.delete(
        `/products/${event}`,
      );

      if (
        (response.statusCode && response.statusCode !== 204) ||
        !response.success
      ) {
        throw new Error(response.message);
      }

      toast.success("Xóa sản phẩm thành công", { autoClose: 2000 });
      return event;
    } catch (error: any) {
      toast.error(error.message, { autoClose: 2000 });
      return null;
    }
  },
);

export const getCategories = createAsyncThunk(
  `${TYPE_PREFIX}/getCategories`,
  async () => {
    try {
      const response: IHttpResponse = await request.get("/products/categories");

      if (!response.success) {
        return [];
      }

      return {
        data: response.data,
      };
    } catch (error: any) {
      toast.error(error.message, { autoClose: 2000 });
      return null;
    }
  },
);

export const getSuppliers = createAsyncThunk(
  `${TYPE_PREFIX}/getSuppliers`,
  async () => {
    try {
      const response: IHttpResponse = await request.get("/products/suppliers");

      if (!response.success) {
        return [];
      }

      return {
        data: response.data,
      };
    } catch (error: any) {
      toast.error(error.message, { autoClose: 2000 });
      return null;
    }
  },
);

export const getUnits = createAsyncThunk(
  `${TYPE_PREFIX}/getUnits`,
  async () => {
    try {
      const response: IHttpResponse = await request.get("/products/units");

      if (!response.success) {
        return [];
      }

      return {
        data: response.data,
      };
    } catch (error: any) {
      toast.error(error.message, { autoClose: 2000 });
      return null;
    }
  },
);
