import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: String,
    src: String,
    productType: String,
    petType: String,
})

const Product = mongoose.model("Product", productSchema)

export default Product;