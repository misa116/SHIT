// 4 22 26 test


/*
import mongoose from "mongoose";

// Schema for each item in an order
const orderItemSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true }, // snapshot of product price
    category: { type: String },             // snapshot of product category
    bundleKey: { type: String, default: "" },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
  },
  { _id: false }
);

// Main order schema
const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    orderItems: [orderItemSchema],

    approvedData: {
      reqBy: { type: String },
      approvedBy: { type: String },
      comment: { type: String },
    },

    approvedStatusProcur: {
      paymentMethod: { type: String, default: "Cash" },
    },

    // ✅ requisitionSteps is now an object with a required "type"
    requisitionSteps: {
      type: {
        type: String,
        enum: ["FACTORY REQUISITION", "PURCHASE REQUISITION"],
        required: true,
      },
      // You can add more fields inside requisitionSteps later
    },

    price: { type: Number, default: 0 },

    supplier: { type: String },

    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },

    isReceived: { type: Boolean, required: true, default: false },
    receivedAt: { type: Date },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
*/



















/*

import mongoose from "mongoose";

// Schema for each item in an order
const orderItemSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true }, // snapshot of product price
    category: { type: String }, // snapshot of product category
    bundleKey: { type: String, default: "" },
    bundleLabel: { type: String, default: "" },
    images: [{ type: String }], // ✅ add this
    image: { type: String, default: "" }, // ✅ add this
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
  },
  { _id: false }
);

// Main order schema
const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    orderItems: [orderItemSchema],

  approvedData: {
  reqBy: { type: String },
  approvedBy: { type: String },
  comment: { type: String },
  lotNumber: { type: String, default: "" },
    deliveryDate: { type: Date, default: null },
},

    approvedStatusProcur: {
      paymentMethod: { type: String, default: "Cash" },
    },

    requisitionSteps: {
      type: {
        type: String,
        enum: ["FACTORY REQUISITION", "PURCHASE REQUISITION"],
        required: true,
      },
    },

    price: { type: Number, default: 0 },

    supplier: { type: String },

    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },

    isReceived: { type: Boolean, required: true, default: false },
    receivedAt: { type: Date },



isOnHold: {
  type: Boolean,
  default: false,
},

holdDate: {
  type: Date,
},

holdBy: {
  type: String,
},





    
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
*/










/*

import mongoose from "mongoose";

// Schema for each item in an order
const orderItemSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },

    category: { type: String },

    bundleKey: { type: String, default: "" },
    bundleLabel: { type: String, default: "" },
    bundleItemOrder: { type: Number, default: 0 },

    images: [{ type: String }],
    image: { type: String, default: "" },

    // ✅ Built status for products inside a bundle
    isBuilt: {
      type: Boolean,
      default: false,
    },
    builtAt: {
      type: Date,
    },
    builtBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    factoryStatus: {
      type: String,
      default: "pending",
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
  },
  { _id: false }
);

// ✅ Schema for saved bundles on the order
const bundleSchema = mongoose.Schema(
  {
    bundleKey: {
      type: String,
      required: true,
    },
    bundleLabel: {
      type: String,
      default: "",
    },

    // ✅ Built status for the whole bundle
    isBuilt: {
      type: Boolean,
      default: false,
    },
    builtAt: {
      type: Date,
    },
    builtBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    factoryStatus: {
      type: String,
      default: "pending",
    },
  },
  { _id: false }
);

// Main order schema
const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    orderItems: [orderItemSchema],

    // ✅ Saved bundle list for this order
    bundles: {
      type: [bundleSchema],
      default: [],
    },

    approvedData: {
      reqBy: { type: String },
      approvedBy: { type: String },
      comment: { type: String },
      lotNumber: { type: String, default: "" },
      deliveryDate: { type: Date, default: null },
    },

    approvedStatusProcur: {
      paymentMethod: { type: String, default: "Cash" },
    },

    requisitionSteps: {
      type: {
        type: String,
        enum: ["FACTORY REQUISITION", "PURCHASE REQUISITION"],
        required: true,
      },
    },

    price: { type: Number, default: 0 },

    supplier: { type: String },

    // ✅ Order-level built status
    isBuilt: {
      type: Boolean,
      default: false,
    },
    builtAt: {
      type: Date,
    },
    builtBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    factoryStatus: {
      type: String,
      default: "pending",
    },

    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },

    isReceived: { type: Boolean, required: true, default: false },
    receivedAt: { type: Date },

    isOnHold: {
      type: Boolean,
      default: false,
    },

    holdDate: {
      type: Date,
    },

    holdBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;

*/














import mongoose from "mongoose";

// Schema for each item in an order
const orderItemSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },

    category: { type: String },

    bundleKey: { type: String, default: "" },
    bundleLabel: { type: String, default: "" },
    bundleItemOrder: { type: Number, default: 0 },

    images: [{ type: String }],
    image: { type: String, default: "" },

    // ✅ Built status for products inside a bundle
    isBuilt: {
      type: Boolean,
      default: false,
    },
    builtAt: {
      type: Date,
    },
    builtBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    factoryStatus: {
      type: String,
      default: "pending",
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
  },
  { _id: false }
);

// ✅ Schema for saved bundles on the order
const bundleSchema = mongoose.Schema(
  {
    bundleKey: {
      type: String,
      required: true,
    },
    bundleLabel: {
      type: String,
      default: "",
    },

    // ✅ Built status for the whole bundle
    isBuilt: {
      type: Boolean,
      default: false,
    },
    builtAt: {
      type: Date,
    },
    builtBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    factoryStatus: {
      type: String,
      default: "pending",
    },
  },
  { _id: false }
);

// Main order schema
const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    orderItems: [orderItemSchema],

    // ✅ Saved bundle list for this order
    bundles: {
      type: [bundleSchema],
      default: [],
    },

 approvedData: {
  reqBy: { type: String },
  approvedBy: { type: String },

  // Job name / jobsite name
  comment: { type: String },

  lotNumber: { type: String, default: "" },
  deliveryDate: { type: Date, default: null },

  // Jobsite map address
  jobsiteAddress: {
    type: String,
    default: "",
  },

  // Jobsite map pin latitude
  jobsiteLat: {
    type: Number,
    default: null,
  },

  // Jobsite map pin longitude
  jobsiteLng: {
    type: Number,
    default: null,
  },
},

    approvedStatusProcur: {
      paymentMethod: { type: String, default: "Cash" },
    },

    requisitionSteps: {
      type: {
        type: String,
        enum: ["FACTORY REQUISITION", "PURCHASE REQUISITION"],
        required: true,
      },
    },

    price: { type: Number, default: 0 },

    supplier: { type: String },

    // ✅ Order-level built status
    isBuilt: {
      type: Boolean,
      default: false,
    },
    builtAt: {
      type: Date,
    },
    builtBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    factoryStatus: {
      type: String,
      default: "pending",
    },


// ✅ Draft jobsite order created from Dashboard map before products are selected
isDraftJobsite: {
  type: Boolean,
  default: false,
},

draftStatus: {
  type: String,
  enum: ["none", "jobsite-pin", "completed"],
  default: "none",
},

draftCreatedByName: {
  type: String,
  default: "",
},

draftCompletedAt: {
  type: Date,
},

    
   isDelivered: { type: Boolean, required: true, default: false },
deliveredAt: { type: Date },







    // ✅ Live delivery navigation status
isBeingDelivered: {
  type: Boolean,
  default: false,
},

deliveryStartedAt: {
  type: Date,
},

deliveryStartedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},

deliveryStartedByName: {
  type: String,
  default: "",
},

// ✅ Driver live location sharing for this delivery route
isDriverSharingLocation: {
  type: Boolean,
  default: false,
},

driverLocationLat: {
  type: Number,
  default: null,
},

driverLocationLng: {
  type: Number,
  default: null,
},

driverLocationAccuracy: {
  type: Number,
  default: null,
},

driverLocationUpdatedAt: {
  type: Date,
},

isReceived: { type: Boolean, required: true, default: false },
receivedAt: { type: Date },

isOnHold: {
  type: Boolean,
  default: false,
},





    
    holdDate: {
      type: Date,
    },

    holdBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;



