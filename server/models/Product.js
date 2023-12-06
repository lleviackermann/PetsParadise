import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  src: String,
  productType: String,
  petType: String,
  rating: {
    type: Number,
    default: 3,
    required: false,
  },
  breed_group: {
    type: String,
    default: "None",
    required: false,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
