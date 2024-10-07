import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
 
function EmployeeCreate() {
  const [employeeData, setEmployeeData] = useState({
    FirstName: '',
    LastName: '',
    Age: '',
    DateOfJoining: '',
    Title: 'Employee',
    Department: 'IT',
    EmployeeType: 'FullTime',
  });
 
  const [errors, setErrors] = useState({});  // State to hold validation errors
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: name === 'Age' ? parseInt(value, 10) : value, // Match with 'Age' not 'age'
    });
  };
 
  const validateForm = () => {
    const newErrors = {};
 
    // Validation rules
    if (!employeeData.FirstName) newErrors.FirstName = 'First Name is required';
    if (!employeeData.LastName) newErrors.LastName = 'Last Name is required';
    if (employeeData.Age < 20 || employeeData.Age > 70)
      newErrors.Age = 'Age must be between 20 and 70';
    if (!employeeData.DateOfJoining) newErrors.DateOfJoining = 'Date of Joining is required';
 
    setErrors(newErrors);
 
    // Form is valid if there are no errors
    return Object.keys(newErrors).length === 0;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (!validateForm()) {
      return;
    }
 
    const response = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation CreateEmployee($input: EmployeeInput!) {
            createEmployee(input: $input) {
              id
              FirstName
              LastName
              Age
              DateOfJoining
              Title
              Department
              EmployeeType
              CurrentStatus
            }
          }
        `,
        variables: { input: employeeData },
      }),
    });
 
    const { data } = await response.json();
    if (data) {
      alert('Employee created successfully');
      window.location.reload(); // Refresh the entire DOM to update the EmployeeTable
    }
  };
 
  return (
    <div>
      <h2 className="mb-4">Create New Employee</h2>
      <form onSubmit={handleSubmit} className="card p-4">
        <div className="row">
          <div className="col-md-6 col-sm-12 mb-3">
            <label>First Name</label>
            <input
              type="text"
              name="FirstName"
              className={`form-control ${errors.FirstName ? 'is-invalid' : ''}`}
              placeholder="First Name"
              onChange={handleInputChange}
            />
            {errors.FirstName && <div className="invalid-feedback">{errors.FirstName}</div>}
          </div>
          <div className="col-md-6 col-sm-12 mb-3">
            <label>Last Name</label>
            <input
              type="text"
              name="LastName"
              className={`form-control ${errors.LastName ? 'is-invalid' : ''}`}
              placeholder="Last Name"
              onChange={handleInputChange}
            />
            {errors.LastName && <div className="invalid-feedback">{errors.LastName}</div>}
          </div>
        </div>
 
        <div className="row">
          <div className="col-md-6 col-sm-12 mb-3">
            <label>Age</label>
            <input
              type="number"
              name="Age"
              className={`form-control ${errors.Age ? 'is-invalid' : ''}`}
              placeholder="Age"
              min="20"
              max="70"
              onChange={handleInputChange}
            />
            {errors.Age && <div className="invalid-feedback">{errors.Age}</div>}
          </div>
          <div className="col-md-6 col-sm-12 mb-3">
            <label>Date of Joining</label>
            <input
              type="date"
              name="DateOfJoining"
              className={`form-control ${errors.DateOfJoining ? 'is-invalid' : ''}`}
              onChange={handleInputChange}
            />
            {errors.DateOfJoining && <div className="invalid-feedback">{errors.DateOfJoining}</div>}
          </div>
        </div>
 
        <div className="row">
          <div className="col-md-6 col-sm-12 mb-3">
            <label>Title</label>
            <select
              name="Title"
              className="form-select"
              onChange={handleInputChange}
            >
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="VP">VP</option>
            </select>
          </div>
          <div className="col-md-6 col-sm-12 mb-3">
            <label>Department</label>
            <select
              name="Department"
              className="form-select"
              onChange={handleInputChange}
            >
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>
        </div>
 
        <div className="row">
          <div className="col-md-6 col-sm-12 mb-4">
            <label>Employee Type</label>
            <select
              name="EmployeeType"
              className="form-select"
              onChange={handleInputChange}
            >
              <option value="FullTime">FullTime</option>
              <option value="PartTime">PartTime</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </select>
          </div>
        </div>
 
        <button type="submit" className="btn btn-primary">
          Create Employee
        </button>
      </form>
    </div>
  );
}
 
export default EmployeeCreate;
