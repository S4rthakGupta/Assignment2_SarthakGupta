import React from 'react';
import { gql, useQuery } from '@apollo/client';
import '../style/EmployeeTable.css'; 

// GraphQL query to fetch employee data
const Employee_Data = gql`
  query {
    getEmployees {
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
`;

function EmployeeTable() {
    // Use Apollo Client's useQuery hook to fetch employee data
  const { loading, error, data } = useQuery(Employee_Data);

  if (loading) return <p>Database is Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  // Show a message if there are no employees in the database
  if (data.getEmployees.length === 0) {
    return (
      <div className="employee-table-container">
        <h2>Employee List</h2>
        <p className="no-records">No records are currently found in  the DB</p>
      </div>
    );
  }

  return (
    <div className="employee-table-container">
      <h2>Employee List</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Date of Joining</th>
            <th>Title</th>
            <th>Department</th>
            <th>Employee Type</th>
            <th>Current Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over the employee data and display each in a table row. */}
          {data.getEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.FirstName}</td>
              <td>{employee.LastName}</td>
              <td>{employee.Age}</td>
              <td>{new Date(employee.DateOfJoining).toISOString().split('T')[0]}</td>
              <td>{employee.Title}</td>
              <td>{employee.Department}</td>
              <td>{employee.EmployeeType}</td>
              <td>{employee.CurrentStatus ? 'Working' : 'Retired'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
