import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h3>
            {employee.FirstName} {employee.LastName}
          </h3>
        </div>
        <div className="card-body">
          {isEditing ? (
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Title</label>
                  <select
                    name="Title"
                    className="form-select"
                    value={formData.Title}
                    onChange={handleInputChange}
                  >
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="Director">Director</option>
                    <option value="VP">VP</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Department</label>
                  <select
                    name="Department"
                    className="form-select"
                    value={formData.Department}
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
                <div className="col-md-6 mb-3">
                  <label>Status</label>
                  <select
                    name="CurrentStatus"
                    className="form-select"
                    value={formData.CurrentStatus.toString()}
                    onChange={handleInputChange}
                  >
                    <option value="true">Working</option>
                    <option value="false">Retired</option>
                  </select>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-success me-2"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </form>
          ) : (
            <div>
              <p>
                <strong>First Name:</strong> {employee.FirstName}
              </p>
              <p>
                <strong>Last Name:</strong> {employee.LastName}
              </p>
              <p>
                <strong>Age:</strong> {employee.Age}
              </p>
              <p>
                <strong>Date of Joining:</strong>{' '}
                {new Date(employee.DateOfJoining).toLocaleDateString()}
              </p>
              <p>
                <strong>Title:</strong> {employee.Title}
              </p>
              <p>
                <strong>Department:</strong> {employee.Department}
              </p>
              <p>
                <strong>Employee Type:</strong> {employee.EmployeeType}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                {employee.CurrentStatus ? 'Working' : 'Retired'}
              </p>
              <div className="d-flex justify-content-between">
                <button className="btn btn-warning" onClick={handleEdit}>
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="card-footer text-center">
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Back to Employee List
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this employee?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Yes, Delete
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
