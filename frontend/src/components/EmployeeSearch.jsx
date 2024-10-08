import React, { useState } from 'react';
import '../style/EmployeeSearch.css';

function EmployeeSearch() {  
  // State to manage search parameters.
  const [searchParams, setSearchParams] = useState({
    name: '',
    department: '',
    employeeType: ''
  });
  
  // Handle changes to input fields and update search parameters
  const onChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  return (
    <div className="employee-search-container">
      <h2 className="employee-search-title">Search Employees</h2>
      <div className="employee-search-inline">
        <div className="input-group">
          <i className="fas fa-user"></i>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="employee-search-input"
            onChange={onChange}
          />
        </div>

        <div className="input-group">
          <i className="fas fa-building"></i>
          <select
            name="department"
            className="employee-search-dropdown"
            onChange={onChange}
          >
            <option value="">Department</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
          </select>
        </div>

        <div className="input-group">
          <i className="fas fa-user-tag"></i>
          <select
            name="employeeType"
            className="employee-search-dropdown"
            onChange={onChange}
          >
            <option value="">Type</option>
            <option value="FullTime">Full Time</option>
            <option value="PartTime">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </select>
        </div>

        <button className="employee-search-button">
          <i className="fas fa-search"></i> Search
        </button>
      </div>
    </div>
  );
}

export default EmployeeSearch;
