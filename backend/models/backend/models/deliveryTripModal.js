import mongoose from "mongoose";

const deliveryTripStopSchema = mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    stopOrder: {
      type: Number,
      required: true,
      default: 1,
    },

    status: {
      type: String,
      enum: ["pending", "arrived", "completed"],
      default: "pending",
    },

    arrivedAt: {
      type: Date,
    },

    completedAt: {
      type: Date,
    },
  },
  {
    _id: false,
  }
);

const deliveryTripCrewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["helper", "backup-driver", "crew"],
      default: "helper",
    },
  },
  {
    _id: false,
  }
);

const deliveryTripSchema = mongoose.Schema(
  {
    deliveryDate: {
      type: String,
      required: true,
    },

    truck: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryTruck",
      required: true,
    },

    truckName: {
      type: String,
      default: "",
    },

    primaryDriver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    primaryDriverName: {
      type: String,
      default: "",
    },

    primaryDriverEmail: {
      type: String,
      default: "",
    },

    crewMembers: {
      type: [deliveryTripCrewSchema],
      default: [],
    },

    stops: {
      type: [deliveryTripStopSchema],
      default: [],
    },

    status: {
      type: String,
      enum: [
        "assigned",
        "active",
        "returning",
        "completed",
        "cancelled",
      ],
      default: "assigned",
    },

    startedAt: {
      type: Date,
    },

    startedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    startedByName: {
      type: String,
      default: "",
    },

    returnedToWarehouseAt: {
      type: Date,
    },

    completedAt: {
      type: Date,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    createdByName: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const DeliveryTrip = mongoose.model(
  "DeliveryTrip",
  deliveryTripSchema
);

export default DeliveryTrip;
