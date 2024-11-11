import React, { useState } from "react";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeTable from "./EmployeeTable";

const EmployeeDirectory = () => {
  const [getEmployees, setEmployees] = useState([]); // Store employee data

  return (
    <div className="directory-container">
      <EmployeeSearch setEmployees={setEmployees} />
      <div className="employee-section">
        <EmployeeTable getEmployees={getEmployees} />
      </div>
    </div>
  );
};

export default EmployeeDirectory;
