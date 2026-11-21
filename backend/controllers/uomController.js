import UOM from "../models/uomModal.js";
import Product from "../models/productModal.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import UomLayout from "../models/uomLayoutModel.js";


export const createUOM = asyncHandler(async (req, res) => {
  const Uom = await UOM.create({
    user: req.user._id,
    title: req.body.title,
  });

  res.status(201).json(Uom);
});

export const allUOM = asyncHandler(async (req, res) => {
  const Uom = await UOM.find().populate("user").sort("-createdAt");

  res.status(200).json({
    success: true,
    count: Uom.length,
    Uom,
  });
});

export const deleteUOM = asyncHandler(async (req, res) => {
  const unit = await UOM.findById(req.params.id);

  if (!unit) {
    res.status(404);
    throw new Error("UOM not found");
  }

  await unit.deleteOne();

  res.status(200).json({
    success: true,
    message: "UOM deleted successfully",
    id: req.params.id,
  });
});

export const getUOM = asyncHandler(async (req, res) => {
  const Uom = await UOM.findById(req.params.id).populate("user", "name");

  if (!Uom) {
    res.status(404);
    throw new Error("UOM not found");
  }

  res.status(200).json(Uom);
});

export const updateUOM = asyncHandler(async (req, res) => {
  const unit = await UOM.findById(req.params.id);

  if (!unit) {
    res.status(404);
    throw new Error("UOM not found");
  }

  const oldTitle = unit.title;
  const newTitle = req.body.title?.trim();

  if (!newTitle) {
    res.status(400);
    throw new Error("UOM title is required");
  }

  unit.title = newTitle;
  await unit.save();

  await Product.updateMany(
    { uom: oldTitle },
    { $set: { uom: newTitle } }
  );

  res.status(200).json({
    success: true,
    message: "UOM updated and products updated successfully",
    Uom: unit,
  });
});


// =========================================================
// UOM FILTER HEADER ORGANIZATION
// =========================================================

const UOM_LAYOUT_ID = "inventory-uom-layout";

// Get saved header organization
export const getUomLayout = asyncHandler(async (req, res) => {
  const savedLayout = await UomLayout.findById(UOM_LAYOUT_ID);

  const layout =
    savedLayout ||
    new UomLayout({ _id: UOM_LAYOUT_ID });

  res.status(200).json({
    headers: layout.headers,
    assignments: layout.assignments,
    fallbackHeaderId: layout.fallbackHeaderId,
  });
});


// Save header organization — Admin only
export const saveUomLayout = asyncHandler(async (req, res) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({
      message: "Admin access required.",
    });
  }

  const {
    headers,
    assignments,
    fallbackHeaderId,
  } = req.body;

  if (
    !Array.isArray(headers) ||
    headers.length === 0 ||
    !Array.isArray(assignments)
  ) {
    return res.status(400).json({
      message: "Invalid UOM layout.",
    });
  }

  const validHeaders = headers.every(
    (header) =>
      header &&
      typeof header.id === "string" &&
      header.id.trim() &&
      typeof header.label === "string" &&
      header.label.trim() &&
      Array.isArray(header.heights) &&
      header.heights.every(
        (height) => typeof height === "string"
      )
  );

  if (!validHeaders) {
    return res.status(400).json({
      message: "Invalid header information.",
    });
  }

  const headerIds = new Set(
    headers.map((header) => header.id)
  );

  const headerNames = new Set(
    headers.map((header) =>
      header.label.trim().toLowerCase()
    )
  );

  if (
    headerIds.size !== headers.length ||
    headerNames.size !== headers.length
  ) {
    return res.status(400).json({
      message: "Duplicate headers are not allowed.",
    });
  }

  if (!headerIds.has(fallbackHeaderId)) {
    return res.status(400).json({
      message: "A valid fallback header is required.",
    });
  }

  const validAssignments = assignments.every(
    (item) =>
      item &&
      typeof item.uomKey === "string" &&
      item.uomKey.trim() &&
      headerIds.has(item.headerId)
  );

  if (!validAssignments) {
    return res.status(400).json({
      message: "Invalid UOM assignment.",
    });
  }

  const assignmentKeys = new Set(
    assignments.map((item) => item.uomKey)
  );

  if (assignmentKeys.size !== assignments.length) {
    return res.status(400).json({
      message: "Duplicate UOM assignments are not allowed.",
    });
  }

  const layout = await UomLayout.findByIdAndUpdate(
    UOM_LAYOUT_ID,
    {
      $set: {
        headers: headers.map((header) => ({
          id: header.id,
          label: header.label.trim(),
          heights: header.heights,
        })),
        assignments: assignments.map((item) => ({
          uomKey: item.uomKey,
          headerId: item.headerId,
        })),
        fallbackHeaderId,
      },
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    headers: layout.headers,
    assignments: layout.assignments,
    fallbackHeaderId: layout.fallbackHeaderId,
  });
});



