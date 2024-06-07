import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./HostApp.css";
import { Link, useNavigate } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const HostApp = ({ apartments, setApartments }) => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleRemoveApartment = (index) => {
    const updatedApartments = apartments.filter((_, i) => i !== index);
    setApartments(updatedApartments);
  };

  const handleViewMore = () => {
    navigate("/HostApartmentShow");
  };
const obj = {};
  
useEffect(() => {
    
    if(apartments){
      console.log(apartments[0]);
      console.log(apartments.length);
    }
  }, [apartments]);


  if(apartments){
    apartments.forEach((value,index)=>obj[index] = value)
      console.log(obj);
      console.log(obj[0]);
  }

  

  return (
    <>
      <div className="hostWrap">
        {apartments && apartments.length > 0  ?  (
          //  Object.keys(obj).map((apartment, index) => (
            <>
            <div className="hostApartment">
              <div className="hostApartmentDetails">
                <img src={obj[0]} alt={obj[2]} className="hostImg" />
                <h4 className="hostTitle">{obj[1]}</h4>
                <p className="hostDescription">{obj[2]}</p>
                <div className="removeWrap">
                  <FontAwesomeIcon icon={faTrash} className="removeBtn" onClick={() => handleRemoveApartment(index)} />
                  <div className="viewMore" onClick={handleViewMore}>
                    <FontAwesomeIcon icon={faEye} className="viewMoreIcon" />
                    View More
                  </div>
                </div>
              </div>
            </div>
            <Link to="/HostApartment">
            <div className={`hostApartment addApartment ${showForm ? "active" : ""}`} onClick={toggleForm}>
              <div className="toggleFormBtn">
                <FontAwesomeIcon icon={faPlus} className="addBtn" />
              </div>
            </div>
          </Link>
          </>
          )
          
        : <Link to="/HostApartment">
        <div className={`hostApartment addApartment ${showForm ? "active" : ""}`} onClick={toggleForm}>
          <div className="toggleFormBtn">
            <FontAwesomeIcon icon={faPlus} className="addBtn" />
          </div>
        </div>
      </Link>}
      </div>
      
    </>
  );
};

export default HostApp;