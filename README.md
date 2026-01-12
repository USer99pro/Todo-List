
# TodoList

A small, lightweight Todo application built with React and Vite.

## Configuration
- **Node:** Recommended Node.js v16 or newer.
- **Package manager:** npm (works with yarn/pnpm with equivalent commands).
- **Dev server port:** 5173 (Vite default). To change, set the `PORT` env var.

## Project Detail
- **Name:** TodoList
- **Description:** Simple todo app demonstrating add, edit, delete, and toggle-complete features using React + Vite.
- **Tech stack:** React, Vite, JavaScript (JSX), plain CSS.

## File Structure
Top-level layout of this repository:

- `index.html` - App entry HTML
- `package.json` - npm scripts & dependencies
- `vite.config.js` - Vite configuration
- `src/`
	- `main.jsx` - app bootstrap
	- `App.jsx` - main application component
	- `App.css` / `index.css` - global styles
	- `components/`
		- `TodoForm.jsx` - new/edit todo form
		- `TodoForm.css`
		- `TodoItem.jsx` - single todo item component
		- `TodoItem.css`
	- `assets/` - static assets

## Installation
Clone the repo and install dependencies:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Usage
- Open your browser at http://localhost:5173 (or the port shown in the terminal).

## Notes / Troubleshooting
- If editing todos does not work, check `src/components/TodoForm.jsx` and `src/components/TodoItem.jsx` for the edit flow and state handling.

