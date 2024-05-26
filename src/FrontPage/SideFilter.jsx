import {React, useState} from "react";
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import "../FrontPage/SideFilter.css";
import { act } from "react";

const SideFilter = () => {

    const [action, setAction] = useState("Select a country");

  return (
    <>
      <div className="filterContainer">
        <h3>Filter Bar:</h3>
        <div className="country">
          <h4>Countries</h4>
          <DropdownButton id="dropdown-basic-button" title={action}>
            <Dropdown.Item href="#/action-1" onClick={()=>{setAction("Serbia - Belgrade")}}>Serbia - Belgrade</Dropdown.Item>
            <Dropdown.Item href="#/action-2" onClick={()=>{setAction("Montenegro - Podgorica")}}>Montenegro - Podgorica</Dropdown.Item>
            <Dropdown.Item href="#/action-3" onClick={()=>{setAction("Bosnia - Sarajevo")}}>Bosnia - Sarajevo</Dropdown.Item>
            <Dropdown.Item href="#/action-4" onClick={()=>{setAction("Romania - Bucharest")}}>Romania - Bucharest</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="AllFilter">
          <h4 className="FilterTitle">Popular Filters</h4>
          <div className="popularFilter filterWrapper">
            <div className="filter filter1">
              <label htmlFor="freeWifi">Free Wifi</label>
          <input type="checkbox" name="freeWifi" id="freeWifi" className="checkBox"/>
          </div>
          <div className="filter filter2">
          <label htmlFor="aircon">Air conditioning</label>
          <input type="checkbox" name="aircon" id="aircon" className="checkBox"/>
          </div>
          <div className="filter filter3">
          <label htmlFor="parking">Parking</label>
          <input type="checkbox" name="parking" id="parking" className="checkBox"/>
          </div>
          <div className="filter filter4">
          <label htmlFor="pets">Pets allowed</label>
          <input type="checkbox" name="pets" id="pets" className="checkBox"/>
          </div>
          <div className="filter filter5">
          <label htmlFor="roomS">Room Service</label>
          <input type="checkbox" name="roomS" id="roomS" className="checkBox"/>
          </div>
          </div>
          <h4 className="FilterTitle pTypeTitle">Property Types</h4>
          <div className="pTypeFilter filterWrapper">
          <div className="filter filter6">
          <label htmlFor="hotel">Hotels</label>
          <input type="checkbox" name="hotel" id="hotel" className="checkBox"/>
          </div>
          <div className="filter filter7">
          <label htmlFor="apartment">Apartments</label>
          <input type="checkbox" name="apartment" id="apartment" className="checkBox"/>
          </div>
          <div className="filter filter8">
          <label htmlFor="villa">Villas</label>
          <input type="checkbox" name="villa" id="villa" className="checkBox"/>
          </div>
          <div className="filter filter9">
          <label htmlFor="holiday">Holiday Homes</label>
          <input type="checkbox" name="holiday" id="holiday"  className="checkBox"/>
          </div>
          </div>
          <h4 className="FilterTitle pRatingTitle">Property Rating</h4>
          <div className="pRatingFilter filterWrapper">
          <div className="filter filter10">
          <label htmlFor="2star">2 Stars</label>
          <input type="checkbox" name="2star" id="2star" className="checkBox"/>
          </div>
          <div className="filter filter11">
          <label htmlFor="3star">3 Stars</label>
          <input type="checkbox" name="3star" id="3star" className="checkBox"/>
          </div>
          <div className="filter filter12">
          <label htmlFor="4star">4 Stars</label>
          <input type="checkbox" name="4star" id="4star" className="checkBox"/>
          </div>
          <div className="filter filter13">
          <label htmlFor="5star">5 Stars</label>
          <input type="checkbox" name="5star" id="5star" className="checkBox"/>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideFilter;
