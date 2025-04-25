import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSupplier, updateSupplier, deleteSupplier, getSuppliers } from "apis/supplier";

export const getSuppliersThunk = createAsyncThunk(
  "suppliers/getSuppliers",
  getSuppliers,
);

export const addSupplierThunk = createAsyncThunk(
  "suppliers/addSupplier",
  createSupplier
);

export const updateSupplierThunk = createAsyncThunk(
  "suppliers/updateSupplier",
  updateSupplier,
);

export const deleteSupplierThunk = createAsyncThunk(
  "suppliers/deleteSupplier",
  deleteSupplier,
);
