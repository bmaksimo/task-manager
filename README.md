# Task Manager

Task management application built with React, TypeScript, and Material-UI.

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd task-manager
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner in watch mode
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

##  Overview

### Task Management
- Create new tasks with a title and completion status
- Mark tasks as completed or incomplete
- Edit existing tasks
- View detailed information for individual tasks
- Delete task

### Testing
- Added test for TaskForm components using Jest and React Testing Library
- Mocked dependencies for isolated testing

## Development

### Running Tests
```bash
npm test
```

Tests include component rendering validation and form functionality verification.

### Building for Production
```bash
npm run build
```

This builds the app for production to the `build` folder with optimized bundles.

