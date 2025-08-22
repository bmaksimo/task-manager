import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, useParams } from 'react-router-dom';
import AddTask from './AddTask';
import TaskList from './TaskList';
import './App.css';

function Tasks() {
  return (
    <div>
      <h1>Tasks</h1>
      <TaskList />
    </div>
  );
}

function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1>Task Details</h1>
      <p>Viewing task with ID: {id}</p>
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
            <Route path="/task/:id" element={<TaskDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
