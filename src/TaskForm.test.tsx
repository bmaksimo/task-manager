import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskForm from './TaskForm';

// Mock axios
jest.mock('axios');

// Mock react-router-dom
jest.mock('react-router-dom');

describe('TaskForm', () => {
  test('renders without crashing', () => {
    render(<TaskForm />);
    
    // Check if the form title is rendered
    expect(screen.getByText('Add New Task')).toBeInTheDocument();
    
    // Check if the title input field is rendered
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    
    // Check if the completed status select is rendered
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    
    // Check if Save and Cancel buttons are rendered
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });
});