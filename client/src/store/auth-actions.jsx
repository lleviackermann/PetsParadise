import { authActions } from "./auth-slice";
import { uiActions } from "./ui-slice";
const adminMailId = "admin101";
const adminMailPassword = "Admin@123";

export const sendReview = (prodId, userToken, review) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:8000/auth/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify({
        prodId,
        review,
      }),
    });
    const data = await response.json();
  };
};

export const changeOrderStatus = (option, orderId, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "http://localhost:8000/employee/updateOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            orderId: orderId,
            status: option === "accept" ? "Delivered" : "Cancelled",
          }),
        }
      );

      if (response.ok) {
      } else {
        console.error("Failed to update order");
      }
    } catch (error) {
      console.error("Error occurred while updating order:", error);
    }
  };
};
export const changeAppointmentStatus = (option, appId, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "http://localhost:8000/employee/updateAppointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            appId,
            status: option,
          }),
        }
      );

      if (response.ok) {
      } else {
        console.error("Failed to update order");
      }
    } catch (error) {
      console.error("Error occurred while updating order:", error);
    }
  };
};

export const loginUser = (mail, password) => {
  let flag = "User";
  return async (dispatch) => {
    if (mail === adminMailId) {
      flag = "Admin";
    }
    if (/^E\d{3}/.test(mail)) {
      flag = "Employee";
    }
    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flag: flag,
        userId: mail,
        password: password,
      }),
    });
    const data = await response.json();
    if (data.msg) {
      dispatch(
        uiActions.showNotification({
          notification: {
            status: "failure",
            title: "Login Failed",
            message: data.msg,
          },
        })
      );
    } else {
      if (flag === "User") {
        const { token, person, cart } = data;
        const user = {
          firstName: person.firstName,
          lastName: person.lastName,
          email: person.email,
          role: "User",
        };
        dispatch(
          uiActions.showNotification({
            notification: {
              status: "success",
              title: "Login Success",
              message: "Success",
            },
          })
        );
        dispatch(authActions.login({ token, user, cart }));
      }
      if (flag === "Admin") {
        const { person } = data;
        const user = {
          firstName: person.name,
          lastName: person.lastName,
          email: person.email,
          role: "Admin",
        };
        dispatch(authActions.login({ token: null, user, cart: null }));
      }
      if (flag === "Employee") {
        const { person } = data;
        console.log(person);
        const user = {
          firstName: person.name,
          lastName: " ",
          email: person.email,
          role: "Employee",
        };
        console.log(user);
        dispatch(authActions.login({ token: null, user, cart: null }));
      }
    }
    setTimeout(() => {
      dispatch(uiActions.removeNotification());
    }, 3000);
  };
};

export const registerUser = (firstName, lastName, mail, password) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:8000/auth/register/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: mail,
          password: password,
        }),
      });
      const data = await response.json();
      return data;
    };
    try {
      const res = await sendRequest();
      let message = "Something went wrong,try after sometime";
      if (res.error === "Duplicate") {
        message = "User Already Exists, Please Login to Continue";
      }
      if (res.error === "Duplicate") {
        dispatch(
          uiActions.showNotification({
            notification: {
              status: "failure",
              title: "Registration Failed",
              message: message,
            },
          })
        );
      }
      if (res.error === void 0) {
        dispatch(
          uiActions.showNotification({
            notification: {
              status: "success",
              title: "Registration Success",
              message: "Registration Success,login to continue",
            },
          })
        );
      }
    } catch (e) {
      dispatch(
        uiActions.showNotification({
          notification: {
            status: "failure",
            title: "Registration Failed",
            message: e.message,
          },
        })
      );
    }

    setTimeout(() => {
      dispatch(uiActions.removeNotification());
    }, 3000);
  };
};

export const verifyUser = () => {
  let flag = "User";
  return async (dispatch) => {
    if (mail === adminMailId && password === adminMailPassword) {
      flag = "Admin";
    }
    const response = await fetch(`http://localhost:8000/auth/login}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flag: flag,
        userId: mail,
        password: password,
      }),
    });
    const data = await response.json();
    const { token, person } = data;
    const user = {
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
    };
    console.log(token, user);
    dispatch(authActions.login({ token, user }));
  };
};

export const forgetPass = (mail, otpNo = 0, password = "") => {
  return async (dispatch) => {
    let message = "";
    if (otpNo == 0) {
      const response = await fetch(
        `http://localhost:8000/auth/forgotPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            flag: "User",
            email: mail,
          }),
        }
      );
      message = await response.json();
      if (message.status === "success") {
        dispatch(authActions.otpSent());
      }
    } else if (password === "") {
      const response = await fetch(`http://localhost:8000/auth/validateOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otpNumber: otpNo,
          email: mail,
        }),
      });
      message = await response.json();
      if (message.status === "success") {
        dispatch(authActions.otpVerified());
      }
    } else if (password !== "") {
      const response = await fetch(
        `http://localhost:8000/auth/changePassword`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
            email: mail,
            flag: "User",
          }),
        }
      );
      message = await response.json();
      if (message.status === "success") {
        dispatch(authActions.passwordChanged());
      }
    }
    if (message.status === "failure") {
      dispatch(authActions.otpVerificationFailure());
    }
    console.log(message);
    dispatch(uiActions.showNotification({ notification: message }));
    setTimeout(() => {
      dispatch(uiActions.removeNotification());
    }, 3000);
  };
};

export const resetPassword = (mail, oldPassword, newPassword) => {
  console.log(mail);
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8000/auth/resetPassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flag: "User",
        email: mail,
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
    });
    const message = await response.json();
    console.log(message);
    dispatch(uiActions.showNotification({ notification: message }));
    setTimeout(() => {
      dispatch(uiActions.removeNotification());
    }, 3000);
  };
};
