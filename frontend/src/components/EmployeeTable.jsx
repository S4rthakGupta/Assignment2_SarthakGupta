import React from "react";
import { Link } from "react-router-dom";
import "../style/EmployeeTable.css"; 

const EmployeeTable = ({ getEmployees = [] }) => {
  return (
    <div className="employee-table-container">
      <h2>Employee List</h2>
      <div className="table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Date of Joining</th>
              <th>Title</th>
              <th>Department</th>
              <th>Type</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {getEmployees.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-records">
                  No employees found.
                </td>
              </tr>
            ) : (
              getEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.FirstName}</td>
                  <td>{employee.LastName}</td>
                  <td>{employee.Age}</td>
                  <td>
                    {new Date(employee.DateOfJoining).toLocaleDateString()}
                  </td>
                  <td>{employee.Title}</td>
                  <td>{employee.Department}</td>
                  <td>{employee.EmployeeType}</td>
                  <td>{employee.CurrentStatus ? "Working" : "Retired"}</td>
                  <td>
                    <Link to={`/employee/${employee.id}`} className="details-link">
                      Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
