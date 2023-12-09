import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OtpSchema = Schema({
  email: {
    type: String,
    required: true,
    max: 50,
  },
  otpNumber: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

const Otp = mongoose.model("Otp", OtpSchema);

export default Otp;
