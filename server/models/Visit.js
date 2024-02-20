import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
  count: { type: Number, default: 0 },
  ip: String,
  timestamp: { type: Date, default: Date.now },
});

const Visit = mongoose.model("Visit", visitSchema);
export default Visit;
