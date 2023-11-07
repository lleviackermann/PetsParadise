import reviewDetails from './reviewDetails'; 

function Review() {
  return (
    <section className="review" id="review">
      <h1 className="heading">Customer <span>Review</span></h1>
      <div className="review-slider">
        {reviewDetails.map((review, index) => (
          <div key={index} className="box">
            <h3>{review.Name}</h3>
            <p>{review.review}</p>
          </div>
        ))}
      </div>
      <div className="rev-form">
        <form action="/petsfoods/reviewform" method="post">
          <h2>Please enter your Review</h2>
          <label htmlFor="revtext"></label>
          <textarea
            name="revtext"
            id="revtext"
            cols="90"
            rows="5"
            placeholder="Enter your thoughts about our website"
          ></textarea>
          <br /><br />
          <button className="btn rev-sub" id="rev-sub">Submit</button>
        </form>
      </div>
    </section>
  );
}

export default Review;
