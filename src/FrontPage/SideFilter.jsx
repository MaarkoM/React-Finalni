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
        <div className="country">
          <h3>Countries</h3>
          <DropdownButton id="dropdown-basic-button" title={action}>
            <Dropdown.Item href="#/action-1" onClick={()=>{setAction("Serbia - Belgrade")}}>Serbia - Belgrade</Dropdown.Item>
            <Dropdown.Item href="#/action-2" onClick={()=>{setAction("Montenegro - Podgorica")}}>Montenegro - Podgorica</Dropdown.Item>
            <Dropdown.Item href="#/action-3" onClick={()=>{setAction("Bosnia - Sarajevo")}}>Bosnia - Sarajevo</Dropdown.Item>
            <Dropdown.Item href="#/action-4" onClick={()=>{setAction("Romania - Bucharest")}}>Romania - Bucharest</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="popularFilter">
          <h3>Popular Filters</h3>
          <input type="checkbox" name="freeWifi" id="freeWifi" />
          <label htmlFor="freeWifi">Free Wifi</label>
          <input type="checkbox" name="freeWifi" id="freeWifi" />
          <label htmlFor="freeWifi">Free Wifi</label>
        </div>
      </div>
    </>
  );
};

export default SideFilter;
