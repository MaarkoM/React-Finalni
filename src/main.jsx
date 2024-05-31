import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import LoginSignUp from './Account/LoginSignUp.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './Error/ErrorPage.jsx';
import './index.css';
import AuthProvider from './Account/AuthContext.jsx'; // Import the AuthProvider

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
    <AuthProvider> {/* Wrap the RouterProvider with AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);