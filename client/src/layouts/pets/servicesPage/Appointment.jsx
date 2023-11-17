import { useState } from "react";

function AppointmentSection() {

const [pack, setPack] = useState('');
const [num, setNum] = useState('');
const [date, setDate] = useState('');
const [time, setTime] = useState('');

const SelectPack = (event) => {
  setPack(event.target.value);
}
const SelectNum = (event) => {
  setNum(event.target.value);
}
const SelectDate = (event) => {
  setDate(event.target.value);
}
const SelectTime = (event) => {
  setTime(event.target.value);
}
const SubmitHandler = (event) => {
    event.preventDefault();
    console.log(pack,num,date,time);
}

  return (
    <section className="appointment" id="appointment">
      <div className="appointment-content">
        <div className="section-title">
          <h1>Appointment</h1>
          <span>book at your convenience</span>
        </div>
        <div className="form-content">
          <form action="services/appointment" onSubmit={SubmitHandler}>
            <label htmlFor="selpack">Select the package you want: </label>
            <select name="selpack" id="selpack" onChange={SelectPack}>
              <option value="">Select package</option>
              <option value="299">BRONZE</option>
              <option value="499">SILVER</option>
              <option value="999">GOLD</option>
              <option value="1299">DIAMOND</option>
            </select>
            <br />
            <label htmlFor="selnum">Select the number of pets: </label>
            <input type="number" name="selnum" id="selnum" min="1" defaultValue="1" onChange={SelectNum}/>
            <br />
            <label htmlFor="seldate">Select the date of your appointment: </label>
            <input type="date" name="seldate" id="seldate" onChange={SelectDate}/>
            <br />
            <label htmlFor="seltime">Select the time of your appointment: </label>
            <input type="time" name="seltime" id="seltime" onChange={SelectTime}/>
            <br />
            <button type="submit" className="btn a-app">
              Confirm appointment
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AppointmentSection;
