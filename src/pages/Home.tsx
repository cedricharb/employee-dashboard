import React from "react";
import EmployeeList from "../components/employee-list";

// The home page

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Dashboard</h1>
      <EmployeeList />
    </div>
  );
};

export default Home;
