import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EmployeeSearch = ({ setEmployees }) => {
  const location = useLocation();
  const navigate = useNavigate(); // To programmatically change the URL
  const [selectedType, setSelectedType] = useState("");

  // Extract the "type" query parameter from the URL
  const type = new URLSearchParams(location.search).get("type") || "";

  // Update the selected dropdown value when the query parameter changes
  useEffect(() => {
    setSelectedType(type);
  }, [type]);

  // Fetch employees when "type" changes
  useEffect(() => {
    fetch("http://localhost:3001/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query ($type: String) {
            getEmployees(type: $type) {
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
        variables: { type: type || null },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          console.error("GraphQL Error:", data.errors);
          setEmployees([]);
        } else {
          setEmployees(data.data.getEmployees || []);
        }
      })
      .catch((err) => {
        console.error("Network Error:", err);
        setEmployees([]);
      });
  }, [type, setEmployees]);

  // Handle dropdown change and update the query parameter
  const handleTypeChange = (event) => {
    const newType = event.target.value;
    setSelectedType(newType);
    navigate(`?type=${newType}`); // Update the URL without reloading
  };

  return (
    <div className="mb-4">
      <h2>Filter Employees</h2>
      <select
        value={selectedType}
        onChange={handleTypeChange}
        className="form-select w-50 mx-auto"
      >
        <option value="">All</option>
        <option value="FullTime">Full-Time</option>
        <option value="PartTime">Part-Time</option>
        <option value="Contract">Contract</option>
        <option value="Seasonal">Seasonal</option>
      </select>
    </div>
  );
};

export default EmployeeSearch;
