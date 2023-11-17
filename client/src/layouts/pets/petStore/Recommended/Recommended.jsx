/* eslint-disable react/prop-types */
import Button from "../components/Button";
import "./Recommended.css";

const Recommended = (props) => {
  return (
    <>
      <div>
        <h2 className="recommended-title">Recommended</h2>
        <div className="recommended-flex">
          <Button
            handleChange={props.handleClick}
            value=""
            title="All Products"
            filterType="company"
          />
          <Button
            handleChange={props.handleClick}
            value="Nike"
            title="Nike"
            filterType="company"
          />
          <Button
            handleChange={props.handleClick}
            value="Adidas"
            title="Adidas"
            filterType="company"
          />
          <Button
            handleChange={props.handleClick}
            value="Puma"
            title="Puma"
            filterType="company"
          />
          <Button
            handleChange={props.handleClick}
            value="Vans"
            title="Vans"
            filterType="company"
          />
        </div>
      </div>
    </>
  );
};

export default Recommended;
