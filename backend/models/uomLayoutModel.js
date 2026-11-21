 import mongoose from "mongoose";

const headerSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
    heights: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const assignmentSchema = new mongoose.Schema(
  {
    uomKey: {
      type: String,
      required: true,
    },
    headerId: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const uomLayoutSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: "inventory-uom-layout",
    },

    headers: {
      type: [headerSchema],
      default: () => [
        { id: "height-79", label: "6'7", heights: ["6'7"] },
        { id: "height-80", label: "6'8", heights: ["6'8"] },
        { id: "height-84", label: "7'0", heights: ["7'0"] },
        { id: "height-95", label: "7'11", heights: ["7'11"] },
        { id: "height-96", label: "8'0", heights: ["8'0"] },
        { id: "bypass", label: "Bypass", heights: [] },
      ],
    },

    assignments: {
      type: [assignmentSchema],
      default: [],
    },

    fallbackHeaderId: {
      type: String,
      default: "bypass",
    },
  },
  { timestamps: true }
);

const UomLayout = mongoose.model(
  "UomLayout",
  uomLayoutSchema
);

export default UomLayout;
