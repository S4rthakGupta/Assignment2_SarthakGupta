import React from 'react';
// Importing other components.
import EmployeeSearch from './EmployeeSearch';
import EmployeeCreate from './EmployeeCreate';
import EmployeeTable from './EmployeeTable';
// Importing CSS of Employee Directory.
import '../style/EmployeeDirectory.css';


function EmployeeDirectory() {
  return (
    <div className="directory-container">
      {/* Basic Welcome Text. */}
      <div className="banner">
        <h1>Employee Management System</h1>
      </div>

      {/* Employee Search, Create, and Table components */}
      <div className="content-container">
        <EmployeeSearch />
        <div className="employee-section">
          <EmployeeCreate />
          <EmployeeTable />
        </div>
      </div>
    </div>
  );
}
 
export default EmployeeDirectory;