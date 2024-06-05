import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Logo from "../assets/header2.png";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import "./Apartment.css"

const Apartment = () => {
    const { id } = useParams();
    const [apartments, setApartments] = useState([]);
    const [currentApartmentIndex, setCurrentApartmentIndex] = useState(0);
    const [copyStatus, setCopyStatus] = useState(false); // To indicate if the text was copied
  
    useEffect(() => {
      fetch("https://mocki.io/v1/3c33edc4-460c-4f09-8b40-41d0a4fd14bd")
        .then((res) => res.json())
        .then((data) => {
          setApartments(data);
          const selectedIndex = data.findIndex((apartment) => apartment.id === parseInt(id));
          setCurrentApartmentIndex(selectedIndex);
        });
    }, [id]);
  
    const handleNextApartment = () => {
      if (currentApartmentIndex < apartments.length - 1) {
        setCurrentApartmentIndex(currentApartmentIndex + 1);
      }
    };
  
    const handlePreviousApartment = () => {
      if (currentApartmentIndex > 0) {
        setCurrentApartmentIndex(currentApartmentIndex - 1);
      }
    };

    const onCopyText = () => {
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000); 
    };
  
    if (apartments.length === 0) {
      return <div>Loading...</div>;
    }
  
    const apartment = apartments[currentApartmentIndex];
    const phoneNumber = "064-255-6236";
  
    return (
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
                <a href="https://www.instagram.com/mojsilovicmarko__" className="link Instagram">
                  Instagram
                </a>
              </li>
              <li className="list">
                <a href="https://www.linkedin.com/in/marko-mojsilovi%C4%87-a204592b2/" className="link LinkedIn">
                  LinkedIn
                </a>
              </li>
              <li className="list">
                <a href="https://github.com/MaarkoM/MarkoBoban-Projekat.git" className="link Github">
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
        <div className="apartmentDetail">
            
          <Link className="closeButton" to="/Home">X</Link>
          <div className="navigationButtons left">
          <button onClick={handlePreviousApartment} disabled={currentApartmentIndex === 0}><FontAwesomeIcon icon={faArrowLeft} /></button>
          </div>
          <img src={apartment.url} alt={apartment.title} className="signleApartmentImg" />
          <div className="signleApartmentContent">
            <h2 className="signleApartmentTitle">{apartment.title}</h2>
            <p className="signleApartmentDescription">{apartment.description}</p>
            <ul className="signleApartmentFeatures">
              <li>Free WiFi: {apartment.freeWifi ? "Yes" : "No"}</li>
              <li>Air Conditioning: {apartment.aircon ? "Yes" : "No"}</li>
              <li>Parking: {apartment.parking ? "Yes" : "No"}</li>
              <li>Pets Allowed: {apartment.pets ? "Yes" : "No"}</li>
              <li>Contact Info: <CopyToClipboard text={phoneNumber} onCopy={onCopyText}><span className="phoneNum">064-255-6236</span></CopyToClipboard>  </li>
            </ul>
          </div>
          {copyStatus && <div className="copy">Copied to clipboard!</div>}
          <div className="navigationButtons right">
            <button onClick={handleNextApartment} disabled={currentApartmentIndex === apartments.length - 1}><FontAwesomeIcon icon={faArrowRight} /></button>
          </div>
        </div>
      </>
    );
  };
  
  export default Apartment;