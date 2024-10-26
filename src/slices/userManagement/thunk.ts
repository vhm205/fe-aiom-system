import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  getEmployee as getEmployeeApi,
  addEmployee as addEmployeeApi,
  updateEmployee as updateEmployeeApi,
  deleteEmployee as deleteEmployeeApi,
  getHolidays as getHolidaysApi,
  addHolidays as addHolidaysApi,
  updateHolidays as updateHolidaysApi,
  deleteHolidays as deleteHolidaysApi,
  getDepartments as getDepartmentsApi,
  addDepartments as addDepartmentsApi,
  updateDepartments as updateDepartmentsApi,
  deleteDepartments as deleteDepartmentsApi,
  getEstimates as getEstimatesApi,
  addEstimates as addEstimatesApi,
  updateEstimates as updateEstimatesApi,
  deleteEstimates as deleteEstimatesApi,
  getExpenses as getExpensesApi,
  addExpenses as addExpensesApi,
  updateExpenses as updateExpensesApi,
  deleteExpenses as deleteExpensesApi,
  getLeaveManageHR as getLeaveManageHRApi,
  addLeaveManageHR as addLeaveManageHRApi,
  updateLeaveManageHR as updateLeaveManageHRApi,
  deleteLeaveManageHR as deleteLeaveManageHRApi,
  getEmployeeSalary as getEmployeeSalaryApi,
  addEmployeeSalary as addEmployeeSalaryApi,
  updateEmployeeSalary as updateEmployeeSalaryApi,
  deleteEmployeeSalary as deleteEmployeeSalaryApi,
  getAttendance as getAttendanceApi,
  getMainAttendance as getMainAttendanceApi,
  getLeaveManageEmployee as getLeaveManageEmployeeApi,
  getPayments as getPaymentsApi,
} from "../../helpers/fakebackend_helper";
import "react-toastify/dist/ReactToastify.css";

const SLICE_NAME = `userManagement`;

export const getEmployee = createAsyncThunk(
  `${SLICE_NAME}/getEmployee`,
  async () => {
    try {
      const response = getEmployeeApi();
      return response;
    } catch (error) {
      return error;
    }
  },
);
export const addEmployee = createAsyncThunk(
  `${SLICE_NAME}/addEmployee`,
  async (event: any) => {
    try {
      const response = addEmployeeApi(event);
      const data = await response;
      toast.success("Employee Added Successfully", { autoClose: 2000 });
      return data;
    } catch (error) {
      toast.error("Employee Added Failed", { autoClose: 2000 });
      return error;
    }
  },
);
export const updateEmployee = createAsyncThunk(
  `${SLICE_NAME}/updateEmployee`,
  async (event: any) => {
    try {
      const response = updateEmployeeApi(event);
      const data = await response;
      toast.success("Employee updated Successfully", { autoClose: 2000 });
      return data;
    } catch (error) {
      toast.error("Employee updated Failed", { autoClose: 2000 });
      return error;
    }
  },
);
export const deleteEmployee = createAsyncThunk(
  `${SLICE_NAME}/deleteEmployee`,
  async (event: any) => {
    try {
      const response = deleteEmployeeApi(event);
      toast.success("Employee deleted Successfully", { autoClose: 2000 });
      return response;
    } catch (error) {
      toast.error("Employee deleted Failed", { autoClose: 2000 });
      return error;
    }
  },
);

export const getHolidays = createAsyncThunk(
  `${SLICE_NAME}/getHolidays`,
  async () => {
    try {
      const response = getHolidaysApi();
      return response;
    } catch (error) {
      return error;
    }
  },
);
export const addHolidays = createAsyncThunk(
  `${SLICE_NAME}/addHolidays`,
  async (event: any) => {
    try {
      const response = addHolidaysApi(event);
      const data = await response;
      toast.success("Holidays Added Successfully", { autoClose: 2000 });
      return data;
    } catch (error) {
      toast.error("Holidays Added Failed", { autoClose: 2000 });
      return error;
    }
  },
);
export const updateHolidays = createAsyncThunk(
  `${SLICE_NAME}/updateHolidays`,
  async (event: any) => {
    try {
      const response = updateHolidaysApi(event);
      const data = await response;
      toast.success("Holidays updated Successfully", { autoClose: 2000 });
      return data;
    } catch (error) {
      toast.error("Holidays updated Failed", { autoClose: 2000 });
      return error;
    }
  },
);
export const deleteHolidays = createAsyncThunk(
  `${SLICE_NAME}/deleteHolidays`,
  async (event: any) => {
    try {
      const response = deleteHolidaysApi(event);
      toast.success("Holidays deleted Successfully", { autoClose: 2000 });
      return response;
    } catch (error) {
      toast.error("Holidays deleted Failed", { autoClose: 2000 });
      return error;
    }
  },
);

export const getDepartments = createAsyncThunk(
  `${SLICE_NAME}/getDepartments`,
  async () => {
    try {
      const response = getDepartmentsApi();
      return response;
    } catch (error) {
      return error;
    }
  },
);
export const addDepartments = createAsyncThunk(
  `${SLICE_NAME}/addDepartments`,
  async (event: any) => {
    try {
      const response = addDepartmentsApi(event);
      const data = await response;
      toast.success("Departments Added Successfully", { autoClose: 2000 });
      return data;
    } catch (error) {
      toast.error("Departments Added Failed", { autoClose: 2000 });
      return error;
    }
  },
);
export const updateDepartments = createAsyncThunk(
  `${SLICE_NAME}/updateDepartments`,
  async (event: any) => {
    try {
      const response = updateDepartmentsApi(event);
      const data = await response;
      toast.success("Departments updated Successfully", { autoClose: 2000 });
      return data;
    } catch (error) {
      toast.error("Departments updated Failed", { autoClose: 2000 });
      return error;
    }
  },
);
export const deleteDepartments = createAsyncThunk(
  `${SLICE_NAME}/deleteDepartments`,
  async (event: any) => {
    try {
      const response = deleteDepartmentsApi(event);
      toast.success("Departments deleted Successfully", { autoClose: 2000 });
      return response;
    } catch (error) {
      toast.error("Departments deleted Failed", { autoClose: 2000 });
      return error;
    }
  },
);

export const getEstimates = createAsyncThunk(
  `${SLICE_NAME}/getEstimates`,
  async () => {
    try {
      const response = getEstimatesApi();
      return response;
    } catch (error) {
      return error;
    }
  },
);
export const addEstimates = createAsyncThunk(
  `${SLICE_NAME}/addEstimates`,
  async (event: any) => {
    try {
      const response = addEstimatesApi(event);
      const data = await response;
      toast.success("Estimates Added Successfully", { autoClose: 2000 });
      return data;
    } catch (error) {
      toast.error("Estimates Added Failed", { autoClose: 2000 });
      return error;
    }
  },
);
export const updateEstimates = createAsyncThunk(
  `${SLICE_NAME}/updateEstimates`,
  async (event: any) => {
    try {
      const response = updateEstimatesApi(event);
      const data = await response;
      toast.success("Estimates updated Successfully", { autoClose: 2000 });
      return data;
    } catch (error) {
      toast.error("Estimates updated Failed", { autoClose: 2000 });
      return error;
    }
  },
);
export const deleteEstimates = createAsyncThunk(
  `${SLICE_NAME}/deleteEstimates`,
  async (event: any) => {
    try {
      const response = deleteEstimatesApi(event);
      toast.success("Estimates deleted Successfully", { autoClose: 2000 });
      return response;
    } catch (error) {
      toast.error("Estimates deleted Failed", { autoClose: 2000 });
      return error;
    }
  },
);

export const getExpenses = createAsyncThunk(
  `${SLICE_NAME}/getExpenses`,
  async () => {
    try {
      const response = getExpensesApi();
      return response;
    } catch (error) {
      return error;
    }
  },
);
export const addExpenses = createAsyncThunk(
  `${SLICE_NAME}/addExpenses`,
  async (event: any) => {
    try {
      const response = addExpensesApi(event);
      const data = await response;
      toast.success("Expenses Added Successfully", { autoClose: 2000 });
      return data;
    } catch (error) {
      toast.error("Expenses Added Failed", { autoClose: 2000 });
      return error;
    }
  },
);
export const updateExpenses = createAsyncThunk(
  `${SLICE_NAME}/updateExpenses`,
  async (event: any) => {
    try {
      const response = updateExpensesApi(event);
      const data = await response;
      toast.success("Expenses updated Successfully", { autoClose: 2000 });
      return data;
    } catch (error) {
      toast.error("Expenses updated Failed", { autoClose: 2000 });
      return error;
    }
  },
);
export const deleteExpenses = createAsyncThunk(
  `${SLICE_NAME}/deleteExpenses`,
  async (event: any) => {
    try {
      const response = deleteExpensesApi(event);
      toast.success("Expenses deleted Successfully", { autoClose: 2000 });
      return response;
    } catch (error) {
      toast.error("Expenses deleted Failed", { autoClose: 2000 });
      return error;
    }
  },
);

export const getLeaveManageHR = createAsyncThunk(
  `${SLICE_NAME}/getLeaveManageHR`,
  async () => {
    try {
      const response = getLeaveManageHRApi();
      return response;
    } catch (error) {
      return error;
    }
  },
);
export const addLeaveManageHR = createAsyncThunk(
  `${SLICE_NAME}/addLeaveManageHR`,
  async (event: any) => {
    try {
      const response = addLeaveManageHRApi(event);
      const data = await response;
      toast.success("Leave Added Successfully", { autoClose: 2000 });
      return data;
    } catch (error) {
      toast.error("Leave Added Failed", { autoClose: 2000 });
      return error;
    }
  },
);
export const updateLeaveManageHR = createAsyncThunk(
  `${SLICE_NAME}/updateLeaveManageHR`,
  async (event: any) => {
    try {
      const response = updateLeaveManageHRApi(event);
      const data = await response;
      toast.success("Leave updated Successfully", { autoClose: 2000 });
      return data;
    } catch (error) {
      toast.error("Leave updated Failed", { autoClose: 2000 });
      return error;
    }
  },
);
export const deleteLeaveManageHR = createAsyncThunk(
  `${SLICE_NAME}/deleteLeaveManageHR`,
  async (event: any) => {
    try {
      const response = deleteLeaveManageHRApi(event);
      toast.success("Leave deleted Successfully", { autoClose: 2000 });
      return response;
    } catch (error) {
      toast.error("Leave deleted Failed", { autoClose: 2000 });
      return error;
    }
  },
);

export const getEmployeeSalary = createAsyncThunk(
  `${SLICE_NAME}/getEmployeeSalary`,
  async () => {
    try {
      const response = getEmployeeSalaryApi();
      return response;
    } catch (error) {
      return error;
    }
  },
);
export const addEmployeeSalary = createAsyncThunk(
  `${SLICE_NAME}/addEmployeeSalary`,
  async (event: any) => {
    try {
      const response = addEmployeeSalaryApi(event);
      const data = await response;
      toast.success("data Added Successfully", { autoClose: 2000 });
      return data;
    } catch (error) {
      toast.error("data Added Failed", { autoClose: 2000 });
      return error;
    }
  },
);
export const updateEmployeeSalary = createAsyncThunk(
  `${SLICE_NAME}/updateEmployeeSalary`,
  async (event: any) => {
    try {
      const response = updateEmployeeSalaryApi(event);
      const data = await response;
      toast.success("data updated Successfully", { autoClose: 2000 });
      return data;
    } catch (error) {
      toast.error("data updated Failed", { autoClose: 2000 });
      return error;
    }
  },
);
export const deleteEmployeeSalary = createAsyncThunk(
  `${SLICE_NAME}/deleteEmployeeSalary`,
  async (event: any) => {
    try {
      const response = deleteEmployeeSalaryApi(event);
      toast.success("data deleted Successfully", { autoClose: 2000 });
      return response;
    } catch (error) {
      toast.error("data deleted Failed", { autoClose: 2000 });
      return error;
    }
  },
);

export const getAttendance = createAsyncThunk(
  `${SLICE_NAME}/getAttendance`,
  async () => {
    try {
      const response = getAttendanceApi();
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const getMainAttendance = createAsyncThunk(
  `${SLICE_NAME}/getMainAttendance`,
  async () => {
    try {
      const response = getMainAttendanceApi();
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const getLeaveManageEmployee = createAsyncThunk(
  `${SLICE_NAME}/getLeaveManageEmployee`,
  async () => {
    try {
      const response = getLeaveManageEmployeeApi();
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const getPayments = createAsyncThunk(
  `${SLICE_NAME}/getPayments`,
  async () => {
    try {
      const response = getPaymentsApi();
      return response;
    } catch (error) {
      return error;
    }
  },
);
