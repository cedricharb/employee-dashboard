import React from "react";
import { Link } from "react-router-dom";
import { Employee } from "../lib/types/employee";

interface EmployeeCardProps {
  employee: Employee;
  linkTo: string;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, linkTo }) => {
  return (
    <Link to={linkTo} className="block p-4 border rounded hover:bg-gray-100">
      <div className="flex items-center">
        <img
          src={employee.picture}
          alt={employee.name}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h2 className="text-lg font-bold">{employee.name}</h2>
          <p className="text-gray-600">{employee.title}</p>
          <p className="text-gray-600">{employee.location}</p>
        </div>
      </div>
    </Link>
  );
};

export default EmployeeCard;
