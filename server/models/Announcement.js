import mongoose from "mongoose";
const Schema = mongoose.Schema;

const announcement = new Schema({
    message: {
        type: String,
        required: true
    },
    target: {
        type: String,
        default: "all",
    }
})

const Announcement = mongoose.model('Announcement', announcement);

export default Announcement;