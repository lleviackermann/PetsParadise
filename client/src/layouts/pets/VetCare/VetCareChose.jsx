import {doctors} from "./ourDoctors"
const Doctors =()=>{

    return (
        <div className="our-doctors">
      <h1>Our special doctors</h1>
      <div className="main-doctor">
        {doctors.map((doctor, index) => (
          <div className="inner-doctor" key={index}>
            <img src={doctor.imgSrc} />
            <div className="content">
              <p>
                {doctor.name}<br />
                {doctor.qualifications}<br />
                {doctor.experience}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
}
export default Doctors;