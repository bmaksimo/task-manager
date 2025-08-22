import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
  return (
    <>
      <div className="top-bar">
        <h1>Task Manager</h1>
      </div>
      <nav className="sidebar">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
              Tasks
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" className={({ isActive }) => isActive ? 'active' : ''}>
              Add Task
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;