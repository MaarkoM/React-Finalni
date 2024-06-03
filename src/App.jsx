import GuestApp from "./FrontPage/GuestApp";
import Header from "./FrontPage/Header";
import SideFilter from "./FrontPage/SideFilter";
import {React, useState} from "react";
import HostApp from "./FrontPage/HostApp";

function App() {
  const [filters, setFilters] = useState({});
  const [action, setAction] = useState("Guest");

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Header setAction={setAction}></Header> 
      
      {action === "Guest" ? (
        <>
      <SideFilter onFiltersChange={handleFiltersChange}></SideFilter>
        <GuestApp filters={filters}></GuestApp>
        </>
      ) : (
        <HostApp filters={filters}></HostApp> 
      )}
      
    </>
  );
}

export default App;
