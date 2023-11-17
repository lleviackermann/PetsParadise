/* eslint-disable react/prop-types*/

function ReviewSubmit(props) {
    return(
        <div className="rev-form">
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
          <br /><br />
          <button className="btn rev-sub" id="rev-sub">Submit</button>
        </form>
      </div>
    );
}

export default ReviewSubmit;