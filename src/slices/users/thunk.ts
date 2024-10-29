import { createAsyncThunk } from "@reduxjs/toolkit";

// import {
//   getUserList as getUserListApi,
//   addUserList as addUserListApi,
//   updateUserList as updateUserListApi,
//   deleteUserList as deleteUserListApi,
// } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { request } from "helpers/axios";
import { IHttpResponse } from "types";

export const getUserList = createAsyncThunk("users/getUserList", async () => {
  try {
    const response: IHttpResponse = await request.get(`/users`);

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
});
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

      toast.success("User Added Successfully", { autoClose: 2000 });
      const data = {
        id: response.data?.id,
        ...event,
      };

      return data;
    } catch (error: any) {
      toast.error(error.message, { autoClose: 2000 });
      return null;
    }
  },
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

      toast.success("User updated Successfully", { autoClose: 2000 });
      return {
        id: response.data?.id,
        ...event,
      };
    } catch (error: any) {
      toast.error(error.message, { autoClose: 2000 });
      return null;
    }
  },
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

      toast.success("User deleted Successfully", { autoClose: 2000 });
      return event;
    } catch (error: any) {
      toast.error(error.message, { autoClose: 2000 });
      return null;
    }
  },
);
