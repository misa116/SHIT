import mongoose from "mongoose";

const deliveryTruckSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    plateNumber: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const DeliveryTruck = mongoose.model(
  "DeliveryTruck",
  deliveryTruckSchema
);

export default DeliveryTruck;
