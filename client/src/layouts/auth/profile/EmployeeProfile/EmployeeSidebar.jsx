import React from "react";
import { Link } from "react-router-dom";
import classes from "./EmployeeSidebar.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../../../store/auth-slice";
import { useSelector } from "react-redux";

const EmployeeSidebar = ({ activepage }) => {
  const employeeDetails = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  return (
    <div className={classes.usersidebar}>
      {employeeDetails.role === "Manager" && (
        <>
          {activepage === "manageEmployees" ? (
            <div className={classes.s2}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Manage Employees</span>
            </div>
          ) : (
            <Link
              to="/auth/employee/manageEmployees"
              className={classes.stylenone}
            >
              <div className={classes.s1}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Manage Employees</span>
              </div>
            </Link>
          )}
        </>
      )}
      {activepage === "accountsettings" ? (
        <div className={classes.s2}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>Account Settings</span>
        </div>
      ) : (
        <Link to="/auth/employee/accountsettings" className={classes.stylenone}>
          <div className={classes.s1}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Account Settings</span>
          </div>
        </Link>
      )}
      {employeeDetails.specialization === "orders" && (
        <>
          {activepage === "Muiorders" ? (
            <div className={classes.s2}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <span>Orders</span>
            </div>
          ) : (
            <Link to="/auth/employee/Muiorders" className={classes.stylenone}>
              <div className={classes.s1}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>

                <span>Material UI Orders</span>
              </div>
            </Link>
          )}
        </>
      )}

      {/* end */}

      {employeeDetails.specialization === "appointments" && (
        <>
          {activepage === "yourappointments" ? (
            <div className={classes.s2}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <span>Appointments</span>
            </div>
          ) : (
            <Link
              to="/auth/employee/appointments"
              className={classes.stylenone}
            >
              <div className={classes.s1}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span>Appointments</span>
              </div>
            </Link>
          )}
        </>
      )}

      {activepage === "statistics" ? (
        <div className={classes.s2}>
          <svg
            fill="#000000"
            height="800px"
            width="800px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 459.75 459.75"
            xmlSpace="preserve"
          >
            <g>
              <path
                d="M447.652,304.13h-40.138c-6.681,0-12.097,5.416-12.097,12.097v95.805c0,6.681,5.416,12.098,12.097,12.098h40.138
		c6.681,0,12.098-5.416,12.098-12.098v-95.805C459.75,309.546,454.334,304.13,447.652,304.13z"
              />
              <path
                d="M348.798,258.13H308.66c-6.681,0-12.098,5.416-12.098,12.097v141.805c0,6.681,5.416,12.098,12.098,12.098h40.138
		c6.681,0,12.097-5.416,12.097-12.098V270.228C360.896,263.546,355.48,258.13,348.798,258.13z"
              />
              <path
                d="M151.09,304.13h-40.138c-6.681,0-12.097,5.416-12.097,12.097v95.805c0,6.681,5.416,12.098,12.097,12.098h40.138
		c6.681,0,12.098-5.416,12.098-12.098v-95.805C163.188,309.546,157.771,304.13,151.09,304.13z"
              />
              <path
                d="M52.236,258.13H12.098C5.416,258.13,0,263.546,0,270.228v141.805c0,6.681,5.416,12.098,12.098,12.098h40.138
		c6.681,0,12.097-5.416,12.097-12.098V270.228C64.333,263.546,58.917,258.13,52.236,258.13z"
              />
              <path
                d="M249.944,196.968h-40.138c-6.681,0-12.098,5.416-12.098,12.098v202.967c0,6.681,5.416,12.098,12.098,12.098h40.138
		c6.681,0,12.098-5.416,12.098-12.098V209.066C262.042,202.384,256.625,196.968,249.944,196.968z"
              />
              <path
                d="M436.869,244.62c8.14,0,15-6.633,15-15v-48.479c0-8.284-6.716-15-15-15c-8.284,0-15,6.716-15,15v12.119L269.52,40.044
		c-3.148-3.165-7.536-4.767-11.989-4.362c-4.446,0.403-8.482,2.765-11.011,6.445L131.745,209.185L30.942,144.969
		c-6.987-4.451-16.26-2.396-20.71,4.592c-4.451,6.987-2.396,16.259,4.592,20.71l113.021,72c2.495,1.589,5.286,2.351,8.046,2.351
		c4.783,0,9.475-2.285,12.376-6.507L261.003,74.025L400.8,214.62h-12.41c-8.284,0-15,6.716-15,15c0,8.284,6.716,15,15,15
		c6.71,0,41.649,0,48.443,0H436.869z"
              />
            </g>
          </svg>
          <span>Statistics</span>
        </div>
      ) : (
        <Link to="/auth/employee/statistics" className={classes.stylenone}>
          <div className={classes.s1}>
            <svg
              fill="#000000"
              height="800px"
              width="800px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 459.75 459.75"
              xmlSpace="preserve"
            >
              <g>
                <path
                  d="M447.652,304.13h-40.138c-6.681,0-12.097,5.416-12.097,12.097v95.805c0,6.681,5.416,12.098,12.097,12.098h40.138
		c6.681,0,12.098-5.416,12.098-12.098v-95.805C459.75,309.546,454.334,304.13,447.652,304.13z"
                />
                <path
                  d="M348.798,258.13H308.66c-6.681,0-12.098,5.416-12.098,12.097v141.805c0,6.681,5.416,12.098,12.098,12.098h40.138
		c6.681,0,12.097-5.416,12.097-12.098V270.228C360.896,263.546,355.48,258.13,348.798,258.13z"
                />
                <path
                  d="M151.09,304.13h-40.138c-6.681,0-12.097,5.416-12.097,12.097v95.805c0,6.681,5.416,12.098,12.097,12.098h40.138
		c6.681,0,12.098-5.416,12.098-12.098v-95.805C163.188,309.546,157.771,304.13,151.09,304.13z"
                />
                <path
                  d="M52.236,258.13H12.098C5.416,258.13,0,263.546,0,270.228v141.805c0,6.681,5.416,12.098,12.098,12.098h40.138
		c6.681,0,12.097-5.416,12.097-12.098V270.228C64.333,263.546,58.917,258.13,52.236,258.13z"
                />
                <path
                  d="M249.944,196.968h-40.138c-6.681,0-12.098,5.416-12.098,12.098v202.967c0,6.681,5.416,12.098,12.098,12.098h40.138
		c6.681,0,12.098-5.416,12.098-12.098V209.066C262.042,202.384,256.625,196.968,249.944,196.968z"
                />
                <path
                  d="M436.869,244.62c8.14,0,15-6.633,15-15v-48.479c0-8.284-6.716-15-15-15c-8.284,0-15,6.716-15,15v12.119L269.52,40.044
		c-3.148-3.165-7.536-4.767-11.989-4.362c-4.446,0.403-8.482,2.765-11.011,6.445L131.745,209.185L30.942,144.969
		c-6.987-4.451-16.26-2.396-20.71,4.592c-4.451,6.987-2.396,16.259,4.592,20.71l113.021,72c2.495,1.589,5.286,2.351,8.046,2.351
		c4.783,0,9.475-2.285,12.376-6.507L261.003,74.025L400.8,214.62h-12.41c-8.284,0-15,6.716-15,15c0,8.284,6.716,15,15,15
		c6.71,0,41.649,0,48.443,0H436.869z"
                />
              </g>
            </svg>
            <span>Statistics</span>
          </div>
        </Link>
      )}
      <div className={classes.logoutContainer}>
        <button
          className={classes.logoutButton}
          onClick={() => {
            dispatch(authActions.logout());
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
