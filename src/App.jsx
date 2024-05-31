import GuestApp from "./FrontPage/GuestApp";
import Header from "./FrontPage/Header";
import SideFilter from "./FrontPage/SideFilter";
import {React, useState} from "react";

function App() {
  const [filters, setFilters] = useState({});

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Header></Header>
      <SideFilter onFiltersChange={handleFiltersChange}></SideFilter>
      <GuestApp filters={filters}></GuestApp>
      
    </>
  );
}

export default App;
