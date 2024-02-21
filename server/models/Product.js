import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
  reviews: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    default: [],
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
