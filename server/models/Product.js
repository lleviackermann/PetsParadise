import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: String,
    src: String,
    productType: String,
    petType: String,
})

module.exports = mongoose.model("Product", productSchema)