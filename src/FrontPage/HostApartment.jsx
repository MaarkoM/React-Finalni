import React, { useState } from "react";
import Logo from "../assets/header2.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import "./HostApartment.css"
// import { useHistory } from 'react-router-dom';

const HostApartment = ({ addHostApartment }) => {

    const [imageURL, setImageURL] = useState('');
    const [apartmentTitle, setApartmentTitle] = useState('');
    const [apartmentDescription, setApartmentDescription] = useState('');
    const [wifi, setWifi] = useState(false);
    const [airConditioning, setAirConditioning] = useState(false);
    const [parking, setParking] = useState(false);
    const [petsAllowed, setPetsAllowed] = useState(false);
    const [contactInfo, setContactInfo] = useState('');
    const navigate = useNavigate()
  
    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   const newApartment = {
    //     title: apartmentTitle,
    //     description: apartmentDescription,
    //     features: {
    //       wifi,
    //       airConditioning,
    //       parking,
    //       petsAllowed,
    //     },
    //     contactInfo,
    //   };
    //   addHostApartment(newApartment);
    //   navigate(`/HostApartmentShow/${new Date().getTime()}`);
    // };

    const handleSubmit = (e) => {
      e.preventDefault();
      const newApartment = [
        imageURL,
        apartmentTitle,
        apartmentDescription,
          wifi,
          airConditioning,
          parking,
          petsAllowed,
          contactInfo,
      ];
      addHostApartment(newApartment);
      navigate('/HostApartmentShow');
    };
    

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
      {/* <div className="createApartmentTitle">
      <h2>Create Your Apartment!</h2>
      </div> */}
      <div className="apartmentDetail hostApartmentDetail">
            
      <form onSubmit={handleSubmit} className="hostForm">
        <div className="hostFormWrap">
        <div className="createApartmentTitle">
      <h2>Create Your Apartment!</h2>
      </div>
        <div className="hostUrlDiv">
      <label >
          Image URL:
          <input
            type="url"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
          </label>
          </div>
          <div className="hostTitleDiv">
        <label>
          Title:
          <input
            type="text"
            value={apartmentTitle}
            onChange={(e) => setApartmentTitle(e.target.value)}
          />
        </label>
        </div>
        <div className="hostDescDiv">
        <label>
          Description:
          <textarea
            value={apartmentDescription}
            onChange={(e) => setApartmentDescription(e.target.value)}
          />
        </label>
        </div>
        <div className="HostFilters">
            <div className="hostFilterWiFi">
        <label>
          Free WiFi:
          <input
            type="checkbox"
            checked={wifi}
            onChange={(e) => setWifi(e.target.checked)}
          />
        </label>
        </div>
        <div className="hostFilterAircon">
        <label>
          Air Conditioning:
          <input
            type="checkbox"
            checked={airConditioning}
            onChange={(e) => setAirConditioning(e.target.checked)}
          />
        </label>
        </div>
        <div className="hostFilterParking">
        <label>
          Parking:
          <input
            type="checkbox"
            checked={parking}
            onChange={(e) => setParking(e.target.checked)}
          />
        </label>
        </div>
        <div className="hostFilterPet">
        <label>
          Pets Allowed:
          <input
            type="checkbox"
            checked={petsAllowed}
            onChange={(e) => setPetsAllowed(e.target.checked)}
          />
        </label>
        </div>
        <div className="hostFilterContactInfo">
        <label>
          Contact Info:
          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
          />
        </label>
        </div>
        </div>
        <button type="submit" className="hostSubmitApartment accBtn">Submit</button>
        </div>
      </form>
      </div>
    
    </>
  );
};

export default HostApartment;
