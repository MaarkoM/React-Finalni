import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import LoginSignUp from './Account/LoginSignUp.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './Error/ErrorPage.jsx';
import './index.css';
import AuthProvider from './Account/AuthContext.jsx'; // Import the AuthProvider
import AboutUs from './About/AboutUs.jsx';
import Apartment from './FrontPage/Apartment.jsx';

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
  },
  {
    path: '/AboutUs',
    element: <AboutUs />,
    errorElement: <ErrorPage />
  },
  {
    path: '/Apartment/:id',
    element: <Apartment />,
    errorElement: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> 
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);