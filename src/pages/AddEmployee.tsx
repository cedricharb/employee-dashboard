import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../redux/employee-slice";
import EmployeeForm from "../components/employee-form";
import { Employee } from "../lib/types/employee";

const generateId = () => {
  // Example of generating a unique ID (use a library like uuid for production)
  return Math.random().toString(36).substr(2, 9);
};

const AddEmployee: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddEmployee = (employee: Employee) => {
    const employeeWithId = { ...employee, id: generateId() }; // Generate ID before adding
    dispatch(addEmployee(employeeWithId));
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Employee</h1>
      <EmployeeForm onSubmit={handleAddEmployee} />
    </div>
  );
};

export default AddEmployee;
