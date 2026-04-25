import UOM from "../models/uomModal.js";
import Product from "../models/productModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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
