// import React from "react";
import "./vetcare.css";
import Background from "./Top";
import About from "./VetCareAbout";
import Service from "./VetCareSerivces";
import Gallery from "./VetCareGallary";
import Doctors from "./VetCareChose";
import AppointmentSection from "../servicesPage/Appointment";
import { vetCareInfo } from "./ourDoctors";

const VetCare = () => {
  return (
    <div className="vetcare">
      {/* <Background /> */}
      <About />
      <Service />
      <Gallery />
      <Doctors />
      <AppointmentSection page={vetCareInfo} AppointmentType="vetCare" />
    </div>
  );
};

export default VetCare;
