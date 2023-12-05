import express from "express";
import Product from "../../server/models/Product.js";
const router = express.Router();

const foodDetails = [
  {
    productType: "food",
    petType: "dogs",
      name: "Pedigree for adult dog",
      price: "449",
      src: "../../img/foodservicesLandingPage/dogFood1.jpg",
    },
  {
    productType: "food",
    petType: "fishes",
      name: "Omega One pellets for fish",
      price: "349",
      src: "../../img/foodservicesLandingPage/fishFood1.jpg",
    },
  {
    productType: "food",
    petType: "cats",
      name: "Whiskas food for cats",
      price: "649",
      src: "../../img/foodservicesLandingPage/catFood1.jpg",
    },
  {
    productType: "food",
    petType: "birds",
      name: "IuPreem food for parrots",
      price: "349",
      src: "./../img/foodservicesLandingPage/birdFood1.jpg",
    },
  {
    productType: "food",
    petType: "dogs",
      name: "Barking Dogs food for dogs",
      price: "349",
      src: "../../img/foodservicesLandingPage/dogFood2.jpg",
    },
  {
    productType: "food",
    petType: "fishes",
      name: "Tetra Min flakes for fish",
      price: "349",
      src: "../../img/foodservicesLandingPage/fishFood2.jpg",
    },
  {
    productType: "food",
    petType: "cats",
      name: "IAMS food for cats",
      price: "349",
      src: "../../img/foodservicesLandingPage/catFood2.jpg",
    },
  {
    productType: "food",
    petType: "birds",
      name: "Wagner's food for birds",
      price: "349",
      src: "../../img/foodservicesLandingPage/birdFood2.jpg",
    },
  {
    productType: "food",
    petType: "dogs",
      name: "Crunch Bites for dogs",
      price: "349",
      src: "../../img/foodservicesLandingPage/dogFood3.jpg",
    },
  {
    productType: "food",
    petType: "fishes",
      name: "Discus food mix for fish",
      price: "449",
      src: "../../img/foodservicesLandingPage/fishFood3.jpg",
    },
  {
    productType: "food",
    petType: "cats",
      name: "Perfect Bistro for cats",
      price: "349",
      src: "../../img/foodservicesLandingPage/catFood3.jpg",
    },
  {
    productType: "food",
    petType: "birds",
      name: "Wild Harvest for parrots",
      price: "349",
      src: "../../img/foodservicesLandingPage/birdFood3.jpg",
    },
  {
    productType: "food",
    petType: "dogs",
      name: "IAMS food for dogs",
      price: "349",
      src: "../../img/foodservicesLandingPage/dogFood4.jpg",
    },
  {
    productType: "food",
    petType: "fishes",
      name: "Discovery food for fish",
      price: "349",
      src: "../../img/foodservicesLandingPage/fishFood4.jpg",
    },
  {
    productType: "food",
    petType: "cats",
      name: "Kit Cat food for cat",
      price: "649",
      src: "../../img/foodservicesLandingPage/catFood4.jpg",
    },
  {
    productType: "food",
    petType: "birds",
      name: "Meal Worms for birds",
      price: "549",
      src: "../../img/foodservicesLandingPage/birdFood4.jpg",
    },
  {
    productType: "food",
    petType: "dogs",
      name: "Wild Earth food for dogs",
      price: "449",
      src: "../../img/foodservicesLandingPage/dogFood5.jpg",
    },
  {
    productType: "food",
    petType: "cats",
      name: "Top Cat food for cats",
      price: "399",
      src: "../../img/foodservicesLandingPage/catFood5.jpg",
    },
  {
    productType: "food",
    petType: "fishes",
      name: "Dried worms for fishes",
      price: "549",
      src: "../../img/foodservicesLandingPage/fishFood6.jpg",
    },
  {
    productType: "food",
    petType: "birds",
      name: "Peckish food for birds",
      price: "599",
      src: "../../img/foodservicesLandingPage/birdFood6.jpg",
    },
];


router.get("/", (request, response) => {
  // Product.insertMany(foodDetails);
  // console.log(request);
  return response.status(234).send("Welcome To MERN Stack Tutorial");
});

export default router;
