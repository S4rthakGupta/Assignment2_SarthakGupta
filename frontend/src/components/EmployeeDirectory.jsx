import React, { useState } from "react";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeTable from "./EmployeeTable";

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]); // Store employee data

  return (
    <div className="directory-container">
      <header>
        <h1>Employee Management System</h1>
      </header>

      {/* Employee Search Component */}
      <EmployeeSearch setEmployees={setEmployees} />

      {/* Employee Table and Create */}
      <div className="employee-section">
        <EmployeeTable employees={employees} />
        <EmployeeCreate />
      </div>
    </div>
  );
};

export default EmployeeDirectory;
