import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../components/employee-form";
import { addEmployee } from "../redux/employee-slice";
import { Employee } from "../lib/types/employee";

const AddEmployee: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddEmployee = (employee: Employee) => {
    dispatch(addEmployee(employee));
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
