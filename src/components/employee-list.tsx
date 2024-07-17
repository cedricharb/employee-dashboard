import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../redux/employee-slice";
import { RootState, AppDispatch } from "../redux/store";
import EmployeeCard from "./employee-card";
import SearchBar from "./searchbar";

// This is the main component in the home page

const EmployeeList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Specify the correct type for dispatch
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );
  const status = useSelector((state: RootState) => state.employees.status);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployees()); // Fetch employees when component mounts
    }
  }, [status, dispatch]);

  const filteredEmployees = employees.filter((employee) =>
    // This is the search functionality, searches for employees whose name includes the string searched
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
