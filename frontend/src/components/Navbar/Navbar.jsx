// Navbar.js

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import './Navbar.css';

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);


  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <nav className="navbar">
      <div className="nav-item">
        {dropdownVisible && (
          <div className="dropdown">
            <div className="dropdown-item">
              <FontAwesomeIcon icon={faUser} color={"#5a8dee"} className="dropdown-icon" />
              <span>Hi there!</span>
            </div>
            <div className="dropdown-item" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} color={"#5a8dee"} className="dropdown-icon" />
              Logout
            </div>
          </div>
        )}
        <div className="nav-link" onClick={handleDropdownToggle}>
          <FontAwesomeIcon icon={faUser} color={"#5a8dee"} className="nav-icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
