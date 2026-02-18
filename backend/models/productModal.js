 import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "add the product name"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "add the category"],
    },
  manufacturers: {
  type: [
    {
      name: { type: String, required: true, trim: true },
      stock: { type: Number, default: 0, min: 0 },
    },
  ],
  default: [],
},

    modalNo: {
      type: String,
    },

    location: {
      type: String,
      trim: true,
    },
    supplier: {
      type: String,
      trim: true,
      default: "N/A",
    },
    price: {
      type: Number,
      default: 0.0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    uom: {
      type: String,
      default: "PCS",
    },



   
    image: {
  type: String,
  default: "", // optional, prevents undefined errors
},
   
    // ✅ New field: low stock threshold
    lowStockThreshold: {
      type: Number,
      default: 0, // Default threshold if not specified
      min: [0, "Low stock threshold cannot be negative"],
    },
  },
  { timestamps: true }
);


productSchema.pre("save", function (next) {
  if (this.manufacturers && this.manufacturers.length > 0) {
    this.stock = this.manufacturers.reduce((acc, m) => acc + m.stock, 0);
  }
  next();
});


const Product = mongoose.model("Product", productSchema);
export default Product;
