import reviewDetails from "./reviewDetails";
import classes from "./petfoodLandingPage.module.css";

function ReviewDisplay() {
  return (
    <div className={classes.reviewSlider}>
      {reviewDetails.map((review, index) => (
        <div key={index} className={classes.box}>
          <h3>{review.Name}</h3>
          <p>{review.review}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewDisplay;
