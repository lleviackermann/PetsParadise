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

module.exports = mongoose.model('Announcement', announcement);