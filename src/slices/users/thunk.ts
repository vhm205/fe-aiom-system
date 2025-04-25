import { createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { request } from "helpers/axios";
import { IHttpResponse } from "types";
import { convertObjToQueryString } from "helpers/utils";

export const getUserList = createAsyncThunk(
  "users/getUserList",
  async (payload?: any) => {
    try {
      const query = convertObjToQueryString(payload);

      const response: IHttpResponse = await request.get(`/users?${query}`);

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
      return null;
    }
  }
);

export const addUserList = createAsyncThunk(
  "users/addUserList",
  async (event: any) => {
    try {
      const response: IHttpResponse = await request.post(`/users`, event);

      if (
        (response.statusCode && response.statusCode !== 201) ||
        !response.success
      ) {
        throw new Error(response.message);
      }

      toast.success("Thêm user thành công", { autoClose: 2000 });

      const { id, code } = response.data;
      const data = {
        id,
        code,
        ...event,
      };

      return data;
    } catch (error: any) {
      toast.error(error.message, { autoClose: 2000 });
      return null;
    }
  }
);

export const updateUserList = createAsyncThunk(
  "users/updateUserList",
  async (event: any) => {
    try {
      const response: IHttpResponse = await request.put(`/users`, event);

      if (
        (response.statusCode && response.statusCode !== 200) ||
        !response.success
      ) {
        throw new Error(response.message);
      }

      toast.success("Cập nhật user thành công", { autoClose: 2000 });
      return {
        id: response.data?.id,
        ...event,
      };
    } catch (error: any) {
      toast.error(error.message, { autoClose: 2000 });
      return null;
    }
  }
);

export const deleteUserList = createAsyncThunk(
  "users/deleteUserList",
  async (event: any) => {
    try {
      const response: IHttpResponse = await request.delete(`/users/${event}`);

      if (
        (response.statusCode && response.statusCode !== 204) ||
        !response.success
      ) {
        throw new Error(response.message);
      }

      toast.success("Xóa user thành công", { autoClose: 2000 });
      return event;
    } catch (error: any) {
      toast.error(error.message, { autoClose: 2000 });
      return null;
    }
  }
);
