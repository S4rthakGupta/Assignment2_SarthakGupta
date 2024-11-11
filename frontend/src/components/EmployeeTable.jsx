import React from "react";
import { Link } from "react-router-dom";

const EmployeeTable = ({ employees = [] }) => {
  return (
    <div className="table-container">
      <table>
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
          {employees.length === 0 ? (
            <tr>
              <td colSpan="9" className="no-data">
                No employees found.
              </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.FirstName}</td>
                <td>{employee.LastName}</td>
                <td>{employee.Age}</td>
                <td>{new Date(employee.DateOfJoining).toLocaleDateString()}</td>
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
  );
};

export default EmployeeTable;
