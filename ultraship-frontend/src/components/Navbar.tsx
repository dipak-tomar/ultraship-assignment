import React, { useState } from 'react';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">UltraShip</div>
      
      {/* Horizontal Menu (Desktop) */}
      <ul className="navbar-links">
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#employees">Employees</a></li>
        <li><a href="#reports">Reports</a></li>
        <li><a href="#settings">Settings</a></li>
      </ul>

      {/* Hamburger Menu (Mobile/Tablet) */}
      <div className="navbar-hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <ul>
            <li><a href="#dashboard">Dashboard</a></li>
            <li>
              <span className="menu-header">Employees</span>
              <ul className="submenu">
                <li><a href="#list">All Employees</a></li>
                <li><a href="#add">Add New</a></li>
              </ul>
            </li>
            <li><a href="#reports">Reports</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
};
