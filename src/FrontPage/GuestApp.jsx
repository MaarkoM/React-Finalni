import {React, useState, useEffect} from 'react'
import '../FrontPage/GuestApp.css'

const GuestApp = () => {

    const[apartments,setApartments] = useState([]);
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

  return (
    <>
    {apartments.map((apartment)=>(
        <img key={apartment.id} src={apartment.url} alt={apartment.title} className='apartmentCard'/>
    ))}
    </>
  )
}

export default GuestApp;