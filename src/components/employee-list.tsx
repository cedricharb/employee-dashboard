import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../redux/employee-slice";
import { RootState } from "../redux/store";
import EmployeeCard from "./employee-card";
import SearchBar from "./searchbar";
import { UnknownAction } from "@reduxjs/toolkit";

const EmployeeList: React.FC = () => {
  const dispatch = useDispatch();
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );
  const status = useSelector((state: RootState) => state.employees.status);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployees() as unknown as UnknownAction);
    }
  }, [status, dispatch]);

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            linkTo={`/edit/${employee.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
