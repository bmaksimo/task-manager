import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, useParams } from 'react-router-dom';
import AddTask from './AddTask';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskView from './TaskView';
import './App.css';

function Tasks() {
  return (
    <div>
      <h1>Tasks</h1>
      <TaskList />
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
            <Route path="/add" element={<TaskForm />} />
            {/* <Route path="/task/:id" element={<TaskDetail />} /> */}
            <Route path="/task/:id" element={<TaskView />} />
            <Route path="/task/:id/edit" element={<TaskForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
