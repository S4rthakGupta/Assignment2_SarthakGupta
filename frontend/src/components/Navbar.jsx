import React from 'react';
import { Link } from 'react-router-dom';
import "../style/Navbar.css"; 

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-container">
      <Link className="navbar-brand" to="/">Employee Management System</Link>
      <div className="navbar-links">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/create">Add Employee</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
