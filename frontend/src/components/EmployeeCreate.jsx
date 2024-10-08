import React, { useState } from "react";
// Importing CSS from Employee Create.
import "../style/EmployeeCreate.css";

function EmployeeCreate() {
  const [employeeData, setEmployeeData] = useState({
    // State to manage form input data for new employee.
    FirstName: "",
    LastName: "",
    Age: "",
    DateOfJoining: "",
    Title: "Employee",
    Department: "IT",
    EmployeeType: "FullTime",
  });

  // State to manage validation error messages
  const [errors, setErrors] = useState({});

  // Handle input changes, update employeeData state.
  const onInput = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: name === "Age" ? parseInt(value, 10) : value,
    });
  };

  // Basic validation function to check input fields.
  const validateForm = () => {
    const newErrors = {};

    // Validation rules for each input field.
    if (!employeeData.FirstName)
      newErrors.FirstName = "Please enter First Name";
    if (!employeeData.LastName) newErrors.LastName = "Please enter Last Name";
    if (employeeData.Age < 20 || employeeData.Age > 70)
      newErrors.Age = "Age must be between 20 and 70";
    if (!employeeData.DateOfJoining)
      newErrors.DateOfJoining = "Please enter the Date of Joining";

    setErrors(newErrors);

    // Return true if no validation errors, false otherwise.
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission with validation and API call
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Send data to GraphQL server for new employee creation.
    const response = await fetch("http://localhost:3001/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      alert(
        "Employee has been created successfully and is registered in the DB."
      );
      // Refresh page after successful submission.
      window.location.reload();
    }
  };

  return (
    <div className="employee-create-container">
      <h2 className="employee-create-title">
        {" "}
        <i className="fas fa-user-plus"></i> Create New Employee
      </h2>
      <form onSubmit={onSubmit} className="employee-form">
        <div className="employee-form-row">
          <div className="employee-form-group">
            <label className="employee-label">First Name</label>
            <input
              type="text"
              name="FirstName"
              className={`employee-input ${
                errors.FirstName ? "employee-input-error" : ""
              }`}
              placeholder="Enter your First Name"
              onChange={onInput}
            />
            {errors.FirstName && (
              <div className="employee-error">{errors.FirstName}</div>
            )}
          </div>
          <div className="employee-form-group">
            <label className="employee-label">Last Name</label>
            <input
              type="text"
              name="LastName"
              className={`employee-input ${
                errors.LastName ? "employee-input-error" : ""
              }`}
              placeholder="Enter your Last Name"
              onChange={onInput}
            />
            {errors.LastName && (
              <div className="employee-error">{errors.LastName}</div>
            )}
          </div>
        </div>

        <div className="employee-form-row">
          <div className="employee-form-group">
            <label className="employee-label">Age</label>
            <input
              type="number"
              name="Age"
              className={`employee-input ${
                errors.Age ? "employee-input-error" : ""
              }`}
              placeholder="Enter your Age (20-70)"
              min="20"
              max="70"
              onChange={onInput}
            />
            {errors.Age && <div className="employee-error">{errors.Age}</div>}
          </div>
          <div className="employee-form-group">
            <label className="employee-label">Date of Joining</label>
            <input
              type="date"
              name="DateOfJoining"
              className={`employee-input ${
                errors.DateOfJoining ? "employee-input-error" : ""
              }`}
              onChange={onInput}
            />
            {errors.DateOfJoining && (
              <div className="employee-error">{errors.DateOfJoining}</div>
            )}
          </div>
        </div>

        <div className="employee-form-row">
          <div className="employee-form-group">
            <label className="employee-label">Title</label>
            <select name="Title" className="employee-select" onChange={onInput}>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="VP">VP</option>
            </select>
          </div>
          <div className="employee-form-group">
            <label className="employee-label">Department</label>
            <select
              name="Department"
              className="employee-select"
              onChange={onInput}
            >
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>
          <div className="employee-form-group">
            <label className="employee-label">Employee Type</label>
            <select
              name="EmployeeType"
              className="employee-select"
              onChange={onInput}
            >
              <option value="FullTime">Full Time</option>
              <option value="PartTime">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </select>
          </div>
        </div>

        <button type="submit" className="employee-submit-button">
          Create Employee
        </button>
      </form>
    </div>
  );
}

export default EmployeeCreate;
