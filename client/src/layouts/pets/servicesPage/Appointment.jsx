

function AppointmentSection() {
  return (
    <section className="appointment" id="appointment">
      <div className="appointment-content">
        <div className="section-title">
          <h1>Appointment</h1>
          <span>book at your convenience</span>
        </div>
        <div className="form-content">
          <form action="services/appointment" method="post">
            <label htmlFor="selpack">Select the package you want: </label>
            <select name="selpack" id="selpack">
              <option value="">Select package</option>
              <option value="299">BRONZE</option>
              <option value="499">SILVER</option>
              <option value="999">GOLD</option>
              <option value="1299">DIAMOND</option>
            </select>
            <br />
            <label htmlFor="selnum">Select the number of pets: </label>
            <input type="number" name="selnum" id="selnum" min="1" defaultValue="1" />
            <br />
            <label htmlFor="seldate">Select the date of your appointment: </label>
            <input type="date" name="seldate" id="seldate" />
            <br />
            <label htmlFor="seltime">Select the time of your appointment: </label>
            <input type="time" name="seltime" id="seltime" />
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
