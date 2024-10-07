import React from 'react';
import { gql, useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
 
const GET_EMPLOYEES = gql`
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
  const { loading, error, data } = useQuery(GET_EMPLOYEES);
 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
 
   // Check if employees array is empty
   if (data.getEmployees.length === 0) {
    return (
      <div>
        <h2 className="mb-4">Employee List</h2>
        <p className="alert alert-warning">No records found</p>
      </div>
    );
  }
 
  return (
    <div>
      <h2 className="mb-4">Employee List</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
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
          {data.getEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.FirstName}</td>
              <td>{employee.LastName}</td>
              <td>{employee.Age}</td>
              <td>{new Date(employee.DateOfJoining).toLocaleDateString()}</td>
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