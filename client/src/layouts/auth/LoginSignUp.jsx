import styles from "./Auth.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useInput from "../../hooks/use-Input";
import { registerUser, loginUser, forgetPass } from "../../store/auth-actions";
function LoginSignUp() {
  const [signIn, setSignIn] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);
  const otpSent = useSelector((state) => state.auth.otpSent);
  console.log(otpSent);
  useEffect(() => {
    if (otpSent === "no") {
      setSignIn(true);
      setForgotPassword(false);
    }
  }, [otpSent]);
  const dispatch = useDispatch();
  const {
    value: emailValue,
    isValid: emailValueIsValid,
    error: emailInputHasError,
    inputChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput("email");
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    error: firstNameInputHasError,
    inputChangeHandler: firstNameChangedHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
  } = useInput("name");
  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    error: LastNameInputHasError,
    inputChangeHandler: LastNameChangedHandler,
    inputBlurHandler: LastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput("name");
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    error: PasswordHasError,
    inputChangeHandler: passwordChangedHandler,
    inputBlurHandler: paswordBlurHandler,
    reset: resetPasswordInput,
  } = useInput("password");
  const [confirmPass, setConfirmPass] = useState("");
  const [otp, setOtp] = useState(0);
  let formIsValid = false;
  if (signIn && emailValueIsValid) {
    // && enteredPasswordIsValid
    // formIsValid = !forgotPassword || (forgotPassword ? true : false);
    // && enteredPassword === confirmPasss
    formIsValid = true;
  }

  if (
    !signIn &&
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    emailValueIsValid &&
    enteredPasswordIsValid
  ) {
    formIsValid = true;
  }
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!signIn) {
      dispatch(
        registerUser(
          enteredFirstName,
          enteredLastName,
          emailValue,
          enteredPassword
        )
      );
    }
    if (signIn && forgotPassword) {
      if (otpSent === "no" || otpSent === "failure") {
        dispatch(forgetPass(emailValue));
      } else if (otpSent === "yes") {
        dispatch(forgetPass(emailValue, otp.trim()));
      } else if (otpSent === "verified") {
        dispatch(forgetPass(emailValue, "verified", enteredPassword));
      }
      return;
    }
    if (signIn && !forgotPassword) {
      dispatch(loginUser(emailValue, enteredPassword));
    }
    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
    resetPasswordInput();
  };

  useEffect(() => {
    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
    resetPasswordInput();
  }, [signIn, forgotPassword]);
  return (
    <div className={styles.Container}>
      <div
        className={styles.SignUpContainer}
        style={
          !signIn
            ? { transform: "translateX(100%)", opacity: 1, zIndex: 5 }
            : null
        }
      >
        <form
          className={styles.Form}
          onSubmit={(event) => formSubmitHandler(event)}
        >
          <h1 className={styles.Title}>Create Account</h1>
          <input
            type="text"
            className={styles.Input}
            style={
              firstNameInputHasError
                ? { border: "1px solid #b40e0e", backgroundColor: "#fddddd" }
                : null
            }
            onChange={firstNameChangedHandler}
            onBlur={firstNameBlurHandler}
            placeholder="First Name"
            value={enteredFirstName}
          />
          <p
            style={{
              display: `${firstNameInputHasError ? "block" : "none"}`,
              fontSize: "0.7rem",
            }}
          >
            First Name must contain atleast 2 letters and should begin with a
            Uppercase
          </p>
          <input
            type="text"
            className={styles.Input}
            style={
              LastNameInputHasError
                ? { border: "1px solid #b40e0e", backgroundColor: "#fddddd" }
                : null
            }
            onChange={LastNameChangedHandler}
            onBlur={LastNameBlurHandler}
            placeholder="Last Name"
            value={enteredLastName}
          />
          <p
            style={{
              display: `${LastNameInputHasError ? "block" : "none"}`,
              fontSize: "0.7rem",
            }}
          >
            Last Name must contain atleast 2 letters and should begin with a
            Uppercase
          </p>

          <input
            type="email"
            className={styles.Input}
            style={
              emailInputHasError
                ? { border: "1px solid #b40e0e", backgroundColor: "#fddddd" }
                : null
            }
            onChange={emailChangedHandler}
            onBlur={emailBlurHandler}
            value={emailValue}
            placeholder="Email"
          />
          <p style={{ display: `${emailInputHasError ? "block" : "none"}` }}>
            email must include @
          </p>
          <input
            type="password"
            className={styles.Input}
            placeholder="Password"
            style={
              PasswordHasError
                ? { border: "1px solid #b40e0e", backgroundColor: "#fddddd" }
                : null
            }
            onChange={passwordChangedHandler}
            onBlur={paswordBlurHandler}
            value={enteredPassword}
          />
          <p
            style={{
              display: `${PasswordHasError ? "block" : "none"}`,
              fontSize: "0.7rem",
            }}
          >
            password must contain atleast 8 letters and should contain
            uppercase,lowercase,number
          </p>

          <button disabled={!formIsValid} className={styles.Button}>
            Sign Up
          </button>
        </form>
      </div>

      <div
        className={styles.SignInContainer}
        style={!signIn ? { transform: "translateX(100%)" } : null}
      >
        <form
          className={styles.Form}
          onSubmit={(event) => formSubmitHandler(event)}
        >
          <h1 className={styles.Title}>
            {!forgotPassword ? "Sign in" : "Forgot Password"}
          </h1>
          <input
            type="email"
            style={
              emailInputHasError || otpSent === "failure"
                ? { border: "1px solid #b40e0e", backgroundColor: "#fddddd" }
                : null
            }
            className={styles.Input}
            placeholder="Email"
            onChange={emailChangedHandler}
            onBlur={emailBlurHandler}
            value={emailValue}
          />
          {forgotPassword && otpSent === "yes" && (
            <input
              type="text"
              placeholder="Enter otp"
              className={styles.Input}
              onChange={(event) => setOtp(event.target.value)}
            />
          )}
          <p
            style={{
              display: `${emailInputHasError ? "block" : "none"}`,
              fontSize: "0.7rem",
            }}
          >
            email must include @
          </p>
          {(!forgotPassword || otpSent === "verified") && (
            <input
              type="password"
              className={styles.Input}
              style={
                PasswordHasError
                  ? { border: "1px solid #b40e0e", backgroundColor: "#fddddd" }
                  : null
              }
              onChange={passwordChangedHandler}
              onBlur={paswordBlurHandler}
              placeholder={!forgotPassword ? "Password" : "New Password"}
              value={enteredPassword}
            />
          )}
          <p
            style={{
              display: `${PasswordHasError ? "block" : "none"}`,
              fontSize: "0.7rem",
              width: "58%",
            }}
          >
            password must contain atleast 8 letters and should contain
            uppercase,lowercase,number
          </p>
          {otpSent === "verified" && (
            <input
              type="password"
              className={styles.Input}
              onChange={(event) => {
                setConfirmPass(event.target.value);
              }}
              // onBlur={paswordBlurHandler}
              style={
                confirmPass !== enteredPassword
                  ? { border: "1px solid #b40e0e", backgroundColor: "#fddddd" }
                  : null
              }
              placeholder={"Confirm Password"}
            />
          )}
          {!forgotPassword && (
            <a
              onClick={() => setForgotPassword(true)}
              className={styles.Anchor}
            >
              Forgot Your Password
            </a>
          )}

          {forgotPassword && (
            <a
              onClick={() => setForgotPassword(false)}
              className={styles.Anchor}
            >
              Remeber Details,Sign In
            </a>
          )}
          <button disabled={!formIsValid} className={styles.Button}>
            {!forgotPassword ? "Sign In" : "Submit"}
          </button>
        </form>
      </div>

      <div
        className={styles.OverlayContainer}
        style={!signIn ? { transform: "translateX(-100%)" } : null}
      >
        <div
          className={styles.Overlay}
          style={!signIn ? { transform: "translateX(50%)" } : null}
        >
          <div
            className={`${styles.LeftOverlayPanel} ${styles.OverlayPanel}`}
            style={!signIn ? { transform: "translateX(0)" } : null}
          >
            <h1 className={styles.Title}>Welcome Back!</h1>
            <p className={styles.Paragraph}>
              To keep connected with us please login with your personal info
            </p>
            <button
              className={`${styles.Button} ${styles.GhostButton}`}
              onClick={() => setSignIn(true)}
            >
              Sign In
            </button>
          </div>

          <div
            className={`${styles.RightOverlayPanel} ${styles.OverlayPanel}`}
            style={!signIn ? { transform: "translateX(20%)" } : null}
          >
            <h1 className={styles.Title}>Hello, Friend!</h1>
            <h1 className={styles.Title}>Do not Have your Account</h1>
            <p className={styles.Paragraph}>
              Enter Your personal details and start journey with us
            </p>
            <button
              className={`${styles.Button} ${styles.GhostButton}`}
              onClick={() => setSignIn(false)}
            >
              sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignUp;
