import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Employee } from "../lib/types/employee";
import { fetchEmployees as fetchEmployeesFromAPI } from "../api";

interface EmployeeState {
  employees: Employee[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: EmployeeState = {
  employees: [],
  status: "idle",
};

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const response = await fetchEmployeesFromAPI();
    return response;
  }
);

const generateId = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16); //generate a uuid
  });
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee(state, action: PayloadAction<Employee>) {
      action.payload.id = generateId();
      state.employees.push(action.payload);
    },
    updateEmployee(state, action: PayloadAction<Employee>) {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchEmployees.fulfilled,
        (state, action: PayloadAction<Employee[]>) => {
          state.status = "succeeded";
          state.employees = action.payload;
        }
      )
      .addCase(fetchEmployees.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addEmployee, updateEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
