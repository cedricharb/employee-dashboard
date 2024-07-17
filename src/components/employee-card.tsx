import React from "react";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../redux/employee-slice";
import { Employee } from "../lib/types/employee";
import { Link } from "react-router-dom";

interface EmployeeCardProps {
  employee: Employee;
}

// This component is the cards we can see in the home page

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
      // Give a warning popup
      dispatch(deleteEmployee(employee.id)); // Call the delete employee from redux
    }
  };

  return (
    <div className="border p-4 rounded shadow">
      <img
        src={employee.picture}
        alt={employee.name}
        className="w-16 h-16 rounded-full"
      />
      <h2 className="text-xl font-bold">{employee.name}</h2>
      <p>{employee.title}</p>
      <p>{employee.department}</p>
      <p>{employee.location}</p>
      <Link
        to={`/edit/${employee.id}`}
        className="text-blue-500 hover:underline"
      >
        Edit
      </Link>
      <button
        onClick={handleDelete}
        className="ml-4 text-red-500 hover:underline"
      >
        Delete
      </button>
    </div>
  );
};

export default EmployeeCard;
