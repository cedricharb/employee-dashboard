import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Employee } from "../lib/types/employee";
import { fetchEmployees as fetchEmployeesFromAPI } from "../api";

// This is the employee slice, here we define all the actions we can do in regards to employees, as well as manage the employees state

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

const employeeSlice = createSlice({
  // Initializing the slice to be used
  name: "employees",
  initialState,
  reducers: {
    // These are the actions that we can do regarding the employees
    addEmployee(state, action: PayloadAction<Employee>) {
      state.employees.push(action.payload);
    },
    updateEmployee(state, action: PayloadAction<Employee>) {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );
      if (index !== -1) {
        state.employees[index] = action.payload; // action.payload is what is sent from calling the action in the page
      }
    },
    deleteEmployee(state, action: PayloadAction<string>) {
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    // These are case reducers mainly to manage the status of the employees state
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

export const { addEmployee, updateEmployee, deleteEmployee } =
  employeeSlice.actions;

export default employeeSlice.reducer;
