# Password Manager

A full-stack personal password management application built with Django REST Framework and React.
[GitHub Repository](https://github.com/srmahapatra95/Password_Manager)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Packages & Libraries](#packages--libraries)
- [Contributing](#contributing)

## Overview

Password Manager is a secure, personal password management application that lets you store, organize, and encrypt your credentials. Each password entry is individually encrypted using Fernet symmetric encryption with a unique key, ensuring strong security for your sensitive data.

## Features

- User registration and token-based authentication
- Encrypted password storage with per-entry encryption keys
- Add, view, edit, and delete password entries
- Bulk delete for multiple entries
- On-demand password decryption
- Dark/Light theme toggle
- PIN-based lock screen for additional security
- Toast notifications for user feedback
- Responsive UI with tab-based navigation

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, React Router 7, TailwindCSS 4, Vite 6 |
| **Backend** | Django 5.2, Django REST Framework 3.16 |
| **Database** | SQLite3 |
| **Encryption** | Fernet (cryptography library) |
| **Icons** | lucide-react |
| **State Management** | React Context API with useReducer |

## Project Structure

```
Password_Manager/
├── backend/
│   ├── manage.py
│   ├── backend/                  # Django project configuration
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   └── backendapi/               # Main Django app
│       ├── models.py             # UserData, UserSettings models
│       ├── views.py              # API view classes
│       ├── serializers.py        # DRF serializers with encryption
│       └── urls.py               # API URL routing
├── frontend/
│   └── password-manager-frontend/
│       ├── src/
│       │   ├── main.jsx          # Entry point with routing
│       │   ├── Home/             # Landing page & Auth component
│       │   ├── Dashboard/        # Password vault UI
│       │   │   └── components/   # NavBar, DataList, AddData, etc.
│       │   ├── Settings/         # Theme, Profile, LockScreen
│       │   ├── Components/       # Shared components (Toast)
│       │   ├── store/            # Context API state management
│       │   ├── contexts/         # Toast notification context
│       │   ├── hooks/            # Custom hooks
│       │   └── utils/            # Utility functions
│       ├── package.json
│       └── vite.config.js
├── requirements.txt              # Python dependencies
├── start-backend.sh              # Backend startup script
├── start-frontend.sh             # Frontend startup script
├── .env                          # Environment variables
└── .gitignore
```

## Installation

### Prerequisites

- Python 3.x
- Node.js & npm
- Git

### Backend Setup

```bash
git clone https://github.com/srmahapatra95/Password_Manager.git
cd Password_Manager
pip install -r requirements.txt
cd backend
python manage.py migrate
python manage.py runserver
```

The backend runs at `http://localhost:8000`.

### Frontend Setup

```bash
cd frontend/password-manager-frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5174`.

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/register/` | Register a new user | No |
| GET | `/api/check-username-available/` | Check username availability | No |
| POST | `/api/login/` | Login and receive token | No |
| POST | `/api/is-authenticated-user/` | Verify authentication status | Yes |
| POST | `/api/logout/` | Logout and revoke token | Yes |
| POST | `/api/check-password/` | Verify user password | Yes |
| PATCH | `/api/check-password/` | Change user password | Yes |
| GET | `/api/get-user-settings/` | Get user settings | Yes |
| PATCH | `/api/set-user-settings/` | Update user settings | Yes |
| POST | `/api/check-pin/` | Verify lock screen PIN | Yes |
| GET | `/api/datalist/` | List all password entries | Yes |
| POST | `/api/add-data/` | Create a password entry | Yes |
| GET | `/api/data-detail/<id>/` | Get entry details | Yes |
| PATCH | `/api/data-detail/<id>/` | Update entry | Yes |
| DELETE | `/api/data-detail/<id>/` | Delete entry | Yes |
| DELETE | `/api/bulk-delete/` | Bulk delete entries | Yes |
| POST | `/api/show-password/` | Decrypt a password with key | Yes |

## Usage

1. Open the frontend in your browser at `http://localhost:5174`.
2. Register a new account or login with existing credentials.
3. Add password entries with service name, username, email, and password.
4. Each entry is encrypted with a unique key displayed upon creation — save this key.
5. Use the key to decrypt and view passwords on demand.
6. Configure theme and lock screen PIN in Settings.

## Packages & Libraries

### Python (Backend)

| Package | Version | Purpose |
|---------|---------|---------|
| Django | 5.2.10 | Web framework |
| djangorestframework | 3.16.1 | REST API toolkit |
| cryptography | 44.0.3 | Fernet encryption |
| django-cors-headers | 4.9.0 | CORS support |

Full list in [requirements.txt](requirements.txt).

### JavaScript (Frontend)

| Package | Version | Purpose |
|---------|---------|---------|
| React | 19.1.0 | UI library |
| React Router DOM | 7.6.1 | Client-side routing |
| TailwindCSS | 4.1.8 | Utility-first CSS |
| Vite | 6.3.5 | Build tool |
| lucide-react | 0.563.0 | Icon library |

Full list in [frontend/password-manager-frontend/package.json](frontend/password-manager-frontend/package.json).
