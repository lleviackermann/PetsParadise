import { useState } from "react";
import servicesImages from "./servicesImages";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui-slice";

function AppointmentSection(props) {
  const [pack, setPack] = useState("");
  const [num, setNum] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const token = useSelector((state) => state.auth.userToken);
  const loggedIn = useSelector((state) => state.auth.userLoggedIn);
  const dispatch = useDispatch();

  const SelectPack = (event) => {
    setPack(event.target.value);
  };
  const SelectNum = (event) => {
    setNum(event.target.value);
  };
  const SelectDate = (event) => {
    setDate(event.target.value);
  };
  const SelectTime = (event) => {
    setTime(event.target.value);
  };
  const SubmitHandler = (event) => {
    event.preventDefault();
    if (!loggedIn) {
      dispatch(
        uiActions.showNotification({
          notification: {
            status: "failure",
            title: "User not logged In!",
            message: "Login to make an appointment",
          },
        })
      );
      setTimeout(() => {
        dispatch(uiActions.removeNotification());
      }, 3000);
      return;
    }

    if (pack === "" || num === "" || date === "" || time === "") {
      dispatch(
        uiActions.showNotification({
          notification: {
            status: "failure",
            title: "Incorrect format",
            message: "All fields are required",
          },
        })
      );
      setTimeout(() => {
        dispatch(uiActions.removeNotification());
      }, 3000);
      return;
    }
    const sendRequest = async () => {
      const response = await fetch(
        "http://localhost:8000/appointment/services",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            pack: pack,
            number: num,
            date: date,
            time: time,
            appointmentType: props.AppointmentType,
          }),
        }
      );
    };
    sendRequest();
    dispatch(
      uiActions.showNotification({
        notification: {
          status: "success",
          title: "Success",
          message: "Appointment is booked successfully",
        },
      })
    );
    setTimeout(() => {
      dispatch(uiActions.removeNotification());
    }, 3000);
  };

  return (
    <section className="appointment" id="appointment">
      <div className="appointment-content">
        <div className="section-title">
          <h1>Appointment</h1>
          <span>book at your convenience</span>
        </div>
        <div className="form-content">
          <form action="services/appointment" onSubmit={SubmitHandler}>
            <label htmlFor="selpack">
              Select the {props.page === servicesImages ? "package" : "doctor"}{" "}
              you want:
            </label>
            <select name="selpack" id="selpack" onChange={SelectPack}>
              {props.page.appointment.map((data) => (
                <option key={data.value} value={data.value}>
                  {data.name}
                </option>
              ))}
            </select>
            <br />
            <label htmlFor="selnum">Select the number of pets: </label>
            <input
              type="number"
              name="selnum"
              id="selnum"
              min="1"
              defaultValue="1"
              onChange={SelectNum}
            />
            <br />
            <label htmlFor="seldate">
              Select the date of your appointment:{" "}
            </label>
            <input
              type="date"
              name="seldate"
              id="seldate"
              onChange={SelectDate}
            />
            <br />
            <label htmlFor="seltime">
              Select the time of your appointment:{" "}
            </label>
            <input
              type="time"
              name="seltime"
              id="seltime"
              onChange={SelectTime}
            />
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
