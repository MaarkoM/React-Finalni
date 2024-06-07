import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/header2.png";
import "./HostApartmentShow.css"

    const HostApartmentShow = ({ apartments }) =>{

        useEffect(() => {
            console.log(url);
          }, [apartments]);

        if (!apartments) {
            return <div>No apartment to display.</div>;
          }

          const [url, title, description, wifi, airConditioning, parking, petsAllowed, contactInfo] = apartments;
    return(
        <>
        <div className="headerContainer">
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="linkWrapper">
          <ul className="links">
            <li className="list">
              <Link to="/Home" className="link Home">
                Home
              </Link>
            </li>
            <li className="list">
              <a
                href="https://www.instagram.com/mojsilovicmarko__"
                className="link Instagram"
              >
                Instagram
              </a>
            </li>
            <li className="list">
              <a
                href="https://www.linkedin.com/in/marko-mojsilovi%C4%87-a204592b2/"
                className="link LinkedIn"
              >
                LinkedIn
              </a>
            </li>
            <li className="list">
              <a
                href="https://github.com/MaarkoM/MarkoBoban-Projekat.git"
                className="link Github"
              >
                Other Project
              </a>
            </li>
          </ul>
        </div>
        <div className="profileIconContainer">
          <Link to="/LoginSignUp">
            <FontAwesomeIcon icon={faCircleUser} className="profileIcon" />
          </Link>
        </div>
      </div>
      <div className="apartmentDetail hostDetail">
        <Link className="closeButton" to="/Home">X</Link>
        <img src={url} alt={url} className="singleApartmentImg hostApartmentImg" />
        <div className="signleApartmentContent hostApartmentContent">
          <h2 className="singleApartmentTitle hostApartmentTitle">{title}</h2>
          <p className="singleApartmentDescription hostApartmentDescription">{description}</p>
          <ul className="singleApartmentFeatures hostApartmentFeatures">
            <li>Free WiFi: {wifi ? "Yes" : "No"}</li>
            <li>Air Conditioning: {airConditioning ? "Yes" : "No"}</li>
            <li>Parking: {parking ? "Yes" : "No"}</li>
            <li>Pets Allowed: {petsAllowed ? "Yes" : "No"}</li>
            <li>Contact Info: <span className="phoneNum">{contactInfo}</span></li>
          </ul>
        </div>
      </div>
        </>
    )
}

export default HostApartmentShow;