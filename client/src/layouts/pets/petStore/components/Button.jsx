/* eslint-disable react/prop-types */
const Button = (props) => {
  const buttonClicked = (event) => {
    props.handleChange(event, props.filterType);
  };
  return (
    <button onClick={buttonClicked} value={props.value} className="btns">
      {props.title}
    </button>
  );
};

export default Button;
