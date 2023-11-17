import reviewDetails from './reviewDetails'; 

function ReviewDisplay() {
    return(
        <div className="review-slider">
        {reviewDetails.map((review, index) => (
          <div key={index} className="box">
            <h3>{review.Name}</h3>
            <p>{review.review}</p>
          </div>
        ))}
      </div>
    )
}

export default ReviewDisplay;