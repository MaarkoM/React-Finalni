import GuestApp from "./FrontPage/GuestApp";
import Header from "./FrontPage/Header";
import SideFilter from "./FrontPage/SideFilter";
import {React, useState} from "react";

function App() {
  return (
    <>
      <Header></Header>
      <SideFilter></SideFilter>
      <GuestApp></GuestApp>
    </>
  );
}

export default App;
