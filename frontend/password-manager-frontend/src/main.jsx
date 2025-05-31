import {React,StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { useNavigate } from 'react-router-dom';

import GlobalProvider from '../store/index.jsx'

import './index.css'
import App from './Home/App.jsx'
import Dashboard from './Dashboard/Dashboard.jsx'
import Auth from './Login_Register/Auth.jsx'
import ProtectedView from './Dashboard/ProtectedView.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    element: <ProtectedView/>,
    children: [
      {
        path: '/dashboard',
        element:<Dashboard/>,
      },
    ]
  },
  {
    path:"/auth/",
    element: <Auth/>,
  }

])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
    </GlobalProvider>
  </StrictMode>,
)
