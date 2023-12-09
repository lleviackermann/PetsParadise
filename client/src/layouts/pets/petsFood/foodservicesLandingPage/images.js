import fea1 from "./fea1.jpg";
import fea2 from "./fea2.jpg";
import fea3 from "./fea3.png";
import dogFood6 from "./dogFood6.jpg";
import catFood6 from "./catFood6.jpg";
import fishFood5 from "./fishFood5.jpg";
import birdFood5 from "./birdFood5.jpg";

const images = {
  features: {
    fea1,
    fea2,
    fea3,
  },
  categories: {
    dogFood6,
    catFood6,
    fishFood5,
    birdFood5,
  },
  buttons: [
    {
      value: "all",
      desc: "ALL",
    },
    {
      value: "dog",
      desc: "dog",
    },
    {
      value: "cat",
      desc: "cat",
    },
    {
      value: "fish",
      desc: "fish",
    },
    {
      value: "bird",
      desc: "bird",
    },
  ],
};

export default images;
