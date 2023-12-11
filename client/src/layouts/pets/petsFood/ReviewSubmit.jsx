import classes from "./petfoodLandingPage.module.css";

function ReviewSubmit(props) {
  return (
    <div className={classes.revForm}>
      <form action="#" onSubmit={props.submit}>
        <h2>Please enter your Review</h2>
        <label htmlFor="revtext"></label>
        <textarea
          name="revtext"
          id="revtext"
          cols="90"
          rows="5"
          placeholder="Enter your thoughts about our website"
          onChange={props.review}
        ></textarea>
        <br />
        <br />
        <button className={`${classes.btn} ${classes.revSub}`} id="rev-sub">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ReviewSubmit;
