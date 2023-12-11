import mongoose from "mongoose";

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  package: String,
  number: String,
  date: String,
  time: String,
  appointmentType: String,
  status: {
    type: String,
    default: "Pending",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // vetId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Employee",
  //   required: true,
  // },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
