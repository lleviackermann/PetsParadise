const Appointment =()=>{
    return(
        <section className="appointment" id="appointment">
      <div className="appointment-content">
        <div className="section-title">
          <h1 className="app">MAKE An Appointment Here</h1>
          <span>BOOK An Appointment Of Your Choice</span>
        </div>
        <div className="form-content">
          <form action="/vet-care/appointment" method="post">
            <label htmlFor="selpack" className="app-headings">Choose veterinarian<span className="star">*</span>:</label><br />
            <select name="selpack" id="sel-pack">
              <option value="Hemanth">Dr k.Hemanth</option>
              <option value="Ritika">Dr k.Ritika</option>
              <option value="Ramchander">Dr N.Ramchander Rao</option>
              <option value="Abhishek">Dr .Abhishek</option>
            </select>
            <br />
            <label htmlFor="selnum" className="app-headings">Select the number of pets <span className="star">*</span>:</label><br />
            <input type="number" name="selmun" id="sel-num" min="1" value="1" />
            <br />
            <label htmlFor="seldate" className="app-headings">Select a date for your appointment <span className="star">*</span>:</label><br />
            <input type="date" name="seldate" id="sel-date" />
            <br />
            <label htmlFor="seltime" className="app-headings">Select the time of your appointment <span className="star">*</span>:</label><br />
            <input type="time" name="seltime" id="sel-time" />
            <br />
            <button type="submit" className="a-app">BOOK Your appointment</button>
          </form>
        </div>
      </div>
    </section>
    );
}

export default Appointment;