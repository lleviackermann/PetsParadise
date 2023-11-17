// import React from "react";
import './vetcare.css';
import Background  from './Top';
import About from './VetCareAbout';
import Service from './VetCareSerivces';
import Gallery from './VetCareGallary';
import Doctors from './VetCareChose';
import Appointment from './VetCareAppointment';

const VetCare = () => {
  return (
    <div className="vetcare">
    <Background/>
    <About/>        
    <Service/>
    <Gallery/>
    <Doctors/>
    <Appointment/> 
    </div>
      
  );
};

export default VetCare;
