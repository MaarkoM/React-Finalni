import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./HostApp.css";

const HostApp = () => {
  const [apartments, setApartments] = useState([]);
  const [newApartment, setNewApartment] = useState({
    url: "",
    title: "",
    description: "",
  });
  const [showForm, setShowForm] = useState(false);

  const handleAddApartment = () => {
    if (!newApartment.url || !newApartment.description) {
      alert("Please fill in all fields");
      return;
    }

    setApartments([...apartments, newApartment]);

    setNewApartment({
      url: "",
      title: "",
      description: "",
    });

    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewApartment({
      ...newApartment,
      [name]: value,
    });
  };

  const handleRemoveApartment = (index) => {
    const updatedApartments = apartments.filter((_, i) => i !== index);
    setApartments(updatedApartments);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      setNewApartment({
        url: "",
        title:"",
        description: "",
      });
    }
  };

  return (
    <>
      <div className="hostWrap">
        {apartments.map((apartment, index) => (
          <div key={index} className="hostApartment">
            <div className="hostApartmentDetails">
            <img src={apartment.url} alt={apartment.description} className="hostImg"/>
            <h4 className="hostTitle">{apartment.title}</h4>
            <p className="hostDescription">{apartment.description}</p>
            <div className="removeWrap">
                <FontAwesomeIcon icon={faTrash} className="removeBtn" onClick={() => handleRemoveApartment(index)}/>
            </div>
            </div>
          </div>
        ))}
        <div className={`hostApartment addApartment ${showForm ? "active" : ""}`}>
          {showForm ? (
            <>
              <input
                type="text"
                name="url"
                placeholder="Image URL"
                value={newApartment.url}
                onChange={handleChange}
              />
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newApartment.title}
                onChange={handleChange}
              />
              <textarea
                name="description"
                placeholder="Description"
                value={newApartment.description}
                onChange={handleChange}
              />
              <div className="buttonGroup">
                <button className="backBtn" onClick={toggleForm}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button type="submit" className="submitApartment" onClick={handleAddApartment}>
                  Submit
                </button>
              </div>
            </>
          ) : (
            <div className="toggleFormBtn" onClick={toggleForm}>
              <FontAwesomeIcon icon={faPlus} className="addBtn"/>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HostApp;