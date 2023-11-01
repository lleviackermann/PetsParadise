import mongoose from "mongoose";
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
    Name: String,
    review: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    prodId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
    appointmentId: {
        type: Schema.Types.ObjectId,
        ref: "Appointment",
    }
},{ timestamps: true}
)

const Review = mongoose.model("Review", reviewSchema)

export default Review;