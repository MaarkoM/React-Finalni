import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LoginSignUp from './Account/LoginSignUp.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './ErrorPage.jsx'
import './index.css'
import Apartment from './Apartment.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/LoginSignUp',
    element: <LoginSignUp />,
    errorElement: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
