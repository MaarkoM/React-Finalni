import React, {useContext} from "react";
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import Icon from "../assets/profileIcon.png"
import "./LogOff.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const LogOff = () =>{
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOff = async () => {
        await logout();
        navigate('/');
      };

    return(
        <>
        <div className="wrapperLogOff wrapper">
            <Link to="/Home"><FontAwesomeIcon icon={faArrowLeft} className="logOffBack"/>
            </Link>
            <div className="userWrap container">
            <div className="userIcon"> <img src={Icon} alt="dontGo"  /></div>
            <div className="userName text">Hello {user?.username ? user?.username : "Stranger"} !</div>
            <div className="underline"></div>
            <div className="emailWrap">
            <FontAwesomeIcon icon={faEnvelope} className="iconEmail"/>
            <div className="userEmail">{user?.email ? user?.email : "Email Missing"}</div>
            </div>
            <div className="LogOffBtnWrap">
                {user?.username ? <button className={user?.username ? "logOffBtn accBtn" : "logOffDisabled"}  onClick={handleLogOff}>Log Off</button> : 
                <Link to="/" className="logOffLogIn"><button className="logOffBtn accBtn">Login</button></Link>}
            </div>
            </div>
            {/* <div className="dontGoIcon">
               
            </div> */}
            
        </div>
        </>
    );
};

export default LogOff;