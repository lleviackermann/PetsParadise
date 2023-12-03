import styles from "./Auth.module.css";
import { useState } from "react";

function LoginSignUp() {
  const [signIn, setSignIn] = useState(true);
  const [firstName, setFirstName] = useState("");
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
        <form className={styles.Form}>
          <h1 className={styles.Title}>Create Account</h1>
          <input type="text" className={styles.Input} placeholder="Name" />
          <input type="email" className={styles.Input} placeholder="Email" />
          <input
            type="password"
            className={styles.Input}
            placeholder="Password"
          />
          <button className={styles.Button}>Sign Up</button>
        </form>
      </div>

      <div
        className={styles.SignInContainer}
        style={!signIn ? { transform: "translateX(100%)" } : null}
      >
        <form className={styles.Form}>
          <h1 className={styles.Title}>Sign in </h1>
          <input type="email" className={styles.Input} placeholder="Email" />
          <input
            type="password"
            className={styles.Input}
            placeholder="Password"
          />
          <a href="#" className={styles.Anchor}>
            Forgot Your Password
          </a>
          <button className={styles.Button}>Sign In</button>
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
