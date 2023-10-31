import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
    appointments: [{
        type: Schema.Types.ObjectId,
        ref: 'Appointment',
    }],
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order',
    }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;