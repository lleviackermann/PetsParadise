import h1 from "../petsFood/foodservicesLandingPage/photo-1523480717984-24cba35ae1ef.avif";
import a1 from "../petsFood/foodservicesLandingPage/i1.jpg";
import s1 from "../petsFood/foodservicesLandingPage/hair.png";
import s2 from "../petsFood/foodservicesLandingPage/nail.png";
import s3 from "../petsFood/foodservicesLandingPage/body.jpeg";
import s4 from "../petsFood/foodservicesLandingPage/teeth.png";

import g1 from "../petsFood/foodservicesLandingPage/Gallery1.webp";
import g2 from "../petsFood/foodservicesLandingPage/Gallery2.webp";
import g3 from "../petsFood/foodservicesLandingPage/Gallery3.webp";
import g4 from "../petsFood/foodservicesLandingPage/Gallery4.webp";
import g5 from "../petsFood/foodservicesLandingPage/Gallery5.webp";
import g6 from "../petsFood/foodservicesLandingPage/Gallery6.webp";
import g7 from "../petsFood/foodservicesLandingPage/Gallery7.jpg";
import g8 from "../petsFood/foodservicesLandingPage/Gallery8.jpg";

const servicesImages = {
  home: {
    h1,
  },
  about: {
    a1,
  },
  services: [
    {
      name: "hair grooming",
      img: s1,
    },
    {
      name: "nail grooming",
      img: s2,
    },
    {
      name: "body wash",
      img: s3,
    },
    {
      name: "teeth wash",
      img: s4,
    },
  ],
  packages: [
    {
      name: "BRONZE",
      hair: true,
      nail: false,
      teeth: false,
      foam: false,
      price: "299",
    },
    {
      name: "SILVER",
      hair: true,
      nail: true,
      teeth: false,
      foam: false,
      price: "499",
    },
    {
      name: "GOLD",
      hair: true,
      nail: true,
      teeth: true,
      foam: false,
      price: "999",
    },
    {
      name: "DIAMOND",
      hair: true,
      nail: true,
      teeth: true,
      foam: true,
      price: "1299",
    },
  ],
  packItems: [
    "Hair Grooming",
    "Nail Grooming",
    "Teeth Wash",
    "Complete Foam Bath",
  ],
  packNames: ["hair", "nail", "teeth", "foam"],
  gallery: [g1, g2, g3, g4, g5, g6, g7, g8],
  appointment: [
    {
      value: "",
      name: "Select package",
    },
    {
      value: "299",
      name: "BRONZE",
    },
    {
      value: "499",
      name: "SILVER",
    },
    {
      value: "999",
      name: "GOLD",
    },
    {
      value: "1299",
      name: "DIAMOND",
    },
  ],
};

export default servicesImages;
