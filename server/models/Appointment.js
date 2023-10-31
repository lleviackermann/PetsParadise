import mongoose from "mongoose"

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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  vet: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  }
});

module.exports = mongoose.model("Appointment", appointmentSchema);