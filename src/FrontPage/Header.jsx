import React, {useState} from "react";
import Logo from "../assets/BookingBuddy.png";
import { Link } from "react-router-dom";
import "../FrontPage/FrontPage.css";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Header = () => {

  const [action, setAction] = useState("Guest");

  return (
    <>
    <div className="headerContainer">
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="profileIconContainer">
      <FontAwesomeIcon icon={faCircleUser} className="profileIcon"/>
      </div>
    </div>
    <div className="switchContainer">
      {action==="Guest"?<div className="guest">
        <button className="displayBtn">Guest</button>
      </div>:<div className="guest">
        <button onClick={()=>{setAction("Guest")}}>Guest</button>
      </div>}
      {action==="Host"?<div className="host ">
        <button className="displayBtn">Host</button>
      </div>:<div className="host">
        <button onClick={()=>{setAction("Host")}}>Host</button>
      </div>}
    </div>
    </>
  );
};

export default Header;


