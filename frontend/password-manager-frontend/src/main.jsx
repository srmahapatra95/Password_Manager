import {React,StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { ToastContextProvider } from '../contexts/ToastContext.jsx'
import GlobalProvider from '../store/index.jsx'

import './index.css'
import App from './Home/App.jsx'
import Dashboard from './Dashboard/Dashboard.jsx'
import ProtectedView from './Dashboard/ProtectedView.jsx';
import Settings from './Settings/Settings.jsx'


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
      {
        path:'/settings',
        children:[
            {
            index:true,
            element:<Settings/>,
          },
        ]
      }
    ]
  },

])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
      <ToastContextProvider>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
    </ToastContextProvider>
    </GlobalProvider>
  </StrictMode>,
)
