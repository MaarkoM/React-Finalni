import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Dropdown, DropdownButton } from "react-bootstrap";
import "../FrontPage/SideFilter.css";

const SideFilter = ({ onFiltersChange }) => {
  const [action, setAction] = useState("Select a country");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filters, setFilters] = useState({
    freeWifi: false,
    aircon: false,
    parking: false,
    pets: false,
    roomS: false,
    apartment: false,
    villa: false,
    hotel: false,
    home: false,
    stars5: false,
    stars4: false,
    stars3: false,
    stars2: false,
    Serbia: false,
    Montenegro: false,
    Bosnia: false,
    Romania: false
  });

  const handleFilterChange = (filterName) => {
    filterName
    setFilters({
      ...filters,
      [filterName]: !filters[filterName]
    });
  };

  const handleCountrySelect = (country) => {
    if (country === "all") {
      setSelectedCountry(null);
      setAction("All Countries");
    } else {
      setSelectedCountry(country.key);
      setAction(country.name);
    }
  };

  const applyFilters = () => {
    const updatedFilters = {
      ...filters,
      Serbia: false,
      Montenegro: false,
      Bosnia: false,
      Romania: false,
      ...(selectedCountry && { [selectedCountry]: true })
    };

    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };
  return (
    <>
      <div className="filterContainer">
        <h3>Filter Bar:</h3>
        <div className="country">
          <h4>Countries</h4>
          <DropdownButton id="dropdown-basic-button" title={action}>
          <Dropdown.Item onClick={() => handleCountrySelect("all")}>
              All Countries
            </Dropdown.Item>
            {[
              { name: "Serbia - Belgrade", key: "Serbia" },
              { name: "Montenegro - Podgorica", key: "Montenegro" },
              { name: "Bosnia - Sarajevo", key: "Bosnia" },
              { name: "Romania - Bucharest", key: "Romania" }
            ].map((country, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => handleCountrySelect(country)}
              >
                {country.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
        <div className="AllFilter">
          <h4 className="FilterTitle">Popular Filters</h4>
          <div className="popularFilter filterWrapper">
            <div className="filter filter1">
              <label htmlFor="freeWifi">Free Wifi</label>
              <input type="checkbox" name="freeWifi" id="freeWifi" className="checkBox" onChange={() => handleFilterChange("freeWifi")} />
            </div>
            <div className="filter filter2">
              <label htmlFor="aircon">Air conditioning</label>
              <input type="checkbox" name="aircon" id="aircon" className="checkBox" onChange={() => handleFilterChange("aircon")} />
            </div>
            <div className="filter filter3">
              <label htmlFor="parking">Parking</label>
              <input type="checkbox" name="parking" id="parking" className="checkBox" onChange={() => handleFilterChange("parking")} />
            </div>
            <div className="filter filter4">
              <label htmlFor="pets">Pets allowed</label>
              <input type="checkbox" name="pets" id="pets" className="checkBox" onChange={() => handleFilterChange("pets")} />
            </div>
            <div className="filter filter5">
              <label htmlFor="roomS">Room Service</label>
              <input type="checkbox" name="roomS" id="roomS" className="checkBox" onChange={() => handleFilterChange("roomS")} />
            </div>
          </div>
          <h4 className="pTypeTitle">Property Type</h4>
          <div className="pTypeFilter filterWrapper">
          <div className="filter filter6">
              <label htmlFor="apartment">Apartments</label>
              <input type="checkbox" name="apartment" id="apartment" className="checkBox" onChange={() => handleFilterChange("apartment")} />
            </div>
            <div className="filter filter7">
              <label htmlFor="villa">Villas</label>
              <input type="checkbox" name="villa" id="villa" className="checkBox" onChange={() => handleFilterChange("villa")} />
            </div>
            <div className="filter filter8">
              <label htmlFor="hotel">Hotels</label>
              <input type="checkbox" name="hotel" id="hotel" className="checkBox" onChange={() => handleFilterChange("hotel")} />
            </div>
            <div className="filter filter9">
              <label htmlFor="home">Holiday Homes</label>
              <input type="checkbox" name="home" id="home" className="checkBox" onChange={() => handleFilterChange("home")} />
            </div>
          </div>
          <h4 className="pRatingTitle">Property Rating</h4>
          <div className="pRatingFilter filterWrapper">
          <div className="filter filter10">
              <label htmlFor="stars5">5 Stars</label>
              <input type="checkbox" name="stars5" id="stars5" className="checkBox" onChange={() => handleFilterChange("stars5")} />
            </div>
            <div className="filter filter11">
              <label htmlFor="stars4">4 Stars</label>
              <input type="checkbox" name="stars4" id="stars4" className="checkBox" onChange={() => handleFilterChange("stars4")} />
            </div>
            <div className="filter filter12">
              <label htmlFor="stars3">3 Stars</label>
              <input type="checkbox" name="stars3" id="stars3" className="checkBox" onChange={() => handleFilterChange("stars3")} />
            </div>
            <div className="filter filter13">
              <label htmlFor="stars2">2 Stars</label>
              <input type="checkbox" name="stars2" id="stars2" className="checkBox" onChange={() => handleFilterChange("stars2")} />
            </div>
          </div>
        </div>
        <button type="submit" className="submit submitFilter" onClick={applyFilters}>Apply Filters</button>
      </div>
    </>
  );
};

export default SideFilter;