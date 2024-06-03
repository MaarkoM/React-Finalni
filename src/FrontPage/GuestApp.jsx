import React, { useState, useEffect } from "react";
import "../FrontPage/GuestApp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const GuestApp = ({ filters }) => {
  const [apartments, setApartments] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [filteredApartments, setFilteredApartments] = useState([]);
  // const navigate = useNavigate();

  const fetchApartments = () => {
    fetch("https://mocki.io/v1/3c33edc4-460c-4f09-8b40-41d0a4fd14bd")
      .then((res) => res.json())
      .then((data) => {
        setApartments(data);
        setFilteredApartments(data);
      });
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  const handleLeftClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 10);
    }
  };

  const handleRightClick = () => {
    if (startIndex + 10 < filteredApartments.length) {
      setStartIndex(startIndex + 10);
    }
  };

  const handleFiltering = () => {
    let filtered = apartments.filter((apartment) => {
      return (
        (!filters.freeWifi || apartment.freeWifi) &&
        (!filters.aircon || apartment.aircon) &&
        (!filters.parking || apartment.parking) &&
        (!filters.pets || apartment.pets) &&
        (!filters.roomS || apartment.roomS) &&
        (!filters.apartment || apartment.apartment) &&
        (!filters.villa || apartment.villa) &&
        (!filters.hotel || apartment.hotel) &&
        (!filters.home || apartment.home) &&
        (!filters.stars5 || apartment.stars5) &&
        (!filters.stars4 || apartment.stars4) &&
        (!filters.stars3 || apartment.stars3) &&
        (!filters.stars2 || apartment.stars2) &&
        (!filters.Serbia || apartment.Serbia) &&
        (!filters.Montenegro || apartment.Montenegro ) &&
        (!filters.Bosnia || apartment.Bosnia) &&
        (!filters.Romania || apartment.Romania) 
      );
    });

    setFilteredApartments(filtered);
  };

  useEffect(() => {
    handleFiltering();
  }, [apartments, filters]);

  return (
    <>
      <div className="strelice">
        <div className={`levaStrelica ${startIndex === 0 ? "unClick" : ""}`}>
          <FontAwesomeIcon icon={faAngleLeft} onClick={handleLeftClick} />
        </div>
        <div
          className={`desnaStrelica ${
            startIndex + 10 >= filteredApartments.length ? "unClick" : ""
          }`}
        >
          <FontAwesomeIcon icon={faAngleRight} onClick={handleRightClick} />
        </div>
      </div>

      <div className="GuestWrapper">
        {filteredApartments
          .slice(startIndex, startIndex + 10)
          .map((apartment) => (
            <div className="apartmentCard" key={apartment.id}>
              <img
                src={apartment.url}
                alt={apartment.title}
                className="apartmentImg"
              />
              <h4>{apartment.title}</h4>
              <p>{apartment.description}</p>
              <Link to={`/Apartment/${apartment.id}`} className="viewMore">View More!</Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default GuestApp;
