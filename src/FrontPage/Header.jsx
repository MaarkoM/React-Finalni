import React, {useState} from "react";
import Logo from "../assets/header2.png";
import { Link } from "react-router-dom";
import "../FrontPage/Header.css";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Header = ({setAction, username}) => {

  const [activeButton, setActiveButton] = useState("Guest");
  let br;
  const handleGuestClick = () => {
    setAction("Guest");
    setActiveButton("Guest");
  };

  const handleHostClick = () => {
    setAction("Host");
    setActiveButton("Host");
  };

  return (
    <>
    <div className="headerContainer">
      <div className="logo">
        <img src={Logo} alt="logo"/>
      </div>
      <div className="linkWrapper">
        <ul className="links">
          <li className="list"><Link to="/AboutUs" className="link AboutUs">About Us</Link></li>
          <li className="list"><Link to="https://www.instagram.com/mojsilovicmarko__" className="link Instagram">Instagram</Link></li>
          <li className="list"><Link to="https://www.linkedin.com/in/marko-mojsilovi%C4%87-a204592b2/" className="link LinkedIn">LinkedIn</Link></li>
          <li className="list"><Link to="https://github.com/MaarkoM/MarkoBoban-Projekat.git" className="link Github">Other Project</Link></li>
        </ul>
      </div>
      <div className="profileIconContainer">
      <Link to="/LogOff"><FontAwesomeIcon icon={faCircleUser} className="profileIcon"></FontAwesomeIcon></Link>
      </div>
    </div>
    {username && <div className="greeting">Hi, {username}!</div>}
    <div className="switchContainer">
    {activeButton === "Guest" ? (
          <div className="guest">
            <button className="displayBtn">Guest</button>
          </div>
        ) : (
          <div className="guest">
            <button className="standbyBtn" onClick={handleGuestClick}>
              Guest
            </button>
          </div>
        )}
        {activeButton === "Host" ? (
          <div className="host ">
            <button className="displayBtn">Host</button>
          </div>
        ) : (
          <div className="host">
            <button className="standbyBtn" onClick={handleHostClick}>
              Host
            </button>
          </div>
        )}
    </div>
    </>
  );
};

export default Header;


