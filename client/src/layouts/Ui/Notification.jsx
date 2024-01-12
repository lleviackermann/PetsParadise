import classes from "./Notification.module.css";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const Notification = (props) => {
  let specialClasses = "";

  if (props.status === "failure") {
    specialClasses = classes.error;
  }
  if (props.status === "success") {
    specialClasses = classes.success;
  }
  const cssClasses = `${classes.notification} ${specialClasses}`;
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <LinearProgress variant="determinate" value={100} />
      </Box>
      <section className={cssClasses}>
        <h2>{props.title}</h2>
        <p>{props.message}</p>
      </section>
    </>
  );
};

export default Notification;
