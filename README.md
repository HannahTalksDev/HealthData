# Health Data

A Next.js application built with React 19 and TypeScript.

## Prerequisites

- Node.js (version specified in `.nvmrc`)
- npm

## Getting Started

### 1. Set up Node version

This project uses nvm to manage Node versions. Install the correct version:
```bash
nvm use
```

If you don't have the required version installed:
```bash
nvm install
```

### 2. Install dependencies
```bash
npm install
```


Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm test` - Run Jest tests
- `npm run format` - Format code with Prettier

## Code Quality

This project uses:

- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for Git hooks
- **lint-staged** for pre-commit checks

Code is automatically linted and formatted before each commit.

## Tech Stack

- **Framework:** Next.js 16
- **React:** 19.2.0
- **TypeScript:** 5
- **Testing:** Jest
- **Code Quality:** ESLint, Prettier