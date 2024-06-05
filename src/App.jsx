import React, { useState } from 'react';
import GuestApp from "./FrontPage/GuestApp";
import Header from "./FrontPage/Header";
import SideFilter from "./FrontPage/SideFilter";
import HostApp from "./FrontPage/HostApp";
import { Route, Routes } from 'react-router-dom';
import LoginSignUp from './Account/LoginSignUp';
import AboutUs from './About/AboutUs';
import Apartment from './FrontPage/Apartment';
import ErrorPage from './Error/ErrorPage';
import LogOff from './Account/LogOff';

function App() {
  const [filters, setFilters] = useState({});
  const [action, setAction] = useState("Guest");
  const [username, setUsername] = useState('');

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };
  return (
    <>
      
      
      <Routes>
        <Route path="/Home" element={
          <>
            {action === "Guest" ? (
              <>
              <Header setAction={setAction} username={username} />
                <SideFilter onFiltersChange={handleFiltersChange} />
                <GuestApp filters={filters} />
              </>
            ) : (
              <>
              <Header setAction={setAction} username={username} />
              <HostApp filters={filters} />
              </>
            )}
          </>
        } />
        <Route path="/" element={<LoginSignUp setUsername={setUsername} />}  errorElement={<ErrorPage />}/>
        <Route path="/LogOff" element={<LogOff/>} errorElement={<ErrorPage />} />
        <Route path="/AboutUs" element={<AboutUs />} errorElement={<ErrorPage />}/>
        <Route path="/Apartment/:id" element={<Apartment />} errorElement={<ErrorPage />}/>
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </>
  );
}

export default App;