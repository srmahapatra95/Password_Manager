# Password Manager

A Personal Password Manager Application  
[GitHub Repository](https://github.com/srmahapatra95/Password_Manager)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Packages & Libraries](#packages--libraries)
- [Contributing](#contributing)
- [License](#license)

## Overview

Password Manager is a secure, personal password management application designed to help you store and organize your passwords efficiently. The project features both backend and frontend components, supporting modern web standards and encryption best practices.

## Features

- Secure password storage
- Password generation
- User authentication (login/signup)
- Organized vault for credentials
- Responsive web interface
- Encryption of sensitive data
- Easy-to-use UI

## Tech Stack

- **Frontend:** JavaScript, HTML, CSS (Located in `/frontend`)
- **Backend:** Python, JavaScript (Located in `/backend`)
- **Other:** Requirements listed in `requirement.txt`

## Project Structure

```
Password_Manager/
├── backend/         # Backend code (API, logic, authentication)
├── frontend/        # Frontend web application (UI/UX)
│   └── password-manager-frontend/
│       └── package.json
├── requirement.txt  # Python dependencies for backend
├── .gitignore
```

## Installation

### Prerequisites

- Node.js & npm (for frontend)
- Python 3.x (for backend)
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/srmahapatra95/Password_Manager.git
   cd Password_Manager
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r ../requirement.txt
   # Run backend server (specify main file here if needed)
   # python app.py
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend/password-manager-frontend
   npm install
   npm run dev
   ```

## Usage

- Access the application via your browser at `http://localhost:3000` (or configured port).
- Register or login to your account.
- Add, view, or generate secure passwords.

## Packages & Libraries

### Python (Backend)

Key dependencies (from `requirement.txt`):

- **Django** (`5.2.2`): Web framework for backend.
- **djangorestframework** (`3.16.0`): API toolkit for Django.
- **cryptography** (`3.4.8`): Cryptographic recipes and primitives.

_See the full list in [requirement.txt](https://github.com/srmahapatra95/Password_Manager/blob/main/requirement.txt)._

### JavaScript (Frontend)

Key dependencies (from `frontend/password-manager-frontend/package.json`):

- **React** (`^19.1.0`): UI library for building user interfaces.
- **React DOM** (`^19.1.0`): DOM bindings for React.
- **React Router / React Router DOM** (`^7.6.1`): Routing for React apps.
- **TailwindCSS** (`^4.1.8`): Utility-first CSS framework.
- **@tailwindcss/vite** (`^4.1.8`): Tailwind integration for Vite.
- **Vite** (`^6.3.5`): Frontend build tool.

_See the full list in [package.json](https://github.com/srmahapatra95/Password_Manager/blob/main/frontend/password-manager-frontend/package.json)._

## Contributing

Contributions are welcome!  
Please open issues or submit pull requests for features, bug fixes, or suggestions.
