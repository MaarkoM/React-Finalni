import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LoginSignUp from './Account/LoginSignUp.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './Error/ErrorPage.jsx'
import './index.css'

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
