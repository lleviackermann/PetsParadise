import { useState } from 'react';
import ReviewDisplay from './ReviewDisplay';
import ReviewSubmit from './ReviewSubmit';

function Review() {
  const [review, setReview] = useState('');

  const reviewHandler = (event) => {
    setReview(event.target.value);
  }

  const submitHandler = (event) => {
    event.preventHndler()
    console.log(review);
  }

  return (
    <section className="review" id="review">
      <h1 className="heading">Customer <span>Review</span></h1>
      <ReviewDisplay />
      <ReviewSubmit submit={submitHandler} review={reviewHandler} />
    </section>
  );
}

export default Review;
