import React from 'react';
import EmployeeSearch from './EmployeeSearch';
import EmployeeCreate from './EmployeeCreate';
import EmployeeTable from './EmployeeTable';
import 'bootstrap/dist/css/bootstrap.min.css';
 
function EmployeeDirectory() {
  return (
    <div>
      {/* Banner with bg-info for the welcome text */}
      <div className="bg-info text-white text-center py-4 mb-4">
        <h1>Employee Management System</h1>
      </div>
 
      {/* Employee Search component */}
      <div className="container">
        <EmployeeSearch />
        <div className="row mt-3">
          {/* Employee Create form on the left side */}
          <div className="col-md-6 col-sm-12 mb-4">
            <EmployeeCreate />
          </div>
 
          {/* Employee Table on the right side */}
          <div className="col-md-6 col-sm-12">
            <EmployeeTable />
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default EmployeeDirectory;