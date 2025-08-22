import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import AddTask from './AddTask';
import './App.css';

function Tasks() {
  return (
    <div>
      <h1>Tasks</h1>
      <p>Your tasks will be displayed here.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
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
        <main style={{ 
          marginLeft: '200px', 
          marginTop: '64px', 
          padding: '20px',
          minHeight: 'calc(100vh - 64px)'
        }}>
          <Routes>
            <Route path="/" element={<Tasks />} />
            <Route path="/add" element={<AddTask />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
