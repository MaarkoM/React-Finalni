import React from "react";
import Logo from "../assets/header2.png";
import Hero from "../assets/About1.jpg";
import Hero2 from "../assets/About3.jpg";
import Hero3 from "../assets/About4.jpg";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./AboutUs.css";

const AboutUs = () => {
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
              <Link
                to="https://www.instagram.com/mojsilovicmarko__"
                className="link Instagram"
              >
                Instagram
              </Link>
            </li>
            <li className="list">
              <Link
                to="https://www.linkedin.com/in/marko-mojsilovi%C4%87-a204592b2/"
                className="link LinkedIn"
              >
                LinkedIn
              </Link>
            </li>
            <li className="list">
              <Link
                to="https://github.com/MaarkoM/MarkoBoban-Projekat.git"
                className="link Github"
              >
                Other Project
              </Link>
            </li>
          </ul>
        </div>
        <div className="profileIconContainer">
          <Link to="/LoginSignUp">
            <FontAwesomeIcon
              icon={faCircleUser}
              className="profileIcon"
            ></FontAwesomeIcon>
          </Link>
        </div>
      </div>
      <div className="AboutUsContainer">
        <div className="heroWrap1">
          <img src={Hero} alt="hero img" className="hero" />
          <div className="textWrap1">
            <p className="text1">
              At ApartRelax Corporation, we believe in the transformative power
              of travel. We're not just another travel agency - we're curators
              of unforgettable experiences. Our passion lies in crafting
              journeys that transcend the ordinary, where every destination is a
              gateway to discovery.
            </p>
          </div>
        </div>
        <div className="heroWrap1">
          <div className="textWrap1">
            <p className="text1">
              Quality is at the heart of everything we do. Unlike mass tourism,
              we prioritize authenticity and immersion, ensuring each trip is
              meticulously planned to exceed expectations. From the moment you
              embark on one of our adventures, you'll discover a world where
              attention to detail and personalized service elevate every moment.
            </p>
          </div>
          <img src={Hero2} alt="hero img" className="hero" />
        </div>
        <div className="heroWrap1">
          <img src={Hero3} alt="hero img" className="hero" />
          <div className="textWrap1">
            <p className="text1">
              Whether you're seeking cultural enrichment, breathtaking
              landscapes, or simply a moment of tranquility and peace, our team is
              dedicated to curating tailor-made experiences that resonate with
              your desires. Because at ApartRelax, we believe that travel isn't
              just about the places you go - it's about the memories you create
              and the stories you'll cherish for a lifetime.
            </p>
          </div>
        </div>
      </div>
      <div className="AboutFooter">
        <Link to="/Home" className="FooterLink"><p className="FooterText">Embark on a journey with us, and let ApartRelax Corporation redefine the way you experience the world.</p></Link>
      </div>
    </>
  );
};

export default AboutUs;
