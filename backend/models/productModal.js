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

    // ✅ Manufacturers (who made it)
    manufacturers: {
      type: [
        {
          name: { type: String, required: true, trim: true },
          allocation: { type: Number, default: 0, min: 0 }, // informational split
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

    // ✅ Suppliers (who we bought it from)
    suppliers: {
      type: [
        {
          name: { type: String, required: true, trim: true },
          allocation: { type: Number, default: 0, min: 0 }, // informational split
        },
      ],
      default: [],
    },

    price: {
      type: Number,
      default: 0.0,
    },

    // ✅ MASTER STOCK (warehouse controlled)
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    uom: {
      type: String,
      default: "PCS",
    },

    image: {
      type: String,
      default: "",
    },

    lowStockThreshold: {
      type: Number,
      default: 0,
      min: [0, "Low stock threshold cannot be negative"],
    },
  },
  { timestamps: true }
);



const Product = mongoose.model("Product", productSchema);

export default Product;
