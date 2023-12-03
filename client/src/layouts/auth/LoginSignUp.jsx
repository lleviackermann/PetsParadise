import styles from "./Auth.module.css";
import { useEffect, useState } from "react";
import useInput from "../../hooks/use-Input";
import { Block } from "@mui/icons-material";
function LoginSignUp() {
  const [signIn, setSignIn] = useState(true);
  const {
    value: emailValue,
    isValid: emailValueIsValid,
    error: emailInputHasError,
    inputChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput("email");
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    error: NameInputHasError,
    inputChangeHandler: NameChangedHandler,
    inputBlurHandler: NameBlurHandler,
    reset: resetNameInput,
  } = useInput("name");
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    error: PasswordHasError,
    inputChangeHandler: passwordChangedHandler,
    inputBlurHandler: paswordBlurHandler,
    reset: resetPasswordInput,
  } = useInput("password");
  let formIsValid = false;

  if (signIn && emailValueIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  if (
    !signIn &&
    enteredNameIsValid &&
    emailValueIsValid &&
    enteredPasswordIsValid
  ) {
    formIsValid = true;
  }
  const formSubmitHandler = (type = "none") => {
    resetEmailInput();
    resetPasswordInput();
    resetNameInput();
    if (type === "signIn") {
    }
    if (type === "signUp") {
    }
  };
  useEffect(() => {
    formSubmitHandler();
  }, [signIn]);
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
          onSubmit={(event) => {
            event.preventDefault();
            formSubmitHandler.bind(null, "signUp");
          }}
        >
          <h1 className={styles.Title}>Create Account</h1>
          <input
            type="text"
            className={styles.Input}
            style={
              NameInputHasError
                ? { border: "1px solid #b40e0e", backgroundColor: "#fddddd" }
                : null
            }
            onChange={NameChangedHandler}
            onBlur={NameBlurHandler}
            placeholder="Name"
            value={enteredName}
          />
          <p style={{ display: `${NameInputHasError ? "block" : "none"}` }}>
            Name must contain atleast 6 letters and should begin with a
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
          <p style={{ display: `${PasswordHasError ? "block" : "none"}` }}>
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
          onSubmit={(event) => {
            event.preventDefault();
            formSubmitHandler.bind(null, "signUp");
          }}
        >
          <h1 className={styles.Title}>Sign in </h1>
          <input
            type="email"
            style={
              emailInputHasError
                ? { border: "1px solid #b40e0e", backgroundColor: "#fddddd" }
                : null
            }
            className={styles.Input}
            placeholder="Email"
            onChange={emailChangedHandler}
            onBlur={emailBlurHandler}
          />
          <p style={{ display: `${emailInputHasError ? "block" : "none"}` }}>
            email must include @
          </p>

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
            placeholder="Password"
          />
          <p style={{ display: `${PasswordHasError ? "block" : "none"}` }}>
            password must contain atleast 8 letters and should contain
            uppercase,lowercase,number
          </p>
          <a href="#" className={styles.Anchor}>
            Forgot Your Password
          </a>
          <button disabled={!formIsValid} className={styles.Button}>
            Sign In
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
