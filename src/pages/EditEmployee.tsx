import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployee } from "../redux/employee-slice";
import { RootState } from "../redux/store";
import EmployeeForm from "../components/employee-form";
import { Employee } from "../lib/types/employee";

const EditEmployee: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employee = useSelector((state: RootState) =>
    state.employees.employees.find((emp) => emp.id === id)
  );

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    dispatch(updateEmployee(updatedEmployee));
    navigate("/");
  };

  if (!employee) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Employee</h1>
      <EmployeeForm initialData={employee} onSubmit={handleUpdateEmployee} />
    </div>
  );
};

export default EditEmployee;
