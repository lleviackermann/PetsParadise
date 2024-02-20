import { useState } from "react";
import ReviewDisplay from "./ReviewDisplay";
import ReviewSubmit from "./ReviewSubmit";
import classes from "./petfoodLandingPage.module.css";

function Review() {
  const [review, setReview] = useState("");

  const reviewHandler = (event) => {
    setReview(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (review === "") {
      window.alert("review cannot be empty");
      return;
    }
    const sendRequest = async () => {
      const response = await fetch("http://localhost:8000/review");
    };
    sendRequest();
  };

  return (
    <section className={`${classes.review} ${classes.section}`} id="review">
      <h1 className={classes.heading}>
        Customer <span>Review</span>
      </h1>
      <ReviewDisplay />
      <ReviewSubmit submit={submitHandler} review={reviewHandler} />
    </section>
  );
}

export default Review;
