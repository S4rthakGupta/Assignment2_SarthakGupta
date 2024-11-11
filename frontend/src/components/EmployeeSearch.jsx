import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/EmployeeSearch.css"; // Import custom CSS for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"; //


const EmployeeSearch = ({ setEmployees }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("");

  const type = new URLSearchParams(location.search).get("type") || "";

  useEffect(() => {
    setSelectedType(type);
  }, [type]);

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

  const handleTypeChange = (event) => {
    const newType = event.target.value;
    setSelectedType(newType);
    navigate(`?type=${newType}`);
  };

  return (
    <div className="employee-search-container">
      <h2>Filter Employees</h2>
      <div className="dropdown-wrapper">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <select
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="">All</option>
          <option value="FullTime">Full-Time</option>
          <option value="PartTime">Part-Time</option>
          <option value="Contract">Contract</option>
          <option value="Seasonal">Seasonal</option>
        </select>
      </div>
    </div>
  );
};

export default EmployeeSearch;
