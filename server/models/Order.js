import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    prodId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
    },
    assigned: {
        type: String,
        default: "Pending",
    },
    deliveryId: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);