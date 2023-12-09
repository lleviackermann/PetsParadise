import Slider from "@mui/material/Slider";
import { styled } from "@mui/system";

const StyledSlider = styled(Slider)(({ theme }) => ({
  height: "10rem",
  margin: "2rem auto",
  color: "#000",
  "& .MuiSlider-thumb": {
    color: "#000",
  },
  "& .MuiSlider-rail": {
    color: "rgba(0, 0, 0, 0.26)",
  },
  "&MuiSlider-track": {
    color: "#000",
  },
}));

const PriceSlider = ({ value, changePrice }) => {
  return (
    <div style={{ width: "100%" }}>
      <StyledSlider
        orientation="vertical"
        value={value}
        onChange={changePrice}
        valueLabelDisplay="on"
        min={0}
        max={10000}
      />
    </div>
  );
};

export default PriceSlider;
