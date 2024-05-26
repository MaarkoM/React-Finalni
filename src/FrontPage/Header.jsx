import React, {useState} from "react";
import Logo from "../assets/header2.png";
import { Link } from "react-router-dom";
import "../FrontPage/Header.css";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {

  const [action, setAction] = useState("Guest");

  return (
    <>
    <div className="headerContainer">
      <div className="logo">
        <img src={Logo} alt="logo"/>
      </div>
      <div className="linkWrapper">
        <ul className="links">
          <li className="list"><Link className="link AboutMe">About Me</Link></li>
          <li className="list"><Link className="link AboutMe">Github</Link></li>
          <li className="list"><Link className="link AboutMe">LinkedIn</Link></li>
          <li className="list"><Link className="link AboutMe">Instagram</Link></li>
        </ul>
      </div>
      <div className="profileIconContainer">
      <FontAwesomeIcon icon={faCircleUser} className="profileIcon"/>
      </div>
    </div>
    <div className="switchContainer">
      {action==="Guest"?<div className="guest">
        <button className="displayBtn">Guest</button>
      </div>:<div className="guest">
        <button className="standbyBtn" onClick={()=>{setAction("Guest")}}>Guest</button>
      </div>}
      {action==="Host"?<div className="host ">
        <button className="displayBtn">Host</button>
      </div>:<div className="host">
        <button className="standbyBtn" onClick={()=>{setAction("Host")}}>Host</button>
      </div>}
    </div>
    </>
  );
};

export default Header;


