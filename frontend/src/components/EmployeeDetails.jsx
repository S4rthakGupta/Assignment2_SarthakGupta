import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Importing the CSS file from the style folder.
import "../style/EmployeeDetails.css";

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    Title: '',
    Department: '',
    CurrentStatus: true,
  });

  React.useEffect(() => {
    fetch('http://localhost:3001/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query getEmployees($id: ID!) {
            employee(id: $id) {
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
        variables: { id },
      }),
    })
      .then((res) => res.json())
      .then((data) => setEmployee(data.data.employee))
      .catch((error) => {
        console.error('Error fetching employee:', error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'CurrentStatus' ? value === 'true' : value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      Title: employee.Title,
      Department: employee.Department,
      CurrentStatus: employee.CurrentStatus,
    });
  };

  const handleSave = () => {
    fetch('http://localhost:3001/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation updateEmployee($id: ID!, $input: UpdateEmployeeInput!) {
            updateEmployee(id: $id, input: $input) {
              id
              Title
              Department
              CurrentStatus
            }
          }
        `,
        variables: { id, input: formData },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setEmployee({ ...employee, ...data.data.updateEmployee });
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error updating employee:', error);
      });
  };

  const handleDelete = () => {
    fetch('http://localhost:3001/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation deleteEmployee($id: ID!) {
            deleteEmployee(id: $id) {
              message
            }
          }
        `,
        variables: { id },
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setShowDeleteModal(false);
        navigate('/'); // Redirect after deletion
      })
      .catch((error) => {
        console.error('Error deleting employee:', error);
      });
  };

  if (!employee) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="employee-details-container">
      <div className="card">
        <div className="card-header">
          <h3>{employee.FirstName} {employee.LastName}</h3>
        </div>
        <div className="card-body">
          {isEditing ? (
            <form>
              <div className="form-group">
                <label>Title</label>
                <select
                  name="Title"
                  value={formData.Title}
                  onChange={handleInputChange}
                >
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                  <option value="Director">Director</option>
                  <option value="VP">VP</option>
                </select>
              </div>
              <div className="form-group">
                <label>Department</label>
                <select
                  name="Department"
                  value={formData.Department}
                  onChange={handleInputChange}
                >
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Engineering">Engineering</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="CurrentStatus"
                  value={formData.CurrentStatus.toString()}
                  onChange={handleInputChange}
                >
                  <option value="true">Working</option>
                  <option value="false">Retired</option>
                </select>
              </div>
              <div className="action-buttons">
                <button type="button" onClick={handleSave}>Save</button>
                <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
          ) : (
            <div className="employee-info">
              <p><strong>First Name:</strong> {employee.FirstName}</p>
              <p><strong>Last Name:</strong> {employee.LastName}</p>
              <p><strong>Age:</strong> {employee.Age}</p>
              <p><strong>Date of Joining:</strong> {new Date(employee.DateOfJoining).toLocaleDateString()}</p>
              <p><strong>Title:</strong> {employee.Title}</p>
              <p><strong>Department:</strong> {employee.Department}</p>
              <p><strong>Status:</strong> {employee.CurrentStatus ? 'Working' : 'Retired'}</p>
              <div className="action-buttons">
                <button onClick={handleEdit}>Edit</button>
                <button onClick={() => setShowDeleteModal(true)}>Delete</button>
              </div>
            </div>
          )}
        </div>
        <div className="card-footer">
          <button onClick={() => navigate('/')}>Back to Employee List</button>
        </div>
      </div>

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h5>Confirm Deletion</h5>
            <p>Are you sure you want to delete this employee?</p>
            <div className="modal-actions">
              <button onClick={handleDelete}>Yes, Delete</button>
              <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
