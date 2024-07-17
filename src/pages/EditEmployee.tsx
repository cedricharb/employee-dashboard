import React, { useEffect } from "react";
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
    // Selector is used to use partial data from the redux state, in this case only the employee to be edited
    state.employees.employees.find((emp) => emp.id === id)
  );

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    dispatch(updateEmployee(updatedEmployee));
    navigate("/");
  };

  useEffect(() => {
    if (!employee) {
      navigate("/"); // Redirect to home if employee not found
    }
  }, [employee, navigate]);

  if (!employee) {
    // A loading state while we get the user from redux, or from the database if that was the case
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
