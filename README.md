# Employee Management Application

A responsive React + Redux Toolkit employee management application built for the Frontend Developer Assignment.

## Features

- Employee list with Name, Email, Mobile and Country
- Search employee by ID
- Add, edit and delete employees
- Delete confirmation dialog
- Edit form pre-populated with existing employee data
- Country dropdown loaded from API
- Required-field, email and length validation
- Loading, error and empty states
- Redux Toolkit state management with async thunks
- Smart/Dumb component architecture
- Material UI responsive interface
- API calls through a dedicated service layer
- Unit tests for validation, service/API logic, Redux state and UI interactions
- Responsive table/card presentation for smaller screens

## Tech Stack

- React 19
- Redux Toolkit
- React Redux
- Material UI
- Vite
- Vitest
- React Testing Library

## API

Provided MockAPI endpoints are configured in `src/api/api.js`.

Countries:
`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country`

Employees:
`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee`

## Run locally in VS Code

Requirements: Node.js 18+ recommended.

```bash
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

## Run tests

```bash
npm test
```

For a production build:

```bash
npm run build
```

## Project structure

```text
src/
  api/              API/service layer
  app/              Redux store
  components/
    common/         Reusable UI components
    employee/       Employee dumb/presentational components
    layout/         App shell
  features/
    employees/      Employee Redux slice
    countries/      Country Redux slice
  pages/             Smart/container pages
  utils/             Validation and helpers
  test/              Test setup and unit tests
```

## Smart/Dumb architecture

`EmployeeManagementPage` is the smart/container component. It connects Redux state to the UI, dispatches CRUD/search actions and coordinates dialogs/forms.

Presentational components such as `EmployeeTable`, `EmployeeForm`, `SearchEmployee` and `ConfirmDialog` receive props and emit callbacks without owning application state.

## Notes

The API is a public mock API. If it becomes unavailable or rate-limited, the UI shows an error state rather than silently failing.
