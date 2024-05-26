import {React, useState, useEffect} from 'react'
import '../FrontPage/GuestApp.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";

const GuestApp = () => {

    const[apartments,setApartments] = useState([]);
    const [seed, setSeed] = useState(1);

    useEffect(()=>{
        fetch('https://mocki.io/v1/63b929a3-1802-4ca0-82fc-66b599f30195')
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            console.log(data);
            setApartments(data);
        })
    }, []);

    const reset = () => {
      setSeed(Math.random());
  }

    let leva = document.querySelector(".levaStrelica");
    let desna = document.querySelector(".desnaStrelica");
    

    let brojacStr = 1;
    let brojacLeva = 0;
    let brojacDesna = 10;
    let klasaPr = false;
    let klasaDr = false;

  return (
    <>
    <div className='strelice'>
    <div className="levaStrelica unClick" >
      <FontAwesomeIcon icon={faAngleLeft}  onClick={()=>{
        if(brojacStr===2){
          reset
            brojacLeva = 10;
            brojacDesna = 20;
            brojacStr--
            if(klasaPr=true){
               leva.classList.remove("unClick"); 
               klasaPr=false
            }
        } else if(brojacStr===1){
          reset
            brojacLeva = 0;
            brojacDesna = 10;
            leva.classList.add("unClick");
            desna.classList.remove("unClick")
            klasaPr=true;
        } 
        }}/>
      </div>
      <div className="desnaStrelica">
      <FontAwesomeIcon icon={faAngleRight} onClick={()=>{
        reset
        if(brojacStr===1){
            brojacLeva = 10;
            brojacDesna = 20;
            brojacStr++;
            if(klasaDr=true){
                desna.classList.remove("unClick")
                klasaDr=false
            }
        } else if(brojacStr===2){
          reset
            brojacLeva = 20;
            brojacDesna = 30;
            desna.classList.add("unClick");
            leva.classList.remove("unClick");
            klasaDr = true;
        }
      }}/>
      </div>
      </div>
    <div className='GuestWrapper'>
    {apartments.slice(brojacLeva,brojacDesna).map((apartment)=>(
        <div className='apartmentCard'>
        <img key={apartment.id} src={apartment.url} alt={apartment.title} className='apartmentImg'/>
        <h4 key={seed}>{apartment.title}</h4>
        <p>This apartment isperfect for your long waited getaway! It covers every need and lets you focus on your relaxation. It is truly one of a kind experience a click away from you! </p>
        <button>View More!</button>
        </div>
    ))}
    </div>
    </>
  )
}

export default GuestApp;